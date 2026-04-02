import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const blogPosts = [
  {
    id: 'scaling-event-driven-architecture',
    title: 'Scaling our event-driven architecture to 1 million events per minute',
    date: 'Oct 12, 2025',
    excerpt: 'When our user base doubled over a single weekend, our existing RabbitMQ setup began to show its limits. This is the story of how we migrated to Apache Kafka.',
  },
  {
    id: 'idempotency-in-distributed-systems',
    title: 'Idempotency in distributed systems',
    date: 'Sep 05, 2025',
    excerpt: 'Why idempotency is crucial for reliable APIs and how to implement it effectively using caching layers and database constraints.',
  },
  {
    id: 'optimizing-postgres-query-performance',
    title: 'Optimizing Postgres query performance',
    date: 'Jul 22, 2025',
    excerpt: 'A deep dive into EXPLAIN ANALYZE, index types, and how we reduced our p99 latency by 60% with a few schema tweaks.',
  },
  {
    id: 'grpc-vs-rest-a-benchmark',
    title: 'gRPC vs REST: A Benchmark',
    date: 'May 14, 2025',
    excerpt: 'Comparing the performance, payload size, and developer experience of gRPC and REST in a microservices environment.',
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
