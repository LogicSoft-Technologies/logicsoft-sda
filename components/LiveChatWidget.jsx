"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ElijahAvatar from "../public/images/founders/elijah.jpg";
import SaviourAvatar from "../public/images/founders/saviourr.jpg";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const SESSION_KEY = "ls_chat_sid";
const WA_BASE = "https://wa.me";

const BRAND = {
  name: "Logicsoft Technologies",
  tagline: "Digital receptionist · Always available",
  navy: "#1a2d4a",
  blue: "#1f6fb2",
  gradient: "linear-gradient(135deg, #1a2d4a 0%, #1f6fb2 100%)",
};

const GREETING = {
  role: "assistant",
  id: "greeting",
  ts: Date.now(),
  content:
    "Welcome to Logicsoft Technologies. I'm Treasure, your AI receptionist, here to help you make the most of your visit.\n\n \n\nHow may I assist you today?",
};

const QUICK_REPLIES = [
  "Web development",
  "Mobile app",
  "Cybersecurity",
  "Cloud / DevOps",
  "Get a quote",
  "Book a consultation",
];

function getSession() {
  if (typeof window === "undefined") return null;
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36);
  localStorage.setItem(SESSION_KEY, id);
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
  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#9ca3af",
          display: "inline-block",
          animation: `ls-dot 1.2s ${i * 0.2}s infinite ease-in-out`,
        }}
      />
    ))}
  </div>
);

function Mascot({
  expression = "neutral",
  talking = false,
  entering = false,
  size = 40,
}) {
  const X = (name, children) => (
    <g
      key={name}
      style={{
        opacity: expression === name ? 1 : 0,
        transform: expression === name ? "scale(1)" : "scale(0.85)",
        transformBox: "fill-box",
        transformOrigin: "center",
        transition: "opacity .35s ease, transform .35s ease",
        pointerEvents: "none",
      }}
    >
      {children}
    </g>
  );

  return (
    <span
      className={entering ? "ls-mascot-enter" : ""}
      style={{ display: "inline-block", lineHeight: 0, overflow: "visible" }}
    >
      <span
        className={`ls-mascot-bounce${talking ? " ls-mascot-talking" : ""}`}
        style={{ display: "inline-block", lineHeight: 0 }}
      >
        <svg
          viewBox="0 0 500 450"
          width={size}
          height={size}
          style={{
            display: "block",
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          <g className="ls-mascot-head">
            <g className="ls-mascot-antenna">
              <line
                x1="250"
                y1="100"
                x2="250"
                y2="55"
                stroke="#ff5e0e"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <circle cx="250" cy="40" r="16" fill="#ff5e0e" />
            </g>

            <rect
              x="25"
              y="210"
              width="35"
              height="100"
              rx="17"
              fill="#000000"
            />
            <rect
              x="440"
              y="210"
              width="35"
              height="100"
              rx="17"
              fill="#000000"
            />

            <path
              d="M 250 95 C 130 95 75 175 75 260 C 75 370 140 415 250 415 C 360 415 425 370 425 260 C 425 175 370 95 250 95 Z"
              fill="#ff5e0e"
            />

            <rect
              x="145"
              y="160"
              width="210"
              height="200"
              rx="55"
              fill="#ffffff"
            />
            <rect
              x="170"
              y="195"
              width="160"
              height="70"
              rx="35"
              fill="#ff5e0e"
            />

            {/* neutral = talking face. Mouth dots only move when `talking`. */}
            {X("neutral", [
              <circle
                key="e1"
                className="ls-mascot-eye"
                cx="205"
                cy="230"
                r="18"
                fill="#000000"
              />,
              <circle
                key="e2"
                className="ls-mascot-eye"
                cx="295"
                cy="230"
                r="18"
                fill="#000000"
              />,
              <circle
                key="m1"
                className="ls-mascot-dot ls-mascot-dot-1"
                cx="200"
                cy="325"
                r="10"
                fill="#000000"
              />,
              <circle
                key="m2"
                className="ls-mascot-dot ls-mascot-dot-2"
                cx="233"
                cy="325"
                r="10"
                fill="#000000"
              />,
              <circle
                key="m3"
                className="ls-mascot-dot ls-mascot-dot-3"
                cx="266"
                cy="325"
                r="10"
                fill="#000000"
              />,
              <circle
                key="m4"
                className="ls-mascot-dot ls-mascot-dot-4"
                cx="299"
                cy="325"
                r="10"
                fill="#000000"
              />,
            ])}

            {X("happy", [
              <path
                key="h1"
                d="M 190 236 Q 205 216 220 236"
                fill="none"
                stroke="#000000"
                strokeWidth="10"
                strokeLinecap="round"
              />,
              <path
                key="h2"
                d="M 280 236 Q 295 216 310 236"
                fill="none"
                stroke="#000000"
                strokeWidth="10"
                strokeLinecap="round"
              />,
              <path
                key="h3"
                d="M 195 310 Q 250 355 305 310"
                fill="none"
                stroke="#000000"
                strokeWidth="12"
                strokeLinecap="round"
              />,
            ])}

            {X("surprised", [
              <circle key="s1" cx="205" cy="230" r="24" fill="#000000" />,
              <circle key="s2" cx="295" cy="230" r="24" fill="#000000" />,
              <ellipse
                key="s3"
                cx="250"
                cy="325"
                rx="22"
                ry="28"
                fill="#000000"
              />,
            ])}

            {X("wink", [
              <circle key="w1" cx="205" cy="230" r="18" fill="#000000" />,
              <path
                key="w2"
                d="M 280 230 Q 295 240 310 230"
                fill="none"
                stroke="#000000"
                strokeWidth="9"
                strokeLinecap="round"
              />,
              <path
                key="w3"
                d="M 200 320 Q 250 340 300 315"
                fill="none"
                stroke="#000000"
                strokeWidth="12"
                strokeLinecap="round"
              />,
            ])}

            {X("sleepy", [
              <path
                key="sl1"
                d="M 190 230 Q 205 240 220 230"
                fill="none"
                stroke="#000000"
                strokeWidth="9"
                strokeLinecap="round"
              />,
              <path
                key="sl2"
                d="M 280 230 Q 295 240 310 230"
                fill="none"
                stroke="#000000"
                strokeWidth="9"
                strokeLinecap="round"
              />,
              <line
                key="sl3"
                x1="220"
                y1="325"
                x2="280"
                y2="325"
                stroke="#000000"
                strokeWidth="10"
                strokeLinecap="round"
              />,
            ])}
          </g>
        </svg>
      </span>
    </span>
  );
}

/* Small mascot badge used as the avatar on AI messages + typing bubble. */
function BotAvatar({ size = 28, expression = "happy", talking = false }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      <Mascot
        expression={expression}
        talking={talking}
        size={Math.round(size * 0.86)}
      />
    </div>
  );
}

/* "Wanna talk? 😏" — backgroundless so it never feels caged.
   Just floating text + a little trail of dots rising toward the mascot. */
function ThoughtBubble({ text, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 6 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          style={{
            position: "absolute",
            top: 50,
            left: 62,
            zIndex: 5,
            background: "transparent",
            border: "none",
            boxShadow: "none",
            padding: 0,
          }}
        >
          <p
            style={{
              fontSize: 12.5,
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
              whiteSpace: "nowrap",
              textShadow: "0 1px 5px rgba(0,0,0,0.35)",
            }}
          >
            {text}
          </p>
          {/* thought trail — plain dots, no boxes */}
          <span
            style={{
              position: "absolute",
              top: -7,
              left: 10,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.95)",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: -13,
              left: 4,
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.85)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AiMessage({ msg, talking = false }) {
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
      {/* Mascot avatar — mouth moves while this message is "talking". */}
      <BotAvatar
        size={28}
        expression={talking ? "neutral" : "happy"}
        talking={talking}
      />
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
          Treasure · {fmtTime(msg.ts)}
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
  // Mascot mutters (mouth moves) while it's "composing" the reply.
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 8,
        marginBottom: 12,
      }}
    >
      <BotAvatar size={28} expression="neutral" talking />
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
      <div style={{ position: "relative", flexShrink: 0 }}>
        {member.avatar ? (
          <img
            src={member.avatar}
            alt={member.name}
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
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
        )}
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

  // mascot choreography (only inside the opened card)
  const [mascotExpr, setMascotExpr] = useState("surprised");
  const [headerTalking, setHeaderTalking] = useState(false);
  const [mascotEntering, setMascotEntering] = useState(false);
  const [showThought, setShowThought] = useState(false);
  const [choreoActive, setChoreoActive] = useState(false);
  const [talkingId, setTalkingId] = useState(null);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const sessionId = useRef(getSession());
  const prevMsgCount = useRef(msgs.length);

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

  useEffect(() => {
    if (!isOpen) return;
    setMascotExpr("surprised");
    setMascotEntering(true);
    setHeaderTalking(false);
    setShowThought(false);
    setTalkingId(null);
    setChoreoActive(true);

    const t1 = setTimeout(() => {
      setMascotEntering(false);
      setMascotExpr("neutral");
      setHeaderTalking(true);
      setTalkingId("greeting");
    }, 1100);
    const t2 = setTimeout(() => setShowThought(true), 1350);
    const t3 = setTimeout(() => setMascotExpr("wink"), 2700);
    const t4 = setTimeout(() => setShowThought(false), 4100);
    const t5 = setTimeout(() => {
      setMascotExpr("happy");
      setHeaderTalking(false);
      setTalkingId(null);
      setChoreoActive(false);
    }, 4400);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [isOpen]);

  useEffect(() => {
    if (choreoActive) return;
    setHeaderTalking(loading);
    setMascotExpr(loading ? "neutral" : "happy");
  }, [loading, choreoActive]);

  useEffect(() => {
    if (msgs.length > prevMsgCount.current) {
      const last = msgs[msgs.length - 1];
      if (
        last.role === "assistant" &&
        last.id !== "greeting" &&
        !choreoActive
      ) {
        setTalkingId(last.id);
        setMascotExpr("happy");
        const t = setTimeout(
          () => setTalkingId((cur) => (cur === last.id ? null : cur)),
          3200,
        );
        prevMsgCount.current = msgs.length;
        return () => clearTimeout(t);
      }
    }
    prevMsgCount.current = msgs.length;
  }, [msgs, choreoActive]);

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
      } else throw new Error("No staff returned from API");
    } catch {
      setStaff([
        {
          _id: "1",
          name: "Elijah O Alexander",
          role: "Client Collaborator",
          whatsappNumber: "2349012688861",
          whatsappGreeting:
            "Hi Elijah! I've just been speaking with Treasure, the Logicsoft receptionist, and I'd like to discuss a project.",
          avatarInitials: "EA",
          avatarColor: "#1f6fb2",
          isAvailableNow: true,
          avatar: ElijahAvatar.src,
        },
        {
          _id: "2",
          name: "Saviour Oviahon",
          role: "Technical Lead",
          whatsappNumber: "2347034302056",
          whatsappGreeting:
            "Hi Saviour! I've just been speaking with Treasure, the Logicsoft receptionist, and I have a few technical questions.",
          avatarInitials: "SO",
          avatarColor: "#7c3aed",
          isAvailableNow: false,
          avatar: SaviourAvatar.src,
        },
      ]);
    } finally {
      setStaffLoading(false);
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading || !online) return;

    const bookingIntent =
      /book|schedule|consultation|call|meeting|calendar/i.test(text);
    if (bookingIntent && process.env.NEXT_PUBLIC_CALENDAR_URL) {
      window.open(
        process.env.NEXT_PUBLIC_CALENDAR_URL,
        "_blank",
        "noopener,noreferrer",
      );
    }

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
        data.reply ||
        "I wasn't able to complete that request. Could you try again, or rephrase your question?";
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
            "I'm having trouble reaching our network just now. Please try again shortly, or message our team directly on WhatsApp.",
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
    fetch(`${API_BASE}/api/chat/transfer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: sessionId.current,
        staffName: member.name,
      }),
    }).catch(() => {});
    window.open(
      waURL(member.whatsappNumber, member.whatsappGreeting),
      "_blank",
      "noopener,noreferrer",
    );
  };

  const isFirstMsg = msgs.length === 1 && msgs[0].id === "greeting";

  return (
    <>
      <style>{`
        @keyframes ls-dot{0%,60%,100%{transform:scale(0.6);opacity:0.5}30%{transform:scale(1);opacity:1}}
        @keyframes ls-ping{75%,100%{transform:scale(1.9);opacity:0}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .ls-scroll::-webkit-scrollbar{width:4px}
        .ls-scroll::-webkit-scrollbar-track{background:transparent}
        .ls-scroll::-webkit-scrollbar-thumb{background:#e5e7eb;border-radius:9px}
        .ls-input:focus{outline:none}
        .ls-input::placeholder{color:#9ca3af}

        /* ---------- MASCOT ANIMATIONS ---------- */
        .ls-mascot-bounce{animation:ls-mascot-bounce 2.4s ease-in-out infinite}
        @keyframes ls-mascot-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-10%)}}

        .ls-mascot-head{transform-origin:250px 260px;animation:ls-mascot-head 6s ease-in-out infinite}
        @keyframes ls-mascot-head{0%{transform:translateY(0) rotate(0)}20%{transform:translateY(-4px) rotate(-2deg)}40%{transform:translateY(0) rotate(0)}60%{transform:translateY(-3px) rotate(2deg)}80%{transform:translateY(0) rotate(0)}100%{transform:translateY(0) rotate(0)}}

        .ls-mascot-antenna{transform-origin:250px 100px;animation:ls-mascot-antenna 2.6s ease-in-out infinite}
        @keyframes ls-mascot-antenna{0%{transform:rotate(0)}25%{transform:rotate(8deg)}50%{transform:rotate(0)}75%{transform:rotate(-8deg)}100%{transform:rotate(0)}}

        .ls-mascot-eye{transform-box:fill-box;transform-origin:center;animation:ls-mascot-blink 4.5s infinite}
        @keyframes ls-mascot-blink{0%,92%,100%{transform:scaleY(1)}94%{transform:scaleY(0.1)}96%{transform:scaleY(1)}}

        /* mouth dots are STILL unless the mascot is talking */
        .ls-mascot-dot{transform-box:fill-box;transform-origin:center}
        .ls-mascot-talking .ls-mascot-dot-1{animation:ls-mascot-talk1 .42s ease-in-out infinite}
        .ls-mascot-talking .ls-mascot-dot-2{animation:ls-mascot-talk2 .35s ease-in-out infinite .08s}
        .ls-mascot-talking .ls-mascot-dot-3{animation:ls-mascot-talk3 .5s ease-in-out infinite .18s}
        .ls-mascot-talking .ls-mascot-dot-4{animation:ls-mascot-talk1 .38s ease-in-out infinite .26s}
        @keyframes ls-mascot-talk1{0%{transform:scaleY(1)}40%{transform:scaleY(1.8)}70%{transform:scaleY(0.5)}100%{transform:scaleY(1)}}
        @keyframes ls-mascot-talk2{0%{transform:scaleY(1)}30%{transform:scaleY(0.5)}65%{transform:scaleY(2)}100%{transform:scaleY(1)}}
        @keyframes ls-mascot-talk3{0%{transform:scaleY(1)}50%{transform:scaleY(1.5)}80%{transform:scaleY(0.6)}100%{transform:scaleY(1)}}

        /* "run around / jump" entrance into the header */
        .ls-mascot-enter{animation:ls-mascot-enter 1.1s cubic-bezier(.2,.8,.3,1) both}
        @keyframes ls-mascot-enter{
          0%{transform:translateX(120px) translateY(8px) scale(.5) rotate(25deg);opacity:0}
          15%{opacity:1}
          25%{transform:translateX(40px) translateY(-18px) scale(.8) rotate(12deg)}
          40%{transform:translateX(0) translateY(0) scale(1) rotate(-6deg)}
          55%{transform:translateX(4px) translateY(-12px) scale(.96) rotate(4deg)}
          70%{transform:translateX(0) translateY(0) scale(1) rotate(-2deg)}
          85%{transform:translateX(0) translateY(-4px) scale(.99) rotate(1deg)}
          100%{transform:translate(0,0) scale(1) rotate(0)}
        }

        @media (prefers-reduced-motion: reduce){
          .ls-mascot-bounce,.ls-mascot-head,.ls-mascot-antenna,.ls-mascot-eye,
          .ls-mascot-dot,.ls-mascot-talking .ls-mascot-dot-1,.ls-mascot-talking .ls-mascot-dot-2,
          .ls-mascot-talking .ls-mascot-dot-3,.ls-mascot-talking .ls-mascot-dot-4,
          .ls-mascot-enter{animation:none !important}
        }

        /* ---------- RESPONSIVE LAYOUT (small screens) ---------- */
        @media (max-width: 480px){
          .ls-fab-wrap{bottom:16px !important;right:14px !important;gap:8px !important}
          .ls-chat-panel{
            right:12px !important;
            left:12px !important;
            bottom:84px !important;
            width:auto !important;
            height:clamp(420px,calc(100dvh - 104px),580px) !important;
          }
          .ls-fab-wrap > div{max-width:calc(100vw - 56px) !important}
        }

        @media (max-width: 360px){
          .ls-fab-wrap{bottom:14px !important;right:12px !important}
          .ls-chat-panel{bottom:80px !important;right:10px !important;left:10px !important}
        }

        @media (max-width: 900px) and (max-height: 480px) and (orientation: landscape){
          .ls-chat-panel{height:calc(100dvh - 96px) !important}
        }
      `}</style>

      {/* FLOATING BUTTON + NUDGE */}
      <div
        className="ls-fab-wrap"
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
                maxWidth: 210,
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
                Need help? Talk to Treasure
              </p>
              <p style={{ fontSize: 11.5, color: "#6b7280", margin: 0 }}>
                Your virtual receptionist · Replies in seconds
              </p>
            </motion.div>
          )}
        </AnimatePresence>

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

      {/* CHAT PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ls-chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              bottom: 96,
              right: 24,
              zIndex: 9998,
              width: "clamp(300px, calc(100vw - 24px), 375px)",
              height: "clamp(440px, 72vh, 580px)",
              borderRadius: 20,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.18), 0 4px 20px rgba(0,0,0,0.1)",
              background: "#f3f4f6",
            }}
          >
            {/* HEADER */}
            <div
              style={{
                background: BRAND.gradient,
                flexShrink: 0,
                padding: "16px 16px 0",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {/* HEADER MASCOT — talks while the AI is replying */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      overflow: "visible",
                    }}
                  >
                    <Mascot
                      expression={mascotExpr}
                      talking={headerTalking}
                      entering={mascotEntering}
                      size={40}
                    />
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

              {/* "Wanna talk? 😏" — no background, just floating text + dot trail */}
              <ThoughtBubble text="Wanna talk? 😏" visible={showThought} />

              {/* Tabs */}
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
                    label: "Reception",
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
                  { key: "whatsapp", label: "Our Team", icon: <WaIcon /> },
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

            {/* AI TAB */}
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
                        <AiMessage
                          key={m.id}
                          msg={m}
                          talking={talkingId === m.id}
                        />
                      ) : (
                        <UserMessage key={m.id} msg={m} />
                      ),
                    )}
                    {loading && <TypingBubble />}
                    <div ref={bottomRef} />
                  </div>

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
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = `${BRAND.blue}20`)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = `${BRAND.blue}0d`)
                          }
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                  <div
                    style={{
                      background: "#fff",
                      borderTop: "1px solid #e5e7eb",
                      padding: "10px 12px",
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
                          online
                            ? "How may I help you today?"
                            : "You're offline"
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
                              animation: "spin 0.6s linear infinite",
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
                      Treasure · Logicsoft virtual receptionist
                    </p>
                  </div>
                </motion.div>
              )}

              {/* WHATSAPP TAB */}
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
                  <div style={{ marginBottom: 18 }}>
                    <p
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#1a2d4a",
                        margin: "0 0 4px",
                      }}
                    >
                      Speak with our team
                    </p>
                    <p
                      style={{
                        fontSize: 12.5,
                        color: "#6b7280",
                        margin: 0,
                        lineHeight: 1.65,
                      }}
                    >
                      Choose a member of our team to reach directly on WhatsApp.
                      Each message is private and goes straight to the person
                      you select.
                    </p>
                  </div>

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
                              animation: `ls-dot 1.2s ${i * 0.2}s infinite`,
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
                      Looking for an instant response?
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
                      <ArrowIcon /> Chat with Treasure
                    </button>
                  </div>

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
                      Outside hours? Treasure, our virtual receptionist, is
                      always available.
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
