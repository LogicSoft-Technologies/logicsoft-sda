import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../config/prisma.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { adminLoginLimiter } from "../middleware/rateLimit.js";
import {
  RequestValidationError,
  requiredString,
  requireBodyObject,
} from "../middleware/validateRequest.js";

const router = express.Router();

const COOKIE_NAME =
  process.env.ADMIN_COOKIE_NAME || "logicsoft_admin_token";

function getJwtSecret() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error(
      "JWT_SECRET must be configured and at least 32 characters long."
    );
  }

  return process.env.JWT_SECRET;
}

function cookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 8,
    path: "/",
    ...(process.env.ADMIN_COOKIE_DOMAIN
      ? { domain: process.env.ADMIN_COOKIE_DOMAIN }
      : {}),
  };
}

function signSession(admin) {
  return jwt.sign(
    {
      email: admin.email,
      role: admin.role,
    },
    getJwtSecret(),
    {
      subject: admin.id,
      algorithm: "HS256",
      expiresIn: "8h",
      issuer: "logicsoft-api",
      audience: "logicsoft-admin",
    }
  );
}

router.post("/login", adminLoginLimiter, async (req, res, next) => {
  try {
    const body = requireBodyObject(req);

    const email = requiredString(body.email, "email", {
      min: 5,
      max: 254,
    }).toLowerCase();

    const password = requiredString(body.password, "password", {
      min: 8,
      max: 200,
      trim: false,
    });

    const admin = await prisma.adminUser.findUnique({
      where: {
        email,
      },
    });

    const isValid =
      admin &&
      admin.isActive &&
      (await bcrypt.compare(password, admin.passwordHash));

    if (!isValid) {
      return res.status(401).json({
        error: "Invalid email address or password.",
      });
    }

    const sessionToken = signSession(admin);

    await prisma.adminUser.update({
      where: {
        id: admin.id,
      },
      data: {
        lastLoginAt: new Date(),
      },
    });

    res.cookie(COOKIE_NAME, sessionToken, cookieOptions());

    return res.json({
      success: true,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    if (error instanceof RequestValidationError) {
      return res.status(error.status).json({
        error: error.message,
        fields: error.fields,
      });
    }

    return next(error);
  }
});

router.post("/logout", (_req, res) => {
  const options = cookieOptions();

  res.clearCookie(COOKIE_NAME, {
    ...options,
    maxAge: undefined,
  });

  return res.json({
    success: true,
  });
});

router.get("/session", requireAdmin, async (req, res) => {
  return res.json({
    admin: req.admin,
  });
});

export default router;