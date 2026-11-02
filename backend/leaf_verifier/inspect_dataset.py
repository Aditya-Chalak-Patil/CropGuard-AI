from datasets import load_dataset

ds = load_dataset("mohanty/PlantVillage", "default")

print("\nTRAIN FEATURES:")
print(ds["train"].features)

print("\nFIRST ROW:")
print(ds["train"][0])
