"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ThreeHeroBackground from "@/components/shared/ThreeHeroBackground";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import HeroColorMood from "@/components/shared/HeroColorMood";

const INDUSTRIES = [
  { label: "FinTech & Banking", image: "/images/fintech.png", cta: "Our FinTech & Banking portfolio →", link: "/portfolio/fintech" },
  { label: "Real Estate & Investment", image: "/images/real-estate.png", cta: "Our Real Estate & Investment portfolio →", link: "/portfolio/real-estate" },
  { label: "E-commerce Marketing", image: "/images/e-commerce.png", cta: "Our E-commerce Marketing portfolio →", link: "/portfolio/ecommerce" },
  { label: "Broker Platforms", image: "/images/trading.png", cta: "Our Broker Platforms portfolio →", link: "/portfolio/trading" },
  { label: "Enterprise & SaaS Businesses", image: "/images/saas.png", cta: "Our Enterprise & SaaS portfolio →", link: "/portfolio/saas" },
];

export default function Hero() {
  const spiralRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const blob1 = useRef(null);
  const blob2 = useRef(null);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scroll, setScroll] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 });
    };
    const handleScroll = () => setScroll(window.scrollY || window.pageYOffset);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setPrevIndex(activeIndex);
      setActiveIndex((prev) => (prev + 1) % INDUSTRIES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const goTo = (index) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setPrevIndex(activeIndex);
    setActiveIndex(index);
  };

  const goNext = () => {
    setDirection(1);
    setPrevIndex(activeIndex);
    setActiveIndex((prev) => (prev + 1) % INDUSTRIES.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setPrevIndex(activeIndex);
    setActiveIndex((prev) => (prev - 1 + INDUSTRIES.length) % INDUSTRIES.length);
  };

  const spiralStyle = {
    transform: `translate(${mouse.x * 12}px, ${mouse.y * 12 + scroll * 0.02}px)`,
    zIndex: 0,  // FIX: lock spiral behind everything
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, { y: 50, opacity: 0, duration: 1, ease: "power3.out" });
      gsap.from(paragraphRef.current, { y: 30, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });
      if (blob1.current && blob2.current) {
        gsap.to(blob1.current, { x: 180, y: 100, duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(blob2.current, { x: -180, y: -120, duration: 14, repeat: -1, yoyo: true, ease: "sine.inOut" });
      }
    });
    return () => ctx.revert();
  }, []);

  const pillVariants = {
    enter: (dir) => ({ x: dir * 80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir * -80, opacity: 0 }),
  };

  // - Mobile View -//
  if (isMobile) {
    return (

      <section className="hero-wrapper relative min-h-screen overflow-hidden pt-6 bg-[#f5f5f5]" style={{ zIndex: 0 }}>
        <HeroColorMood activeIndex={activeIndex} />
        <div ref={blob1} className="absolute top-10 left-10 w-[300px] h-[300px] bg-blue-400/20 blur-[120px] rounded-full pointer-events-none" style={{ zIndex: 0 }} />
        <div ref={blob2} className="absolute bottom-10 right-10 w-[320px] h-[320px] bg-indigo-500/18 blur-[140px] rounded-full pointer-events-none" style={{ zIndex: 0 }} />
        <div className="hero-gradient-layer" style={{ zIndex: 0 }} />
        <ThreeHeroBackground activeIndex={activeIndex} />
        <div ref={spiralRef} className="hero-spiral-layer" style={spiralStyle} />

        <div className="relative z-10 w-full px-5 flex flex-col justify-center min-h-screen py-24 gap-7">

          <div className="flex flex-col items-center text-center">
            <h1
              ref={titleRef}
              className="text-[28px] sm:text-[34px] font-serif leading-tight text-[#1f3a5f]"
            >
              Software Consulting <br /> and Development
            </h1>

            <p
              ref={paragraphRef}
              className="mt-3 text-[15px] sm:text-[16px] text-gray-700 leading-relaxed max-w-sm"
            >
              Delivering scalable, secure, and enterprise-grade digital solutions for startups and global organizations.
            </p>

            <div className="mt-5 w-full flex items-center justify-center gap-3">
              <button
                onClick={goPrev}
                className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 text-sm hover:border-[#1f6fb2] hover:text-[#1f6fb2] transition"
              >
                ‹
              </button>

              <div className="relative overflow-hidden flex-1 flex justify-center" style={{ height: "40px" }}>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={pillVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="px-5 py-2 text-[12.5px] font-medium border bg-[#1f6fb2] border-[#1f6fb2] text-white whitespace-nowrap rounded-sm">
                      {INDUSTRIES[activeIndex].label}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={goNext}
                className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 text-sm hover:border-[#1f6fb2] hover:text-[#1f6fb2] transition"
              >
                ›
              </button>
            </div>

            <div className="flex gap-1.5 mt-3">
              {INDUSTRIES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeIndex ? "bg-[#1f6fb2] w-4" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>

          <div className="relative w-full">
            <div className="relative rounded-md overflow-hidden bg-white border border-gray-200 shadow-sm p-3">
              <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -40 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={INDUSTRIES[activeIndex].image}
                      alt={INDUSTRIES[activeIndex].label}
                      fill
                      className="object-cover rounded-sm"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <a
              href={INDUSTRIES[activeIndex].link}
              className="block mt-3 text-center text-[#1f6fb2] hover:text-[#1f3a5f] font-medium text-[13px] transition-all"
            >
              {INDUSTRIES[activeIndex].cta}
            </a>
          </div>

        </div>
      </section>
    );
  }

  // - Desktop view -//
  return (
    <section className="hero-wrapper relative min-h-screen overflow-hidden pt-6 bg-[#f5f5f5]" style={{ zIndex: 0 }}>

      <HeroColorMood activeIndex={activeIndex} />
      <div ref={blob1} className="absolute top-10 left-10 w-[450px] h-[450px] bg-blue-400/20 blur-[160px] rounded-full pointer-events-none" style={{ zIndex: 0 }} />
      <div ref={blob2} className="absolute bottom-10 right-10 w-[520px] h-[520px] bg-indigo-500/18 blur-[180px] rounded-full pointer-events-none" style={{ zIndex: 0 }} />

      <div className="hero-gradient-layer" style={{ zIndex: 0 }} />
      <ThreeHeroBackground activeIndex={activeIndex} />
      <div ref={spiralRef} className="hero-spiral-layer" style={spiralStyle} />

      <div className="relative z-10 max-w-[82rem] mx-auto px-6 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-[3.5rem] items-center w-full">

          <div className="relative">
            <h1
              ref={titleRef}
              className="text-[30px] lg:text-[42px] font-serif leading-tight  text-[#1f3a5f]"
            >
              Software Consulting <br /> and Devlopment
            </h1>

            <p
              ref={paragraphRef}
              className="mt-4 text-[17px] max-w-xl text-gray-700 leading-relaxed"
            >
              Delivering scalable, secure, and enterprise-grade digital solutions for startups and global organizations.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {INDUSTRIES.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.label}
                    className={`
                      px-4 py-2.5 text-[13.5px] font-medium border transition-all
                      ${isActive
                        ? "bg-[#1f6fb2] border-[#1f6fb2] text-white"
                        : "bg-white border-gray-300 text-gray-700 hover:border-[#1f6fb2] hover:text-[#1f6fb2]"
                      }
                    `}
                    onClick={() => goTo(index)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="relative p-6 rounded-md overflow-hidden bg-white border border-gray-200 shadow-sm">
              <div className="relative w-full aspect-[17/9]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={INDUSTRIES[activeIndex].image}
                      alt={INDUSTRIES[activeIndex].label}
                      fill
                      className="object-cover rounded-md"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 transition"
              >
                ‹
              </button>

              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 transition"
              >
                ›
              </button>
            </div>
          </div>

        </div>
      </div>

      <a
        href={INDUSTRIES[activeIndex].link}
        className="absolute bottom-14 right-14 text-[#1f6fb2] hover:text-[#1f3a5f] font-medium text-[14px] transition-all"
      >
        {INDUSTRIES[activeIndex].cta}
      </a>
    </section>
  );
}