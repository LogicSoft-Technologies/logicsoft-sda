"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Archive,
  CalendarDays,
  ExternalLink,
  Pencil,
  Sparkles,
  Trash2,
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

export default function PostTable({ posts, onArchived, onDeleted }) {
  const [archivingId, setArchivingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  async function archive(post) {
    const confirmed = window.confirm(
      `Archive "${post.title}"? It will no longer appear publicly, but remains recoverable in the database.`
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

  async function remove(post) {
    const confirmed = window.confirm(
      `Permanently delete "${post.title}"? This cannot be undone — the article will be removed completely.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(post.id);
      await adminApi.deletePost(post.id);
      onDeleted?.(post.id);
    } catch (error) {
      window.alert(error.message || "Unable to delete this post.");
    } finally {
      setDeletingId(null);
    }
  }

  if (!posts.length) {
    return (
      <div className="px-6 py-20 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center bg-[#eaf3fb] text-[#065bad]">
          <Sparkles className="h-5 w-5" />
        </span>

        <h3
          className="mt-5 text-2xl leading-tight text-[#111827]"
          style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600 }}
        >
          No articles found
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-[#4b5563]">
          Try changing your filters, searching for another term, or start a new
          article for the LogicSoft Insights library.
        </p>

        <Link
          href="/admin/posts/new"
          className="mt-6 inline-flex items-center gap-2 px-4 py-3 text-[12px] font-bold text-white transition bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A]"
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
        <thead className="border-b border-white/60 bg-white/40">
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

        <tbody className="divide-y divide-white/50">
          {posts.map((post) => (
            <tr
              key={post.id}
              className="group transition-colors hover:bg-white/40"
            >
              <td className="max-w-[360px] px-6 py-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center bg-[#eaf3fb] text-[#065bad]">
                    <span
                      className="text-sm font-bold"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {post.title?.charAt(0)?.toUpperCase() || "L"}
                    </span>
                  </span>

                  <div className="min-w-0">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="block truncate text-[13px] font-bold text-[#111827] transition-colors group-hover:text-[#065bad]"
                    >
                      {post.title}
                    </Link>

                    <p className="mt-1 truncate text-[11.5px] text-slate-400">
                      /blog/{post.slug}
                    </p>

                    {post.featured && (
                      <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#065bad]">
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
                <span className="inline-flex bg-[#eaf3fb] px-2.5 py-1 text-[11px] font-semibold text-[#065bad]">
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
                      className="grid h-8 w-8 place-items-center border border-white/60 bg-white/50 text-[#065bad] transition hover:border-[#065bad] hover:bg-[#eaf3fb]"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  )}

                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    title="Edit article"
                    className="grid h-8 w-8 place-items-center border border-white/60 bg-white/50 text-[#111827] transition hover:border-[#065bad] hover:text-[#065bad]"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>

                  {post.status !== "ARCHIVED" && (
                    <button
                      type="button"
                      onClick={() => archive(post)}
                      disabled={archivingId === post.id}
                      title="Archive article"
                      className="grid h-8 w-8 place-items-center border border-white/60 bg-white/50 text-slate-500 transition hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Archive className="h-3.5 w-3.5" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => remove(post)}
                    disabled={deletingId === post.id}
                    title="Delete permanently"
                    className="grid h-8 w-8 place-items-center border border-white/60 bg-white/50 text-slate-500 transition hover:border-red-400 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}