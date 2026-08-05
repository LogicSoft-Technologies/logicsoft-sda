"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Robotmascoticon.module.css";

const EXPRESSIONS = [
  { id: "neutral", hold: 3200 },
  { id: "happy", hold: 2200 },
  { id: "surprised", hold: 1600 },
  { id: "wink", hold: 1800 },
  { id: "sleepy", hold: 2400 },
];

export default function RobotMascotIcon({
  autoCycle = true,
  expression = "neutral",
  bounce = true,
  className = "",
}) {
  const [active, setActive] = useState(autoCycle ? EXPRESSIONS[0].id : expression);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!autoCycle) {
      setActive(expression);
      return;
    }

    let timeoutId;

    const showNext = () => {
      indexRef.current = (indexRef.current + 1) % EXPRESSIONS.length;
      const current = EXPRESSIONS[indexRef.current];
      setActive(current.id);
      timeoutId = setTimeout(showNext, current.hold);
    };

    timeoutId = setTimeout(showNext, EXPRESSIONS[0].hold);
    return () => clearTimeout(timeoutId);
  }, [autoCycle, expression]);

  const cls = (id) => `${styles.expression} ${active === id ? styles.active : ""}`;

  return (
    <span
      className={`${styles.wrap} ${bounce ? styles.bounceWrap : ""} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <g className={styles.headGroup}>
          <g className={styles.antenna}>
            <line x1="250" y1="100" x2="250" y2="55" stroke="#ff5e0e" strokeWidth="10" strokeLinecap="round" />
            <circle cx="250" cy="40" r="16" fill="#ff5e0e" />
          </g>

          <rect x="25" y="210" width="35" height="100" rx="17" fill="#000000" />
          <rect x="440" y="210" width="35" height="100" rx="17" fill="#000000" />

          <path
            d="M 250 95 C 130 95 75 175 75 260 C 75 370 140 415 250 415 C 360 415 425 370 425 260 C 425 175 370 95 250 95 Z"
            fill="#ff5e0e"
          />

          <rect x="145" y="160" width="210" height="200" rx="55" fill="#ffffff" />
          <rect x="170" y="195" width="160" height="70" rx="35" fill="#ff5e0e" />

          <g className={cls("neutral")}>
            <circle className={styles.eye} cx="205" cy="230" r="18" fill="#000000" />
            <circle className={styles.eye} cx="295" cy="230" r="18" fill="#000000" />
            <circle className={styles.mouthDot} cx="200" cy="325" r="10" fill="#000000" />
            <circle className={styles.mouthDot} cx="233" cy="325" r="10" fill="#000000" />
            <circle className={styles.mouthDot} cx="266" cy="325" r="10" fill="#000000" />
            <circle className={styles.mouthDot} cx="299" cy="325" r="10" fill="#000000" />
          </g>

          <g className={cls("happy")}>
            <path d="M 190 236 Q 205 216 220 236" fill="none" stroke="#000000" strokeWidth="10" strokeLinecap="round" />
            <path d="M 280 236 Q 295 216 310 236" fill="none" stroke="#000000" strokeWidth="10" strokeLinecap="round" />
            <path d="M 195 310 Q 250 355 305 310" fill="none" stroke="#000000" strokeWidth="12" strokeLinecap="round" />
          </g>

          <g className={cls("surprised")}>
            <circle cx="205" cy="230" r="24" fill="#000000" />
            <circle cx="295" cy="230" r="24" fill="#000000" />
            <ellipse cx="250" cy="325" rx="22" ry="28" fill="#000000" />
          </g>

          <g className={cls("wink")}>
            <circle cx="205" cy="230" r="18" fill="#000000" />
            <path d="M 280 230 Q 295 240 310 230" fill="none" stroke="#000000" strokeWidth="9" strokeLinecap="round" />
            <path d="M 200 320 Q 250 340 300 315" fill="none" stroke="#000000" strokeWidth="12" strokeLinecap="round" />
          </g>

          <g className={cls("sleepy")}>
            <path d="M 190 230 Q 205 240 220 230" fill="none" stroke="#000000" strokeWidth="9" strokeLinecap="round" />
            <path d="M 280 230 Q 295 240 310 230" fill="none" stroke="#000000" strokeWidth="9" strokeLinecap="round" />
            <line x1="220" y1="325" x2="280" y2="325" stroke="#000000" strokeWidth="10" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </span>
  );
}