import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Automatically detect GitHub Actions environment and derive repository subpath
// e.g. GITHUB_REPOSITORY = "Ansaricorporation/Professional-calculators"
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';
const isUserPage = repo.toLowerCase().endsWith('.github.io');
const defaultBase = isGithubActions && repo && !isUserPage ? `/${repo}` : '';

// Allow explicit override via BASE_PATH or fallback to defaultBase
const base = process.env.BASE_PATH !== undefined ? process.env.BASE_PATH : defaultBase;

// If on GitHub Actions without a custom SITE_URL, default to the GitHub Pages origin:
const defaultSite = isGithubActions && process.env.GITHUB_REPOSITORY
  ? `https://${process.env.GITHUB_REPOSITORY.split('/')[0]}.github.io`
  : 'https://creatorcalclab.com';
const site = process.env.SITE_URL || defaultSite;

// https://astro.build/config
export default defineConfig({
  site,
  base,
  output: 'static',
  integrations: [tailwind()],
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});
