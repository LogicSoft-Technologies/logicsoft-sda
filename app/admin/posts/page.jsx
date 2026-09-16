"use client";

import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";

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
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [status]);

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#1f6fb2]">
            Publishing
          </p>
          <h1 className="mt-2 font-serif text-[35px] text-[#1f3a5f]">
            Articles
          </h1>
        </div>

        <Link
          href="/admin/posts/new"
          className="inline-flex w-fit items-center gap-2 bg-[#1f6fb2] px-4 py-3 text-[12px] font-bold text-white hover:bg-[#1a5a96]"
        >
          <Plus className="h-4 w-4" />
          New article
        </Link>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            load();
          }}
          className="flex flex-1"
        >
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title or slug"
            className="min-w-0 flex-1 border border-[#cbd9e7] bg-white px-4 py-3 text-[13px] outline-none focus:border-[#1f6fb2]"
          />

          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-[#1f3a5f] px-4 text-[12px] font-bold text-white"
          >
            <Search className="h-3.5 w-3.5" />
            Search
          </button>
        </form>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="border border-[#cbd9e7] bg-white px-3 py-3 text-[13px] outline-none focus:border-[#1f6fb2]"
        >
          <option value="">All statuses</option>
          <option value="DRAFT">Drafts</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      {error && (
        <p className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </p>
      )}

      {loading ? (
        <div className="grid min-h-56 place-items-center">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#d8e4f0] border-t-[#1f6fb2]" />
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
    </div>
  );
}