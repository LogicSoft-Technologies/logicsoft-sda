import PostEditor from "@/components/admin/PostEditor";

export default async function EditPostPage({ params }) {
  const { id } = await params;

  return <PostEditor postId={id} />;
}