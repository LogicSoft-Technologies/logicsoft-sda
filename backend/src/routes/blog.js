import express from "express";
import prisma from "../config/prisma.js";

const router = express.Router();

const SITE_URL = (
  process.env.FRONTEND_URL || "https://logicsofttechnologies.com"
).replace(/\/$/, "");

const PAGE_SIZE = 9;
const MAX_PAGE_SIZE = 24;

const publishedWhere = () => ({
  status: "PUBLISHED",
  publishedAt: {
    lte: new Date(),
  },
});

const postCardSelect = {
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

const postDetailSelect = {
  ...postCardSelect,
  content: true,
  seoTitle: true,
  seoDescription: true,
  canonicalUrl: true,
};

function parsePage(value) {
  const page = Number.parseInt(value, 10);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function parsePageSize(value) {
  const pageSize = Number.parseInt(value, 10);

  if (!Number.isInteger(pageSize) || pageSize < 1) {
    return PAGE_SIZE;
  }

  return Math.min(pageSize, MAX_PAGE_SIZE);
}

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function removeHtml(html = "") {
  return String(html).replace(/<[^>]*>/g, "");
}

/**
 * GET /api/blog/posts
 * Query parameters:
 * - page
 * - pageSize
 * - category
 * - q
 */
router.get("/posts", async (req, res, next) => {
  try {
    const page = parsePage(req.query.page);
    const pageSize = parsePageSize(req.query.pageSize);

    const category =
      typeof req.query.category === "string"
        ? req.query.category.trim().slice(0, 100)
        : "";

    const query =
      typeof req.query.q === "string"
        ? req.query.q.trim().slice(0, 100)
        : "";

    const where = {
      ...publishedWhere(),

      ...(category
        ? {
            category: {
              slug: category,
            },
          }
        : {}),

      ...(query
        ? {
            OR: [
              {
                title: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                excerpt: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
    };

    const posts = await prisma.blogPost.findMany({
      where,
      select: postCardSelect,
      orderBy: {
        publishedAt: "desc",
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const total = await prisma.blogPost.count({ where });

    res.set(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=86400"
    );

    return res.json({
      posts,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.max(Math.ceil(total / pageSize), 1),
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/blog/posts/featured
 */
router.get("/posts/featured", async (_req, res, next) => {
  try {
    const post = await prisma.blogPost.findFirst({
      where: {
        ...publishedWhere(),
        featured: true,
      },
      select: postCardSelect,
      orderBy: {
        publishedAt: "desc",
      },
    });

    res.set(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=86400"
    );

    return res.json({ post });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/blog/posts/:slug
 */
router.get("/posts/:slug", async (req, res, next) => {
  try {
    const slug = String(req.params.slug || "").trim();

    const post = await prisma.blogPost.findFirst({
      where: {
        ...publishedWhere(),
        slug,
      },
      select: postDetailSelect,
    });

    if (!post) {
      return res.status(404).json({
        error: "Article not found.",
      });
    }

    res.set(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=86400"
    );

    return res.json({ post });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/blog/posts/:slug/related
 */
router.get("/posts/:slug/related", async (req, res, next) => {
  try {
    const slug = String(req.params.slug || "").trim();

    const post = await prisma.blogPost.findFirst({
      where: {
        ...publishedWhere(),
        slug,
      },
      select: {
        id: true,
        categoryId: true,
      },
    });

    if (!post) {
      return res.status(404).json({
        error: "Article not found.",
      });
    }

    const posts = await prisma.blogPost.findMany({
      where: {
        ...publishedWhere(),
        id: {
          not: post.id,
        },

        ...(post.categoryId
          ? {
              categoryId: post.categoryId,
            }
          : {}),
      },
      select: postCardSelect,
      orderBy: {
        publishedAt: "desc",
      },
      take: 3,
    });

    return res.json({ posts });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/blog/categories
 */
router.get("/categories", async (_req, res, next) => {
  try {
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
              where: publishedWhere(),
            },
          },
        },
      },
    });

    const activeCategories = categories.filter(
      (category) => category._count.posts > 0
    );

    res.set(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );

    return res.json({
      categories: activeCategories,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Used by Next.js sitemap generation.
 * GET /api/blog/sitemap
 */
router.get("/sitemap", async (_req, res, next) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: publishedWhere(),

      select: {
        slug: true,
        publishedAt: true,
        updatedAt: true,
      },

      orderBy: {
        publishedAt: "desc",
      },
    });

    const categories = await prisma.category.findMany({
      select: {
        slug: true,
        updatedAt: true,

        _count: {
          select: {
            posts: {
              where: publishedWhere(),
            },
          },
        },
      },
    });

    return res.json({
      posts,
      categories: categories.filter(
        (category) => category._count.posts > 0
      ),
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Public RSS source.
 * GET /api/blog/rss
 */
router.get("/rss", async (_req, res, next) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: publishedWhere(),
      select: {
        title: true,
        slug: true,
        excerpt: true,
        publishedAt: true,
        updatedAt: true,
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
      take: 50,
    });

    const items = posts
      .map((post) => {
        const url = `${SITE_URL}/blog/${post.slug}`;
        const description = escapeXml(removeHtml(post.excerpt));

        return `
          <item>
            <title>${escapeXml(post.title)}</title>
            <link>${url}</link>
            <guid isPermaLink="true">${url}</guid>
            <description>${description}</description>
            <author>${escapeXml(post.author.name)}</author>
            <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
          </item>
        `;
      })
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>LogicSoft Insights</title>
    <link>${SITE_URL}/blog</link>
    <description>Practical insights on software engineering, AI, cloud, cybersecurity, and digital transformation from LogicSoft Technologies.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

    res.set("Content-Type", "application/rss+xml; charset=utf-8");
    res.set(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );

    return res.send(xml);
  } catch (error) {
    next(error);
  }
});

export default router;