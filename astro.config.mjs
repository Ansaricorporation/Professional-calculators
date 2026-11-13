import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://creatorcalclab.com',
  output: 'static',
  integrations: [tailwind()],
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});
