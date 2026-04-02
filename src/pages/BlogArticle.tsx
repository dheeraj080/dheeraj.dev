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
        
        <div className="article-date text-xs font-bold uppercase tracking-widest text-neutral-600 mb-6">Oct 12, 2025</div>
        <h1 className="article-title font-name text-5xl md:text-6xl tracking-tighter leading-tight mb-12 capitalize">
          {id?.replace(/-/g, ' ')}
        </h1>
        
        <div className="article-content prose prose-lg prose-neutral max-w-none">
          <p className="text-xl text-neutral-700 leading-relaxed mb-8">
            When our user base doubled over a single weekend, our existing RabbitMQ setup began to show its limits. Message queues backed up, and our worker nodes couldn't keep pace with the ingestion rate.
          </p>
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            This is the story of how we migrated to Apache Kafka, redesigned our consumer groups, and implemented a robust dead-letter queue strategy to handle massive scale without dropping a single event.
          </p>
          <h2 className="text-3xl mt-12 mb-6">1. Identifying the Bottleneck</h2>
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            Before writing any code, we needed to understand exactly where the system was failing. By instrumenting our message brokers with Prometheus and Grafana, we discovered that disk I/O on the RabbitMQ nodes was maxing out during peak traffic hours.
          </p>
          <h2 className="text-3xl mt-12 mb-6">2. The Migration Strategy</h2>
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            We couldn't afford downtime. We implemented a dual-write strategy where the API gateway published events to both RabbitMQ and Kafka simultaneously. Once we verified the Kafka consumers were processing events correctly, we slowly drained the old queues.
          </p>
        </div>
      </div>
    </main>
  );
}
