import { Terminal, ArrowUpRight, ExternalLink } from "lucide-react";
import { Card } from "../Card";
import { IconButton } from "../IconButton";
import { projects } from "../../constants";

interface WorkspaceCardProps {
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  hoveredId: string | null;
}

export const WorkspaceCard = ({ onClick, onMouseEnter, onMouseLeave, hoveredId }: WorkspaceCardProps) => (
  <div 
    className={`flex flex-col gap-6 group relative transition-all duration-500 ${hoveredId && hoveredId !== 'workspace' ? 'blur-md opacity-40 scale-95 grayscale' : hoveredId === 'workspace' ? 'z-50 scale-[1.02]' : 'z-10'}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <Card 
      className="h-[400px] md:h-[500px] flex items-center justify-center p-4 md:p-12"
      onClick={onClick}
      ariaLabel="View development environment workspace setup project"
    >
       <div className="w-full h-full transition-all duration-700 flex items-center justify-center">
          <div className="w-full h-full max-w-lg bg-surface dark:bg-neutral-900 rounded-[3rem] shadow-2xl p-10 flex flex-col border border-border-subtle group-hover:translate-y-4 transition-transform duration-1000">
             <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-text-primary rounded-2xl flex items-center justify-center">
                      <Terminal className="w-5 h-5 text-surface" />
                   </div>
                   <span className="text-xs font-bold uppercase tracking-[0.2em] text-text-primary">Dev Workspace</span>
                </div>
                <div className="flex gap-1.5">
                   <div className="w-2.5 h-2.5 rounded-full bg-border-subtle" />
                   <div className="w-2.5 h-2.5 rounded-full bg-border-subtle" />
                </div>
             </div>
             <div className="flex-1 flex flex-col">
                <h2 className="text-2xl font-bold leading-tight mb-8 text-text-primary tracking-tight">
                  Building performant foundations for the modern web.
                </h2>
                <div className="flex-1 rounded-[2.5rem] overflow-hidden bg-card-bg border border-border-subtle relative group/img">
                   <img 
                     src="https://picsum.photos/seed/setup/800/600" 
                     className="w-full h-full object-cover grayscale opacity-30 group-hover/img:scale-110 group-hover/img:opacity-100 group-hover/img:grayscale-0 transition-all duration-1000" 
                     referrerPolicy="no-referrer" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                   <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-surface/80 backdrop-blur-md p-4 rounded-2xl border border-border-subtle flex justify-between items-center">
                         <span className="text-[10px] font-bold text-text-primary uppercase tracking-widest">Environment Ready</span>
                         <ArrowUpRight className="w-4 h-4 text-text-secondary" />
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
       <IconButton icon={ExternalLink} />
    </Card>
    <div className="px-6 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
       <h3 className="text-xl font-bold text-text-primary mb-1">{projects[3].title}</h3>
       <p className="text-sm font-medium text-text-secondary uppercase tracking-widest">{projects[3].subtitle}</p>
    </div>
  </div>
);
