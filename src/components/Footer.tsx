import { Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-neutral-300 to-neutral-100 pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <Link to="/" className="text-2xl font-name text-neutral-800 hover:text-neutral-600 transition-colors">
            Dheeraj Kamble
          </Link>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <Link to="/work" className="text-sm font-medium text-neutral-600 hover:text-neutral-800 uppercase tracking-wider">Work</Link>
            <Link to="/about" className="text-sm font-medium text-neutral-600 hover:text-neutral-800 uppercase tracking-wider">About</Link>
            <Link to="/blog" className="text-sm font-medium text-neutral-600 hover:text-neutral-800 uppercase tracking-wider">Blog</Link>
            <Link to="/contact" className="text-sm font-medium text-neutral-600 hover:text-neutral-800 uppercase tracking-wider">Contact</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-[1.5rem] border border-neutral-400 flex items-center justify-center text-neutral-600 hover:bg-neutral-400 hover:text-neutral-800 transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-[1.5rem] border border-neutral-400 flex items-center justify-center text-neutral-600 hover:bg-neutral-400 hover:text-neutral-800 transition-colors">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
