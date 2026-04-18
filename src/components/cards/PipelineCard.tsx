import { Globe } from "lucide-react";
import { motion } from "motion/react";
import { Card } from "../Card";
import { IconButton } from "../IconButton";
import { Github } from "lucide-react";
import { projects } from "../../constants";

interface PipelineCardProps {
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  hoveredId: string | null;
}

export const PipelineCard = ({ onClick, onMouseEnter, onMouseLeave, hoveredId }: PipelineCardProps) => (
  <div 
    className={`flex flex-col gap-6 group relative transition-all duration-500 ${hoveredId && hoveredId !== 'pipeline' ? 'blur-md opacity-40 scale-95 grayscale' : hoveredId === 'pipeline' ? 'z-50 scale-[1.02]' : 'z-10'}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <Card 
      className="h-[400px] md:h-[500px] flex items-center justify-center p-4 md:p-12"
      onClick={onClick}
      ariaLabel="View Enterprise Data Pipeline project"
    >
      <div className="w-full h-full transition-all duration-700">
        <div className="w-full h-full max-w-lg bg-neutral-50 dark:bg-neutral-900 rounded-[2.5rem] shadow-2xl p-8 border border-border-subtle group-hover:rotate-1 transition-transform overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 blur-[100px] -mr-32 -mt-32" />
          
          <div className="space-y-8 relative z-10">
            <div>
               <h4 className="text-[11px] font-bold text-text-secondary uppercase tracking-[0.2em] mb-4">Architecture Metric</h4>
               <div className="flex flex-wrap gap-2">
                 {projects[1].technologies.map(m => (
                   <span key={m} className="px-5 py-2 rounded-xl border border-border-subtle bg-surface text-[11px] font-bold text-text-primary group-hover:bg-brand-blue hover:text-white transition-colors uppercase tracking-widest">{m}</span>
                 ))}
               </div>
            </div>
            
            <div className="p-8 rounded-[2rem] bg-surface border border-border-subtle shadow-inner">
               <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xs font-bold text-text-primary uppercase tracking-widest">Throughput</h4>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-green-500" />
                     <span className="text-xs font-bold text-green-500">OPTIMAL</span>
                  </div>
               </div>
               <div className="flex gap-1.5 items-end h-24 mb-4">
                  {[40, 70, 45, 90, 65, 80, 50, 95].map((h, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ height: 0 }} 
                      whileInView={{ height: `${h}%` }} 
                      transition={{ delay: i * 0.1, duration: 1 }}
                      className="flex-1 bg-brand-blue rounded-t-lg opacity-80" 
                    />
                  ))}
               </div>
               <div className="flex justify-between items-end">
                  <div>
                     <h4 className="text-xl font-bold text-text-primary">980k ops/s</h4>
                     <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Pipeline Health</p>
                  </div>
                  <Globe className="w-8 h-8 text-brand-blue opacity-20" />
               </div>
            </div>
          </div>
        </div>
      </div>
      <IconButton icon={Github} />
    </Card>
    <div className="px-6 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
       <h3 className="text-xl font-bold text-text-primary mb-1">{projects[1].title}</h3>
       <p className="text-sm font-medium text-text-secondary uppercase tracking-widest">{projects[1].subtitle}</p>
    </div>
  </div>
);
