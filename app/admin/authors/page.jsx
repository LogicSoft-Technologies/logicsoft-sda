"use client";

import { useEffect, useState } from "react";
import { Plus, Users } from "lucide-react";

import { adminApi } from "@/lib/admin-api";

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
        <p className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#1f6fb2]">
          Publishing team
        </p>
        <h1 className="mt-2 font-serif text-[35px] text-[#1f3a5f]">
          Authors
        </h1>
      </div>

      {error && (
        <p className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </p>
      )}

      <div className="grid gap-7 xl:grid-cols-[400px_1fr]">
        <form
          onSubmit={submit}
          className="h-fit border border-[#e2eaf3] bg-white p-6"
        >
          <p className="text-[12px] font-bold text-[#1f3a5f]">
            Add an author
          </p>

          <label className="mt-5 block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
            Name
          </label>
          <input
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            className="mt-2 w-full border border-[#cbd9e7] px-4 py-3 text-[13px] outline-none focus:border-[#1f6fb2]"
            required
          />

          <label className="mt-5 block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
            Job title
          </label>
          <input
            value={form.jobTitle}
            onChange={(event) => update("jobTitle", event.target.value)}
            className="mt-2 w-full border border-[#cbd9e7] px-4 py-3 text-[13px] outline-none focus:border-[#1f6fb2]"
          />

          <label className="mt-5 block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
            Avatar URL
          </label>
          <input
            type="url"
            value={form.avatar}
            onChange={(event) => update("avatar", event.target.value)}
            className="mt-2 w-full border border-[#cbd9e7] px-4 py-3 text-[13px] outline-none focus:border-[#1f6fb2]"
          />

          <label className="mt-5 block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
            Bio
          </label>
          <textarea
            value={form.bio}
            onChange={(event) => update("bio", event.target.value)}
            rows={5}
            className="mt-2 w-full resize-y border border-[#cbd9e7] px-4 py-3 text-[13px] outline-none focus:border-[#1f6fb2]"
          />

          <button className="mt-5 inline-flex items-center gap-2 bg-[#1f6fb2] px-4 py-3 text-[12px] font-bold text-white">
            <Plus className="h-3.5 w-3.5" />
            Add author
          </button>
        </form>

        <section className="grid gap-4 md:grid-cols-2">
          {authors.map((author) => (
            <article
              key={author.id}
              className="border border-[#e2eaf3] bg-white p-6"
            >
              <div className="flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center bg-[#eaf4ff] text-[14px] font-bold text-[#1f6fb2]">
                  {author.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <div>
                  <h2 className="text-[14px] font-bold text-[#1f3a5f]">
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

              <p className="mt-5 border-t border-[#edf2f7] pt-4 text-[11px] text-slate-500">
                {author._count?.posts || 0} published or draft articles
              </p>
            </article>
          ))}

          {!authors.length && (
            <div className="border border-dashed border-[#cbd9e7] p-10 text-center text-[13px] text-slate-500">
              <Users className="mx-auto h-5 w-5 text-[#1f6fb2]" />
              <p className="mt-3">Add your first author.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}