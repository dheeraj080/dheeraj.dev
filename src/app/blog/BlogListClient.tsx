"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { BlogPost } from "@/lib/blog";
import { usePageTransition } from "@/context/TransitionContext";

export default function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const { navigateTo } = usePageTransition();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([titleRef.current, ...itemRefs.current], { opacity: 1 });
        return;
      }

      gsap.set(titleRef.current, { yPercent: 20, opacity: 0 });
      itemRefs.current.forEach((item) => {
        if (item) gsap.set(item, { opacity: 0, yPercent: 20 });
      });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(titleRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        tl.to(
          item,
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ background: "#0F0F11", minHeight: "100vh", color: "#F3F4F6", padding: "clamp(6rem, 10vw, 12rem) clamp(2rem, 6vw, 8rem)" }}>
      <div style={{ position: "absolute", top: "3rem", left: "clamp(2rem, 6vw, 8rem)", display: "flex", alignItems: "center", gap: "2.5rem" }}>
        <button
          onClick={() => navigateTo("/", "HOME")}
          style={{ background: "none", border: "none", cursor: "none", padding: 0, display: "block", fontFamily: "var(--font-spacemono)", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#F3F4F6", opacity: 0.45 }}
          data-cursor="hover"
        >
          ← BACK TO HOME
        </button>
        <span className="section-label" style={{ color: "#F3F4F6", borderColor: "rgba(240, 235, 224, 0.2)" }}>/ WRITING / p. 005.5</span>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ overflow: "hidden", marginBottom: "6rem" }}>
          <h1 ref={titleRef} style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(6rem, 12vw, 14rem)", lineHeight: 0.85, color: "#F3F4F6" }}>
            THE
            <br />
            <span style={{ color: "#F97316" }}>LOG</span>
          </h1>
        </div>

        <div style={{ borderTop: "1px solid #1F2937" }}>
          {posts.map((post, i) => (
            <div
              key={post.slug}
              ref={(el) => { if (el) itemRefs.current[i] = el; }}
              data-cursor="hover"
              style={{ padding: "3rem 0", borderBottom: "1px solid #1F2937", display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", alignItems: "center", cursor: "none", transition: "background-color 0.3s ease" }}
              onClick={() => navigateTo(`/blog/${post.slug}`, post.title)}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.backgroundColor = "#0F0F11";
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.backgroundColor = "transparent";
              }}
            >
              <div>
                <p style={{ fontFamily: "var(--font-spacemono)", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#F97316", marginBottom: "0.5rem" }}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <h3 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#F3F4F6", lineHeight: 0.9, marginBottom: "1rem" }}>{post.title}</h3>
                <p style={{ fontFamily: "var(--font-spacemono)", fontSize: "1rem", color: "#F3F4F6", opacity: 0.7, lineHeight: 1.6, maxWidth: "700px" }}>{post.excerpt}</p>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end", maxWidth: "250px" }}>
                {post.tags.map(tag => (
                  <span key={tag} style={{ fontFamily: "var(--font-spacemono)", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#0F0F11", background: "#F3F4F6", padding: "0.25rem 0.5rem" }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
