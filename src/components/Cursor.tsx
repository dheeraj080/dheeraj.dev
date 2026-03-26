"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const text = textRef.current;
    if (!cursor || !text) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    
    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (cursor.style.opacity === "0" || cursor.style.opacity === "") {
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
      }
    };

    const ticker = () => {
      const dt = 1.0 - Math.pow(1.0 - 0.25, gsap.ticker.deltaRatio());
      cursorX += (mouseX - cursorX) * dt;
      cursorY += (mouseY - cursorY) * dt;
      xSet(cursorX);
      ySet(cursorY);
    };

    gsap.ticker.add(ticker);

    const onEnter = (isProject: boolean) => {
      gsap.to(cursor, {
        scale: isProject ? 5 : 3,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
      if (isProject) {
        text.innerText = "VIEW";
        gsap.to(text, { opacity: 1, duration: 0.2, delay: 0.1, overwrite: "auto" });
      }
    };

    const onLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(text, { 
        opacity: 0, 
        duration: 0.2, 
        overwrite: "auto", 
        onComplete: () => { text.innerText = ""; } 
      });
    };

    let activeElement: Element | null = null;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor='hover'], .work-card");
      if (interactive && interactive !== activeElement) {
        activeElement = interactive;
        const isProject = interactive.classList.contains("work-card");
        onEnter(isProject);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (activeElement && (!e.relatedTarget || !activeElement.contains(e.relatedTarget as Node))) {
        activeElement = null;
        onLeave();
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    const onLeaveWin = () => gsap.to(cursor, { opacity: 0, duration: 0.3 });
    const onEnterWin = () => gsap.to(cursor, { opacity: 1, duration: 0.3 });
    document.addEventListener("mouseleave", onLeaveWin);
    document.addEventListener("mouseenter", onEnterWin);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", onLeaveWin);
      document.removeEventListener("mouseenter", onEnterWin);
    };
  }, []);

  return (
    <div ref={cursorRef} className="cursor-main" aria-hidden="true">
      <span ref={textRef} style={{ opacity: 0, pointerEvents: "none" }}></span>
    </div>
  );
}
