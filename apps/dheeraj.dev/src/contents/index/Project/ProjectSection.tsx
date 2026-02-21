import { m } from 'framer-motion';

import { projects } from './data'; // or keep inline and pass directly
import ProjectGrid from './ProjectGrid';

export default function ProjectSection() {
  return (
    <section className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <m.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tighter text-white md:text-5xl">
            Projects
          </h2>
          <div className="mt-4 h-1 w-20 rounded-full bg-zinc-800" />
        </m.div>

        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
}
