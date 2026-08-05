"use client";

import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Globe2, Building2, ArrowRight, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import "leaflet/dist/leaflet.css";

const LeafletMap  = dynamic(() => import("@/components/about-company/LeafletMapClient"), { ssr: false });
const Globe       = dynamic(() => import("react-globe.gl"),     { ssr: false });

// ── Data ──────────────────────────────────────────────────────────────────────
const OFFICES = [
  {
    name: "Logicsoft HQ — Lagos",
    city: "Lagos",
    type: "Headquarters",
    address: "Victoria Island, Lagos, Nigeria",
    phone: "+234 9012 688 861",
    email: "contact@logicsofttechnologies.online",
    hours: "Mon–Fri, 8:00am – 6:00pm WAT",
    position: [6.5244, 3.3792],
    accentColor: "#1f6fb2",
    accentBg: "#eaf4ff",
    desc: "Our primary headquarters and main engineering hub. All C-suite leadership, architecture, and enterprise sales operations are based here.",
    headcount: "60+ engineers",
  },
  {
    name: "Logicsoft Branch — Abuja",
    city: "Abuja",
    type: "Regional Office",
    address: "Maitama District, Abuja, Nigeria",
    phone: "+234 9012 688 862",
    email: "contact@logicsofttechnologies.online",
    hours: "Mon–Fri, 8:00am – 6:00pm WAT",
    position: [9.0765, 7.3986],
    accentColor: "#059669",
    accentBg: "#ecfdf5",
    desc: "Our public sector and government practice hub. Engineering teams specialising in compliance, regulatory systems, and e-government solutions.",
    headcount: "15+ engineers",
  },
  {
    name: "Logicsoft Branch — Edo",
    city: "Edo",
    type: "Engineering Hub",
    address: "GRA, Benin City, Edo State, Nigeria",
    phone: "+234 7034 302 056",
    email: "contact@logicsofttechnologies.online",
    hours: "Mon–Fri, 8:00am – 6:00pm WAT",
    position: [6.335, 5.6037],
    accentColor: "#7c3aed",
    accentBg: "#f5f3ff",
    desc: "A dedicated engineering hub focused on talent development and junior-to-senior pipeline programmes. Houses our training academy.",
    headcount: "10+ engineers",
  },
];

const GLOBE_POINTS = [
  { lat: 6.5244,   lng: 3.3792,   label: "Lagos — HQ",         color: "#1f6fb2", size: 1.0 },
  { lat: 9.0765,   lng: 7.3986,   label: "Abuja",              color: "#1f6fb2", size: 0.7 },
  { lat: 6.335,    lng: 5.6037,   label: "Edo",                color: "#1f6fb2", size: 0.7 },
  { lat: 51.5074,  lng: -0.1278,  label: "London — Clients",   color: "#60a5fa", size: 0.6 },
  { lat: 40.7128,  lng: -74.0060, label: "New York — Clients", color: "#60a5fa", size: 0.6 },
  { lat: 25.2048,  lng: 55.2708,  label: "Dubai — Delivery",   color: "#34d399", size: 0.7 },
  { lat: 5.6037,   lng: -0.1870,  label: "Accra",              color: "#1f6fb2", size: 0.5 },
  { lat: 30.0444,  lng: 31.2357,  label: "Cairo",              color: "#34d399", size: 0.5 },
  { lat: 48.8566,  lng: 2.3522,   label: "Paris",              color: "#60a5fa", size: 0.5 },
  { lat: 1.3521,   lng: 103.8198, label: "Singapore",          color: "#34d399", size: 0.5 },
];

const REGIONS = [
  { icon: Building2, title: "Nigeria Operations",     lines: ["Primary HQ and Engineering Hub", "Lagos · Abuja · Edo"],   iconColor: "#1f6fb2", accentBg: "#eaf4ff", accentBorder: "#bfdbfe" },
  { icon: Globe2,    title: "Global Delivery Model",  lines: ["Distributed Remote Engineering", "Africa · Europe · MENA · Americas"], iconColor: "#059669", accentBg: "#d1fae5", accentBorder: "#6ee7b7" },
  { icon: MapPin,    title: "Market Focus",           lines: ["Enterprise · FinTech · Healthcare", "Government · Logistics · Telecoms"],  iconColor: "#7c3aed", accentBg: "#ede9fe", accentBorder: "#ddd6fe" },
];

// ── Globe wrapper ─────────────────────────────────────────────────────────────
function GlobeWrapper() {
  const [mounted, setMounted] = useState(false);
  const globeRef = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  const handleReady = () => {
    if (!globeRef.current) return;
    const ctrl = globeRef.current.controls();
    ctrl.autoRotate = true;
    ctrl.autoRotateSpeed = 1.4;
    ctrl.enableZoom = false;
    ctrl.enableRotate = false;
    ctrl.enablePan = false;
    globeRef.current.pointOfView({ lat: 8, lng: 20, altitude: 2.2 }, 800);
  };

  if (!mounted) return (
    <div className="w-[380px] h-[380px] flex items-center justify-center">
      <div className="w-[260px] h-[260px] rounded-full bg-blue-900/30 animate-pulse" />
    </div>
  );

  return (
    <Globe
      ref={globeRef}
      width={380}
      height={380}
      backgroundColor="rgba(0,0,0,0)"
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      atmosphereColor="#60a5fa"
      atmosphereAltitude={0.16}
      pointsData={GLOBE_POINTS}
      pointLat="lat"
      pointLng="lng"
      pointLabel="label"
      pointColor="color"
      pointAltitude={0.03}
      pointRadius="size"
      pointsMerge={false}
      onGlobeReady={handleReady}
    />
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function OurLocation() {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeOffice, setActiveOffice] = useState(0);

  useEffect(() => {
    const el = document.getElementById("leaflet-section");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setMapLoaded(true); });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const zoomTo = (coords) => mapRef.current?.flyTo(coords, 13, { duration: 1.4 });

  const handleOfficeClick = (index) => {
    setActiveOffice(index);
    zoomTo(OFFICES[index].position);
  };

  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Our Location — Logicsoft Technologies</h1>

      {/* Breadcrumb */}
      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-10 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/about" className="hover:text-[#1f6fb2] transition-colors">About</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Our Location</span>
        </nav>
      </div>

      {/* Hero — dark with globe */}
      <div className="border-t border-b border-gray-200 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d1f35 0%, #1f3a5f 50%, #1a4a7a 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="pointer-events-none absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="relative z-10 max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              <p className="text-[11px] font-bold text-[#60a5fa] uppercase tracking-[0.16em] mb-4">Where we operate</p>
              <h2 className="text-[38px] lg:text-[52px] font-serif text-white leading-[1.1] mb-5">
                Local Presence.<br />
                <span className="text-[#60a5fa]">Global Reach.</span>
              </h2>
              <p className="text-[17px] text-white/70 leading-[1.9] max-w-[560px] mb-10">
                Headquartered in Lagos with offices in Abuja and Edo — and distributed delivery teams
                serving clients across Africa, Europe, the Middle East, and beyond.
              </p>

              {/* Region cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {REGIONS.map((r, i) => {
                  const Icon = r.icon;
                  return (
                    <div key={i} className="group relative bg-white/8 border border-white/15 px-5 py-4 hover:bg-white/12 hover:border-white/25 transition-all duration-200 backdrop-blur-sm overflow-hidden">
                      <span className="absolute top-0 left-0 right-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#60a5fa] to-transparent" />
                      <div className="w-8 h-8 flex items-center justify-center border mb-3" style={{ background: r.accentBg, borderColor: r.accentBorder }}>
                        <Icon className="w-4 h-4" style={{ color: r.iconColor }} />
                      </div>
                      <p className="text-[13px] font-bold text-white mb-1">{r.title}</p>
                      {r.lines.map((l, j) => <p key={j} className="text-[11.5px] text-white/50 leading-snug">{l}</p>)}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Globe */}
            <div className="shrink-0 flex flex-col items-center gap-4">
              <div className="relative w-[380px] h-[380px]">
                <div className="absolute inset-0 rounded-full bg-[#1f6fb2]/10 blur-[40px]" />
                <GlobeWrapper />
              </div>
              <div className="flex items-center gap-3 text-[11.5px] text-white/50">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#1f6fb2]" /> Nigeria offices</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#60a5fa]" /> European & US clients</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#34d399]" /> MENA delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Office detail cards */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">Our offices</p>
          <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-10">Three locations. One team.</h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {OFFICES.map((office, i) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className={`group relative bg-white border transition-all duration-200 hover:shadow-md cursor-pointer ${activeOffice === i ? "border-[#1f6fb2] shadow-sm" : "border-gray-200 hover:border-gray-300"}`}
                onClick={() => handleOfficeClick(i)}
              >
                <span
                  className={`absolute top-0 left-0 right-0 h-[3px] transition-all duration-300 ${activeOffice === i ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`}
                  style={{ background: `linear-gradient(90deg, ${office.accentColor}, ${office.accentColor}55)` }}
                />
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: office.accentBg }}>
                      <MapPin className="w-4 h-4" style={{ color: office.accentColor }} />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.14em] px-2 py-0.5" style={{ background: office.accentBg, color: office.accentColor }}>{office.type}</span>
                      <p className="text-[16px] font-bold text-[#1f3a5f] mt-1">{office.city}</p>
                    </div>
                  </div>

                  <div className="w-6 h-[2px] mb-4 opacity-40 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" style={{ background: office.accentColor }} />

                  <p className="text-[13px] text-gray-500 leading-[1.85] mb-5">{office.desc}</p>

                  <ul className="space-y-2.5 mb-5">
                    <li className="flex items-start gap-2.5 text-[12.5px] text-gray-500">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: office.accentColor }} />
                      {office.address}
                    </li>
                    <li className="flex items-center gap-2.5 text-[12.5px] text-gray-500">
                      <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: office.accentColor }} />
                      <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="hover:underline">{office.phone}</a>
                    </li>
                    <li className="flex items-center gap-2.5 text-[12.5px] text-gray-500">
                      <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: office.accentColor }} />
                      <a href={`mailto:${office.email}`} className="hover:underline">{office.email}</a>
                    </li>
                    <li className="flex items-center gap-2.5 text-[12.5px] text-gray-500">
                      <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: office.accentColor }} />
                      {office.hours}
                    </li>
                  </ul>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{office.headcount}</span>
                    <button
                      onClick={() => handleOfficeClick(i)}
                      className="flex items-center gap-1 text-[12px] font-semibold transition-colors" style={{ color: office.accentColor }}
                    >
                      View on map <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Leaflet map */}
      <div id="leaflet-section" className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">Office map</p>
          <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-5">Find us on the map.</h3>

          {/* City jump buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {OFFICES.map((o, i) => (
              <button key={i} onClick={() => handleOfficeClick(i)}
                className={`flex items-center gap-1.5 px-4 py-2 border text-[13px] font-semibold transition-all duration-200 ${activeOffice === i ? "bg-[#1f6fb2] border-[#1f6fb2] text-white" : "border-[#1f6fb2] text-[#1f6fb2] hover:bg-[#1f6fb2] hover:text-white"}`}
              >
                <MapPin className="w-3.5 h-3.5" />
                {o.city}
              </button>
            ))}
          </div>

          {/* Map + sidebar */}
          <div className="grid md:grid-cols-[1fr_300px] border border-gray-200 bg-white shadow-sm overflow-hidden" style={{ minHeight: "420px" }}>
            <div className="min-h-[420px]">
              {mapLoaded && <LeafletMap mapRef={mapRef} offices={OFFICES} />}
            </div>

            {/* Sidebar */}
            <div className="border-l border-gray-200 divide-y divide-gray-100">
              {OFFICES.map((o, i) => (
                <div
                  key={i}
                  onClick={() => handleOfficeClick(i)}
                  className={`group p-5 cursor-pointer transition-colors duration-150 ${activeOffice === i ? "bg-[#f0f6ff]" : "hover:bg-[#f9fafb]"}`}
                >
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: o.accentColor }} />
                    <div className="flex-1">
                      <p className={`text-[13.5px] font-bold leading-snug mb-0.5 ${activeOffice === i ? "text-[#1f6fb2]" : "text-[#1f3a5f]"}`}>{o.city}</p>
                      <p className="text-[11.5px] text-gray-400 mb-0.5">{o.address}</p>
                      <p className="text-[11px] text-gray-300">{o.type}</p>
                      <button onClick={() => handleOfficeClick(i)} className="mt-2 flex items-center gap-1 text-[12px] font-semibold transition-all" style={{ color: o.accentColor }}>
                        Zoom in <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Remote delivery note */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
            <div>
              <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">Remote delivery</p>
              <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-5 leading-tight">
                You don't need to be in Lagos<br />to work with us.
              </h3>
              <p className="text-[14px] text-gray-500 leading-[1.9]">
                Our distributed delivery model means we work effectively with clients in any time zone.
                We cover GMT+0 to GMT+5 with real-time overlap, and support asynchronous workflows
                for clients in the Americas and Asia-Pacific.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { region: "West Africa (WAT — GMT+1)",           detail: "Real-time collaboration · Full overlap",          color: "#1f6fb2" },
                { region: "UK & Europe (GMT / BST)",             detail: "2–3 hr overlap mornings. Async afternoons",       color: "#059669" },
                { region: "UAE & MENA (GST — GMT+4)",            detail: "Morning overlap. Dubai team embedded for MENA",   color: "#d97706" },
                { region: "North America (EST/PST)",             detail: "Async delivery. PM coverage until 9pm WAT",       color: "#7c3aed" },
              ].map((r) => (
                <div key={r.region} className="flex items-start gap-4 border border-gray-100 bg-[#f9fafb] px-5 py-4">
                  <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: r.color }} />
                  <div>
                    <p className="text-[13.5px] font-bold text-[#1f3a5f]">{r.region}</p>
                    <p className="text-[12px] text-gray-400">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-[#60a5fa] uppercase tracking-[0.15em] mb-3">Get in touch</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">Walk into any of our offices. Or book a call from anywhere.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">We're reachable by phone, email, or a 30-minute video call. Whatever works for you.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A] ring-1 ring-inset ring-white/30 transition-all duration-200">
              Contact us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about/support" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200">
              Support & help →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}