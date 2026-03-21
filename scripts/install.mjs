import { execSync } from 'child_process';

try {
  console.log('Running pnpm install --no-frozen-lockfile...');
  execSync('pnpm install --no-frozen-lockfile', { stdio: 'inherit' });
  console.log('Dependencies installed successfully!');
} catch (error) {
  console.error('Failed to install dependencies:', error.message);
  process.exit(1);
}
