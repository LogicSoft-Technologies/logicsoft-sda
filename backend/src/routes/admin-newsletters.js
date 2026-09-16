import express from "express";
import sanitizeHtml from "sanitize-html";
import prisma from "../config/prisma.js";
import { requireAdmin, requireRole } from "../middleware/requireAdmin.js";
import { adminReadLimiter, adminWriteLimiter } from "../middleware/rateLimit.js";
import {
  RequestValidationError,
  optionalDate,
  optionalEnum,
  optionalString,
  requiredString,
  requireBodyObject,
} from "../middleware/validateRequest.js";

const router = express.Router();

const STATUSES = ["DRAFT", "READY", "SENT", "ARCHIVED"];

function sanitizeNewsletterHtml(content) {
  return sanitizeHtml(content, {
    allowedTags: [
      "p", "br", "strong", "em", "h1", "h2", "h3",
      "ul", "ol", "li", "a", "img", "table", "tbody",
      "thead", "tr", "td", "th", "hr", "blockquote",
    ],
    allowedAttributes: {
      a: ["href", "title"],
      img: ["src", "alt", "width", "height"],
      td: ["align", "colspan", "rowspan"],
      th: ["align", "colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  }).trim();
}

function parseEdition(body, partial = false) {
  const result = {};

  if (!partial || body.title !== undefined) {
    result.title = requiredString(body.title, "title", {
      min: 5,
      max: 180,
    });
  }

  if (!partial || body.subject !== undefined) {
    result.subject = requiredString(body.subject, "subject", {
      min: 5,
      max: 150,
    });
  }

  if (!partial || body.htmlContent !== undefined) {
    result.htmlContent = sanitizeNewsletterHtml(
      requiredString(body.htmlContent, "htmlContent", {
        min: 20,
        max: 200000,
        trim: false,
      })
    );

    if (!result.htmlContent) {
      throw new RequestValidationError(
        "Newsletter content contains no permitted HTML."
      );
    }
  }

  if (body.previewText !== undefined) {
    result.previewText = optionalString(body.previewText, "previewText", {
      max: 200,
    });
  }

  if (body.status !== undefined) {
    result.status = optionalEnum(body.status, "status", STATUSES);
  }

  if (body.scheduledFor !== undefined) {
    result.scheduledFor = optionalDate(body.scheduledFor, "scheduledFor");
  }

  if (body.sourcePostId !== undefined) {
    result.sourcePostId = optionalString(body.sourcePostId, "sourcePostId", {
      max: 100,
    });
  }

  return result;
}

router.use(requireAdmin);

router.get("/", adminReadLimiter, async (_req, res, next) => {
  try {
    const editions = await prisma.newsletterEdition.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        sourcePost: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    res.json({ editions });
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
      const input = parseEdition(requireBodyObject(req));

      if (input.sourcePostId) {
        const post = await prisma.blogPost.findUnique({
          where: { id: input.sourcePostId },
          select: { id: true },
        });

        if (!post) {
          return res.status(422).json({
            error: "Source post was not found.",
          });
        }
      }

      const edition = await prisma.newsletterEdition.create({
        data: {
          ...input,
          status: input.status || "DRAFT",
        },
      });

      res.status(201).json({ success: true, edition });
    } catch (error) {
      if (error instanceof RequestValidationError) {
        return res.status(error.status).json({ error: error.message });
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
      const input = parseEdition(requireBodyObject(req), true);

      if (input.status === "SENT") {
        return res.status(422).json({
          error:
            "Marking a newsletter as sent is reserved for the Brevo sending workflow.",
        });
      }

      const edition = await prisma.newsletterEdition.update({
        where: { id: req.params.id },
        data: input,
      });

      res.json({ success: true, edition });
    } catch (error) {
      if (error instanceof RequestValidationError) {
        return res.status(error.status).json({ error: error.message });
      }

      if (error.code === "P2025") {
        return res.status(404).json({ error: "Newsletter draft not found." });
      }

      next(error);
    }
  }
);

router.delete(
  "/:id",
  adminWriteLimiter,
  requireRole("ADMIN"),
  async (req, res, next) => {
    try {
      const edition = await prisma.newsletterEdition.update({
        where: { id: req.params.id },
        data: { status: "ARCHIVED" },
      });

      res.json({ success: true, edition });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Newsletter draft not found." });
      }

      next(error);
    }
  }
);

export default router;