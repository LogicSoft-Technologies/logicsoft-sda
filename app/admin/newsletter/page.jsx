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
    if (!window.confirm(`Archive “${edition.title}”?`)) return;

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
    <div>
      <div className="mb-8">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#1f6fb2]">
          Audience communication
        </p>
        <h1 className="mt-2 font-serif text-[35px] text-[#1f3a5f]">
          Newsletter drafts
        </h1>
      </div>

      <p className="mb-7 max-w-3xl text-[13.5px] leading-relaxed text-slate-600">
        Create and review drafts here. Send final campaigns through Brevo after
        approval; do not automatically email subscribers at publication time.
      </p>

      {error && (
        <p className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </p>
      )}

      <div className="grid gap-7 xl:grid-cols-[1fr_420px]">
        <section className="border border-[#e2eaf3] bg-white p-6">
          <p className="text-[12px] font-bold text-[#1f3a5f]">
            Existing drafts
          </p>

          <div className="mt-5 space-y-3">
            {editions.map((edition) => (
              <article
                key={edition.id}
                className="border border-[#edf2f7] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[13px] font-bold text-[#1f3a5f]">
                      {edition.title}
                    </p>
                    <p className="mt-1 text-[12px] text-slate-500">
                      Subject: {edition.subject}
                    </p>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1f6fb2]">
                      {edition.status}
                    </p>
                  </div>

                  {edition.status !== "ARCHIVED" && (
                    <button
                      onClick={() => archive(edition)}
                      className="grid h-8 w-8 place-items-center border border-[#d8e4f0] text-slate-500 hover:border-red-300 hover:text-red-600"
                      title="Archive draft"
                    >
                      <Archive className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </article>
            ))}

            {!editions.length && (
              <p className="border border-dashed border-[#cbd9e7] p-10 text-center text-[13px] text-slate-500">
                No newsletter drafts yet.
              </p>
            )}
          </div>
        </section>

        <form onSubmit={submit} className="h-fit border border-[#e2eaf3] bg-white p-6">
          <p className="text-[12px] font-bold text-[#1f3a5f]">
            Create a draft
          </p>

          <label className="mt-5 block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
            Internal title
          </label>
          <input
            value={form.title}
            onChange={(event) => update("title", event.target.value)}
            className="mt-2 w-full border border-[#cbd9e7] px-4 py-3 text-[13px] outline-none focus:border-[#1f6fb2]"
            required
          />

          <label className="mt-5 block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
            Email subject
          </label>
          <input
            value={form.subject}
            onChange={(event) => update("subject", event.target.value)}
            className="mt-2 w-full border border-[#cbd9e7] px-4 py-3 text-[13px] outline-none focus:border-[#1f6fb2]"
            required
          />

          <label className="mt-5 block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
            Preview text
          </label>
          <input
            value={form.previewText}
            onChange={(event) => update("previewText", event.target.value)}
            maxLength={200}
            className="mt-2 w-full border border-[#cbd9e7] px-4 py-3 text-[13px] outline-none focus:border-[#1f6fb2]"
          />

          <label className="mt-5 block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
            Email HTML
          </label>
          <textarea
            value={form.htmlContent}
            onChange={(event) => update("htmlContent", event.target.value)}
            rows={15}
            className="mt-2 w-full resize-y border border-[#cbd9e7] bg-[#fbfdff] px-4 py-3 font-mono text-[11px] leading-relaxed outline-none focus:border-[#1f6fb2]"
            required
          />

          <button className="mt-5 inline-flex items-center gap-2 bg-[#1f6fb2] px-4 py-3 text-[12px] font-bold text-white">
            <MailPlus className="h-3.5 w-3.5" />
            Save newsletter draft
          </button>
        </form>
      </div>
    </div>
  );
}