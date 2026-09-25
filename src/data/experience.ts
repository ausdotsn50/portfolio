// Experience entries for the "Session Log" (Experience) timeline.
// The component loops over this array — nothing is hardcoded in the markup.
export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  url?: string;
}

export const experience: Experience[] = [
  {
    role: 'WordPress Developer',
    company: 'Samuel Digital',
    period: 'Aug 2026 – Present',
    description:
      'Build and revamp WordPress websites for flooring and concrete coating contractors worldwide, moving them off generic Elementor/Astra templates and into custom-coded themes built for speed, conversions, and search visibility. Recent work with clients like Coastal Resin Resurface has driven measurable growth in organic Google Search leads, turning their websites into an actual sales channel.',
  },
  {
    role: 'Contributor',
    company: 'BetterAllen (LGU of Allen)',
    period: 'April 2026 – Present',
    description:
      'Actively contributing to an open-source local government website for the Municipality of Allen, Northern Samar.',
    url: "https://betterallen.org/"
  },
  {
    role: 'Tech Lead',
    company: 'Guiuan Development Foundation, Inc. (GDFI)',
    period: 'June 2026 – July 2026',
    description:
      "Led the development of GDFI's official website; integrated a git-based CMS for non-technical staff to independently manage content, and optimized the site for search engine visibility.",
    url: "https://gdfi1988.org/"
  },
];

// ── Shape for future entries ────────────────────────────────────────────────
// Copy this object into the array above (newest first) and fill it in:
//
// {
//   role: 'Job Title',
//   company: 'Company or Organization',
//   period: '2025 – Present',   // or a closed range like '2022 – 2024'
//   description: 'One or two sentences on what you did and the impact.',
//   url: 'https://example.com', // optional — links the company name
// },
