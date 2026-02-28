"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown, Phone, Mail, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// ── Dropdown data ─────────────────────────────────────────────────────────────
const DROPDOWNS = {
  about: {
    featured: {
      label: "Why LogicSoft?",
      desc: "300+ projects. 12 years. Clients across Africa, Europe, and the Middle East.",
      href: "/about/about-company",
    },
    columns: [
      {
        title: "Company",
        links: [
          ["About LogicSoft",   "/about/about-company"        ],
          ["Mission & Vision",  "/about/mission"              ],
          ["Leadership",        "/about/leadership"           ],
          ["Our Team",          "/about/our-team"             ],
          ["Client Reviews",    "/about/client-review"        ],
        ],
      },
      {
        title: "Approach",
        links: [
          ["Where to Start",       "/about/where-to-start"        ],
          ["Pricing Models",       "/about/price-models"          ],
          ["Software Approach",    "/about/software-approach"     ],
          ["Sustainability Policy","/about/sustainability-policy" ],
          ["FAQ",                  "/about/faq"                   ],
        ],
      },
      {
        title: "History",
        links: [
          ["Our Journey",    "/about/our-journey"    ],
          ["Awards",         "/about/awards"         ],
          ["Founder's Story","/about/founders-story" ],
        ],
      },
      {
        title: "Connect",
        links: [
          ["Our Location", "/about/location"  ],
          ["Portfolio",    "/portfolio"        ],
          ["Support",      "/about/support"   ],
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
          ["Frontend Development", "/services/web-development/frontend"   ],
          ["Backend Development",  "/services/web-development/backend"    ],
          ["Full Stack",           "/services/web-development/full-stack" ],
        ],
      },
      {
        title: "Mobile Apps",
        links: [
          ["iOS Development",  "/services/mobile-apps/ios"            ],
          ["Android Apps",     "/services/mobile-apps/android"        ],
          ["Cross Platform",   "/services/mobile-apps/cross-platform" ],
        ],
      },
      {
        title: "Security",
        links: [
          ["Cyber Security",       "/services/security/cyber-security"      ],
          ["Compliance Services",  "/services/security/compliance"          ],
          ["Security Testing",     "/services/security/security-testing"    ],
          ["Penetration Testing",  "/services/security/penetration-testing" ],
          ["SIEM Services",        "/services/security/siem-services"       ],
        ],
      },
      {
        title: "Other Services",
        links: [
          ["DevOps",           "/services/other-services/devops"                            ],
          ["Cloud Engineering","/services/other-services/cloud-engineering" ],
          ["Data Analytics",   "/services/other-services/data-analytics"    ],
          ["Consultation",     "/services/other-services/consultation"      ],
          ["Cost Optimization","/services/other-services/cost-optimization" ],
        ],
      },
    ],
  },
};

const NAV_LINKS = ["about", "services", "industries", "technologies", "portfolio"];

// ── Animations ────────────────────────────────────────────────────────────────
const dropdownVariants = {
  hidden:  { opacity: 0, y: -8  },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: "easeOut" } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.18, ease: "easeIn"  } },
};

// ── Component ─────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [clicked,   setClicked]   = useState("");
  const [scrolled,  setScrolled]  = useState(false);
  const [searchOpen,setSearchOpen]= useState(false);
  const [query,     setQuery]     = useState("");
  const searchRef = useRef(null);
  const pathname  = usePathname();

  const isHome        = pathname === "/";
  const isDropdownOpen = clicked !== "";
  const showSolid     = !isHome || scrolled || isDropdownOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setClicked(""); setSearchOpen(false); }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const toggle = (link) => setClicked((prev) => (prev === link ? "" : link));

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${showSolid ? "bg-white shadow-[0_2px_20px_rgba(0,0,0,0.07)]" : "bg-transparent"}`}>

      {/* ── Utility bar ── */}
      <div className={`transition-colors duration-300 ${showSolid ? "bg-[#1f3a5f]" : "bg-transparent"}`}>
        <div className={`max-w-[82rem] mx-auto px-4 py-[5px] flex items-center gap-6 text-[11.5px] transition-colors duration-300 ${showSolid ? "text-white/70" : "text-gray-800"}`}>
          <a href="mailto:contact@logicsoft.com"
            className={`flex items-center gap-1.5 transition-colors duration-150 ${showSolid ? "hover:text-white" : "hover:text-[#1f6fb2]"}`}>
            <Mail className="w-3 h-3" />
            contact@logicsoft.com
          </a>
          <a href="tel:+2349012688861"
            className={`flex items-center gap-1.5 transition-colors duration-150 ${showSolid ? "hover:text-white" : "hover:text-[#1f6fb2]"}`}>
            <Phone className="w-3 h-3" />
            +234 9012 688 861
          </a>
          <div className="ml-auto flex items-center gap-5">
            <span className={showSolid ? "text-white/30" : "text-gray-300"}>|</span>
            <Link href="/portfolio"
              className={`transition-colors duration-150 ${showSolid ? "hover:text-white" : "hover:text-[#1f6fb2]"}`}>
              Portfolio
            </Link>
            <Link href="/about/client-review"
              className={`transition-colors duration-150 ${showSolid ? "hover:text-white" : "hover:text-[#1f6fb2]"}`}>
              Client Reviews
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main bar ── */}
      <div className={`relative transition-all duration-300 border-b ${isDropdownOpen ? "border-gray-200" : "border-transparent"} ${showSolid ? "bg-white" : "bg-transparent"}`}>
        <div className="max-w-[82rem] mx-auto px-4 py-3 flex items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 mr-10">
            <Image
              src="/images/logicsoft-logo.png"
              alt="LogicSoft Technologies"
              width={160}
              height={28}
              priority
            />
          </Link>

          {/* Right side — nav links + CTA + search */}
          <div className="hidden md:flex items-center gap-1 ml-auto">

            {/* Nav links */}
            {NAV_LINKS.map((link) => {
              const isActive    = clicked === link;
              const hasDropdown = link === "about" || link === "services";
              const label       = link.charAt(0).toUpperCase() + link.slice(1);

              return hasDropdown ? (
                <button
                  key={link}
                  type="button"
                  onClick={() => toggle(link)}
                  className={`relative flex items-center gap-1 px-3 py-2 text-[14px] font-medium transition-colors duration-150 ${
                    isActive
                      ? "text-[#1f6fb2] bg-blue-50"
                      : "text-gray-700 hover:text-[#1f3a5f] hover:bg-gray-50"
                  }`}
                >
                  {label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-250 ${isActive ? "rotate-180 text-[#1f6fb2]" : "text-gray-400"}`} />
                  {isActive && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#1f6fb2]"
                    />
                  )}
                </button>
              ) : (
                <Link
                  key={link}
                  href={`/${link}`}
                  className="px-3 py-2 text-[14px] font-medium text-gray-700 hover:text-[#1f3a5f] hover:bg-gray-50 transition-colors duration-150"
                >
                  {label}
                </Link>
              );
            })}

            {/* Divider */}
            <span className="w-px h-5 bg-gray-200 mx-3" />

            {/* Contact CTA */}
            <div className="relative inline-flex items-center justify-center">
              {[0, 0.2].map((delay, i) => (
                <motion.span
                  key={i}
                  className="absolute inset-0 pointer-events-none"
                  style={{ border: `${i === 0 ? 2 : 1}px solid rgba(196,85,0,${i === 0 ? 0.65 : 0.4})` }}
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: [0.96, 1.32, 1.32], opacity: [0, 0.6, 0] }}
                  transition={{ duration: i === 0 ? 1.5 : 2, ease: "easeOut", repeat: Infinity, repeatDelay: 3, delay }}
                />
              ))}
              <Link
                href="/contact"
                className="relative z-10 px-5 py-[8px] text-[13.5px] font-bold text-white
                  bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00]
                  hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A]
                  ring-1 ring-inset ring-white/30 transition-all duration-200 whitespace-nowrap"
              >
                Contact us
              </Link>
            </div>

            {/* Search — after contact */}
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.div
                  key="search-input"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="flex items-center border border-gray-200 bg-gray-50 overflow-hidden ml-2"
                >
                  <Search className="w-3.5 h-3.5 text-gray-400 ml-3 shrink-0" />
                  <input
                    ref={searchRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search…"
                    className="flex-1 px-2.5 py-2 text-[13px] bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
                  />
                  <button
                    onClick={() => { setSearchOpen(false); setQuery(""); }}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="search-icon"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setSearchOpen(true)}
                  className="ml-2 p-2 text-gray-500 hover:text-[#1f3a5f] hover:bg-gray-50 transition-colors duration-150"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>

      {/* ── Mega dropdown ── */}
      <AnimatePresence>
        {isDropdownOpen && DROPDOWNS[clicked] && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-0 top-full w-full bg-white border-b border-gray-200 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
          >
            <div className="max-w-[82rem] mx-auto px-4 py-8 grid grid-cols-5 gap-8">

              {/* Featured panel */}
              <div className="col-span-1 bg-gradient-to-br from-[#eaf6ff] to-[#dff0ff] p-6 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-3">
                    {clicked === "about" ? "About us" : "Our services"}
                  </p>
                  <h4 className="text-[16px] font-serif font-bold text-[#1f3a5f] leading-snug mb-3">
                    {DROPDOWNS[clicked].featured.label}
                  </h4>
                  <p className="text-[12.5px] text-gray-500 leading-relaxed">
                    {DROPDOWNS[clicked].featured.desc}
                  </p>
                </div>
                <Link
                  href={DROPDOWNS[clicked].featured.href}
                  className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-bold text-[#1f6fb2] hover:gap-2.5 transition-all duration-200"
                >
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Link columns */}
              {DROPDOWNS[clicked].columns.map((col, ci) => (
                <div key={col.title} className={ci > 0 ? "border-l border-gray-100 pl-6" : ""}>
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.14em] mb-4 pb-2 border-b border-gray-100">
                    {col.title}
                  </h3>
                  <ul className="space-y-1">
                    {col.links.map(([name, href]) => (
                      <li key={name}>
                        <Link
                          href={href}
                          className="flex items-center gap-1.5 py-1.5 px-2 text-[13.5px] text-gray-600 hover:text-[#1f6fb2] hover:bg-blue-50 transition-all duration-150 group"
                        >
                          <span className="w-1 h-1 rounded-full bg-gray-200 group-hover:bg-[#1f6fb2] transition-colors duration-150 shrink-0" />
                          {name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Dropdown footer */}
            <div className="border-t border-gray-100 bg-[#f9f9f9]">
              <div className="max-w-[82rem] mx-auto px-4 py-3 flex items-center gap-4">
                <span className="text-[12.5px] font-medium text-gray-500 whitespace-nowrap">
                  Find exactly what you need:
                </span>
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search services, industries, technologies…"
                    className="w-full h-9 pl-9 pr-4 text-[13px] text-gray-800 placeholder:text-gray-400 bg-white border border-gray-200 focus:outline-none focus:border-[#1f6fb2] focus:ring-1 focus:ring-[#1f6fb2]/20 transition-all duration-200"
                  />
                </div>
                <div className="ml-auto flex items-center gap-4 text-[12px] text-gray-400">
                  <span>Popular:</span>
                  {["Full Stack Dev", "Cyber Security", "Cloud Engineering"].map((s) => (
                    <Link key={s} href="#" className="hover:text-[#1f6fb2] transition-colors duration-150 underline underline-offset-2">
                      {s}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;