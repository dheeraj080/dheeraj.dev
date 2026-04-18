import { Terminal, Code2, Cpu, Sparkles } from "lucide-react";
import { Card } from "../Card";
import { IconButton } from "../IconButton";

interface InteractionCardsProps {
  onClickConsole?: () => void;
  onClickCPU?: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  hoveredId: string | null;
}

export const InteractionCards = ({ onClickConsole, onClickCPU, onMouseEnter, onMouseLeave, hoveredId }: InteractionCardsProps) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:h-[500px] transition-all duration-500 ${hoveredId && hoveredId !== 'interaction' ? 'blur-md opacity-40 scale-95 grayscale' : hoveredId === 'interaction' ? 'z-50 scale-[1.02]' : 'z-10'}`}>
     <Card 
      className="h-[400px] md:h-full flex items-center justify-center group/inner hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClickConsole}
      ariaLabel="View Infrastructure project lab"
    >
        <div className="w-32 h-32 bg-surface/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-border-subtle flex items-center justify-center group-hover/inner:rotate-[-5deg] group-hover/inner:scale-110 transition-all duration-700">
           <Terminal className="w-12 h-12 text-brand-blue" />
        </div>
        <IconButton icon={Code2} />
     </Card>
     
     <Card 
      className="h-[400px] md:h-full flex items-center justify-center group/inner hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClickCPU}
      ariaLabel="View Data Pipelines project lab"
    >
        <div className="relative">
           <div className="w-32 h-32 bg-brand-blue rounded-[3rem] shadow-[0_20px_50px_rgba(29,86,184,0.3)] flex items-center justify-center group-hover/inner:rotate-12 group-hover/inner:scale-110 transition-all duration-700">
              <Cpu className="w-12 h-12 text-white/90" />
           </div>
           <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-2 bg-black/10 dark:bg-white/10 blur-xl rounded-full" />
        </div>
        <IconButton icon={Sparkles} />
     </Card>
  </div>
);
