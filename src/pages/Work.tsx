import { useEffect, useRef } from 'react';
import FeaturedWork from '../components/FeaturedWork';
import AllWork from '../components/AllWork';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Work() {
  const container = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from('.work-title', { y: 50, opacity: 0, duration: 0.8, delay: 0.2 })
      .from('.work-desc', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4');
  }, { scope: container });

  return (
    <main className="pt-32 pb-24 min-h-screen" ref={container}>
      <div className="container mx-auto px-6 max-w-6xl mb-12">
        <h1 className="work-title font-name text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-none mb-8">
          Selected Works
        </h1>
        <p className="work-desc text-xl text-neutral-700 max-w-2xl leading-relaxed">
          A collection of systems I've architected, APIs I've built, and infrastructure I've scaled.
        </p>
      </div>
      <FeaturedWork />
      <AllWork />
    </main>
  );
}
