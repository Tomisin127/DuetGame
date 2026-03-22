import subprocess
import os

# Change to project root
os.chdir('/vercel/share/v0-project')

# Remove pnpm lockfile if it exists
if os.path.exists('pnpm-lock.yaml'):
    os.remove('pnpm-lock.yaml')
    print("Removed pnpm-lock.yaml")

# Run npm install
print("Running npm install...")
result = subprocess.run(['npm', 'install'], capture_output=True, text=True)
print(result.stdout)
if result.stderr:
    print("STDERR:", result.stderr)
print(f"Installation completed with return code: {result.returncode}")
