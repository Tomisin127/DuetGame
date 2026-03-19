import subprocess
import os
import glob

print("CWD:", os.getcwd())
print("HOME:", os.path.expanduser("~"))

# Search for package.json in common locations
for pattern in ["/*/package.json", "/*/*/package.json", os.path.expanduser("~/*/package.json")]:
    matches = glob.glob(pattern)
    for m in matches:
        print("Found package.json:", m)

# List root dirs
for d in ["/", "/home", "/root", "/workspace", "/app", "/project", "/code"]:
    if os.path.exists(d):
        try:
            entries = os.listdir(d)[:10]
            print(f"Contents of {d}:", entries)
        except Exception as e:
            print(f"Cannot list {d}: {e}")
