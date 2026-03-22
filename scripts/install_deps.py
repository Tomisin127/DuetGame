import subprocess
import os
import sys

os.chdir('/vercel/share/v0-project')

print("[v0] Installing dependencies with npm...")
result = subprocess.run([sys.executable, '-m', 'pip', 'install', 'pnpm'], capture_output=True, text=True)
print(result.stdout)
print(result.stderr)

# Use npm to install dependencies
result = subprocess.run(['npm', 'install'], capture_output=True, text=True)
print(result.stdout)
if result.returncode != 0:
    print("Error:", result.stderr)
    sys.exit(1)

print("[v0] Dependencies installed successfully!")
