import rateLimit from "express-rate-limit";

function jsonMessage(message) {
  return {
    error: message,
  };
}

export const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: jsonMessage(
    "Too many login attempts. Please wait 15 minutes before trying again."
  ),
});

export const adminWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: jsonMessage(
    "Too many administrative write requests. Please try again shortly."
  ),
});

export const adminReadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 600,
  standardHeaders: true,
  legacyHeaders: false,
  message: jsonMessage(
    "Too many administrative requests. Please try again shortly."
  ),
});