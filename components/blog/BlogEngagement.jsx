"use client";

import { useState } from "react";
import { Heart, MessageCircle, Send, ThumbsUp } from "lucide-react";

const initialComments = [
  {
    id: 1,
    name: "LogicSoft Reader",
    message: "Great insight. Thanks for sharing this.",
    date: "Just now",
  },
];

export default function BlogEngagement({ postTitle }) {
  const [reactions, setReactions] = useState({
    like: 12,
    love: 8,
  });
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [comments, setComments] = useState(initialComments);
  const [form, setForm] = useState({ name: "", message: "" });

  function react(type) {
    if (selectedReaction === type) {
      setReactions((current) => ({
        ...current,
        [type]: current[type] - 1,
      }));
      setSelectedReaction(null);
      return;
    }

    setReactions((current) => ({
      ...current,
      ...(selectedReaction
        ? { [selectedReaction]: current[selectedReaction] - 1 }
        : {}),
      [type]: current[type] + 1,
    }));

    setSelectedReaction(type);
  }

  function submitComment(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.message.trim()) return;

    setComments((current) => [
      {
        id: Date.now(),
        name: form.name.trim(),
        message: form.message.trim(),
        date: "Just now",
      },
      ...current,
    ]);

    setForm({ name: "", message: "" });
  }

  return (
    <section className="mt-12 border-t border-[#e2eaf3] pt-10">
      <div className="rounded-2xl border border-[#e2eaf3] bg-[#f8fbff] p-6 sm:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
          Was this helpful?
        </p>

        <h2 className="mt-2 font-serif text-2xl text-[#1f3a5f]">
          Share your reaction
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Let us know what you think about “{postTitle}”.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => react("like")}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              selectedReaction === "like"
                ? "border-[#1f6fb2] bg-[#1f6fb2] text-white"
                : "border-[#cdddeb] bg-white text-[#1f3a5f] hover:border-[#1f6fb2]"
            }`}
          >
            <ThumbsUp size={16} />
            Helpful <span>{reactions.like}</span>
          </button>

          <button
            type="button"
            onClick={() => react("love")}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              selectedReaction === "love"
                ? "border-rose-500 bg-rose-500 text-white"
                : "border-[#cdddeb] bg-white text-[#1f3a5f] hover:border-rose-400"
            }`}
          >
            <Heart size={16} />
            Love it <span>{reactions.love}</span>
          </button>

          <span className="inline-flex items-center gap-2 px-2 text-sm text-slate-500">
            <MessageCircle size={16} />
            {comments.length} comment{comments.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-serif text-2xl text-[#1f3a5f]">Join the discussion</h2>
        <p className="mt-2 text-sm text-slate-500">
          Share a thoughtful comment or question.
        </p>

        <form
          onSubmit={submitComment}
          className="mt-6 rounded-2xl border border-[#e2eaf3] bg-white p-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-[#1f3a5f]">
              Your name
              <input
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                required
                placeholder="Enter your name"
                className="mt-2 w-full rounded-lg border border-[#d7e3ee] px-4 py-3 text-sm outline-none transition focus:border-[#1f6fb2] focus:ring-2 focus:ring-[#1f6fb2]/15"
              />
            </label>
          </div>

          <label className="mt-5 block text-sm font-semibold text-[#1f3a5f]">
            Your comment
            <textarea
              value={form.message}
              onChange={(event) =>
                setForm((current) => ({ ...current, message: event.target.value }))
              }
              required
              rows={5}
              placeholder="What did you think?"
              className="mt-2 w-full resize-none rounded-lg border border-[#d7e3ee] px-4 py-3 text-sm outline-none transition focus:border-[#1f6fb2] focus:ring-2 focus:ring-[#1f6fb2]/15"
            />
          </label>

          <button
            type="submit"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#1f6fb2] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#175b94]"
          >
            <Send size={16} />
            Post comment
          </button>
        </form>

        <div className="mt-8 space-y-4">
          {comments.map((comment) => (
            <article
              key={comment.id}
              className="rounded-xl border border-[#e2eaf3] bg-white p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-[#1f3a5f]">{comment.name}</h3>
                <span className="text-xs text-slate-400">{comment.date}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {comment.message}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}