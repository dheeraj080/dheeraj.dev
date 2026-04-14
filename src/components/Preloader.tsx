import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('dheeraj_visited');
    
    if (hasVisited) {
      if (preloaderRef.current) {
        preloaderRef.current.style.display = 'none';
      }
      onComplete();
      return;
    }

    sessionStorage.setItem('dheeraj_visited', '1');
    
    gsap.to(nameRef.current, { y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 });
    
    setTimeout(() => {
      if (barRef.current) barRef.current.style.width = '100%';
    }, 150);
    
    setTimeout(() => {
      gsap.to(preloaderRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power3.inOut',
        onComplete: () => {
          if (preloaderRef.current) preloaderRef.current.style.display = 'none';
          onComplete();
        }
      });
    }, 1300);
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 bg-bg z-[9000] flex items-center justify-center flex-col gap-5"
      aria-hidden="true"
    >
      <div className="font-heading text-[clamp(32px,6vw,72px)] font-extrabold tracking-[-0.045em] overflow-hidden text-center">
        <span ref={nameRef} className="inline-block translate-y-[110%]">Dheeraj Kamble</span>
      </div>
      <div className="w-[160px] h-[1px] bg-border overflow-hidden">
        <div 
          ref={barRef}
          className="h-full w-0 bg-fg transition-all duration-900 ease-[cubic-bezier(0.76,0,0.24,1)]"
        ></div>
      </div>
    </div>
  );
}
