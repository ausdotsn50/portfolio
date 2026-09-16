// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  // Required for canonical URLs and absolute Open Graph/Twitter image URLs.
  site: 'https://ausdotsn50.dev',
  integrations: [icon()],

  // Every page stays prerendered (output: 'static' is the default); the
  // adapter exists only so the contact form's action can run as a single
  // Vercel function. Nothing else becomes server-rendered.
  adapter: vercel(),

  // All optional so the site still builds and deploys before the Resend
  // credentials are set — the action reports a clear error at runtime
  // instead of failing the build.
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_TO_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_FROM_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
