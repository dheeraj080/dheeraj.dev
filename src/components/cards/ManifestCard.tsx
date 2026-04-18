import { ArrowUpRight, ExternalLink } from "lucide-react";
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
    className={`flex flex-col gap-6 group relative transition-all duration-500 ${hoveredId && hoveredId !== 'manifest' ? 'blur-md opacity-40 scale-95 grayscale' : hoveredId === 'manifest' ? 'z-50 scale-[1.02]' : 'z-10'}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <Card 
      className="h-[400px] md:h-[500px] flex items-center justify-center p-4 md:p-12"
      onClick={onClick}
      ariaLabel="Read Software Architecture Patterns manifest"
    >
       <div className="w-full h-full transition-all duration-700">
          <div className="w-full h-full max-w-lg bg-surface dark:bg-neutral-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-border-subtle group-hover:-translate-y-2 transition-transform duration-700">
             <div className="bg-card-bg px-6 py-4 flex items-center justify-between border-b border-border-subtle">
                <div className="flex gap-2">
                   <div className="w-3 h-3 bg-red-400 rounded-full" />
                   <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                   <div className="w-3 h-3 bg-green-400 rounded-full" />
                </div>
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">Documentation.sys</span>
             </div>
             <div className="p-10">
                <h3 className="text-3xl font-bold leading-tight mb-8 text-text-primary tracking-tight">Systems Design Methodology</h3>
                <div className="space-y-6">
                   <div className="flex gap-3">
                      {["Architecture", "Scalability"].map(tag => (
                        <span key={tag} className="bg-text-primary text-surface px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">{tag}</span>
                      ))}
                   </div>
                   <p className="text-lg text-text-secondary leading-relaxed font-medium">
                     A deep dive into high-availability architecture patterns for sub-millisecond systems.
                   </p>
                   <div className="pt-6 border-t border-border-subtle text-[11px] font-bold text-brand-blue uppercase tracking-widest flex items-center gap-2">
                      Read the manifest <ArrowUpRight className="w-4 h-4" />
                   </div>
                </div>
             </div>
          </div>
       </div>
       <IconButton icon={ExternalLink} />
    </Card>
    <div className="px-6 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
       <h3 className="text-xl font-bold text-text-primary mb-1">{projects[2].title}</h3>
       <p className="text-sm font-medium text-text-secondary uppercase tracking-widest">{projects[2].subtitle}</p>
    </div>
  </div>
);
