import { Terminal, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Card } from "../Card";
import { IconButton } from "../IconButton";
import { projects } from "../../constants";

interface InfraCardProps {
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  hoveredId: string | null;
}

export const InfraCard = ({ onClick, onMouseEnter, onMouseLeave, hoveredId }: InfraCardProps) => (
  <div 
    className={`flex flex-col gap-6 group relative transition-all duration-500 ${hoveredId && hoveredId !== 'infra' ? 'blur-md opacity-40 scale-95 grayscale' : hoveredId === 'infra' ? 'z-50 scale-[1.02]' : 'z-10'}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <Card 
      className="h-[400px] md:h-[500px] flex items-center justify-center p-4 md:p-12"
      onClick={onClick}
      ariaLabel="View Cloud Infrastructure Automation project"
    >
      <div className="w-full h-full transition-all duration-700">
        <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.15)] p-6 overflow-hidden border border-border-subtle h-full">
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl aspect-[4/3] h-full flex items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-transparent opacity-50" />
            <Terminal className="w-24 h-24 text-brand-blue relative z-10" />
            <div className="absolute inset-4 flex items-center justify-center">
               <div className="w-full h-2/3 bg-black/90 dark:bg-neutral-900/90 rounded-xl border border-white/10 backdrop-blur-md p-6 font-mono text-[10px] text-green-400 overflow-hidden shadow-2xl">
                  <p className="text-white/40 mb-2">Dheeraj Console v2.1.0</p>
                  <p>$ npm install @cloud/infra</p>
                  <p className="text-blue-400">Fetching dependency graph...</p>
                  <p className="text-green-500">&gt; build successful in 12.4s</p>
                  <p className="text-yellow-400">&gt; listening on port 8080</p>
                  <p className="animate-pulse">_</p>
               </div>
            </div>
          </div>

          <div className="absolute top-10 right-10 flex gap-2">
            <div className="bg-white/95 dark:bg-neutral-800/95 backdrop-blur p-4 rounded-2xl shadow-xl border border-border-subtle flex items-center gap-2 group-hover:translate-x-2 transition-transform">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <div className="text-[11px] font-bold text-text-primary uppercase tracking-wider">Live</div>
            </div>
          </div>
        </div>
      </div>
      <IconButton icon={ArrowUpRight} />
    </Card>
    <div className="px-6 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
       <h3 className="text-xl font-bold text-text-primary mb-1">{projects[0].title}</h3>
       <p className="text-sm font-medium text-text-secondary uppercase tracking-widest">{projects[0].subtitle}</p>
    </div>
  </div>
);
