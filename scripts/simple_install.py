import subprocess
import sys
import os

cwd = os.getcwd()
print(f"[v0] Current working directory: {cwd}")

# Search in common project locations
search_locations = ['/root', '/home', '/tmp', '/opt', '/workspace', '/vercel']

found_dir = None
for location in search_locations:
    if not os.path.exists(location):
        continue
    
    print(f"[v0] Searching in {location}...")
    try:
        for root, dirs, files in os.walk(location):
            if 'package.json' in files:
                pkg_path = os.path.join(root, 'package.json')
                # Check if it has "duetgame", "DuetGame", or "my-project" in it
                try:
                    with open(pkg_path, 'r') as f:
                        content = f.read()
                        if 'my-project' in content or 'duetgame' in content.lower():
                            print(f"[v0] Found DuetGame project at: {root}")
                            found_dir = root
                            break
                except:
                    pass
            
            if found_dir:
                break
        
        if found_dir:
            break
    except:
        pass

if not found_dir:
    print("[v0] Could not find DuetGame project")
    sys.exit(1)

os.chdir(found_dir)
print(f"[v0] Changed to {os.getcwd()}")

result = subprocess.run(['npm', 'install'])
sys.exit(result.returncode)
