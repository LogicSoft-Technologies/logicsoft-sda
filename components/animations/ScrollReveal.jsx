"use client";

import { motion } from "framer-motion";

/**
 * Wraps any content and animates it in when scrolled into view.
 * Replays every time it re-enters the viewport (viewport.once = false).
 *
 * direction: "up" | "down" | "left" | "right" | "scale"
 */
export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 60,
  className = "",
}) {
  const offsets = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    scale: { x: 0, y: 0 },
  };

  const initial = {
    opacity: 0,
    scale: direction === "scale" ? 0.8 : 1,
    ...offsets[direction],
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}