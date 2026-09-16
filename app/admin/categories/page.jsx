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
        `Delete “${tag.name}”? Tags attached to articles cannot be deleted.`
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
    <div>
      <div className="mb-8">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#1f6fb2]">
          Content organization
        </p>
        <h1 className="mt-2 font-serif text-[35px] text-[#1f3a5f]">
          Categories & tags
        </h1>
      </div>

      {error && (
        <p className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </p>
      )}

      <div className="grid gap-7 xl:grid-cols-2">
        <section className="border border-[#e2eaf3] bg-white p-6">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#1f6fb2]">
            Categories
          </p>

          <form onSubmit={createCategory} className="mt-5 space-y-3">
            <input
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              placeholder="Category name"
              className="w-full border border-[#cbd9e7] px-4 py-3 text-[13px] outline-none focus:border-[#1f6fb2]"
              required
            />

            <textarea
              value={categoryDescription}
              onChange={(event) => setCategoryDescription(event.target.value)}
              placeholder="Short category description for SEO and archive page"
              rows={3}
              className="w-full resize-y border border-[#cbd9e7] px-4 py-3 text-[13px] outline-none focus:border-[#1f6fb2]"
            />

            <button className="inline-flex items-center gap-2 bg-[#1f6fb2] px-4 py-3 text-[12px] font-bold text-white">
              <Plus className="h-3.5 w-3.5" />
              Add category
            </button>
          </form>

          <div className="mt-7 divide-y divide-[#edf2f7] border-t border-[#edf2f7]">
            {categories.map((category) => (
              <div key={category.id} className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[13px] font-bold text-[#1f3a5f]">
                      {category.name}
                    </p>
                    <p className="mt-1 text-[11.5px] text-slate-500">
                      /blog/category/{category.slug} ·{" "}
                      {category._count?.posts || 0} posts
                    </p>
                  </div>
                </div>

                {category.description && (
                  <p className="mt-2 text-[12px] leading-relaxed text-slate-600">
                    {category.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="border border-[#e2eaf3] bg-white p-6">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#1f6fb2]">
            Tags
          </p>

          <form onSubmit={createTag} className="mt-5 flex gap-2">
            <input
              value={tagName}
              onChange={(event) => setTagName(event.target.value)}
              placeholder="Add a tag"
              className="min-w-0 flex-1 border border-[#cbd9e7] px-4 py-3 text-[13px] outline-none focus:border-[#1f6fb2]"
              required
            />

            <button className="inline-flex items-center gap-2 bg-[#1f6fb2] px-4 py-3 text-[12px] font-bold text-white">
              <Plus className="h-3.5 w-3.5" />
              Add
            </button>
          </form>

          <div className="mt-7 flex flex-wrap gap-2 border-t border-[#edf2f7] pt-6">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center gap-2 border border-[#d8e4f0] bg-[#f8fafc] px-3 py-2 text-[12px] font-semibold text-[#1f3a5f]"
              >
                <Tags className="h-3 w-3 text-[#1f6fb2]" />
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