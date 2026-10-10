// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Your domain. Used for canonical links, the sitemap and social previews.
  site: 'https://www.thennavan-m.com',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
