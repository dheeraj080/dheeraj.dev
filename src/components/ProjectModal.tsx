/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { X, Layers, ArrowUpRight, Github } from "lucide-react";
import { Project } from "../types";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div 
      initial={{ y: 50, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 50, opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="bg-surface border border-border-subtle w-full max-w-5xl h-fit max-h-[90vh] rounded-[3.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.2)] flex flex-col md:flex-row"
      onClick={e => e.stopPropagation()}
    >
      {/* Visual Side */}
      <div className="w-full md:w-5/12 bg-card-bg p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border-subtle">
        <div>
          <div className="flex items-center gap-2 mb-8">
             <div className="w-8 h-8 rounded-xl bg-brand-blue flex items-center justify-center text-white">
                <Layers className="w-4 h-4" />
             </div>
             <span className="text-[11px] font-bold text-text-secondary uppercase tracking-[0.2em]">Project Case Study</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight tracking-tight mb-6">{project.title}</h2>
          <div className="flex flex-wrap gap-2 mb-12">
            {project.technologies.map(tech => (
              <span key={tech} className="px-4 py-1.5 rounded-full bg-surface border border-border-subtle text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <a 
            href={project.liveUrl} 
            target="_blank" 
            className="w-full bg-text-primary text-surface py-5 rounded-3xl flex items-center justify-center gap-2 font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
            rel="noreferrer"
          >
            Launch Experience
            <ArrowUpRight className="w-5 h-5" />
          </a>
          <a 
            href={project.repoUrl} 
            target="_blank" 
            className="w-full bg-card-bg text-text-primary border border-border-subtle py-5 rounded-3xl flex items-center justify-center gap-2 font-bold hover:bg-border-subtle transition-all active:scale-[0.98]"
            rel="noreferrer"
          >
            <Github className="w-5 h-5" />
            Repository
          </a>
        </div>
      </div>

      {/* Content Side */}
      <div className="flex-1 p-8 md:p-16 overflow-y-auto no-scrollbar bg-surface/50 relative">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 w-12 h-12 rounded-full bg-card-bg border border-border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary transition-all hover:scale-110 active:scale-90 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
              The Challenge
            </h3>
            <p className="text-text-secondary text-lg leading-relaxed">
              {project.description}
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              Key Milestones
            </h3>
            <div className="grid gap-4">
              {[
                "Architected core system primitives for maximum performance.",
                "Implemented fault-tolerant distributed communication layers.",
                "Optimized data flow and serialization for low-latency processing.",
                "Successfully deployed to production with 99.9% targeted uptime."
              ].map((milestone, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-card-bg/50 border border-border-subtle flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-text-secondary font-medium leading-tight">{milestone}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>
    </motion.div>
  </motion.div>
);
