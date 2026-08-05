"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./RobotMascot.module.css";

const EXPRESSIONS = [
  { id: "neutral", hold: 3200 },
  { id: "happy", hold: 2200 },
  { id: "surprised", hold: 1600 },
  { id: "wink", hold: 1800 },
  { id: "sleepy", hold: 2400 },
  { id: "angry", hold: 1800 },
  { id: "sad", hold: 2200 },
  { id: "love", hold: 2000 },
  { id: "laughing", hold: 1900 },
  { id: "confused", hold: 2000 },
  { id: "cool", hold: 2200 },
];

export default function RobotMascot({
  autoCycle = true,
  expression = "neutral",
  showFoundMessage = false,
  foundMessageText = "Touch me!",
  onSelect = () => {},
}) {
  const [active, setActive] = useState(
    autoCycle ? EXPRESSIONS[0].id : expression
  );
  const indexRef = useRef(0);

  const [hue, setHue] = useState(18);
  const baseColor = `hsl(${hue}, 75%, 52%)`;
  const lightColor = `hsl(${hue}, 75%, 74%)`;
  const darkColor = `hsl(${hue}, 75%, 32%)`;

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

  const cls = (id) =>
    `${styles.expression} ${active === id ? styles.active : ""}`;

  const handleClick = () => {
    setHue(Math.floor(Math.random() * 360));
    onSelect();
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {showFoundMessage && (
        <div
          style={{
            position: "absolute",
            top: -48,
            left: "50%",
            transform: "translate(-50%, 0)",
            background: "#ffffff",
            color: "#1f3a5f",
            fontWeight: 700,
            fontSize: 15,
            padding: "8px 16px",
            borderRadius: 16,
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
            whiteSpace: "nowrap",
            zIndex: 10,
            pointerEvents: "none",
            animation: "robotFoundBubbleFloat 2.2s ease-in-out infinite",
          }}
        >
          {foundMessageText}
          <div
            style={{
              position: "absolute",
              bottom: -6,
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              width: 12,
              height: 12,
              background: "#ffffff",
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes robotFoundBubbleFloat {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -8px); }
        }
      `}</style>

      <div className={styles.wrap}>
        <svg
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
          role="button"
          aria-label="Change mascot color"
        >
          <defs>
            <radialGradient id="headGrad" cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor={lightColor} />
              <stop offset="55%" stopColor={baseColor} />
              <stop offset="100%" stopColor={darkColor} />
            </radialGradient>

            <linearGradient id="housingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={lightColor} />
              <stop offset="100%" stopColor={darkColor} />
            </linearGradient>

            <radialGradient id="tipGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor={lightColor} />
              <stop offset="100%" stopColor={darkColor} />
            </radialGradient>

            <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000000" floodOpacity="0.25" />
            </filter>
          </defs>

          <g className={styles.headGroup} filter="url(#dropShadow)">
            <g className={styles.antenna}>
              <line
                x1="250" y1="100" x2="250" y2="55"
                stroke={baseColor} strokeWidth="10" strokeLinecap="round"
                style={{ transition: "stroke 0.25s ease" }}
              />
              <circle cx="250" cy="40" r="16" fill="url(#tipGrad)" style={{ transition: "fill 0.25s ease" }} />
            </g>

            <rect x="25" y="210" width="35" height="100" rx="17" fill="#000000" />
            <rect x="440" y="210" width="35" height="100" rx="17" fill="#000000" />

            <path
              d="
                M 250 95
                C 130 95 75 175 75 260
                C 75 370 140 415 250 415
                C 360 415 425 370 425 260
                C 425 175 370 95 250 95
                Z"
              fill="url(#headGrad)"
              style={{ transition: "fill 0.25s ease" }}
            />

            <ellipse cx="185" cy="150" rx="55" ry="30" fill="#ffffff" opacity="0.25" transform="rotate(-25 185 150)" />

            <rect x="145" y="160" width="210" height="200" rx="55" fill="#ffffff" />

            <rect x="170" y="195" width="160" height="70" rx="35" fill="url(#housingGrad)" style={{ transition: "fill 0.25s ease" }} />

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

            <g className={cls("angry")}>
              <path d="M 182 182 L 222 200" stroke="#000000" strokeWidth="9" strokeLinecap="round" />
              <path d="M 318 182 L 278 200" stroke="#000000" strokeWidth="9" strokeLinecap="round" />
              <circle cx="205" cy="232" r="13" fill="#000000" />
              <circle cx="295" cy="232" r="13" fill="#000000" />
              <line x1="205" y1="322" x2="295" y2="322" stroke="#000000" strokeWidth="11" strokeLinecap="round" />
            </g>

            <g className={cls("sad")}>
              <path d="M 185 198 Q 205 178 225 195" fill="none" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
              <path d="M 315 198 Q 295 178 275 195" fill="none" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
              <path d="M 190 228 Q 205 245 220 228" fill="none" stroke="#000000" strokeWidth="9" strokeLinecap="round" />
              <path d="M 280 228 Q 295 245 310 228" fill="none" stroke="#000000" strokeWidth="9" strokeLinecap="round" />
              <ellipse cx="215" cy="252" rx="6" ry="9" fill="#5aa9e6" />
              <path d="M 195 320 Q 250 300 305 320" fill="none" stroke="#000000" strokeWidth="11" strokeLinecap="round" />
            </g>

            <g className={cls("love")}>
              <path d="M 205 222 C 197 210 178 214 180 227 C 182 240 205 252 205 252 C 205 252 228 240 230 227 C 232 214 213 210 205 222 Z" fill="#e0245e" />
              <path d="M 295 222 C 287 210 268 214 270 227 C 272 240 295 252 295 252 C 295 252 318 240 320 227 C 322 214 303 210 295 222 Z" fill="#e0245e" />
              <path d="M 210 315 Q 250 335 290 315" fill="none" stroke="#000000" strokeWidth="10" strokeLinecap="round" />
            </g>

            <g className={cls("laughing")}>
              <path d="M 188 232 Q 205 208 222 232" fill="none" stroke="#000000" strokeWidth="9" strokeLinecap="round" />
              <path d="M 278 232 Q 295 208 312 232" fill="none" stroke="#000000" strokeWidth="9" strokeLinecap="round" />
              <ellipse cx="250" cy="322" rx="38" ry="24" fill="#000000" />
              <ellipse cx="250" cy="314" rx="30" ry="8" fill="#ffffff" />
              <circle cx="178" cy="270" r="12" fill={baseColor} opacity="0.35" />
              <circle cx="322" cy="270" r="12" fill={baseColor} opacity="0.35" />
            </g>

            <g className={cls("confused")}>
              <path d="M 185 190 Q 205 172 225 188" fill="none" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
              <line x1="278" y1="196" x2="312" y2="188" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
              <circle cx="205" cy="230" r="17" fill="#000000" />
              <path d="M 282 232 L 308 232" stroke="#000000" strokeWidth="9" strokeLinecap="round" />
              <path d="M 200 320 Q 215 308 230 320 Q 245 332 260 320 Q 275 308 290 320" fill="none" stroke="#000000" strokeWidth="9" strokeLinecap="round" />
            </g>

            <g className={cls("cool")}>
              <path d="M 175 218 Q 175 208 190 208 L 310 208 Q 325 208 325 218 L 325 240 Q 325 252 310 252 L 262 252 Q 250 252 250 240 Q 250 252 238 252 L 190 252 Q 175 252 175 240 Z" fill="#0d0d0d" />
              <line x1="238" y1="222" x2="250" y2="222" stroke="#0d0d0d" strokeWidth="6" />
              <path d="M 195 218 L 215 218" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
              <path d="M 270 218 L 290 218" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
              <path d="M 215 315 Q 250 328 285 312" fill="none" stroke="#000000" strokeWidth="10" strokeLinecap="round" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}