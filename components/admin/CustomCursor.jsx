"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  const [isTouch, setIsTouch] = useState(true);
  const [isPointer, setIsPointer] = useState(false);
  const [isText, setIsText] = useState(false);
  const [visible, setVisible] = useState(false);

  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  const ringX = useSpring(dotX, { damping: 30, stiffness: 350, mass: 0.5 });
  const ringY = useSpring(dotY, { damping: 30, stiffness: 350, mass: 0.5 });

  useEffect(() => {
    // Bail out entirely if we're not on an admin route.
    if (!isAdmin) {
      setIsTouch(true);
      return;
    }

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    setIsTouch(!hasFinePointer);
    if (!hasFinePointer) return;

    document.documentElement.classList.add("admin-cursor-active");
    document.body.classList.add("admin-cursor-active");

    const move = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target;
      const interactive = target.closest("button, a, [role='button'], summary");
      const textInput = target.closest("input, textarea, [contenteditable='true']");

      setIsPointer(Boolean(interactive));
      setIsText(Boolean(textInput));
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);

    return () => {
      document.documentElement.classList.remove("admin-cursor-active");
      document.body.classList.remove("admin-cursor-active");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [isAdmin, dotX, dotY, visible]);

  if (isTouch || !isAdmin) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[99999] rounded-full bg-white mix-blend-difference"
      style={{
        x: ringX,
        y: ringY,
        translateX: "-50%",
        translateY: "-50%",
        width: isPointer ? 64 : 22,
        height: isPointer ? 64 : 22,
        opacity: visible && !isText ? 1 : 0,
      }}
      transition={{
        width: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
        height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.15 },
      }}
    />
  );
}