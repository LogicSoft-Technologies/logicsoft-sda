"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import RobotMascot from "./RobotMascot";
import { MASCOT_ROUTES } from "./mascotRoutes";
import { useMascotHideout } from "./useMascotHideout";

const SIDES = ["left", "right"];

const PEEK_VISIBLE_MS = 10000;
const REAPPEAR_DELAY_MS = 9000;
const BUBBLE_DELAY_MS = 1000;

function randomSide(exclude) {
  const options = SIDES.filter((s) => s !== exclude);
  return options[Math.floor(Math.random() * options.length)];
}

function randomTopPercent() {
  return 25 + Math.random() * 50;
}

export default function MascotPeekaboo() {
  const pathname = usePathname();
  const router = useRouter();
  const { hideoutRoute } = useMascotHideout(MASCOT_ROUTES);

  const [visible, setVisible] = useState(false);
  const [side, setSide] = useState("right");
  const [topPercent, setTopPercent] = useState(40);
  const [showBubble, setShowBubble] = useState(false);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const schedulePeek = (delay) => {
    const t = setTimeout(() => {
      setSide((prev) => randomSide(prev));
      setTopPercent(randomTopPercent());
      setShowBubble(false);
      setVisible(true);

      const bubbleTimer = setTimeout(() => setShowBubble(true), BUBBLE_DELAY_MS);
      const hideTimer = setTimeout(() => {
        setVisible(false);
        setShowBubble(false);
        schedulePeek(REAPPEAR_DELAY_MS);
      }, PEEK_VISIBLE_MS);

      timers.current.push(bubbleTimer, hideTimer);
    }, delay);
    timers.current.push(t);
  };

  useEffect(() => {
    if (pathname === hideoutRoute) {
      clearTimers();
      setVisible(false);
      return;
    }
    schedulePeek(1500);
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hideoutRoute]);

  if (pathname === hideoutRoute) return null;

  const handleClick = () => {
    clearTimers();
    setVisible(false);
    router.push(hideoutRoute);
  };

  return (
    <div
      aria-hidden={!visible}
      style={{
        position: "fixed",
        top: `${topPercent}%`,
        [side]: 0,
        zIndex: 9997,
        pointerEvents: "none",
        width: 140,
        height: 120,
      }}
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            key="peek"
            initial={{ x: side === "right" ? 90 : -90, opacity: 0 }}
            animate={{ x: side === "right" ? 40 : -40, opacity: 1 }}
            exit={{ x: side === "right" ? 90 : -90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            style={{
              position: "absolute",
              top: 0,
              [side]: 0,
              display: "flex",
              alignItems: "center",
              flexDirection: side === "right" ? "row" : "row-reverse",
              pointerEvents: "auto",
            }}
          >
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: "absolute",
                    top: -34,
                    [side === "right" ? "right" : "left"]: 40,
                    background: "#ffffff",
                    color: "#1f3a5f",
                    fontWeight: 700,
                    fontSize: 12,
                    padding: "5px 11px",
                    borderRadius: 14,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                    whiteSpace: "nowrap",
                    zIndex: 2,
                  }}
                >
                  Find me!
                </motion.div>
              )}
            </AnimatePresence>

            <div
              style={{
                width: 90,
                height: 120,
                overflow: "hidden",
              }}
            >
              <button
                type="button"
                onClick={handleClick}
                aria-label="Find the mascot"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transform: "scale(0.45)",
                  transformOrigin: "left top",
                }}
              >
                <RobotMascot autoCycle={false} expression="neutral" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}