import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const blogPosts = [
  {
    id: 'building-jwt-security-spring-boot',
    title: 'Building production-ready JWT security in Spring Boot',
    date: 'Mar 2026',
    excerpt: 'A walkthrough of Spring Security 6 configuration for a microservices gateway — stateless JWT validation, role-based access, Redis token blacklisting, and the vulnerabilities most tutorials skip.',
  },
  {
    id: 'kafka-microservices-patterns',
    title: 'Kafka patterns I use across my microservices',
    date: 'Feb 2026',
    excerpt: 'How I structure producers, consumers, and dead-letter topics across services — and why I stopped using @KafkaListener the naive way.',
  },
  {
    id: 'database-per-service-postgresql',
    title: 'Database-per-service with PostgreSQL in practice',
    date: 'Jan 2026',
    excerpt: 'The tradeoffs nobody talks about when you give every microservice its own PostgreSQL instance — schema management, cross-service queries, and keeping data consistent without distributed transactions.',
  },
  {
    id: 'timescaledb-financial-data',
    title: 'Why I chose TimescaleDB for real-time market data',
    date: 'Dec 2025',
    excerpt: 'Comparing PostgreSQL, InfluxDB, and TimescaleDB for storing tick-level stock and crypto data — and the hypertable design that made queries fast.',
  }
];

export default function Blogs() {
  const container = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.blogs-title .tl span', { y: 0 });
      gsap.set('.bcard', { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.to('.blogs-title .tl span', { y: 0, duration: 1.05, stagger: 0.08, delay: 0.2 })
      .from('.bcard', { y: 40, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.6');
  }, { scope: container });

  return (
    <main className="pt-[160px] pb-[120px] px-6 md:px-11 min-h-screen" ref={container}>
      <div className="s-header flex justify-between items-center pb-5 border-b border-border mb-16 max-md:mb-10">
        <div>
          <p className="s-label text-[10px] tracking-[0.14em] uppercase text-muted mb-2">All Articles</p>
          <h1 className="blogs-title font-heading text-[clamp(52px,8vw,110px)] font-extrabold tracking-[-0.045em] leading-[0.88] max-md:text-[14vw]">
            <span className="tl overflow-hidden block">
              <span className="block translate-y-[110%]">Engineering</span>
            </span>
            <span className="tl overflow-hidden block">
              <span className="block translate-y-[110%]">Blog</span>
            </span>
          </h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <Link key={post.id} to={`/blog/${post.id}`} className="bcard group flex flex-col gap-5 p-7 md:p-9 border border-border rounded-xl hover:border-fg transition-colors duration-300">
            <div className="flex justify-between items-start">
              <span className="text-[10px] tracking-[0.14em] uppercase text-muted">{post.date}</span>
              <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-fg group-hover:border-fg transition-all duration-300">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-colors duration-300">
                  <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" className="text-muted group-hover:text-bg" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-[24px] font-medium tracking-tight mb-3 group-hover:text-fg transition-colors duration-300">{post.title}</h2>
              <p className="text-[14px] text-muted leading-[1.6] font-light line-clamp-3">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
