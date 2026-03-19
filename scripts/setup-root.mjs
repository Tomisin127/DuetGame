import { execSync } from 'child_process';

const root = '/vercel/share/v0-project';
const nested = `${root}/miniapp-fast-sit-477-main-f5a205113be1901714a632e0129da74cbb4bc5da`;

// Copy src directory from nested project to root
console.log('Copying src/ directory to root...');
execSync(`cp -r ${nested}/src ${root}/src`, { stdio: 'inherit' });

// Copy public directory
console.log('Copying public/ directory...');
execSync(`cp -r ${nested}/public/* ${root}/public/ 2>/dev/null || true`, { stdio: 'inherit' });

console.log('Done! Source files copied to root.');
