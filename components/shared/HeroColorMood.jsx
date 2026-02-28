"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const MOODS = [
  "radial-gradient(circle at 20% 30%, rgba(0,120,255,0.22), transparent 65%), linear-gradient(120deg, rgba(180,220,255,0.55), rgba(230,245,255,0.35))",

  "radial-gradient(circle at 80% 25%, rgba(80,90,220,0.22), transparent 65%), linear-gradient(120deg, rgba(200,205,255,0.5), rgba(235,238,255,0.34))",

  "radial-gradient(circle at 50% 65%, rgba(120,130,150,0.2), transparent 65%), linear-gradient(120deg, rgba(220,225,235,0.6), rgba(245,248,252,0.38))",

  "radial-gradient(circle at 30% 40%, rgba(220,130,160,0.22), transparent 65%), linear-gradient(120deg, rgba(250,215,225,0.55), rgba(255,238,245,0.36))",

  "radial-gradient(circle at 70% 50%, rgba(80,190,170,0.22), transparent 65%), linear-gradient(120deg, rgba(195,235,230,0.55), rgba(230,255,250,0.38))",
];

export default function HeroColorMood({ activeIndex }) {
  const bgRef = useRef(null);

  useEffect(() => {
    if (!bgRef.current) return;
    gsap.to(bgRef.current, {
      duration: 0.6,
      ease: "power3.inOut",
      background: MOODS[activeIndex % MOODS.length],
      overwrite: "auto"
    });
  }, [activeIndex]);

  return (
    <div
      ref={bgRef}
      className="absolute inset-0 z-[-1] pointer-events-none"
      style={{ background: MOODS[0] }}
    />
  );
}
