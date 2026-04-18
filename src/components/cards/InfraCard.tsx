import { Wallet, TrendingUp, ArrowUpRight, DollarSign } from "lucide-react";
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
    className={`flex flex-col gap-6 group relative transition-all duration-500 ${hoveredId && hoveredId !== 'finance' ? 'blur-md opacity-40 scale-95 grayscale' : hoveredId === 'finance' ? 'z-50 scale-[1.02]' : 'z-10'}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <Card 
      className="h-[400px] md:h-[500px] flex items-center justify-center p-4 md:p-12"
      onClick={onClick}
      ariaLabel="View Omni Finance Tracker project"
    >
      <div className="w-full h-full transition-all duration-700">
        <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.1)] p-8 overflow-hidden border border-border-subtle h-full flex flex-col justify-between group-hover:-translate-y-2 transition-transform duration-1000">
          <div className="flex justify-between items-start">
             <div>
                <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.3em] mb-2">Total Balance</h4>
                <div className="flex items-baseline gap-2">
                   <span className="text-4xl font-bold text-text-primary">$12,840</span>
                   <span className="text-xs font-bold text-green-500 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +12%
                   </span>
                </div>
             </div>
             <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-brand-blue" />
             </div>
          </div>

          <div className="space-y-4 py-8">
             {[
                { name: "Stocks", val: "+$1,200", color: "text-green-500" },
                { name: "Crypto", val: "-$420", color: "text-red-500" },
                { name: "Savings", val: "+$850", color: "text-green-500" }
             ].map((item, i) => (
               <div key={item.name} className="flex justify-between items-center p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-border-subtle">
                  <span className="text-xs font-bold text-text-primary uppercase tracking-wider">{item.name}</span>
                  <span className={`text-xs font-bold ${item.color}`}>{item.val}</span>
               </div>
             ))}
          </div>

          <div className="bg-brand-blue p-4 rounded-2xl flex items-center justify-center gap-3 group-hover:bg-[#0052c4] transition-colors cursor-pointer active:scale-95">
             <DollarSign className="w-4 h-4 text-white" />
             <span className="text-[11px] font-bold text-white uppercase tracking-widest">Trade Now</span>
          </div>
        </div>
      </div>
      <IconButton icon={ArrowUpRight} />
    </Card>
    <div className="px-6 transition-all duration-700 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
       <h3 className="text-xl font-bold text-text-primary mb-1">{projects[0].title}</h3>
       <p className="text-sm font-medium text-text-secondary uppercase tracking-widest">{projects[0].subtitle}</p>
    </div>
  </div>
);
