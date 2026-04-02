import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const allProjects = [
  { id: 'api-gateway', title: 'API Gateway', tags: ['Spring Cloud', 'JWT', 'Spring Boot'], image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop' },
  { id: 'kafka-pipeline', title: 'Kafka Pipeline', tags: ['Kafka', 'Java', 'Event-Driven'], image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop' },
  { id: 'notification-service', title: 'Notification Service', tags: ['Spring Boot', 'Kafka', 'Microservices'], image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=600&auto=format&fit=crop' },
  { id: 'timescale-ingestor', title: 'TimescaleDB Ingestor', tags: ['TimescaleDB', 'PostgreSQL', 'Java'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop' },
  { id: 'redis-cache-layer', title: 'Redis Cache Layer', tags: ['Redis', 'Spring Boot', 'Performance'], image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=600&auto=format&fit=crop' },
];

export default function AllWork() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(20);

  useGSAP(() => {
    gsap.from('.all-work-header', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.from('.all-work-item', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
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
    <section className="py-24 overflow-hidden relative" ref={sectionRef}>
      <div className="all-work-header container mx-auto px-6 max-w-6xl mb-12">
        <div className="flex items-center gap-4">
          <h2 className="text-4xl m-0">All work</h2>
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-600">{allProjects.length}</span>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto pb-12 px-6 gap-6 snap-x snap-mandatory hide-scrollbar"
      >
        {/* Spacer for initial alignment */}
        <div className="w-[10vw] shrink-0 lg:w-[calc((100vw-72rem)/2)]"></div>
        
        {allProjects.map((project) => (
          <div key={project.id} className="all-work-item shrink-0 w-[320px] md:w-[400px] snap-center group">
            <Link to={`/work/${project.id}`} className="block relative aspect-[3/4.2] rounded-[2rem] overflow-hidden bg-neutral-600 mb-6 shadow-lg">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-16 h-16 rounded-[1.5rem] bg-neutral-100 text-neutral-800 flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <ArrowRight size={24} />
                </div>
              </div>
            </Link>
            <div className="text-center">
              <h3 className="text-2xl mb-4">{project.title}</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-neutral-200 text-neutral-600 px-3 py-1 rounded-[1rem]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        {/* Spacer for end alignment */}
        <div className="w-[10vw] shrink-0 lg:w-[calc((100vw-72rem)/2)]"></div>
      </div>

      {/* Custom Scrollbar Component */}
      <div className="container mx-auto px-6 max-w-6xl mt-4 flex items-center justify-center gap-6">
        <button 
          onClick={() => scroll('left')}
          className="w-10 h-10 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={scrollProgress <= 0.01}
          aria-label="Scroll left"
        >
          <ArrowLeft size={16} />
        </button>
        
        <div className="w-48 h-[2px] bg-neutral-300 rounded-full overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-neutral-600 rounded-full"
            style={{ 
              width: `${thumbWidth}%`,
              transform: `translateX(${scrollProgress * ((100 - thumbWidth) / thumbWidth * 100)}%)`
            }}
          />
        </div>

        <button 
          onClick={() => scroll('right')}
          className="w-10 h-10 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={scrollProgress >= 0.99}
          aria-label="Scroll right"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
