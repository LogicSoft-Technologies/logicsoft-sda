import express from "express";
import prisma from "../config/prisma.js";
import { requireAdmin, requireRole } from "../middleware/requireAdmin.js";
import { adminReadLimiter, adminWriteLimiter } from "../middleware/rateLimit.js";
import {
  RequestValidationError,
  optionalString,
  requiredString,
  requireBodyObject,
  validateSlug,
} from "../middleware/validateRequest.js";
import { slugify } from "../services/slugService.js";

const router = express.Router();

router.use(requireAdmin);

function handleValidation(error, res, next) {
  if (error instanceof RequestValidationError) {
    return res.status(error.status).json({
      error: error.message,
      fields: error.fields,
    });
  }

  return next(error);
}

async function uniqueSlug(model, requestedValue, excludeId = null) {
  const base = slugify(requestedValue);
  let candidate = base;
  let number = 2;

  while (true) {
    const existing = await prisma[model].findUnique({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!existing || existing.id === excludeId) return candidate;

    candidate = `${base}-${number}`;
    number += 1;
  }
}

router.get("/authors", adminReadLimiter, async (_req, res, next) => {
  try {
    const authors = await prisma.author.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    res.json({ authors });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/authors",
  adminWriteLimiter,
  requireRole("ADMIN", "EDITOR"),
  async (req, res, next) => {
    try {
      const body = requireBodyObject(req);
      const name = requiredString(body.name, "name", { min: 2, max: 120 });
      const slug = await uniqueSlug("author", body.slug || name);

      const author = await prisma.author.create({
        data: {
          name,
          slug,
          bio: optionalString(body.bio, "bio", { max: 3000 }),
          avatar: optionalString(body.avatar, "avatar", { max: 2048 }),
          jobTitle: optionalString(body.jobTitle, "jobTitle", { max: 160 }),
        },
      });

      res.status(201).json({ success: true, author });
    } catch (error) {
      handleValidation(error, res, next);
    }
  }
);

router.patch(
  "/authors/:id",
  adminWriteLimiter,
  requireRole("ADMIN", "EDITOR"),
  async (req, res, next) => {
    try {
      const body = requireBodyObject(req);
      const data = {};

      if (body.name !== undefined) {
        data.name = requiredString(body.name, "name", {
          min: 2,
          max: 120,
        });
      }

      if (body.slug !== undefined) {
        data.slug = await uniqueSlug(
          "author",
          validateSlug(body.slug),
          req.params.id
        );
      }

      if (body.bio !== undefined) {
        data.bio = optionalString(body.bio, "bio", { max: 3000 });
      }

      if (body.avatar !== undefined) {
        data.avatar = optionalString(body.avatar, "avatar", { max: 2048 });
      }

      if (body.jobTitle !== undefined) {
        data.jobTitle = optionalString(body.jobTitle, "jobTitle", {
          max: 160,
        });
      }

      const author = await prisma.author.update({
        where: { id: req.params.id },
        data,
      });

      res.json({ success: true, author });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Author not found." });
      }

      handleValidation(error, res, next);
    }
  }
);

router.get("/categories", adminReadLimiter, async (_req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    res.json({ categories });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/categories",
  adminWriteLimiter,
  requireRole("ADMIN", "EDITOR"),
  async (req, res, next) => {
    try {
      const body = requireBodyObject(req);
      const name = requiredString(body.name, "name", { min: 2, max: 100 });
      const slug = await uniqueSlug("category", body.slug || name);

      const category = await prisma.category.create({
        data: {
          name,
          slug,
          description: optionalString(body.description, "description", {
            max: 500,
          }),
        },
      });

      res.status(201).json({ success: true, category });
    } catch (error) {
      handleValidation(error, res, next);
    }
  }
);

router.patch(
  "/categories/:id",
  adminWriteLimiter,
  requireRole("ADMIN", "EDITOR"),
  async (req, res, next) => {
    try {
      const body = requireBodyObject(req);
      const data = {};

      if (body.name !== undefined) {
        data.name = requiredString(body.name, "name", {
          min: 2,
          max: 100,
        });
      }

      if (body.slug !== undefined) {
        data.slug = await uniqueSlug(
          "category",
          validateSlug(body.slug),
          req.params.id
        );
      }

      if (body.description !== undefined) {
        data.description = optionalString(body.description, "description", {
          max: 500,
        });
      }

      const category = await prisma.category.update({
        where: { id: req.params.id },
        data,
      });

      res.json({ success: true, category });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Category not found." });
      }

      handleValidation(error, res, next);
    }
  }
);

router.get("/tags", adminReadLimiter, async (_req, res, next) => {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    res.json({ tags });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/tags",
  adminWriteLimiter,
  requireRole("ADMIN", "EDITOR"),
  async (req, res, next) => {
    try {
      const body = requireBodyObject(req);
      const name = requiredString(body.name, "name", { min: 2, max: 80 });
      const slug = await uniqueSlug("tag", body.slug || name);

      const tag = await prisma.tag.create({
        data: { name, slug },
      });

      res.status(201).json({ success: true, tag });
    } catch (error) {
      handleValidation(error, res, next);
    }
  }
);

router.delete(
  "/tags/:id",
  adminWriteLimiter,
  requireRole("ADMIN"),
  async (req, res, next) => {
    try {
      const linkedPostCount = await prisma.blogPostTag.count({
        where: { tagId: req.params.id },
      });

      if (linkedPostCount > 0) {
        return res.status(409).json({
          error: "This tag is in use and cannot be deleted.",
        });
      }

      await prisma.tag.delete({
        where: { id: req.params.id },
      });

      res.json({ success: true });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Tag not found." });
      }

      next(error);
    }
  }
);

export default router;