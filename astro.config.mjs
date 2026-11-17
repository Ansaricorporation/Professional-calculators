import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Base URL and Site configuration
const site = process.env.SITE_URL || 'https://kitaaab.net';
const base = '/';

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
