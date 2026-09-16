import Link from "next/link";

export default function Breadcrumbs({ post }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-[11.5px] text-slate-500"
    >
      <Link href="/" className="hover:text-[#1f6fb2]">
        Home
      </Link>

      <span>/</span>

      <Link href="/blog" className="hover:text-[#1f6fb2]">
        Insights
      </Link>

      {post.category && (
        <>
          <span>/</span>
          <Link
            href={`/blog/category/${post.category.slug}`}
            className="hover:text-[#1f6fb2]"
          >
            {post.category.name}
          </Link>
        </>
      )}

      <span>/</span>
      <span className="max-w-[18rem] truncate text-slate-400">
        {post.title}
      </span>
    </nav>
  );
}