const { execSync } = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');
console.log('Running pnpm install --no-frozen-lockfile in:', root);

try {
  execSync('pnpm install --no-frozen-lockfile', { cwd: root, stdio: 'inherit' });
  console.log('Dependencies installed and lockfile regenerated successfully.');
} catch (err) {
  console.error('pnpm install failed:', err.message);
  process.exit(1);
}
