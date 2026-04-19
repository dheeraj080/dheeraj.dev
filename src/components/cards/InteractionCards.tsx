import { Wallet, Mail, Brain, Cpu, ArrowUpRight } from "lucide-react";
import { Card } from "../Card";

interface InteractionCardsProps {
  onClickConsole?: () => void;
  onClickCPU?: () => void;
  onClickAI?: () => void;
  onClickSystems?: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  hoveredId: string | null;
}

export const InteractionCards = ({ 
  onClickConsole, 
  onClickCPU, 
  onClickAI,
  onClickSystems,
  onMouseEnter, 
  onMouseLeave, 
  hoveredId 
}: InteractionCardsProps) => {
  const items = [
    { 
      id: 'lab-1', 
      icon: Wallet, 
      label: "Finance", 
      description: "Real-time trading dashboards",
      onClick: onClickConsole, 
      color: "text-brand-blue" 
    },
    { 
      id: 'lab-2', 
      icon: Mail, 
      label: "Messaging", 
      description: "Scalable chat infrastructure",
      onClick: onClickCPU, 
      color: "text-brand-blue" 
    },
    { 
      id: 'lab-3', 
      icon: Brain, 
      label: "Neural", 
      description: "ML pipeline tooling",
      onClick: onClickAI, 
      color: "text-brand-blue" 
    },
    { 
      id: 'lab-4', 
      icon: Cpu, 
      label: "Systems", 
      description: "Low-latency backend services",
      onClick: onClickSystems, 
      color: "text-brand-blue" 
    }
  ];

  return (
    <div 
      className={`grid grid-cols-2 gap-4 md:gap-6 md:h-[500px] transition-all duration-700 ${hoveredId && hoveredId !== 'interaction' ? 'blur-md opacity-40 scale-95 grayscale' : hoveredId === 'interaction' ? 'z-50' : 'z-10'}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.map((item, i) => (
        <div key={item.id} className="h-full">
          <Card 
            onClick={item.onClick}
            className="h-full flex flex-col justify-between p-6 md:p-8"
            ariaLabel={`View ${item.label} lab`}
          >
            <div className="flex justify-between items-start">
               <div className="w-10 h-10 rounded-xl bg-surface dark:bg-neutral-800/50 border border-border-subtle flex items-center justify-center group-hover:scale-105 transition-all duration-500 shadow-sm">
                  <item.icon className={`w-4 h-4 ${item.color}`} />
               </div>
               <ArrowUpRight className="w-3 h-3 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <div className="space-y-1">
              <span className="text-[8px] font-bold text-text-secondary uppercase tracking-[0.2em] block opacity-40">Lab {String(i + 1).padStart(2, '0')}</span>
              <p className="text-sm font-bold text-text-primary tracking-tight">{item.label}</p>
              <p className="text-[10px] text-text-secondary font-medium leading-tight">{item.description}</p>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};
