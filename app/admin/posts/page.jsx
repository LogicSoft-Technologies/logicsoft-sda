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
      iconClass: "bg-[#eaf3fb] text-[#1f6fb2]",
    },
    {
      label: "Published",
      value: metrics.published,
      icon: CheckCircle2,
      iconClass: "bg-emerald-50 text-emerald-600",
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
    <div className="pb-10">
      <section className="relative overflow-hidden bg-[#0b1b33] px-6 py-8 sm:px-8 sm:py-10">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10" />
        <div className="absolute -bottom-28 right-32 h-56 w-56 rounded-full bg-[#1f6fb2]/20 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8ac8f2]">
              <Sparkles className="h-3.5 w-3.5" />
              LogicSoft Content Engine
            </div>

            <h1 className="mt-3 font-serif text-3xl text-white sm:text-4xl">
              Publish with purpose.
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65">
              Create, organize, and publish the insights that position LogicSoft
              as the trusted technology partner.
            </p>
          </div>

          <Link
            href="/admin/posts/new"
            className="inline-flex w-fit items-center gap-2 bg-[#1f6fb2] px-5 py-3 text-[12px] font-bold text-white transition hover:bg-[#2c82c8]"
          >
            <Plus className="h-4 w-4" />
            Create article
          </Link>
        </div>
      </section>

      <section className="grid gap-4 py-6 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="border border-[#e2eaf3] bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    {card.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-[#1f3a5f]">
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

      <section className="border border-[#e2eaf3] bg-white">
        <div className="flex flex-col justify-between gap-4 border-b border-[#eaf0f6] px-5 py-5 sm:px-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-serif text-2xl text-[#1f3a5f]">Article library</h2>
            <p className="mt-1 text-[13px] text-slate-500">
              Search, filter, and manage your published knowledge.
            </p>
          </div>

          <span className="w-fit bg-[#f2f7fc] px-3 py-1.5 text-[11px] font-bold text-[#1f6fb2]">
            {metrics.total} {metrics.total === 1 ? "article" : "articles"} shown
          </span>
        </div>

        <div className="flex flex-col gap-3 border-b border-[#eaf0f6] bg-[#fbfdff] p-5 sm:flex-row sm:p-6">
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
                className="w-full border border-[#cbd9e7] bg-white py-3 pl-11 pr-4 text-[13px] text-[#1f3a5f] outline-none transition placeholder:text-slate-400 focus:border-[#1f6fb2] focus:ring-2 focus:ring-[#1f6fb2]/10"
              />
            </div>

            <button
              type="submit"
              className="bg-[#1f3a5f] px-5 text-[12px] font-bold text-white transition hover:bg-[#153052]"
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
            className="border border-[#cbd9e7] bg-white px-4 py-3 text-[13px] font-medium text-[#1f3a5f] outline-none focus:border-[#1f6fb2]"
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
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#d8e4f0] border-t-[#1f6fb2]" />
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