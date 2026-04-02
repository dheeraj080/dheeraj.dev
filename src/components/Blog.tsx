import { FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.blog-header', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.from('.blog-draft-item', {
      x: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.blog-draft-list',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.from('.blog-featured', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.blog-featured',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  }, { scope: container });

  return (
    <section id="blog" className="py-24 px-6" ref={container}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <div className="blog-header flex items-center gap-4 mb-12">
              <h2 className="text-4xl m-0">Blog</h2>
              <div className="w-8 h-8 rounded-[0.75rem] border border-neutral-600 flex items-center justify-center text-neutral-600">
                <FileText size={16} />
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="blog-header text-xs font-bold uppercase tracking-widest text-neutral-600 mb-4">In my drafts</div>
              <ul className="blog-draft-list space-y-4 border-y border-neutral-400 py-6 mb-6">
                <li className="blog-draft-item">
                  <Link to="/blog/idempotency-in-distributed-systems" className="flex items-center gap-4 text-neutral-600 hover:text-neutral-800 cursor-pointer transition-colors">
                    <FileText size={16} />
                    <span className="text-sm font-medium">Idempotency in distributed systems</span>
                  </Link>
                </li>
                <li className="blog-draft-item">
                  <Link to="/blog/optimizing-postgres-query-performance" className="flex items-center gap-4 text-neutral-600 hover:text-neutral-800 cursor-pointer transition-colors">
                    <FileText size={16} />
                    <span className="text-sm font-medium">Optimizing Postgres query performance</span>
                  </Link>
                </li>
                <li className="blog-draft-item">
                  <Link to="/blog/grpc-vs-rest-a-benchmark" className="flex items-center gap-4 text-neutral-600 hover:text-neutral-800 cursor-pointer transition-colors">
                    <FileText size={16} />
                    <span className="text-sm font-medium">gRPC vs REST: A Benchmark</span>
                  </Link>
                </li>
              </ul>
              <Link to="/blog" className="blog-header inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-600 hover:text-neutral-800 transition-colors">
                View all articles <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-1"></div>
          
          <div className="lg:col-span-8">
            <div className="blog-featured flex flex-col gap-6">
              <div>
                <h3 className="text-3xl mb-2">Scaling our event-driven architecture to 1 million events per minute</h3>
                <div className="text-xs font-bold uppercase tracking-widest text-neutral-600">Oct 12, 2025</div>
              </div>
              <div className="text-lg text-neutral-700 leading-relaxed max-w-2xl space-y-4">
                <p>When our user base doubled over a single weekend, our existing RabbitMQ setup began to show its limits. Message queues backed up, and our worker nodes couldn't keep pace with the ingestion rate.</p>
                <p>This is the story of how we migrated to Apache Kafka, redesigned our consumer groups, and implemented a robust dead-letter queue strategy to handle massive scale without dropping a single event.</p>
              </div>
              <div className="pt-4">
                <Link to="/blog/scaling-event-driven-architecture" className="inline-flex items-center gap-4 px-6 py-3 rounded-[1.5rem] border border-neutral-400 hover:bg-neutral-100 hover:border-neutral-600 transition-colors group">
                  <span className="font-medium uppercase tracking-wider text-sm text-neutral-700">Keep Reading</span>
                  <div className="w-8 h-8 rounded-[0.75rem] bg-neutral-200 group-hover:bg-neutral-300 flex items-center justify-center transition-colors">
                    <ArrowRight size={16} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
