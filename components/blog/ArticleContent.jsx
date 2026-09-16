export default function ArticleContent({ content }) {
  if (!content) return null;

  return (
    <div
      className="
        article-content
        text-[16px] leading-[1.85] text-slate-600
        [&_a]:font-semibold [&_a]:text-[#1f6fb2] [&_a]:underline [&_a]:underline-offset-4
        [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-[#1f6fb2] [&_blockquote]:bg-[#f5f8fc] [&_blockquote]:px-6 [&_blockquote]:py-5 [&_blockquote]:font-serif [&_blockquote]:text-[21px] [&_blockquote]:leading-relaxed [&_blockquote]:text-[#1f3a5f]
        [&_code]:rounded [&_code]:bg-[#edf3f8] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-[#173b63]
        [&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-[31px] [&_h2]:leading-tight [&_h2]:text-[#1f3a5f]
        [&_h3]:mt-9 [&_h3]:font-serif [&_h3]:text-[24px] [&_h3]:leading-tight [&_h3]:text-[#1f3a5f]
        [&_img]:my-9 [&_img]:h-auto [&_img]:w-full
        [&_li]:mb-3
        [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6
        [&_p]:my-6
        [&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:bg-[#0b1728] [&_pre]:p-5 [&_pre]:text-[13px] [&_pre]:leading-relaxed [&_pre]:text-[#d8e8f8]
        [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit
        [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6
      "
      // Content must be sanitized in the protected admin write endpoint.
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
