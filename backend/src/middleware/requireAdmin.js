import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const COOKIE_NAME =
  process.env.ADMIN_COOKIE_NAME || "logicsoft_admin_token";

function parseCookies(cookieHeader = "") {
  return cookieHeader
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean)
    .reduce((cookies, item) => {
      const index = item.indexOf("=");

      if (index === -1) return cookies;

      const key = item.slice(0, index).trim();
      const value = item.slice(index + 1).trim();

      try {
        cookies[key] = decodeURIComponent(value);
      } catch {
        cookies[key] = value;
      }

      return cookies;
    }, {});
}

function getToken(req) {
  const authorization = req.headers.authorization;

  if (
    authorization &&
    authorization.startsWith("Bearer ")
  ) {
    return authorization.slice(7).trim();
  }

  const cookies = parseCookies(req.headers.cookie);
  return cookies[COOKIE_NAME];
}

function getJwtSecret() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error(
      "JWT_SECRET must be configured and at least 32 characters long."
    );
  }

  return process.env.JWT_SECRET;
}

export async function requireAdmin(req, res, next) {
  try {
    const token = getToken(req);

    if (!token) {
      return res.status(401).json({
        error: "Authentication is required.",
      });
    }

    const payload = jwt.verify(token, getJwtSecret(), {
      algorithms: ["HS256"],
      issuer: "logicsoft-api",
      audience: "logicsoft-admin",
    });

    const admin = await prisma.adminUser.findUnique({
      where: {
        id: payload.sub,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    if (!admin || !admin.isActive) {
      return res.status(401).json({
        error: "Your session is no longer active.",
      });
    }

    req.admin = admin;
    return next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        error: "Your session has expired. Please sign in again.",
      });
    }

    return next(error);
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      return res.status(403).json({
        error: "You do not have permission to perform this action.",
      });
    }

    return next();
  };
}