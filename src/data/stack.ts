// Tech stack for the "Stack" section, mirroring the résumé's Technical Skills.
// Each tech renders as a mini vinyl disc; the icon is derived from the name
// (lowercased, whitespace-stripped) against src/icons/, same as project cards.
export interface StackCategory {
  name: string;
  items: string[];
}

export const stack: StackCategory[] = [
  {
    name: 'Languages',
    items: ['C', 'Python', 'Java', 'SQL', 'HTML5', 'CSS', 'JavaScript', 'TypeScript'],
  },
  {
    name: 'Developer Tools',
    items: ['Git', 'Postman', 'VS Code'],
  },
  {
    name: 'Libraries/Frameworks',
    items: ['React', 'Expo', 'ExpressJS', 'Flask', 'Tailwind', 'Vite', 'WordPress'],
  },
  {
    name: 'Databases',
    items: ['MySQL', 'SQLite'],
  },
];
