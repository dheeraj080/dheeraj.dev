import { FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  return (
    <section id="blog" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-4xl m-0">Blog</h2>
              <div className="w-8 h-8 rounded-[0.75rem] border border-neutral-600 flex items-center justify-center text-neutral-600">
                <FileText size={16} />
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-4">In my drafts</div>
              <ul className="space-y-4 border-y border-neutral-400 py-6">
                <li>
                  <Link to="/blog/idempotency-in-distributed-systems" className="flex items-center gap-4 text-neutral-600 hover:text-neutral-800 cursor-pointer transition-colors">
                    <FileText size={16} />
                    <span className="text-sm font-medium">Idempotency in distributed systems</span>
                  </Link>
                </li>
                <li>
                  <Link to="/blog/optimizing-postgres-query-performance" className="flex items-center gap-4 text-neutral-600 hover:text-neutral-800 cursor-pointer transition-colors">
                    <FileText size={16} />
                    <span className="text-sm font-medium">Optimizing Postgres query performance</span>
                  </Link>
                </li>
                <li>
                  <Link to="/blog/grpc-vs-rest-a-benchmark" className="flex items-center gap-4 text-neutral-600 hover:text-neutral-800 cursor-pointer transition-colors">
                    <FileText size={16} />
                    <span className="text-sm font-medium">gRPC vs REST: A Benchmark</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1"></div>
          
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-6">
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
