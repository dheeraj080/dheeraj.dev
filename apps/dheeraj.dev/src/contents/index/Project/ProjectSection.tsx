import { m } from 'framer-motion';

import { cn } from '@/lib/utils';

import ProjectCard, { type Project } from './ProjectCard';

const projects: Project[] = [
  {
    id: 1,
    title: 'StarMaps',
    description: 'Satellite Tracker',
    moreDescription: 'Extended description for hover effects.',
    role: 'Product Design',
    year: '2024',
    thumbnail: '/assets/images/gettyimages-1305475332-612x612.jpg',
    url: 'https://dheeraj080.github.io/StarMaps/',
    github: 'https://github.com/dheeraj080/StarMaps',
    readMore: '/projects/StarMaps',
    size: 'large',
    tags: ['java', 'spring boot'],
  },
  {
    id: 2,
    title: 'Messenger',
    description: 'Real-time chat',
    role: 'UX Research',
    year: '2023',
    thumbnail:
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=800&q=80',
    size: 'small',
  },
  {
    id: 3,
    title: 'Threads',
    description: 'Social connectivity',
    role: 'Branding',
    year: '2024',
    thumbnail:
      'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=800&q=80',
    size: 'tall',
  },
  {
    id: 4,
    title: 'WhatsApp',
    description: 'Global messaging',
    role: 'UI Design',
    year: '2024',
    thumbnail:
      'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80',
    size: 'medium',
  },
  {
    id: 5,
    title: 'Facebook',
    description: 'Community building',
    role: 'System Design',
    year: '2022',
    thumbnail:
      'https://images.unsplash.com/photo-1633675254053-4b020fe14c3d?auto=format&fit=crop&w=800&q=80',
    size: 'xs',
  },
  {
    id: 6,
    title: 'Wide Example',
    description: '3-column wide card',
    role: 'UI Engineering',
    year: '2025',
    thumbnail:
      'https://images.unsplash.com/photo-1526378722484-cc5c5107fdb5?auto=format&fit=crop&w=800&q=80',
    size: 'wide',
  },
  {
    id: 7,
    title: 'Hero Example',
    description: 'Big hero card',
    role: 'Case Study',
    year: '2025',
    thumbnail:
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80',
    size: 'hero',
  },
  {
    id: 8,
    title: 'Custom Size',
    description: 'Custom spans',
    role: 'Experiment',
    year: '2025',
    thumbnail:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    size: { colSpan: 2, rowSpan: 2, height: 'h-[720px]' },
    tags: ['custom', 'bento'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export default function ProjectSection() {
  return (
    <section className="py-24 sm:py-32">
      {/* 1. SYNC: Using your content-wrapper for consistent margins */}
      <div className="content-wrapper">
        
        {/* 2. SYNC: Heading style aligned with your SectionTitle patterns */}
        <m.header
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <span className="text-accent-600 dark:text-accent-400 font-mono text-xs font-bold uppercase tracking-[0.2em]">
            Selected Works
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tighter text-slate-800 dark:text-white md:text-5xl lg:text-6xl">
            Featured Projects.
          </h2>
          <div className="mt-6 h-1 w-12 rounded-full bg-slate-200 dark:bg-slate-800" />
        </m.header>

        {/* 3. GRID: Bento layout with dynamic spans */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className={cn(
            'grid grid-flow-row-dense grid-cols-1 gap-6',
            'sm:grid-cols-2 lg:grid-cols-4'
          )}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </m.div>
      </div>
    </section>
  );
}