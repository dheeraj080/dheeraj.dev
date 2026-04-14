import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function BlogArticle() {
  const { id } = useParams();
  const container = useRef<HTMLElement>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.article-title .tl span', { y: 0 });
      gsap.set('.article-content > *', { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.to('.article-title .tl span', { y: 0, duration: 1.05, stagger: 0.08, delay: 0.2 })
      .from('.article-meta', { opacity: 0, duration: 0.6 }, '-=0.6')
      .from('.article-content > *', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.4');
  }, { scope: container, dependencies: [id] });

  return (
    <main className="pt-[160px] pb-[120px] px-6 md:px-11 min-h-screen" ref={container}>
      <div className="max-w-[800px] mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-[7px] text-[11px] tracking-[0.09em] uppercase border border-border text-muted px-[14px] py-[7px] rounded-full hover:bg-fg hover:text-bg hover:border-fg transition-all duration-300 mb-12">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="rotate-180">
            <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          Back to Blog
        </Link>
        
        <div className="article-meta text-[10px] tracking-[0.14em] uppercase text-muted mb-6">Mar 2026</div>
        <h1 className="article-title font-heading text-[clamp(40px,6vw,80px)] font-extrabold tracking-[-0.045em] leading-[0.95] mb-16 capitalize">
          <span className="tl overflow-hidden block">
            <span className="block translate-y-[110%]">{id?.replace(/-/g, ' ')}</span>
          </span>
        </h1>
        
        <div className="article-content prose prose-lg prose-invert max-w-none">
          <p className="text-[20px] text-fg leading-[1.6] font-light mb-8">
            Most tutorials show you how to generate a JWT and validate its signature. They rarely show you how to handle token revocation, algorithm confusion attacks, or how to structure your security filter chain in a microservices environment.
          </p>
          <p className="text-[16px] text-muted leading-[1.7] font-light mb-12">
            In this post, I walk through the exact Spring Security 6 configuration I use for API gateways, including stateless validation, Redis-backed blacklisting, and role-based access control.
          </p>
          
          <h2 className="text-[32px] font-medium tracking-tight mt-16 mb-6 text-fg">1. The Stateless Gateway Pattern</h2>
          <p className="text-[16px] text-muted leading-[1.7] font-light mb-8">
            When building a microservices architecture, the API gateway should be the only component that knows how to validate a JWT signature. Downstream services should trust the gateway and rely on propagated headers.
          </p>
          
          <h2 className="text-[32px] font-medium tracking-tight mt-16 mb-6 text-fg">2. Token Revocation with Redis</h2>
          <p className="text-[16px] text-muted leading-[1.7] font-light mb-8">
            JWTs are stateless, which means you can't invalidate them simply by deleting a session. We use Redis to store a blacklist of revoked token IDs (JTI claim) with a TTL matching the token's expiration time.
          </p>
        </div>
      </div>
    </main>
  );
}
