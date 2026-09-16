import Link from "next/link";

export default function CategoryFilter({ categories = [], activeSlug = "" }) {
  return (
    <nav
      aria-label="Blog categories"
      className="border-b border-[#e8eef6] bg-[#f5f8fc]"
    >
      <div className="mx-auto flex max-w-[82rem] gap-2 overflow-x-auto px-6 py-5">
        <Link
          href="/blog"
          className={`shrink-0 border px-4 py-2 text-[12px] font-bold ${
            !activeSlug
              ? "border-[#1f6fb2] bg-[#1f6fb2] text-white"
              : "border-[#d8e4f0] bg-white text-slate-600 hover:border-[#1f6fb2]"
          }`}
        >
          All insights
        </Link>

        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog/category/${category.slug}`}
            className={`shrink-0 border px-4 py-2 text-[12px] font-bold ${
              activeSlug === category.slug
                ? "border-[#1f6fb2] bg-[#1f6fb2] text-white"
                : "border-[#d8e4f0] bg-white text-slate-600 hover:border-[#1f6fb2]"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}