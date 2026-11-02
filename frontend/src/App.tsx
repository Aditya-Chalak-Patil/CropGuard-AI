import { useEffect, useRef, useState } from "react";
import "./App.css";
import "./CropGuard-report.css";

type UploadResult = {
  status?: string;
  filename?: string;
  format?: string;
  width?: number;
  height?: number;
  message?: string;
  error?: string;
  prediction?: {
    class_name: string;
    confidence: number;
    warning: string;
  };
  explainability?: {
    available: boolean;
    overlay_data_url: string | null;
    method: string;
    note: string;
  };
};

const API_BASE = "http://127.0.0.1:5000";

function formatDiseaseName(value: string) {
  return value
    .replaceAll("___", " â€” ")
    .replaceAll("__", " â€” ")
    .replaceAll("_", " ")
    .replace(/\s+/g, " ")
    .trim();
}

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [crop] = useState("Tomato");
  const [language, setLanguage] = useState("English");
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState("");
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [activeReportSection, setActiveReportSection] = useState("overview");

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function checkBackend() {
      try {
        const response = await fetch(`${API_BASE}/api/health`);
        if (!response.ok) throw new Error("Backend unavailable");
        if (!cancelled) setBackendOnline(true);
      } catch {
        if (!cancelled) setBackendOnline(false);
      }
    }

    void checkBackend();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  function handleImage(selectedFile?: File) {
    if (!selectedFile) return;

    setError("");
    setResult(null);
    setShowReport(false);

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please upload a JPG, PNG or WEBP image.");
      return;
    }

    if (selectedFile.size > 8 * 1024 * 1024) {
      setError("Image size must be 8 MB or less.");
      return;
    }

    const previewUrl = URL.createObjectURL(selectedFile);
    setImage((previousImage) => {
      if (previousImage) URL.revokeObjectURL(previousImage);
      return previewUrl;
    });
    setFile(selectedFile);
  }

  async function uploadForValidation() {
    if (!file) {
      setError("Please select a leaf image first.");
      return;
    }

    setIsUploading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("crop", crop);
      formData.append("language", language);

      const response = await fetch(`${API_BASE}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as UploadResult;

      if (!response.ok) {
        throw new Error(data.error || "AI prediction failed.");
      }

      if (!data.prediction) {
        throw new Error("Prediction was not returned by the AI model.");
      }

      setResult(data);
      setBackendOnline(true);
      setActiveReportSection("overview");
      setShowReport(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not connect to the backend."
      );
    } finally {
      setIsUploading(false);
    }
  }

  function scrollToDoctor() {
    document.getElementById("doctor")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  function printReport() {
    window.print();
  }

  if (showReport && result?.prediction) {
    const prediction = result.prediction;
    const diseaseName = formatDiseaseName(prediction.class_name);
    const confidence = Math.max(0, Math.min(100, prediction.confidence));
    const reportDate = new Date().toLocaleDateString(
      language === "Marathi" ? "mr-IN" : language === "Hindi" ? "hi-IN" : "en-IN",
      { day: "2-digit", month: "long", year: "numeric" }
    );
    const reportId = `CG-${Date.now().toString().slice(-8)}`;
    const reportText = {
      English: {
        overview:"Overview", symptoms:"Symptoms", causes:"Causes & risk", treatment:"Treatment plan", prevention:"Prevention",
        nav:"REPORT NAVIGATION", complete:"AI analysis complete", prototype:"Prototype assessment", workspace:"Workspace", doctor:"AI Crop Doctor", report:"Report", dashboard:"â† Dashboard",
        eyebrow:"CROPGUARD AI Â· DIAGNOSTIC CENTER", title:"Crop Disease", titleAccent:"Analysis", subtitle:"AI-generated leaf assessment and crop care report.", reportId:"REPORT ID",
        analyzed:"Analyzed leaf", original:"Original uploaded image", source:"SOURCE IMAGE", noPreview:"No image preview available", received:"Image received", modelPrediction:"MODEL PREDICTION", predicted:"PREDICTED CONDITION", classification:"Plant leaf classification",
        confidence:"Prediction confidence score", confidenceNote:"This is the model's score, not a verified measure of diagnostic accuracy.", selectedCrop:"Selected crop", language:"Report language", modelClasses:"Model classes", labels:"15 supported labels",
        explainable:"EXPLAINABLE AI", attention:"AI attention map Â· Grad-CAM", gradReady:"GRAD-CAM READY", mapUnavailable:"MAP UNAVAILABLE", gradOverlay:"Grad-CAM overlay Â· model input crop (224 Ã— 224)", gradMissing:"Grad-CAM map was not returned by the backend for this image.", gradNote:"Grad-CAM highlights regions that influenced the prediction. It does not identify exact infected tissue or confirm a disease.", what:"What this report tells you", classifier:"The classifier predicts a label for the full image. Grad-CAM highlights regions that influenced that prediction; it is not a disease boundary detector and does not prove that highlighted regions are infected.",
        understand:"UNDERSTAND THE CONDITION", symptomsTitle:"Symptoms & identification", referenceNext:"REFERENCE CONTENT NEXT", symptomsPending:"Disease-specific symptom descriptions will be linked to the exact model label in the next implementation step. Do not use the model label alone as confirmation of disease.", visual:"Visual symptoms", visualPending:"Detailed signs and distinguishing features will appear here.", inspect:"Where to inspect", inspectPending:"Leaf areas and other plant parts to examine will appear here.", similar:"Similar conditions", similarPending:"Look-alike diseases and non-disease causes will be listed here.",
        risk:"RISK FACTORS", causesTitle:"Causes & spread", causesPending:"Verified information about the predicted condition, its causes and spread conditions will be added from a disease reference database.", cropCare:"CROP CARE", treatmentTitle:"Treatment plan", treatmentPending:"No pesticide or chemical treatment is prescribed by this prototype yet. Disease-specific, locally appropriate guidance will be added after reference verification.", longTerm:"LONG-TERM CROP HEALTH", preventionTitle:"Prevention & next actions", action1:"Inspect multiple leaves and more than one plant before acting on the prediction.", action2:"Record crop variety, recent weather, irrigation and any recent spray applications.", action3:"Seek confirmation from a qualified agricultural officer if symptoms are spreading or severe.", disclaimerTitle:"Important diagnostic disclaimer", disclaimer:"The model was trained on a limited set of PlantVillage classes. Field images, lighting, crop varieties and similar-looking conditions may affect results. Confirm the condition before applying any treatment.", academic:"Academic project prototype", print:"Print report", pdf:"Download / Save as PDF â†—"
      },
      Hindi: {
        overview:"à¤…à¤µà¤²à¥‹à¤•à¤¨", symptoms:"à¤²à¤•à¥à¤·à¤£", causes:"à¤•à¤¾à¤°à¤£ à¤”à¤° à¤œà¥‹à¤–à¤¿à¤®", treatment:"à¤‰à¤ªà¤šà¤¾à¤° à¤¯à¥‹à¤œà¤¨à¤¾", prevention:"à¤¬à¤šà¤¾à¤µ",
        nav:"à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤¨à¥‡à¤µà¤¿à¤—à¥‡à¤¶à¤¨", complete:"AI à¤µà¤¿à¤¶à¥à¤²à¥‡à¤·à¤£ à¤ªà¥‚à¤°à¤¾ à¤¹à¥à¤†", prototype:"à¤ªà¥à¤°à¥‹à¤Ÿà¥‹à¤Ÿà¤¾à¤‡à¤ª à¤†à¤•à¤²à¤¨", workspace:"à¤µà¤°à¥à¤•à¤¸à¥à¤ªà¥‡à¤¸", doctor:"AI à¤«à¤¸à¤² à¤¡à¥‰à¤•à¥à¤Ÿà¤°", report:"à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ", dashboard:"â† à¤¡à¥ˆà¤¶à¤¬à¥‹à¤°à¥à¤¡",
        eyebrow:"à¤•à¥à¤°à¥‰à¤ªà¤—à¤¾à¤°à¥à¤¡ AI Â· à¤¨à¤¿à¤¦à¤¾à¤¨ à¤•à¥‡à¤‚à¤¦à¥à¤°", title:"à¤«à¤¸à¤² à¤°à¥‹à¤—", titleAccent:"à¤µà¤¿à¤¶à¥à¤²à¥‡à¤·à¤£", subtitle:"AI à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤¤à¥ˆà¤¯à¤¾à¤° à¤ªà¤¤à¥à¤¤à¥€ à¤•à¤¾ à¤†à¤•à¤²à¤¨ à¤”à¤° à¤«à¤¸à¤² à¤¦à¥‡à¤–à¤­à¤¾à¤² à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿà¥¤", reportId:"à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤†à¤ˆà¤¡à¥€",
        analyzed:"à¤µà¤¿à¤¶à¥à¤²à¥‡à¤·à¤¿à¤¤ à¤ªà¤¤à¥à¤¤à¥€", original:"à¤…à¤ªà¤²à¥‹à¤¡ à¤•à¥€ à¤—à¤ˆ à¤®à¥‚à¤² à¤¤à¤¸à¥à¤µà¥€à¤°", source:"à¤®à¥‚à¤² à¤¤à¤¸à¥à¤µà¥€à¤°", noPreview:"à¤¤à¤¸à¥à¤µà¥€à¤° à¤•à¤¾ à¤ªà¥à¤°à¥€à¤µà¥à¤¯à¥‚ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆ", received:"à¤¤à¤¸à¥à¤µà¥€à¤° à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤ à¤¹à¥à¤ˆ", modelPrediction:"à¤®à¥‰à¤¡à¤² à¤•à¤¾ à¤…à¤¨à¥à¤®à¤¾à¤¨", predicted:"à¤…à¤¨à¥à¤®à¤¾à¤¨à¤¿à¤¤ à¤¸à¥à¤¥à¤¿à¤¤à¤¿", classification:"à¤ªà¥Œà¤§à¥‡ à¤•à¥€ à¤ªà¤¤à¥à¤¤à¥€ à¤•à¤¾ à¤µà¤°à¥à¤—à¥€à¤•à¤°à¤£",
        confidence:"à¤…à¤¨à¥à¤®à¤¾à¤¨ à¤•à¤¾ à¤µà¤¿à¤¶à¥à¤µà¤¾à¤¸ à¤¸à¥à¤•à¥‹à¤°", confidenceNote:"à¤¯à¤¹ à¤®à¥‰à¤¡à¤² à¤•à¤¾ à¤¸à¥à¤•à¥‹à¤° à¤¹à¥ˆ, à¤¨à¤¿à¤¦à¤¾à¤¨ à¤•à¥€ à¤¸à¤Ÿà¥€à¤•à¤¤à¤¾ à¤•à¤¾ à¤ªà¥à¤°à¤®à¤¾à¤£à¤¿à¤¤ à¤®à¤¾à¤ª à¤¨à¤¹à¥€à¤‚à¥¤", selectedCrop:"à¤šà¥à¤¨à¥€ à¤—à¤ˆ à¤«à¤¸à¤²", language:"à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¥€ à¤­à¤¾à¤·à¤¾", modelClasses:"à¤®à¥‰à¤¡à¤² à¤•à¥à¤²à¤¾à¤¸", labels:"15 à¤¸à¤®à¤°à¥à¤¥à¤¿à¤¤ à¤²à¥‡à¤¬à¤²",
        explainable:"à¤¸à¤®à¤à¤¾à¤¨à¥‡ à¤¯à¥‹à¤—à¥à¤¯ AI", attention:"AI à¤§à¥à¤¯à¤¾à¤¨ à¤®à¤¾à¤¨à¤šà¤¿à¤¤à¥à¤° Â· Grad-CAM", gradReady:"GRAD-CAM à¤¤à¥ˆà¤¯à¤¾à¤°", mapUnavailable:"à¤®à¥ˆà¤ª à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤¨à¤¹à¥€à¤‚", gradOverlay:"Grad-CAM à¤“à¤µà¤°à¤²à¥‡ Â· à¤®à¥‰à¤¡à¤² à¤‡à¤¨à¤ªà¥à¤Ÿ à¤•à¥à¤°à¥‰à¤ª (224 Ã— 224)", gradMissing:"à¤‡à¤¸ à¤¤à¤¸à¥à¤µà¥€à¤° à¤•à¥‡ à¤²à¤¿à¤ à¤¬à¥ˆà¤•à¤à¤‚à¤¡ à¤¸à¥‡ Grad-CAM à¤®à¥ˆà¤ª à¤¨à¤¹à¥€à¤‚ à¤®à¤¿à¤²à¤¾à¥¤", gradNote:"Grad-CAM à¤‰à¤¨ à¤¹à¤¿à¤¸à¥à¤¸à¥‹à¤‚ à¤•à¥‹ à¤¦à¤¿à¤–à¤¾à¤¤à¤¾ à¤¹à¥ˆ à¤œà¤¿à¤¨à¥à¤¹à¥‹à¤‚à¤¨à¥‡ à¤…à¤¨à¥à¤®à¤¾à¤¨ à¤•à¥‹ à¤ªà¥à¤°à¤­à¤¾à¤µà¤¿à¤¤ à¤•à¤¿à¤¯à¤¾à¥¤ à¤¯à¤¹ à¤¸à¤‚à¤•à¥à¤°à¤®à¤¿à¤¤ à¤Šà¤¤à¤• à¤•à¥€ à¤¸à¤Ÿà¥€à¤• à¤ªà¤¹à¤šà¤¾à¤¨ à¤¯à¤¾ à¤°à¥‹à¤— à¤•à¥€ à¤ªà¥à¤·à¥à¤Ÿà¤¿ à¤¨à¤¹à¥€à¤‚ à¤•à¤°à¤¤à¤¾à¥¤", what:"à¤¯à¤¹ à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¥à¤¯à¤¾ à¤¬à¤¤à¤¾à¤¤à¥€ à¤¹à¥ˆ", classifier:"à¤•à¥à¤²à¤¾à¤¸à¤¿à¤«à¤¾à¤¯à¤° à¤ªà¥‚à¤°à¥€ à¤¤à¤¸à¥à¤µà¥€à¤° à¤•à¥‡ à¤²à¤¿à¤ à¤à¤• à¤²à¥‡à¤¬à¤² à¤•à¤¾ à¤…à¤¨à¥à¤®à¤¾à¤¨ à¤²à¤—à¤¾à¤¤à¤¾ à¤¹à¥ˆà¥¤ Grad-CAM à¤‰à¤¨ à¤¹à¤¿à¤¸à¥à¤¸à¥‹à¤‚ à¤•à¥‹ à¤¦à¤¿à¤–à¤¾à¤¤à¤¾ à¤¹à¥ˆ à¤œà¤¿à¤¨à¥à¤¹à¥‹à¤‚à¤¨à¥‡ à¤…à¤¨à¥à¤®à¤¾à¤¨ à¤•à¥‹ à¤ªà¥à¤°à¤­à¤¾à¤µà¤¿à¤¤ à¤•à¤¿à¤¯à¤¾; à¤¯à¤¹ à¤°à¥‹à¤— à¤•à¥€ à¤¸à¥€à¤®à¤¾ à¤¬à¤¤à¤¾à¤¨à¥‡ à¤µà¤¾à¤²à¤¾ à¤¡à¤¿à¤Ÿà¥‡à¤•à¥à¤Ÿà¤° à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆ à¤”à¤° à¤¸à¤‚à¤•à¥à¤°à¤®à¤¿à¤¤ à¤¹à¤¿à¤¸à¥à¤¸à¥‹à¤‚ à¤•à¥€ à¤ªà¥à¤·à¥à¤Ÿà¤¿ à¤¨à¤¹à¥€à¤‚ à¤•à¤°à¤¤à¤¾à¥¤",
        understand:"à¤¸à¥à¤¥à¤¿à¤¤à¤¿ à¤•à¥‹ à¤¸à¤®à¤à¥‡à¤‚", symptomsTitle:"à¤²à¤•à¥à¤·à¤£ à¤”à¤° à¤ªà¤¹à¤šà¤¾à¤¨", referenceNext:"à¤¸à¤‚à¤¦à¤°à¥à¤­ à¤¸à¤¾à¤®à¤—à¥à¤°à¥€ à¤¬à¤¾à¤¦ à¤®à¥‡à¤‚ à¤œà¥‹à¤¡à¤¼à¥€ à¤œà¤¾à¤à¤—à¥€", symptomsPending:"à¤…à¤—à¤²à¥‡ à¤šà¤°à¤£ à¤®à¥‡à¤‚ à¤°à¥‹à¤— à¤•à¥‡ à¤²à¤•à¥à¤·à¤£à¥‹à¤‚ à¤•à¤¾ à¤µà¤¿à¤µà¤°à¤£ à¤®à¥‰à¤¡à¤² à¤•à¥‡ à¤¸à¤Ÿà¥€à¤• à¤²à¥‡à¤¬à¤² à¤¸à¥‡ à¤œà¥‹à¤¡à¤¼à¤¾ à¤œà¤¾à¤à¤—à¤¾à¥¤ à¤•à¥‡à¤µà¤² à¤®à¥‰à¤¡à¤² à¤²à¥‡à¤¬à¤² à¤•à¥‹ à¤°à¥‹à¤— à¤•à¥€ à¤ªà¥à¤·à¥à¤Ÿà¤¿ à¤¨ à¤®à¤¾à¤¨à¥‡à¤‚à¥¤", visual:"à¤¦à¤¿à¤–à¤¾à¤ˆ à¤¦à¥‡à¤¨à¥‡ à¤µà¤¾à¤²à¥‡ à¤²à¤•à¥à¤·à¤£", visualPending:"à¤µà¤¿à¤¸à¥à¤¤à¥ƒà¤¤ à¤¸à¤‚à¤•à¥‡à¤¤ à¤”à¤° à¤ªà¤¹à¤šà¤¾à¤¨ à¤•à¥€ à¤µà¤¿à¤¶à¥‡à¤·à¤¤à¤¾à¤à¤ à¤¯à¤¹à¤¾à¤ à¤¦à¤¿à¤–à¤¾à¤ˆ à¤¦à¥‡à¤‚à¤—à¥€à¥¤", inspect:"à¤•à¤¹à¤¾à¤ à¤œà¤¾à¤à¤šà¥‡à¤‚", inspectPending:"à¤ªà¤¤à¥à¤¤à¥€ à¤•à¥‡ à¤¹à¤¿à¤¸à¥à¤¸à¥‹à¤‚ à¤”à¤° à¤ªà¥Œà¤§à¥‡ à¤•à¥‡ à¤…à¤¨à¥à¤¯ à¤­à¤¾à¤—à¥‹à¤‚ à¤•à¥€ à¤œà¤¾à¤à¤š à¤•à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤¯à¤¹à¤¾à¤ à¤¦à¤¿à¤–à¤¾à¤ˆ à¤¦à¥‡à¤—à¥€à¥¤", similar:"à¤®à¤¿à¤²à¤¤à¥€-à¤œà¥à¤²à¤¤à¥€ à¤¸à¥à¤¥à¤¿à¤¤à¤¿à¤¯à¤¾à¤", similarPending:"à¤®à¤¿à¤²à¤¤à¥‡-à¤œà¥à¤²à¤¤à¥‡ à¤°à¥‹à¤— à¤”à¤° à¤—à¥ˆà¤°-à¤°à¥‹à¤— à¤•à¤¾à¤°à¤£ à¤¯à¤¹à¤¾à¤ à¤¸à¥‚à¤šà¥€à¤¬à¤¦à¥à¤§ à¤¹à¥‹à¤‚à¤—à¥‡à¥¤",
        risk:"à¤œà¥‹à¤–à¤¿à¤® à¤•à¤¾à¤°à¤•", causesTitle:"à¤•à¤¾à¤°à¤£ à¤”à¤° à¤«à¥ˆà¤²à¤¾à¤µ", causesPending:"à¤…à¤¨à¥à¤®à¤¾à¤¨à¤¿à¤¤ à¤¸à¥à¤¥à¤¿à¤¤à¤¿, à¤‰à¤¸à¤•à¥‡ à¤•à¤¾à¤°à¤£à¥‹à¤‚ à¤”à¤° à¤«à¥ˆà¤²à¤¨à¥‡ à¤•à¥€ à¤ªà¤°à¤¿à¤¸à¥à¤¥à¤¿à¤¤à¤¿à¤¯à¥‹à¤‚ à¤•à¥€ à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤°à¥‹à¤— à¤¸à¤‚à¤¦à¤°à¥à¤­ à¤¡à¥‡à¤Ÿà¤¾à¤¬à¥‡à¤¸ à¤¸à¥‡ à¤œà¥‹à¤¡à¤¼à¥€ à¤œà¤¾à¤à¤—à¥€à¥¤", cropCare:"à¤«à¤¸à¤² à¤•à¥€ à¤¦à¥‡à¤–à¤­à¤¾à¤²", treatmentTitle:"à¤‰à¤ªà¤šà¤¾à¤° à¤¯à¥‹à¤œà¤¨à¤¾", treatmentPending:"à¤‡à¤¸ à¤ªà¥à¤°à¥‹à¤Ÿà¥‹à¤Ÿà¤¾à¤‡à¤ª à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤…à¤­à¥€ à¤•à¤¿à¤¸à¥€ à¤•à¥€à¤Ÿà¤¨à¤¾à¤¶à¤• à¤¯à¤¾ à¤°à¤¾à¤¸à¤¾à¤¯à¤¨à¤¿à¤• à¤‰à¤ªà¤šà¤¾à¤° à¤•à¥€ à¤¸à¤²à¤¾à¤¹ à¤¨à¤¹à¥€à¤‚ à¤¦à¥€ à¤œà¤¾à¤¤à¥€à¥¤ à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¨ à¤•à¥‡ à¤¬à¤¾à¤¦ à¤°à¥‹à¤—-à¤µà¤¿à¤¶à¤¿à¤·à¥à¤Ÿ à¤”à¤° à¤¸à¥à¤¥à¤¾à¤¨à¥€à¤¯ à¤°à¥‚à¤ª à¤¸à¥‡ à¤‰à¤ªà¤¯à¥à¤•à¥à¤¤ à¤®à¤¾à¤°à¥à¤—à¤¦à¤°à¥à¤¶à¤¨ à¤œà¥‹à¤¡à¤¼à¤¾ à¤œà¤¾à¤à¤—à¤¾à¥¤", longTerm:"à¤«à¤¸à¤² à¤•à¤¾ à¤¦à¥€à¤°à¥à¤˜à¤•à¤¾à¤²à¥€à¤¨ à¤¸à¥à¤µà¤¾à¤¸à¥à¤¥à¥à¤¯", preventionTitle:"à¤¬à¤šà¤¾à¤µ à¤”à¤° à¤…à¤—à¤²à¥‡ à¤•à¤¦à¤®", action1:"à¤…à¤¨à¥à¤®à¤¾à¤¨ à¤•à¥‡ à¤†à¤§à¤¾à¤° à¤ªà¤° à¤•à¤¾à¤°à¥à¤°à¤µà¤¾à¤ˆ à¤•à¤°à¤¨à¥‡ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤•à¤ˆ à¤ªà¤¤à¥à¤¤à¤¿à¤¯à¥‹à¤‚ à¤”à¤° à¤à¤• à¤¸à¥‡ à¤…à¤§à¤¿à¤• à¤ªà¥Œà¤§à¥‹à¤‚ à¤•à¥€ à¤œà¤¾à¤à¤š à¤•à¤°à¥‡à¤‚à¥¤", action2:"à¤«à¤¸à¤² à¤•à¥€ à¤•à¤¿à¤¸à¥à¤®, à¤¹à¤¾à¤² à¤•à¤¾ à¤®à¥Œà¤¸à¤®, à¤¸à¤¿à¤‚à¤šà¤¾à¤ˆ à¤”à¤° à¤¹à¤¾à¤² à¤®à¥‡à¤‚ à¤•à¤¿à¤ à¤—à¤ à¤›à¤¿à¤¡à¤¼à¤•à¤¾à¤µ à¤•à¤¾ à¤°à¤¿à¤•à¥‰à¤°à¥à¤¡ à¤°à¤–à¥‡à¤‚à¥¤", action3:"à¤¯à¤¦à¤¿ à¤²à¤•à¥à¤·à¤£ à¤«à¥ˆà¤² à¤°à¤¹à¥‡ à¤¹à¥‹à¤‚ à¤¯à¤¾ à¤—à¤‚à¤­à¥€à¤° à¤¹à¥‹à¤‚, à¤¤à¥‹ à¤•à¥ƒà¤·à¤¿ à¤…à¤§à¤¿à¤•à¤¾à¤°à¥€ à¤¸à¥‡ à¤ªà¥à¤·à¥à¤Ÿà¤¿ à¤²à¥‡à¤‚à¥¤", disclaimerTitle:"à¤¨à¤¿à¤¦à¤¾à¤¨ à¤¸à¤‚à¤¬à¤‚à¤§à¥€ à¤®à¤¹à¤¤à¥à¤µà¤ªà¥‚à¤°à¥à¤£ à¤¸à¥‚à¤šà¤¨à¤¾", disclaimer:"à¤®à¥‰à¤¡à¤² à¤•à¥‹ PlantVillage à¤•à¥€ à¤¸à¥€à¤®à¤¿à¤¤ à¤•à¥à¤²à¤¾à¤¸ à¤ªà¤° à¤ªà¥à¤°à¤¶à¤¿à¤•à¥à¤·à¤¿à¤¤ à¤•à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾ à¤¹à¥ˆà¥¤ à¤–à¥‡à¤¤ à¤•à¥€ à¤¤à¤¸à¥à¤µà¥€à¤°à¥‡à¤‚, à¤°à¥‹à¤¶à¤¨à¥€, à¤«à¤¸à¤² à¤•à¥€ à¤•à¤¿à¤¸à¥à¤®à¥‡à¤‚ à¤”à¤° à¤®à¤¿à¤²à¤¤à¥€-à¤œà¥à¤²à¤¤à¥€ à¤¸à¥à¤¥à¤¿à¤¤à¤¿à¤¯à¤¾à¤ à¤ªà¤°à¤¿à¤£à¤¾à¤® à¤•à¥‹ à¤ªà¥à¤°à¤­à¤¾à¤µà¤¿à¤¤ à¤•à¤° à¤¸à¤•à¤¤à¥€ à¤¹à¥ˆà¤‚à¥¤ à¤•à¥‹à¤ˆ à¤‰à¤ªà¤šà¤¾à¤° à¤•à¤°à¤¨à¥‡ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤¸à¥à¤¥à¤¿à¤¤à¤¿ à¤•à¥€ à¤ªà¥à¤·à¥à¤Ÿà¤¿ à¤•à¤°à¥‡à¤‚à¥¤", academic:"à¤¶à¥ˆà¤•à¥à¤·à¤£à¤¿à¤• à¤ªà¥à¤°à¥‹à¤œà¥‡à¤•à¥à¤Ÿ à¤ªà¥à¤°à¥‹à¤Ÿà¥‹à¤Ÿà¤¾à¤‡à¤ª", print:"à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤ªà¥à¤°à¤¿à¤‚à¤Ÿ à¤•à¤°à¥‡à¤‚", pdf:"PDF à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ / à¤¸à¥‡à¤µ à¤•à¤°à¥‡à¤‚ â†—"
      },
      Marathi: {
        overview:"à¤†à¤¢à¤¾à¤µà¤¾", symptoms:"à¤²à¤•à¥à¤·à¤£à¥‡", causes:"à¤•à¤¾à¤°à¤£à¥‡ à¤†à¤£à¤¿ à¤§à¥‹à¤•à¥‡", treatment:"à¤‰à¤ªà¤šà¤¾à¤° à¤¯à¥‹à¤œà¤¨à¤¾", prevention:"à¤ªà¥à¤°à¤¤à¤¿à¤¬à¤‚à¤§",
        nav:"à¤…à¤¹à¤µà¤¾à¤² à¤¨à¥‡à¤µà¥à¤¹à¤¿à¤—à¥‡à¤¶à¤¨", complete:"AI à¤µà¤¿à¤¶à¥à¤²à¥‡à¤·à¤£ à¤ªà¥‚à¤°à¥à¤£", prototype:"à¤ªà¥à¤°à¥‹à¤Ÿà¥‹à¤Ÿà¤¾à¤‡à¤ª à¤®à¥‚à¤²à¥à¤¯à¤¾à¤‚à¤•à¤¨", workspace:"à¤µà¤°à¥à¤•à¤¸à¥à¤ªà¥‡à¤¸", doctor:"AI à¤ªà¥€à¤• à¤¡à¥‰à¤•à¥à¤Ÿà¤°", report:"à¤…à¤¹à¤µà¤¾à¤²", dashboard:"â† à¤¡à¥…à¤¶à¤¬à¥‹à¤°à¥à¤¡",
        eyebrow:"à¤•à¥à¤°à¥‰à¤ªà¤—à¤¾à¤°à¥à¤¡ AI Â· à¤¨à¤¿à¤¦à¤¾à¤¨ à¤•à¥‡à¤‚à¤¦à¥à¤°", title:"à¤ªà¥€à¤• à¤°à¥‹à¤—", titleAccent:"à¤µà¤¿à¤¶à¥à¤²à¥‡à¤·à¤£", subtitle:"AI à¤¦à¥à¤µà¤¾à¤°à¥‡ à¤¤à¤¯à¤¾à¤° à¤•à¥‡à¤²à¥‡à¤²à¥‡ à¤ªà¤¾à¤¨à¤¾à¤šà¥‡ à¤®à¥‚à¤²à¥à¤¯à¤¾à¤‚à¤•à¤¨ à¤†à¤£à¤¿ à¤ªà¥€à¤• à¤•à¤¾à¤³à¤œà¥€ à¤…à¤¹à¤µà¤¾à¤².", reportId:"à¤…à¤¹à¤µà¤¾à¤² à¤•à¥à¤°à¤®à¤¾à¤‚à¤•",
        analyzed:"à¤µà¤¿à¤¶à¥à¤²à¥‡à¤·à¤¿à¤¤ à¤ªà¤¾à¤¨", original:"à¤…à¤ªà¤²à¥‹à¤¡ à¤•à¥‡à¤²à¥‡à¤²à¥‡ à¤®à¥‚à¤³ à¤›à¤¾à¤¯à¤¾à¤šà¤¿à¤¤à¥à¤°", source:"à¤®à¥‚à¤³ à¤›à¤¾à¤¯à¤¾à¤šà¤¿à¤¤à¥à¤°", noPreview:"à¤›à¤¾à¤¯à¤¾à¤šà¤¿à¤¤à¥à¤°à¤¾à¤šà¥‡ à¤ªà¥‚à¤°à¥à¤µà¤¦à¥ƒà¤¶à¥à¤¯ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤¨à¤¾à¤¹à¥€", received:"à¤›à¤¾à¤¯à¤¾à¤šà¤¿à¤¤à¥à¤° à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤ à¤à¤¾à¤²à¥‡", modelPrediction:"à¤®à¥‰à¤¡à¥‡à¤²à¤šà¤¾ à¤…à¤‚à¤¦à¤¾à¤œ", predicted:"à¤…à¤‚à¤¦à¤¾à¤œà¤¿à¤¤ à¤¸à¥à¤¥à¤¿à¤¤à¥€", classification:"à¤µà¤¨à¤¸à¥à¤ªà¤¤à¥€à¤šà¥à¤¯à¤¾ à¤ªà¤¾à¤¨à¤¾à¤‚à¤šà¥‡ à¤µà¤°à¥à¤—à¥€à¤•à¤°à¤£",
        confidence:"à¤…à¤‚à¤¦à¤¾à¤œà¤¾à¤šà¤¾ à¤µà¤¿à¤¶à¥à¤µà¤¾à¤¸ à¤—à¥à¤£", confidenceNote:"à¤¹à¤¾ à¤®à¥‰à¤¡à¥‡à¤²à¤šà¤¾ à¤—à¥à¤£ à¤†à¤¹à¥‡; à¤¨à¤¿à¤¦à¤¾à¤¨à¤¾à¤šà¥à¤¯à¤¾ à¤…à¤šà¥‚à¤•à¤¤à¥‡à¤šà¥‡ à¤ªà¥à¤°à¤®à¤¾à¤£à¤¿à¤¤ à¤®à¥‹à¤œà¤®à¤¾à¤ª à¤¨à¤¾à¤¹à¥€.", selectedCrop:"à¤¨à¤¿à¤µà¤¡à¤²à¥‡à¤²à¥‡ à¤ªà¥€à¤•", language:"à¤…à¤¹à¤µà¤¾à¤²à¤¾à¤šà¥€ à¤­à¤¾à¤·à¤¾", modelClasses:"à¤®à¥‰à¤¡à¥‡à¤² à¤µà¤°à¥à¤—", labels:"15 à¤¸à¤®à¤°à¥à¤¥à¤¿à¤¤ à¤²à¥‡à¤¬à¤²",
        explainable:"à¤¸à¥à¤ªà¤·à¥à¤Ÿà¥€à¤•à¤°à¤£à¤•à¥à¤·à¤® AI", attention:"AI à¤²à¤•à¥à¤· à¤¨à¤•à¤¾à¤¶à¤¾ Â· Grad-CAM", gradReady:"GRAD-CAM à¤¤à¤¯à¤¾à¤°", mapUnavailable:"à¤¨à¤•à¤¾à¤¶à¤¾ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤¨à¤¾à¤¹à¥€", gradOverlay:"Grad-CAM à¤“à¤µà¥à¤¹à¤°à¤²à¥‡ Â· à¤®à¥‰à¤¡à¥‡à¤² à¤‡à¤¨à¤ªà¥à¤Ÿ à¤•à¥à¤°à¥‰à¤ª (224 Ã— 224)", gradMissing:"à¤¯à¤¾ à¤›à¤¾à¤¯à¤¾à¤šà¤¿à¤¤à¥à¤°à¤¾à¤¸à¤¾à¤ à¥€ à¤¬à¥…à¤•à¤à¤‚à¤¡à¤•à¤¡à¥‚à¤¨ Grad-CAM à¤¨à¤•à¤¾à¤¶à¤¾ à¤®à¤¿à¤³à¤¾à¤²à¤¾ à¤¨à¤¾à¤¹à¥€.", gradNote:"Grad-CAM à¤…à¤‚à¤¦à¤¾à¤œà¤¾à¤µà¤° à¤ªà¤°à¤¿à¤£à¤¾à¤® à¤•à¤°à¤£à¤¾à¤°à¥‡ à¤­à¤¾à¤— à¤¦à¤¾à¤–à¤µà¤¤à¥‡. à¤¤à¥‡ à¤¸à¤‚à¤•à¥à¤°à¤®à¤¿à¤¤ à¤Šà¤¤à¤•à¤¾à¤šà¥€ à¤…à¤šà¥‚à¤• à¤“à¤³à¤– à¤•à¤¿à¤‚à¤µà¤¾ à¤°à¥‹à¤—à¤¾à¤šà¥€ à¤ªà¥à¤·à¥à¤Ÿà¥€ à¤•à¤°à¤¤ à¤¨à¤¾à¤¹à¥€.", what:"à¤¹à¤¾ à¤…à¤¹à¤µà¤¾à¤² à¤•à¤¾à¤¯ à¤¸à¤¾à¤‚à¤—à¤¤à¥‹", classifier:"à¤•à¥à¤²à¤¾à¤¸à¤¿à¤«à¤¾à¤¯à¤° à¤¸à¤‚à¤ªà¥‚à¤°à¥à¤£ à¤›à¤¾à¤¯à¤¾à¤šà¤¿à¤¤à¥à¤°à¤¾à¤¸à¤¾à¤ à¥€ à¤à¤•à¤¾ à¤²à¥‡à¤¬à¤²à¤šà¤¾ à¤…à¤‚à¤¦à¤¾à¤œ à¤²à¤¾à¤µà¤¤à¥‹. Grad-CAM à¤¤à¥à¤¯à¤¾ à¤…à¤‚à¤¦à¤¾à¤œà¤¾à¤µà¤° à¤ªà¤°à¤¿à¤£à¤¾à¤® à¤•à¤°à¤£à¤¾à¤°à¥‡ à¤­à¤¾à¤— à¤¦à¤¾à¤–à¤µà¤¤à¥‡; à¤¤à¥‡ à¤°à¥‹à¤—à¤¾à¤šà¥€ à¤¸à¥€à¤®à¤¾ à¤¶à¥‹à¤§à¤£à¤¾à¤°à¥‡ à¤¸à¤¾à¤§à¤¨ à¤¨à¤¾à¤¹à¥€ à¤†à¤£à¤¿ à¤¦à¤¾à¤–à¤µà¤²à¥‡à¤²à¥‡ à¤­à¤¾à¤— à¤¸à¤‚à¤•à¥à¤°à¤®à¤¿à¤¤ à¤…à¤¸à¤²à¥à¤¯à¤¾à¤šà¥‡ à¤¸à¤¿à¤¦à¥à¤§ à¤•à¤°à¤¤ à¤¨à¤¾à¤¹à¥€.",
        understand:"à¤¸à¥à¤¥à¤¿à¤¤à¥€ à¤¸à¤®à¤œà¥‚à¤¨ à¤˜à¥à¤¯à¤¾", symptomsTitle:"à¤²à¤•à¥à¤·à¤£à¥‡ à¤†à¤£à¤¿ à¤“à¤³à¤–", referenceNext:"à¤¸à¤‚à¤¦à¤°à¥à¤­ à¤®à¤¾à¤¹à¤¿à¤¤à¥€ à¤ªà¥à¤¢à¥€à¤² à¤Ÿà¤ªà¥à¤ªà¥à¤¯à¤¾à¤¤", symptomsPending:"à¤ªà¥à¤¢à¥€à¤² à¤Ÿà¤ªà¥à¤ªà¥à¤¯à¤¾à¤¤ à¤°à¥‹à¤—à¤µà¤¿à¤¶à¤¿à¤·à¥à¤Ÿ à¤²à¤•à¥à¤·à¤£à¤¾à¤‚à¤šà¥‡ à¤µà¤°à¥à¤£à¤¨ à¤®à¥‰à¤¡à¥‡à¤²à¤šà¥à¤¯à¤¾ à¤…à¤šà¥‚à¤• à¤²à¥‡à¤¬à¤²à¤¶à¥€ à¤œà¥‹à¤¡à¤²à¥‡ à¤œà¤¾à¤ˆà¤². à¤•à¥‡à¤µà¤³ à¤®à¥‰à¤¡à¥‡à¤² à¤²à¥‡à¤¬à¤²à¤²à¤¾ à¤°à¥‹à¤—à¤¾à¤šà¥€ à¤ªà¥à¤·à¥à¤Ÿà¥€ à¤¸à¤®à¤œà¥‚ à¤¨à¤•à¤¾.", visual:"à¤¦à¤¿à¤¸à¤£à¤¾à¤°à¥€ à¤²à¤•à¥à¤·à¤£à¥‡", visualPending:"à¤¤à¤ªà¤¶à¥€à¤²à¤µà¤¾à¤° à¤šà¤¿à¤¨à¥à¤¹à¥‡ à¤†à¤£à¤¿ à¤µà¥‡à¤—à¤³à¥€ à¤“à¤³à¤–à¤£à¥à¤¯à¤¾à¤šà¥€ à¤µà¥ˆà¤¶à¤¿à¤·à¥à¤Ÿà¥à¤¯à¥‡ à¤¯à¥‡à¤¥à¥‡ à¤¦à¤¿à¤¸à¤¤à¥€à¤².", inspect:"à¤•à¥à¤ à¥‡ à¤¤à¤ªà¤¾à¤¸à¤¾à¤µà¥‡", inspectPending:"à¤ªà¤¾à¤¨à¤¾à¤‚à¤šà¥‡ à¤­à¤¾à¤— à¤†à¤£à¤¿ à¤µà¤¨à¤¸à¥à¤ªà¤¤à¥€à¤šà¥à¤¯à¤¾ à¤‡à¤¤à¤° à¤­à¤¾à¤—à¤¾à¤‚à¤šà¥€ à¤¤à¤ªà¤¾à¤¸à¤£à¥€ à¤¯à¥‡à¤¥à¥‡ à¤¦à¤¾à¤–à¤µà¤²à¥€ à¤œà¤¾à¤ˆà¤².", similar:"à¤¸à¤¾à¤°à¤–à¥à¤¯à¤¾ à¤¦à¤¿à¤¸à¤£à¤¾à¤±à¥à¤¯à¤¾ à¤¸à¥à¤¥à¤¿à¤¤à¥€", similarPending:"à¤¸à¤¾à¤°à¤–à¥‡ à¤°à¥‹à¤— à¤†à¤£à¤¿ à¤°à¥‹à¤— à¤¨à¤¸à¤²à¥‡à¤²à¥€ à¤•à¤¾à¤°à¤£à¥‡ à¤¯à¥‡à¤¥à¥‡ à¤¦à¤¿à¤²à¥€ à¤œà¤¾à¤¤à¥€à¤².",
        risk:"à¤§à¥‹à¤•à¤¾ à¤˜à¤Ÿà¤•", causesTitle:"à¤•à¤¾à¤°à¤£à¥‡ à¤†à¤£à¤¿ à¤ªà¥à¤°à¤¸à¤¾à¤°", causesPending:"à¤…à¤‚à¤¦à¤¾à¤œà¤¿à¤¤ à¤¸à¥à¤¥à¤¿à¤¤à¥€, à¤¤à¤¿à¤šà¥€ à¤•à¤¾à¤°à¤£à¥‡ à¤†à¤£à¤¿ à¤ªà¥à¤°à¤¸à¤¾à¤°à¤¾à¤šà¥à¤¯à¤¾ à¤ªà¤°à¤¿à¤¸à¥à¤¥à¤¿à¤¤à¥€à¤šà¥€ à¤ªà¤¡à¤¤à¤¾à¤³à¤²à¥‡à¤²à¥€ à¤®à¤¾à¤¹à¤¿à¤¤à¥€ à¤°à¥‹à¤— à¤¸à¤‚à¤¦à¤°à¥à¤­ à¤¡à¥‡à¤Ÿà¤¾à¤¬à¥‡à¤¸à¤®à¤§à¥‚à¤¨ à¤œà¥‹à¤¡à¤²à¥€ à¤œà¤¾à¤ˆà¤².", cropCare:"à¤ªà¥€à¤• à¤•à¤¾à¤³à¤œà¥€", treatmentTitle:"à¤‰à¤ªà¤šà¤¾à¤° à¤¯à¥‹à¤œà¤¨à¤¾", treatmentPending:"à¤¯à¤¾ à¤ªà¥à¤°à¥‹à¤Ÿà¥‹à¤Ÿà¤¾à¤‡à¤ªà¤•à¤¡à¥‚à¤¨ à¤…à¤¦à¥à¤¯à¤¾à¤ª à¤•à¥€à¤Ÿà¤•à¤¨à¤¾à¤¶à¤• à¤•à¤¿à¤‚à¤µà¤¾ à¤°à¤¾à¤¸à¤¾à¤¯à¤¨à¤¿à¤• à¤‰à¤ªà¤šà¤¾à¤° à¤¸à¥à¤šà¤µà¤²à¥‡ à¤œà¤¾à¤¤ à¤¨à¤¾à¤¹à¥€à¤¤. à¤ªà¤¡à¤¤à¤¾à¤³à¤£à¥€à¤¨à¤‚à¤¤à¤° à¤°à¥‹à¤—à¤µà¤¿à¤¶à¤¿à¤·à¥à¤Ÿ à¤†à¤£à¤¿ à¤¸à¥à¤¥à¤¾à¤¨à¤¿à¤• à¤ªà¤°à¤¿à¤¸à¥à¤¥à¤¿à¤¤à¥€à¤¨à¥à¤¸à¤¾à¤° à¤®à¤¾à¤°à¥à¤—à¤¦à¤°à¥à¤¶à¤¨ à¤œà¥‹à¤¡à¤²à¥‡ à¤œà¤¾à¤ˆà¤².", longTerm:"à¤ªà¤¿à¤•à¤¾à¤šà¥‡ à¤¦à¥€à¤°à¥à¤˜à¤•à¤¾à¤²à¥€à¤¨ à¤†à¤°à¥‹à¤—à¥à¤¯", preventionTitle:"à¤ªà¥à¤°à¤¤à¤¿à¤¬à¤‚à¤§ à¤†à¤£à¤¿ à¤ªà¥à¤¢à¥€à¤² à¤•à¥ƒà¤¤à¥€", action1:"à¤…à¤‚à¤¦à¤¾à¤œà¤¾à¤¨à¥à¤¸à¤¾à¤° à¤•à¥ƒà¤¤à¥€ à¤•à¤°à¤£à¥à¤¯à¤¾à¤ªà¥‚à¤°à¥à¤µà¥€ à¤…à¤¨à¥‡à¤• à¤ªà¤¾à¤¨à¥‡ à¤†à¤£à¤¿ à¤à¤•à¤¾à¤ªà¥‡à¤•à¥à¤·à¤¾ à¤œà¤¾à¤¸à¥à¤¤ à¤à¤¾à¤¡à¤¾à¤‚à¤šà¥€ à¤¤à¤ªà¤¾à¤¸à¤£à¥€ à¤•à¤°à¤¾.", action2:"à¤ªà¤¿à¤•à¤¾à¤šà¥€ à¤œà¤¾à¤¤, à¤…à¤²à¥€à¤•à¤¡à¥€à¤² à¤¹à¤µà¤¾à¤®à¤¾à¤¨, à¤¸à¤¿à¤‚à¤šà¤¨ à¤†à¤£à¤¿ à¤…à¤²à¥€à¤•à¤¡à¥€à¤² à¤«à¤µà¤¾à¤°à¤£à¥à¤¯à¤¾à¤‚à¤šà¥€ à¤¨à¥‹à¤‚à¤¦ à¤ à¥‡à¤µà¤¾.", action3:"à¤²à¤•à¥à¤·à¤£à¥‡ à¤ªà¤¸à¤°à¤¤ à¤…à¤¸à¤¤à¥€à¤² à¤•à¤¿à¤‚à¤µà¤¾ à¤—à¤‚à¤­à¥€à¤° à¤…à¤¸à¤¤à¥€à¤² à¤¤à¤° à¤ªà¤¾à¤¤à¥à¤° à¤•à¥ƒà¤·à¥€ à¤…à¤§à¤¿à¤•à¤¾à¤±à¥à¤¯à¤¾à¤•à¤¡à¥‚à¤¨ à¤–à¤¾à¤¤à¥à¤°à¥€ à¤•à¤°à¥‚à¤¨ à¤˜à¥à¤¯à¤¾.", disclaimerTitle:"à¤¨à¤¿à¤¦à¤¾à¤¨à¤¾à¤¬à¤¾à¤¬à¤¤ à¤®à¤¹à¤¤à¥à¤¤à¥à¤µà¤¾à¤šà¥€ à¤¸à¥‚à¤šà¤¨à¤¾", disclaimer:"à¤®à¥‰à¤¡à¥‡à¤²à¤²à¤¾ PlantVillage à¤®à¤§à¥€à¤² à¤®à¤°à¥à¤¯à¤¾à¤¦à¤¿à¤¤ à¤µà¤°à¥à¤—à¤¾à¤‚à¤µà¤° à¤ªà¥à¤°à¤¶à¤¿à¤•à¥à¤·à¤¿à¤¤ à¤•à¥‡à¤²à¥‡ à¤†à¤¹à¥‡. à¤¶à¥‡à¤¤à¤¾à¤¤à¥€à¤² à¤›à¤¾à¤¯à¤¾à¤šà¤¿à¤¤à¥à¤°à¥‡, à¤ªà¥à¤°à¤•à¤¾à¤¶, à¤ªà¤¿à¤•à¤¾à¤‚à¤šà¥à¤¯à¤¾ à¤œà¤¾à¤¤à¥€ à¤†à¤£à¤¿ à¤¸à¤¾à¤°à¤–à¥à¤¯à¤¾ à¤¦à¤¿à¤¸à¤£à¤¾à¤±à¥à¤¯à¤¾ à¤¸à¥à¤¥à¤¿à¤¤à¥€à¤‚à¤®à¥à¤³à¥‡ à¤ªà¤°à¤¿à¤£à¤¾à¤® à¤¬à¤¦à¤²à¥‚ à¤¶à¤•à¤¤à¤¾à¤¤. à¤•à¥‹à¤£à¤¤à¤¾à¤¹à¥€ à¤‰à¤ªà¤šà¤¾à¤° à¤•à¤°à¤£à¥à¤¯à¤¾à¤ªà¥‚à¤°à¥à¤µà¥€ à¤¸à¥à¤¥à¤¿à¤¤à¥€à¤šà¥€ à¤–à¤¾à¤¤à¥à¤°à¥€ à¤•à¤°à¤¾.", academic:"à¤¶à¥ˆà¤•à¥à¤·à¤£à¤¿à¤• à¤ªà¥à¤°à¤•à¤²à¥à¤ª à¤ªà¥à¤°à¥‹à¤Ÿà¥‹à¤Ÿà¤¾à¤‡à¤ª", print:"à¤…à¤¹à¤µà¤¾à¤² à¤ªà¥à¤°à¤¿à¤‚à¤Ÿ à¤•à¤°à¤¾", pdf:"PDF à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ / à¤¸à¥‡à¤µà¥à¤¹ à¤•à¤°à¤¾ â†—"
      }
    }[language as "English" | "Hindi" | "Marathi"];

    const sections = [
      { id: "overview", label: reportText.overview, number: "01" },
      { id: "symptoms", label: reportText.symptoms, number: "02" },
      { id: "causes", label: reportText.causes, number: "03" },
      { id: "treatment", label: reportText.treatment, number: "04" },
      { id: "prevention", label: reportText.prevention, number: "05" },
    ];

    return (
      <div className="report-shell">
        <aside className="report-sidebar">
          <button className="report-brand" onClick={() => setShowReport(false)}>
            <span className="report-brand-mark">âœ³</span>
            <span>
              <strong>CropGuard <em>AI</em></strong>
              <small>INTELLIGENT CROP CARE</small>
            </span>
          </button>

          <div className="report-sidebar-label">{reportText.nav}</div>
          <nav className="report-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                className={activeReportSection === section.id ? "active" : ""}
                onClick={() => {
                  setActiveReportSection(section.id);
                  document.getElementById(`report-${section.id}`)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                <span>{section.number}</span>
                {section.label}
              </button>
            ))}
          </nav>

          <div className="report-sidebar-bottom">
            <span className="report-status-dot" />
            <div>
              <strong>{reportText.complete}</strong>
              <small>{reportText.prototype}</small>
            </div>
          </div>
        </aside>

        <main className="report-main">
          <header className="report-topbar">
            <div className="report-breadcrumb">
              {reportText.workspace} <span>/</span> {reportText.doctor} <span>/</span> {reportText.report}
            </div>
            <div className="report-top-actions">
              <span className="report-complete-pill">
                <i /> {reportText.complete}
              </span>
              <button className="report-back-button" onClick={() => setShowReport(false)}>
                {reportText.dashboard}
              </button>
            </div>
          </header>

          <div className="report-content">
            <section className="report-heading">
              <div>
                <div className="report-eyebrow">{reportText.eyebrow}</div>
                <h1>{reportText.title} <span>{reportText.titleAccent}</span></h1>
                <p>{reportText.subtitle}</p>
              </div>
              <div className="report-heading-meta">
                <small>{reportText.reportId}</small>
                <strong>{reportId}</strong>
                <small>{reportDate}</small>
                <select aria-label="Report language" value={language} onChange={(event) => setLanguage(event.target.value)} style={{ marginTop: 10, padding: "8px 12px", border: "1px solid #dce7dc", borderRadius: 8, background: "#fff", color: "#183d2c", fontWeight: 600, cursor: "pointer" }}>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Marathi</option>
                </select>
              </div>
            </section>

            <section className="report-hero-grid" id="report-overview">
              <article className="report-image-card">
                <div className="report-card-topline">
                  <div>
                    <span className="report-step">01</span>
                    <div>
                      <h2>{reportText.analyzed}</h2>
                      <p>{reportText.original}</p>
                    </div>
                  </div>
                  <span className="report-image-tag">{reportText.source}</span>
                </div>
                {image ? (
                  <img className="report-leaf-image" src={image} alt="Uploaded leaf analyzed by CropGuard AI" />
                ) : (
                  <div className="report-image-empty">{reportText.noPreview}</div>
                )}
                <div className="report-image-footer">
                  <span><i /> {reportText.received}</span>
                  <span>{result.width} Ã— {result.height}px</span>
                </div>
              </article>

              <article className="report-diagnosis-card">
                <div className="report-diagnosis-top">
                  <span className="report-step">02</span>
                  <span className="report-detected-label"><i /> {reportText.modelPrediction}</span>
                </div>
                <div className="report-disease-kicker">{reportText.predicted}</div>
                <h2>{diseaseName}</h2>
                <p className="report-disease-subtitle">
                  {crop} Â· {reportText.classification}
                </p>

                <div className="report-confidence-block">
                  <div className="report-confidence-head">
                    <span>{reportText.confidence}</span>
                    <strong>{confidence.toFixed(1)}%</strong>
                  </div>
                  <div className="report-confidence-track">
                    <div style={{ width: `${confidence}%` }} />
                  </div>
                  <small>{reportText.confidenceNote}</small>
                </div>

                <div className="report-diagnosis-facts">
                  <div><span>{reportText.selectedCrop}</span><strong>{crop}</strong></div>
                  <div><span>{reportText.language}</span><strong>{language}</strong></div>
                  <div><span>{reportText.modelClasses}</span><strong>{reportText.labels}</strong></div>
                </div>
              </article>
            </section>

            <section className="report-section-card" aria-label="Grad-CAM explainability">
              <div className="report-section-heading">
                <div>
                  <span className="report-step">03</span>
                  <div>
                    <div className="report-eyebrow">{reportText.explainable}</div>
                    <h2>{reportText.attention}</h2>
                  </div>
                </div>
                <span className="report-coming">
                  {result.explainability?.available ? reportText.gradReady : reportText.mapUnavailable}
                </span>
              </div>
              {result.explainability?.available && result.explainability.overlay_data_url ? (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "18px",
                  marginTop: "18px"
                }}>
                  <div>
                    {image && <img
                      src={image}
                      alt="Original uploaded leaf"
                      style={{ width: "100%", height: "auto", maxHeight: "360px", objectFit: "contain", borderRadius: "12px", background: "#edf2ed" }}
                    />}
                    <p className="report-section-intro">Original uploaded image</p>
                  </div>
                  <div>
                    <img
                      src={result.explainability.overlay_data_url}
                      alt="Grad-CAM heatmap overlay showing image regions that influenced the model prediction"
                      style={{ width: "100%", height: "auto", maxHeight: "360px", objectFit: "contain", borderRadius: "12px", background: "#edf2ed" }}
                    />
                    <p className="report-section-intro">{reportText.gradOverlay}</p>
                  </div>
                </div>
              ) : (
                <p className="report-section-intro">
                  {result.explainability?.note || reportText.gradMissing}
                </p>
              )}
              <p className="report-section-intro" style={{ marginTop: "12px" }}>
                {result.explainability?.note || reportText.gradNote}
              </p>
            </section>

            <section className="report-explain-banner">
              <div className="report-explain-icon">âœ³</div>
              <div>
                <strong>{reportText.what}</strong>
                <p>
                  {reportText.classifier}
                </p>
              </div>
              <span className="report-beta">
                {result.explainability?.available ? "XAI Â· GRAD-CAM" : "XAI Â· UNAVAILABLE"}
              </span>
            </section>

            <section className="report-section-card" id="report-symptoms">
              <div className="report-section-heading">
                <div><span className="report-step">03</span><div>
                  <div className="report-eyebrow">{reportText.understand}</div>
                  <h2>{reportText.symptomsTitle}</h2>
                </div></div>
                <span className="report-coming">{reportText.referenceNext}</span>
              </div>
              <p className="report-section-intro">
                {reportText.symptomsPending}
              </p>
              <div className="report-info-grid">
                <div className="report-info-tile">
                  <span className="report-info-icon">âŒ•</span>
                  <strong>{reportText.visual}</strong>
                  <p>{reportText.visualPending}</p>
                </div>
                <div className="report-info-tile">
                  <span className="report-info-icon">â—‰</span>
                  <strong>{reportText.inspect}</strong>
                  <p>{reportText.inspectPending}</p>
                </div>
                <div className="report-info-tile">
                  <span className="report-info-icon">âœ³</span>
                  <strong>{reportText.similar}</strong>
                  <p>{reportText.similarPending}</p>
                </div>
              </div>
            </section>

            <section className="report-two-column">
              <article className="report-section-card" id="report-causes">
                <div className="report-section-heading">
                  <div><span className="report-step">04</span><div>
                    <div className="report-eyebrow">{reportText.risk}</div>
                    <h2>{reportText.causesTitle}</h2>
                  </div></div>
                </div>
                <p className="report-section-intro">
                  {reportText.causesPending}
                </p>
              </article>

              <article className="report-section-card" id="report-treatment">
                <div className="report-section-heading">
                  <div><span className="report-step">05</span><div>
                    <div className="report-eyebrow">CROP CARE</div>
                    <h2>{reportText.treatmentTitle}</h2>
                  </div></div>
                </div>
                <p className="report-section-intro">
                  {reportText.treatmentPending}
                </p>
              </article>
            </section>

            <section className="report-section-card" id="report-prevention">
              <div className="report-section-heading">
                <div><span className="report-step">06</span><div>
                  <div className="report-eyebrow">{reportText.longTerm}</div>
                  <h2>{reportText.preventionTitle}</h2>
                </div></div>
              </div>
              <div className="report-action-list">
                <div><span>01</span><p>{reportText.action1}</p></div>
                <div><span>02</span><p>{reportText.action2}</p></div>
                <div><span>03</span><p>{reportText.action3}</p></div>
              </div>
            </section>

            <section className="report-disclaimer">
              <span>!</span>
              <div>
                <strong>{reportText.disclaimerTitle}</strong>
                <p>{prediction.warning} {reportText.disclaimer}</p>
              </div>
            </section>

            <footer className="report-footer">
              <span>CropGuard AI <i>Â·</i> Academic project prototype</span>
              <div>
                <button onClick={printReport}>{reportText.print}</button>
                <button className="report-primary-action" onClick={printReport}>{reportText.pdf}</button>
              </div>
            </footer>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">âœ³</div>
          <div>
            <h2>CropGuard<span> AI</span></h2>
            <p>INTELLIGENT CROP CARE</p>
          </div>
        </div>

        <p className="nav-label">WORKSPACE</p>
        <button className="nav-item active" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          â–¦ <span>Dashboard</span>
        </button>
        <button className="nav-item" onClick={scrollToDoctor}>âŒ• <span>AI Crop Doctor</span></button>
        <button className="nav-item" onClick={() => setError("Report history will be available after database integration.")}>
          â–¤ <span>My Reports</span>
        </button>
        <button className="nav-item" onClick={() => setError("Model insights will be available after model evaluation.")}>
          â—ˆ <span>Model Insights</span>
        </button>

        <div className="sidebar-bottom">
          <div className="status-dot" />
          <span>Crop Disease Detection Platform</span>
          <small>Prototype v0.3</small>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> Dashboard</div>
          <div className="top-right">
            <span className="online">
              <i style={{ background: backendOnline === null ? "#d5a34a" : backendOnline ? "#79b968" : "#d86b62" }} />
              {backendOnline === null ? "Checking server" : backendOnline ? "Backend connected" : "Backend offline"}
            </span>
            <div className="avatar">CG</div>
          </div>
        </header>

        <section className="welcome">
          <div>
            <p className="eyebrow">YOUR FARM, BETTER INFORMED</p>
            <h1>Good farming starts with <span>healthy crops.</span></h1>
            <p className="subheading">
              Analyze leaf images, understand crop health, and explore evidence-based care guidance.
            </p>
          </div>
          <div className="welcome-art" aria-hidden="true">
            <div className="art-circle">âœ³</div>
            <div className="art-leaf">â§</div>
            <span>AI Â· AGRICULTURE Â· CARE</span>
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card"><div className="stat-icon">âŒ•</div><p>AI Crop Doctor</p><h3>Image analysis</h3><small>Upload a leaf photo to begin</small></div>
          <div className="stat-card"><div className="stat-icon">â—‰</div><p>Supported languages</p><h3>3 languages</h3><small>English Â· Hindi Â· Marathi</small></div>
          <div className="stat-card"><div className="stat-icon">âœ“</div><p>AI model</p><h3>15 classes</h3><small>Tomato Â· Potato Â· Pepper</small></div>
        </section>

        <section className="doctor-section" id="doctor">
          <div className="section-heading">
            <div>
              <p className="eyebrow">AI-POWERED CROP ANALYSIS</p>
              <h2>AI Crop Doctor</h2>
              <p>Start with a clear photo of the affected leaf.</p>
            </div>
            <span className="beta-tag">PREVIEW</span>
          </div>

          <div className="doctor-grid">
            <div className="upload-card">
              <div className="card-heading">
                <span className="step-number">01</span>
                <div><h3>Upload leaf image</h3><p>JPG, PNG or WEBP Â· Maximum 8 MB</p></div>
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                hidden
                onChange={(event) => handleImage(event.target.files?.[0])}
              />

              <div
                className={`drop-zone ${image ? "has-image" : ""}`}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => { event.preventDefault(); handleImage(event.dataTransfer.files[0]); }}
                onClick={() => fileRef.current?.click()}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    fileRef.current?.click();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Upload a crop leaf image"
              >
                {image ? (
                  <>
                    <img className="leaf-preview" src={image} alt="{reportText.selectedCrop} leaf preview" />
                    <strong>{file?.name}</strong>
                    <span>Click to choose a different image</span>
                  </>
                ) : (
                  <>
                    <div className="upload-icon">â†‘</div>
                    <strong>Drop your leaf image here</strong>
                    <span>or click to browse files</span>
                    <div className="browse-button">Choose image</div>
                  </>
                )}
              </div>



              <button className="analyze-button" disabled={!file || isUploading} onClick={() => void uploadForValidation()}>
                {isUploading ? "Analyzing leaf..." : "Analyze leaf with AI"} <span>â†’</span>
              </button>

              {error && <p className="privacy-note" role="alert">âš  {error}</p>}
              <p className="privacy-note">
                Predictions are experimental. The report will show the model output and its limitations.
              </p>
            </div>

            <div className="guide-column">
              <div className="guide-card">
                <div className="guide-icon">âœ³</div>
                <p className="eyebrow">FOR BETTER RESULTS</p>
                <h3>Capture a clear leaf photo.</h3>
                <ul>
                  <li>Use natural, even lighting.</li>
                  <li>Focus on the affected leaf.</li>
                  <li>Avoid blurry or very dark images.</li>
                  <li>Include healthy and affected areas if possible.</li>
                </ul>
              </div>
              <div className="disclaimer-card">
                <span>â“˜</span>
                <div>
                  <strong>Responsible diagnosis</strong>
                  <p>A model prediction is not a confirmed diagnosis. Check findings with a qualified agricultural expert.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer>CropGuard AI <span>Â·</span> Academic project prototype <span>Â·</span> AI predictions require validation</footer>
      </main>
    </div>
  );
}

export default App;


