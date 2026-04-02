import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from('.article-back', { x: -20, opacity: 0, duration: 0.6, delay: 0.2 })
      .from('.article-date', { opacity: 0, duration: 0.4 }, '-=0.2')
      .from('.article-title', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
      .from('.article-content > *', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.4');
  }, { scope: container, dependencies: [id] });

  return (
    <main className="pt-32 pb-24 px-6 min-h-screen" ref={container}>
      <div className="container mx-auto max-w-3xl">
        <Link to="/" className="article-back inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors mb-12 group">
          <div className="w-8 h-8 rounded-[0.75rem] bg-neutral-200 group-hover:bg-neutral-400 flex items-center justify-center transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="text-sm font-medium uppercase tracking-wider">Back to Home</span>
        </Link>
        
        <div className="article-date text-xs font-bold uppercase tracking-widest text-neutral-600 mb-6">Mar 2026</div>
        <h1 className="article-title font-name text-5xl md:text-6xl tracking-tighter leading-tight mb-12 capitalize">
          {id?.replace(/-/g, ' ')}
        </h1>
        
        <div className="article-content prose prose-lg prose-neutral max-w-none">
          <p className="text-xl text-neutral-700 leading-relaxed mb-8">
            Most tutorials show you how to generate a JWT and validate its signature. They rarely show you how to handle token revocation, algorithm confusion attacks, or how to structure your security filter chain in a microservices environment.
          </p>
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            In this post, I walk through the exact Spring Security 6 configuration I use for API gateways, including stateless validation, Redis-backed blacklisting, and role-based access control.
          </p>
          <h2 className="text-3xl mt-12 mb-6">1. The Stateless Gateway Pattern</h2>
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            When building a microservices architecture, the API gateway should be the only component that knows how to validate a JWT signature. Downstream services should trust the gateway and rely on propagated headers.
          </p>
          <h2 className="text-3xl mt-12 mb-6">2. Token Revocation with Redis</h2>
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            JWTs are stateless, which means you can't invalidate them simply by deleting a session. We use Redis to store a blacklist of revoked token IDs (JTI claim) with a TTL matching the token's expiration time.
          </p>
        </div>
      </div>
    </main>
  );
}
