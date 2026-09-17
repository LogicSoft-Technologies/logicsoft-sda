"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Archive,
  CalendarDays,
  ExternalLink,
  Pencil,
  Sparkles,
} from "lucide-react";

import { adminApi } from "@/lib/admin-api";

function formatDate(date) {
  if (!date) return "Not published";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

const statusStyles = {
  DRAFT: "border-amber-200 bg-amber-50 text-amber-700",
  PUBLISHED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  ARCHIVED: "border-slate-200 bg-slate-100 text-slate-600",
};

export default function PostTable({ posts, onArchived }) {
  const [archivingId, setArchivingId] = useState(null);

  async function archive(post) {
    const confirmed = window.confirm(
      `Archive “${post.title}”? It will no longer appear publicly, but remains recoverable in the database.`
    );

    if (!confirmed) return;

    try {
      setArchivingId(post.id);
      await adminApi.archivePost(post.id);
      onArchived?.(post.id);
    } catch (error) {
      window.alert(error.message || "Unable to archive this post.");
    } finally {
      setArchivingId(null);
    }
  }

  if (!posts.length) {
    return (
      <div className="px-6 py-20 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center bg-[#eaf3fb] text-[#1f6fb2]">
          <Sparkles className="h-5 w-5" />
        </span>

        <h3 className="mt-5 font-serif text-2xl text-[#1f3a5f]">
          No articles found
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-slate-500">
          Try changing your filters, searching for another term, or start a new
          article for the LogicSoft Insights library.
        </p>

        <Link
          href="/admin/posts/new"
          className="mt-6 inline-flex items-center gap-2 bg-[#1f6fb2] px-4 py-3 text-[12px] font-bold text-white transition hover:bg-[#1a5a96]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Create an article
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-[900px] w-full text-left">
        <thead className="border-b border-[#e2eaf3] bg-[#f8fbff]">
          <tr>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Article
            </th>
            <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Publication
            </th>
            <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Category
            </th>
            <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Last updated
            </th>
            <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#edf2f7]">
          {posts.map((post) => (
            <tr
              key={post.id}
              className="group transition-colors hover:bg-[#f9fcff]"
            >
              <td className="max-w-[360px] px-6 py-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center bg-[#eaf3fb] text-[#1f6fb2]">
                    <span className="font-serif text-sm font-bold">
                      {post.title?.charAt(0)?.toUpperCase() || "L"}
                    </span>
                  </span>

                  <div className="min-w-0">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="block truncate text-[13px] font-bold text-[#1f3a5f] transition-colors group-hover:text-[#1f6fb2]"
                    >
                      {post.title}
                    </Link>

                    <p className="mt-1 truncate text-[11.5px] text-slate-400">
                      /blog/{post.slug}
                    </p>

                    {post.featured && (
                      <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#1f6fb2]">
                        <Sparkles className="h-3 w-3" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </td>

              <td className="px-5 py-5">
                <span
                  className={`inline-flex border px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] ${
                    statusStyles[post.status] || statusStyles.DRAFT
                  }`}
                >
                  {post.status || "DRAFT"}
                </span>

                <p className="mt-2 text-[11.5px] text-slate-500">
                  {formatDate(post.publishedAt)}
                </p>
              </td>

              <td className="px-5 py-5">
                <span className="inline-flex bg-[#f2f7fc] px-2.5 py-1 text-[11px] font-semibold text-[#42617f]">
                  {post.category?.name || "Uncategorized"}
                </span>
              </td>

              <td className="px-5 py-5">
                <div className="flex items-center gap-2 text-[12px] text-slate-500">
                  <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                  {formatDate(post.updatedAt)}
                </div>
              </td>

              <td className="px-6 py-5">
                <div className="flex items-center justify-end gap-2">
                  {post.status === "PUBLISHED" && (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      title="View public article"
                      className="grid h-8 w-8 place-items-center border border-[#d8e4f0] bg-white text-[#1f6fb2] transition hover:border-[#1f6fb2] hover:bg-[#eaf3fb]"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  )}

                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    title="Edit article"
                    className="grid h-8 w-8 place-items-center border border-[#d8e4f0] bg-white text-[#1f3a5f] transition hover:border-[#1f6fb2] hover:text-[#1f6fb2]"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>

                  {post.status !== "ARCHIVED" && (
                    <button
                      type="button"
                      onClick={() => archive(post)}
                      disabled={archivingId === post.id}
                      title="Archive article"
                      className="grid h-8 w-8 place-items-center border border-[#d8e4f0] bg-white text-slate-500 transition hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Archive className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}