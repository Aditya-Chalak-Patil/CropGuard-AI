import base64
import json
import logging
from io import BytesIO
from pathlib import Path

import numpy as np
import onnxruntime as ort
import torch
import torch.nn.functional as F

from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image, UnidentifiedImageError


app = Flask(__name__)
CORS(app)
app.config["MAX_CONTENT_LENGTH"] = 8 * 1024 * 1024

ALLOWED_FORMATS = {"JPEG", "PNG", "WEBP"}
BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "models" / "plantvillage-mobilenetv3"
MODEL_PATH = MODEL_DIR / "model.onnx"
TORCH_MODEL_PATH = MODEL_DIR / "model_scripted.pt"
LABELS_PATH = MODEL_DIR / "class_names.json"

with open(LABELS_PATH, "r", encoding="utf-8") as file:
    CLASS_NAMES = json.load(file)

session = ort.InferenceSession(
    str(MODEL_PATH),
    providers=["CPUExecutionProvider"]
)
INPUT_NAME = session.get_inputs()[0].name

# TorchScript model is used only for Grad-CAM. ONNX remains the classifier.
grad_model = None
try:
    grad_model = torch.jit.load(
        str(TORCH_MODEL_PATH),
        map_location="cpu"
    ).eval()
    logging.info("TorchScript Grad-CAM model loaded.")
except Exception:
    logging.exception("Grad-CAM model could not be loaded; predictions can still run.")


def model_view(image):
    """Return the same RGB resize + center crop used by model preprocessing."""
    image = image.convert("RGB")
    width, height = image.size
    scale = 256 / min(width, height)
    new_width = round(width * scale)
    new_height = round(height * scale)

    resized = image.resize(
        (new_width, new_height),
        Image.Resampling.BILINEAR
    )
    left = (new_width - 224) // 2
    top = (new_height - 224) // 2
    return resized.crop((left, top, left + 224, top + 224))


def preprocess_image(image):
    cropped = model_view(image)
    array = np.asarray(cropped, dtype=np.float32) / 255.0

    mean = np.array([0.485, 0.456, 0.406], dtype=np.float32)
    std = np.array([0.229, 0.224, 0.225], dtype=np.float32)
    array = (array - mean) / std

    array = np.transpose(array, (2, 0, 1))
    array = np.expand_dims(array, axis=0)
    return array.astype(np.float32)


def softmax(logits):
    shifted = logits - np.max(logits)
    exp_values = np.exp(shifted)
    return exp_values / np.sum(exp_values)


def predict_disease(image):
    input_tensor = preprocess_image(image)
    outputs = session.run(None, {INPUT_NAME: input_tensor})
    logits = np.asarray(outputs[0][0], dtype=np.float32)
    probabilities = softmax(logits)

    order = np.argsort(probabilities)[::-1]
    predicted_index = int(order[0])

    top_predictions = [
        {
            "class_name": CLASS_NAMES[int(index)],
            "confidence": round(float(probabilities[index]) * 100, 2)
        }
        for index in order[:3]
    ]

    return {
        "class_name": CLASS_NAMES[predicted_index],
        "confidence": round(float(probabilities[predicted_index]) * 100, 2),
        "top_predictions": top_predictions,
        "warning": (
            "Prediction confidence is the model's score, not a guarantee "
            "of diagnosis. Confirm with an agricultural expert."
        )
    }, predicted_index, input_tensor


def image_to_data_url(image):
    buffer = BytesIO()
    image.save(buffer, format="JPEG", quality=88, optimize=True)
    encoded = base64.b64encode(buffer.getvalue()).decode("ascii")
    return f"data:image/jpeg;base64,{encoded}"


def create_gradcam(image, input_tensor, class_index):
    """
    Grad-CAM from the TorchScript MobileNetV3 feature tensor.
    This highlights regions influential to the selected class; it is not
    a pixel-accurate disease segmentation mask.
    """
    if grad_model is None:
        raise RuntimeError("TorchScript model is unavailable.")

    grad_model.zero_grad(set_to_none=True)
    tensor = torch.from_numpy(input_tensor).requires_grad_(True)

    # The scripted model exposes these modules; tested against this model file.
    activations = grad_model.features(tensor)
    activations.retain_grad()

    pooled = grad_model.avgpool(activations)
    flattened = torch.flatten(pooled, 1)
    logits = grad_model.classifier(flattened)

    if logits.ndim != 2 or logits.shape[1] != len(CLASS_NAMES):
        raise RuntimeError("Unexpected TorchScript model output shape.")

    logits[0, class_index].backward()

    gradients = activations.grad
    if gradients is None:
        raise RuntimeError("Gradients were not produced for the feature map.")

    weights = gradients.mean(dim=(2, 3), keepdim=True)
    cam = torch.relu((weights * activations).sum(dim=1, keepdim=True))
    cam = F.interpolate(
        cam,
        size=(224, 224),
        mode="bilinear",
        align_corners=False
    )[0, 0]

    cam = cam.detach().cpu().numpy()
    cam_min = float(cam.min())
    cam_max = float(cam.max())

    if not np.isfinite(cam).all() or cam_max - cam_min < 1e-8:
        raise RuntimeError("Grad-CAM map has no usable activation contrast.")

    cam = (cam - cam_min) / (cam_max - cam_min)

    # Lightweight JET-style color map; no OpenCV dependency required.
    red = np.clip(1.5 - np.abs(4.0 * cam - 3.0), 0.0, 1.0)
    green = np.clip(1.5 - np.abs(4.0 * cam - 2.0), 0.0, 1.0)
    blue = np.clip(1.5 - np.abs(4.0 * cam - 1.0), 0.0, 1.0)
    color_map = np.stack([red, green, blue], axis=-1)
    color_map = (color_map * 255).astype(np.uint8)

    base = np.asarray(model_view(image), dtype=np.float32)
    heat = color_map.astype(np.float32)

    # Stronger heatmap regions receive more overlay opacity.
    alpha = (0.18 + 0.48 * cam[..., None]).astype(np.float32)
    overlay = np.clip(base * (1.0 - alpha) + heat * alpha, 0, 255).astype(np.uint8)
    return Image.fromarray(overlay, mode="RGB")


@app.get("/api/health")
def health():
    return jsonify({
        "status": "ok",
        "project": "CropGuard AI",
        "model_loaded": True,
        "gradcam_available": grad_model is not None,
        "classes": len(CLASS_NAMES)
    })


@app.post("/api/upload")
def upload_image():
    if "image" not in request.files:
        return jsonify({"error": "Image file is required."}), 400

    file = request.files["image"]
    if not file.filename:
        return jsonify({"error": "Please select an image."}), 400

    try:
        image_bytes = file.read()
        image = Image.open(BytesIO(image_bytes))
        image.verify()
        image = Image.open(BytesIO(image_bytes))

        if image.format not in ALLOWED_FORMATS:
            return jsonify({
                "error": "Only JPG, PNG and WEBP images are supported."
            }), 415

        width, height = image.size
        if width < 32 or height < 32:
            return jsonify({
                "error": "Image is too small. Upload a clearer leaf photo."
            }), 400

        prediction, predicted_index, input_tensor = predict_disease(image)

        explainability = {
            "available": False,
            "overlay_data_url": None,
            "method": "Grad-CAM",
            "note": (
                "Grad-CAM highlights image regions that influenced the model "
                "prediction. It does not outline exact infected tissue."
            )
        }

        try:
            overlay = create_gradcam(image, input_tensor, predicted_index)
            explainability["available"] = True
            explainability["overlay_data_url"] = image_to_data_url(overlay)
        except Exception:
            app.logger.exception("Grad-CAM generation failed.")
            explainability["note"] = (
                "Prediction completed, but the attention map could not be generated."
            )

        return jsonify({
            "status": "success",
            "filename": file.filename,
            "format": image.format,
            "width": width,
            "height": height,
            "prediction": prediction,
            "explainability": explainability,
            "message": "AI prediction completed."
        }), 200

    except (UnidentifiedImageError, OSError, ValueError):
        return jsonify({
            "error": "Invalid or corrupted image. Please upload a valid photo."
        }), 400
    except Exception:
        app.logger.exception("Prediction failed")
        return jsonify({
            "error": "AI prediction failed. Please check the backend logs."
        }), 500


@app.errorhandler(413)
def file_too_large(_error):
    return jsonify({
        "error": "Image is too large. Maximum size is 8 MB."
    }), 413


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
