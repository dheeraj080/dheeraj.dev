/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from "./types";

export const projects: Project[] = [
  {
    id: "finance",
    title: "Omni Finance Tracker",
    subtitle: "React, Node.js, PostgreSQL",
    description: "A comprehensive wealth management platform featuring real-time market data integration, automated expense categorization, and deep portfolio analytics. Built for performance and absolute data integrity.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Recharts"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/dheerajkamble",
    image: "https://picsum.photos/seed/finance/1200/800"
  },
  {
    id: "email",
    title: "Nexus Email Engine",
    subtitle: "Go, Redis, gRPC",
    description: "A high-throughput email orchestration service capable of delivering millions of transactional emails with zero-drop guarantees. Features include dynamic templating and advanced failure-handling logic.",
    technologies: ["Go", "Redis", "gRPC", "BullMQ", "PostgreSQL"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/dheerajkamble",
    image: "https://picsum.photos/seed/email/1200/800"
  },
  {
    id: "orchestrator",
    title: "Aether AI Orchestrator",
    subtitle: "Python, LangChain, FastAPI",
    description: "An advanced workflow automation engine that leverages Large Language Models to coordinate complex multi-step tasks. Includes built-in agentic reasoning and self-healing execution blocks.",
    technologies: ["Python", "LangChain", "FastAPI", "OpenAI", "Vector DB"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/dheerajkamble",
    image: "https://picsum.photos/seed/ai/1200/800"
  },
  {
    id: "terminal",
    title: "Project Blacklight",
    subtitle: "Low-latency Trading Lab",
    description: "A specialized trading terminal designed for sub-millisecond execution. Features high-frequency order book visualizations and custom C++ execution wrappers.",
    technologies: ["C++", "Rust", "WebAssembly", "ZeroMQ"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/dheerajkamble",
    image: "https://picsum.photos/seed/trading/1200/800"
  }
];
