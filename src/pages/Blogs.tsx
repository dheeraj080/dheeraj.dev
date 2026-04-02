import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from('.blogs-title', { y: 50, opacity: 0, duration: 0.8, delay: 0.2 })
      .from('.blog-post-card', { y: 30, opacity: 0, duration: 0.6, stagger: 0.15 }, '-=0.4');
  }, { scope: container });

  return (
    <main className="pt-32 pb-24 px-6 min-h-screen" ref={container}>
      <div className="container mx-auto max-w-4xl">
        <h1 className="blogs-title font-name text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-none mb-12">
          Engineering Blog
        </h1>
        
        <div className="space-y-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-post-card group border-b border-neutral-400 pb-12">
              <div className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-4">{post.date}</div>
              <h2 className="text-3xl md:text-4xl mb-4 group-hover:text-neutral-500 transition-colors">
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
              </h2>
              <p className="text-lg text-neutral-700 leading-relaxed mb-6 max-w-3xl">
                {post.excerpt}
              </p>
              <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-4 px-6 py-3 rounded-[1.5rem] border border-neutral-400 hover:bg-neutral-100 hover:border-neutral-600 transition-colors">
                <span className="font-medium uppercase tracking-wider text-sm text-neutral-700">Read Article</span>
                <div className="w-8 h-8 rounded-[0.75rem] bg-neutral-200 flex items-center justify-center transition-colors">
                  <ArrowRight size={16} />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
