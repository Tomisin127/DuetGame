import subprocess
import sys

# Run npm install in the current directory
result = subprocess.run(['npm', 'install'], cwd='.')
sys.exit(result.returncode)
