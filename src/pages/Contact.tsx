import { useRef } from 'react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ 
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
    
    tl.from('.contact-title', { y: 50, opacity: 0, duration: 0.8 })
      .from('.contact-desc', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.contact-form-section', { x: -30, opacity: 0, duration: 0.8 }, '-=0.4')
      .from('.contact-social-section', { x: 30, opacity: 0, duration: 0.8 }, '-=0.8')
      .from('.contact-social-link', { y: 20, opacity: 0, duration: 0.4, stagger: 0.1 }, '-=0.4');
  }, { scope: container });

  return (
    <section id="contact" className="py-24 px-6" ref={container}>
      <div className="container mx-auto max-w-4xl">
        <h1 className="contact-title font-name text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-none mb-8">
          Let's Connect
        </h1>
        <p className="contact-desc text-xl text-neutral-700 max-w-2xl leading-relaxed mb-16">
          Whether you're looking to scale your infrastructure, design a new distributed system, or just want to talk about the latest in backend engineering, I'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="contact-form-section">
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

          <div className="contact-social-section">
            <h2 className="text-3xl mb-8">Socials & Links</h2>
            <div className="space-y-6">
              <a href="mailto:ryancooperblue@gmail.com" className="contact-social-link flex items-center gap-4 text-neutral-700 hover:text-neutral-900 transition-colors group">
                <div className="w-12 h-12 rounded-[1rem] border border-neutral-400 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                  <Mail size={20} />
                </div>
                <span className="text-lg font-medium">ryancooperblue@gmail.com</span>
              </a>
              <a href="https://github.com/dheerajkamble" target="_blank" rel="noopener noreferrer" className="contact-social-link flex items-center gap-4 text-neutral-700 hover:text-neutral-900 transition-colors group">
                <div className="w-12 h-12 rounded-[1rem] border border-neutral-400 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                  <Github size={20} />
                </div>
                <span className="text-lg font-medium">github.com/dheerajkamble</span>
              </a>
              <a href="https://linkedin.com/in/dheerajkamble" target="_blank" rel="noopener noreferrer" className="contact-social-link flex items-center gap-4 text-neutral-700 hover:text-neutral-900 transition-colors group">
                <div className="w-12 h-12 rounded-[1rem] border border-neutral-400 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                  <Linkedin size={20} />
                </div>
                <span className="text-lg font-medium">linkedin.com/in/dheerajkamble</span>
              </a>
              <a href="https://twitter.com/dheerajkamble" target="_blank" rel="noopener noreferrer" className="contact-social-link flex items-center gap-4 text-neutral-700 hover:text-neutral-900 transition-colors group">
                <div className="w-12 h-12 rounded-[1rem] border border-neutral-400 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                  <Twitter size={20} />
                </div>
                <span className="text-lg font-medium">@dheerajkamble</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
