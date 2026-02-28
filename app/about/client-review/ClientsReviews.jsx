"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

// ── Load Globe client-side only (WebGL) ──────────────────────────────────────
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

// ── Client locations on globe ─────────────────────────────────────────────────
const CLIENT_POINTS = [
  { lat: 6.5244,   lng: 3.3792,   label: "Lagos, Nigeria",     color: "#f59e0b" },
  { lat: 9.0765,   lng: 7.3986,   label: "Abuja, Nigeria",     color: "#f59e0b" },
  { lat: 51.5074,  lng: -0.1278,  label: "London, UK",         color: "#3b82f6" },
  { lat: 40.7128,  lng: -74.0060, label: "New York, USA",      color: "#3b82f6" },
  { lat: 25.2048,  lng: 55.2708,  label: "Dubai, UAE",         color: "#10b981" },
  { lat: 1.3521,   lng: 103.8198, label: "Singapore",          color: "#10b981" },
  { lat: 30.0444,  lng: 31.2357,  label: "Cairo, Egypt",       color: "#f59e0b" },
  { lat: 5.6037,   lng: -0.1870,  label: "Accra, Ghana",       color: "#f59e0b" },
  { lat: -33.8688, lng: 151.2093, label: "Sydney, Australia",  color: "#a855f7" },
  { lat: 48.8566,  lng: 2.3522,   label: "Paris, France",      color: "#3b82f6" },
  { lat: 19.0760,  lng: 72.8777,  label: "Mumbai, India",      color: "#10b981" },
  { lat: -23.5505, lng: -46.6333, label: "São Paulo, Brazil",  color: "#ef4444" },
];

// ── Testimonial data ──────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Adebayo Okafor",
    role: "CTO",
    company: "FirstTrust Bank",
    industry: "Banking",
    rating: 5,
    text: "Logicsoft delivered our core banking integration on time and within budget. Their understanding of financial systems and regulatory requirements was impressive. The level of transparency was unlike anything we'd experienced with previous vendors.",
    initials: "AO",
    avatarBg: "#1d4ed8",
    tagBg: "#dbeafe",
    tagBorder: "#bfdbfe",
    tagText: "#1d4ed8",
  },
  {
    name: "Chioma Eze",
    role: "Head of Digital",
    company: "HealthBridge Nigeria",
    industry: "Healthcare",
    rating: 5,
    text: "We needed a patient management platform built to HIPAA-aligned standards. Logicsoft was a genuine strategic partner throughout. The system has run without disruption for over 18 months.",
    initials: "CE",
    avatarBg: "#059669",
    tagBg: "#d1fae5",
    tagBorder: "#6ee7b7",
    tagText: "#059669",
  },
  {
    name: "Emeka Nwachukwu",
    role: "CEO",
    company: "Proptech Solutions",
    industry: "Real Estate",
    rating: 5,
    text: "Logicsoft proposed a modern architecture, handled the migration cleanly, and built features our customers immediately loved. Communication was always professional and proactive.",
    initials: "EN",
    avatarBg: "#b45309",
    tagBg: "#fef3c7",
    tagBorder: "#fde68a",
    tagText: "#b45309",
  },
  {
    name: "Fatima Al-Hassan",
    role: "IT Director",
    company: "Gulf Logistics Group",
    industry: "Logistics",
    rating: 5,
    text: "Logicsoft integrated our fleet management, warehouse, and ERP systems into one coherent platform. What seemed impossible was handled with remarkable precision. Our efficiency improved by over 30%.",
    initials: "FA",
    avatarBg: "#0891b2",
    tagBg: "#cffafe",
    tagBorder: "#a5f3fc",
    tagText: "#0891b2",
  },
  {
    name: "Olumide Adeyemi",
    role: "Founder",
    company: "Finpay Africa",
    industry: "FinTech",
    rating: 5,
    text: "We needed a partner who could build fast without cutting corners on security. Our payment platform launched in 3 months and passed PCI compliance review first time. Remarkable execution.",
    initials: "OA",
    avatarBg: "#7c3aed",
    tagBg: "#ede9fe",
    tagBorder: "#ddd6fe",
    tagText: "#7c3aed",
  },
  {
    name: "Ngozi Obi",
    role: "Operations Manager",
    company: "RetailChain West Africa",
    industry: "Retail",
    rating: 5,
    text: "Real-time stock visibility across 40+ stores — something we'd been trying to achieve for years. Logicsoft made it a reality in under 4 months. The system is rock solid.",
    initials: "NO",
    avatarBg: "#db2777",
    tagBg: "#fce7f3",
    tagBorder: "#fbcfe8",
    tagText: "#db2777",
  },
  {
    name: "David Mensah",
    role: "VP Technology",
    company: "AfriTelco Ghana",
    industry: "Telecoms",
    rating: 5,
    text: "Logicsoft's data engineering team built our customer analytics platform from scratch. The AWS architecture cut our infrastructure costs by 60% while handling 10x more data. Exceptional technical depth.",
    initials: "DM",
    avatarBg: "#16a34a",
    tagBg: "#dcfce7",
    tagBorder: "#bbf7d0",
    tagText: "#16a34a",
  },
  {
    name: "Aisha Mahmoud",
    role: "CISO",
    company: "NorthBank Holdings",
    industry: "Cybersecurity",
    rating: 5,
    text: "Logicsoft conducted our most thorough penetration test to date and helped us implement a zero-trust security framework. Their ISO 27001 alignment expertise saved us months of compliance work.",
    initials: "AM",
    avatarBg: "#dc2626",
    tagBg: "#fee2e2",
    tagBorder: "#fecaca",
    tagText: "#dc2626",
  },
  {
    name: "Tunde Fashola",
    role: "Digital Transformation Lead",
    company: "PetroNIG Limited",
    industry: "Oil & Gas",
    rating: 5,
    text: "Logicsoft managed the discovery, architecture, and delivery phases with a maturity that reassured our board. The project came in on budget and the results speak for themselves.",
    initials: "TF",
    avatarBg: "#d97706",
    tagBg: "#fff7ed",
    tagBorder: "#fed7aa",
    tagText: "#d97706",
  },
];

const stats = [
  { value: "50+",  label: "Success stories"       },
  { value: "98%",  label: "Client retention"      },
  { value: "30+",  label: "Industries served"     },
  { value: "4.9★", label: "Average client rating" },
];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" aria-hidden="true" />
      ))}
    </div>
  );
}

// ── Globe wrapper ─────────────────────────────────────────────────────────────
function GlobeWrapper() {
  const [mounted, setMounted] = useState(false);
  const globeRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGlobeReady = () => {
    if (!globeRef.current) return;
    const ctrl = globeRef.current.controls();
    ctrl.autoRotate = true;
    ctrl.autoRotateSpeed = 1.8;
    ctrl.enableZoom = false;
    ctrl.enableRotate = false;
    ctrl.enablePan = false;
    globeRef.current.pointOfView({ lat: 10, lng: 20, altitude: 2.0 }, 800);
  };

  if (!mounted) return (
    <div className="w-[340px] h-[340px] flex items-center justify-center">
      <div className="w-[260px] h-[260px] rounded-full bg-blue-900/40 animate-pulse" />
    </div>
  );

  return (
    <Globe
      ref={globeRef}
      width={340}
      height={340}
      backgroundColor="rgba(0,0,0,0)"
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      atmosphereColor="#60a5fa"
      atmosphereAltitude={0.18}
      pointsData={CLIENT_POINTS}
      pointLat="lat"
      pointLng="lng"
      pointLabel="label"
      pointColor="color"
      pointAltitude={0.03}
      pointRadius={0.7}
      pointsMerge={false}
      onGlobeReady={handleGlobeReady}
    />
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Testimonials() {
  return (
    <motion.div
      className="pt-[96px] bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      {/* ── Breadcrumb ── */}
      <div className="max-w-[82rem] mx-auto px-6">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 pt-8 pb-10 text-[12px] text-gray-400 tracking-wide"
        >
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors duration-200">Home</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Client Reviews</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <div className="relative border-t border-b border-[#162d4a] overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d1f35 0%, #1f3a5f 45%, #1a4a7a 100%)" }}
      >
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[100px]" />
          <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-sky-400/8 blur-[80px]" />
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          />
        </div>

        <div className="relative z-10 max-w-[82rem] mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div>
              <p className="text-[11px] font-semibold text-[#60a5fa] uppercase tracking-[0.12em] mb-4">
                Client reviews
              </p>
              <h1 className="text-[36px] lg:text-[48px] font-serif text-white leading-[1.15] mb-5">
                Our Satisfied Clients
              </h1>
              <p className="text-[17px] text-white/70 leading-[2] max-w-[540px] mb-8">
                Every project we deliver is a relationship built on trust, transparency,
                and measurable outcomes. Heres what our clients say about working with
                Logicsoft Technologies across banking, healthcare, retail, telecoms, and beyond.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map((s, i) => (
                  <div key={i} className="bg-white/8 border border-white/15 px-4 py-3 hover:bg-white/12 hover:border-white/25 transition-all duration-200 backdrop-blur-sm">
                    <p className="text-[26px] font-light text-white leading-none mb-1">{s.value}</p>
                    <p className="text-[12px] text-white/50 leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Globe */}
            <div className="flex flex-col items-center gap-5">
              {/* Globe */}
              <div className="relative w-[340px] h-[340px] flex items-center justify-center">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-[#1f6fb2]/8 blur-[32px]" aria-hidden="true" />
                <GlobeWrapper />
              </div>

              {/* Social proof chip */}
              <div className="flex items-center gap-3 bg-white/10 border border-white/20 px-5 py-3 backdrop-blur-sm">
                <div className="flex -space-x-2">
                  {testimonials.slice(0, 5).map((t, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 flex items-center justify-center text-[9px] font-bold text-white border-2 border-white shrink-0"
                      style={{ backgroundColor: t.avatarBg }}
                    >
                      {t.initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-3 h-3 fill-[#f59e0b] text-[#f59e0b]" />
                    ))}
                  </div>
                  <p className="text-[12px] font-semibold text-white">
                    Over <span className="text-[#60a5fa]">50+</span> success stories
                  </p>
                  <p className="text-[11px] text-white/50">across 30+ industries worldwide</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      

      {/* ── Testimonial cards ── */}
      <div className="py-20 bg-white">
        <div className="max-w-[82rem] mx-auto px-6">

          <div className="flex items-center gap-4 mb-10">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.1em] whitespace-nowrap">
              What our clients say
            </p>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
                className="group relative bg-white flex flex-col border border-gray-200 px-6 pt-6 pb-5 overflow-hidden hover:border-[#1f6fb2] hover:shadow-md transition-all duration-300"
              >
                {/* Top slide-in line */}
                <span className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-300 transition-all duration-500 ease-out group-hover:w-full" aria-hidden="true" />

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 flex items-center justify-center text-[12px] font-bold text-white shrink-0"
                      style={{ backgroundColor: t.avatarBg }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-[13.5px] font-semibold text-[#1f3a5f] leading-snug">{t.name}</p>
                      <p className="text-[12px] text-gray-400">{t.role}, {t.company}</p>
                    </div>
                  </div>
                  <Quote className="w-5 h-5 text-gray-100 shrink-0 group-hover:text-[#dbeafe] transition-colors duration-300" aria-hidden="true" />
                </div>

                {/* Stars + industry tag */}
                <div className="flex items-center justify-between mb-3">
                  <Stars count={t.rating} />
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.08em] px-2 py-[2px] border"
                    style={{ color: t.tagText, borderColor: t.tagBorder, backgroundColor: t.tagBg }}
                  >
                    {t.industry}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-[13px] text-gray-500 leading-[1.9] flex-1 italic">
                  "{t.text}"
                </p>

                {/* Bottom slide-in line */}
                <span className="absolute bottom-0 left-1/2 h-[3px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-400 transition-all duration-500 ease-out group-hover:left-0 group-hover:w-full" aria-hidden="true" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA strip ── */}
      <div className="border-t border-gray-200 bg-[#f5f5f5]">
        <div className="max-w-[82rem] mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-2">
              Start your project
            </p>
            <h3 className="text-[22px] font-serif text-[#1f3a5f]">
              Ready to become our next success story?
            </h3>
            <p className="text-[14px] text-gray-500 mt-1">
              Lets discuss your project and show you what Logicsoft Technologies can deliver.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-7 py-3 text-[13.5px] font-semibold text-white shrink-0 bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A] ring-1 ring-inset ring-white/30 transition-all duration-200"
          >
            Discuss my project
          </Link>
        </div>
      </div>

    </motion.div>
  );
}