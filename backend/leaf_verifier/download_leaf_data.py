from pathlib import Path
from datasets import load_dataset

root = Path("backend/leaf_verifier/data/plantvillage")
train_dir = root / "train"
test_dir = root / "test"
train_dir.mkdir(parents=True, exist_ok=True)
test_dir.mkdir(parents=True, exist_ok=True)

print("Downloading PlantVillage dataset...")
ds = load_dataset("mohanty/PlantVillage", "default")

for split, limit, folder in [
    ("train", 8000, train_dir),
    ("test", 2000, test_dir)
]:
    part = ds[split].select(range(min(limit, len(ds[split]))))
    for i, item in enumerate(part):
        img = item["image"].convert("RGB")
        img.save(folder / f"leaf_{i:05d}.jpg", quality=90)
        if (i + 1) % 500 == 0:
            print(f"{split}: {i + 1} images saved")

print("PlantVillage download and export complete.")





