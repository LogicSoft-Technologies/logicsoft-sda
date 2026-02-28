"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import ReactCountryFlag from "react-country-flag";

const COUNTRIES = [
  { code: "NG", dial: "+234" },
  { code: "US", dial: "+1" },
  { code: "CA", dial: "+1" },
  { code: "GB", dial: "+44" },
  { code: "DE", dial: "+49" },
  { code: "FR", dial: "+33" },
  { code: "ES", dial: "+34" },
  { code: "IT", dial: "+39" },
  { code: "NL", dial: "+31" },
  { code: "BE", dial: "+32" },
  { code: "CH", dial: "+41" },
  { code: "AT", dial: "+43" },
  { code: "SE", dial: "+46" },
  { code: "NO", dial: "+47" },
  { code: "DK", dial: "+45" },
  { code: "FI", dial: "+358" },
  { code: "IE", dial: "+353" },
  { code: "PT", dial: "+351" },
  { code: "GR", dial: "+30" },
  { code: "TR", dial: "+90" },
  { code: "RU", dial: "+7" },
  { code: "AE", dial: "+971" },
  { code: "SA", dial: "+966" },
  { code: "IN", dial: "+91" },
  { code: "PK", dial: "+92" },
  { code: "BD", dial: "+880" },
  { code: "LK", dial: "+94" },
  { code: "MY", dial: "+60" },
  { code: "SG", dial: "+65" },
  { code: "TH", dial: "+66" },
  { code: "PH", dial: "+63" },
  { code: "ID", dial: "+62" },
  { code: "JP", dial: "+81" },
  { code: "KR", dial: "+82" },
  { code: "CN", dial: "+86" },
  { code: "ZA", dial: "+27" },
  { code: "KE", dial: "+254" },
  { code: "GH", dial: "+233" },
  { code: "EG", dial: "+20" },
  { code: "AU", dial: "+61" },
  { code: "NZ", dial: "+64" },
  { code: "BR", dial: "+55" },
  { code: "AR", dial: "+54" },
  { code: "CL", dial: "+56" },
  { code: "CO", dial: "+57" },
  { code: "MX", dial: "+52" },
  { code: "VE", dial: "+58" },
];

export default function ContactSection() {
  const bgRef = useRef(null);
  const triggerRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [open, setOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState(null);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!bgRef.current) return;

    const blobs = bgRef.current.children;

    gsap.to(blobs, {
      x: 40,
      y: 60,
      duration: 28,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 6,
    });
  }, []);

  const handleVoice = async () => {
    if (recording) {
      recorderRef.current.stop();
      streamRef.current.getTracks().forEach((t) => t.stop());
      setRecording(false);
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;

    const recorder = new MediaRecorder(stream);
    recorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setAudioUrl(URL.createObjectURL(blob));
    };

    recorder.start();
    setRecording(true);
  };

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const found = COUNTRIES.find((c) => c.code === data.country_code);
        if (found) setCountry(found);
      })
      .catch(() => {});
  }, []);

  const toggleDropdown = () => {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setOpen(!open);
  };

  return (
    <section id="contact" className="relative py-20 bg-[#f5f5f5] border-t border-gray-200 overflow-hidden">

      {/* Animated blobs (kept) */}
      <div ref={bgRef} className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-[160px]" />
        <div className="absolute top-1/4 -right-48 w-[620px] h-[620px] rounded-full bg-indigo-400/10 blur-[170px]" />
        <div className="absolute bottom-[-300px] left-1/3 w-[560px] h-[560px] rounded-full bg-sky-300/10 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-[82rem] mx-auto px-6">

        {/* Enterprise Heading */}
        <h2 className="text-[36px] font-serif text-[#1f3a5f] mb-6">
          Contact Logicsoft
        </h2>

        <p className="text-[17px] text-gray-700 leading-[2] mb-14 max-w-[1100px]">
          Engage our engineering and consulting teams to discuss enterprise software
          development, cloud infrastructure, and digital transformation initiatives.
        </p>

        {/* Main Grid */}
        <div className="grid md:grid-cols-[1fr_360px] gap-8 border border-gray-200 bg-white p-6 shadow-sm">

          {/* FORM PANEL */}
          <div>

            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[22px] font-serif text-[#1f3a5f]">
                  Request a Consultation
                </h3>
                <img src="/images/site-seal.png" alt="secured" />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Our consultants respond within one business day.
              </p>
            </div>

            {/* MESSAGE */}
            <div className="relative mb-4">
              <textarea
                rows={3}
                disabled={recording}
                placeholder={recording ? "Recording voice message…" : "How can we help you?"}
                className={`w-full resize-none border px-4 py-4 text-sm outline-none transition ${
                  recording
                    ? "border-red-400 bg-red-50 placeholder-red-500"
                    : "border-gray-300 focus:border-[#1f6fb2] focus:ring-1 focus:ring-[#1f6fb2]"
                }`}
              />

              {recording && (
                <div className="absolute left-4 bottom-4 flex items-center gap-2 text-xs text-red-600">
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                  Recording…
                </div>
              )}

              <button
                type="button"
                title={recording ? "Stop recording" : "Start voice recording"}
                onClick={handleVoice}
                className={`absolute right-4 bottom-4 transition ${
                  recording ? "scale-110" : "hover:scale-105"
                }`}
              >
                <Image
                  src="/images/mouthpiece.svg"
                  alt="Voice input"
                  width={20}
                  height={20}
                  className={recording ? "opacity-100" : "opacity-70"}
                />
              </button>
            </div>

            {audioUrl && <audio controls src={audioUrl} className="mb-4 w-full h-9" />}

            {/* FILE UPLOAD */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Image src="/images/upload-icon.svg" alt="Upload" width={20} height={20} />
              <span>
                Drag and drop or{" "}
                <label htmlFor="upload" className="text-[#1f6fb2] cursor-pointer hover:underline">
                  browse
                </label>{" "}
                to upload your files (max. 10MB)
              </span>
              <input id="upload" type="file" multiple className="hidden" />
            </div>

            {/* INPUTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input className="input" placeholder="Full name" />
              <input className="input" placeholder="Company" />
              <input className="input" placeholder="Work email" />

              <div
                ref={triggerRef}
                className="relative flex items-center border border-gray-300 px-3 rounded-md cursor-pointer"
                onClick={toggleDropdown}
              >
                <div className="flex items-center gap-2">
                  <ReactCountryFlag
                    countryCode={country.code}
                    svg
                    style={{ width: "22px", height: "16px" }}
                    title={country.code}
                  />
                  <span className="text-sm">{country.dial}</span>
                </div>

                <input
                  type="text"
                  className="flex-1 py-3 ml-4 outline-none text-sm placeholder-gray-400"
                  placeholder="000 000 0000"
                  value={phone}
                  onChange={(e) => {
                    let digits = e.target.value.replace(/\D/g, "");
                    if (digits.length > 3 && digits.length <= 6) {
                      digits = digits.slice(0, 3) + " " + digits.slice(3);
                    } else if (digits.length > 6) {
                      digits =
                        digits.slice(0, 3) +
                        " " +
                        digits.slice(3, 6) +
                        " " +
                        digits.slice(6, 10);
                    }
                    setPhone(digits);
                  }}
                />
              </div>
            </div>

            {/* BUTTON */}
            <button className="px-10 py-2.5 border border-[#1f6fb2] text-[#1f6fb2] hover:bg-[#1f6fb2] hover:text-white transition text-sm font-medium">
              Submit Inquiry
            </button>
          </div>

          {/* RIGHT CONTACT PANEL */}
          <aside className="border-l border-gray-200 pl-6 space-y-8">

            <h4 className="text-[18px] font-serif text-[#1f3a5f]">
              Direct Contact
            </h4>

            <ul className="space-y-4 text-sm text-gray-700">
              <li>
                <a href="tel:+2348000000000" className="flex items-center gap-3 hover:text-[#1f6fb2] transition">
                  <Image src="/images/telephone.png" width={20} height={20} alt="" />
                  Call us
                </a>
              </li>

              <li>
                <a href="mailto:hello@yourcompany.com" className="flex items-center gap-3 hover:text-[#1f6fb2] transition">
                  <Image src="/images/email-icon.svg" width={20} height={20} alt="" />
                  Email us
                </a>
              </li>

              <li>
                <a href="https://wa.me/2348000000000" target="_blank" className="flex items-center gap-3 hover:text-green-600 transition">
                  <Image src="/images/whatsapp.png" width={20} height={20} alt="" />
                  WhatsApp
                </a>
              </li>

              <li className="flex items-center gap-3 cursor-pointer hover:text-[#1f6fb2] transition">
                <Image src="/images/live-chat.png" width={20} height={20} alt="" />
                Live chat
              </li>
            </ul>

            <div className="mt-8">
              <Image src="/images/newsletter.jpg" width={300} height={200} alt="Contact us" />
            </div>

          </aside>
        </div>
      </div>

      {/* Dropdown Portal */}
      {open &&
        typeof window !== "undefined" &&
        dropdownPos &&
        createPortal(
          <div
            style={{
              position: "absolute",
              top: dropdownPos.top,
              left: dropdownPos.left,
              width: dropdownPos.width,
            }}
            className="z-[9999] bg-white border border-gray-200 shadow-xl max-h-64 overflow-y-auto"
          >
            {COUNTRIES.map((c) => (
              <div
                key={c.code}
                onClick={() => {
                  setCountry(c);
                  setOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <ReactCountryFlag
                  countryCode={c.code}
                  svg
                  style={{ width: "22px", height: "16px" }}
                  title={c.code}
                />
                <span className="text-sm">{c.dial}</span>
              </div>
            ))}
          </div>,
          document.getElementById("dropdown-root"),
        )}

      <style jsx>{`
        .input {
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          outline: none;
        }
        .input:focus {
          border-color: #1f6fb2;
        }
      `}</style>
    </section>
  );
}