/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from "./types";

export const projects: Project[] = [
  {
    id: "infra",
    title: "Cloud Infrastructure Automation",
    subtitle: "Terraform, Go, AWS",
    description: "A robust automation suite for provisioning highly available AWS infrastructure using Terraform and Go. Includes custom provider support and automated scaling policies.",
    technologies: ["Terraform", "Go", "AWS", "Docker", "CI/CD"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/dheerajkamble",
    image: "https://picsum.photos/seed/infra/1200/800"
  },
  {
    id: "pipeline",
    title: "Enterprise Data Pipeline",
    subtitle: "Python, Kafka, Kubernetes",
    description: "Next-gen data ingestion engine capable of processing millions of events per second with sub-millisecond latency. Built with Kafka for messaging and K8s for orchestrating workers.",
    technologies: ["Python", "Kafka", "Kubernetes", "Redis", "PostgreSQL"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/dheerajkamble",
    image: "https://picsum.photos/seed/pipeline/1200/800"
  },
  {
    id: "arch",
    title: "Software Architecture Patterns",
    subtitle: "Documentation, Best Practices",
    description: "A comprehensive guide and reference implementation for distributed systems patterns including Event Sourcing, CQRS, and Microservices coordination.",
    technologies: ["Distributed Systems", "Design Patterns", "Microservices"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/dheerajkamble",
    image: "https://picsum.photos/seed/architecture/1200/800"
  },
  {
    id: "workspace",
    title: "Development Environment",
    subtitle: "Workspace Setup",
    description: "A meticulously crafted Nix-based development environment that ensures reproducibility across multi-platform teams. Includes optimized dotfiles and containerized dev environments.",
    technologies: ["NixOS", "Docker", "Bash", "Neovim"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/dheerajkamble",
    image: "https://picsum.photos/seed/setup/1200/800"
  }
];
