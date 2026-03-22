import subprocess
import sys

try:
    print("Running pnpm install --no-frozen-lockfile...")
    result = subprocess.run(
        ["pnpm", "install", "--no-frozen-lockfile"],
        cwd="/vercel/share/v0-project",
        capture_output=True,
        text=True
    )
    
    print(result.stdout)
    if result.stderr:
        print("STDERR:", result.stderr)
    
    if result.returncode == 0:
        print("✓ Lockfile updated successfully!")
    else:
        print(f"✗ Error: pnpm install failed with return code {result.returncode}")
        sys.exit(1)
except Exception as e:
    print(f"✗ Error: {e}")
    sys.exit(1)
