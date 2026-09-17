import { Search } from "lucide-react";

export default function BlogHero({ query = "" }) {
  return (
    <section
      className="relative overflow-hidden border-b border-[#17345f]"
      style={{
        background:
          "linear-gradient(145deg, #07111f 0%, #0d2448 58%, #123a69 100%)",
      }}
    >
      <div className="absolute -right-24 top-0 h-[450px] w-[450px] rounded-full bg-[#1f6fb2]/25 blur-3xl" />

      <div className="relative mx-auto max-w-[82rem] px-6 py-20 lg:py-24">
        <p className="mb-4 text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#8ac8f2]">
          LogicSoft Insights
        </p>

        <h1 className="max-w-3xl font-serif text-[45px] leading-[1.06] text-white sm:text-[62px]">
          Ideas for building what comes next.
        </h1>

        <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/65">
          Clear, practical thinking on software, AI, cloud, security, and
          digital transformation from the LogicSoft team.
        </p>

        <form
          action="/blog"
          className="mt-8 flex max-w-xl overflow-hidden border border-white/20 bg-white"
        >
          <label htmlFor="blog-search" className="sr-only">
            Search LogicSoft Insights
          </label>

          <input
            id="blog-search"
            name="q"
            defaultValue={query}
            placeholder="Search articles"
            className="min-w-0 flex-1 px-4 py-3.5 text-[14px] text-[#1a2d4a] outline-none "
          />

          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-[#1f6fb2] px-5 text-[13px] font-bold text-white hover:bg-[#1a5a96]"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </form>
      </div>
    </section>
  );
}