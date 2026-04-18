import { Zap, ArrowUpRight, ExternalLink, BarChart, TrendingUp } from "lucide-react";
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
    className={`flex flex-col gap-6 group relative transition-all duration-500 ${hoveredId && hoveredId !== 'terminal' ? 'blur-md opacity-40 scale-95 grayscale' : hoveredId === 'terminal' ? 'z-50 scale-[1.02]' : 'z-10'}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <Card 
      className="h-[400px] md:h-[500px] flex items-center justify-center p-4 md:p-12"
      onClick={onClick}
      ariaLabel="View Project Blacklight: Low-latency Trading Lab"
    >
       <div className="w-full h-full transition-all duration-700 flex items-center justify-center">
          <div className="w-full h-full max-w-lg bg-surface dark:bg-neutral-900 rounded-[3rem] shadow-2xl p-10 flex flex-col border border-border-subtle group-hover:translate-y-2 group-hover:-rotate-[0.5deg] transition-transform duration-1000">
             <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-brand-blue rounded-2xl flex items-center justify-center animate-pulse">
                      <Zap className="w-5 h-5 text-white" />
                   </div>
                   <span className="text-xs font-bold uppercase tracking-[0.2em] text-text-primary">Blacklight v4</span>
                </div>
                <div className="flex gap-1.5 px-4 py-2 bg-green-500/10 rounded-full border border-green-500/20">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Low Latency Mode</span>
                </div>
             </div>
             <div className="flex-1 flex flex-col">
                <h2 className="text-2xl font-bold leading-tight mb-8 text-text-primary tracking-tight">
                  High-frequency execution engine for specialized markets.
                </h2>
                <div className="flex-1 rounded-[2.5rem] overflow-hidden bg-card-bg border border-border-subtle relative group/img p-8 flex flex-col justify-end">
                   <div className="absolute inset-x-0 h-40 bottom-0 bg-gradient-to-t from-brand-blue/10 to-transparent" />
                   
                   <div className="flex items-end gap-2 h-32 mb-4">
                      {[60, 40, 80, 50, 90, 70, 45, 85].map((h, i) => (
                        <div key={i} className="flex-1 bg-text-primary/10 rounded-t-lg relative overflow-hidden group-hover:bg-brand-blue/20 transition-colors">
                           <div 
                             className="absolute bottom-0 w-full bg-brand-blue transition-all duration-1000" 
                             style={{ height: `${h}%` }}
                           />
                        </div>
                      ))}
                   </div>

                   <div className="bg-surface/80 backdrop-blur-md p-4 rounded-2xl border border-border-subtle flex justify-between items-center animate-float relative z-10">
                      <div className="flex items-center gap-2">
                         <BarChart className="w-4 h-4 text-brand-blue" />
                         <span className="text-[10px] font-bold text-text-primary uppercase tracking-widest">Order Book: ACTIVE</span>
                      </div>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                   </div>
                </div>
             </div>
          </div>
       </div>
       <IconButton icon={ExternalLink} />
    </Card>
    <div className="px-6 transition-all duration-700 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
       <h3 className="text-xl font-bold text-text-primary mb-1">{projects[3].title}</h3>
       <p className="text-sm font-medium text-text-secondary uppercase tracking-widest">{projects[3].subtitle}</p>
    </div>
  </div>
);
