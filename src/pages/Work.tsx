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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.work-title .tl span', { y: 0 });
      gsap.set('.work-desc', { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.to('.work-title .tl span', { y: 0, duration: 1.05, stagger: 0.08, delay: 0.2 })
      .from('.work-desc', { y: 20, opacity: 0, duration: 0.6 }, '-=0.6');
  }, { scope: container });

  return (
    <main className="pt-[160px] pb-[120px] min-h-screen" ref={container}>
      <div className="px-6 md:px-11 mb-12">
        <h1 className="work-title font-heading text-[clamp(52px,8vw,110px)] font-extrabold tracking-[-0.045em] leading-[0.88] max-md:text-[14vw] mb-8">
          <span className="tl overflow-hidden block">
            <span className="block translate-y-[110%]">Selected</span>
          </span>
          <span className="tl overflow-hidden block">
            <span className="block translate-y-[110%]">Works</span>
          </span>
        </h1>
        <p className="work-desc text-[clamp(24px,3vw,36px)] leading-[1.3] font-medium tracking-tight max-w-2xl">
          A collection of full-stack applications I've built, from responsive frontends to scalable backend systems.
        </p>
      </div>
      <FeaturedWork />
      <AllWork />
    </main>
  );
}
