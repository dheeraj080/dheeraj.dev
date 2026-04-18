import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Github, Globe } from "lucide-react";
import { projects } from "../constants";
import { useEffect } from "react";

export const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === projectId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-4xl font-bold text-text-primary mb-4">Project Not Found</h1>
          <button 
            onClick={() => navigate("/")}
            className="text-brand-blue font-bold flex items-center gap-2 mx-auto hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Go back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-surface pt-32 pb-20 px-6 max-w-7xl mx-auto"
    >
      <button 
        onClick={() => navigate("/")}
        className="mb-12 text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold uppercase tracking-widest">Back to Overview</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-12">
          <div>
            <h4 className="text-sm font-bold text-brand-blue uppercase tracking-[0.3em] mb-4">
              Project Case Study
            </h4>
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tight leading-[1.1]">
              {project.title}
            </h1>
          </div>

          <p className="text-xl text-text-secondary leading-relaxed font-medium">
            {project.description}
          </p>

          <div className="flex gap-4">
             <a 
              href="#" 
              target="_blank" 
              className="flex items-center gap-3 bg-text-primary text-surface px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform"
             >
               Live Project <ExternalLink className="w-4 h-4" />
             </a>
             <a 
              href="#" 
              target="_blank" 
              className="flex items-center gap-3 border border-border-subtle px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
             >
               Source Code <Github className="w-4 h-4" />
             </a>
          </div>

          <div className="pt-12 border-t border-border-subtle space-y-8">
            <div>
               <h4 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-4">Technologies</h4>
               <div className="flex flex-wrap gap-2">
                 {project.technologies.map(tech => (
                   <span key={tech} className="px-5 py-2 rounded-xl bg-card-bg border border-border-subtle text-[11px] font-bold text-text-primary uppercase tracking-widest">
                     {tech}
                   </span>
                 ))}
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                 <h4 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Category</h4>
                 <p className="text-lg font-bold text-text-primary">{project.subtitle}</p>
              </div>
              <div>
                 <h4 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Complexity</h4>
                 <p className="text-lg font-bold text-text-primary">High Fidelity</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-32 space-y-8">
           <div className="aspect-[4/3] rounded-[3rem] overflow-hidden border border-border-subtle bg-neutral-100 dark:bg-neutral-900 shadow-2xl">
              <img 
                src={project.image} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                alt={project.title}
                referrerPolicy="no-referrer"
              />
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-[2rem] bg-neutral-50 dark:bg-neutral-800 border border-border-subtle p-8 flex items-center justify-center">
                 <Globe className="w-12 h-12 text-brand-blue opacity-20" />
              </div>
              <div className="aspect-square rounded-[2rem] bg-neutral-50 dark:bg-neutral-800 border border-border-subtle p-8 flex flex-col justify-end">
                 <span className="text-4xl font-bold text-text-primary leading-none">0.1</span>
                 <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mt-2">Latency ms</span>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};
