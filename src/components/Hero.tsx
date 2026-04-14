import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from('.hero-title .tl span', { y: '110%', duration: 1.05, stagger: 0.1, delay: 0.05 })
      .from('.hero-eyebrow span', { y: '110%', duration: 0.75 }, '-=0.8')
      .from('.hero-desc', { opacity: 0, y: 16, duration: 0.75 }, '-=0.6')
      .from('.pill', { x: 32, opacity: 0, duration: 0.55, stagger: 0.1 }, '-=0.5')
      .from('.scroll-hint', { opacity: 0, duration: 0.6 }, '-=0.2');
  }, { scope: container });

  return (
    <section id="hero" ref={container} className="min-h-[100svh] flex flex-col justify-end px-6 md:px-11 pb-[max(56px,calc(56px+env(safe-area-inset-bottom)))] relative">
      <p className="hero-eyebrow text-[11px] tracking-[0.14em] uppercase text-muted mb-5 overflow-hidden">
        <span className="inline-block">Senior Full Stack Developer</span>
      </p>

      <h1 className="hero-title font-heading text-[clamp(72px,12vw,176px)] font-extrabold leading-[0.88] tracking-[-0.05em] mb-12 max-md:text-[15vw] max-md:hyphens-manual max-md:break-words">
        <span className="tl overflow-hidden block"><span className="block">Dheeraj</span></span>
        <span className="tl overflow-hidden block"><span className="block">Kamble</span></span>
      </h1>

      <div className="hero-bottom flex justify-between items-end gap-8 max-md:flex-col max-md:items-start">
        <p className="hero-desc max-w-[360px] text-[15px] leading-[1.65] text-muted font-light">
          <span>Backend-focused, frontend-capable. Building robust systems with Java, Spring Boot, React, and modern cloud infrastructure.</span>
        </p>
        <div className="hero-right flex flex-col items-end gap-2.5 max-md:items-start">
          <div className="pill available inline-flex items-center gap-[7px] text-[11px] tracking-[0.09em] uppercase border border-[rgba(0,220,100,0.28)] text-[rgba(0,220,100,0.85)] dark:border-[rgba(0,110,45,0.35)] dark:text-[#006E2D] px-[14px] py-[7px] rounded-full">
            <span className="pill-dot w-1.5 h-1.5 rounded-full bg-current animate-blink shrink-0"></span>
            Available for work
          </div>
          <div className="pill inline-flex items-center gap-[7px] text-[11px] tracking-[0.09em] uppercase border border-border text-muted px-[14px] py-[7px] rounded-full">
            India
          </div>
          <div className="pill inline-flex items-center gap-[7px] text-[11px] tracking-[0.09em] uppercase border border-border text-muted px-[14px] py-[7px] rounded-full">
            Full Stack Engineer
          </div>
        </div>
      </div>

      <div className="scroll-hint absolute top-[110px] right-11 flex flex-col items-center gap-2.5 max-md:top-auto max-md:bottom-14 max-md:right-6" aria-hidden="true">
        <div className="sh-line w-px h-16 bg-border relative overflow-hidden animate-shline"></div>
        <span className="text-[9px] tracking-[0.18em] uppercase text-muted" style={{ writingMode: 'vertical-lr' }}>Scroll</span>
      </div>
    </section>
  );
}
