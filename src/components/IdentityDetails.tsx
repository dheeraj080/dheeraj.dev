import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Mail, Github, Linkedin, Cpu, Code2, MapPin } from "lucide-react";
import { useEffect } from "react";

export const IdentityDetails = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-surface pt-32 pb-20 px-6 max-w-7xl mx-auto"
    >
      <button 
        onClick={() => navigate("/")}
        className="mb-12 text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform" />
        <span className="text-sm font-bold uppercase tracking-widest">Back to Overview</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative inline-block"
          >
             <div className="w-64 h-64 rounded-[3rem] overflow-hidden border-8 border-white dark:border-neutral-800 shadow-2xl transition-all duration-700">
                <img src="https://picsum.photos/seed/dheeraj/800" className="w-full h-full object-cover grayscale brightness-110 hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
             </div>
             <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-brand-blue rounded-2xl flex items-center justify-center shadow-xl rotate-12">
                <Code2 className="w-10 h-10 text-white" />
             </div>
          </motion.div>

          <div>
             <h4 className="text-sm font-bold text-brand-blue uppercase tracking-[0.3em] mb-4">Engineer Identity</h4>
             <h1 className="text-6xl font-bold text-text-primary mb-6">Dheeraj Kamble</h1>
             <p className="text-xl text-text-secondary leading-relaxed max-w-xl">
               Specializing in the intersection of high-fidelity systems architecture and intuitive user experiences. I don't just build software; I craft functional foundations for business scaling.
             </p>
          </div>

          <div className="flex gap-6">
             {[
               { icon: Mail, label: "Email", href: "mailto:dheeraj@example.com" },
               { icon: Github, label: "Archive", href: "#" },
               { icon: Linkedin, label: "Network", href: "#" }
             ].map(item => (
               <a 
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-text-secondary hover:text-brand-blue transition-colors"
               >
                 <item.icon className="w-5 h-5" />
                 {item.label}
               </a>
             ))}
          </div>
        </div>

        <div className="space-y-16">
          <div className="space-y-8">
             <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest border-b border-border-subtle pb-4">Technical Pillars</h3>
             <div className="grid grid-cols-1 gap-8">
                {[
                  { icon: Cpu, title: "Systems Logic", description: "Architecting distributed systems that prioritize high availability and predictable performance." },
                  { icon: Code2, title: "Backend Mastery", description: "Deep expertise in Go, Python, and Node.js for building robust API gateways and microservices." },
                  { icon: MapPin, title: "Global Perspective", description: "Based in Asia, working with international teams to deploy solutions at scale." }
                ].map(pillar => (
                  <div key={pillar.title} className="flex gap-6 items-start">
                     <div className="w-12 h-12 bg-card-bg rounded-2xl flex-shrink-0 flex items-center justify-center">
                        <pillar.icon className="w-6 h-6 text-brand-blue" />
                     </div>
                     <div>
                        <h4 className="font-bold text-text-primary mb-1">{pillar.title}</h4>
                        <p className="text-sm text-text-secondary leading-relaxed">{pillar.description}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="p-12 bg-card-bg rounded-[3rem] border border-border-subtle">
             <h3 className="text-xl font-bold text-text-primary mb-4">Availability</h3>
             <p className="text-text-secondary mb-8">Currently exploring high-impact opportunities in Cloud Infrastructure and Fintech architecture.</p>
             <button className="w-full py-4 bg-brand-blue text-white rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-brand-blue/20 transition-transform">
                Download Technical CV
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
