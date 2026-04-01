import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export default function BlogArticle() {
  const { id } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <main className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors mb-12 group">
          <div className="w-8 h-8 rounded-[0.75rem] bg-neutral-200 group-hover:bg-neutral-400 flex items-center justify-center transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="text-sm font-medium uppercase tracking-wider">Back to Home</span>
        </Link>
        
        <div className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-6">Oct 12, 2025</div>
        <h1 className="font-name text-5xl md:text-6xl tracking-tighter leading-tight mb-12 capitalize">
          {id?.replace(/-/g, ' ')}
        </h1>
        
        <div className="prose prose-lg prose-neutral max-w-none">
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
