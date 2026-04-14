import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const projectsList = [
  { id: 'ai-finance-tracker', title: 'AI Finance Tracker' },
  { id: 'stock-data-platform', title: 'Stock Data Platform' },
  { id: 'e-commerce-platform', title: 'E-Commerce Platform' },
  { id: 'ecommerce-frontend', title: 'E-Commerce Frontend' },
  { id: 'real-time-chat', title: 'Real-time Chat App' },
  { id: 'task-manager', title: 'Task Manager' },
  { id: 'analytics-dashboard', title: 'Analytics Dashboard' },
  { id: 'redis-cache-layer', title: 'Redis Cache Layer' }
];

export default function Project() {
  const { id } = useParams();
  const container = useRef<HTMLElement>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.project-title .tl span', { y: 0 });
      gsap.set('.project-content > *', { opacity: 1, y: 0 });
      gsap.set('.project-image', { opacity: 1, scale: 1 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.to('.project-title .tl span', { y: 0, duration: 1.05, stagger: 0.08, delay: 0.2 })
      .from('.project-nav-container', { opacity: 0, duration: 0.6 }, '-=0.6')
      .from('.project-image', { scale: 0.95, opacity: 0, duration: 0.8 }, '-=0.4')
      .from('.project-sidebar > div', { x: -20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
      .from('.project-content section', { y: 30, opacity: 0, duration: 0.8, stagger: 0.15 }, '-=0.6');
  }, { scope: container, dependencies: [id] });

  const currentIndex = projectsList.findIndex(p => p.id === id);
  const prevProject = currentIndex > 0 ? projectsList[currentIndex - 1] : null;
  const nextProject = currentIndex !== -1 && currentIndex < projectsList.length - 1 ? projectsList[currentIndex + 1] : null;

  return (
    <main className="pt-[160px] pb-[120px] px-6 md:px-11 min-h-screen" ref={container}>
      <div className="max-w-[1200px] mx-auto">
        <div className="project-nav-container flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <Link to="/" className="inline-flex items-center gap-[7px] text-[11px] tracking-[0.09em] uppercase border border-border text-muted px-[14px] py-[7px] rounded-full hover:bg-fg hover:text-bg hover:border-fg transition-all duration-300 w-fit">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="rotate-180">
              <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            Back to Home
          </Link>
          
          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t border-border md:border-t-0 pt-4 md:pt-0">
            {prevProject && (
              <Link to={`/work/${prevProject.id}`} className="flex items-center gap-3 text-muted hover:text-fg transition-colors group">
                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-fg group-hover:border-fg transition-all duration-300 shrink-0">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="rotate-180 transition-colors duration-300">
                    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" className="text-muted group-hover:text-bg" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <div className="flex flex-col items-start">
                  <div className="text-[10px] tracking-[0.14em] uppercase text-muted mb-1">Previous</div>
                  <div className="text-[14px] font-medium line-clamp-1 max-w-[120px] sm:max-w-[200px]">{prevProject.title}</div>
                </div>
              </Link>
            )}
            
            {prevProject && nextProject && (
              <div className="w-px h-8 bg-border hidden md:block"></div>
            )}

            {nextProject && (
              <Link to={`/work/${nextProject.id}`} className="flex items-center gap-3 text-muted hover:text-fg transition-colors group ml-auto md:ml-0">
                <div className="flex flex-col items-end">
                  <div className="text-[10px] tracking-[0.14em] uppercase text-muted mb-1">Next</div>
                  <div className="text-[14px] font-medium line-clamp-1 max-w-[120px] sm:max-w-[200px]">{nextProject.title}</div>
                </div>
                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-fg group-hover:border-fg transition-all duration-300 shrink-0">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-colors duration-300">
                    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" className="text-muted group-hover:text-bg" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </Link>
            )}
          </div>
        </div>
        
        <h1 className="project-title font-heading text-[clamp(40px,6vw,80px)] font-extrabold tracking-[-0.045em] leading-[0.95] mb-12 capitalize">
          <span className="tl overflow-hidden block">
            <span className="block translate-y-[110%]">{id?.replace(/-/g, ' ')}</span>
          </span>
        </h1>
        
        <div className="project-image aspect-video w-full bg-neutral-900 rounded-2xl mb-16 overflow-hidden border border-border">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop" 
            alt={id} 
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="project-sidebar md:col-span-4 space-y-12">
            <div>
              <div className="text-[10px] tracking-[0.14em] uppercase text-muted mb-4 border-b border-border pb-2">Services</div>
              <ul className="space-y-3">
                <li className="text-[14px] text-fg font-light">Full Stack Development</li>
                <li className="text-[14px] text-fg font-light">Frontend Architecture</li>
                <li className="text-[14px] text-fg font-light">API Development</li>
              </ul>
            </div>
            
            <div>
              <div className="text-[10px] tracking-[0.14em] uppercase text-muted mb-4 border-b border-border pb-2">Links</div>
              <div className="space-y-4">
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted hover:text-fg transition-colors group">
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-fg group-hover:border-fg transition-all duration-300">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-colors duration-300">
                      <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" className="text-muted group-hover:text-bg" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <span className="text-[14px] font-medium">Live Demo</span>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted hover:text-fg transition-colors group">
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-fg group-hover:border-fg transition-all duration-300">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-colors duration-300">
                      <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" className="text-muted group-hover:text-bg" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <span className="text-[14px] font-medium">Source Code</span>
                </a>
              </div>
            </div>
          </div>
          <div className="project-content md:col-span-8 space-y-16">
            <section>
              <h2 className="text-[32px] font-medium tracking-tight mb-6 text-fg">The What & Why</h2>
              <p className="text-[16px] text-muted leading-[1.7] font-light mb-6">
                This is a detailed case study for {id?.replace(/-/g, ' ')}. We approached this project with a focus on creating a highly available, fault-tolerant system capable of handling massive spikes in traffic without degrading performance.
              </p>
              <p className="text-[16px] text-muted leading-[1.7] font-light">
                The architecture combines a responsive React frontend with distributed caching, asynchronous event processing, and a robust microservices design. The result is a seamless user experience backed by resilient infrastructure.
              </p>
            </section>

            <section>
              <h2 className="text-[32px] font-medium tracking-tight mb-6 text-fg">My Specific Contribution</h2>
              <p className="text-[16px] text-muted leading-[1.7] font-light">
                As the lead full-stack engineer on this project, I was responsible for architecting both the React frontend and the core microservices. I directly implemented the interactive UI components, set up the state management, and built the underlying REST APIs and database schemas.
              </p>
            </section>

            <section>
              <h2 className="text-[32px] font-medium tracking-tight mb-6 text-fg">The Process & Technical Challenges</h2>
              <p className="text-[16px] text-muted leading-[1.7] font-light mb-6">
                One of the most significant challenges we faced was ensuring idempotency across distributed transactions. When a network partition occurred, retries could lead to duplicate processing, which is catastrophic in a financial system.
              </p>
              <p className="text-[16px] text-muted leading-[1.7] font-light">
                <strong className="text-fg font-medium">The Solution:</strong> I implemented a robust idempotency key pattern using Redis. Before processing any transaction, the system checks Redis for the unique idempotency key. If it exists and is marked as completed, we return the cached response. If it's in progress, we wait. This, combined with database-level unique constraints, ensured exactly-once processing semantics even during severe network degradation.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
