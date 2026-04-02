import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Project() {
  const { id } = useParams();
  const container = useRef<HTMLElement>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from('.project-back', { x: -20, opacity: 0, duration: 0.6, delay: 0.2 })
      .from('.project-title', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
      .from('.project-image', { scale: 0.95, opacity: 0, duration: 0.8 }, '-=0.4')
      .from('.project-sidebar > div', { x: -20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
      .from('.project-content section', { y: 30, opacity: 0, duration: 0.8, stagger: 0.15 }, '-=0.6');
  }, { scope: container, dependencies: [id] });

  return (
    <main className="pt-32 pb-24 px-6 min-h-screen" ref={container}>
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="project-back inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors mb-12 group">
          <div className="w-8 h-8 rounded-[0.75rem] bg-neutral-200 group-hover:bg-neutral-400 flex items-center justify-center transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="text-sm font-medium uppercase tracking-wider">Back to Home</span>
        </Link>
        
        <h1 className="project-title font-name text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-none mb-8 capitalize">
          {id?.replace(/-/g, ' ')}
        </h1>
        
        <div className="project-image aspect-video w-full bg-neutral-400 rounded-[2.5rem] mb-12 overflow-hidden shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop" 
            alt={id} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="project-sidebar md:col-span-4 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-4">Services</div>
              <ul className="space-y-2">
                <li className="text-neutral-700">System Architecture</li>
                <li className="text-neutral-700">API Development</li>
                <li className="text-neutral-700">Infrastructure as Code</li>
              </ul>
            </div>
            
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-4">Links</div>
              <div className="space-y-4">
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-neutral-700 hover:text-neutral-900 transition-colors group">
                  <div className="w-10 h-10 rounded-[1rem] border border-neutral-400 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                    <ExternalLink size={18} />
                  </div>
                  <span className="font-medium">Live Demo</span>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-neutral-700 hover:text-neutral-900 transition-colors group">
                  <div className="w-10 h-10 rounded-[1rem] border border-neutral-400 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                    <Github size={18} />
                  </div>
                  <span className="font-medium">Source Code</span>
                </a>
              </div>
            </div>
          </div>
          <div className="project-content md:col-span-8 space-y-12">
            <section>
              <h2 className="text-3xl mb-6">The What & Why</h2>
              <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                This is a detailed case study for {id?.replace(/-/g, ' ')}. We approached this project with a focus on creating a highly available, fault-tolerant system capable of handling massive spikes in traffic without degrading performance.
              </p>
              <p className="text-lg text-neutral-700 leading-relaxed">
                The architecture combines distributed caching, asynchronous event processing, and a robust microservices design. The result is a resilient backend infrastructure that reduced latency by 40% and significantly lowered operational costs.
              </p>
            </section>

            <section>
              <h2 className="text-3xl mb-6">My Specific Contribution</h2>
              <p className="text-lg text-neutral-700 leading-relaxed">
                As the lead backend engineer on this project, I was responsible for architecting the core microservices and establishing the event-driven communication patterns. I directly implemented the primary payment processing service in Go, set up the Kafka clusters, and wrote the Terraform scripts to provision our Kubernetes environments.
              </p>
            </section>

            <section>
              <h2 className="text-3xl mb-6">The Process & Technical Challenges</h2>
              <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                One of the most significant challenges we faced was ensuring idempotency across distributed transactions. When a network partition occurred, retries could lead to duplicate processing, which is catastrophic in a financial system.
              </p>
              <p className="text-lg text-neutral-700 leading-relaxed">
                <strong>The Solution:</strong> I implemented a robust idempotency key pattern using Redis. Before processing any transaction, the system checks Redis for the unique idempotency key. If it exists and is marked as completed, we return the cached response. If it's in progress, we wait. This, combined with database-level unique constraints, ensured exactly-once processing semantics even during severe network degradation.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
