"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePageTransition } from "@/context/TransitionContext";

interface BlogPostPreview {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const { navigateTo } = usePageTransition();
  const [posts, setPosts] = useState<BlogPostPreview[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data.slice(0, 3)))
      .catch(err => console.error('Failed to fetch posts:', err));
  }, []);

  useEffect(() => {
    if (posts.length === 0) return;

    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(itemRefs.current, { opacity: 1 });
        return;
      }

      gsap.set(headRef.current, { yPercent: 40, opacity: 0 });

      ScrollTrigger.create({
        trigger: headRef.current,
        start: "top 80%",
        onEnter() {
          gsap.to(headRef.current, {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          });
        },
      });

      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          onEnter() {
            gsap.to(item, {
              opacity: 1,
              yPercent: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: i * 0.1,
            });
          },
        });

        gsap.set(item, { opacity: 0, yPercent: 20 });
      });
    }, section);

    return () => ctx.revert();
  }, [posts]);

  return (
    <section ref={sectionRef} className="blog-section" id="blog" style={{ position: "relative", minHeight: "100vh", background: "#0F0F11", padding: "clamp(6rem, 10vw, 12rem) clamp(2rem, 6vw, 8rem)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ position: "absolute", top: "3rem", left: "clamp(2rem, 6vw, 8rem)" }}>
        <span className="section-label">/ WRITING / p. 005.5</span>
      </div>

      <div style={{ overflow: "hidden" }}>
        <h2 ref={headRef} style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(8rem, 16vw, 22rem)", lineHeight: 0.85, color: "#F3F4F6", marginBottom: "6rem" }}>
          THE
          <br />
          <span style={{ color: "#F97316" }}>LOG</span>
        </h2>
      </div>

      <div style={{ borderTop: "1px solid #1F2937" }}>
        {posts.map((post, i) => (
          <div
            key={post.slug}
            ref={(el) => { if (el) itemRefs.current[i] = el; }}
            data-cursor="hover"
            className="group transition-colors duration-300 hover:bg-white/5"
            style={{ padding: "2rem 1rem", margin: "0 -1rem", borderBottom: "1px solid #1F2937", display: "grid", gridTemplateColumns: "1fr auto", gap: "1.5rem", alignItems: "center", cursor: "none", borderRadius: "0.5rem" }}
            onClick={() => navigateTo(`/blog/${post.slug}`, post.title)}
          >
            <div>
              <p style={{ fontFamily: "var(--font-spacemono)", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#F97316", marginBottom: "0.4rem" }}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <h3 className="transition-transform duration-300 ease-out group-hover:scale-[1.02] origin-left" style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F3F4F6", lineHeight: 0.9, marginBottom: "0.5rem" }}>{post.title}</h3>
              <p className="transition-transform duration-300 ease-out group-hover:scale-[1.02] origin-left" style={{ fontFamily: "var(--font-spacemono)", fontSize: "1rem", color: "#F3F4F6", opacity: 0.7, lineHeight: 1.6, maxWidth: "600px" }}>{post.excerpt}</p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end", maxWidth: "200px" }}>
              {post.tags.map(tag => (
                <span key={tag} className="transition-transform duration-300 ease-out group-hover:scale-110" style={{ fontFamily: "var(--font-spacemono)", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#0F0F11", background: "#F3F4F6", padding: "0.25rem 0.5rem", display: "inline-block" }}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: "4rem", textAlign: "right" }}>
        <button
          onClick={() => navigateTo("/blog", "THE LOG")}
          data-cursor="hover"
          style={{ background: "none", border: "none", borderBottom: "1px solid #F97316", cursor: "none", paddingBottom: "2px", fontFamily: "var(--font-spacemono)", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#F97316" }}
        >
          VIEW ALL POSTS →
        </button>
      </div>
    </section>
  );
}
