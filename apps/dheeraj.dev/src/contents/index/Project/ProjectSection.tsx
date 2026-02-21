// ProjectSection.tsx
import { m } from 'framer-motion';

import ProjectCard, { type Project } from './ProjectCards/ProjectCard';

// In your ProjectSection.tsx
const projects: Project[] = [
  {
    id: 1,
    title: 'StarMaps',
    description: 'Satellite Tracker',
    moreDescription:
      'To add an extended description that appears on hover, we can leverage Tailwind’s group-hover utility combined with Framer Motion for a smooth transition.',
    role: 'Product Design',
    year: '2024',
    thumbnail:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    url: 'https://dheeraj080.github.io/StarMaps/',
    github: 'https://github.com/dheeraj080/StarMaps',
    readMore: '/projects/StarMaps',
    size: 'large',
    tags: ['java', 'spring boot'],
  },
  {
    id: 2,
    title: 'Messenger',
    description: 'Satellite Tracker',
    role: 'UX Research',
    year: '2023',
    thumbnail:
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=800&q=80',
    url: 'https://messenger.com',
    size: 'small',
  },
  {
    id: 3,
    title: 'Threads',
    description: 'Satellite Tracker',
    role: 'Branding',
    year: '2024',
    thumbnail:
      'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=800&q=80',
    size: 'tall', // 1x2
  },
  {
    id: 4,
    title: 'WhatsApp',
    description: 'Satellite Tracker',
    role: 'UI Design',
    year: '2024',
    thumbnail:
      'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80',
    url: 'https://whatsapp.com',
    size: 'medium', // 2x1
  },
  {
    id: 5,
    title: 'Facebook',
    description: 'Satellite Tracker',
    role: 'System Design',
    year: '2022',
    thumbnail:
      'https://images.unsplash.com/photo-1633675254053-4b020fe14c3d?auto=format&fit=crop&w=800&q=80',
    size: 'xs', // new preset
  },

  // ✅ examples of the new presets
  {
    id: 6,
    title: 'Wide Example',
    description: '3-column wide card',
    role: 'UI Engineering',
    year: '2025',
    thumbnail:
      'https://images.unsplash.com/photo-1526378722484-cc5c5107fdb5?auto=format&fit=crop&w=800&q=80',
    size: 'wide', // 3x1
  },
  {
    id: 7,
    title: 'Hero Example',
    description: 'Big hero card',
    role: 'Case Study',
    year: '2025',
    thumbnail:
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80',
    size: 'hero', // 4x2
  },

  // ✅ example of custom sizing (new component supports this)
  {
    id: 8,
    title: 'Custom Size',
    description: 'Custom spans + custom height',
    role: 'Experiment',
    year: '2025',
    thumbnail:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    size: { colSpan: 2, rowSpan: 2, height: 'h-[720px]' },
    tags: ['custom', 'bento'],
  },
];

function ProjectSection() {
  return (
    <section className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Increased max-width for better bento spacing */}
        <div className="mb-16">
          <m.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-bold tracking-tighter text-white md:text-5xl"
          >
            Projects
          </m.h2>
          <div className="mt-4 h-1 w-20 rounded-full bg-zinc-800" />
        </div>

        {/* 
          1) grid-cols-4 foundation for desktop
          2) grid-flow-row-dense helps fill gaps
        */}
        <div className="grid grid-flow-row-dense grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectSection;
