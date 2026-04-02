import { useRef } from 'react';
import { Server, Database, Cloud, Lock, Github } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
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
    
    tl.from('.about-title', { y: 50, opacity: 0, duration: 0.8 })
      .from('.about-image', { scale: 0.95, opacity: 0, duration: 0.8 }, '-=0.4')
      .from('.about-text p', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
      .from('.about-competencies-title', { opacity: 0, duration: 0.4 }, '-=0.2')
      .from('.about-competency', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.2')
      .from('.about-oss', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4');
  }, { scope: container });

  return (
    <section id="about" className="py-24 px-6" ref={container}>
      <div className="container mx-auto max-w-4xl">
        <h1 className="about-title font-name text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-none mb-12">
          About Me
        </h1>
        
        <div className="about-image aspect-video w-full bg-neutral-400 rounded-[2.5rem] mb-16 overflow-hidden shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop" 
            alt="Backend Engineering" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="about-text prose prose-lg prose-neutral max-w-none">
          <p className="text-2xl text-neutral-800 leading-relaxed mb-8 font-medium">
            I'm a backend engineer who builds production-grade systems in Java and Spring Boot. My focus is microservices architecture, event-driven design with Kafka, and building APIs that are secure, reliable, and easy to operate.
          </p>
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            I've built an AI-powered personal finance tracker as a full microservices system — API gateway, Eureka service registry, Kafka-based event streaming, per-service PostgreSQL databases, Redis caching, and centralized JWT authentication. I'm currently building a real-time stock and crypto data platform with multi-provider ingestion, Kafka pipelines, and TimescaleDB.
          </p>
          <p className="text-lg text-neutral-700 leading-relaxed mb-12">
            When I'm not building, I'm reading about system design, distributed systems patterns, and how large-scale financial data platforms are architected.
          </p>

          <h2 className="about-competencies-title text-3xl mb-8">Core Competencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="about-competency bg-neutral-200 p-6 rounded-[1.5rem]">
              <Server className="w-8 h-8 text-neutral-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Backend Development</h3>
              <p className="text-neutral-700">Java, Spring Boot, REST APIs, Spring Security. Building robust, well-tested APIs with a focus on reliability and correctness.</p>
            </div>
            <div className="about-competency bg-neutral-200 p-6 rounded-[1.5rem]">
              <Database className="w-8 h-8 text-neutral-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Event-Driven Systems</h3>
              <p className="text-neutral-700">Apache Kafka, Spring Kafka. Designing asynchronous microservices pipelines, consumer groups, and reliable event processing.</p>
            </div>
            <div className="about-competency bg-neutral-200 p-6 rounded-[1.5rem]">
              <Cloud className="w-8 h-8 text-neutral-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Data & Storage</h3>
              <p className="text-neutral-700">PostgreSQL, Redis, TimescaleDB. Database-per-service patterns, schema design, caching strategies, and time-series data storage.</p>
            </div>
            <div className="about-competency bg-neutral-200 p-6 rounded-[1.5rem]">
              <Lock className="w-8 h-8 text-neutral-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Architecture</h3>
              <p className="text-neutral-700">Microservices, Spring Cloud Gateway, Eureka, JWT auth. Building distributed systems that are fault-tolerant and straightforward to operate.</p>
            </div>
          </div>

          <div className="about-oss mb-12">
            <div className="flex items-center gap-4 mb-8">
              <Github className="w-8 h-8 text-neutral-800" />
              <h2 className="text-3xl m-0">Open Source Activity</h2>
            </div>
            <div className="bg-neutral-200 p-8 rounded-[2rem] overflow-x-auto custom-scrollbar">
              <GitHubCalendar 
                username="dheeraj080" 
                colorScheme="light"
                theme={{
                  light: ['#e8e8e3', '#b8bab4', '#9b9e97', '#4f564d', '#3d403c'],
                  dark: ['#121412', '#3d403c', '#4f564d', '#9b9e97', '#d5d6d0'],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
