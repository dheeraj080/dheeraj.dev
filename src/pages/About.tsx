import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Skip scroll animations for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.about-text p', { opacity: 1, y: 0 });
      return;
    }

    const titleSpans = document.querySelectorAll('.s-title-about .tl span');
    if (titleSpans.length > 0) {
      gsap.to(titleSpans, {
        y: 0, duration: 1.05, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.s-title-about', start: 'top 88%' }
      });
    }

    gsap.from('.about-text p', {
      y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: '.about-text', start: 'top 85%' }
    });

    gsap.from('.about-image', {
      y: 50, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-image', start: 'top 85%' }
    });
  }, { scope: container });

  return (
    <section id="about" className="py-[120px] px-6 md:px-11" ref={container}>
      <div className="s-header flex justify-between items-center pb-5 border-b border-border mb-16 max-md:mb-10">
        <div>
          <p className="s-label text-[10px] tracking-[0.14em] uppercase text-muted mb-2">The Person</p>
          <h2 className="s-title-about font-heading text-[clamp(52px,8vw,110px)] font-extrabold tracking-[-0.045em] leading-[0.88] max-md:text-[14vw]">
            <span className="tl overflow-hidden block">
              <span className="block translate-y-[110%]">About</span>
            </span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-5 about-image">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent z-10 mix-blend-overlay"></div>
            <img 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop" 
              alt="Full Stack Engineering" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center about-text">
          <p className="text-[clamp(24px,3vw,36px)] leading-[1.3] font-medium tracking-tight mb-8">
            I'm a full-stack engineer who builds production-grade systems from the database to the user interface.
          </p>
          <div className="space-y-6 text-[16px] text-muted leading-[1.7] font-light max-w-[600px]">
            <p>
              My focus is on creating seamless user experiences with React and TypeScript, backed by robust microservices architectures in Java and Spring Boot.
            </p>
            <p>
              I've built an AI-powered personal finance tracker featuring a responsive React frontend and a full microservices backend — API gateway, Eureka service registry, Kafka-based event streaming, per-service PostgreSQL databases, Redis caching, and centralized JWT authentication.
            </p>
            <p>
              I'm currently building a real-time stock and crypto data platform with multi-provider ingestion, Kafka pipelines, and TimescaleDB. When I'm not building, I'm reading about system design, frontend architecture, and how large-scale data platforms are architected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
