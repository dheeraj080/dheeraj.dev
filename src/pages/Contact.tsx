import { useEffect } from 'react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-name text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-none mb-8">
          Let's Connect
        </h1>
        <p className="text-xl text-neutral-700 max-w-2xl leading-relaxed mb-16">
          Whether you're looking to scale your infrastructure, design a new distributed system, or just want to talk about the latest in backend engineering, I'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl mb-8">Reach Out</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-bold uppercase tracking-widest text-neutral-600 mb-2">Name</label>
                <input type="text" id="name" className="w-full bg-neutral-200 border border-neutral-400 rounded-[1rem] px-4 py-3 focus:outline-none focus:border-neutral-600 transition-colors" placeholder="Jane Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold uppercase tracking-widest text-neutral-600 mb-2">Email</label>
                <input type="email" id="email" className="w-full bg-neutral-200 border border-neutral-400 rounded-[1rem] px-4 py-3 focus:outline-none focus:border-neutral-600 transition-colors" placeholder="jane@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold uppercase tracking-widest text-neutral-600 mb-2">Message</label>
                <textarea id="message" rows={5} className="w-full bg-neutral-200 border border-neutral-400 rounded-[1rem] px-4 py-3 focus:outline-none focus:border-neutral-600 transition-colors" placeholder="Tell me about your project..."></textarea>
              </div>
              <button type="submit" className="bg-neutral-800 text-neutral-100 px-8 py-4 rounded-[1.5rem] font-medium uppercase tracking-wider text-sm hover:bg-neutral-700 transition-colors w-full md:w-auto">
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-3xl mb-8">Socials & Links</h2>
            <div className="space-y-6">
              <a href="#" className="flex items-center gap-4 text-neutral-700 hover:text-neutral-900 transition-colors group">
                <div className="w-12 h-12 rounded-[1rem] border border-neutral-400 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                  <Mail size={20} />
                </div>
                <span className="text-lg font-medium">hello@dheerajkamble.dev</span>
              </a>
              <a href="#" className="flex items-center gap-4 text-neutral-700 hover:text-neutral-900 transition-colors group">
                <div className="w-12 h-12 rounded-[1rem] border border-neutral-400 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                  <Github size={20} />
                </div>
                <span className="text-lg font-medium">github.com/dheerajkamble</span>
              </a>
              <a href="#" className="flex items-center gap-4 text-neutral-700 hover:text-neutral-900 transition-colors group">
                <div className="w-12 h-12 rounded-[1rem] border border-neutral-400 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                  <Linkedin size={20} />
                </div>
                <span className="text-lg font-medium">linkedin.com/in/dheerajkamble</span>
              </a>
              <a href="#" className="flex items-center gap-4 text-neutral-700 hover:text-neutral-900 transition-colors group">
                <div className="w-12 h-12 rounded-[1rem] border border-neutral-400 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                  <Twitter size={20} />
                </div>
                <span className="text-lg font-medium">@dheerajkamble</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
