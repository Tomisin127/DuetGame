import { execSync } from 'child_process';

console.log('Updating pnpm lockfile...');

try {
  execSync('pnpm install --no-frozen-lockfile', {
    cwd: '/vercel/share/v0-project',
    stdio: 'inherit'
  });
  console.log('✅ Lockfile updated successfully!');
} catch (error) {
  console.error('❌ Failed to update lockfile:', error.message);
  process.exit(1);
}
