export interface Project {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  story: string[];
  role: string;
  stack: string[];
  bg: string;
  bgImage?: string;
  bgGif?: string;
  gifPortrait?: boolean;
  accentColor: string;
  textAccent: string;
  externalUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "studio-memoir",
    number: "01 / 04",
    title: "MEMOIR",
    subtitle: "High-throughput content delivery",
    year: "2025",
    role: "Backend Architecture",
    description:
      "A distributed content delivery system designed to handle high-volume read requests with sub-millisecond latency.",
    story: [
      "The Problem: The platform was struggling with slow query times during traffic spikes, leading to unacceptable load times for content delivery. The existing monolithic architecture couldn't scale horizontally.",
      "The Implementation: I migrated the core content delivery service to a microservices architecture using Go and gRPC. I implemented a multi-tiered caching strategy with Redis for hot data and a CDN for static assets. The database schema was redesigned in PostgreSQL to optimize read-heavy operations, utilizing advanced indexing and materialized views.",
      "The Result: The new architecture handled 10,000+ concurrent requests during peak hours, reduced average response latency by 65%, and decreased database load by 80%.",
    ],
    stack: ["Go", "gRPC", "PostgreSQL", "Redis", "Docker"],
    bg: "linear-gradient(160deg, #0A0A14 0%, #12101E 40%, #0F0F11 100%)",
    bgImage: "/studio-memoir.png",
    bgGif: "/studio-memoir.gif",
    accentColor: "#8B5CF6",
    textAccent: "#A78BFA",
    externalUrl: "https://dheerajkamble.com",
  },
  {
    slug: "dentos",
    number: "02 / 04",
    title: "DENTOS",
    subtitle: "Healthcare data management",
    year: "2024",
    role: "Backend Engineering",
    description:
      "A secure, HIPAA-compliant backend system for managing sensitive patient records, scheduling, and billing.",
    story: [
      "The Problem: The legacy system suffered from data inconsistency, complex and fragile API integrations with third-party billing providers, and lacked robust audit logging for compliance.",
      "The Implementation: I engineered a robust RESTful API using Node.js and NestJS. I designed a normalized relational schema in PostgreSQL to ensure data integrity and implemented a comprehensive role-based access control (RBAC) system. For billing integrations, I built a resilient message queue system using RabbitMQ to handle asynchronous webhook processing and retries.",
      "The Result: Achieved 99.99% uptime for the API, eliminated data anomalies, and successfully processed over $2M in automated billing transactions with zero dropped webhooks.",
    ],
    stack: ["Node.js", "NestJS", "PostgreSQL", "RabbitMQ", "AWS"],
    bg: "linear-gradient(160deg, #061410 0%, #0A1E1A 40%, #0F0F11 100%)",
    bgImage: "/dentos.png",
    bgGif: "/dentos.gif",
    accentColor: "#00C897",
    textAccent: "#00C897",
  },
  {
    slug: "memento",
    number: "03 / 04",
    title: "MEMENTO",
    subtitle: "Scalable media processing",
    year: "2024",
    role: "Systems Engineering",
    description:
      "A high-performance media processing pipeline capable of handling concurrent video and image uploads at scale.",
    story: [
      "The Problem: The application needed to process, compress, and store thousands of user-generated media files daily without blocking the main application threads or degrading user experience.",
      "The Implementation: I architected an event-driven media processing pipeline using AWS SQS and worker nodes in Python. Uploads were handled via direct-to-S3 presigned URLs to bypass the application servers. The worker nodes automatically triggered compression and thumbnail generation jobs upon S3 event notifications.",
      "The Result: Scaled the system to process 50,000+ media files daily. Reduced server bandwidth costs by 40% and improved upload success rates from 85% to 99.8%.",
    ],
    stack: ["Python", "AWS S3", "AWS SQS", "PostgreSQL", "FastAPI"],
    bg: "linear-gradient(160deg, #180E06 0%, #211508 40%, #0A0600 100%)",
    bgImage: "/memento.png",
    bgGif: "/memento.gif",
    gifPortrait: true,
    accentColor: "#FF8C42",
    textAccent: "#FF8C42",
  },
  {
    slug: "dheerajkamble",
    number: "04 / 04",
    title: "PORTFOLIO",
    subtitle: "Serverless architecture",
    year: "2025",
    role: "Backend Development",
    description:
      "A demonstration of modern serverless deployment, edge computing, and optimized data fetching strategies.",
    story: [
      "The Problem: Traditional portfolio sites often suffer from slow initial load times and inefficient asset delivery, especially when serving dynamic content globally.",
      "The Implementation: I utilized Next.js App Router to implement advanced server-side rendering (SSR) and static site generation (SSG). I integrated a headless CMS via GraphQL, optimizing queries to fetch only the necessary fields. The entire application is deployed on Vercel's Edge Network for global distribution.",
      "The Result: Achieved a perfect 100 Lighthouse performance score, reduced Time to First Byte (TTFB) to under 50ms globally, and implemented seamless CI/CD pipelines for automated testing and deployment.",
    ],
    stack: ["Next.js", "GraphQL", "Vercel Edge", "TypeScript"],
    bg: "linear-gradient(160deg, #0F0F11 0%, #0F0A14 40%, #0F0F11 100%)",
    bgImage: "/portfolio.png",
    bgGif: "/portfolio.gif",
    accentColor: "#F97316",
    textAccent: "#F97316",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? PROJECTS[idx - 1] : null,
    next: idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null,
  };
}
