// Tech stack for the "Stack" section, mirroring the résumé's Technical Skills.
// Each tech renders as a mini vinyl disc with its icon on the label.
// `icon` is the bare filename of a local SVG in src/icons/<icon>.svg
// (self-hosted, tinted via currentColor).
export interface Tech {
  name: string;
  icon: string;
}
export interface StackCategory {
  name: string;
  items: Tech[];
}

export const stack: StackCategory[] = [
  {
    name: 'Languages',
    items: [
      { name: 'C', icon: 'c' },
      { name: 'Python', icon: 'python' },
      { name: 'Java', icon: 'java' },
      { name: 'SQL', icon: 'sql' },
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS', icon: 'css' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
    ],
  },
  {
    name: 'Developer Tools',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'Postman', icon: 'postman' },
      { name: 'VS Code', icon: 'vscode' },
    ],
  },
  {
    name: 'Libraries/Frameworks',
    items: [
      { name: 'React', icon: 'react' },
      { name: 'Expo', icon: 'expo' },
      { name: 'Express.js', icon: 'express' },
      { name: 'Flask', icon: 'flask' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'Vite', icon: 'vite' },
      { name: 'WordPress', icon: 'wordpress' },
    ],
  },
  {
    name: 'Databases',
    items: [
      { name: 'MySQL', icon: 'mysql' },
      { name: 'SQLite', icon: 'sqlite' },
    ],
  },
];
