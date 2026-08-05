"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Search, ChevronDown, ChevronRight, Phone, Mail,
  ArrowRight, X, Menu, Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { searchSite, POPULAR_SEARCHES, getCategoryColor } from "@/lib/search-index";


const DROPDOWNS = {
  about: {
    featured: {
      label: "Why LogicSoft?",
      desc: "200+ projects. 5 years. Clients across Africa, Europe, and the Middle East.",
      href: "/about/about-company",
    },
    columns: [
      {
        title: "Company",
        links: [
          ["About LogicSoft",    "/about/about-company"        ],
          ["Mission & Vision",   "/about/mission"              ],
          ["Leadership",         "/about/leadership"           ],
          ["Our Team",           "/about/our-team"             ],
          ["Client Reviews",     "/about/client-review"        ],
        ],
      },
      {
        title: "Approach",
        links: [
          ["Where to Start",        "/about/where-to-start"       ],
          ["Pricing Models",        "/about/price-models"         ],
          ["Software Approach",     "/about/software-approach"    ],
          ["Sustainability Policy", "/about/sustainability-policy"],
          ["FAQ",                   "/about/faq"                  ],
        ],
      },
      {
        title: "History",
        links: [
          ["Our Journey",     "/about/our-journey"   ],
          ["Awards",          "/about/awards"        ],
          ["Founder's Story", "/about/founders-story"],
        ],
      },
      {
        title: "Connect",
        links: [
          ["Our Location", "/about/location"],
          ["Portfolio",    "/portfolio"     ],
          ["Support",      "/about/support" ],
        ],
      },
    ],
  },
  services: {
    featured: {
      label: "End-to-End Engineering",
      desc: "From architecture to deployment — we own the full delivery cycle.",
      href: "/service",
    },
    columns: [
      {
        title: "Web Development",
        links: [
          ["Frontend Development", "/services/web-development/frontend"  ],
          ["Backend Development",  "/services/web-development/backend"   ],
          ["Full Stack",           "/services/web-development/full-stack"],
        ],
      },
      {
        title: "Mobile Apps",
        links: [
          ["iOS Development", "/services/mobile-apps/ios"           ],
          ["Android Apps",    "/services/mobile-apps/android"       ],
          ["Cross Platform",  "/services/mobile-apps/cross-platform"],
        ],
      },
      {
        title: "Security",
        links: [
          ["Cyber Security",      "/services/security/cyber-security"     ],
          ["Compliance Services", "/services/security/compliance"         ],
          ["Security Testing",    "/services/security/security-testing"   ],
          ["Penetration Testing", "/services/security/penetration-testing"],
          ["SIEM Services",       "/services/security/siem-services"      ],
        ],
      },
      {
        title: "Other Services",
        links: [
          ["DevOps",            "/services/other-services/devops"            ],
          ["Cloud Engineering", "/services/other-services/cloud-engineering" ],
          ["Data Analytics",    "/services/other-services/data-analytics"    ],
          ["Consultation",      "/services/other-services/consultation"      ],
          ["Cost Optimization", "/services/other-services/cost-optimization" ],
        ],
      },
    ],
  },
};

const NAV_LINKS = ["about", "services", "industries", "technologies", "portfolio"];

function SearchOverlay({ query, onClose }) {
  const router    = useRouter();
  const [active, setActive] = useState(-1);
  const results   = query.trim() ? searchSite(query) : [];
  const flatHrefs = results.map((r) => r.href);

  const go = useCallback((href) => { router.push(href); onClose(); }, [router, onClose]);
  const goSearch = useCallback(() => {
    if (query.trim()) { router.push(`/search?q=${encodeURIComponent(query.trim())}`); onClose(); }
  }, [query, router, onClose]);

  useEffect(() => {
    const handle = (e) => {
      if (e.key === "Escape")    { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(i + 1, flatHrefs.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setActive((i) => Math.max(i - 1, -1)); }
      if (e.key === "Enter")     {
        e.preventDefault();
        if (active >= 0 && flatHrefs[active]) go(flatHrefs[active]);
        else goSearch();
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [active, flatHrefs, go, goSearch, onClose]);

  useEffect(() => setActive(-1), [query]);

  const grouped = results.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {});

  return (
    <motion.div
      role="listbox"
      aria-label="Search results"
      initial={{ opacity: 0, y: -6, scale: 0.99 }}
      animate={{ opacity: 1, y: 0,  scale: 1     }}
      exit={{    opacity: 0, y: -4, scale: 0.99  }}
      transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
      className="absolute right-0 top-[calc(100%+6px)] w-[480px] max-h-[70vh] overflow-y-auto bg-white border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.13)] z-[9998]"
      style={{ scrollbarWidth: "thin" }}
    >
      {/* Popular searches field that generates are users type in a letter // Added by Elijah at 28 march (DO NOT TOUCH !) */}
      {!query.trim() && (
        <div className="p-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.14em] mb-3">Popular searches</p>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_SEARCHES.map((item) => (
              <button key={item.href} onClick={() => go(item.href)}
                className="text-[12px] font-semibold text-[#1f3a5f] border border-[#e8eef6] bg-[#f8fafd] px-3 py-1.5 hover:border-[#1f6fb2]/40 hover:text-[#1f6fb2] hover:bg-[#eff6ff] transition-all duration-150">
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-[#f1f5f9]">
            <Link href="/services" onClick={onClose} className="text-[12px] font-semibold text-[#1f6fb2] hover:text-[#1f3a5f] transition-colors flex items-center gap-1.5">
              Browse all services <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {query.trim() && results.length > 0 && (
        <>
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[#f1f5f9] px-4 py-2 flex items-center justify-between z-10">
            <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-[0.11em]">
              {results.length} result{results.length !== 1 ? "s" : ""}
              <span className="normal-case font-normal text-gray-500"> for </span>
              <span className="text-[#1f3a5f] normal-case">"{query}"</span>
            </p>
            <button onClick={goSearch} className="text-[11px] font-semibold text-[#1f6fb2] hover:text-[#1f3a5f] transition-colors flex items-center gap-1">
              See all <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>

          {Object.entries(grouped).map(([category, items]) => {
            const c = getCategoryColor(category);
            return (
              <div key={category}>
                <div className="flex items-center gap-2 px-4 pt-3 pb-1">
                  <span className="w-[6px] h-[6px] rounded-full shrink-0" style={{ background: c.dot }} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.16em]" style={{ color: c.text }}>{category}</span>
                </div>
                {items.map((item) => {
                  const idx = flatHrefs.indexOf(item.href);
                  const isActive = active === idx;
                  const q = query.toLowerCase();
                  const tl = item.title.toLowerCase();
                  const matchAt = tl.indexOf(q);
                  return (
                    <button key={item.id} onClick={() => go(item.href)} onMouseEnter={() => setActive(idx)}
                      role="option"
                      aria-selected={isActive}
                      className={`w-full text-left flex items-start gap-3 px-4 py-2.5 transition-colors duration-75 ${isActive ? "bg-[#f0f7ff]" : "hover:bg-[#f8fafd]"}`}>
                      <div className="w-[3px] self-stretch shrink-0 mt-0.5 rounded-full" style={{ background: isActive ? c.dot : "transparent", minHeight: 20 }} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-[13.5px] font-semibold leading-snug ${isActive ? "text-[#1f6fb2]" : "text-[#1f3a5f]"}`}>
                          {matchAt >= 0 ? (<>{item.title.slice(0, matchAt)}<mark className="bg-[#fef9c3] text-[#78350f] rounded-[2px] px-[1px] not-italic font-bold">{item.title.slice(matchAt, matchAt + query.length)}</mark>{item.title.slice(matchAt + query.length)}</>) : item.title}
                        </p>
                        <p className="text-[10.5px] text-gray-400 mt-0.5 leading-none truncate">{item.section}</p>
                        <p className="text-[12px] text-gray-500 mt-1 leading-snug line-clamp-1">{item.description}</p>
                      </div>
                      <ArrowRight className={`w-3.5 h-3.5 mt-1 shrink-0 transition-opacity ${isActive ? "opacity-100 text-[#1f6fb2]" : "opacity-0"}`} />
                    </button>
                  );
                })}
              </div>
            );
          })}

          <div className="sticky bottom-0 bg-[#f8fafd] border-t border-[#e8eef6] px-4 py-2.5 flex items-center justify-between">
            <p className="text-[11px] text-gray-400">↑↓ navigate · Enter to go</p>
            <button onClick={goSearch} className="text-[11.5px] font-semibold text-[#1f6fb2] hover:text-[#1f3a5f] transition-colors flex items-center gap-1.5">
              Full results for "{query}" <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </>
      )}

      {query.trim() && results.length === 0 && (
        <div className="px-5 py-10 text-center">
          <Search className="w-8 h-8 text-gray-200 mx-auto mb-3" />
          <p className="text-[14px] font-semibold text-[#1f3a5f] mb-1">No results for "{query}"</p>
          <p className="text-[12.5px] text-gray-400 mb-5 max-w-[240px] mx-auto">Try different keywords, or browse our services directly.</p>
          <Link href="/services" onClick={onClose} className="inline-flex items-center gap-2 text-[12.5px] font-bold text-[#1f6fb2] hover:text-[#1f3a5f] transition-colors">
            Browse all services <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </motion.div>
  );
}

function MobileDrawer({ open, onClose }) {
  const [expanded, setExpanded] = useState(null);
  const pathname = usePathname();

  useEffect(() => { onClose(); setExpanded(null); }, [pathname]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else      document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const toggleSection = (key) => setExpanded((prev) => (prev === key ? null : key));

  const drawerVariants = {
    hidden:  { x: "100%", opacity: 0   },
    visible: { x: 0,      opacity: 1,  transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
    exit:    { x: "100%", opacity: 0,  transition: { duration: 0.24, ease: [0.64, 0, 0.78, 0] } },
  };

  const sectionVariants = {
    hidden:  { height: 0,      opacity: 0 },
    visible: { height: "auto", opacity: 1, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
    exit:    { height: 0,      opacity: 0, transition: { duration: 0.18 } },
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[2147483640]"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            variants={drawerVariants}
            initial="hidden" animate="visible" exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="fixed top-0 right-0 h-[100dvh] w-full max-w-[320px] bg-white z-[2147483647] flex flex-col shadow-[−20px_0_60px_rgba(0,0,0,0.15)] overflow-hidden"
          >
            {/* ── Drawer header ── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8eef6] bg-[#f8fafc] shrink-0">
              <div className="flex items-center gap-2.5">
                    <img src="/favicon.ico" alt="LogicSoft" className="w-12 h-12" />
                <div>
                  <p className="text-[12px] font-bold text-[#1f3a5f] leading-none">LogicSoft</p>
                  <p className="text-[8.5px] font-semibold text-[#1f6fb2] uppercase tracking-[0.15em] leading-none mt-0.5">Technologies</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center border border-[#e8eef6] hover:border-[#1f6fb2]/30 hover:bg-[#f0f7ff] transition-all"
                aria-label="Close menu"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* ── Scrollable nav body ── */}
            <div className="flex-1 overflow-y-auto overscroll-contain" style={{ scrollbarWidth: "none" }}>

              {/* Quick contact strip */}
              <div className="flex border-b border-[#e8eef6]">
                <a href="tel:+2349012688861"
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-[11.5px] font-semibold text-[#1f3a5f] hover:bg-[#f0f7ff] transition-colors border-r border-[#e8eef6]">
                  <Phone className="w-3.5 h-3.5 text-[#1f6fb2]" /> Call us
                </a>
                <a href="mailto:contact@logicsofttechnologies.online"
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-[11.5px] font-semibold text-[#1f3a5f] hover:bg-[#f0f7ff] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#1f6fb2]" /> Email us
                </a>
              </div>

              {/* Nav items */}
              <nav aria-label="Mobile navigation">

                {/* About + Services accordions */}
                {["about", "services"].map((key) => {
                  const isOpen  = expanded === key;
                  const label   = key.charAt(0).toUpperCase() + key.slice(1);
                  const dd      = DROPDOWNS[key];

                  return (
                    <div key={key} className="border-b border-[#f1f5f9]">
                      <button
                        onClick={() => toggleSection(key)}
                        aria-expanded={isOpen}
                        aria-controls={`mobile-dropdown-${key}`}
                        className={`w-full flex items-center justify-between px-5 py-4 text-[14px] font-semibold transition-colors ${isOpen ? "text-[#1f6fb2] bg-[#f8fafd]" : "text-[#1f3a5f] hover:text-[#1f6fb2] hover:bg-[#f8fafd]"}`}
                      >
                        <span>{label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#1f6fb2]" : "text-gray-400"}`} />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            id={`mobile-dropdown-${key}`}
                            variants={sectionVariants}
                            initial="hidden" animate="visible" exit="exit"
                            style={{ overflow: "hidden" }}
                          >
                            {/* Featured link */}
                            <Link href={dd.featured.href}
                              className="flex items-start gap-3 mx-4 mb-3 mt-1 p-3 bg-gradient-to-br from-[#eaf6ff] to-[#dff0ff] border border-[#bfdbfe]/60 hover:border-[#1f6fb2]/40 transition-colors group">
                              <div className="flex-1 min-w-0">
                                <p className="text-[11.5px] font-bold text-[#1f6fb2] mb-0.5">{dd.featured.label}</p>
                                <p className="text-[11px] text-gray-500 leading-snug line-clamp-2">{dd.featured.desc}</p>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-[#1f6fb2] mt-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                            </Link>

                            {/* Columns flattened into sections */}
                            {dd.columns.map((col) => (
                              <div key={col.title} className="px-4 mb-4">
                                <p className="text-[9.5px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-1.5 px-1">{col.title}</p>
                                {col.links.map(([name, href]) => (
                                  <Link key={name} href={href}
                                    className="flex items-center gap-2.5 px-2 py-2 text-[13px] text-gray-600 hover:text-[#1f6fb2] hover:bg-[#f0f7ff] transition-all rounded-[2px] group">
                                    <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#1f6fb2] transition-colors shrink-0" />
                                    {name}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Simple nav links */}
                {["industries", "technologies", "portfolio"].map((link) => (
                  <Link key={link} href={`/${link}`}
                    className="flex items-center justify-between px-5 py-4 text-[14px] font-semibold text-[#1f3a5f] hover:text-[#1f6fb2] hover:bg-[#f8fafd] border-b border-[#f1f5f9] transition-colors group">
                    <span className="capitalize">{link}</span>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#1f6fb2] transition-colors" />
                  </Link>
                ))}

                {/* Additional quick links */}
                <div className="px-5 pt-4 pb-2">
                  <p className="text-[9.5px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">Quick links</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      ["Client Reviews", "/about/client-review"],
                      ["Our Journey",    "/about/our-journey"  ],
                      ["Careers",        "/careers"            ],
                      ["Support",        "/about/support"      ],
                    ].map(([label, href]) => (
                      <Link key={label} href={href}
                        className="text-[12px] font-semibold text-gray-600 hover:text-[#1f6fb2] border border-[#e8eef6] bg-[#f8fafc] px-3 py-2 hover:border-[#1f6fb2]/30 hover:bg-[#f0f7ff] transition-all">
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mx-5 my-4 p-3 bg-[#f8fafc] border border-[#e8eef6]">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.14em] mb-2">Certifications</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["ISO 27001", "GDPR", "NDPR", "SOC 2"].map((c) => (
                      <span key={c} className="text-[9.5px] font-bold text-[#1f3a5f] border border-[#e8eef6] bg-white px-2 py-0.5">{c}</span>
                    ))}
                  </div>
                </div>
              </nav>
            </div>

            {/* ── CTA footer — always visible ── */}
            <div className="shrink-0 border-t border-[#e8eef6] bg-white p-4 space-y-2.5">
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-center gap-2.5 w-full py-3.5 text-[13.5px] font-bold text-white transition-all"
                style={{ background: "linear-gradient(135deg,#7A2E00,#C45500 50%,#FF7A00)", boxShadow: "0 4px 16px rgba(196,85,0,0.3)" }}
              >
                Request a consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="https://wa.me/2349012688861"
                className="flex items-center justify-center gap-2.5 w-full py-3 text-[13px] font-semibold text-[#1f3a5f] border border-[#e8eef6] hover:border-[#1f6fb2]/30 hover:bg-[#f0f7ff] transition-all">
                <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp us
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MobileSearchPanel({ query, onChange, onClose }) {
  const router  = useRouter();
  const results = query.trim() ? searchSite(query) : [];
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const go = (href) => { router.push(href); onClose(); };
  const goSearch = () => {
    if (query.trim()) { router.push(`/search?q=${encodeURIComponent(query.trim())}`); onClose(); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1,  y: 0  }}
      exit={{    opacity: 0,  y: -8 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 right-0 top-full bg-white border-b border-gray-200 shadow-[0_12px_40px_rgba(0,0,0,0.1)] z-[9998] max-h-[70vh] overflow-y-auto"
    >
      {/* Input row */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#f1f5f9]">
        <Search className="w-4 h-4 text-gray-400 shrink-0" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && goSearch()}
          placeholder="Search services, industries…"
          aria-label="Search services and industries"
          className="flex-1 text-[14px] text-gray-800 outline-none placeholder:text-gray-400 bg-transparent"
        />
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600" aria-label="Close search">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Results */}
      {!query.trim() && (
        <div className="p-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.14em] mb-3">Popular searches</p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map((item) => (
              <button key={item.href} onClick={() => go(item.href)}
                className="text-[12px] font-semibold text-[#1f3a5f] border border-[#e8eef6] bg-[#f8fafd] px-3 py-1.5 hover:border-[#1f6fb2]/40 hover:text-[#1f6fb2] transition-all">
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {query.trim() && results.length > 0 && (
        <div>
          {results.slice(0, 8).map((item) => {
            const c = getCategoryColor(item.category);
            return (
              <button key={item.id} onClick={() => go(item.href)}
                className="w-full text-left flex items-center gap-3 px-4 py-3 border-b border-[#f8fafc] hover:bg-[#f8fafd] transition-colors">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: c.dot }} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-semibold text-[#1f3a5f] truncate">{item.title}</p>
                  <p className="text-[11px] text-gray-400 truncate">{item.section}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
              </button>
            );
          })}
          {results.length > 8 && (
            <button onClick={goSearch} className="w-full py-3 text-[12.5px] font-bold text-[#1f6fb2] hover:text-[#1f3a5f] hover:bg-[#f8fafd] transition-colors text-center">
              View all {results.length} results →
            </button>
          )}
        </div>
      )}

      {query.trim() && results.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-[14px] font-semibold text-[#1f3a5f] mb-1">No results for "{query}"</p>
          <Link href="/services" onClick={onClose} className="text-[12.5px] font-bold text-[#1f6fb2]">Browse all services →</Link>
        </div>
      )}
    </motion.div>
  );
}

const Navbar = () => {
  const [clicked,      setClicked]      = useState("");
  const [scrolled,     setScrolled]     = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [mobileQuery,  setMobileQuery]  = useState("");
  const [query,        setQuery]        = useState("");

  const searchRef     = useRef(null);
  const searchWrapRef = useRef(null);
  const pathname      = usePathname();

  const isHome         = pathname === "/";
  const isDropdownOpen = clicked !== "";
  const showSolid      = !isHome || scrolled || isDropdownOpen || mobileOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setClicked(""); setSearchOpen(false); setQuery("");
    setMobileOpen(false); setMobileSearch(false); setMobileQuery("");
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus(); // Function added by Elijah march 23rd d not touch please 🙏
  }, [searchOpen]);

  // Click-away for desktop search
  useEffect(() => {
    if (!searchOpen) return;
    const handler = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setSearchOpen(false); setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [searchOpen]);

  const toggle      = (link) => setClicked((prev) => prev === link ? "" : link);
  const closeSearch = () => { setSearchOpen(false); setQuery(""); };
  const closeMobileSearch = () => { setMobileSearch(false); setMobileQuery(""); };

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${showSolid ? "bg-white shadow-[0_2px_20px_rgba(0,0,0,0.07)]" : "bg-transparent"}`}
      >
        {/* ── Utility bar (desktop only) ── */}
        <div className={`hidden md:block transition-colors duration-300 ${showSolid ? "bg-[#1f3a5f]" : "bg-transparent"}`}>
          <div className={`max-w-[82rem] mx-auto px-4 py-[5px] flex items-center gap-6 text-[11.5px] transition-colors duration-300 ${showSolid ? "text-white/70" : "text-gray-800"}`}>
            <a href="mailto:contact@logicsofttechnologies.online"
              className={`flex items-center gap-1.5 transition-colors duration-150 ${showSolid ? "hover:text-white" : "hover:text-[#1f6fb2]"}`}>
              <Mail className="w-3 h-3" /> contact@logicsofttechnologies.online
            </a>
            <a href="tel:+2349012688861"
              className={`flex items-center gap-1.5 transition-colors duration-150 ${showSolid ? "hover:text-white" : "hover:text-[#1f6fb2]"}`}>
              <Phone className="w-3 h-3" /> +234 9012 688 861
            </a>
            <div className="ml-auto flex items-center gap-5">
              <span className={showSolid ? "text-white/30" : "text-gray-300"}>|</span>
              <Link href="/portfolio" className={`transition-colors duration-150 ${showSolid ? "hover:text-white" : "hover:text-[#1f6fb2]"}`}>Portfolio</Link>
              <Link href="/about/client-review" className={`transition-colors duration-150 ${showSolid ? "hover:text-white" : "hover:text-[#1f6fb2]"}`}>Client Reviews</Link>
            </div>
          </div>
        </div>

        {/* ── Main bar ── */}
        <div className={`relative transition-all duration-300 border-b ${isDropdownOpen ? "border-gray-200" : "border-transparent"} ${showSolid ? "bg-white" : "bg-transparent"}`}>
          <div className="max-w-[82rem] mx-auto px-4 py-3 flex items-center">

            {/* Logo */}
            <Link href="/" aria-label="LogicSoft Technologies — Home" className="flex items-center shrink-0 mr-6">
              <Image src="/images/logicsoft-logo.png" alt="LogicSoft Technologies" width={148} height={26} priority className="h-7 w-auto md:h-8 lg:h-9"/>
            </Link>

            {/* ── DESKTOP nav ── */}
            <div className="hidden md:flex items-center gap-1 ml-auto">
              {NAV_LINKS.map((link) => {
                const isActive    = clicked === link;
                const hasDropdown = link === "about" || link === "services";
                const label       = link.charAt(0).toUpperCase() + link.slice(1);

                return hasDropdown ? (
                  <button key={link} type="button" onClick={() => toggle(link)}
                    aria-expanded={isActive}
                    aria-haspopup="true"
                    aria-controls={`dropdown-${link}`}
                    className={`relative flex items-center gap-1 px-3 py-2 text-[14px] font-medium transition-colors duration-150 ${isActive ? "text-[#1f6fb2] bg-blue-50" : "text-gray-700 hover:text-[#1f3a5f] hover:bg-gray-50"}`}>
                    {label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-250 ${isActive ? "rotate-180 text-[#1f6fb2]" : "text-gray-400"}`} />
                    {isActive && <motion.span layoutId="navUnderline" className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#1f6fb2]" />}
                  </button>
                ) : (
                  <Link key={link} href={`/${link}`}
                    className="px-3 py-2 text-[14px] font-medium text-gray-700 hover:text-[#1f3a5f] hover:bg-gray-50 transition-colors duration-150 capitalize">
                    {label}
                  </Link>
                );
              })}

              <span className="w-px h-5 bg-gray-200 mx-3" />

              {/* Contact CTA */}
              <div className="relative inline-flex items-center justify-center">
                {[0, 0.2].map((delay, i) => (
                  <motion.span key={i} className="absolute inset-0 pointer-events-none"
                    style={{ border: `${i === 0 ? 2 : 1}px solid rgba(196,85,0,${i === 0 ? 0.65 : 0.4})` }}
                    initial={{ scale: 0.96, opacity: 0 }}
                    animate={{ scale: [0.96, 1.32, 1.32], opacity: [0, 0.6, 0] }}
                    transition={{ duration: i === 0 ? 1.5 : 2, ease: "easeOut", repeat: Infinity, repeatDelay: 3, delay }} />
                ))}
                <Link href="/contact"
                  className="relative z-10 px-5 py-[8px] text-[13.5px] font-bold text-white bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A] ring-1 ring-inset ring-white/30 transition-all duration-200 whitespace-nowrap">
                  Contact us 
                </Link>
              </div>

              {/* Desktop search */}
              <div ref={searchWrapRef} className="relative ml-2">
                <AnimatePresence mode="wait">
                  {searchOpen ? (
                    <motion.div key="search-input"
                      initial={{ width: 0, opacity: 0 }} animate={{ width: 220, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="flex items-center border border-gray-200 bg-gray-50 overflow-hidden">
                      <Search className="w-3.5 h-3.5 text-gray-400 ml-3 shrink-0" />
                      <input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search…"
                        aria-label="Search site"
                        className="flex-1 px-2.5 py-2 text-[13px] bg-transparent outline-none text-gray-800 placeholder:text-gray-400" />
                      <button onClick={closeSearch} className="p-2 text-gray-400 hover:text-gray-600" aria-label="Close search">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.button key="search-icon"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onClick={() => setSearchOpen(true)}
                      className="p-2 text-gray-500 hover:text-[#1f3a5f] hover:bg-gray-50 transition-colors duration-150" aria-label="Open search">
                      <Search className="w-4 h-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {searchOpen && <SearchOverlay query={query} onClose={closeSearch} />}
                </AnimatePresence>
              </div>
            </div>

            {/* ── MOBILE controls ── */}
            <div className="md:hidden flex items-center gap-2 ml-auto">
              {/* Mobile search icon */}
              <button
                onClick={() => { setMobileSearch((v) => !v); setMobileQuery(""); setMobileOpen(false); }}
                className="p-2 text-gray-500 hover:text-[#1f3a5f] transition-colors"
                aria-label="Search"
              >
                {mobileSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>

              {/* Hamburger */}
              <button
                onClick={() => { setMobileOpen((v) => !v); setMobileSearch(false); }}
                className={`p-2 transition-colors ${mobileOpen ? "text-[#1f6fb2]" : "text-gray-600 hover:text-[#1f3a5f]"}`}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X className="w-5 h-5" />
                    </motion.span>
                  ) : (
                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu className="w-5 h-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

          </div>

          {/* Mobile search panel */}
          <AnimatePresence>
            {mobileSearch && (
              <MobileSearchPanel
                query={mobileQuery}
                onChange={setMobileQuery}
                onClose={closeMobileSearch}
              />
            )}
          </AnimatePresence>
        </div>

        {/* ── DESKTOP mega dropdown ── */}
        <AnimatePresence>
          {isDropdownOpen && DROPDOWNS[clicked] && (
            <motion.div
              id={`dropdown-${clicked}`}
              role="region"
              aria-label={`${clicked} menu`}
              variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: "easeOut" } }, exit: { opacity: 0, y: -6, transition: { duration: 0.18 } } }}
              initial="hidden" animate="visible" exit="exit"
              className="hidden md:block absolute left-0 top-full w-full bg-white border-b border-gray-200 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
            >
              <div className="max-w-[82rem] mx-auto px-4 py-8 grid grid-cols-5 gap-8">
                <div className="col-span-1 bg-gradient-to-br from-[#eaf6ff] to-[#dff0ff] p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-3">
                      {clicked === "about" ? "About us" : "Our services"}
                    </p>
                    <h4 className="text-[16px] font-serif font-bold text-[#1f3a5f] leading-snug mb-3">
                      {DROPDOWNS[clicked].featured.label}
                    </h4>
                    <p className="text-[12.5px] text-gray-500 leading-relaxed">{DROPDOWNS[clicked].featured.desc}</p>
                  </div>
                  <Link href={DROPDOWNS[clicked].featured.href}
                    className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-bold text-[#1f6fb2] hover:gap-2.5 transition-all duration-200">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                {DROPDOWNS[clicked].columns.map((col, ci) => (
                  <div key={col.title} className={ci > 0 ? "border-l border-gray-100 pl-6" : ""}>
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.14em] mb-4 pb-2 border-b border-gray-100">{col.title}</h3>
                    <ul className="space-y-1">
                      {col.links.map(([name, href]) => (
                        <li key={name}>
                          <Link href={href} className="flex items-center gap-1.5 py-1.5 px-2 text-[13.5px] text-gray-600 hover:text-[#1f6fb2] hover:bg-blue-50 transition-all duration-150 group">
                            <span className="w-1 h-1 rounded-full bg-gray-200 group-hover:bg-[#1f6fb2] transition-colors duration-150 shrink-0" />
                            {name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 bg-[#f9f9f9]">
                <div className="max-w-[82rem] mx-auto px-4 py-3 flex items-center gap-4">
                  <span className="text-[12.5px] font-medium text-gray-500 whitespace-nowrap">Find exactly what you need:</span>
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input type="text" placeholder="Search services, industries, technologies…"
                      aria-label="Search services, industries, and technologies"
                      className="w-full h-9 pl-9 pr-4 text-[13px] text-gray-800 placeholder:text-gray-400 bg-white border border-gray-200 focus:outline-none focus:border-[#1f6fb2] focus:ring-1 focus:ring-[#1f6fb2]/20 transition-all duration-200" />
                  </div>
                  <div className="ml-auto flex items-center gap-4 text-[12px] text-gray-400">
                    <span>Popular:</span>
                    {["Full Stack Dev", "Cyber Security", "Cloud Engineering"].map((s) => (
                      <Link key={s} href="#" className="hover:text-[#1f6fb2] transition-colors duration-150 underline underline-offset-2">{s}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </nav>

      {/* Mobile Drawer // Added by Elijah do not touch */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default Navbar;