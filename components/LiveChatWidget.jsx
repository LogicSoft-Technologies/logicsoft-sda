"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const SESSION_KEY = "ls_chat_sid";
const WA_BASE = "https://wa.me";

const BRAND = {
  name: "Logicsoft Technologies",
  tagline: "AI support · Replies instantly",
  navy: "#1a2d4a",
  blue: "#1f6fb2",
  gradient: "linear-gradient(135deg, #1a2d4a 0%, #1f6fb2 100%)",
};

const GREETING = {
  role: "assistant",
  id: "greeting",
  ts: Date.now(),
  content:
    "👋 Hi! I'm the Logicsoft AI assistant.\n\nI can help you with web development, mobile apps, cybersecurity, cloud, and more.\n\nWhat can I help you with today?",
};

const QUICK_REPLIES = [
  "Web development",
  "Mobile app",
  "Cybersecurity",
  "Cloud / DevOps",
  "Get a quote",
];

function getSession() {
  if (typeof window === "undefined") return null;
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function waURL(number, text) {
  return `${WA_BASE}/${number}?text=${encodeURIComponent(text)}`;
}

function fmtTime(ts) {
  return new Date(ts).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function nl2p(text) {
  return text
    .split("\n")
    .filter(Boolean)
    .map((line, i) => (
      <p key={i} className={i > 0 ? "mt-1" : ""}>
        {line}
      </p>
    ));
}

const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.306A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
      fill="#25D366"
    />
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
      fill="white"
    />
  </svg>
);

const SendIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const BotIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" />
    <line x1="16" y1="16" x2="16" y2="16" />
  </svg>
);

const ChatIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1f6fb2"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const DotSpinner = () => (
  <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#9ca3af",
          display: "inline-block",
          animation: `ls-bounce 1.2s ${i * 0.2}s infinite ease-in-out`,
        }}
      />
    ))}
  </div>
);

function AiMessage({ msg }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 8,
        marginBottom: 12,
      }}
    >
      {/* Bot avatar */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: BRAND.gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <BotIcon />
      </div>

      <div style={{ maxWidth: "78%" }}>
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "16px 16px 16px 4px",
            padding: "10px 14px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.65 }}>
            {nl2p(msg.content)}
          </div>
        </div>
        <p
          style={{
            fontSize: 10,
            color: "#d1d5db",
            marginTop: 3,
            marginLeft: 2,
          }}
        >
          {fmtTime(msg.ts)}
        </p>
      </div>
    </motion.div>
  );
}

function UserMessage({ msg }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}
    >
      <div style={{ maxWidth: "78%" }}>
        <div
          style={{
            background: BRAND.gradient,
            borderRadius: "16px 16px 4px 16px",
            padding: "10px 14px",
            boxShadow: "0 2px 8px rgba(31,111,178,0.25)",
          }}
        >
          <p
            style={{ fontSize: 13, color: "#fff", lineHeight: 1.65, margin: 0 }}
          >
            {msg.content}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 3,
            marginTop: 3,
            marginRight: 2,
          }}
        >
          <p style={{ fontSize: 10, color: "#d1d5db" }}>{fmtTime(msg.ts)}</p>
          <CheckIcon />
        </div>
      </div>
    </motion.div>
  );
}

function TypingBubble() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 8,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: BRAND.gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <BotIcon />
      </div>
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "16px 16px 16px 4px",
          padding: "12px 16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <DotSpinner />
      </div>
    </div>
  );
}

function StaffCard({ member, onTap }) {
  const available = member.isAvailableNow;
  return (
    <motion.button
      whileHover={{ scale: 1.015, boxShadow: "0 6px 20px rgba(0,0,0,0.09)" }}
      whileTap={{ scale: 0.985 }}
      onClick={() => onTap(member)}
      style={{
        width: "100%",
        textAlign: "left",
        border: "1px solid #e5e7eb",
        borderRadius: 14,
        background: "#fff",
        padding: "14px 14px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        cursor: "pointer",
        transition: "border-color 0.2s",
        marginBottom: 10,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#25D366")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
    >
      {/* Avatar */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${member.avatarColor}, ${member.avatarColor}bb)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: 0.5,
          }}
        >
          {member.avatarInitials}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: -1,
            right: -1,
            width: 13,
            height: 13,
            borderRadius: "50%",
            background: available ? "#22c55e" : "#9ca3af",
            border: "2px solid #fff",
          }}
        />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#1a2d4a",
              margin: 0,
              truncate: "ellipsis",
            }}
          >
            {member.name}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              flexShrink: 0,
              marginLeft: 8,
            }}
          >
            <WaIcon />
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </div>
        </div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "2px 0 4px" }}>
          {member.role}
        </p>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: available ? "#059669" : "#9ca3af",
            margin: 0,
          }}
        >
          {available ? "● Available now" : "● Away · replies in a few hours"}
        </p>
      </div>
    </motion.button>
  );
}

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("ai");
  const [msgs, setMsgs] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState([]);
  const [staffLoading, setStaffLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const [everOpened, setEverOpened] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [online, setOnline] = useState(true);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const sessionId = useRef(getSession());

  const scrollBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  useEffect(scrollBottom, [msgs, loading, scrollBottom]);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!everOpened) setShowNudge(true);
    }, 8000);
    return () => clearTimeout(t);
  }, [everOpened]);

  useEffect(() => {
    if (tab === "whatsapp" && staff.length === 0) loadStaff();
  }, [tab]);

  useEffect(() => {
    if (isOpen) {
      setUnread(0);
      setEverOpened(true);
      setShowNudge(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const loadStaff = async () => {
    setStaffLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/chat/staff`);
      const data = await res.json();

      if (
        res.ok &&
        data.success &&
        Array.isArray(data.staff) &&
        data.staff.length > 0
      ) {
        setStaff(data.staff);
      } else {
        throw new Error("No staff returned from API");
      }
    } catch {
      setStaff([
        {
          _id: "1",
          name: "Elijah O Alexander",
          role: "Sales & Account Manager",
          whatsappNumber: "2349012688861",
          whatsappGreeting:
            "Hi Elijah! I was just chatting with the Logicsoft AI assistant and I'd like to discuss a project.",
          avatarInitials: "EA",
          avatarColor: "#1f6fb2",
          isAvailableNow: true,
        },
        {
          _id: "2",
          name: "Treasure Alexander",
          role: "Technical Lead",
          whatsappNumber: "2348136616434",
          whatsappGreeting:
            "Hi Treasure! I was just chatting with the Logicsoft AI assistant and I have some technical questions.",
          avatarInitials: "TA",
          avatarColor: "#7c3aed",
          isAvailableNow: false,
        },
      ]);
    } finally {
      setStaffLoading(false);
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading || !online) return;

    const userMsg = {
      role: "user",
      id: `u-${Date.now()}`,
      ts: Date.now(),
      content: text,
    };
    setMsgs((p) => [...p, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionId.current,
          message: text,
          pageUrl: window.location.href,
        }),
      });
      const data = await res.json();
      const reply =
        data.reply || "Sorry, I couldn't process that. Please try again.";

      setMsgs((p) => [
        ...p,
        {
          role: "assistant",
          id: `a-${Date.now()}`,
          ts: Date.now(),
          content: reply,
        },
      ]);
      if (!isOpen) setUnread((c) => c + 1);
    } catch {
      setMsgs((p) => [
        ...p,
        {
          role: "assistant",
          id: `e-${Date.now()}`,
          ts: Date.now(),
          content:
            "Connection issue — please try again or reach us on WhatsApp.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleStaffTap = async (member) => {
    // Log transfer
    fetch(`${API_BASE}/api/chat/transfer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: sessionId.current,
        staffName: member.name,
      }),
    }).catch(() => {});
    // Open WhatsApp
    window.open(
      waURL(member.whatsappNumber, member.whatsappGreeting),
      "_blank",
      "noopener,noreferrer",
    );
  };

  const isFirstMsg = msgs.length === 1 && msgs[0].id === "greeting";

  return (
    <>
      {/* Keyframe styles */}
      <style>{`
        @keyframes ls-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
        @keyframes ls-ping{75%,100%{transform:scale(1.9);opacity:0}}
        @keyframes ls-fadein{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .ls-scroll::-webkit-scrollbar{width:4px}
        .ls-scroll::-webkit-scrollbar-track{background:transparent}
        .ls-scroll::-webkit-scrollbar-thumb{background:#e5e7eb;border-radius:9px}
        .ls-input:focus{outline:none}
      `}</style>

      {/* ── FLOATING BUTTON + NUDGE ─── */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 10,
        }}
      >
        {/* Nudge bubble */}
        <AnimatePresence>
          {showNudge && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              onClick={() => {
                setIsOpen(true);
                setShowNudge(false);
              }}
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "14px 14px 4px 14px",
                padding: "10px 14px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                cursor: "pointer",
                maxWidth: 180,
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1a2d4a",
                  margin: "0 0 2px",
                }}
              >
                👋 Need help?
              </p>
              <p style={{ fontSize: 11.5, color: "#6b7280", margin: 0 }}>
                Chat with us — we reply instantly
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen((o) => !o)}
          aria-label={isOpen ? "Close chat" : "Open chat"}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: BRAND.gradient,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 24px rgba(31,111,178,0.45)",
            position: "relative",
          }}
        >
          {/* Ping ring */}
          {!isOpen && (
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "rgba(31,111,178,0.35)",
                animation: "ls-ping 2s cubic-bezier(0,0,0.2,1) infinite",
              }}
            />
          )}

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ color: "#fff", display: "flex" }}
              >
                <CloseIcon />
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ display: "flex" }}
              >
                <ChatIcon />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Unread badge */}
          <AnimatePresence>
            {unread > 0 && !isOpen && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "#ef4444",
                  border: "2.5px solid #fff",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {unread}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── CHAT PANEL ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              bottom: 96,
              right: 24,
              zIndex: 9998,
              width: "clamp(320px, 90vw, 375px)",
              height: "clamp(480px, 72vh, 580px)",
              borderRadius: 20,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.18), 0 4px 20px rgba(0,0,0,0.1)",
              background: "#f3f4f6",
            }}
          >
            {/* ── HEADER ── */}
            <div
              style={{
                background: BRAND.gradient,
                flexShrink: 0,
                padding: "16px 16px 0",
              }}
            >
              {/* Top row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {/* Logo circle */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4l3 3" />
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        color: "#fff",
                        fontSize: 14.5,
                        fontWeight: 700,
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {BRAND.name}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        marginTop: 2,
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: online ? "#4ade80" : "#9ca3af",
                        }}
                      />
                      <p
                        style={{
                          color: "rgba(255,255,255,0.7)",
                          fontSize: 10.5,
                          margin: 0,
                        }}
                      >
                        {online ? BRAND.tagline : "You're offline"}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "none",
                    borderRadius: 8,
                    padding: 6,
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Tab switcher */}
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  background: "rgba(0,0,0,0.2)",
                  borderRadius: "12px 12px 0 0",
                  padding: "4px 4px 0",
                }}
              >
                {[
                  {
                    key: "ai",
                    label: "AI Chat",
                    icon: (
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      >
                        <rect x="3" y="11" width="18" height="10" rx="2" />
                        <circle cx="12" cy="5" r="2" />
                        <path d="M12 7v4" />
                      </svg>
                    ),
                  },
                  { key: "whatsapp", label: "WhatsApp", icon: <WaIcon /> },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      padding: "8px 4px",
                      border: "none",
                      borderRadius: "8px 8px 0 0",
                      fontSize: 12.5,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      background: tab === t.key ? "#f3f4f6" : "transparent",
                      color:
                        tab === t.key ? BRAND.navy : "rgba(255,255,255,0.75)",
                    }}
                  >
                    {t.icon}
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ─ AI TAB ─ */}
            <AnimatePresence mode="wait">
              {tab === "ai" && (
                <motion.div
                  key="ai"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                  }}
                >
                  {/* Messages area */}
                  <div
                    className="ls-scroll"
                    style={{
                      flex: 1,
                      overflowY: "auto",
                      padding: "16px 14px 8px",
                    }}
                  >
                    {msgs.map((m) =>
                      m.role === "assistant" ? (
                        <AiMessage key={m.id} msg={m} />
                      ) : (
                        <UserMessage key={m.id} msg={m} />
                      ),
                    )}
                    {loading && <TypingBubble />}
                    <div ref={bottomRef} />
                  </div>

                  {/* Quick replies */}
                  {isFirstMsg && (
                    <div
                      style={{
                        padding: "0 14px 10px",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                      }}
                    >
                      {QUICK_REPLIES.map((q) => (
                        <button
                          key={q}
                          onClick={() => {
                            setInput(q);
                            inputRef.current?.focus();
                          }}
                          style={{
                            fontSize: 11.5,
                            fontWeight: 600,
                            padding: "5px 10px",
                            border: `1px solid ${BRAND.blue}40`,
                            borderRadius: 20,
                            background: `${BRAND.blue}0d`,
                            color: BRAND.blue,
                            cursor: "pointer",
                            transition: "all 0.15s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `${BRAND.blue}20`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = `${BRAND.blue}0d`;
                          }}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Input row */}
                  <div
                    style={{
                      background: "#fff",
                      borderTop: "1px solid #e5e7eb",
                      padding: "10px 12px 10px",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: 8,
                      }}
                    >
                      <textarea
                        ref={inputRef}
                        className="ls-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder={
                          online ? "Type a message…" : "You're offline"
                        }
                        disabled={!online}
                        rows={1}
                        style={{
                          flex: 1,
                          resize: "none",
                          border: "1px solid #e5e7eb",
                          borderRadius: 12,
                          padding: "9px 12px",
                          fontSize: 13,
                          lineHeight: 1.5,
                          fontFamily: "inherit",
                          background: "#f9fafb",
                          color: "#1f2937",
                          maxHeight: 72,
                          transition: "border-color 0.2s",
                          scrollbarWidth: "none",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = BRAND.blue)
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!input.trim() || loading || !online}
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 11,
                          border: "none",
                          background:
                            !input.trim() || loading || !online
                              ? "#e5e7eb"
                              : BRAND.gradient,
                          color:
                            !input.trim() || loading || !online
                              ? "#9ca3af"
                              : "#fff",
                          cursor:
                            !input.trim() || loading || !online
                              ? "not-allowed"
                              : "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "all 0.2s",
                        }}
                      >
                        {loading ? (
                          <div
                            style={{
                              width: 14,
                              height: 14,
                              borderRadius: "50%",
                              border: "2px solid #9ca3af",
                              borderTopColor: "transparent",
                              animation: "ls-bounce 0.6s linear infinite",
                            }}
                          />
                        ) : (
                          <SendIcon />
                        )}
                      </button>
                    </div>
                    <p
                      style={{
                        fontSize: 10,
                        color: "#d1d5db",
                        textAlign: "center",
                        marginTop: 7,
                        marginBottom: 0,
                      }}
                    >
                      Powered by Logicsoft AI · Responses are automated
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ─ WHATSAPP TAB ─ */}
              {tab === "whatsapp" && (
                <motion.div
                  key="wa"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.18 }}
                  className="ls-scroll"
                  style={{ flex: 1, overflowY: "auto", padding: "18px 14px" }}
                >
                  {/* Header text */}
                  <div style={{ marginBottom: 18 }}>
                    <p
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#1a2d4a",
                        margin: "0 0 4px",
                      }}
                    >
                      Talk to our team
                    </p>
                    <p
                      style={{
                        fontSize: 12.5,
                        color: "#6b7280",
                        margin: 0,
                        lineHeight: 1.65,
                      }}
                    >
                      Pick a team member to start a WhatsApp conversation. Your
                      message goes directly to them.
                    </p>
                  </div>

                  {/* Staff cards */}
                  {staffLoading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "32px 0",
                      }}
                    >
                      <div style={{ display: "flex", gap: 5 }}>
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: "#d1d5db",
                              animation: `ls-bounce 1.2s ${i * 0.2}s infinite`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    staff.map((m) => (
                      <StaffCard
                        key={m._id}
                        member={m}
                        onTap={handleStaffTap}
                      />
                    ))
                  )}

                  {/* Switch back prompt */}
                  <div
                    style={{
                      marginTop: 4,
                      marginBottom: 14,
                      border: "1px dashed #e5e7eb",
                      borderRadius: 12,
                      padding: "12px 14px",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 12,
                        color: "#9ca3af",
                        margin: "0 0 6px",
                      }}
                    >
                      Want an instant answer?
                    </p>
                    <button
                      onClick={() => setTab("ai")}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: BRAND.blue,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      <ArrowIcon />
                      Switch to AI Chat
                    </button>
                  </div>

                  {/* Office hours */}
                  <div
                    style={{
                      background: "#fffbeb",
                      border: "1px solid #fde68a",
                      borderRadius: 12,
                      padding: "10px 14px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: "#92400e",
                        margin: "0 0 2px",
                      }}
                    >
                      🕐 Office hours
                    </p>
                    <p
                      style={{
                        fontSize: 11.5,
                        color: "#b45309",
                        margin: "0 0 2px",
                      }}
                    >
                      Monday – Friday · 8:00 AM – 6:00 PM WAT
                    </p>
                    <p style={{ fontSize: 11, color: "#d97706", margin: 0 }}>
                      Outside hours? Our AI is always on.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
