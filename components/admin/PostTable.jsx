"use client";

import Link from "next/link";
import { Archive, ExternalLink, Pencil } from "lucide-react";

import { adminApi } from "@/lib/admin-api";

function formatDate(date) {
  if (!date) return "—";

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
  async function archive(post) {
    const confirmed = window.confirm(
      `Archive “${post.title}”? It will no longer appear publicly, but remains recoverable in the database.`
    );

    if (!confirmed) return;

    try {
      await adminApi.archivePost(post.id);
      onArchived?.(post.id);
    } catch (error) {
      window.alert(error.message || "Unable to archive this post.");
    }
  }

  if (!posts.length) {
    return (
      <div className="border border-dashed border-[#cbd9e7] bg-white px-6 py-16 text-center">
        <p className="font-serif text-[25px] text-[#1f3a5f]">
          No articles found.
        </p>

        <Link
          href="/admin/posts/new"
          className="mt-5 inline-block text-[13px] font-bold text-[#1f6fb2]"
        >
          Create the first article →
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-[#e2eaf3] bg-white">
      <table className="min-w-[850px] w-full text-left">
        <thead className="border-b border-[#e2eaf3] bg-[#f8fafc]">
          <tr>
            {["Article", "Status", "Category", "Published", "Updated", ""].map(
              (heading) => (
                <th
                  key={heading}
                  className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.13em] text-slate-500"
                >
                  {heading}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-[#edf2f7]">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-[#f8fafc]">
              <td className="max-w-sm px-5 py-4">
                <p className="truncate text-[13px] font-bold text-[#1f3a5f]">
                  {post.title}
                </p>

                <p className="mt-1 truncate text-[11.5px] text-slate-500">
                  /blog/{post.slug}
                </p>
              </td>

              <td className="px-5 py-4">
                <span
                  className={`border px-2.5 py-1 text-[10px] font-bold tracking-wide ${
                    statusStyles[post.status] || statusStyles.DRAFT
                  }`}
                >
                  {post.status}
                </span>
              </td>

              <td className="px-5 py-4 text-[12px] text-slate-600">
                {post.category?.name || "—"}
              </td>

              <td className="px-5 py-4 text-[12px] text-slate-600">
                {formatDate(post.publishedAt)}
              </td>

              <td className="px-5 py-4 text-[12px] text-slate-600">
                {formatDate(post.updatedAt)}
              </td>

              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-2">
                  {post.status === "PUBLISHED" && (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      title="View public article"
                      className="grid h-8 w-8 place-items-center border border-[#d8e4f0] text-[#1f6fb2]"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  )}

                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    title="Edit article"
                    className="grid h-8 w-8 place-items-center border border-[#d8e4f0] text-[#1f3a5f] hover:border-[#1f6fb2]"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>

                  {post.status !== "ARCHIVED" && (
                    <button
                      onClick={() => archive(post)}
                      title="Archive article"
                      className="grid h-8 w-8 place-items-center border border-[#d8e4f0] text-slate-500 hover:border-red-300 hover:text-red-600"
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