from pathlib import Path
import random
import shutil

root = Path("backend/leaf_verifier/data")
random.seed(42)

for cls in ["leaf", "non_leaf"]:
    files = [
        p for p in (root / "raw" / cls).iterdir()
        if p.is_file() and p.suffix.lower() in {".jpg", ".jpeg", ".png"}
    ]

    random.shuffle(files)
    files = files[:10000]

    train = files[:7000]
    val = files[7000:8500]
    test = files[8500:10000]

    for split, items in [
        ("train", train),
        ("val", val),
        ("test", test)
    ]:
        dest = root / split / cls
        dest.mkdir(parents=True, exist_ok=True)

        if any(dest.iterdir()):
            raise RuntimeError(f"{dest} is not empty. Stopping safely.")

        for i, src in enumerate(items):
            shutil.copy2(src, dest / f"{i:05d}{src.suffix.lower()}")

        print(f"{split}/{cls}: {len(items)} images")

print("DATASET SPLIT COMPLETE")
