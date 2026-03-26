"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface HeroProps {
  waveformAmplitude?: (v: number) => void;
}

export default function Hero({ waveformAmplitude }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const name1Ref = useRef<HTMLSpanElement>(null);
  const name2Ref = useRef<HTMLSpanElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const folioRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const name1 = name1Ref.current;
    const name2 = name2Ref.current;
    const meta = metaRef.current;
    const folio = folioRef.current;
    const line = lineRef.current;

    if (!section || !name1 || !name2 || !meta || !folio || !line) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (reduced) {
        const targets = isMobile ? [name1, name2, meta, folio] : [name1, name2, meta, folio, line];
        gsap.set(targets, { opacity: 1, y: 0, clipPath: "none" });
        return;
      }

      // ─── Sleek Entry Animation ─────────────────────────
      const entryTl = gsap.timeline({ delay: 0.1 });

      // Clean slide up and fade in for the names
      entryTl.fromTo(
        [name1, name2],
        { yPercent: 40, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.15,
        }
      );

      // Red signal line draws in (desktop only)
      if (!isMobile) {
        entryTl.fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: "left center", duration: 1, ease: "power3.out" },
          "-=0.8"
        );
      }

      // Meta + folio fade up
      entryTl.fromTo(
        [meta, folio],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1 },
        "-=0.8"
      );

      // ─── Subtle Scroll Exit (Parallax) ─────
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate(self) {
          const p = self.progress;

          // Subtle parallax effect on scroll
          gsap.set(name1, { yPercent: -p * 30 });
          gsap.set(name2, { yPercent: -p * 15 });

          if (!isMobile) {
            gsap.set(line, {
              scaleX: 1 - p * 0.5,
              opacity: 1 - p,
              transformOrigin: "left center",
            });
          }

          waveformAmplitude?.(0.15 + p * 0.6);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [waveformAmplitude]);

  return (
    <section ref={sectionRef} className="hero" id="hero">
      {/* Name block */}
      <div
        className="hero-name-block"
        style={{
          position: "absolute",
          bottom: "clamp(5rem, 12vh, 14rem)",
          left: 0,
          right: 0,
          padding: "0 clamp(1.5rem, 4vw, 5rem)",
        }}
      >
        <span
          ref={name1Ref}
          className="hero-name-line"
          style={{ display: "block" }}
        >
          DHEERAJ
        </span>
        <span
          ref={name2Ref}
          className="hero-name-line"
          style={{ display: "block" }}
        >
          KAMBLE
        </span>
      </div>

      {/* Signal line */}
      <div
        ref={lineRef}
        className="hero-signal-line"
      />

      {/* Top-right: section label */}
      <div
        style={{
          position: "absolute",
          top: "3rem",
          right: "clamp(1.5rem, 4vw, 5rem)",
        }}
      >
        <span className="section-label">Vol. 1 / 2026</span>
      </div>

      {/* Top-left: header */}
      <div
        style={{
          position: "absolute",
          top: "3rem",
          left: "clamp(1.5rem, 4vw, 5rem)",
        }}
      >
        <span className="section-label">DHEERAJKAMBLE.COM</span>
      </div>

      {/* Bottom-right: role + scroll hint */}
      <div ref={metaRef} className="hero-meta">
        <p className="hero-role">/ BACKEND DEVELOPER</p>
        <p className="hero-scroll-hint" style={{ marginTop: "0.5rem" }}>
          ↓ scroll to tune in
        </p>
      </div>

      {/* Bottom-left: folio */}
      <div ref={folioRef} className="hero-folio">
        <span>p. 001</span>
      </div>
    </section>
  );
}
