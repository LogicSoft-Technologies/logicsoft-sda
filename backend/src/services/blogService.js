import prisma from "../config/prisma.js";

const publicPostWhere = () => ({
  status: "PUBLISHED",
  publishedAt: {
    lte: new Date(),
  },
});

export const publicPostSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  coverImage: true,
  coverImageAlt: true,
  featured: true,
  publishedAt: true,
  updatedAt: true,
  readingMinutes: true,

  author: {
    select: {
      name: true,
      slug: true,
      avatar: true,
      jobTitle: true,
    },
  },

  category: {
    select: {
      name: true,
      slug: true,
    },
  },

  tags: {
    select: {
      tag: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  },
};

export async function getPublishedPostBySlug(slug) {
  return prisma.blogPost.findFirst({
    where: {
      ...publicPostWhere(),
      slug,
    },
    select: {
      ...publicPostSelect,
      content: true,
      seoTitle: true,
      seoDescription: true,
      canonicalUrl: true,
    },
  });
}

export async function getRelatedPublishedPosts(post, take = 3) {
  return prisma.blogPost.findMany({
    where: {
      ...publicPostWhere(),
      id: {
        not: post.id,
      },

      ...(post.categoryId
        ? {
            categoryId: post.categoryId,
          }
        : {}),
    },

    select: publicPostSelect,
    orderBy: {
      publishedAt: "desc",
    },
    take,
  });
}

export async function getPublishedCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },

    select: {
      id: true,
      name: true,
      slug: true,
      description: true,

      _count: {
        select: {
          posts: {
            where: publicPostWhere(),
          },
        },
      },
    },
  });

  return categories.filter((category) => category._count.posts > 0);
}