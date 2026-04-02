import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Hero from '../components/Hero';
import FeaturedWork from '../components/FeaturedWork';
import AllWork from '../components/AllWork';
import Blog from '../components/Blog';
import About from './About';
import Contact from './Contact';

gsap.registerPlugin(ScrollToPlugin);

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        setTimeout(() => {
          gsap.to(window, { duration: 1, scrollTo: { y: target, offsetY: 80 }, ease: "power3.inOut" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main>
      <Hero />
      <FeaturedWork />
      <AllWork />
      <About />
      <Blog />
      <Contact />
    </main>
  );
}
