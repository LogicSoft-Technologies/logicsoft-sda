"use client";

import { useId, useState } from "react";

const BACKEND_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
).replace(/\/$/, "");

export default function NewsletterForm({
  source = "website",
  sourcePage,
  compact = false,
  className = "",
}) {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage("Enter your email address to subscribe.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            source,
            sourcePage:
              sourcePage ||
              (typeof window !== "undefined"
                ? window.location.pathname
                : ""),
          }),
        }
      );

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || "Subscription failed.");
      }

      setStatus("success");
      setMessage(
        payload.message ||
          "Check your inbox to confirm your subscription."
      );
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error.message ||
          "We could not process your subscription. Please try again."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full ${className}`}
      noValidate
    >
      <div
        className={
          compact
            ? "flex flex-col sm:flex-row gap-3"
            : "flex flex-col gap-3"
        }
      >
        <label htmlFor={emailId} className="sr-only">
          Email address
        </label>

        <input
          id={emailId}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={status === "loading"}
          className="w-full min-w-0 border border-[#cbd5e1] bg-white px-4 py-3.5 text-[14px] text-[#1a2d4a] outline-none transition placeholder:text-slate-400 focus:border-[#1f6fb2] focus:ring-2 focus:ring-[#1f6fb2]/15 disabled:cursor-not-allowed disabled:bg-slate-50"
          required
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 bg-[#1f6fb2] px-6 py-3.5 text-[13px] font-bold text-white transition-colors hover:bg-[#1a5a96] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </div>

      {message && (
        <p
          className={`mt-3 text-[12.5px] leading-relaxed ${
            status === "error" ? "text-red-600" : "text-emerald-700"
          }`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      )}

      {!message && (
        <p className="mt-3 text-[11.5px] leading-relaxed text-slate-500">
          You will receive a confirmation email. Unsubscribe whenever you
          choose.
        </p>
      )}
    </form>
  );
}