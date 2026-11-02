from pathlib import Path
import torch
import torchvision
from torchvision import datasets, transforms, models
from torch import nn
from torch.utils.data import DataLoader
from sklearn.metrics import classification_report, confusion_matrix
import json

ROOT = Path("backend/leaf_verifier/data")
OUT = Path("backend/leaf_verifier/models")
OUT.mkdir(parents=True, exist_ok=True)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Training device:", device)

train_tf = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(15),
    transforms.ToTensor(),
    transforms.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225])
])

eval_tf = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225])
])

train_ds = datasets.ImageFolder(ROOT / "train", transform=train_tf)
val_ds = datasets.ImageFolder(ROOT / "val", transform=eval_tf)
test_ds = datasets.ImageFolder(ROOT / "test", transform=eval_tf)

print("Classes:", train_ds.classes)
print("Train:", len(train_ds), "Validation:", len(val_ds), "Test:", len(test_ds))

train_loader = DataLoader(train_ds, batch_size=32, shuffle=True, num_workers=0)
val_loader = DataLoader(val_ds, batch_size=32, shuffle=False, num_workers=0)
test_loader = DataLoader(test_ds, batch_size=32, shuffle=False, num_workers=0)

weights = models.MobileNet_V3_Small_Weights.DEFAULT
model = models.mobilenet_v3_small(weights=weights)
model.classifier[3] = nn.Linear(model.classifier[3].in_features, 2)
model = model.to(device)

criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.AdamW(model.parameters(), lr=0.0001)
best_acc = 0.0

for epoch in range(1, 6):
    model.train()
    total, correct, loss_sum = 0, 0, 0.0

    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        loss_sum += loss.item()
        correct += (outputs.argmax(1) == labels).sum().item()
        total += labels.size(0)

    model.eval()
    val_correct, val_total = 0, 0
    with torch.no_grad():
        for images, labels in val_loader:
            outputs = model(images.to(device))
            val_correct += (outputs.argmax(1).cpu() == labels).sum().item()
            val_total += labels.size(0)

    val_acc = val_correct / val_total
    print(f"Epoch {epoch}/5 | Loss {loss_sum/len(train_loader):.4f} | Train {correct/total:.3f} | Val {val_acc:.3f}")

    if val_acc > best_acc:
        best_acc = val_acc
        torch.save(model.cpu().state_dict(), OUT / "leaf_verifier_best.pth")
        model.to(device)

model.load_state_dict(torch.load(OUT / "leaf_verifier_best.pth", map_location=device))
model.eval()
preds, actual = [], []

with torch.no_grad():
    for images, labels in test_loader:
        outputs = model(images.to(device))
        preds.extend(outputs.argmax(1).cpu().tolist())
        actual.extend(labels.tolist())

print("\nTEST CONFUSION MATRIX:")
print(confusion_matrix(actual, preds))
print("\nTEST REPORT:")
print(classification_report(actual, preds, target_names=train_ds.classes))

torch.save(model.cpu().state_dict(), OUT / "leaf_verifier.pth")
print("\nSaved:", OUT / "leaf_verifier.pth")
print("Best validation accuracy:", best_acc)
print("NOTE: CIFAR-10 resolution/domain mismatch means this is experimental.")
