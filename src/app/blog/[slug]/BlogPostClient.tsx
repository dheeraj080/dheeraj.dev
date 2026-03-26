"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { BlogPost } from "@/lib/blog";
import { usePageTransition } from "@/context/TransitionContext";

export default function BlogPostClient({
  post,
  adjacent,
  children,
}: {
  post: BlogPost;
  adjacent: { prev: BlogPost | null; next: BlogPost | null };
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { navigateTo } = usePageTransition();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([titleRef.current, contentRef.current], { opacity: 1 });
        return;
      }

      gsap.set(titleRef.current, { yPercent: 20, opacity: 0 });
      gsap.set(contentRef.current, { opacity: 0, y: 40 });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(titleRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }).to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }, container);

    return () => ctx.revert();
  }, [post.slug]);

  return (
    <div ref={containerRef} style={{ background: "#F3F4F6", minHeight: "100vh", color: "#0F0F11", padding: "clamp(6rem, 10vw, 12rem) clamp(2rem, 6vw, 8rem)" }}>
      <div style={{ position: "absolute", top: "3rem", left: "clamp(2rem, 6vw, 8rem)", display: "flex", alignItems: "center", gap: "2.5rem" }}>
        <button
          onClick={() => navigateTo("/blog", "THE LOG")}
          data-cursor="hover"
          style={{ background: "none", border: "none", cursor: "none", padding: 0, display: "block", fontFamily: "var(--font-spacemono)", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#0F0F11", opacity: 0.45 }}
        >
          ← BACK TO LOG
        </button>
        <span className="section-label" style={{ color: "#0F0F11", borderColor: "rgba(15, 15, 17, 0.2)" }}>/ {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ overflow: "hidden", marginBottom: "4rem" }}>
          <h1 ref={titleRef} style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(4rem, 8vw, 8rem)", lineHeight: 0.9, color: "#0F0F11" }}>
            {post.title}
          </h1>
        </div>

        <div ref={contentRef} className="blog-content">
          {children}
          
          <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(15, 15, 17, 0.1)", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {post.tags.map(tag => (
              <span key={tag} style={{ fontFamily: "var(--font-spacemono)", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#F3F4F6", background: "#0F0F11", padding: "0.25rem 0.5rem" }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ marginTop: "8rem", borderTop: "1px solid rgba(15, 15, 17, 0.1)", paddingTop: "4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", maxWidth: "800px", margin: "8rem auto 0" }}>
        {adjacent.prev ? (
          <div
            onClick={() => navigateTo(`/blog/${adjacent.prev!.slug}`, adjacent.prev!.title)}
            data-cursor="hover"
            style={{ cursor: "none" }}
          >
            <p style={{ fontFamily: "var(--font-spacemono)", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#F97316", marginBottom: "0.5rem" }}>PREVIOUS</p>
            <h4 style={{ fontFamily: "var(--font-bebas)", fontSize: "2rem", lineHeight: 1 }}>{adjacent.prev.title}</h4>
          </div>
        ) : <div />}
        
        {adjacent.next ? (
          <div
            onClick={() => navigateTo(`/blog/${adjacent.next!.slug}`, adjacent.next!.title)}
            data-cursor="hover"
            style={{ cursor: "none", textAlign: "right" }}
          >
            <p style={{ fontFamily: "var(--font-spacemono)", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#F97316", marginBottom: "0.5rem" }}>NEXT</p>
            <h4 style={{ fontFamily: "var(--font-bebas)", fontSize: "2rem", lineHeight: 1 }}>{adjacent.next.title}</h4>
          </div>
        ) : <div />}
      </div>
    </div>
  );
}
