/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  ExternalLink,
  Github,
  Figma,
  Frame,
  Layers,
  Sparkles,
  MapPin,
  Tag,
  Menu,
  ChevronRight,
  ChevronLeft,
  Heart,
  Sun,
  Moon,
  Code2,
  Cpu,
  Globe,
  Terminal,
  Zap,
  X
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  repoUrl: string;
}

const projects: Project[] = [
  {
    id: "infra",
    title: "Cloud Infrastructure Automation",
    subtitle: "Terraform, Go, AWS",
    description: "A robust automation suite for provisioning highly available AWS infrastructure using Terraform and Go. Includes custom provider support and automated scaling policies.",
    technologies: ["Terraform", "Go", "AWS", "Docker", "CI/CD"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/dheerajkamble"
  },
  {
    id: "pipeline",
    title: "Enterprise Data Pipeline",
    subtitle: "Python, Kafka, Kubernetes",
    description: "Next-gen data ingestion engine capable of processing millions of events per second with sub-millisecond latency. Built with Kafka for messaging and K8s for orchestrating workers.",
    technologies: ["Python", "Kafka", "Kubernetes", "Redis", "PostgreSQL"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/dheerajkamble"
  },
  {
    id: "arch",
    title: "Software Architecture Patterns",
    subtitle: "Documentation, Best Practices",
    description: "A comprehensive guide and reference implementation for distributed systems patterns including Event Sourcing, CQRS, and Microservices coordination.",
    technologies: ["Distributed Systems", "Design Patterns", "Microservices"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/dheerajkamble"
  },
  {
    id: "workspace",
    title: "Development Environment",
    subtitle: "Workspace Setup",
    description: "A meticulously crafted Nix-based development environment that ensures reproducibility across multi-platform teams. Includes optimized dotfiles and containerized dev environments.",
    technologies: ["NixOS", "Docker", "Bash", "Neovim"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/dheerajkamble"
  }
];

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar = ({ theme, toggleTheme }: NavbarProps) => (
  <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
    <div className="bg-nav-bg backdrop-blur-md border border-border-subtle px-6 py-2 rounded-full flex gap-6 text-sm font-medium shadow-sm">
      <a href="#" className="text-text-primary transition-colors">Home</a>
      <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">Portfolio</a>
    </div>
    <button 
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full bg-nav-bg backdrop-blur-md border border-border-subtle flex items-center justify-center text-text-primary shadow-sm hover:scale-110 transition-all cursor-pointer"
      title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  </nav>
);

const Card = ({ children, className = "", span = "" }: { children: ReactNode, className?: string, span?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={`bg-card-bg rounded-[2.5rem] overflow-hidden relative group ${span} ${className}`}
  >
    {children}
  </motion.div>
);

const IconButton = ({ icon: Icon, className = "" }: { icon: any, className?: string }) => (
  <div className={`absolute bottom-6 left-6 w-10 h-10 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm border border-border-subtle ${className}`}>
    <Icon className="w-5 h-5 text-neutral-400" />
  </div>
);

const ProjectModal = ({ project, onClose }: { project: Project, onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      className="bg-surface border border-border-subtle w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl"
      onClick={e => e.stopPropagation()}
    >
      <div className="p-8 md:p-12 relative">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 w-10 h-10 rounded-full bg-card-bg border border-border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-2 h-2 rounded-full bg-brand-blue" />
             <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">Project Detail</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{project.title}</h2>
          <p className="text-text-secondary leading-relaxed text-lg">
            {project.description}
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-4">Core Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span key={tech} className="px-4 py-1.5 rounded-full bg-card-bg border border-border-subtle text-xs font-bold text-text-primary">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <a 
              href={project.liveUrl} 
              target="_blank" 
              className="flex-1 bg-brand-blue text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-brand-blue/20"
            >
              <ExternalLink className="w-5 h-5" />
              Live Demo
            </a>
            <a 
              href={project.repoUrl} 
              target="_blank" 
              className="flex-1 bg-card-bg text-text-primary border border-border-subtle py-4 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              <Github className="w-5 h-5" />
              View Source
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  useEffect(() => {
    // Apply theme class to document element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className="min-h-screen pb-20 pt-32 px-6 flex flex-col items-center max-w-7xl mx-auto overflow-x-hidden transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProjectId(null)} 
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="w-full mb-20 max-w-2xl text-center md:text-left md:ml-0 self-center md:self-start">
        <h1 className="text-[18px] font-medium mb-6 text-text-primary">Dheeraj Kamble</h1>
        
        <p className="text-[18px] text-text-secondary leading-snug mb-6">
          I am a full stack software engineer with zero years of experience, 
          dedicated to building scalable and innovative web solutions.
        </p>

        <p className="text-[18px] text-text-secondary leading-snug mb-10">
          Currently exploring <span className="inline-flex items-center gap-1 text-text-primary font-medium bg-card-bg px-2 py-0.5 rounded-md border border-border-subtle shadow-sm">Distributed Systems</span> and mastering 
          modern frameworks at <span className="inline-flex items-center gap-1 text-text-primary font-medium bg-card-bg px-2 py-0.5 rounded-md border border-border-subtle shadow-sm"><motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-brand-blue">◈</motion.span> The Tech Frontiers Lab.</span>
        </p>

        <div className="flex gap-3 justify-center md:justify-start">
          <a href="mailto:dheeraj@example.com" className="bg-card-bg px-6 py-2.5 rounded-full text-[15px] font-medium text-text-primary hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors border border-border-subtle shadow-sm">
            Email me
          </a>
          <button className="bg-transparent px-6 py-2.5 rounded-full text-[15px] font-medium text-text-secondary transition-colors border border-border-subtle">
            GitHub
          </button>
        </div>
      </section>

      {/* Bento Grid */}
      <div className="w-full bento-grid max-w-5xl">
        {/* Project Card 1 */}
        <div 
          className="flex flex-col gap-4 group cursor-pointer" 
          onClick={() => setSelectedProjectId(projects[0].id)}
        >
          <Card className="aspect-square md:aspect-auto md:h-[450px] flex items-center justify-center p-8">
            <div className="relative w-full max-w-sm bg-white dark:bg-neutral-900 rounded-xl shadow-2xl p-4 overflow-hidden group-hover:scale-105 transition-transform duration-500 border border-border-subtle">
              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg aspect-[4/3] flex items-center justify-center p-8 relative">
                <Terminal className="w-20 h-20 text-brand-blue opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-3/4 h-1/2 bg-brand-blue/10 rounded-lg border border-brand-blue/20 backdrop-blur-sm p-4 font-mono text-[8px] text-brand-blue overflow-hidden">
                      <p>$ npm install</p>
                      <p>&gt; build successful</p>
                      <p>&gt; listening on port 3000</p>
                      <p className="animate-pulse">_</p>
                   </div>
                </div>
              </div>

              {/* Status Tags */}
              <div className="absolute top-10 right-4 bg-white/95 dark:bg-neutral-800/95 backdrop-blur p-3 rounded-lg shadow-lg border border-border-subtle flex items-center gap-2 transform translate-y-[-50%] group-hover:translate-x-2 transition-transform">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                <div className="text-[10px] font-bold text-text-primary">Deployed</div>
              </div>
              <div className="absolute bottom-10 right-10 bg-white/95 dark:bg-neutral-800/95 backdrop-blur p-3 rounded-lg shadow-lg border border-border-subtle flex items-center gap-2 group-hover:translate-x-4 transition-transform">
                <Zap className="w-3.5 h-3.5 text-brand-yellow" />
                <div className="text-[10px] font-bold text-text-primary">99.9% Uptime</div>
              </div>
            </div>
            <IconButton icon={ExternalLink} />
          </Card>
          <div className="px-1">
            <h3 className="text-sm font-medium text-text-primary">{projects[0].title}</h3>
            <p className="text-xs text-text-secondary">{projects[0].subtitle}</p>
          </div>
        </div>

        {/* Project Card 2 */}
        <div 
          className="flex flex-col gap-4 group cursor-pointer"
          onClick={() => setSelectedProjectId(projects[1].id)}
        >
          <Card className="aspect-square md:aspect-auto md:h-[450px] flex items-center justify-center p-8">
            <div className="w-full max-w-sm bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 border border-border-subtle group-hover:rotate-1 transition-transform">
              <div className="space-y-4">
                <div>
                   <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-3">Tech Stack</h4>
                   <div className="flex flex-wrap gap-2">
                     {selectedProject?.technologies?.length ? selectedProject.technologies.slice(0, 4).map(m => (
                        <span key={m} className="px-3 py-1 rounded-full border border-border-subtle bg-neutral-50 dark:bg-neutral-800 text-[10px] font-bold text-text-primary">{m}</span>
                     )) : (
                       ["React", "Node.js", "PostgreSQL", "Redis"].map(m => (
                         <span key={m} className="px-3 py-1 rounded-full border border-border-subtle bg-neutral-50 dark:bg-neutral-800 text-[10px] font-bold text-text-primary">{m}</span>
                       ))
                     )}
                   </div>
                </div>
                <div>
                   <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-3">Performance</h4>
                   <div className="flex gap-2 items-center">
                     <div className="flex-1 h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: '92%' }} className="h-full bg-brand-blue" />
                     </div>
                     <span className="text-[10px] font-bold text-text-primary">92%</span>
                   </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-border-subtle">
                 <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl aspect-video mb-4 overflow-hidden flex items-center justify-center">
                    <Globe className="w-12 h-12 text-text-secondary opacity-20" />
                 </div>
                 <div className="flex justify-between items-end">
                    <div>
                       <h4 className="text-xs font-bold text-text-primary">API Gateway Engine</h4>
                       <p className="text-[10px] text-green-600 font-bold mt-1 uppercase tracking-tighter">Scalable Architecture</p>
                    </div>
                    <p className="text-xs font-bold text-text-secondary">v1.2.0</p>
                 </div>
              </div>
            </div>
            <IconButton icon={Github} />
          </Card>
          <div className="px-1">
            <h3 className="text-sm font-medium text-text-primary">{projects[1].title}</h3>
            <p className="text-xs text-text-secondary">{projects[1].subtitle}</p>
          </div>
        </div>

        {/* Portfolio OS Card */}
        <div 
          className="flex flex-col gap-4 group cursor-pointer"
          onClick={() => setSelectedProjectId(projects[2].id)}
        >
          <Card className="aspect-square md:aspect-auto md:h-[400px] flex items-center justify-center p-8">
             <div className="w-full max-w-sm bg-white dark:bg-neutral-900 rounded-xl shadow-2xl overflow-hidden border border-border-subtle group-hover:translate-y-[-10px] transition-transform duration-500">
                <div className="bg-neutral-100 dark:bg-neutral-800 px-4 py-2 flex items-center justify-center relative">
                   <div className="flex gap-1.5 absolute left-4">
                      <div className="w-2 h-2 bg-red-400 rounded-full" />
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                   </div>
                   <span className="text-[10px] font-bold text-text-secondary">Dheeraj's OS</span>
                </div>
                <div className="p-6">
                   <h3 className="text-lg font-bold leading-tight mb-4 text-text-primary">Systems Design Methodology</h3>
                   <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                         <span className="bg-black dark:bg-brand-blue text-white px-2 py-1 rounded-full text-[9px] font-bold">Logic</span>
                         <span className="bg-neutral-100 dark:bg-neutral-800 text-text-secondary px-2 py-1 rounded-full text-[9px] font-bold">Scaling</span>
                         <span className="bg-neutral-100 dark:bg-neutral-800 text-text-secondary px-2 py-1 rounded-full text-[9px] font-bold">Security</span>
                      </div>
                      <p className="text-[10px] text-text-secondary leading-relaxed font-medium">
                        Layer 0: Fundamental Algorithms. Building the core primitives that power modern software ecosystems.
                      </p>
                   </div>
                </div>
             </div>
             <IconButton icon={ExternalLink} />
          </Card>
          <div className="px-1">
            <h3 className="text-sm font-medium text-text-primary">{projects[2].title}</h3>
            <p className="text-xs text-text-secondary">{projects[2].subtitle}</p>
          </div>
        </div>

        {/* Small Interaction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:h-[400px]">
           <Card className="aspect-square flex items-center justify-center group/inner">
              <div className="w-24 h-24 bg-white/50 dark:bg-white/5 backdrop-blur rounded-3xl shadow-sm border border-border-subtle flex items-center justify-center group-hover/inner:scale-110 transition-transform">
                 <Terminal className="w-10 h-10 text-text-primary" />
              </div>
              <IconButton icon={Terminal} />
           </Card>
           
           <Card className="aspect-square flex items-center justify-center group/inner">
              <div className="relative">
                 <div className="w-24 h-24 bg-brand-blue rounded-[2rem] shadow-lg flex items-center justify-center group-hover/inner:rotate-12 transition-transform">
                    <Code2 className="w-10 h-10 text-white/80" />
                 </div>
                 <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-black/10 dark:bg-white/10 blur-md rounded-full" />
              </div>
              <IconButton icon={Code2} />
           </Card>
        </div>

        {/* ID Card Wrapper */}
        <div className="flex flex-col gap-4 group">
          <Card className="aspect-square md:aspect-auto md:h-[450px] flex items-center justify-center p-8 overflow-visible">
             <div className="relative">
                {/* Lanyard detail */}
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-40 w-1 bg-neutral-100 dark:bg-neutral-800 rounded-full group-hover:h-32 transition-all duration-700" />
                
                <div className="w-full max-w-sm bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl p-10 relative overflow-hidden group-hover:-rotate-3 transition-transform duration-500 border border-border-subtle">
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-neutral-50 dark:bg-neutral-800 flex flex-col items-center justify-center border-r border-border-subtle">
                    <span className="rotate-[-90deg] whitespace-nowrap text-[10px] font-bold text-text-secondary tracking-widest uppercase">Engineering Dept</span>
                  </div>
                  <div className="pl-10 flex flex-col gap-6">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden ring-4 ring-neutral-50 dark:ring-neutral-800 shadow-inner">
                      <img src="https://picsum.photos/seed/dheeraj/200" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-br from-text-primary to-text-primary/60 bg-clip-text text-transparent">Dheeraj Kamble</h3>
                      <p className="text-sm text-text-secondary font-medium">Full Stack Engineer</p>
                    </div>
                    <div className="space-y-3 pt-6 border-t border-border-subtle">
                      {[
                        { icon: Cpu, text: "Low-level logic" },
                        { icon: Code2, text: "Full stack mastery" },
                        { icon: MapPin, text: "Global citizen" }
                      ].map(item => (
                        <div key={item.text} className="flex items-center gap-2.5 text-text-secondary hover:text-text-primary transition-colors">
                          <item.icon className="w-3.5 h-3.5 opacity-50" />
                          <span className="text-[11px] font-bold tracking-tight">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
             </div>
             <IconButton icon={ExternalLink} />
          </Card>
          <div className="px-1">
            <h3 className="text-sm font-medium text-text-primary">About me</h3>
            <p className="text-xs text-text-secondary">Engineer, problem solver and builder</p>
          </div>
        </div>

        {/* Console Card Wrapper */}
        <div 
          className="flex flex-col gap-4 group cursor-pointer"
          onClick={() => setSelectedProjectId(projects[3].id)}
        >
          <Card className="aspect-square md:aspect-auto md:h-[450px] flex items-center justify-center p-8">
             <div className="w-full max-w-sm h-full bg-white dark:bg-neutral-900 rounded-[2.5rem] shadow-2xl p-6 flex flex-col border border-border-subtle group-hover:translate-y-4 transition-transform duration-700">
                <div className="flex justify-between items-center mb-8">
                   <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-black dark:bg-brand-blue rounded flex items-center justify-center">
                         <Terminal className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-tight text-text-primary">Dev Workspace</span>
                   </div>
                   <Menu className="w-5 h-5 text-neutral-300" />
                </div>
                <div className="flex-1">
                   <h2 className="text-xl font-bold leading-tight mb-4 text-text-primary">
                     Zero-to-One Engineering — Crafting digital foundations from scratch.
                   </h2>
                   <button className="bg-black dark:bg-brand-blue text-white rounded-full px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest mb-6">
                      View Codebase
                   </button>
                   <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 grayscale hover:grayscale-0 transition-all duration-1000">
                      <img src="https://picsum.photos/seed/setup/600/400" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                   </div>
                </div>
             </div>
             <IconButton icon={ExternalLink} />
          </Card>
          <div className="px-1">
            <h3 className="text-sm font-medium text-text-primary">{projects[3].title}</h3>
            <p className="text-xs text-text-secondary">{projects[3].subtitle}</p>
          </div>
        </div>
      </div>

      <footer className="mt-24 text-sm font-medium text-text-secondary flex items-center gap-4 flex-col md:flex-row">
        <span>© 2026. Made by <a href="#" className="text-text-primary hover:text-brand-blue transition-colors underline decoration-border-subtle underline-offset-4">@dheerajkamble</a></span>
        <div className="flex gap-1.5">
           <div className="w-5 h-5 bg-[#85b8ff] rounded-sm" />
           <div className="w-5 h-5 bg-brand-blue rounded-sm" />
           <div className="w-5 h-5 bg-[#0052c4] rounded-sm" />
           <div className="w-5 h-5 bg-[#adcfff] rounded-sm" />
        </div>
      </footer>
    </div>
  );
}
