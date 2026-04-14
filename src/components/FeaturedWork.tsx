import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const featuredProjects = [
  {
    id: 'ai-finance-tracker',
    title: 'AI Finance Tracker',
    company: 'Personal Project',
    year: '2025 · Full Stack',
    tags: ['React', 'Spring Boot', 'Kafka'],
    metrics: [
      { val: '100%', label: 'Microservices architecture' },
      { val: 'Real-time', label: 'Event streaming' }
    ],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop',
    gradient: 'from-[#000B35] via-[#001F82] to-[#0050FF]',
    blob1: 'bg-[#3B82F6]',
    blob2: 'bg-[#93C5FD]'
  },
  {
    id: 'stock-data-platform',
    title: 'Stock Data Platform',
    company: 'Personal Project',
    year: '2024 · Full Stack',
    tags: ['React', 'TimescaleDB', 'Redis'],
    metrics: [
      { val: '4', label: 'Data providers integrated' },
      { val: '<50ms', label: 'Query latency' }
    ],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1600&auto=format&fit=crop',
    gradient: 'from-[#001209] via-[#003A16] to-[#006B28]',
    blob1: 'bg-[#22C55E]',
    blob2: 'bg-[#86EFAC]'
  },
  {
    id: 'e-commerce-platform',
    title: 'E-Commerce Platform',
    company: 'Personal Project',
    year: '2023 · Full Stack',
    tags: ['TypeScript', 'Spring Security', 'Stripe'],
    metrics: [
      { val: 'JWT', label: 'Stateless authentication' },
      { val: '100%', label: 'Responsive design' }
    ],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop',
    gradient: 'from-[#1A0A00] via-[#4A2000] to-[#CC5500]',
    blob1: 'bg-[#F97316]',
    blob2: 'bg-[#FED7AA]'
  }
];

export default function FeaturedWork() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Skip scroll animations for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.pcard', { opacity: 1, y: 0 });
      return;
    }

    gsap.set('.pcard', { opacity: 0, y: 40 });

    const titleSpans = document.querySelectorAll('.s-title .tl span');
    if (titleSpans.length > 0) {
      gsap.to(titleSpans, {
        y: 0, duration: 1.05, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.s-title', start: 'top 88%' }
      });
    }

    gsap.utils.toArray('.pcard').forEach((el: any, i) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.75, ease: 'power2.out',
        delay: i * 0.08,
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });
  }, { scope: container });

  return (
    <section id="work" className="py-[120px] px-6 md:px-11" ref={container}>
      <div className="s-header flex justify-between items-center pb-5 border-b border-border mb-16 max-md:mb-10">
        <div>
          <p className="s-label text-[10px] tracking-[0.14em] uppercase text-muted mb-2">Selected Projects</p>
          <h2 className="s-title font-heading text-[clamp(52px,8vw,110px)] font-extrabold tracking-[-0.045em] leading-[0.88] max-md:text-[14vw]">
            <span className="tl overflow-hidden block">
              <span className="block translate-y-[110%]">Work</span>
            </span>
          </h2>
        </div>
      </div>

      <div className="projects flex flex-col gap-4">
        {featuredProjects.map((project, index) => (
          <Link 
            key={project.id} 
            to={`/work/${project.id}`}
            className="pcard group border border-border rounded-xl overflow-hidden transition-colors duration-400 hover:border-border-hover relative"
          >
            <div className="pcard-inner grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
              <div className="pcard-info p-7 md:p-11 flex flex-col justify-between gap-5 z-10 relative">
                <div className="pcard-top flex items-start gap-4">
                  <span className="pnum text-[10px] font-semibold tracking-[0.12em] text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="tags flex gap-1.5 flex-wrap">
                    {project.tags.map(tag => (
                      <span key={tag} className="tag text-[9px] tracking-[0.1em] uppercase px-[11px] py-1 border border-border rounded-full text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pcard-mid flex-1 flex flex-col justify-start gap-3.5 py-1">
                  <p className="pcompany text-[12px] tracking-[0.12em] uppercase text-muted mb-2">{project.company}</p>
                  <h3 className="pname font-sans text-[clamp(22px,2.8vw,40px)] font-extrabold tracking-[-0.03em] leading-[1.08] max-md:text-[7vw]">
                    {project.title}
                  </h3>
                  <p className="pyear text-[12px] text-muted mt-2.5">{project.year}</p>
                </div>
                <div className="pmetrics flex gap-8">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="pmetric flex flex-col gap-[3px]">
                      <span className="pm-val font-sans text-[30px] font-extrabold tracking-[-0.04em] text-muted group-hover:text-fg transition-colors duration-400">
                        {metric.val}
                      </span>
                      <span className="pm-label text-[11px] text-muted leading-[1.35] max-w-[130px]">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pcard-vis relative overflow-hidden max-md:h-[220px] max-md:-order-1">
                <div className={`pcard-bg absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-900 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105`}></div>
                
                <div className={`blob blob1 absolute rounded-full opacity-20 blur-0 transition-all duration-900 ease-out group-hover:opacity-40 group-hover:scale-110 group-hover:rotate-12 w-[320px] h-[320px] -top-[80px] -right-[60px] ${project.blob1}`}></div>
                <div className={`blob blob2 absolute rounded-full opacity-10 blur-0 transition-all duration-900 ease-out group-hover:opacity-30 group-hover:scale-110 group-hover:rotate-12 w-[200px] h-[200px] bottom-5 right-20 ${project.blob2}`}></div>
                
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="pcard-img absolute inset-0 w-full h-full object-cover object-center transition-transform duration-900 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105 z-10 mix-blend-overlay opacity-80"
                />
                <div className="pcard-img-overlay absolute inset-0 bg-gradient-to-b from-black/15 to-black/45 z-20"></div>
                
                <div className="p-arrow absolute bottom-6 right-6 w-11 h-11 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white group-hover:rotate-45 z-30" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-colors duration-300">
                    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="white" className="group-hover:stroke-black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
