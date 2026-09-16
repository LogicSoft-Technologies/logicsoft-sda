import PostCard from "./PostCard";

export default function PostGrid({ posts = [], title = "Latest insights" }) {
  if (!posts.length) {
    return (
      <div className="border border-dashed border-[#cbd9e7] bg-[#f5f8fc] px-6 py-16 text-center">
        <h2 className="font-serif text-[26px] text-[#1f3a5f]">
          New insights are on the way.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-slate-600">
          Check back soon for practical advice from LogicSoft Technologies.
        </p>
      </div>
    );
  }

  return (
    <section>
      {title && (
        <h2 className="mb-8 font-serif text-[31px] text-[#1f3a5f]">
          {title}
        </h2>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} priority={index < 3} />
        ))}
      </div>
    </section>
  );
}