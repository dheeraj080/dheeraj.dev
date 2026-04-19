import { Cpu, Code2, MapPin, ExternalLink } from "lucide-react";
import { Card } from "../Card";
import { IconButton } from "../IconButton";

interface IdentityCardProps {
  onClick?: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  hoveredId: string | null;
}

export const IdentityCard = ({ onClick, onMouseEnter, onMouseLeave, hoveredId }: IdentityCardProps) => (
  <div 
    className={`flex flex-col gap-6 group relative transition-all duration-500 ${hoveredId && hoveredId !== 'id-card' ? 'blur-md opacity-40 scale-95 grayscale' : hoveredId === 'id-card' ? 'z-50 scale-[1.02]' : 'z-10'}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <Card 
      className="h-[400px] md:h-[500px] flex items-center justify-center p-4 md:p-12 overflow-visible"
      onClick={onClick}
      ariaLabel="View about the engineer identity"
    >
       <div className="w-full h-full transition-all duration-700 flex items-center justify-center">
          <div className="relative">
             <div className="w-full max-w-sm bg-surface dark:bg-neutral-900 rounded-[2.5rem] shadow-sm p-12 relative overflow-hidden transition-all duration-700 border border-border-subtle">
               <div className="absolute left-0 top-0 bottom-0 w-14 bg-card-bg flex flex-col items-center justify-center border-r border-border-subtle">
                 <span className="rotate-[-90deg] whitespace-nowrap text-[11px] font-bold text-text-secondary tracking-[0.3em] uppercase opacity-40">Engineering ID</span>
               </div>
               <div className="pl-12 flex flex-col gap-8">
                 <div className="w-24 h-24 rounded-full bg-card-bg overflow-hidden ring-4 ring-card-bg shadow-lg">
                   <img src="https://picsum.photos/seed/dheeraj/400" className="w-full h-full object-cover brightness-110" referrerPolicy="no-referrer" />
                 </div>
                 <div>
                   <h3 className="text-2xl font-bold text-text-primary tracking-tight mb-1">Dheeraj Kamble</h3>
                   <p className="text-sm text-brand-blue font-bold uppercase tracking-widest">Full Stack Engineer</p>
                 </div>
                 <div className="space-y-4 pt-8 border-t border-border-subtle">
                   {[
                     { icon: Cpu, text: "Systems logic" },
                     { icon: Code2, text: "Backend mastery" },
                     { icon: MapPin, text: "Based in Asia" }
                   ].map(item => (
                     <div key={item.text} className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors">
                       <item.icon className="w-4 h-4 opacity-40" />
                       <span className="text-[12px] font-bold tracking-tight">{item.text}</span>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
          </div>
       </div>
       <IconButton icon={ExternalLink} />
    </Card>
    <div className="px-6 transition-all duration-700 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
       <h3 className="text-xl font-bold text-text-primary mb-1">Identity</h3>
       <p className="text-sm font-medium text-text-secondary uppercase tracking-widest">About the engineer</p>
    </div>
  </div>
);
