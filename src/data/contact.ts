// Contact info + social links for the Outro and Footer sections.
// The components loop over `socialLinks` — nothing is hardcoded in the markup.
export interface SocialLink {
  label: string;
  href: string;
}

export const contact = {
  name: 'Angela Denise Almazan',
  location: 'Philippines',
  email: 'azalmazan@up.edu.ph',
};

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/ausdotsn50' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ausdotsn50' },
];
