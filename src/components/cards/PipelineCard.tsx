import { Mail, Send, CheckCircle2, Inbox } from "lucide-react";
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
    className={`flex flex-col gap-6 group relative transition-all duration-500 ${hoveredId && hoveredId !== 'email' ? 'blur-md opacity-40 scale-95 grayscale' : hoveredId === 'email' ? 'z-50 scale-[1.02]' : 'z-10'}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <Card 
      className="h-[400px] md:h-[500px] flex items-center justify-center p-4 md:p-12"
      onClick={onClick}
      ariaLabel="View Nexus Email Engine project"
    >
      <div className="w-full h-full transition-all duration-700">
        <div className="w-full h-full max-w-lg bg-neutral-50 dark:bg-neutral-900 rounded-[2.5rem] shadow-sm p-10 border border-border-subtle transition-all duration-700 overflow-hidden relative flex flex-col justify-between">
          <div className="flex justify-between items-center">
             <div className="p-4 bg-brand-blue rounded-2xl shadow-lg">
                <Send className="w-6 h-6 text-white" />
             </div>
             <div className="text-right">
                <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.3em] mb-1">Queue Status</h4>
                <div className="text-xs font-bold text-green-500 flex items-center gap-2 justify-end">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> CLEAN
                </div>
             </div>
          </div>

          <div className="space-y-4">
             {[
                { subject: "Password Reset", status: "Delivered", time: "2ms" },
                { subject: "Order #8421", status: "Delivered", time: "4ms" },
                { subject: "Daily Report", status: "Sent", time: "1ms" }
             ].map((msg, i) => (
               <motion.div 
                 key={msg.subject} 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="flex items-center justify-between p-4 bg-surface dark:bg-neutral-800 rounded-2xl border border-border-subtle"
               >
                  <div className="flex items-center gap-3">
                     <Mail className="w-4 h-4 text-text-secondary" />
                     <span className="text-[11px] font-bold text-text-primary uppercase tracking-wider">{msg.subject}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-bold text-text-secondary">{msg.time}</span>
                     <CheckCircle2 className="w-3 h-3 text-green-500" />
                  </div>
               </motion.div>
             ))}
          </div>

          <div className="flex justify-between items-end pt-4 border-t border-border-subtle">
             <div>
                <h4 className="text-2xl font-bold text-text-primary leading-none">1.2M</h4>
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mt-1">Daily Delivery</p>
             </div>
             <Inbox className="w-8 h-8 text-brand-blue opacity-20 animate-float" />
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
