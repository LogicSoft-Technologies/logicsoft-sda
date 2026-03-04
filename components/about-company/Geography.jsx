"use client";

import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapPin, Globe2, Building2, ArrowUpRight } from "lucide-react";

const LeafletMap = dynamic(() => import("./LeafletMapClient"), { ssr: false });

const offices = [
  { name: "Logicsoft HQ – Lagos",     position: [6.5244, 3.3792], city: "Lagos" },
  { name: "Logicsoft Branch – Abuja", position: [9.0765, 7.3986], city: "Abuja" },
  { name: "Logicsoft Branch – Edo",   position: [6.335,  5.6037], city: "Edo"   },
];

const regions = [
  {
    icon: Building2,
    title: "Nigeria Operations",
    lines: ["Primary Headquarters and Engineering Hub", "Locations: Lagos, Abuja, Edo"],
    iconColor: "#1d4ed8", badgeBg: "#dbeafe", badgeBorder: "#bfdbfe",
  },
  {
    icon: Globe2,
    title: "Global Delivery Model",
    lines: ["Distributed Remote Engineering Teams", "Serving North America, Europe, and MENA"],
    iconColor: "#059669", badgeBg: "#d1fae5", badgeBorder: "#6ee7b7",
  },
  {
    icon: MapPin,
    title: "Enterprise Market Focus",
    lines: ["Cloud Infrastructure, AI, Software Engineering", "Scalable enterprise delivery frameworks"],
    iconColor: "#7c3aed", badgeBg: "#ede9fe", badgeBorder: "#ddd6fe",
  },
];

export default function Geography() {
  const mapRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = document.getElementById("geography");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setLoaded(true); });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const zoomTo = (coords) => mapRef.current?.flyTo(coords, 12, { duration: 1.4 });

  return (
    <section
      id="geography"
      aria-labelledby="geography-heading"
      className="py-12 sm:py-20 bg-white border-t border-gray-200"
    >
      <div className="max-w-[82rem] mx-auto px-4 sm:px-6">

        <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-4">
          Where we operate
        </p>

        <h2
          id="geography-heading"
          className="text-[26px] sm:text-[32px] lg:text-[36px] font-serif text-[#1f3a5f] mb-4 sm:mb-6"
        >
          Global Presence
        </h2>

        <p className="text-[15px] sm:text-[17px] text-gray-700 leading-[1.85] sm:leading-[2] mb-10 sm:mb-14 max-w-[1100px]">
          Logicsoft Technologies is a global software engineering and digital
          transformation company with strategic operations across Africa and
          distributed delivery teams worldwide. Our geographical footprint enables
          us to deliver scalable enterprise solutions with local presence and global
          execution standards.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 mb-8 sm:mb-10">
          {regions.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={i}
                className="group relative bg-white flex flex-col border border-gray-200 px-5 sm:px-6 pt-5 sm:pt-6 pb-4 sm:pb-5 overflow-hidden hover:border-[#1f6fb2] hover:shadow-sm transition-all duration-300"
              >
                <span
                  className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-300 transition-all duration-500 ease-out group-hover:w-full"
                  aria-hidden="true"
                />
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border shrink-0"
                    style={{ backgroundColor: r.badgeBg, borderColor: r.badgeBorder }}
                  >
                    <Icon className="w-4 h-4" style={{ color: r.iconColor }} aria-hidden="true" />
                  </div>
                  <h3 className="text-[13.5px] sm:text-[14px] font-semibold text-[#1f3a5f] group-hover:text-[#1f6fb2] transition-colors duration-200">
                    {r.title}
                  </h3>
                </div>
                {r.lines.map((l, j) => (
                  <p key={j} className="text-[12.5px] sm:text-[13px] text-gray-500 leading-[1.85]">{l}</p>
                ))}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-5">
          {offices.map((o, i) => (
            <button
              key={i}
              onClick={() => zoomTo(o.position)}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 border border-[#1f6fb2] text-[#1f6fb2] text-[12.5px] sm:text-[13px] font-medium hover:bg-[#1f6fb2] hover:text-white transition-all duration-200"
            >
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              {o.city}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:grid md:grid-cols-[1fr_280px] border border-gray-200 bg-white shadow-sm overflow-hidden">

          {loaded && <LeafletMap mapRef={mapRef} offices={offices} />}

          <div className="border-t md:border-t-0 md:border-l border-gray-200 divide-y divide-gray-100">
            {offices.map((o, i) => (
              <div
                key={i}
                className="group p-4 sm:p-5 hover:bg-[#f9fafb] transition-colors duration-150"
              >
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#1f6fb2] mt-0.5 shrink-0" aria-hidden="true" />
                  <div className="flex-1">
                    <h4 className="text-[13px] sm:text-[13.5px] font-semibold text-[#1f3a5f] leading-snug mb-1">
                      {o.name}
                    </h4>
                    <p className="text-[12px] sm:text-[12.5px] text-gray-400">
                      Logicsoft Technologies — Regional Office
                    </p>
                    <button
                      onClick={() => zoomTo(o.position)}
                      className="mt-2 flex items-center gap-1 text-[12px] sm:text-[12.5px] font-medium text-[#1f6fb2] hover:gap-1.5 transition-all duration-200"
                    >
                      View on map
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}