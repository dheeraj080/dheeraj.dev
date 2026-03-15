import { Link } from 'react-router-dom';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  { 
    title: 'Project Alpha', 
    slug: 'project-alpha',
    overview: 'A distributed task scheduler designed to handle high-throughput job processing with fault tolerance and horizontal scalability.',
    techStack: 'Go, Redis, Docker',
    githubUrl: '#',
    demoUrl: '#'
  },
  { 
    title: 'Project Beta', 
    slug: 'project-beta',
    overview: 'A real-time collaborative text editor that allows multiple users to edit documents simultaneously with conflict resolution and instant synchronization.',
    techStack: 'React, WebSockets, Node.js, Socket.io',
    githubUrl: '#',
    demoUrl: '#'
  },
];

export default function Projects() {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-6">Projects</h2>
      <div className="grid gap-8">
        {projects.map((project) => (
          <div key={project.title} className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-4">
            <div className="flex items-center justify-between">
              <Link to={`/projects/${project.slug}`} className="text-lg font-medium hover:text-indigo-600 dark:hover:text-indigo-400">
                {project.title}
              </Link>
              <div className="flex gap-2">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                  <Github size={18} />
                </a>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-sm">{project.overview}</p>
            <p className="text-zinc-500 dark:text-zinc-500 mt-2 text-xs font-mono">{project.techStack}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
