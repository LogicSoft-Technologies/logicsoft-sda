"use client";

import { useEffect, useState } from "react";
import { Save, Send } from "lucide-react";
import { useRouter } from "next/navigation";

import { adminApi } from "@/lib/admin-api";

const blankPost = {
  title: "",
  slug: "",
  excerpt: "",
  content: "<p></p>",
  authorId: "",
  categoryId: "",
  tagIds: [],
  coverImage: "",
  coverImageAlt: "",
  seoTitle: "",
  seoDescription: "",
  canonicalUrl: "",
  status: "DRAFT",
  featured: false,
  publishedAt: "",
  scheduledFor: "",
};

function toDateTimeInput(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function mapPostToForm(post) {
  return {
    ...blankPost,
    ...post,
    authorId: post.author?.id || "",
    categoryId: post.category?.id || "",
    tagIds: post.tags?.map(({ tag }) => tag.id) || [],
    publishedAt: toDateTimeInput(post.publishedAt),
    scheduledFor: toDateTimeInput(post.scheduledFor),
  };
}

export default function PostEditor({ postId }) {
  const router = useRouter();

  const [form, setForm] = useState(blankPost);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const requests = [
          adminApi.authors(),
          adminApi.categories(),
          adminApi.tags(),
        ];

        if (postId) requests.push(adminApi.post(postId));

        const [authorData, categoryData, tagData, postData] =
          await Promise.all(requests);

        if (!active) return;

        setAuthors(authorData.authors || []);
        setCategories(categoryData.categories || []);
        setTags(tagData.tags || []);

        if (postData?.post) {
          setForm(mapPostToForm(postData.post));
        } else if (authorData.authors?.[0]) {
          setForm((current) => ({
            ...current,
            authorId: authorData.authors[0].id,
          }));
        }
      } catch (loadError) {
        if (active) {
          setError(loadError.message || "Unable to load editor data.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [postId]);

  function update(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function toggleTag(tagId) {
    setForm((current) => ({
      ...current,
      tagIds: current.tagIds.includes(tagId)
        ? current.tagIds.filter((id) => id !== tagId)
        : [...current.tagIds, tagId],
    }));
  }

  async function save(event, requestedStatus) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        status: requestedStatus || form.status,
        publishedAt: form.publishedAt
          ? new Date(form.publishedAt).toISOString()
          : null,
        scheduledFor: form.scheduledFor
          ? new Date(form.scheduledFor).toISOString()
          : null,
      };

      if (payload.status === "PUBLISHED" && !payload.publishedAt) {
        payload.publishedAt = new Date().toISOString();
      }

      if (postId) {
        await adminApi.updatePost(postId, payload);
      } else {
        await adminApi.createPost(payload);
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (saveError) {
      setError(saveError.message || "Unable to save the article.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="grid min-h-80 place-items-center">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#d8e4f0] border-t-[#1f6fb2]" />
      </div>
    );
  }

  return (
    <form className="space-y-7" onSubmit={(event) => save(event)}>
      <div className="flex flex-col justify-between gap-4 border-b border-[#e2eaf3] pb-6 md:flex-row md:items-end">
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#1f6fb2]">
            {postId ? "Edit article" : "New article"}
          </p>

          <h1 className="mt-2 font-serif text-[33px] text-[#1f3a5f]">
            {postId ? "Refine your insight." : "Write a new insight."}
          </h1>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 border border-[#cbd9e7] bg-white px-4 py-3 text-[12px] font-bold text-[#1f3a5f]"
          >
            <Save className="h-3.5 w-3.5" />
            Save draft
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={(event) => save(event, "PUBLISHED")}
            className="inline-flex items-center gap-2 bg-[#1f6fb2] px-4 py-3 text-[12px] font-bold text-white hover:bg-[#1a5a96]"
          >
            <Send className="h-3.5 w-3.5" />
            Publish
          </button>
        </div>
      </div>

      {error && (
        <div className="border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </div>
      )}

      <section className="grid gap-7 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <div className="border border-[#e2eaf3] bg-white p-6">
            <label className="block text-[12px] font-bold text-[#1f3a5f]">
              Article title
            </label>

            <input
              value={form.title}
              onChange={(event) => update("title", event.target.value)}
              className="mt-2 w-full border border-[#cbd9e7] px-4 py-3 text-[16px] outline-none focus:border-[#1f6fb2]"
              placeholder="How to build reliable enterprise software"
              required
            />

            <label className="mt-5 block text-[12px] font-bold text-[#1f3a5f]">
              URL slug
            </label>

            <input
              value={form.slug}
              onChange={(event) => update("slug", event.target.value)}
              className="mt-2 w-full border border-[#cbd9e7] px-4 py-3 text-[14px] outline-none focus:border-[#1f6fb2]"
              placeholder="Generated from title if empty"
            />

            <label className="mt-5 block text-[12px] font-bold text-[#1f3a5f]">
              Excerpt
            </label>

            <textarea
              value={form.excerpt}
              onChange={(event) => update("excerpt", event.target.value)}
              rows={4}
              maxLength={600}
              className="mt-2 w-full resize-y border border-[#cbd9e7] px-4 py-3 text-[14px] leading-relaxed outline-none focus:border-[#1f6fb2]"
              required
            />

            <label className="mt-5 block text-[12px] font-bold text-[#1f3a5f]">
              Article content
            </label>

            <p className="mt-1 text-[11.5px] leading-relaxed text-slate-500">
              Use safe HTML: paragraphs, headings, links, lists, blockquotes,
              images, tables, and code blocks are supported.
            </p>

            <textarea
              value={form.content}
              onChange={(event) => update("content", event.target.value)}
              rows={24}
              className="mt-2 w-full resize-y border border-[#cbd9e7] bg-[#fbfdff] px-4 py-3 font-mono text-[12px] leading-relaxed outline-none focus:border-[#1f6fb2]"
              required
            />
          </div>

          <div className="border border-[#e2eaf3] bg-white p-6">
            <p className="text-[12px] font-bold text-[#1f3a5f]">SEO</p>

            <label className="mt-5 block text-[12px] font-bold text-[#1f3a5f]">
              SEO title
            </label>

            <input
              value={form.seoTitle || ""}
              onChange={(event) => update("seoTitle", event.target.value)}
              maxLength={70}
              className="mt-2 w-full border border-[#cbd9e7] px-4 py-3 text-[14px] outline-none focus:border-[#1f6fb2]"
            />

            <label className="mt-5 block text-[12px] font-bold text-[#1f3a5f]">
              Meta description
            </label>

            <textarea
              value={form.seoDescription || ""}
              onChange={(event) =>
                update("seoDescription", event.target.value)
              }
              rows={3}
              maxLength={160}
              className="mt-2 w-full resize-y border border-[#cbd9e7] px-4 py-3 text-[14px] outline-none focus:border-[#1f6fb2]"
            />

            <label className="mt-5 block text-[12px] font-bold text-[#1f3a5f]">
              Canonical URL
            </label>

            <input
              type="url"
              value={form.canonicalUrl || ""}
              onChange={(event) => update("canonicalUrl", event.target.value)}
              placeholder="Leave blank to use the LogicSoft article URL"
              className="mt-2 w-full border border-[#cbd9e7] px-4 py-3 text-[14px] outline-none focus:border-[#1f6fb2]"
            />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="border border-[#e2eaf3] bg-white p-6">
            <label className="block text-[12px] font-bold text-[#1f3a5f]">
              Author
            </label>

            <select
              value={form.authorId}
              onChange={(event) => update("authorId", event.target.value)}
              className="mt-2 w-full border border-[#cbd9e7] bg-white px-3 py-3 text-[13px] outline-none focus:border-[#1f6fb2]"
              required
            >
              <option value="">Select author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>

            <label className="mt-5 block text-[12px] font-bold text-[#1f3a5f]">
              Category
            </label>

            <select
              value={form.categoryId || ""}
              onChange={(event) => update("categoryId", event.target.value)}
              className="mt-2 w-full border border-[#cbd9e7] bg-white px-3 py-3 text-[13px] outline-none focus:border-[#1f6fb2]"
            >
              <option value="">No category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <p className="mt-5 text-[12px] font-bold text-[#1f3a5f]">Tags</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => {
                const selected = form.tagIds.includes(tag.id);

                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`border px-2.5 py-1.5 text-[11px] font-semibold ${
                      selected
                        ? "border-[#1f6fb2] bg-[#1f6fb2] text-white"
                        : "border-[#d8e4f0] text-slate-600"
                    }`}
                  >
                    {tag.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border border-[#e2eaf3] bg-white p-6">
            <label className="block text-[12px] font-bold text-[#1f3a5f]">
              Cover image URL
            </label>

            <input
              type="url"
              value={form.coverImage || ""}
              onChange={(event) => update("coverImage", event.target.value)}
              className="mt-2 w-full border border-[#cbd9e7] px-3 py-3 text-[13px] outline-none focus:border-[#1f6fb2]"
            />

            <label className="mt-5 block text-[12px] font-bold text-[#1f3a5f]">
              Cover image alt text
            </label>

            <input
              value={form.coverImageAlt || ""}
              onChange={(event) =>
                update("coverImageAlt", event.target.value)
              }
              className="mt-2 w-full border border-[#cbd9e7] px-3 py-3 text-[13px] outline-none focus:border-[#1f6fb2]"
            />

            <label className="mt-5 flex items-center gap-2 text-[12px] font-bold text-[#1f3a5f]">
              <input
                type="checkbox"
                checked={Boolean(form.featured)}
                onChange={(event) => update("featured", event.target.checked)}
              />
              Feature on Insights home
            </label>
          </div>

          <div className="border border-[#e2eaf3] bg-white p-6">
            <label className="block text-[12px] font-bold text-[#1f3a5f]">
              Publishing status
            </label>

            <select
              value={form.status}
              onChange={(event) => update("status", event.target.value)}
              className="mt-2 w-full border border-[#cbd9e7] bg-white px-3 py-3 text-[13px] outline-none focus:border-[#1f6fb2]"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>

            <label className="mt-5 block text-[12px] font-bold text-[#1f3a5f]">
              Publish date
            </label>

            <input
              type="datetime-local"
              value={form.publishedAt}
              onChange={(event) => update("publishedAt", event.target.value)}
              className="mt-2 w-full border border-[#cbd9e7] px-3 py-3 text-[13px] outline-none focus:border-[#1f6fb2]"
            />

            <label className="mt-5 block text-[12px] font-bold text-[#1f3a5f]">
              Schedule for later
            </label>

            <input
              type="datetime-local"
              value={form.scheduledFor}
              onChange={(event) => update("scheduledFor", event.target.value)}
              className="mt-2 w-full border border-[#cbd9e7] px-3 py-3 text-[13px] outline-none focus:border-[#1f6fb2]"
            />
          </div>
        </aside>
      </section>
    </form>
  );
}