import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ toggleTheme, isDark }: { toggleTheme: () => void, isDark: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav 
        id="nav" 
        className={`fixed z-[200] flex justify-between items-center transition-all duration-450 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          scrolled 
            ? 'top-4 left-[5%] right-[5%] md:left-[22%] md:right-[22%] gap-6 md:gap-12 px-6 md:px-9 py-3.5 rounded-full bg-bg/85 backdrop-blur-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.1)] dark:bg-[#0C0C0B]/80 dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)]' 
            : 'top-0 left-0 right-0 px-6 py-[18px] md:px-11 md:py-[22px]'
        }`}
      >
        <Link to="/" onClick={closeMobileMenu} className="nav-logo font-heading text-[15px] font-extrabold tracking-[-0.02em] z-[210]">
          dheeraj
        </Link>
        <div className="nav-right flex items-center gap-4 md:gap-9 z-[210]">
          <ul className="nav-links hidden md:flex gap-7">
            <li>
              <a href="#work" className="text-[12px] font-normal tracking-[0.1em] uppercase text-muted transition-colors duration-300 relative hover:text-fg after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-px after:bg-fg after:transition-all after:duration-300 hover:after:w-full">
                Work
              </a>
            </li>
            <li>
              <a href="#blog" className="text-[12px] font-normal tracking-[0.1em] uppercase text-muted transition-colors duration-300 relative hover:text-fg after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-px after:bg-fg after:transition-all after:duration-300 hover:after:w-full">
                Blog
              </a>
            </li>
            <li>
              <a href="#about" className="text-[12px] font-normal tracking-[0.1em] uppercase text-muted transition-colors duration-300 relative hover:text-fg after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-px after:bg-fg after:transition-all after:duration-300 hover:after:w-full">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="text-[12px] font-normal tracking-[0.1em] uppercase text-muted transition-colors duration-300 relative hover:text-fg after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-px after:bg-fg after:transition-all after:duration-300 hover:after:w-full">
                Contact
              </a>
            </li>
          </ul>
          <button 
            onClick={toggleTheme} 
            className="theme-btn flex items-center gap-[7px] bg-transparent border border-border rounded-full px-[15px] py-[7px] text-muted font-sans text-[11px] tracking-[0.08em] uppercase transition-all duration-300 hover:bg-fg hover:text-bg hover:border-fg"
            aria-label="Toggle colour scheme"
          >
            <span className="t-icon text-[13px]">{isDark ? '◐' : '◑'}</span>
            <span className="t-label hidden sm:block">{isDark ? 'Light' : 'Dark'}</span>
          </button>

          {/* Hamburger Menu Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`w-5 h-[1px] bg-fg transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}></span>
            <span className={`w-5 h-[1px] bg-fg transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-5 h-[1px] bg-fg transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-bg z-[190] flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <ul className="flex flex-col gap-8 text-center">
          <li>
            <a href="#work" onClick={closeMobileMenu} className="text-4xl font-heading font-medium tracking-tight hover:text-muted transition-colors">Work</a>
          </li>
          <li>
            <a href="#blog" onClick={closeMobileMenu} className="text-4xl font-heading font-medium tracking-tight hover:text-muted transition-colors">Blog</a>
          </li>
          <li>
            <a href="#about" onClick={closeMobileMenu} className="text-4xl font-heading font-medium tracking-tight hover:text-muted transition-colors">About</a>
          </li>
          <li>
            <a href="#contact" onClick={closeMobileMenu} className="text-4xl font-heading font-medium tracking-tight hover:text-muted transition-colors">Contact</a>
          </li>
        </ul>
      </div>
    </>
  );
}
