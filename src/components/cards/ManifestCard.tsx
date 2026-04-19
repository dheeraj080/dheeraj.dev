import { ArrowUpRight, ExternalLink, Sparkles, Brain, Code2 } from "lucide-react";
import { Card } from "../Card";
import { IconButton } from "../IconButton";
import { projects } from "../../constants";

interface ManifestCardProps {
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  hoveredId: string | null;
}

export const ManifestCard = ({ onClick, onMouseEnter, onMouseLeave, hoveredId }: ManifestCardProps) => (
  <div 
    className={`flex flex-col gap-6 group relative transition-all duration-500 ${hoveredId && hoveredId !== 'orchestrator' ? 'blur-md opacity-40 scale-95 grayscale' : hoveredId === 'orchestrator' ? 'z-50' : 'z-10'}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <Card 
      className="h-[400px] md:h-[500px] flex items-center justify-center p-4 md:p-12"
      onClick={onClick}
      ariaLabel="View Aether AI Orchestrator project"
    >
       <div className="w-full h-full transition-all duration-700">
          <div className="w-full h-full max-w-lg bg-surface dark:bg-neutral-900 rounded-[2.5rem] shadow-sm overflow-hidden border border-border-subtle p-10 flex flex-col justify-between transition-all duration-700">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-brand-blue" />
                   <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">Neural Syncing</span>
                </div>
                <Brain className="w-6 h-6 text-text-secondary opacity-40" />
             </div>

             <div className="space-y-6 flex-1 flex flex-col justify-center">
                <div className="p-5 bg-card-bg rounded-2xl border border-border-subtle relative group-hover:bg-brand-blue group-hover:text-white transition-colors duration-500">
                   <div className="flex items-center gap-3 mb-3">
                      <Sparkles className="w-4 h-4 text-brand-blue group-hover:text-white transition-colors" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">Agent Thinking...</span>
                   </div>
                   <p className="text-sm font-medium leading-relaxed italic opacity-80">
                     "Synthesizing multi-modal datasets for predictive maintenance workflow..."
                   </p>
                </div>

                <div className="flex justify-center gap-4">
                   {[Code2, Brain, Sparkles].map((Icon, i) => (
                     <div key={i} className="w-12 h-12 bg-surface rounded-2xl border border-border-subtle flex items-center justify-center shadow-lg transform transition-transform">
                        <Icon className="w-5 h-5 text-brand-blue" />
                     </div>
                   ))}
                </div>
             </div>

             <div className="pt-6 border-t border-border-subtle text-[11px] font-bold text-text-primary uppercase tracking-widest flex items-center gap-2 group-hover:text-brand-blue transition-colors">
                Initialize Workflow <ArrowUpRight className="w-4 h-4" />
             </div>
          </div>
       </div>
       <IconButton icon={ExternalLink} />
    </Card>
    <div className="px-6 transition-all duration-700 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
       <h3 className="text-xl font-bold text-text-primary mb-1">{projects[2].title}</h3>
       <p className="text-sm font-medium text-text-secondary uppercase tracking-widest">{projects[2].subtitle}</p>
    </div>
  </div>
);
