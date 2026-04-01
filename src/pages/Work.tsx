import { useEffect } from 'react';
import FeaturedWork from '../components/FeaturedWork';
import AllWork from '../components/AllWork';

export default function Work() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl mb-12">
        <h1 className="font-name text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-none mb-8">
          Selected Works
        </h1>
        <p className="text-xl text-neutral-700 max-w-2xl leading-relaxed">
          A collection of systems I've architected, APIs I've built, and infrastructure I've scaled.
        </p>
      </div>
      <FeaturedWork />
      <AllWork />
    </main>
  );
}
