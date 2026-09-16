// Contact info + social links for the Outro and Footer sections.
// The components loop over `socialLinks` — nothing is hardcoded in the markup.
// `icon` selects which lucide icon Outro.astro renders for the link.
export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'facebook';
}

export const contact = {
  name: 'Angela Denise Almazan',
  location: 'Philippines',
  email: 'azalmazan@up.edu.ph',
};

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/ausdotsn50', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ausdotsn50', icon: 'linkedin' },
  // Facebook: fill in your profile URL and uncomment — the icon is already
  // wired up, it just needs the link.
  // { label: 'Facebook', href: '', icon: 'facebook' },
];
