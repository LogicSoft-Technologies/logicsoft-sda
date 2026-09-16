import PostGrid from "./PostGrid";

export default function RelatedPosts({ posts = [] }) {
  if (!posts.length) return null;

  return (
    <section className="border-t border-[#e8eef6] bg-[#f5f8fc] py-16">
      <div className="mx-auto max-w-[82rem] px-6">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
          Keep reading
        </p>

        <div className="mt-2">
          <PostGrid posts={posts} title="Related insights" />
        </div>
      </div>
    </section>
  );
}