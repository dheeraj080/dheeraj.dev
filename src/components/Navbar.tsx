import { useState } from 'react';
import { Home, Moon, Sun, Menu, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar({ toggleTheme, isDark }: { toggleTheme: () => void, isDark: boolean }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { to: "/#work", label: "Work" },
    { to: "/#about", label: "About" },
    { to: "/#blog", label: "Blog" },
    { to: "/#contact", label: "Contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (to.startsWith('/#')) {
      e.preventDefault();
      setIsMenuOpen(false);
      
      const hash = to.substring(1); // get '#work'
      
      if (location.pathname !== '/') {
        navigate(to);
      } else {
        const target = document.querySelector(hash);
        if (target) {
          gsap.to(window, { duration: 1, scrollTo: { y: target, offsetY: 80 }, ease: "power3.inOut" });
          window.history.pushState(null, '', to);
        }
      }
    }
  };

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
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.to}
                href={link.to}
                onClick={(e) => handleNavClick(e, link.to)}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-800 uppercase tracking-wider transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button onClick={toggleTheme} className="text-neutral-600 hover:text-neutral-800 transition-colors ml-2" aria-label="Toggle theme">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <button onClick={toggleTheme} className="text-neutral-600 hover:text-neutral-800 transition-colors" aria-label="Toggle theme">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-600 hover:text-neutral-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-6 right-6 mt-4 bg-neutral-200 rounded-[1.5rem] p-6 shadow-xl border border-neutral-400/30 md:hidden"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.to}
                    href={link.to} 
                    onClick={(e) => handleNavClick(e, link.to)}
                    className="text-lg font-medium text-neutral-600 hover:text-neutral-800 uppercase tracking-wider transition-colors text-center py-2"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
