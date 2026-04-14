import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Skip scroll animations for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.bcard', { opacity: 1, y: 0 });
      return;
    }

    const titleSpans = document.querySelectorAll('.s-title-blog .tl span');
    if (titleSpans.length > 0) {
      gsap.to(titleSpans, {
        y: 0, duration: 1.05, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.s-title-blog', start: 'top 88%' }
      });
    }

    gsap.from('.bcard', {
      y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.blog-grid', start: 'top 85%' }
    });
  }, { scope: container });

  return (
    <section id="blog" className="py-[120px] px-6 md:px-11" ref={container}>
      <div className="s-header flex justify-between items-center pb-5 border-b border-border mb-16 max-md:mb-10">
        <div>
          <p className="s-label text-[10px] tracking-[0.14em] uppercase text-muted mb-2">Writing</p>
          <h2 className="s-title-blog font-heading text-[clamp(52px,8vw,110px)] font-extrabold tracking-[-0.045em] leading-[0.88] max-md:text-[14vw]">
            <span className="tl overflow-hidden block">
              <span className="block translate-y-[110%]">Blog</span>
            </span>
          </h2>
        </div>
        <Link to="/blog" className="hidden md:flex items-center gap-[7px] text-[11px] tracking-[0.09em] uppercase border border-border text-muted px-[14px] py-[7px] rounded-full hover:bg-fg hover:text-bg hover:border-fg transition-all duration-300">
          View all
        </Link>
      </div>

      <div className="blog-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/blog/building-jwt-security-spring-boot" className="bcard group flex flex-col gap-5 p-7 md:p-9 border border-border rounded-xl hover:border-fg transition-colors duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[10px] tracking-[0.14em] uppercase text-muted">Mar 2026</span>
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-fg group-hover:border-fg transition-all duration-300">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-colors duration-300">
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" className="text-muted group-hover:text-bg" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-[24px] font-medium tracking-tight mb-3 group-hover:text-fg transition-colors duration-300">Building production-ready JWT security in Spring Boot</h3>
            <p className="text-[14px] text-muted leading-[1.6] font-light line-clamp-3">Most tutorials show you how to generate a JWT and validate its signature. They rarely show you how to handle token revocation, algorithm confusion attacks, or how to structure your security filter chain in a microservices environment.</p>
          </div>
        </Link>

        <Link to="/blog/kafka-microservices-patterns" className="bcard group flex flex-col gap-5 p-7 md:p-9 border border-border rounded-xl hover:border-fg transition-colors duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[10px] tracking-[0.14em] uppercase text-muted">Feb 2026</span>
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-fg group-hover:border-fg transition-all duration-300">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-colors duration-300">
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" className="text-muted group-hover:text-bg" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-[24px] font-medium tracking-tight mb-3 group-hover:text-fg transition-colors duration-300">Kafka patterns I use across my microservices</h3>
            <p className="text-[14px] text-muted leading-[1.6] font-light line-clamp-3">Event-driven architecture is powerful but complex. Here are the practical Kafka patterns I use to ensure reliable message delivery, handle failures, and maintain data consistency across services.</p>
          </div>
        </Link>
      </div>
      
      <div className="mt-8 flex justify-center md:hidden">
        <Link to="/blog" className="flex items-center gap-[7px] text-[11px] tracking-[0.09em] uppercase border border-border text-muted px-[14px] py-[7px] rounded-full hover:bg-fg hover:text-bg hover:border-fg transition-all duration-300">
          View all articles
        </Link>
      </div>
    </section>
  );
}
