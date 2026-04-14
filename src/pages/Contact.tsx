import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Skip scroll animations for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.contact-title .tl span', { y: 0 });
      gsap.set('.contact-link', { opacity: 1, y: 0 });
      return;
    }

    const titleSpans = document.querySelectorAll('.contact-title .tl span');
    if (titleSpans.length > 0) {
      gsap.to(titleSpans, {
        y: 0, duration: 1.05, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-title', start: 'top 88%' }
      });
    }

    gsap.from('.contact-link', {
      y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-links', start: 'top 85%' }
    });
  }, { scope: container });

  return (
    <section id="contact" className="py-[120px] px-6 md:px-11" ref={container}>
      <div className="s-header flex justify-between items-center pb-5 border-b border-border mb-16 max-md:mb-10">
        <div>
          <p className="s-label text-[10px] tracking-[0.14em] uppercase text-muted mb-2">Get in touch</p>
          <h2 className="contact-title font-heading text-[clamp(52px,8vw,110px)] font-extrabold tracking-[-0.045em] leading-[0.88] max-md:text-[14vw]">
            <span className="tl overflow-hidden block">
              <span className="block translate-y-[110%]">Contact</span>
            </span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <p className="text-[clamp(24px,3vw,36px)] leading-[1.3] font-medium tracking-tight mb-8">
            Let's build something robust together.
          </p>
          <p className="text-[16px] text-muted leading-[1.7] font-light max-w-[500px]">
            Whether you're looking to scale your infrastructure, design a new distributed system, or just want to talk about the latest in backend engineering, I'd love to hear from you.
          </p>
        </div>

        <div className="contact-links flex flex-col gap-6">
          <a 
            href="mailto:kambledheerajkumar@gmail.com" 
            className="contact-link group flex items-center justify-between p-6 border border-border rounded-xl hover:border-fg transition-colors duration-300"
            data-cursor="hi"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] tracking-[0.14em] uppercase text-muted">Email</span>
              <span className="text-[20px] font-medium tracking-tight group-hover:text-fg transition-colors duration-300">kambledheerajkumar@gmail.com</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-fg group-hover:border-fg transition-all duration-300">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-colors duration-300">
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" className="text-muted group-hover:text-bg" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </a>

          <a 
            href="https://linkedin.com/in/dheerajkamble" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-link group flex items-center justify-between p-6 border border-border rounded-xl hover:border-fg transition-colors duration-300"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] tracking-[0.14em] uppercase text-muted">LinkedIn</span>
              <span className="text-[20px] font-medium tracking-tight group-hover:text-fg transition-colors duration-300">dheerajkamble</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-fg group-hover:border-fg transition-all duration-300">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-colors duration-300">
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" className="text-muted group-hover:text-bg" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </a>

          <a 
            href="https://github.com/dheeraj080" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-link group flex items-center justify-between p-6 border border-border rounded-xl hover:border-fg transition-colors duration-300"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] tracking-[0.14em] uppercase text-muted">GitHub</span>
              <span className="text-[20px] font-medium tracking-tight group-hover:text-fg transition-colors duration-300">dheeraj080</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-fg group-hover:border-fg transition-all duration-300">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-colors duration-300">
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" className="text-muted group-hover:text-bg" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
