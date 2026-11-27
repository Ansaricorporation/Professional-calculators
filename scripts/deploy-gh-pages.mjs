import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('Pushing dist to origin/gh-pages...');
execSync('git init', { cwd: distDir, stdio: 'inherit' });
execSync('git config user.name "github-actions[bot]"', { cwd: distDir, stdio: 'inherit' });
execSync('git config user.email "github-actions[bot]@users.noreply.github.com"', { cwd: distDir, stdio: 'inherit' });
execSync('git add -A', { cwd: distDir, stdio: 'inherit' });
execSync('git commit -m "deploy: task 15 - famous-platform 2026 fee calculators (140 total calculators live)"', { cwd: distDir, stdio: 'inherit' });
execSync('git push -f https://github.com/Ansaricorporation/Professional-calculators.git main:gh-pages', { cwd: distDir, stdio: 'inherit' });
fs.rmSync(path.join(distDir, '.git'), { recursive: true, force: true });
console.log('✅ origin/gh-pages updated successfully!');
