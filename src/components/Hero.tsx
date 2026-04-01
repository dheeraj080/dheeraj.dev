import { ArrowRight, Circle, Square, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="pt-48 pb-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-name text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-none mb-8">
              Dheeraj Kamble
            </h1>
            <div className="max-w-2xl">
              <p className="text-2xl md:text-3xl text-neutral-700 mb-8 leading-relaxed">
                I specialize in designing scalable backend systems, distributed architectures, and high-performance APIs that power modern applications.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-6">Where you can start</div>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-[1rem] border border-neutral-600 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-600 group-hover:text-neutral-100 transition-colors">
                    <Circle size={16} />
                  </div>
                  <span className="text-neutral-700 group-hover:text-neutral-800 transition-colors font-medium">Learn fun facts about me</span>
                </Link>
              </li>
              <li>
                <Link to="/work" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-[1rem] border border-neutral-600 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-600 group-hover:text-neutral-100 transition-colors">
                    <Square size={16} />
                  </div>
                  <span className="text-neutral-700 group-hover:text-neutral-800 transition-colors font-medium">Browse my work history</span>
                </Link>
              </li>
              <li>
                <Link to="/work" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-[1rem] border border-neutral-600 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-600 group-hover:text-neutral-100 transition-colors">
                    <ArrowRight size={16} />
                  </div>
                  <span className="text-neutral-700 group-hover:text-neutral-800 transition-colors font-medium">Read a system design case study</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-[1rem] border border-neutral-600 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-600 group-hover:text-neutral-100 transition-colors">
                    <FileText size={16} />
                  </div>
                  <span className="text-neutral-700 group-hover:text-neutral-800 transition-colors font-medium">Read a recent blog</span>
                </Link>
              </li>
              <li>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-[1rem] border border-neutral-600 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-600 group-hover:text-neutral-100 transition-colors">
                    <FileText size={16} />
                  </div>
                  <span className="text-neutral-700 group-hover:text-neutral-800 transition-colors font-medium">Download my Resume</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
