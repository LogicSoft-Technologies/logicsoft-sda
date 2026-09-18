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

const inputClasses =
  "mt-2 w-full border border-[#cfe3f2] bg-[#fbfdff] px-4 py-3 text-[14px] text-[#111827] outline-none transition placeholder:text-slate-400 focus:border-[#065bad] focus:bg-white focus:ring-2 focus:ring-[#065bad]/15";

const labelClasses = "block text-[12px] font-bold text-[#111827]";

const cardClasses =
  "border border-white/60 bg-white/50 backdrop-blur-2xl p-6 ring-1 ring-white/40 ring-inset shadow-[0_8px_30px_rgba(6,91,173,0.06)]";

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
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/60 border-t-[#065bad]" />
      </div>
    );
  }

  return (
    <form className="space-y-7" onSubmit={(event) => save(event)}>
      <div className="flex flex-col justify-between gap-4 border-b border-white/60 pb-6 md:flex-row md:items-end">
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#065bad]">
            {postId ? "Edit article" : "New article"}
          </p>

          <h1
            className="mt-2 text-[33px] leading-tight text-[#111827]"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600 }}
          >
            {postId ? "Refine your insight." : "Write a new insight."}
          </h1>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 border border-white/60 bg-white/50 px-4 py-3 text-[12px] font-bold text-[#111827] transition hover:border-[#065bad] hover:text-[#065bad] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" />
            Save draft
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={(event) => save(event, "PUBLISHED")}
            className="inline-flex items-center gap-2 px-4 py-3 text-[12px] font-bold text-white transition bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            Publish
          </button>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="border-l-4 border-red-500 bg-red-50 px-4 py-3 text-[12px] leading-relaxed text-red-700"
        >
          {error}
        </p>
      )}

      <section className="grid gap-7 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <div className={cardClasses}>
            <label className={labelClasses}>Article title</label>

            <input
              value={form.title}
              onChange={(event) => update("title", event.target.value)}
              className={`${inputClasses} text-[16px]`}
              placeholder="How to build reliable enterprise software"
              required
            />

            <label className={`mt-5 ${labelClasses}`}>URL slug</label>

            <input
              value={form.slug}
              onChange={(event) => update("slug", event.target.value)}
              className={inputClasses}
              placeholder="Generated from title if empty"
            />

            <label className={`mt-5 ${labelClasses}`}>Excerpt</label>

            <textarea
              value={form.excerpt}
              onChange={(event) => update("excerpt", event.target.value)}
              rows={4}
              maxLength={600}
              className={`${inputClasses} resize-y leading-relaxed`}
              required
            />

            <label className={`mt-5 ${labelClasses}`}>Article content</label>

            <p className="mt-1 text-[11.5px] leading-relaxed text-slate-500">
              Use safe HTML: paragraphs, headings, links, lists, blockquotes,
              images, tables, and code blocks are supported.
            </p>

            <textarea
              value={form.content}
              onChange={(event) => update("content", event.target.value)}
              rows={24}
              className={`${inputClasses} resize-y font-mono text-[12px] leading-relaxed`}
              required
            />
          </div>

          <div className={cardClasses}>
            <p className="text-[12px] font-bold text-[#111827]">SEO</p>

            <label className={`mt-5 ${labelClasses}`}>SEO title</label>

            <input
              value={form.seoTitle || ""}
              onChange={(event) => update("seoTitle", event.target.value)}
              maxLength={70}
              className={inputClasses}
            />

            <label className={`mt-5 ${labelClasses}`}>Meta description</label>

            <textarea
              value={form.seoDescription || ""}
              onChange={(event) =>
                update("seoDescription", event.target.value)
              }
              rows={3}
              maxLength={160}
              className={`${inputClasses} resize-y`}
            />

            <label className={`mt-5 ${labelClasses}`}>Canonical URL</label>

            <input
              type="url"
              value={form.canonicalUrl || ""}
              onChange={(event) => update("canonicalUrl", event.target.value)}
              placeholder="Leave blank to use the LogicSoft article URL"
              className={inputClasses}
            />
          </div>
        </div>

        <aside className="space-y-6">
          <div className={cardClasses}>
            <label className={labelClasses}>Author</label>

            <select
              value={form.authorId}
              onChange={(event) => update("authorId", event.target.value)}
              className={`${inputClasses} py-3 text-[13px]`}
              required
            >
              <option value="">Select author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>

            <label className={`mt-5 ${labelClasses}`}>Category</label>

            <select
              value={form.categoryId || ""}
              onChange={(event) => update("categoryId", event.target.value)}
              className={`${inputClasses} py-3 text-[13px]`}
            >
              <option value="">No category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <p className={`mt-5 ${labelClasses}`}>Tags</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => {
                const selected = form.tagIds.includes(tag.id);

                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`border px-2.5 py-1.5 text-[11px] font-semibold transition ${
                      selected
                        ? "border-[#065bad] bg-[#065bad] text-white"
                        : "border-white/60 bg-white/50 text-slate-600 hover:border-[#065bad] hover:text-[#065bad]"
                    }`}
                  >
                    {tag.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={cardClasses}>
            <label className={labelClasses}>Cover image URL</label>

            <input
              type="url"
              value={form.coverImage || ""}
              onChange={(event) => update("coverImage", event.target.value)}
              className={`${inputClasses} py-3 text-[13px]`}
            />

            <label className={`mt-5 ${labelClasses}`}>
              Cover image alt text
            </label>

            <input
              value={form.coverImageAlt || ""}
              onChange={(event) =>
                update("coverImageAlt", event.target.value)
              }
              className={`${inputClasses} py-3 text-[13px]`}
            />

            <label className="mt-5 flex items-center gap-2 text-[12px] font-bold text-[#111827]">
              <input
                type="checkbox"
                checked={Boolean(form.featured)}
                onChange={(event) => update("featured", event.target.checked)}
                className="accent-[#065bad]"
              />
              Feature on Insights home
            </label>
          </div>

          <div className={cardClasses}>
            <label className={labelClasses}>Publishing status</label>

            <select
              value={form.status}
              onChange={(event) => update("status", event.target.value)}
              className={`${inputClasses} py-3 text-[13px]`}
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>

            <label className={`mt-5 ${labelClasses}`}>Publish date</label>

            <input
              type="datetime-local"
              value={form.publishedAt}
              onChange={(event) => update("publishedAt", event.target.value)}
              className={`${inputClasses} py-3 text-[13px]`}
            />

            <label className={`mt-5 ${labelClasses}`}>
              Schedule for later
            </label>

            <input
              type="datetime-local"
              value={form.scheduledFor}
              onChange={(event) => update("scheduledFor", event.target.value)}
              className={`${inputClasses} py-3 text-[13px]`}
            />
          </div>
        </aside>
      </section>
    </form>
  );
}