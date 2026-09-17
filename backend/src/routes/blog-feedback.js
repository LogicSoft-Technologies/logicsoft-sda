import crypto from "node:crypto";
import express from "express";

import prisma from "../config/prisma.js";
import { blogFeedbackLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

const COOKIE_NAME = "logicsoft_blog_visitor";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60 * 1000;
const VALID_REACTIONS = new Set(["HELPFUL", "LOVE"]);

function getCookie(req, name) {
  const raw = req.headers.cookie || "";

  return raw
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

function getVisitorHash(req, res) {
  let visitorId = getCookie(req, COOKIE_NAME);

  if (!visitorId || !/^[a-f0-9]{64}$/i.test(visitorId)) {
    visitorId = crypto.randomBytes(32).toString("hex");

    res.cookie(COOKIE_NAME, visitorId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/api/blog",
    });
  }

  return crypto.createHash("sha256").update(visitorId).digest("hex");
}

async function findPublishedPost(slug) {
  return prisma.blogPost.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
      publishedAt: {
        lte: new Date(),
      },
    },
    select: {
      id: true,
    },
  });
}

async function getReactionSummary(postId, visitorHash) {
  const grouped = await prisma.blogPostReaction.groupBy({
    by: ["reaction"],
    where: { postId },
    _count: {
      reaction: true,
    },
  });

  const currentReaction = await prisma.blogPostReaction.findUnique({
    where: {
      postId_visitorHash: {
        postId,
        visitorHash,
      },
    },
    select: {
      reaction: true,
    },
  });

  const counts = Object.fromEntries(
    grouped.map((item) => [item.reaction, item._count.reaction])
  );

  const helpful = counts.HELPFUL || 0;
  const love = counts.LOVE || 0;

  return {
    helpful,
    love,
    total: helpful + love,
    selectedReaction: currentReaction?.reaction || null,
  };
}

router.get("/posts/:slug/reactions", async (req, res, next) => {
  try {
    const slug = String(req.params.slug || "").trim();
    const visitorHash = getVisitorHash(req, res);
    const post = await findPublishedPost(slug);

    if (!post) {
      return res.status(404).json({ error: "Article not found." });
    }

    const feedback = await getReactionSummary(post.id, visitorHash);

    res.set(
      "Cache-Control",
      "private, no-store"
    );

    return res.json({ feedback });
  } catch (error) {
    next(error);
  }
});

router.put(
  "/posts/:slug/reaction",
  blogFeedbackLimiter,
  async (req, res, next) => {
    try {
      const slug = String(req.params.slug || "").trim();
      const reaction =
        req.body?.reaction === null
          ? null
          : String(req.body?.reaction || "").toUpperCase();

      if (reaction !== null && !VALID_REACTIONS.has(reaction)) {
        return res.status(400).json({
          error: "Reaction must be HELPFUL, LOVE, or null.",
        });
      }

      const visitorHash = getVisitorHash(req, res);
      const post = await findPublishedPost(slug);

      if (!post) {
        return res.status(404).json({ error: "Article not found." });
      }

      if (reaction === null) {
        await prisma.blogPostReaction.deleteMany({
          where: {
            postId: post.id,
            visitorHash,
          },
        });
      } else {
        await prisma.blogPostReaction.upsert({
          where: {
            postId_visitorHash: {
              postId: post.id,
              visitorHash,
            },
          },
          create: {
            postId: post.id,
            visitorHash,
            reaction,
          },
          update: {
            reaction,
          },
        });
      }

      const feedback = await getReactionSummary(post.id, visitorHash);

      return res.json({ feedback });
    } catch (error) {
      next(error);
    }
  }
);

export default router;