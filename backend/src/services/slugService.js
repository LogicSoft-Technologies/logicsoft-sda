export function slugify(value) {
  const slug = String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 110)
    .replace(/-+$/g, "");

  return slug || "untitled-post";
}

export async function createUniquePostSlug(
  prisma,
  requestedValue,
  excludePostId = null
) {
  const baseSlug = slugify(requestedValue);
  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const existing = await prisma.blogPost.findUnique({
      where: {
        slug: candidate,
      },
      select: {
        id: true,
      },
    });

    if (!existing || existing.id === excludePostId) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

export function calculateReadingMinutes(html = "") {
  const text = String(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = text ? text.split(" ").length : 0;

  return Math.max(1, Math.ceil(words / 220));
}