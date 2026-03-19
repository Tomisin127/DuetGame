import { execSync } from 'child_process';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';

const root = '/vercel/share/v0-project';
const lockfile = join(root, 'pnpm-lock.yaml');

// Remove stale lockfile if it exists
if (existsSync(lockfile)) {
  console.log('Removing stale pnpm-lock.yaml...');
  unlinkSync(lockfile);
}

// Regenerate lockfile
console.log('Running pnpm install --no-frozen-lockfile...');
try {
  execSync('pnpm install --no-frozen-lockfile', { cwd: root, stdio: 'inherit' });
  console.log('Lockfile regenerated successfully.');
} catch (err) {
  console.error('pnpm install failed:', err.message);
  process.exit(1);
}
