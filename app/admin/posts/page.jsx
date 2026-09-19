"use client";

import Link from "next/link";
import {
  Archive,
  CheckCircle2,
  FileText,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import PostTable from "@/components/admin/PostTable";
import { adminApi } from "@/lib/admin-api";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");

    const params = new URLSearchParams({
      page: "1",
      pageSize: "100",
    });

    if (status) params.set("status", status);
    if (query.trim()) params.set("q", query.trim());

    try {
      const response = await adminApi.posts(`?${params.toString()}`);
      setPosts(response.posts || []);
    } catch (requestError) {
      setError(requestError.message || "Unable to load articles.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [status]);

  const metrics = useMemo(
    () => ({
      total: posts.length,
      published: posts.filter((post) => post.status === "PUBLISHED").length,
      drafts: posts.filter((post) => post.status === "DRAFT").length,
      archived: posts.filter((post) => post.status === "ARCHIVED").length,
    }),
    [posts]
  );

  const statCards = [
    {
      label: "All articles",
      value: metrics.total,
      icon: FileText,
      iconClass: "bg-[#eaf3fb] text-[#065bad]",
    },
    {
      label: "Published",
      value: metrics.published,
      icon: CheckCircle2,
      iconClass: "bg-[#eafbf2] text-[#0a7d3e]",
    },
    {
      label: "Drafts",
      value: metrics.drafts,
      icon: FileText,
      iconClass: "bg-amber-50 text-amber-600",
    },
    {
      label: "Archived",
      value: metrics.archived,
      icon: Archive,
      iconClass: "bg-slate-100 text-slate-500",
    },
  ];

  return (
    <div className="relative pb-10">
      {/* Decorative background blobs — matches login page */}
      <div className="pointer-events-none absolute -left-24 top-40 h-96 w-96 rounded-full bg-[#065bad]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-96 h-96 w-96 rounded-full bg-[#0a7d3e]/10 blur-3xl" />

      <section className="relative overflow-hidden bg-[#0b1b33] px-6 py-8 sm:px-8 sm:py-10">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10" />
        <div className="absolute -bottom-28 right-32 h-56 w-56 rounded-full bg-[#065bad]/20 blur-3xl" />
        <div className="absolute -bottom-16 left-20 h-40 w-40 rounded-full bg-[#0a7d3e]/15 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8ac8f2]">
              <Sparkles className="h-3.5 w-3.5" />
              LogicSoft Content Engine
            </div>

            <h1
              className="mt-4 text-3xl leading-tight text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600 }}
            >
              Publish with purpose.
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65">
              Create, organize, and publish the insights that position LogicSoft
              as the trusted technology partner.
            </p>
          </div>

          <Link
            href="/admin/posts/new"
            className="inline-flex w-fit items-center gap-2 px-5 py-3.5 text-[13px] font-bold text-white transition bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A]"
          >
            <Plus className="h-4 w-4" />
            Create article
          </Link>
        </div>
      </section>

      <section className="relative grid gap-4 py-6 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="border border-white/60 bg-white/50 backdrop-blur-2xl p-5 ring-1 ring-white/40 ring-inset shadow-[0_8px_30px_rgba(6,91,173,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(6,91,173,0.12)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    {card.label}
                  </p>
                  <p
                    className="mt-2 text-3xl leading-none text-[#111827]"
                    style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600 }}
                  >
                    {card.value}
                  </p>
                </div>

                <span className={`grid h-10 w-10 place-items-center ${card.iconClass}`}>
                  <Icon className="h-5 w-5" />
                </span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="relative border border-white/60 bg-white/50 backdrop-blur-2xl ring-1 ring-white/40 ring-inset shadow-[0_8px_30px_rgba(6,91,173,0.08)]">
        <div className="flex flex-col justify-between gap-4 border-b border-white/50 px-5 py-5 sm:px-6 lg:flex-row lg:items-center">
          <div>
            <h2
              className="text-2xl leading-tight text-[#111827]"
              style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600 }}
            >
              Article library
            </h2>
            <p className="mt-1 text-[13px] text-[#4b5563]">
              Search, filter, and manage your published knowledge.
            </p>
          </div>

          <span className="w-fit bg-[#eaf3fb] px-3 py-1.5 text-[11px] font-bold text-[#065bad]">
            {metrics.total} {metrics.total === 1 ? "article" : "articles"} shown
          </span>
        </div>

        <div className="flex flex-col gap-3 border-b border-white/50 bg-white/30 p-5 sm:flex-row sm:p-6">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              load();
            }}
            className="flex flex-1"
          >
            <label htmlFor="article-search" className="sr-only">
              Search articles
            </label>

            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="article-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by article title or slug..."
                className="w-full border border-[#cfe3f2] bg-[#fbfdff] py-3 pl-11 pr-4 text-[13px] text-[#111827] outline-none transition placeholder:text-slate-400 focus:border-[#065bad] focus:bg-white focus:ring-2 focus:ring-[#065bad]/15"
              />
            </div>

            <button
              type="submit"
              className="px-5 text-[12px] font-bold text-white transition bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A]"
            >
              Search
            </button>
          </form>

          <label className="sr-only" htmlFor="status-filter">
            Filter by status
          </label>

          <select
            id="status-filter"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="border border-[#cfe3f2] bg-[#fbfdff] px-4 py-3 text-[13px] font-medium text-[#111827] outline-none focus:border-[#065bad]"
          >
            <option value="">All statuses</option>
            <option value="DRAFT">Drafts</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        {error && (
          <div className="m-5 border-l-4 border-red-500 bg-red-50 px-4 py-3 text-[13px] text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid min-h-72 place-items-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#d8e4f0] border-t-[#065bad]" />
              <p className="mt-4 text-[13px] font-medium text-slate-500">
                Loading your article library…
              </p>
            </div>
          </div>
        ) : (
          <PostTable
            posts={posts}
            onArchived={(id) =>
              setPosts((current) =>
                current.map((post) =>
                  post.id === id
                    ? { ...post, status: "ARCHIVED", featured: false }
                    : post
                )
              )
            }
          />
        )}
      </section>
    </div>
  );
}