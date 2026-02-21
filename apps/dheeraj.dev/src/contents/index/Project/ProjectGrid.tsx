import { m } from 'framer-motion';

import { cn } from '@/lib/utils';

import ProjectCard from './ProjectCard/ProjectCard';
import { type Project } from './ProjectCard/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <m.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </m.div>
  );
}
