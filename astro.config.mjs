// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  // Required for canonical URLs and absolute Open Graph/Twitter image URLs.
  site: 'https://ausdotsn50.dev',
  integrations: [icon()],
});