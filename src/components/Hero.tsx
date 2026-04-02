import { ArrowRight, Circle, Square, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from('.hero-title', { y: 50, opacity: 0, duration: 1, delay: 0.2 })
      .from('.hero-desc', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
      .from('.hero-link-header', { opacity: 0, duration: 0.4 }, '-=0.4')
      .from('.hero-link', { x: -20, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.2')
      .from('.hero-social-header', { opacity: 0, duration: 0.4 }, '-=0.2')
      .from('.hero-social', { scale: 0.8, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(1.5)' }, '-=0.2');
  }, { scope: container });

  return (
    <section className="pt-48 pb-24 px-6" ref={container}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <h1 className="hero-title font-name text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-none mb-8">
              Dheeraj Kamble
            </h1>
            <div className="max-w-2xl">
              <p className="hero-desc text-2xl md:text-3xl text-neutral-700 mb-8 leading-relaxed">
                I build backend systems using Java and Spring Boot — REST APIs, microservices, event-driven architectures with Kafka, and JWT-secured distributed services.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="hero-link-header text-xs font-bold uppercase tracking-widest text-neutral-600 mb-6">Where you can start</div>
            <ul className="space-y-4">
              <li className="hero-link">
                <Link to="/#about" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-[1rem] border border-neutral-600 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-600 group-hover:text-neutral-100 transition-colors">
                    <Circle size={16} />
                  </div>
                  <span className="text-neutral-700 group-hover:text-neutral-800 transition-colors font-medium">Learn fun facts about me</span>
                </Link>
              </li>
              <li className="hero-link">
                <Link to="/#work" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-[1rem] border border-neutral-600 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-600 group-hover:text-neutral-100 transition-colors">
                    <Square size={16} />
                  </div>
                  <span className="text-neutral-700 group-hover:text-neutral-800 transition-colors font-medium">Browse my work history</span>
                </Link>
              </li>
              <li className="hero-link">
                <Link to="/work/event-pipeline" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-[1rem] border border-neutral-600 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-600 group-hover:text-neutral-100 transition-colors">
                    <ArrowRight size={16} />
                  </div>
                  <span className="text-neutral-700 group-hover:text-neutral-800 transition-colors font-medium">Read a system design case study</span>
                </Link>
              </li>
              <li className="hero-link">
                <Link to="/#blog" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-[1rem] border border-neutral-600 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-600 group-hover:text-neutral-100 transition-colors">
                    <FileText size={16} />
                  </div>
                  <span className="text-neutral-700 group-hover:text-neutral-800 transition-colors font-medium">Read a recent blog</span>
                </Link>
              </li>
              <li className="hero-link">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-[1rem] border border-neutral-600 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-600 group-hover:text-neutral-100 transition-colors">
                    <FileText size={16} />
                  </div>
                  <span className="text-neutral-700 group-hover:text-neutral-800 transition-colors font-medium">Download my Resume</span>
                </a>
              </li>
            </ul>

            <div className="mt-12">
              <div className="hero-social-header text-xs font-bold uppercase tracking-widest text-neutral-600 mb-6">Connect with me</div>
              <div className="flex gap-4">
                <a href="https://github.com/dheeraj080" target="_blank" rel="noopener noreferrer" className="hero-social w-12 h-12 rounded-full bg-neutral-800 text-neutral-100 flex items-center justify-center hover:bg-neutral-700 transition-colors" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/dheerajkamble" target="_blank" rel="noopener noreferrer" className="hero-social w-12 h-12 rounded-full bg-neutral-800 text-neutral-100 flex items-center justify-center hover:bg-neutral-700 transition-colors" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:kambledheerajkumar@gmail.com" className="hero-social w-12 h-12 rounded-full bg-neutral-800 text-neutral-100 flex items-center justify-center hover:bg-neutral-700 transition-colors" aria-label="Email">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
