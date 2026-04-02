import { ArrowRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const featuredProjects = [
  {
    id: 'ai-finance-tracker',
    title: 'AI Finance Tracker',
    description: 'A microservices-based personal finance platform with an API gateway (Spring Cloud Gateway), Eureka service registry, Kafka event streaming between services, per-service PostgreSQL databases, Redis caching, and centralized JWT authentication. Built with Java 25 and Spring Boot 4.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop',
    githubLink: 'https://github.com/dheeraj080',
    liveLink: null,
  },
  {
    id: 'stock-data-platform',
    title: 'Stock Data Platform',
    description: 'A real-time market data platform with multi-provider ingestion (Alpha Vantage, Polygon.io, Binance, CoinGecko), Kafka-based processing pipelines, TimescaleDB for time-series storage, and Redis for live quote caching. Designed for high-throughput financial data workloads.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1600&auto=format&fit=crop',
    githubLink: 'https://github.com/dheeraj080',
    liveLink: null,
  },
  {
    id: 'jwt-auth-service',
    title: 'JWT Auth Service',
    description: 'A production-hardened Spring Security 6 authentication service with stateless JWT validation at the API gateway, role-based access control, token blacklisting via Redis, and protection against common vulnerabilities including algorithm confusion and token replay attacks.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop',
    githubLink: 'https://github.com/dheeraj080',
    liveLink: null,
  }
];

export default function FeaturedWork() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const projects = gsap.utils.toArray('.featured-project');
    
    projects.forEach((project: any) => {
      gsap.from(project, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: project,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, { scope: container });

  return (
    <section id="work" className="py-24 px-6" ref={container}>
      <div className="container mx-auto max-w-9xl">
        <div className="flex items-center gap-6 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-600 whitespace-nowrap">Featured Work</span>
          <div className="h-px bg-neutral-400 flex-grow"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-600 whitespace-nowrap">Curated projects</span>
        </div>

        <div className="space-y-24">
          {featuredProjects.map((project, index) => (
            <div key={project.id} className="featured-project bg-gradient-to-b from-neutral-600 to-neutral-800 text-neutral-100 rounded-[2.5rem] p-4 md:p-6 shadow-xl">
              <div className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 min-h-fit lg:min-h-[85vh]`}>
                <div className="flex flex-col justify-between w-full lg:w-1/3 p-4 md:p-8">
                  <div>
                    <h2 className="text-5xl md:text-6xl mb-8 text-neutral-100">{project.title}</h2>
                    <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">System Design</div>
                    <p className="text-lg text-neutral-200 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="mt-12 flex flex-wrap items-center gap-4">
                    <Link to={`/work/${project.id}`} className="inline-flex items-center gap-4 px-6 py-3 rounded-[1.5rem] border border-neutral-400 hover:bg-neutral-100 hover:text-neutral-800 transition-colors group">
                      <span className="font-medium uppercase tracking-wider text-sm">Read Case Study</span>
                      <div className="w-8 h-8 rounded-[0.75rem] bg-neutral-500 group-hover:bg-neutral-200 flex items-center justify-center transition-colors">
                        <ArrowRight size={16} />
                      </div>
                    </Link>
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-3 rounded-[1.5rem] bg-neutral-100 text-neutral-800 hover:bg-neutral-300 transition-colors group">
                        <span className="font-medium uppercase tracking-wider text-sm">GitHub</span>
                        <div className="w-8 h-8 rounded-[0.75rem] bg-neutral-300 group-hover:bg-neutral-400 flex items-center justify-center transition-colors">
                          <Github size={16} />
                        </div>
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="w-full lg:w-2/3 rounded-[2rem] overflow-hidden relative aspect-[4/3] lg:aspect-auto">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
