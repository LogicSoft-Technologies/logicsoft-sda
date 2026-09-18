"use client";

import { useEffect, useState } from "react";
import { Plus, Tags, Trash2 } from "lucide-react";

import { adminApi } from "@/lib/admin-api";

export default function TaxonomyPage() {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [tagName, setTagName] = useState("");
  const [error, setError] = useState("");

  async function load() {
    try {
      const [categoryData, tagData] = await Promise.all([
        adminApi.categories(),
        adminApi.tags(),
      ]);

      setCategories(categoryData.categories || []);
      setTags(tagData.tags || []);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function createCategory(event) {
    event.preventDefault();
    setError("");

    try {
      const { category } = await adminApi.createCategory({
        name: categoryName,
        description: categoryDescription,
      });

      setCategories((current) => [...current, category]);
      setCategoryName("");
      setCategoryDescription("");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function createTag(event) {
    event.preventDefault();
    setError("");

    try {
      const { tag } = await adminApi.createTag({ name: tagName });
      setTags((current) => [...current, tag]);
      setTagName("");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function deleteTag(tag) {
    if (
      !window.confirm(
        `Delete "${tag.name}"? Tags attached to articles cannot be deleted.`
      )
    ) {
      return;
    }

    try {
      await adminApi.deleteTag(tag.id);
      setTags((current) => current.filter((item) => item.id !== tag.id));
    } catch (requestError) {
      window.alert(requestError.message);
    }
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#065bad]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-[#0a7d3e]/10 blur-3xl" />

      <div className="relative mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#065bad]">
          Content organization
        </p>
        <h1
          className="mt-3 text-[35px] leading-tight text-[#111827]"
          style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600 }}
        >
          Categories & tags
        </h1>
      </div>

      {error && (
        <p className="relative mb-6 border-l-4 border-red-500 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </p>
      )}

      <div className="relative grid gap-7 xl:grid-cols-2">
        <section className="border border-white/60 bg-white/50 backdrop-blur-2xl p-6 ring-1 ring-white/40 ring-inset shadow-[0_8px_30px_rgba(6,91,173,0.08)]">
          <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#065bad]">
            Categories
          </p>

          <form onSubmit={createCategory} className="mt-5 space-y-3">
            <input
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              placeholder="Category name"
              className="w-full border border-[#cfe3f2] bg-[#fbfdff] px-4 py-3 text-[13px] text-[#111827] outline-none transition placeholder:text-slate-400 focus:border-[#065bad] focus:bg-white focus:ring-2 focus:ring-[#065bad]/15"
              required
            />

            <textarea
              value={categoryDescription}
              onChange={(event) => setCategoryDescription(event.target.value)}
              placeholder="Short category description for SEO and archive page"
              rows={3}
              className="w-full resize-y border border-[#cfe3f2] bg-[#fbfdff] px-4 py-3 text-[13px] text-[#111827] outline-none transition placeholder:text-slate-400 focus:border-[#065bad] focus:bg-white focus:ring-2 focus:ring-[#065bad]/15"
            />

            <button className="inline-flex items-center gap-2 px-4 py-3 text-[12px] font-bold text-white transition bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A]">
              <Plus className="h-3.5 w-3.5" />
              Add category
            </button>
          </form>

          <div className="mt-7 divide-y divide-white/50 border-t border-white/50">
            {categories.map((category) => (
              <div key={category.id} className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[13px] font-bold text-[#111827]">
                      {category.name}
                    </p>
                    <p className="mt-1 text-[11.5px] text-slate-500">
                      /blog/category/{category.slug} ·{" "}
                      {category._count?.posts || 0} posts
                    </p>
                  </div>
                </div>

                {category.description && (
                  <p className="mt-2 text-[12px] leading-relaxed text-[#4b5563]">
                    {category.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="border border-white/60 bg-white/50 backdrop-blur-2xl p-6 ring-1 ring-white/40 ring-inset shadow-[0_8px_30px_rgba(6,91,173,0.08)]">
          <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#065bad]">
            Tags
          </p>

          <form onSubmit={createTag} className="mt-5 flex gap-2">
            <input
              value={tagName}
              onChange={(event) => setTagName(event.target.value)}
              placeholder="Add a tag"
              className="min-w-0 flex-1 border border-[#cfe3f2] bg-[#fbfdff] px-4 py-3 text-[13px] text-[#111827] outline-none transition placeholder:text-slate-400 focus:border-[#065bad] focus:bg-white focus:ring-2 focus:ring-[#065bad]/15"
              required
            />

            <button className="inline-flex items-center gap-2 px-4 py-3 text-[12px] font-bold text-white transition bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A]">
              <Plus className="h-3.5 w-3.5" />
              Add
            </button>
          </form>

          <div className="mt-7 flex flex-wrap gap-2 border-t border-white/50 pt-6">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center gap-2 border border-white/60 bg-white/40 px-3 py-2 text-[12px] font-semibold text-[#111827]"
              >
                <Tags className="h-3 w-3 text-[#065bad]" />
                {tag.name}
                <span className="text-slate-400">
                  {tag._count?.posts || 0}
                </span>

                {(tag._count?.posts || 0) === 0 && (
                  <button
                    onClick={() => deleteTag(tag)}
                    title={`Delete ${tag.name}`}
                    className="text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}