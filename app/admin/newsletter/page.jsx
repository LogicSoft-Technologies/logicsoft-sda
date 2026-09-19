"use client";

import { useEffect, useState } from "react";
import { Archive, MailPlus } from "lucide-react";

import { adminApi } from "@/lib/admin-api";

const emptyEdition = {
  title: "",
  subject: "",
  previewText: "",
  htmlContent:
    "<h1>This week at LogicSoft</h1><p>Share a useful insight with your subscribers.</p>",
  status: "DRAFT",
};

const inputClasses =
  "mt-2 w-full border border-[#cfe3f2] bg-[#fbfdff] px-4 py-3 text-[13px] text-[#111827] outline-none transition placeholder:text-slate-400 focus:border-[#065bad] focus:bg-white focus:ring-2 focus:ring-[#065bad]/15";

const fieldLabelClasses =
  "mt-5 block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500";

export default function NewsletterDraftsPage() {
  const [editions, setEditions] = useState([]);
  const [form, setForm] = useState(emptyEdition);
  const [error, setError] = useState("");

  async function load() {
    try {
      const { editions: list } = await adminApi.newsletterEditions();
      setEditions(list || []);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");

    try {
      const { edition } = await adminApi.createNewsletterEdition(form);
      setEditions((current) => [edition, ...current]);
      setForm(emptyEdition);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function archive(edition) {
    if (!window.confirm(`Archive "${edition.title}"?`)) return;

    try {
      const { edition: archived } = await adminApi.archiveNewsletterEdition(
        edition.id
      );

      setEditions((current) =>
        current.map((item) => (item.id === archived.id ? archived : item))
      );
    } catch (requestError) {
      window.alert(requestError.message);
    }
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#065bad]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-[#0a7d3e]/10 blur-3xl" />

      <div className="relative mb-8">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#065bad]">
          Audience communication
        </p>
        <h1
          className="mt-2 text-[35px] leading-tight text-[#111827]"
          style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600 }}
        >
          Newsletter drafts
        </h1>
      </div>

      <p className="relative mb-7 max-w-3xl text-[13.5px] leading-relaxed text-[#4b5563]">
        Create and review drafts here. Send final campaigns through Brevo after
        approval; do not automatically email subscribers at publication time.
      </p>

      {error && (
        <p className="relative mb-6 border-l-4 border-red-500 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </p>
      )}

      <div className="relative grid gap-7 xl:grid-cols-[1fr_420px]">
        <section className="border border-white/60 bg-white/50 backdrop-blur-2xl p-6 ring-1 ring-white/40 ring-inset shadow-[0_8px_30px_rgba(6,91,173,0.06)]">
          <p className="text-[12px] font-bold text-[#111827]">
            Existing drafts
          </p>

          <div className="mt-5 space-y-3">
            {editions.map((edition) => (
              <article
                key={edition.id}
                className="border border-white/60 bg-white/30 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[13px] font-bold text-[#111827]">
                      {edition.title}
                    </p>
                    <p className="mt-1 text-[12px] text-slate-500">
                      Subject: {edition.subject}
                    </p>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#065bad]">
                      {edition.status}
                    </p>
                  </div>

                  {edition.status !== "ARCHIVED" && (
                    <button
                      onClick={() => archive(edition)}
                      className="grid h-8 w-8 place-items-center border border-white/60 bg-white/50 text-slate-500 transition hover:border-red-300 hover:text-red-600"
                      title="Archive draft"
                    >
                      <Archive className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </article>
            ))}

            {!editions.length && (
              <p className="border border-dashed border-[#cfe3f2] bg-white/30 p-10 text-center text-[13px] text-slate-500">
                No newsletter drafts yet.
              </p>
            )}
          </div>
        </section>

        <form
          onSubmit={submit}
          className="h-fit border border-white/60 bg-white/50 backdrop-blur-2xl p-6 ring-1 ring-white/40 ring-inset shadow-[0_8px_30px_rgba(6,91,173,0.06)]"
        >
          <p className="text-[12px] font-bold text-[#111827]">
            Create a draft
          </p>

          <label className={fieldLabelClasses}>Internal title</label>
          <input
            value={form.title}
            onChange={(event) => update("title", event.target.value)}
            className={inputClasses}
            required
          />

          <label className={fieldLabelClasses}>Email subject</label>
          <input
            value={form.subject}
            onChange={(event) => update("subject", event.target.value)}
            className={inputClasses}
            required
          />

          <label className={fieldLabelClasses}>Preview text</label>
          <input
            value={form.previewText}
            onChange={(event) => update("previewText", event.target.value)}
            maxLength={200}
            className={inputClasses}
          />

          <label className={fieldLabelClasses}>Email HTML</label>
          <textarea
            value={form.htmlContent}
            onChange={(event) => update("htmlContent", event.target.value)}
            rows={15}
            className={`${inputClasses} resize-y font-mono text-[11px] leading-relaxed`}
            required
          />

          <button className="mt-5 inline-flex items-center gap-2 px-4 py-3 text-[12px] font-bold text-white transition bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A]">
            <MailPlus className="h-3.5 w-3.5" />
            Save newsletter draft
          </button>
        </form>
      </div>
    </div>
  );
}