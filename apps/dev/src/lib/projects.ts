export interface Project {
  title: string;
  desc: string;
  tags: string[];
  link?: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Solar System 3D',
    desc: 'An interactive 3D visualization of our solar system using Three.js.',
    tags: ['Three.js', 'React', 'GLSL'],
  },
  {
    title: 'Portfolio v2',
    desc: 'My personal portfolio built with Next.js and Framer Motion.',
    tags: ['Next.js', 'Tailwind'],
  },
  // ADD NEW PROJECTS HERE
  {
    title: 'New Project',
    desc: 'Something awesome I just built.',
    tags: ['TypeScript', 'Node.js'],
  },
];
