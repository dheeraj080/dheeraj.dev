import { useEffect } from 'react';
import { Server, Database, Cloud, Lock, Github } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-name text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-none mb-12">
          About Me
        </h1>
        
        <div className="aspect-video w-full bg-neutral-400 rounded-[2.5rem] mb-16 overflow-hidden shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop" 
            alt="Backend Engineering" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg prose-neutral max-w-none">
          <p className="text-2xl text-neutral-800 leading-relaxed mb-8 font-medium">
            I'm a Senior Backend Engineer passionate about designing fault-tolerant, highly available distributed systems.
          </p>
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            Over the past decade, I've transitioned from building simple monolithic CRUD applications to orchestrating complex microservices architectures that handle millions of requests per minute. My philosophy is simple: build systems that are boring to operate but exciting to scale.
          </p>
          <p className="text-lg text-neutral-700 leading-relaxed mb-12">
            When I'm not optimizing PostgreSQL queries or debugging Kubernetes pods, I'm usually writing about system design patterns or contributing to open-source infrastructure tools.
          </p>

          <h2 className="text-3xl mb-8">Core Competencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-neutral-200 p-6 rounded-[1.5rem]">
              <Server className="w-8 h-8 text-neutral-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Backend Development</h3>
              <p className="text-neutral-700">Go, Rust, Python, Node.js. Building robust APIs (REST, gRPC, GraphQL) with a focus on performance and type safety.</p>
            </div>
            <div className="bg-neutral-200 p-6 rounded-[1.5rem]">
              <Database className="w-8 h-8 text-neutral-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Data Engineering</h3>
              <p className="text-neutral-700">PostgreSQL, Redis, Kafka, Elasticsearch. Designing schemas, optimizing queries, and building real-time event pipelines.</p>
            </div>
            <div className="bg-neutral-200 p-6 rounded-[1.5rem]">
              <Cloud className="w-8 h-8 text-neutral-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Infrastructure & Cloud</h3>
              <p className="text-neutral-700">AWS, Kubernetes, Docker, Terraform. Implementing CI/CD pipelines and infrastructure as code for reliable deployments.</p>
            </div>
            <div className="bg-neutral-200 p-6 rounded-[1.5rem]">
              <Lock className="w-8 h-8 text-neutral-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">System Architecture</h3>
              <p className="text-neutral-700">Microservices, Domain-Driven Design, Event Sourcing, and designing for high availability and fault tolerance.</p>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <Github className="w-8 h-8 text-neutral-800" />
              <h2 className="text-3xl m-0">Open Source Activity</h2>
            </div>
            <div className="bg-neutral-200 p-8 rounded-[2rem] overflow-x-auto custom-scrollbar">
              <GitHubCalendar 
                username="dheerajkamble" 
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
    </main>
  );
}
