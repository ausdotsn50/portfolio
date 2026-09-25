// Recent-work showcase — the carousel shown right after the Hero. Distinct
// from the Projects ("Crate Digging") collection: this is website work
// (client builds and personal/volunteer projects alike), framed as browser
// windows rather than album sleeves.
//
// `slug` maps to a thumbnail at public/client-showcase/<slug>.webp (falls
// back to a plain placeholder frame when that file doesn't exist yet, same
// convention as ProjectCard).
export interface ShowcaseSite {
  name: string;
  tagline: string;
  category: string;
  url?: string;
  slug: string;
}

export const showcaseSites: ShowcaseSite[] = [
  {
    name: 'Coastal Resin Resurface',
    tagline: 'Custom-coded theme for a Nova Scotia epoxy flooring & concrete coatings contractor.',
    category: 'Epoxy Flooring & Concrete Coatings',
    url: 'https://coastalresin.ca/',
    slug: 'coastal-resin-resurface',
  },
  {
    name: 'CB1 Specialty Concrete',
    tagline: 'Custom-coded theme for a San Antonio epoxy, metallic & polished concrete contractor.',
    category: 'Epoxy & Decorative Concrete',
    url: 'https://cb1specialtyconcrete.com/',
    slug: 'cb1-specialty-concrete',
  },
  {
    name: 'Floors 2 You',
    tagline: 'Custom-coded theme for a family-owned flooring contractor in Richboro, PA & Moorestown, NJ.',
    category: 'Flooring Contractor',
    url: 'https://floors2youphiladelphia.com/',
    slug: 'floors2you-philadelphia',
  },
  {
    name: 'Lite Kings',
    tagline: 'Custom-coded theme for a permanent outdoor lighting installer in Hamilton & Niagara, ON.',
    category: 'Permanent Outdoor Lighting',
    url: 'https://litekings.ca/',
    slug: 'lite-kings',
  },
  {
    name: 'High Stakes Epoxy LLC',
    tagline: 'Custom-coded theme for a concrete coating & epoxy flooring contractor in Kansas City.',
    category: 'Epoxy Flooring & Concrete Coatings',
    url: 'https://highstakesepoxyllc.com/',
    slug: 'high-stakes-epoxy',
  },
  {
    name: 'GDFI Website',
    tagline: "Led development of Guiuan Development Foundation, Inc.'s official website, with a git-based CMS for non-technical staff.",
    category: 'Nonprofit / NGO',
    url: 'https://gdfi1988.org',
    slug: 'gdfi-website',
  },
  {
    name: 'BetterAllen',
    tagline: 'Open-source local government website for the Municipality of Allen, Northern Samar.',
    category: 'Local Government (Open Source)',
    url: 'https://betterallen.org',
    slug: 'betterallen',
  },
];

// ── Shape for future entries ────────────────────────────────────────────────
//
// {
//   name: 'Business Name',
//   tagline: 'One short line on the redesign or result.',
//   category: 'Flooring & Concrete Coating',
//   url: 'https://example.com', // optional — links the card
//   slug: 'business-name', // public/client-showcase/business-name.webp
// },
