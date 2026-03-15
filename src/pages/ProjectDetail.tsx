import { useParams, Link } from 'react-router-dom';
import { Github, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import matter from 'gray-matter';
import { useEffect, useState } from 'react';

// Import all projects
import proj1 from '../../content/projects/project-alpha.md?raw';
import proj2 from '../../content/projects/project-beta.md?raw';

const projectMap: { [key: string]: string } = {
  'project-alpha': proj1,
  'project-beta': proj2,
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<{ title: string; overview: string; techStack: string; githubUrl: string; demoUrl: string; content: string } | null>(null);

  useEffect(() => {
    if (slug && projectMap[slug]) {
      const { data, content } = matter(projectMap[slug]);
      setProject({ 
        title: data.title, 
        overview: data.overview, 
        techStack: data.techStack, 
        githubUrl: data.githubUrl, 
        demoUrl: data.demoUrl, 
        content 
      });
    }
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 block">← Back to Portfolio</Link>
          <h1 className="text-4xl font-bold tracking-tighter mb-4">Project not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 block">← Back to Portfolio</Link>
        <h1 className="text-4xl font-bold tracking-tighter mb-4">{project.title}</h1>
        <div className="flex gap-4 mb-8">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline">
            <Github size={18} /> GitHub Repository
          </a>
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline">
            <ExternalLink size={18} /> Live Demo
          </a>
        </div>
        <div className="prose dark:prose-invert max-w-none mb-6">
          <ReactMarkdown>{project.content}</ReactMarkdown>
        </div>
        <p className="text-zinc-500 dark:text-zinc-500 text-sm font-mono">Tech Stack: {project.techStack}</p>
      </div>
    </div>
  );
}
