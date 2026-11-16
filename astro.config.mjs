import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Base URL and Site configuration for GitHub Pages deployment
const site = process.env.SITE_URL || 'https://ansaricorporation.github.io';
const base = process.env.BASE_PATH !== undefined ? process.env.BASE_PATH : '/Professional-calculators';

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
