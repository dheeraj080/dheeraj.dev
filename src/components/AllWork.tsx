import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const allProjects = [
  { id: 'ecommerce-frontend', title: 'E-Commerce Frontend', tags: ['React', 'Tailwind', 'Redux'], image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop' },
  { id: 'real-time-chat', title: 'Real-time Chat App', tags: ['Node.js', 'WebSockets', 'React'], image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop' },
  { id: 'task-manager', title: 'Task Manager', tags: ['Next.js', 'Prisma', 'PostgreSQL'], image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=600&auto=format&fit=crop' },
  { id: 'analytics-dashboard', title: 'Analytics Dashboard', tags: ['TypeScript', 'D3.js', 'Express'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop' },
  { id: 'redis-cache-layer', title: 'Redis Cache Layer', tags: ['Redis', 'Spring Boot', 'Performance'], image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=600&auto=format&fit=crop' },
];

export default function AllWork() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(20);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.all-work-header .tl span', { y: 0 });
      gsap.set('.all-work-item', { opacity: 1, y: 0 });
      return;
    }

    const titleSpans = document.querySelectorAll('.all-work-header .tl span');
    if (titleSpans.length > 0) {
      gsap.to(titleSpans, {
        y: 0, duration: 1.05, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.all-work-header', start: 'top 88%' }
      });
    }

    gsap.from('.all-work-item', {
      y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: scrollContainerRef.current, start: 'top 85%' }
    });
  }, { scope: sectionRef });

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      setScrollProgress(progress);
      
      const widthPercentage = Math.max((clientWidth / scrollWidth) * 100, 10);
      setThumbWidth(widthPercentage);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  return (
    <section className="py-[120px] overflow-hidden relative" ref={sectionRef}>
      <div className="s-header flex justify-between items-center pb-5 border-b border-border mb-16 px-6 md:px-11 max-md:mb-10">
        <div>
          <p className="s-label text-[10px] tracking-[0.14em] uppercase text-muted mb-2">Archive</p>
          <h2 className="all-work-header font-heading text-[clamp(52px,8vw,110px)] font-extrabold tracking-[-0.045em] leading-[0.88] max-md:text-[14vw]">
            <span className="tl overflow-hidden block">
              <span className="block translate-y-[110%]">All work</span>
            </span>
          </h2>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto pb-12 px-6 md:px-11 gap-6 snap-x snap-mandatory hide-scrollbar"
      >
        {allProjects.map((project) => (
          <div key={project.id} className="all-work-item shrink-0 w-[320px] md:w-[400px] snap-center group">
            <Link to={`/work/${project.id}`} className="block relative aspect-[3/4.2] rounded-[2rem] overflow-hidden bg-neutral-900 mb-6 shadow-lg border border-border" data-cursor="view">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
            </Link>
            <div className="text-center">
              <h3 className="text-[24px] font-medium tracking-tight mb-4 group-hover:text-fg transition-colors duration-300">{project.title}</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-medium uppercase tracking-[0.14em] border border-border text-muted px-[10px] py-[4px] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        {/* Spacer for end alignment */}
        <div className="w-[10vw] shrink-0 md:w-[calc(100vw-400px-44px)]"></div>
      </div>

      {/* Custom Scrollbar Component */}
      <div className="px-6 md:px-11 mt-4 flex items-center justify-center gap-6">
        <button 
          onClick={() => scroll('left')}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:bg-fg hover:text-bg hover:border-fg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-muted disabled:hover:border-border"
          disabled={scrollProgress <= 0.01}
          aria-label="Scroll left"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-180">
            <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        
        <div className="w-48 h-[1px] bg-border relative">
          <div 
            className="absolute top-1/2 -translate-y-1/2 left-0 h-[3px] bg-fg rounded-full"
            style={{ 
              width: `${thumbWidth}%`,
              transform: `translateX(${scrollProgress * ((100 - thumbWidth) / thumbWidth * 100)}%)`
            }}
          />
        </div>

        <button 
          onClick={() => scroll('right')}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:bg-fg hover:text-bg hover:border-fg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-muted disabled:hover:border-border"
          disabled={scrollProgress >= 0.99}
          aria-label="Scroll right"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
      </div>
    </section>
  );
}
