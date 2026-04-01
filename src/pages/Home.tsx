import Hero from '../components/Hero';
import FeaturedWork from '../components/FeaturedWork';
import AllWork from '../components/AllWork';
import Blog from '../components/Blog';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedWork />
      <AllWork />
      <Blog />
    </main>
  );
}
