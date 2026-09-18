"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  const springX = useSpring(glowX, { damping: 40, stiffness: 90, mass: 1.2 });
  const springY = useSpring(glowY, { damping: 40, stiffness: 90, mass: 1.2 });

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    const move = (e) => {
      glowX.set(e.clientX);
      glowY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [glowX, glowY]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: 100,
        height: 100,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(6,91,173,0.14) 0%, rgba(6,91,173,0.06) 40%, rgba(6,91,173,0) 70%)",
        filter: "blur(10px)",
      }}
    />
  );
}