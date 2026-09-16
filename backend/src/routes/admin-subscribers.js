import express from "express";
import prisma from "../config/prisma.js";
import { requireAdmin, requireRole } from "../middleware/requireAdmin.js";
import { adminReadLimiter, adminWriteLimiter } from "../middleware/rateLimit.js";
import { optionalEnum } from "../middleware/validateRequest.js";
import { removeSubscriberFromBrevo } from "../services/brevoService.js";

const router = express.Router();
const ALLOWED_STATUSES = ["PENDING", "ACTIVE", "UNSUBSCRIBED", "BOUNCED"];

router.use(requireAdmin);

router.get("/", adminReadLimiter, async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const pageSize = Math.min(Math.max(Number(req.query.pageSize) || 25, 1), 100);
    const status = ALLOWED_STATUSES.includes(req.query.status)
      ? req.query.status
      : undefined;

    const query =
      typeof req.query.q === "string"
        ? req.query.q.trim().slice(0, 120)
        : "";

    const where = {
      ...(status ? { status } : {}),
      ...(query
        ? {
            email: {
              contains: query,
              mode: "insensitive",
            },
          }
        : {}),
    };

    const [subscribers, total, statusCounts] = await prisma.$transaction([
      prisma.newsletterSubscriber.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          email: true,
          firstName: true,
          status: true,
          source: true,
          sourcePage: true,
          confirmedAt: true,
          unsubscribedAt: true,
          createdAt: true,
        },
      }),
      prisma.newsletterSubscriber.count({ where }),
      prisma.newsletterSubscriber.groupBy({
        by: ["status"],
        _count: { _all: true },
      }),
    ]);

    res.json({
      subscribers,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.max(Math.ceil(total / pageSize), 1),
      },
      counts: Object.fromEntries(
        statusCounts.map((item) => [item.status, item._count._all])
      ),
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:id/status",
  adminWriteLimiter,
  requireRole("ADMIN"),
  async (req, res, next) => {
    try {
      const status = optionalEnum(
        req.body?.status,
        "status",
        ALLOWED_STATUSES
      );

      if (!status) {
        return res.status(422).json({
          error: "A valid status is required.",
        });
      }

      const subscriber = await prisma.newsletterSubscriber.update({
        where: { id: req.params.id },
        data: {
          status,
          ...(status === "UNSUBSCRIBED"
            ? { unsubscribedAt: new Date() }
            : {}),
        },
      });

      if (status === "UNSUBSCRIBED") {
        try {
          await removeSubscriberFromBrevo(subscriber.email);
        } catch (error) {
          console.error("[Brevo admin unsubscribe error]", error.message);
        }
      }

      res.json({ success: true, subscriber });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Subscriber not found." });
      }

      next(error);
    }
  }
);

export default router;