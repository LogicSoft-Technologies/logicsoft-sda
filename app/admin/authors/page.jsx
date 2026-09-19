"use client";

import { useEffect, useState } from "react";
import { Plus, Users } from "lucide-react";

import { adminApi } from "@/lib/admin-api";

const inputClasses =
  "mt-2 w-full border border-[#cfe3f2] bg-[#fbfdff] px-4 py-3 text-[13px] text-[#111827] outline-none transition placeholder:text-slate-400 focus:border-[#065bad] focus:bg-white focus:ring-2 focus:ring-[#065bad]/15";

const fieldLabelClasses =
  "mt-5 block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500";

export default function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    jobTitle: "",
    avatar: "",
    bio: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .authors()
      .then(({ authors: list }) => setAuthors(list || []))
      .catch((requestError) => setError(requestError.message));
  }, []);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");

    try {
      const { author } = await adminApi.createAuthor(form);
      setAuthors((current) => [...current, author]);
      setForm({
        name: "",
        jobTitle: "",
        avatar: "",
        bio: "",
      });
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#065bad]">
          Publishing team
        </p>
        <h1
          className="mt-2 text-[35px] leading-tight text-[#111827]"
          style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600 }}
        >
          Authors
        </h1>
      </div>

      {error && (
        <p
          role="alert"
          className="mb-6 border-l-4 border-red-500 bg-red-50 px-4 py-3 text-[12px] leading-relaxed text-red-700"
        >
          {error}
        </p>
      )}

      <div className="grid gap-7 xl:grid-cols-[400px_1fr]">
        <form
          onSubmit={submit}
          className="h-fit border border-white/60 bg-white/50 backdrop-blur-2xl p-6 ring-1 ring-white/40 ring-inset"
        >
          <p className="text-[12px] font-bold text-[#111827]">
            Add an author
          </p>

          <label className={fieldLabelClasses}>Name</label>
          <input
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            className={inputClasses}
            required
          />

          <label className={fieldLabelClasses}>Job title</label>
          <input
            value={form.jobTitle}
            onChange={(event) => update("jobTitle", event.target.value)}
            className={inputClasses}
          />

          <label className={fieldLabelClasses}>Avatar URL</label>
          <input
            type="url"
            value={form.avatar}
            onChange={(event) => update("avatar", event.target.value)}
            className={inputClasses}
          />

          <label className={fieldLabelClasses}>Bio</label>
          <textarea
            value={form.bio}
            onChange={(event) => update("bio", event.target.value)}
            rows={5}
            className={`${inputClasses} resize-y leading-relaxed`}
          />

          <button className="mt-5 inline-flex items-center gap-2 px-4 py-3 text-[12px] font-bold text-white transition bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A]">
            <Plus className="h-3.5 w-3.5" />
            Add author
          </button>
        </form>

        <section className="grid gap-4 md:grid-cols-2">
          {authors.map((author) => (
            <article
              key={author.id}
              className="border border-white/60 bg-white/50 backdrop-blur-2xl p-6 ring-1 ring-white/40 ring-inset shadow-[0_8px_30px_rgba(6,91,173,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(6,91,173,0.12)]"
            >
              <div className="flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center bg-[#eaf3fb] text-[14px] font-bold text-[#065bad]">
                  {author.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <div>
                  <h2 className="text-[14px] font-bold text-[#111827]">
                    {author.name}
                  </h2>
                  <p className="mt-1 text-[11.5px] text-slate-500">
                    {author.jobTitle || "Author"}
                  </p>
                </div>
              </div>

              {author.bio && (
                <p className="mt-5 text-[12.5px] leading-relaxed text-slate-600">
                  {author.bio}
                </p>
              )}

              <p className="mt-5 border-t border-white/60 pt-4 text-[11px] text-slate-500">
                {author._count?.posts || 0} published or draft articles
              </p>
            </article>
          ))}

          {!authors.length && (
            <div className="border border-dashed border-[#cfe3f2] bg-white/30 p-10 text-center text-[13px] text-slate-500">
              <Users className="mx-auto h-5 w-5 text-[#065bad]" />
              <p className="mt-3">Add your first author.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}