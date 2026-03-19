import subprocess
import os
import sys

# Find the correct project root
possible_dirs = [
    "/vercel/share/v0-project",
    "/home/user/v0-project",
    os.path.expanduser("~/v0-project"),
    os.getcwd(),
]

project_dir = None
for d in possible_dirs:
    if os.path.exists(d) and os.path.isfile(os.path.join(d, "package.json")):
        project_dir = d
        break

if not project_dir:
    # Try finding package.json by walking up from cwd
    cwd = os.getcwd()
    while cwd != "/":
        if os.path.isfile(os.path.join(cwd, "package.json")):
            project_dir = cwd
            break
        cwd = os.path.dirname(cwd)

print(f"Working directory: {project_dir}")
if not project_dir:
    print("ERROR: Could not find project root with package.json")
    sys.exit(1)

os.chdir(project_dir)

# Try pnpm, fallback to npx pnpm
for cmd in [["pnpm"], ["npx", "pnpm"], ["npm"]]:
    result = subprocess.run(cmd + ["--version"], capture_output=True, text=True)
    if result.returncode == 0:
        pkg_manager = cmd
        print(f"Using: {' '.join(cmd)} {result.stdout.strip()}")
        break
else:
    pkg_manager = ["npm"]

install_args = pkg_manager + ["install"]
if pkg_manager[0] == "pnpm" or (len(pkg_manager) > 1 and pkg_manager[1] == "pnpm"):
    install_args += ["--no-frozen-lockfile"]

print(f"Running: {' '.join(install_args)}")
result = subprocess.run(install_args, capture_output=True, text=True, cwd=project_dir)

print("STDOUT:", result.stdout[-3000:] if len(result.stdout) > 3000 else result.stdout)
if result.stderr:
    print("STDERR:", result.stderr[-2000:] if len(result.stderr) > 2000 else result.stderr)
print("Return code:", result.returncode)
