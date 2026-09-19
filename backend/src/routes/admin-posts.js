import express from "express";
import sanitizeHtml from "sanitize-html";

import prisma from "../config/prisma.js";
import {
  requireAdmin,
  requireRole,
} from "../middleware/requireAdmin.js";
import {
  adminReadLimiter,
  adminWriteLimiter,
} from "../middleware/rateLimit.js";
import {
  RequestValidationError,
  hasOwn,
  optionalBoolean,
  optionalDate,
  optionalEnum,
  optionalIdArray,
  optionalString,
  optionalUrl,
  requiredString,
  requireBodyObject,
  validateSlug,
} from "../middleware/validateRequest.js";
import {
  calculateReadingMinutes,
  createUniquePostSlug,
} from "../services/slugService.js";

const router = express.Router();

const POST_STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"];

const postSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  coverImage: true,
  coverImageAlt: true,
  status: true,
  featured: true,
  publishedAt: true,
  scheduledFor: true,
  seoTitle: true,
  seoDescription: true,
  canonicalUrl: true,
  readingMinutes: true,
  createdAt: true,
  updatedAt: true,

  author: {
    select: {
      id: true,
      name: true,
      slug: true,
      avatar: true,
      jobTitle: true,
    },
  },

  category: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },

  tags: {
    select: {
      tag: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  },
};

function sanitizeArticleHtml(content) {
  return sanitizeHtml(content, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "blockquote",
      "h2",
      "h3",
      "h4",
      "ul",
      "ol",
      "li",
      "a",
      "img",
      "pre",
      "code",
      "hr",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ],

    allowedAttributes: {
      a: ["href", "title"],
      img: ["src", "alt", "width", "height"],
      code: ["class"],
      pre: ["class"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },

    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      img: ["http", "https"],
    },

    disallowedTagsMode: "discard",
  }).trim();
}

function parsePagination(req) {
  const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
  const pageSize = Math.min(
    Math.max(Number.parseInt(req.query.pageSize, 10) || 20, 1),
    100
  );

  return {
    page,
    pageSize,
  };
}

function parsePostInput(body, { partial = false } = {}) {
  const data = {};

  if (!partial || hasOwn(body, "title")) {
    data.title = requiredString(body.title, "title", {
      min: 5,
      max: 180,
    });
  }

  if (!partial || hasOwn(body, "excerpt")) {
    data.excerpt = requiredString(body.excerpt, "excerpt", {
      min: 20,
      max: 600,
    });
  }

  if (!partial || hasOwn(body, "content")) {
    const rawContent = requiredString(body.content, "content", {
      min: 20,
      max: 200000,
      trim: false,
    });

    data.content = sanitizeArticleHtml(rawContent);

    if (!data.content) {
      throw new RequestValidationError(
        "Article content does not contain permitted content.",
        {
          content: "Add valid article content.",
        }
      );
    }

    data.readingMinutes = calculateReadingMinutes(data.content);
  }

  if (hasOwn(body, "slug")) {
    data.requestedSlug = validateSlug(body.slug);
  }

  if (!partial || hasOwn(body, "authorId")) {
    data.authorId = requiredString(body.authorId, "authorId", {
      min: 10,
      max: 100,
    });
  }

  if (hasOwn(body, "categoryId")) {
    data.categoryId =
      optionalString(body.categoryId, "categoryId", {
        max: 100,
      }) || null;
  }

  if (hasOwn(body, "tagIds")) {
    data.tagIds = optionalIdArray(body.tagIds, "tagIds");
  }

  if (hasOwn(body, "coverImage")) {
    data.coverImage = optionalUrl(body.coverImage, "coverImage");
  }

  if (hasOwn(body, "coverImageAlt")) {
    data.coverImageAlt = optionalString(
      body.coverImageAlt,
      "coverImageAlt",
      {
        max: 180,
      }
    );
  }

  if (hasOwn(body, "seoTitle")) {
    data.seoTitle = optionalString(body.seoTitle, "seoTitle", {
      max: 70,
    });
  }

  if (hasOwn(body, "seoDescription")) {
    data.seoDescription = optionalString(
      body.seoDescription,
      "seoDescription",
      {
        max: 160,
      }
    );
  }

  if (hasOwn(body, "canonicalUrl")) {
    data.canonicalUrl = optionalUrl(
      body.canonicalUrl,
      "canonicalUrl"
    );
  }

  if (hasOwn(body, "status")) {
    data.status = optionalEnum(
      body.status,
      "status",
      POST_STATUSES
    );
  }

  if (hasOwn(body, "featured")) {
    data.featured = optionalBoolean(body.featured, "featured");
  }

  if (hasOwn(body, "publishedAt")) {
    data.publishedAt = optionalDate(
      body.publishedAt,
      "publishedAt"
    );
  }

  if (hasOwn(body, "scheduledFor")) {
    data.scheduledFor = optionalDate(
      body.scheduledFor,
      "scheduledFor"
    );
  }

  return data;
}

async function ensureRelations({ authorId, categoryId, tagIds }) {
  if (authorId) {
    const author = await prisma.author.findUnique({
      where: {
        id: authorId,
      },
      select: {
        id: true,
      },
    });

    if (!author) {
      throw new RequestValidationError("Author was not found.", {
        authorId: "Choose a valid author.",
      });
    }
  }

  if (categoryId) {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      select: {
        id: true,
      },
    });

    if (!category) {
      throw new RequestValidationError("Category was not found.", {
        categoryId: "Choose a valid category.",
      });
    }
  }

  if (tagIds !== undefined && tagIds.length > 0) {
    const tagCount = await prisma.tag.count({
      where: {
        id: {
          in: tagIds,
        },
      },
    });

    if (tagCount !== tagIds.length) {
      throw new RequestValidationError("One or more tags were not found.", {
        tagIds: "Choose valid tags only.",
      });
    }
  }
}

router.use(requireAdmin);

router.get("/", adminReadLimiter, async (req, res, next) => {
  try {
    const { page, pageSize } = parsePagination(req);

    const status =
      typeof req.query.status === "string" &&
      POST_STATUSES.includes(req.query.status)
        ? req.query.status
        : undefined;

    const search =
      typeof req.query.q === "string"
        ? req.query.q.trim().slice(0, 100)
        : "";

    const where = {
      ...(status ? { status } : {}),

      ...(search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                slug: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
    };

    const [posts, total] = await prisma.$transaction([
      prisma.blogPost.findMany({
        where,
        select: postSelect,
        orderBy: {
          updatedAt: "desc",
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),

      prisma.blogPost.count({ where }),
    ]);

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

router.get("/:id", adminReadLimiter, async (req, res, next) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        id: req.params.id,
      },
      select: postSelect,
    });

    if (!post) {
      return res.status(404).json({
        error: "Post not found.",
      });
    }

    return res.json({ post });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  adminWriteLimiter,
  requireRole("ADMIN", "EDITOR"),
  async (req, res, next) => {
    try {
      const body = requireBodyObject(req);
      const input = parsePostInput(body);

      await ensureRelations(input);

      const status = input.status || "DRAFT";
      const publishedAt =
        status === "PUBLISHED"
          ? input.publishedAt || new Date()
          : input.publishedAt || null;

      const slug = await createUniquePostSlug(
        prisma,
        input.requestedSlug || input.title
      );

      const post = await prisma.blogPost.create({
        data: {
          title: input.title,
          slug,
          excerpt: input.excerpt,
          content: input.content,
          coverImage: input.coverImage || null,
          coverImageAlt: input.coverImageAlt || null,
          status,
          featured: input.featured || false,
          publishedAt,
          scheduledFor: input.scheduledFor || null,
          seoTitle: input.seoTitle || null,
          seoDescription: input.seoDescription || null,
          canonicalUrl: input.canonicalUrl || null,
          readingMinutes: input.readingMinutes,
          authorId: input.authorId,
          categoryId: input.categoryId || null,

          ...(input.tagIds
            ? {
                tags: {
                  create: input.tagIds.map((tagId) => ({
                    tagId,
                  })),
                },
              }
            : {}),
        },
        select: postSelect,
      });

      return res.status(201).json({
        success: true,
        post,
      });
    } catch (error) {
      if (error instanceof RequestValidationError) {
        return res.status(error.status).json({
          error: error.message,
          fields: error.fields,
        });
      }

      if (error.code === "P2002") {
        return res.status(409).json({
          error:
            "A post with this slug already exists. Choose another slug.",
        });
      }

      next(error);
    }
  }
);

router.patch(
  "/:id",
  adminWriteLimiter,
  requireRole("ADMIN", "EDITOR"),
  async (req, res, next) => {
    try {
      const existing = await prisma.blogPost.findUnique({
        where: {
          id: req.params.id,
        },
      });

      if (!existing) {
        return res.status(404).json({
          error: "Post not found.",
        });
      }

      const body = requireBodyObject(req);
      const input = parsePostInput(body, {
        partial: true,
      });

      await ensureRelations(input);

      const data = {
        ...(input.title !== undefined
          ? { title: input.title }
          : {}),
        ...(input.excerpt !== undefined
          ? { excerpt: input.excerpt }
          : {}),
        ...(input.content !== undefined
          ? {
              content: input.content,
              readingMinutes: input.readingMinutes,
            }
          : {}),
        ...(input.authorId !== undefined
          ? { authorId: input.authorId }
          : {}),
        ...(input.categoryId !== undefined
          ? { categoryId: input.categoryId }
          : {}),
        ...(input.coverImage !== undefined
          ? { coverImage: input.coverImage }
          : {}),
        ...(input.coverImageAlt !== undefined
          ? { coverImageAlt: input.coverImageAlt }
          : {}),
        ...(input.seoTitle !== undefined
          ? { seoTitle: input.seoTitle }
          : {}),
        ...(input.seoDescription !== undefined
          ? { seoDescription: input.seoDescription }
          : {}),
        ...(input.canonicalUrl !== undefined
          ? { canonicalUrl: input.canonicalUrl }
          : {}),
        ...(input.status !== undefined
          ? { status: input.status }
          : {}),
        ...(input.featured !== undefined
          ? { featured: input.featured }
          : {}),
        ...(input.publishedAt !== undefined
          ? { publishedAt: input.publishedAt }
          : {}),
        ...(input.scheduledFor !== undefined
          ? { scheduledFor: input.scheduledFor }
          : {}),
      };

      if (input.requestedSlug !== undefined) {
        data.slug = await createUniquePostSlug(
          prisma,
          input.requestedSlug,
          existing.id
        );
      }

      if (
        data.status === "PUBLISHED" &&
        data.publishedAt === undefined &&
        !existing.publishedAt
      ) {
        data.publishedAt = new Date();
      }

      if (data.status === "ARCHIVED") {
        data.featured = false;
      }

      if (input.tagIds !== undefined) {
        data.tags = {
          deleteMany: {},
          create: input.tagIds.map((tagId) => ({
            tagId,
          })),
        };
      }

      const post = await prisma.blogPost.update({
        where: {
          id: existing.id,
        },
        data,
        select: postSelect,
      });

      return res.json({
        success: true,
        post,
      });
    } catch (error) {
      if (error instanceof RequestValidationError) {
        return res.status(error.status).json({
          error: error.message,
          fields: error.fields,
        });
      }

      if (error.code === "P2002") {
        return res.status(409).json({
          error:
            "A post with this slug already exists. Choose another slug.",
        });
      }

      next(error);
    }
  }
);

// Archive instead of permanently deleting a published business asset.
router.delete(
  "/:id",
  adminWriteLimiter,
  requireRole("ADMIN"),
  async (req, res, next) => {
    try {
      const post = await prisma.blogPost.update({
        where: {
          id: req.params.id,
        },
        data: {
          status: "ARCHIVED",
          featured: false,
        },
        select: postSelect,
      });

      return res.json({
        success: true,
        post,
      });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({
          error: "Post not found.",
        });
      }

      next(error);
    }
  }
);

router.delete(
  "/:id/permanent",
  adminWriteLimiter,
  requireRole("ADMIN"),
  async (req, res, next) => {
    try {
      await prisma.$transaction([
        prisma.blogPostTag.deleteMany({
          where: {
            postId: req.params.id,
          },
        }),

        prisma.blogPost.delete({
          where: {
            id: req.params.id,
          },
        }),
      ]);

      return res.json({
        success: true,
      });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({
          error: "Post not found.",
        });
      }

      if (error.code === "P2003") {
        return res.status(409).json({
          error:
            "This post cannot be deleted because other records still reference it.",
        });
      }

      next(error);
    }
  }
);

export default router;