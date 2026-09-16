import crypto from "crypto";
import express from "express";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";

import prisma from "../config/prisma.js";
import {
  addSubscriberToBrevo,
  removeSubscriberFromBrevo,
} from "../services/brevoService.js";
import {
  renderHeader,
  renderFooter,
  logoAttachment,
  BRAND,
} from "../emails/brand.js";

const router = express.Router();

const COMPANY_WEBSITE = "https://logicsofttechnologies.com";
const BOOKING_URL = "https://calendar.app.google/mwqzEDExKyz5mGUVA";

const FRONTEND_URL = (
  process.env.FRONTEND_URL || "https://logicsofttechnologies.com"
).replace(/\/$/, "");

const BACKEND_PUBLIC_URL = (
  process.env.BACKEND_PUBLIC_URL || FRONTEND_URL
).replace(/\/$/, "");

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const createToken = () => crypto.randomBytes(32).toString("hex");

const subscribeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many subscription attempts. Please wait a few minutes.",
  },
});

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function buildAdminNotificationEmail(cleanEmail) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New Newsletter Subscriber</title>
</head>
<body style="margin:0; padding:0; background:${BRAND.bg}; font-family:-apple-system, Segoe UI, Helvetica, Arial, sans-serif;">
  <div style="padding:32px 16px;">
    <div style="max-width:520px; margin:0 auto; background:#ffffff; border:1px solid ${BRAND.border}; border-radius:8px; overflow:hidden;">

      ${renderHeader({ eyebrow: "Newsletter", title: "New confirmed subscriber" })}

      <div style="padding:32px;">
        <div style="font-size:11px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:8px;">Email Address</div>
        <div style="font-size:18px; font-weight:600; color:#1a2d4a; margin-bottom:24px;">${cleanEmail}</div>

        <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafbfc; border:1px solid ${BRAND.border}; border-radius:6px;">
          <tr>
            <td style="padding:14px 16px;">
              <div style="font-size:11px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.04em;">Confirmed At</div>
              <div style="font-size:13px; color:#374151; margin-top:4px;">${new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })}</div>
            </td>
          </tr>
        </table>

        <p style="margin:20px 0 0; font-size:12.5px; color:#6b7280; line-height:1.7;">
          This subscriber has confirmed via double opt-in, been added to your Brevo contact list, and will receive future newsletters automatically.
        </p>
      </div>

      ${renderFooter({ note: "Automated Notification" })}

    </div>
  </div>
</body>
</html>`;
}

function buildConfirmationEmail(confirmationUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Confirm your LogicSoft Insights subscription</title>
</head>
<body style="margin:0; padding:0; background:${BRAND.bg}; font-family:-apple-system, Segoe UI, Helvetica, Arial, sans-serif;">
  <div style="display:none; max-height:0; overflow:hidden; color:${BRAND.bg};">Confirm your subscription to LogicSoft Insights.</div>
  <div style="padding:32px 16px;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border:1px solid ${BRAND.border}; border-radius:8px; overflow:hidden;">

      ${renderHeader({ eyebrow: "Enterprise Technology", title: "Confirm your subscription" })}

      <div style="padding:32px;">
        <p style="margin:0 0 24px; font-size:14px; color:#374151; line-height:1.75;">
          Thanks for subscribing to LogicSoft Insights. Confirm your email address to receive practical software engineering, AI, cloud, cybersecurity, and digital-business insights — no noise, no fluff.
        </p>

        <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
          <tr>
            <td>
              <a href="${confirmationUrl}" style="display:inline-block; background:${BRAND.blue}; color:#ffffff; font-size:13px; font-weight:600; text-decoration:none; padding:10px 20px; border-radius:6px;">
                Confirm subscription
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:0; font-size:12.5px; color:#6b7280; line-height:1.7;">
          If you did not request this subscription, you can safely ignore this email.
        </p>
      </div>

      ${renderFooter({ note: "Automated Notification" })}

    </div>
  </div>
</body>
</html>`;
}

function buildWelcomeEmail(unsubscribeUrl) {
  const items = [
    {
      title: "Enterprise Architecture & Engineering",
      desc: "Deep-dives into software architecture, system design, and engineering best practices.",
    },
    {
      title: "Cloud, DevOps & Security Intelligence",
      desc: "Trends, advisories, and strategies across AWS, Azure, GCP, and cybersecurity.",
    },
    {
      title: "Project Case Studies & Portfolio",
      desc: "Real-world breakdowns of projects delivered across Africa, Europe & the Middle East.",
    },
    {
      title: "Data Analytics & AI Insights",
      desc: "Practical applications of machine learning, BI dashboards, and data strategy.",
    },
  ];

  const itemsHtml = items
    .map(
      (i) => `
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
          <tr>
            <td style="padding:14px 16px; background:#fafbfc; border:1px solid ${BRAND.border}; border-left:3px solid ${BRAND.blue}; border-radius:4px;">
              <div style="font-size:13.5px; font-weight:600; color:#1a2d4a;">${i.title}</div>
              <div style="font-size:12.5px; color:#6b7280; line-height:1.6; margin-top:3px;">${i.desc}</div>
            </td>
          </tr>
        </table>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Welcome to LogicSoft Insights</title>
</head>
<body style="margin:0; padding:0; background:${BRAND.bg}; font-family:-apple-system, Segoe UI, Helvetica, Arial, sans-serif;">
  <div style="display:none; max-height:0; overflow:hidden; color:${BRAND.bg};">Welcome to LogicSoft Insights — enterprise technology intelligence, delivered monthly.</div>
  <div style="padding:32px 16px;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border:1px solid ${BRAND.border}; border-radius:8px; overflow:hidden;">

      ${renderHeader({ eyebrow: "Enterprise Technology", title: "Welcome to LogicSoft Insights" })}

      <div style="padding:32px;">
        <p style="margin:0 0 16px; font-size:14px; color:#374151; line-height:1.75;">
          You've joined a community of technology leaders, decision-makers, and builders who rely on LogicSoft for enterprise-grade digital solutions.
        </p>
        <p style="margin:0 0 28px; font-size:14px; color:#4b5563; line-height:1.75;">
          Each month, we deliver curated intelligence directly to your inbox — no noise, no fluff. Just the insights that matter to your business.
        </p>

        <div style="font-size:12px; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; color:#8a94a3; margin-bottom:12px;">
          What to expect
        </div>
        ${itemsHtml}

        <table cellpadding="0" cellspacing="0" style="margin-top:24px;">
          <tr>
            <td style="padding-right:10px;">
              <a href="${COMPANY_WEBSITE}" style="display:inline-block; background:${BRAND.blue}; color:#ffffff; font-size:13px; font-weight:600; text-decoration:none; padding:10px 20px; border-radius:6px;">
                Explore Our Services
              </a>
            </td>
            <td>
              <a href="${BOOKING_URL}" style="display:inline-block; background:#ffffff; border:1px solid #d0d5dd; color:#1a2d4a; font-size:13px; font-weight:600; text-decoration:none; padding:10px 20px; border-radius:6px;">
                Book Free Consultation
              </a>
            </td>
          </tr>
        </table>

        <div style="border-top:1px solid ${BRAND.border}; margin-top:28px; padding-top:20px;">
          <div style="font-size:13.5px; font-weight:600; color:#1a2d4a;">Elijah O. Alexander</div>
          <div style="font-size:12px; color:#6b7280; margin-top:2px;">Sales & Account Manager, LogicSoft Technologies</div>
          <div style="font-size:12px; color:#6b7280; margin-top:2px;">+234 9012 688 861 · ${BRAND.companyEmail}</div>
        </div>
      </div>

      ${renderFooter({ note: `Prefer not to receive future marketing emails?<br><a href="${unsubscribeUrl}" style="color:${BRAND.blue};">Unsubscribe here</a>` })}

    </div>
  </div>
</body>
</html>`;
}

async function sendAdminNotificationEmail(cleanEmail) {
  await getTransporter().sendMail({
    from: `"LogicSoft Newsletter" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECIPIENT || BRAND.companyEmail,
    subject: `[Newsletter] New confirmed subscriber: ${cleanEmail}`,
    html: buildAdminNotificationEmail(cleanEmail),
    attachments: [logoAttachment()],
  });
}

async function sendConfirmationEmail(email, confirmationToken) {
  const confirmationUrl = `${BACKEND_PUBLIC_URL}/api/newsletter/confirm?token=${confirmationToken}`;

  await getTransporter().sendMail({
    from: `"LogicSoft Technologies" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Confirm your LogicSoft Insights subscription",
    html: buildConfirmationEmail(confirmationUrl),
    attachments: [logoAttachment()],
  });
}

async function sendWelcomeEmail(email, unsubscribeToken) {
  const unsubscribeUrl = `${BACKEND_PUBLIC_URL}/api/newsletter/unsubscribe?token=${unsubscribeToken}`;

  await getTransporter().sendMail({
    from: `"LogicSoft Technologies" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Welcome to LogicSoft Insights",
    html: buildWelcomeEmail(unsubscribeUrl),
    attachments: [logoAttachment()],
  });
}

router.post("/subscribe", subscribeLimiter, async (req, res, next) => {
  try {
    const email = String(req.body?.email || "")
      .trim()
      .toLowerCase();
    const firstName =
      String(req.body?.firstName || "")
        .trim()
        .slice(0, 80) || null;
    const source = String(req.body?.source || "website")
      .trim()
      .slice(0, 100);
    const sourcePage =
      String(req.body?.sourcePage || "")
        .trim()
        .slice(0, 500) || null;

    if (!isValidEmail(email)) {
      return res.status(422).json({
        error: "Enter a valid email address.",
      });
    }

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing?.status === "ACTIVE") {
      return res.json({
        success: true,
        message: "Please check your inbox for subscription details.",
      });
    }

    if (existing?.status === "UNSUBSCRIBED") {
      return res.status(409).json({
        error:
          "This email address has previously unsubscribed. Contact LogicSoft if you would like to rejoin.",
      });
    }

    const confirmationToken = createToken();

    await prisma.newsletterSubscriber.upsert({
      where: { email },
      create: {
        email,
        firstName,
        source,
        sourcePage,
        status: "PENDING",
        consentAt: new Date(),
        confirmationToken,
        confirmationSentAt: new Date(),
      },
      update: {
        firstName,
        source,
        sourcePage,
        status: "PENDING",
        consentAt: new Date(),
        confirmationToken,
        confirmationSentAt: new Date(),
      },
    });

    await sendConfirmationEmail(email, confirmationToken);

    return res.status(202).json({
      success: true,
      message: "Check your inbox to confirm your subscription.",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/confirm", async (req, res, next) => {
  try {
    const confirmationToken = String(req.query.token || "");

    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { confirmationToken },
    });

    if (!subscriber || subscriber.status !== "PENDING") {
      return res.redirect(`${FRONTEND_URL}/newsletter?confirmation=invalid`);
    }

    const activatedSubscriber = await prisma.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data: {
        status: "ACTIVE",
        confirmedAt: new Date(),
        confirmationToken: null,
      },
    });

    try {
      await addSubscriberToBrevo(activatedSubscriber.email);
    } catch (error) {
      console.error("[Brevo subscriber sync error]", error.message);
    }

    try {
      await sendWelcomeEmail(
        activatedSubscriber.email,
        activatedSubscriber.unsubscribeToken,
      );
    } catch (error) {
      console.error("[Newsletter welcome email error]", error.message);
    }

    try {
      await sendAdminNotificationEmail(activatedSubscriber.email);
    } catch (error) {
      console.error("[Newsletter admin notification error]", error.message);
    }

    return res.redirect(`${FRONTEND_URL}/newsletter?confirmation=success`);
  } catch (error) {
    next(error);
  }
});

router.get("/unsubscribe", async (req, res, next) => {
  try {
    const unsubscribeToken = String(req.query.token || "");

    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { unsubscribeToken },
    });

    if (!subscriber) {
      return res.redirect(`${FRONTEND_URL}/newsletter?unsubscribe=invalid`);
    }

    await prisma.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data: {
        status: "UNSUBSCRIBED",
        unsubscribedAt: new Date(),
      },
    });

    try {
      await removeSubscriberFromBrevo(subscriber.email);
    } catch (error) {
      console.error("[Brevo unsubscribe error]", error.message);
    }

    return res.redirect(`${FRONTEND_URL}/newsletter?unsubscribe=success`);
  } catch (error) {
    next(error);
  }
});

export default router;
