/** @type {import('tailwindcss').Config} */

/*
 * Vinyl / Jazz Portfolio — design tokens
 * -------------------------------------------------------------
 * Colors are exposed as utilities (bg-cream, text-espresso, …) but
 * resolve to CSS custom properties so the "Day Session" (light) and
 * "Night Session" (dark) palettes can swap via the `.dark` class.
 * The literal hex values live in src/styles/global.css under
 * :root / .dark. Reference values are listed here for convenience:
 *
 *   token          light (day)   dark (night)
 *   cream          #F4ECD8       #1C1814
 *   cream-deep     #E8DCC0       #2A241C
 *   espresso       #2A1F17       #F0E6D2
 *   espresso-soft  #4A3828       #C9B89A
 *   sepia          #7A6855       #8A7860
 *   burnt-orange   #C25A1F       #D97843
 *   mustard        #C89B3C       #D9B057
 *   dusty-teal     #4A6B6B       #6B8A8A
 *   rule           #D4C4A8       #3A3128
 *
 * Contrast note: `accent-ink` is a darkened burnt-orange reserved for
 * small text / links on the cream background (the raw burnt-orange sits
 * just under WCAG AA at 14px). See global.css.
 */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: 'var(--cream)',
        'cream-deep': 'var(--cream-deep)',
        espresso: 'var(--espresso)',
        'espresso-soft': 'var(--espresso-soft)',
        sepia: 'var(--sepia)',
        'burnt-orange': 'var(--burnt-orange)',
        'accent-ink': 'var(--accent-ink)',
        mustard: 'var(--mustard)',
        'dusty-teal': 'var(--dusty-teal)',
        rule: 'var(--rule)',
      },
      fontFamily: {
        display: ['Cormorant Garamond Variable', 'Cormorant Garamond', 'serif'],
        body: ['EB Garamond', 'serif'],
        ui: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        // [size, line-height] — mirrors the Figma type scale
        micro: ['12px', { lineHeight: '1.4' }],
        small: ['14px', { lineHeight: '1.5' }],
        body: ['16px', { lineHeight: '1.6' }],
        'body-large': ['18px', { lineHeight: '1.65' }],
        h4: ['20px', { lineHeight: '1.35' }],
        h3: ['24px', { lineHeight: '1.3' }],
        h2: ['36px', { lineHeight: '1.2' }],
        h1: ['48px', { lineHeight: '1.1' }],
        display: ['72px', { lineHeight: '1.05' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      spacing: {
        // 4px base scale from the design system
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        12: '48px',
        16: '64px',
        24: '96px',
        32: '128px',
      },
      borderRadius: {
        sm: '2px',
        md: '4px',
        lg: '8px',
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 12s linear infinite',
      },
    },
  },
  plugins: [],
};
