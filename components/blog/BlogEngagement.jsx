"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Heart,
  LoaderCircle,
  ThumbsUp,
} from "lucide-react";

const BACKEND_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
).replace(/\/$/, "");

const EMPTY_FEEDBACK = {
  helpful: 0,
  love: 0,
  total: 0,
  selectedReaction: null,
};

function reactionUrl(slug) {
  return `${BACKEND_URL}/api/blog/posts/${encodeURIComponent(slug)}/reaction`;
}

function reactionsUrl(slug) {
  return `${BACKEND_URL}/api/blog/posts/${encodeURIComponent(slug)}/reactions`;
}

function createOptimisticFeedback(current, nextReaction) {
  const previousReaction = current.selectedReaction;

  let helpful = current.helpful;
  let love = current.love;

  if (previousReaction === "HELPFUL") helpful = Math.max(0, helpful - 1);
  if (previousReaction === "LOVE") love = Math.max(0, love - 1);

  if (nextReaction === "HELPFUL") helpful += 1;
  if (nextReaction === "LOVE") love += 1;

  return {
    helpful,
    love,
    total: helpful + love,
    selectedReaction: nextReaction,
  };
}

export default function BlogEngagement({ slug, postTitle }) {
  const [feedback, setFeedback] = useState(EMPTY_FEEDBACK);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadFeedback() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(reactionsUrl(slug), {
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Could not load article reactions.");
        }

        const data = await response.json();

        if (active) {
          setFeedback(data.feedback || EMPTY_FEEDBACK);
        }
      } catch {
        if (active) {
          setError("Reactions are temporarily unavailable.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    if (slug) loadFeedback();

    return () => {
      active = false;
    };
  }, [slug]);

  async function submitReaction(reaction) {
    if (submitting || !slug) return;

    const nextReaction =
      feedback.selectedReaction === reaction ? null : reaction;

    const previousFeedback = feedback;
    setFeedback(createOptimisticFeedback(previousFeedback, nextReaction));
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(reactionUrl(slug), {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reaction: nextReaction,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not save your reaction.");
      }

      setFeedback(data.feedback || EMPTY_FEEDBACK);
    } catch (requestError) {
      setFeedback(previousFeedback);
      setError(
        requestError.message || "Your reaction could not be saved. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const selectedHelpful = feedback.selectedReaction === "HELPFUL";
  const selectedLove = feedback.selectedReaction === "LOVE";

  return (
    <section
      className="mt-14 border-y border-[#dbe7f3] py-10"
      aria-label="Article feedback"
    >
      <div className="grid gap-7 border border-[#dbe7f3] bg-[#f5f8fc] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
            Article feedback
          </p>

          <h2 className="mt-3 font-serif text-[27px] leading-tight text-[#1f3a5f]">
            Was this insight useful?
          </h2>

          <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-slate-600">
            Your feedback helps our team create more useful technology and
            business insight.
          </p>

          {feedback.total > 0 && !loading && (
            <p className="mt-4 flex items-center gap-2 text-[12px] font-medium text-slate-500">
              <CheckCircle2 className="h-4 w-4 text-[#1f6fb2]" />
              {feedback.total} reader{feedback.total === 1 ? "" : "s"} reacted
              to this article.
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-3 lg:justify-end">
          <button
            type="button"
            onClick={() => submitReaction("HELPFUL")}
            disabled={loading || submitting}
            aria-pressed={selectedHelpful}
            className={`inline-flex min-w-[128px] items-center justify-center gap-2 border px-4 py-3 text-[13px] font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
              selectedHelpful
                ? "border-[#1f6fb2] bg-[#1f6fb2] text-white"
                : "border-[#c9dceb] bg-white text-[#1f3a5f] hover:border-[#1f6fb2] hover:text-[#1f6fb2]"
            }`}
          >
            {submitting && selectedHelpful ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <ThumbsUp className="h-4 w-4" />
            )}
            Helpful
            <span className={selectedHelpful ? "text-white/75" : "text-slate-400"}>
              {feedback.helpful}
            </span>
          </button>

          <button
            type="button"
            onClick={() => submitReaction("LOVE")}
            disabled={loading || submitting}
            aria-pressed={selectedLove}
            className={`inline-flex min-w-[128px] items-center justify-center gap-2 border px-4 py-3 text-[13px] font-bold transition-all disabled:cursor-not-allowed disabled:opacity-60 ${
              selectedLove
                ? "border-[#a61e3c] bg-gradient-to-br from-[#b42345] via-[#d6325a] to-[#ee5b78] text-white shadow-[0_8px_20px_rgba(180,35,69,0.25)]"
                : "border-[#efb5c3] bg-[#fff5f7] text-[#a61e3c] hover:border-[#d6325a] hover:bg-[#ffe8ee] hover:shadow-[0_6px_16px_rgba(180,35,69,0.12)]"
            }`}
          >
            {submitting && selectedLove ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <Heart
                className={`h-4 w-4 ${selectedLove ? "fill-current" : ""}`}
              />
            )}

            Love it

            <span className={selectedLove ? "text-white/80" : "text-[#c13a57]"}>
              {feedback.love}
            </span>
          </button>
        </div>
      </div>

      {error && (
        <p
          role="status"
          className="mt-4 flex items-center gap-2 text-[12px] text-amber-700"
        >
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      )}

      <p className="mt-5 text-[11.5px] leading-relaxed text-slate-400">
        You may change or remove your reaction at any time. Feedback is stored
        anonymously and does not publish your identity.
      </p>
    </section>
  );
}