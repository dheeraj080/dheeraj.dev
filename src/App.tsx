/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, 
  Github,
  Linkedin,
} from "lucide-react";

// Components
import { Navbar } from "./components/Navbar";
import { ProjectDetails } from "./components/ProjectDetails";
import { IdentityDetails } from "./components/IdentityDetails";

// Cards
import { InfraCard } from "./components/cards/InfraCard";
import { PipelineCard } from "./components/cards/PipelineCard";
import { ManifestCard } from "./components/cards/ManifestCard";
import { InteractionCards } from "./components/cards/InteractionCards";
import { IdentityCard } from "./components/cards/IdentityCard";
import { WorkspaceCard } from "./components/cards/WorkspaceCard";

// Constants & Types
import { projects } from "./constants";

function BentoOverview({ 
  hoveredId, 
  setHoveredId 
}: { 
  hoveredId: string | null; 
  setHoveredId: (id: string | null) => void;
}) {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className={`w-full mb-24 text-left self-start max-w-2xl px-2 transition-all duration-500 ${hoveredId ? 'blur-md opacity-40 grayscale scale-95' : ''}`}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-[17px] font-medium mb-12 text-text-primary tracking-tight">Dheeraj Kamble</h1>
          
          <h2 className="text-3xl md:text-5xl font-medium leading-[1.2] mb-12 text-text-primary tracking-tight text-balance">
            I build scalable foundations <br className="hidden md:block" /> and innovative web solutions.
          </h2>

          <div className="flex gap-4 items-center">
            <a href="mailto:dheeraj@example.com" className="text-text-secondary hover:text-brand-blue transition-all hover:scale-110 active:scale-90" title="Email">
              <Mail className="w-5 h-5" />
            </a>
            <a href="#" className="text-text-secondary hover:text-brand-blue transition-all hover:scale-110 active:scale-90" title="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-text-secondary hover:text-brand-blue transition-all hover:scale-110 active:scale-90" title="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Bento Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
        <InfraCard 
          onClick={() => navigate(`/project/${projects[0].id}`)}
          onMouseEnter={() => setHoveredId('infra')}
          onMouseLeave={() => setHoveredId(null)}
          hoveredId={hoveredId}
        />

        <PipelineCard 
          onClick={() => navigate(`/project/${projects[1].id}`)}
          onMouseEnter={() => setHoveredId('pipeline')}
          onMouseLeave={() => setHoveredId(null)}
          hoveredId={hoveredId}
        />

        <ManifestCard 
          onClick={() => navigate(`/project/${projects[2].id}`)}
          onMouseEnter={() => setHoveredId('manifest')}
          onMouseLeave={() => setHoveredId(null)}
          hoveredId={hoveredId}
        />

        <InteractionCards 
          onClickConsole={() => navigate("/project/infra")}
          onClickCPU={() => navigate("/project/pipeline")}
          onMouseEnter={() => setHoveredId('interaction')}
          onMouseLeave={() => setHoveredId(null)}
          hoveredId={hoveredId}
        />

        <IdentityCard 
          onClick={() => navigate("/identity")}
          onMouseEnter={() => setHoveredId('id-card')}
          onMouseLeave={() => setHoveredId(null)}
          hoveredId={hoveredId}
        />

        <WorkspaceCard 
          onClick={() => navigate(`/project/${projects[3].id}`)}
          onMouseEnter={() => setHoveredId('workspace')}
          onMouseLeave={() => setHoveredId(null)}
          hoveredId={hoveredId}
        />
      </div>

      <footer className={`mt-24 text-sm font-medium text-text-secondary flex items-center gap-4 flex-col md:flex-row transition-all duration-500 ${hoveredId ? 'blur-md opacity-40 grayscale scale-95' : ''}`}>
        <span>© 2026. Made by <a href="#" className="text-text-primary hover:text-brand-blue transition-colors underline decoration-border-subtle underline-offset-4">@dheerajkamble</a></span>
        <div className="flex gap-1.5">
           <div className="w-5 h-5 bg-[#85b8ff] rounded-sm" />
           <div className="w-5 h-5 bg-brand-blue rounded-sm" />
           <div className="w-5 h-5 bg-[#0052c4] rounded-sm" />
           <div className="w-5 h-5 bg-[#adcfff] rounded-sm" />
        </div>
      </footer>
    </>
  );
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Reset hover state when changing routes
  useEffect(() => {
    setHoveredId(null);
  }, [location.pathname]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className="min-h-screen pb-20 pt-32 md:pt-40 px-6 flex flex-col items-start max-w-7xl mx-auto overflow-x-hidden transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <Routes>
        <Route path="/" element={<BentoOverview hoveredId={hoveredId} setHoveredId={setHoveredId} />} />
        <Route path="/project/:projectId" element={<ProjectDetails />} />
        <Route path="/identity" element={<IdentityDetails />} />
      </Routes>
    </div>
  );
}

