"use client";

import { useRef, useState } from "react";
import {
  BellRing,
  Braces,
  Gauge,
  HeartPulse,
  KeyRound,
  LifeBuoy,
  ListChecks,
  Network,
  Radio,
  RefreshCw,
  Repeat,
  Timer,
} from "lucide-react";

// ── Visuals ───────────────────────────────────────────────────────────────────
// Logos live in /public/tech/<file>.svg (unzip tech-logos.zip into /public).
// Keyed by the tech NAME used in STACKS, so the STACKS data needs no changes and
// repeated techs (TypeScript, Docker, Terraform, SonarQube) reuse the same logo.
const LOGO_BASE = "/tech";

const LOGOS = {
  // Frontend
  React: "react",
  "Next.js": "nextjs",
  TypeScript: "typescript",
  JavaScript: "javascript",
  "Tailwind CSS": "tailwindcss",
  Webpack: "webpack",
  "Framer Motion": "framermotion",
  // Backend
  "Node.js": "nodejs",
  Python: "python",
  "Express.js": "express",
  GraphQL: "graphql",
  // Data
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
  Firebase: "firebase",
  Prisma: "prisma",
  Redis: "redis",
  Cloudinary: "cloudinary",
  // Mobile
  "React Native": "react",
  Expo: "expo",
  Flutter: "flutter",
  Swift: "swift",
  Electron: "electron",
  Ionic: "ionic",
  // Cloud
  AWS: "aws",
  "Microsoft Azure": "azure",
  "Google Cloud": "googlecloud",
  DigitalOcean: "digitalocean",
  Docker: "docker",
  Kubernetes: "kubernetes",
  Terraform: "terraform",
  Nginx: "nginx",
  // DevOps
  Jenkins: "jenkins",
  GitLab: "gitlab",
  PM2: "pm2",
  Linux: "linux",
  Ansible: "ansible",
  // Reliability
  Prometheus: "prometheus",
  Grafana: "grafana",
  Sentry: "sentry",
  Splunk: "splunk",
  // Security
  "OWASP Top 10": "owasp",
  "OWASP ASVS": "owasp",
  SonarQube: "sonarqube",
  JWT: "jwt",
  "HashiCorp Vault": "vault",
  "Kali Linux": "kalilinux",
  // Quality
  Postman: "postman",
  Jest: "jest",
  Cypress: "cypress",
  // Extra names used on the homepage stack section
  "React.js": "react",
  Azure: "azure",
  Vault: "vault",
  OWASP: "owasp",
  Xamarin: "xamarin",
};

// Practices/concepts with no brand logo get an icon tile instead of a picture.
const ICONS = {
  "REST APIs": Network,
  WebSockets: Radio,
  "Health Checks": HeartPulse,
  Alerting: BellRing,
  "Performance Monitoring": Gauge,
  "Incident Readiness": LifeBuoy,
  "Secure SDLC": RefreshCw,
  RBAC: KeyRound,
  "Automated Regression Testing": Repeat,
  "API Testing": Braces,
  "Performance Testing": Timer,
  "CI Quality Gates": ListChecks,
};

const getMonogram = (name) => {
  const words = name.replace(/[^A-Za-z0-9 ]/g, " ").split(" ").filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase();
};

const tileClass = "flex h-12 w-12 items-center justify-center bg-[#eaf4ff] text-[#1f6fb2]";

function TechVisual({ name, src }) {
  const [failed, setFailed] = useState(false);
  const logo = LOGOS[name];
  const Icon = ICONS[name];
  // `src` (optional) lets a page supply its own image, e.g. "/images/react-next.png".
  const url = src ?? (logo ? `${LOGO_BASE}/${logo}.svg` : null);

  if (url && !failed) {
    return (
      // Plain <img>: these are local files, so next/image adds nothing here.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => setFailed(true)}
        className={`select-none object-contain ${src ? "h-12 w-auto max-w-[120px]" : "h-12 w-12"}`}
      />
    );
  }

  if (Icon) {
    return (
      <span className={tileClass}>
        <Icon className="h-6 w-6" strokeWidth={1.75} />
      </span>
    );
  }

  // Safety net: missing/broken logo file → monogram tile instead of a broken image.
  return <span className={`${tileClass} text-[13px] font-bold tracking-wide`}>{getMonogram(name)}</span>;
}

// ── Card ──────────────────────────────────────────────────────────────────────
// Two layers share one grid cell, so the card is always as tall as the taller
// layer (no fixed heights) and every card in a row stretches to match.
//   front → logo + name        back → name + description
// Only opacity animates, so it's a clean crossfade in both directions.
export default function TechCard({ name, description, src }) {
  const [revealed, setRevealed] = useState(false);
  const pointerType = useRef("mouse");

  const fade = "col-start-1 row-start-1 transition-opacity duration-300 ease-out motion-reduce:transition-none";

  return (
    <article
      tabIndex={0}
      // Mouse: hover in/out. Touch/pen: tap toggles (there is no hover on phones).
      onPointerDown={(e) => {
        pointerType.current = e.pointerType;
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setRevealed(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setRevealed(false)}
      onClick={() => pointerType.current !== "mouse" && setRevealed((v) => !v)}
      // Keyboard: tabbing onto the card reveals it, tabbing away hides it.
      onFocus={(e) => e.currentTarget.matches(":focus-visible") && setRevealed(true)}
      onBlur={() => setRevealed(false)}
      className={`grid min-h-[168px] cursor-default border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#1f6fb2]/60 ${
        revealed
          ? "-translate-y-0.5 border-[#1f6fb2]/50 bg-[#f7fbff] shadow-[0_10px_28px_rgba(31,111,178,0.10)]"
          : "border-gray-200 bg-white"
      }`}
    >
      {/* Front — the picture */}
      <div
        aria-hidden="true"
        className={`${fade} flex flex-col items-center justify-center gap-3 p-5 text-center ${
          revealed ? "opacity-0" : "opacity-100"
        }`}
      >
        <TechVisual name={name} src={src} />
        <span className="text-[13px] font-semibold leading-snug text-[#1f3a5f]">{name}</span>
      </div>

      {/* Back — the bio. Always in the DOM, so screen readers read it regardless of hover. */}
      <div
        className={`${fade} flex flex-col justify-center p-5 ${revealed ? "opacity-100" : "opacity-0"}`}
      >
        <h4 className="text-[14px] font-bold text-[#1f6fb2]">{name}</h4>
        <span className="my-3 h-[2px] w-6 bg-[#1f6fb2] opacity-30" aria-hidden="true" />
        <p className="text-[12.5px] leading-relaxed text-gray-600">{description}</p>
      </div>
    </article>
  );
}