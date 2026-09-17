"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const SHOW_DELAY = 250;  // ignore fast navigations — no flash on snappy pages
const MIN_VISIBLE = 400; // once shown, stay up at least this long — no flicker

export default function GlobalLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const showTimer = useRef(null);
  const hideTimer = useRef(null);
  const shownAt = useRef(null);
  const pending = useRef(false);

  // START: fires the instant a link is clicked, before Next.js fetches anything
  useEffect(() => {
    function onClick(e) {
      const anchor = e.target instanceof Element ? e.target.closest("a") : null;
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      let url;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      pending.current = true;
      clearTimeout(showTimer.current);
      showTimer.current = setTimeout(() => {
        if (!pending.current) return;
        shownAt.current = Date.now();
        setVisible(true);
      }, SHOW_DELAY);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // END: fires once the new page has actually rendered (pathname settles)
  useEffect(() => {
    pending.current = false;
    clearTimeout(showTimer.current);

    if (!shownAt.current) return; // it never became visible for this nav — nothing to hide

    const remaining = Math.max(MIN_VISIBLE - (Date.now() - shownAt.current), 0);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setVisible(false);
      shownAt.current = null;
    }, remaining);
  }, [pathname]);

  useEffect(() => {
    return () => {
      clearTimeout(showTimer.current);
      clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70"
        >
          <div className="flex items-center gap-3">
            {[0, 1, 2].map((i) => (
              <motion.img
                key={i}
                src="/favicon.ico"
                alt=""
                className="h-4 w-4"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}