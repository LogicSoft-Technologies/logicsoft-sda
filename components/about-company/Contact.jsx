"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import ReactCountryFlag from "react-country-flag";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const COUNTRIES = [
  { code: "NG", dial: "+234" }, { code: "US", dial: "+1"   }, { code: "CA", dial: "+1"   },
  { code: "GB", dial: "+44"  }, { code: "DE", dial: "+49"  }, { code: "FR", dial: "+33"  },
  { code: "ES", dial: "+34"  }, { code: "IT", dial: "+39"  }, { code: "NL", dial: "+31"  },
  { code: "BE", dial: "+32"  }, { code: "CH", dial: "+41"  }, { code: "AT", dial: "+43"  },
  { code: "SE", dial: "+46"  }, { code: "NO", dial: "+47"  }, { code: "DK", dial: "+45"  },
  { code: "FI", dial: "+358" }, { code: "IE", dial: "+353" }, { code: "PT", dial: "+351" },
  { code: "GR", dial: "+30"  }, { code: "TR", dial: "+90"  }, { code: "RU", dial: "+7"   },
  { code: "AE", dial: "+971" }, { code: "SA", dial: "+966" }, { code: "IN", dial: "+91"  },
  { code: "PK", dial: "+92"  }, { code: "BD", dial: "+880" }, { code: "LK", dial: "+94"  },
  { code: "MY", dial: "+60"  }, { code: "SG", dial: "+65"  }, { code: "TH", dial: "+66"  },
  { code: "PH", dial: "+63"  }, { code: "ID", dial: "+62"  }, { code: "JP", dial: "+81"  },
  { code: "KR", dial: "+82"  }, { code: "CN", dial: "+86"  }, { code: "ZA", dial: "+27"  },
  { code: "KE", dial: "+254" }, { code: "GH", dial: "+233" }, { code: "EG", dial: "+20"  },
  { code: "AU", dial: "+61"  }, { code: "NZ", dial: "+64"  }, { code: "BR", dial: "+55"  },
  { code: "AR", dial: "+54"  }, { code: "CL", dial: "+56"  }, { code: "CO", dial: "+57"  },
  { code: "MX", dial: "+52"  }, { code: "VE", dial: "+58"  },
];

export default function ContactSection() {

  // ── Refs ────────────────────────────────────────────────────────────────────
  const bgRef      = useRef(null);
  const triggerRef = useRef(null);
  const recorderRef = useRef(null);
  const streamRef   = useRef(null);
  const chunksRef   = useRef([]);
  const fileRef     = useRef(null);  // ← reads selected files on submit

  // ── Form state ──────────────────────────────────────────────────────────────
  const [formData, setFormData]       = useState({ name: "", company: "", email: "", message: "" });
  const [submitted, setSubmitted]     = useState(false);
  const [submitting, setSubmitting]   = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [fileName, setFileName]       = useState(null);

  // ── Phone / country ─────────────────────────────────────────────────────────
  const [country, setCountry]   = useState(COUNTRIES[0]);
  const [phone, setPhone]       = useState("");
  const [open, setOpen]         = useState(false);
  const [dropdownPos, setDropdownPos] = useState(null);

  // ── Voice recording ─────────────────────────────────────────────────────────
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl]   = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);  // ← blob for upload

  // ── GSAP blob animation ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!bgRef.current) return;
    gsap.to(Array.from(bgRef.current.children), {
      x: 40, y: 60, duration: 28,
      ease: "sine.inOut", repeat: -1, yoyo: true, stagger: 6,
    });
  }, []);

  // ── Auto-detect country ─────────────────────────────────────────────────────
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((d) => {
        const found = COUNTRIES.find((c) => c.code === d.country_code);
        if (found) setCountry(found);
      })
      .catch(() => {});
  }, []);

  // ── Country dropdown ────────────────────────────────────────────────────────
  const toggleDropdown = () => {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({
        top:   rect.bottom + window.scrollY,
        left:  rect.left   + window.scrollX,
        width: rect.width,
      });
    }
    setOpen(!open);
  };

  // ── Phone formatting ────────────────────────────────────────────────────────
  const handlePhone = (e) => {
    let d = e.target.value.replace(/\D/g, "");
    if (d.length > 3 && d.length <= 6)  d = d.slice(0, 3) + " " + d.slice(3);
    else if (d.length > 6)              d = d.slice(0, 3) + " " + d.slice(3, 6) + " " + d.slice(6, 10);
    setPhone(d);
  };

  // ── Voice recording ─────────────────────────────────────────────────────────
  const handleVoice = async () => {
    if (recording) {
      recorderRef.current.stop();
      streamRef.current.getTracks().forEach((t) => t.stop());
      setRecording(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);                      // store for upload
        setAudioUrl(URL.createObjectURL(blob));  // for in-page playback
      };
      recorder.start();
      setRecording(true);
    } catch {
      alert("Microphone access denied. Please allow microphone permissions.");
    }
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const fd = new FormData();

      fd.append("name",    formData.name);
      fd.append("company", formData.company);
      fd.append("email",   formData.email);
      fd.append("message", formData.message);
      fd.append("phone",   phone ? `${country.dial} ${phone}` : "");
      fd.append("country", country.code);

      // Voice note
      if (audioBlob) {
        fd.append("voiceNote", audioBlob, "voice-briefing.webm");
      }

      // File attachments
      const files = fileRef.current?.files ?? [];
      for (const file of files) {
        fd.append("attachments", file, file.name);
      }

      const res  = await fetch(`${BACKEND_URL}/api/contact`, { method: "POST", body: fd });
      const json = await res.json();

      if (!res.ok || json.error) {
        setSubmitError(json.error || "Submission failed. Please try again.");
        return;
      }

      setSubmitted(true);

    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const field = (key) => ({
    value: formData[key],
    onChange: (e) => setFormData((p) => ({ ...p, [key]: e.target.value })),
  });

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ name: "", company: "", email: "", message: "" });
    setPhone("");
    setAudioUrl(null);
    setAudioBlob(null);
    setFileName(null);
    setSubmitError(null);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <section id="contact" className="relative py-20 bg-[#f5f5f5] border-t border-gray-200 overflow-hidden">

      {/* Animated blobs */}
      <div ref={bgRef} className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-[160px]" />
        <div className="absolute top-1/4 -right-48 w-[620px] h-[620px] rounded-full bg-indigo-400/10 blur-[170px]" />
        <div className="absolute bottom-[-300px] left-1/3 w-[560px] h-[560px] rounded-full bg-sky-300/10 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-[82rem] mx-auto px-6">

        <h2 className="text-[36px] font-serif text-[#1f3a5f] mb-6">Contact Logicsoft</h2>
        <p className="text-[17px] text-gray-700 leading-[2] mb-14 max-w-[1100px]">
          Engage our engineering and consulting teams to discuss enterprise software
          development, cloud infrastructure, and digital transformation initiatives.
        </p>

        <div className="grid md:grid-cols-[1fr_360px] gap-8 border border-gray-200 bg-white p-6 shadow-sm">

          {/* ══ FORM PANEL ══════════════════════════════════════════════════════ */}
          <div>

            {/* Success state */}
            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-[20px] font-serif text-[#1f3a5f] mb-2">Submission received</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto mb-6">
                  A LogicSoft solution architect will review your brief and respond within 24 business hours.
                </p>
                <button onClick={resetForm} className="text-sm font-semibold text-[#1f6fb2] hover:text-[#1f3a5f] transition-colors">
                  ← Submit another enquiry
                </button>
              </div>

            ) : (

              <form onSubmit={handleSubmit}>

                {/* Header */}
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[22px] font-serif text-[#1f3a5f]">Request a Consultation</h3>
                  <img src="/images/site-seal.png" alt="secured" />
                </div>
                <p className="text-sm text-gray-600 mb-6">Our consultants respond within one business day.</p>

                {/* Message + voice */}
                <div className="relative mb-4">
                  <textarea
                    required
                    rows={3}
                    {...field("message")}
                    disabled={recording}
                    placeholder={recording ? "Recording voice message…" : "How can we help you?"}
                    className={`w-full resize-none border px-4 py-4 text-sm outline-none transition ${
                      recording
                        ? "border-red-400 bg-red-50 placeholder-red-500"
                        : "border-gray-300 focus:border-[#1f6fb2] focus:ring-1 focus:ring-[#1f6fb2]"
                    }`}
                  />
                  {recording && (
                    <div className="absolute left-4 bottom-4 flex items-center gap-2 text-xs text-red-600 pointer-events-none">
                      <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                      Recording…
                    </div>
                  )}
                  <button
                    type="button"
                    title={recording ? "Stop recording" : "Start voice recording"}
                    onClick={handleVoice}
                    className={`absolute right-4 bottom-4 transition ${recording ? "scale-110" : "hover:scale-105"}`}
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

                {/* File upload — ref={fileRef} added */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                  <Image src="/images/upload-icon.svg" alt="Upload" width={20} height={20} />
                  <span>
                    Drag and drop or{" "}
                    <label htmlFor="upload" className="text-[#1f6fb2] cursor-pointer hover:underline">
                      {fileName
                        ? <span className="font-semibold">{fileName}</span>
                        : "browse"
                      }
                    </label>{" "}
                    {!fileName && "to upload your files (max. 10MB)"}
                  </span>
                  <input
                    id="upload"
                    ref={fileRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      if (!e.target.files.length) return;
                      setFileName(
                        e.target.files.length > 1
                          ? `${e.target.files.length} files selected`
                          : e.target.files[0]?.name
                      );
                    }}
                  />
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input required {...field("name")}    className="input" placeholder="Full name" />
                  <input          {...field("company")} className="input" placeholder="Company" />
                  <input required type="email" {...field("email")} className="input" placeholder="Work email" />

                  {/* Phone with country picker */}
                  <div ref={triggerRef}
                    className="relative flex items-center border border-gray-300 px-3 rounded-md cursor-pointer focus-within:border-[#1f6fb2] transition">
                    <div className="flex items-center gap-2 shrink-0" onClick={toggleDropdown}>
                      <ReactCountryFlag countryCode={country.code} svg style={{ width: "22px", height: "16px" }} title={country.code} />
                      <span className="text-sm">{country.dial}</span>
                      <svg className="w-3 h-3 text-gray-400 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="flex-1 py-3 ml-3 outline-none text-sm placeholder-gray-400 bg-transparent"
                      placeholder="000 000 0000"
                      value={phone}
                      onChange={handlePhone}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>

                {/* Error banner */}
                {submitError && (
                  <div className="flex items-start gap-2 px-4 py-3 bg-red-50 border border-red-200 mb-4">
                    <span className="text-red-500 shrink-0 mt-0.5 text-sm">⚠</span>
                    <p className="text-xs text-red-700 leading-relaxed">{submitError}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-10 py-2.5 border border-[#1f6fb2] text-[#1f6fb2] hover:bg-[#1f6fb2] hover:text-white transition text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-[#1f6fb2]/30 border-t-[#1f6fb2] rounded-full animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    "Submit Inquiry"
                  )}
                </button>

              </form>
            )}
          </div>

          {/* ══ RIGHT CONTACT PANEL ═════════════════════════════════════════════ */}
          <aside className="border-l border-gray-200 pl-6 space-y-8">

            <h4 className="text-[18px] font-serif text-[#1f3a5f]">Direct Contact</h4>

            <ul className="space-y-4 text-sm text-gray-700">
              <li>
                <a href="tel:+2349012688861" className="flex items-center gap-3 hover:text-[#1f6fb2] transition">
                  <Image src="/images/telephone.png" width={20} height={20} alt="" />
                  Call us
                </a>
              </li>
              <li>
                <a href="mailto:contact@logicsoft.ng" className="flex items-center gap-3 hover:text-[#1f6fb2] transition">
                  <Image src="/images/email-icon.svg" width={20} height={20} alt="" />
                  Email us
                </a>
              </li>
              <li>
                <a href="https://wa.me/2349012688861" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-green-600 transition">
                  <Image src="/images/whatsapp.png" width={20} height={20} alt="" />
                  WhatsApp
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => typeof window !== "undefined" && window.Intercom?.("show")}
                  className="flex items-center gap-3 cursor-pointer hover:text-[#1f6fb2] transition text-sm text-gray-700"
                >
                  <Image src="/images/live-chat.png" width={20} height={20} alt="" />
                  Live chat
                </button>
              </li>
            </ul>

            <div className="mt-8">
              <Image src="/images/newsletter.jpg" width={300} height={200} alt="Contact us" />
            </div>

          </aside>
        </div>
      </div>

      {/* Country dropdown portal */}
      {open && typeof window !== "undefined" && dropdownPos &&
        createPortal(
          <>
            <div className="fixed inset-0 z-[9998]" onClick={() => setOpen(false)} />
            <div
              style={{ position: "absolute", top: dropdownPos.top, left: dropdownPos.left, width: Math.max(dropdownPos.width, 180), zIndex: 9999 }}
              className="bg-white border border-gray-200 shadow-xl max-h-64 overflow-y-auto"
            >
              {COUNTRIES.map((c) => (
                <div key={c.code} onClick={() => { setCountry(c); setOpen(false); }}
                  className={`flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer ${country.code === c.code ? "bg-[#eff6ff]" : ""}`}>
                  <ReactCountryFlag countryCode={c.code} svg style={{ width: "22px", height: "16px" }} title={c.code} />
                  <span className="text-sm">{c.dial}</span>
                  <span className="text-xs text-gray-400 ml-auto">{c.code}</span>
                </div>
              ))}
            </div>
          </>,
          document.getElementById("dropdown-root") || document.body,
        )
      }

      <style jsx>{`
        .input {
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          outline: none;
          width: 100%;
          transition: border-color 0.15s;
        }
        .input:focus {
          border-color: #1f6fb2;
        }
      `}</style>
    </section>
  );
}