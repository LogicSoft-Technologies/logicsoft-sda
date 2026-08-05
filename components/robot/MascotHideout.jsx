"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import RobotMascot from "./RobotMascot";
import { MASCOT_ROUTES } from "./mascotRoutes";
import { useMascotHideout } from "./useMascotHideout";

const VISIBLE_MS = 10000; // stays found for 30s before hiding again

export default function MascotHideout() {
  const pathname = usePathname();
  const { hideoutRoute, relocate } = useMascotHideout(MASCOT_ROUTES);
  const [expression, setExpression] = useState("neutral");

  const isFound = pathname === hideoutRoute;

  useEffect(() => {
    if (!isFound) return;

    setExpression("neutral"); // always starts neutral when (re)found

    const timer = setTimeout(() => {
      relocate(); // sends it hiding again after 30s
    }, VISIBLE_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFound, hideoutRoute]);

  if (!isFound) return null;

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9996 }}>
      <style>{`
        @keyframes mascotBounce {
          0%, 100% { transform: translateY(0); animation-timing-function: cubic-bezier(0.5, 0, 1, 1); }
          50% { transform: translateY(-50px); animation-timing-function: cubic-bezier(0, 0, 0.5, 1); }
        }
        @keyframes shadowPulse {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.35; filter: blur(0px); }
          50% { transform: translateX(-50%) scale(0.6); opacity: 0.15; filter: blur(1px); }
        }
      `}</style>

      <div
        style={{
          position: "relative",
          animation: "mascotBounce 2s infinite",
          transform: "scale(0.6)",
          transformOrigin: "bottom center",
        }}
      >
        <RobotMascot
          showFoundMessage
          expression={expression}
          autoCycle={false}
          foundMessageText="You found me!"
          onSelect={() => setExpression("happy")}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: "50%",
          width: "80px",
          height: "14px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 70%)",
          animation: "shadowPulse 2s infinite",
        }}
      />
    </div>
  );
}