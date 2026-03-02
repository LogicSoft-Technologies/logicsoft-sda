"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, ArrowRight, ChevronRight,
  TrendingUp, FileText, Filter,
} from "lucide-react";

import {
  searchSite,
  SEARCH_INDEX,
  POPULAR_SEARCHES,
  getCategoryColor,
} from "@/lib/search-index";

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Wraps the matched substring in a <mark> tag */
function Highlight({ text, query }) {
  if (!query.trim()) return <>{text}</>;
  const q   = query.toLowerCase();
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-[#fef9c3] text-[#78350f] rounded-[2px] px-[1px] not-italic font-bold">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

/** All unique categories present in the index */
const ALL_CATEGORIES = ["All", ...Array.from(new Set(SEARCH_INDEX.map((r) => r.category)))];

// ─────────────────────────────────────────────────────────────────────────────
// RESULT CARD
// ─────────────────────────────────────────────────────────────────────────────

function ResultCard({ item, query, index }) {
  const c = getCategoryColor(item.category);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
    >
      <Link
        href={item.href}
        className="group block border border-[#e8eef6] bg-white hover:border-[#bfdbfe] hover:shadow-sm transition-all duration-200 overflow-hidden"
      >
        {/* Top accent bar — appears on hover */}
        <div className="h-[2.5px] w-0 group-hover:w-full transition-all duration-500" style={{ background: c.dot }} />
        <div className="p-5 flex items-start gap-4">
          {/* Category colour square */}
          <div
            className="w-9 h-9 flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: c.bg, border: `1px solid ${c.dot}22` }}
          >
            <FileText className="w-4 h-4" style={{ color: c.dot }} />
          </div>

          <div className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1 mb-1">
              {item.section.split(" › ").map((crumb, i, arr) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: c.text }}>
                    {crumb}
                  </span>
                  {i < arr.length - 1 && <ChevronRight className="w-2.5 h-2.5 text-gray-300" />}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-[15px] font-bold text-[#1f3a5f] group-hover:text-[#1f6fb2] transition-colors mb-1 leading-snug">
              <Highlight text={item.title} query={query} />
            </h3>

            {/* Description */}
            <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">
              <Highlight text={item.description} query={query} />
            </p>
          </div>

          {/* Arrow */}
          <ArrowRight className="w-4 h-4 text-gray-200 group-hover:text-[#1f6fb2] group-hover:translate-x-0.5 transition-all duration-150 shrink-0 mt-1" />
        </div>
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function SearchPageInner() {
  const params   = useSearchParams();
  const router   = useRouter();
  const inputRef = useRef(null);

  const initialQ = params.get("q") || "";
  const [query,      setQuery]      = useState(initialQ);
  const [activeQ,    setActiveQ]    = useState(initialQ); // debounced query used for results
  const [category,   setCategory]   = useState("All");

  // Debounce: update activeQ 200ms after typing stops
  useEffect(() => {
    const t = setTimeout(() => setActiveQ(query), 200);
    return () => clearTimeout(t);
  }, [query]);

  // Keep URL in sync as query changes
  useEffect(() => {
    const url = query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : "/search";
    window.history.replaceState(null, "", url);
  }, [query]);

  // Reset category filter when query changes
  useEffect(() => setCategory("All"), [activeQ]);

  // All results for activeQ
  const allResults = activeQ.trim() ? searchSite(activeQ, 40) : [];

  // Filtered by active category
  const displayed = category === "All"
    ? allResults
    : allResults.filter((r) => r.category === category);

  // Categories present in the current result set
  const presentCats = ["All", ...Array.from(new Set(allResults.map((r) => r.category)))];

  const clearQuery = () => { setQuery(""); inputRef.current?.focus(); };

  // Keyboard: Esc clears
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") clearQuery(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  // ── Fade-up helper ────────────────────────────────────────────────────────
  const fu = (delay = 0) => ({
    initial:     { opacity: 0, y: 16 },
    animate:     { opacity: 1, y: 0  },
    transition:  { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <div className="min-h-screen bg-[#f8fafd] pt-[80px]">

      {/* ── Page header ── */}
      <div
        className="border-b border-[#1a3258]"
        style={{ background: "linear-gradient(145deg, #05101f 0%, #0a1e38 50%, #0d2448 100%)" }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #1f6fb2 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative max-w-[82rem] mx-auto px-6 py-10">
          <motion.div {...fu()}>
            <p className="text-[10.5px] font-bold text-[#60a8dc] uppercase tracking-[0.18em] mb-2 font-mono">
              Site Search
            </p>
            <h1 className="text-[28px] lg:text-[36px] font-serif text-white mb-6 leading-tight">
              {activeQ.trim()
                ? <>Results for <span className="text-[#1f6fb2]">"{activeQ}"</span></>
                : "Search LogicSoft"}
            </h1>

            {/* Search input */}
            <div className="flex items-center border border-white/15 bg-white/[0.06] max-w-[560px]">
              <Search className="w-4 h-4 text-white/40 ml-4 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, services, topics…"
                autoFocus
                className="flex-1 px-3 py-3.5 text-[14px] bg-transparent outline-none text-white placeholder:text-white/35"
              />
              {query && (
                <button onClick={clearQuery} className="p-3 text-white/40 hover:text-white/70 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-[82rem] mx-auto px-6 py-10">

        {/* ── Has results ── */}
        {activeQ.trim() && allResults.length > 0 && (
          <>
            {/* Category filter chips + result count */}
            <motion.div {...fu(0.05)} className="flex flex-wrap items-center gap-2 mb-8">
              <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mr-1">Filter:</span>
              {presentCats.map((cat) => {
                const count   = cat === "All" ? allResults.length : allResults.filter((r) => r.category === cat).length;
                const isActive = category === cat;
                const c        = cat === "All" ? { dot: "#1f3a5f", bg: "#f1f5f9", text: "#1f3a5f" } : getCategoryColor(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 border transition-all duration-150 ${
                      isActive
                        ? "border-[#1f6fb2] bg-[#eff6ff] text-[#1f6fb2]"
                        : "border-[#e8eef6] bg-white text-gray-500 hover:border-[#bfdbfe] hover:text-[#1f3a5f]"
                    }`}
                  >
                    {cat !== "All" && (
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: isActive ? "#1f6fb2" : c.dot }} />
                    )}
                    {cat}
                    <span className={`text-[10px] px-1.5 py-0.5 font-bold ${isActive ? "bg-[#1f6fb2] text-white" : "bg-gray-100 text-gray-400"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}

              <span className="ml-auto text-[12px] text-gray-400">
                {displayed.length} result{displayed.length !== 1 ? "s" : ""}
                {category !== "All" && ` in ${category}`}
              </span>
            </motion.div>

            {/* Result grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeQ}-${category}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {displayed.map((item, i) => (
                  <ResultCard key={item.id} item={item} query={activeQ} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </>
        )}

        {/* ── No results ── */}
        {activeQ.trim() && allResults.length === 0 && (
          <motion.div {...fu(0.05)} className="text-center py-20">
            <div className="w-14 h-14 bg-[#f1f5f9] border border-[#e8eef6] flex items-center justify-center mx-auto mb-5">
              <Search className="w-6 h-6 text-gray-300" />
            </div>
            <h2 className="text-[20px] font-serif text-[#1f3a5f] mb-2">No results for "{activeQ}"</h2>
            <p className="text-[13.5px] text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
              Try different keywords, or browse our services and about pages directly.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {POPULAR_SEARCHES.map((s) => (
                <button
                  key={s.href}
                  onClick={() => setQuery(s.label)}
                  className="text-[12px] font-semibold text-[#1f3a5f] border border-[#e8eef6] bg-white px-3 py-1.5 hover:border-[#1f6fb2]/40 hover:text-[#1f6fb2] hover:bg-[#eff6ff] transition-all duration-150"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Empty query — browse suggestions ── */}
        {!activeQ.trim() && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
            {/* Left: popular */}
            <motion.div {...fu(0.05)}>
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-4 h-4 text-[#1f6fb2]" />
                <h2 className="text-[16px] font-bold text-[#1f3a5f]">Popular searches</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {POPULAR_SEARCHES.map((s) => (
                  <button
                    key={s.href}
                    onClick={() => setQuery(s.label)}
                    className="group flex items-center gap-3 border border-[#e8eef6] bg-white p-4 hover:border-[#bfdbfe] hover:shadow-sm transition-all duration-200 text-left"
                  >
                    <Search className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#1f6fb2] transition-colors shrink-0" />
                    <span className="text-[13.5px] font-semibold text-[#1f3a5f] group-hover:text-[#1f6fb2] transition-colors">
                      {s.label}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-200 group-hover:text-[#1f6fb2] ml-auto transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right: browse by category */}
            <motion.div {...fu(0.1)}>
              <h2 className="text-[16px] font-bold text-[#1f3a5f] mb-5">Browse by category</h2>
              <div className="space-y-2">
                {ALL_CATEGORIES.filter((c) => c !== "All").map((cat) => {
                  const c     = getCategoryColor(cat);
                  const count = SEARCH_INDEX.filter((r) => r.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setQuery(cat)}
                      className="w-full flex items-center gap-3 border border-[#e8eef6] bg-white p-3.5 hover:border-[#bfdbfe] hover:shadow-sm transition-all duration-200 text-left group"
                    >
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: c.dot }} />
                      <span className="flex-1 text-[13px] font-semibold text-[#1f3a5f] group-hover:text-[#1f6fb2] transition-colors">
                        {cat}
                      </span>
                      <span className="text-[11px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}