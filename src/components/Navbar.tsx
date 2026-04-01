import { useState } from 'react';
import { Home, Moon, Sun } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Navbar({ toggleTheme, isDark }: { toggleTheme: () => void, isDark: boolean }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-neutral-300/80 to-transparent pt-8 pb-4 backdrop-blur-sm"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <nav className="flex items-center justify-between bg-neutral-200 rounded-[1.5rem] px-6 py-3 shadow-sm max-w-2xl mx-auto border border-neutral-400/30 transition-colors duration-300">
          <Link to="/" className="text-neutral-600 hover:text-neutral-800 transition-colors">
            <Home size={20} />
          </Link>
          <div className="flex gap-6 items-center">
            <Link to="/work" className="text-sm font-medium text-neutral-600 hover:text-neutral-800 uppercase tracking-wider transition-colors">Work</Link>
            <Link to="/about" className="text-sm font-medium text-neutral-600 hover:text-neutral-800 uppercase tracking-wider transition-colors">About</Link>
            <Link to="/blog" className="text-sm font-medium text-neutral-600 hover:text-neutral-800 uppercase tracking-wider transition-colors">Blog</Link>
            <Link to="/contact" className="text-sm font-medium text-neutral-600 hover:text-neutral-800 uppercase tracking-wider transition-colors">Contact</Link>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-neutral-600 hover:text-neutral-800 uppercase tracking-wider transition-colors">Resume</a>
            <button onClick={toggleTheme} className="text-neutral-600 hover:text-neutral-800 transition-colors ml-2" aria-label="Toggle theme">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
