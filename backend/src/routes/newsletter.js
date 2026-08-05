import express from "express";
import nodemailer from "nodemailer";
import prisma from "../config/prisma.js";
import { renderHeader, renderFooter, logoAttachment, BRAND } from "../emails/brand.js";

const COMPANY_WEBSITE = "https://logicsofttechnologies.com";
const BOOKING_URL = "https://calendar.app.google/mwqzEDExKyz5mGUVA";

const router = express.Router();
const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

async function addToBrevo(email) {
  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [Number(process.env.BREVO_LIST_ID)],
        updateEnabled: true,
      }),
    });
    if (!res.ok) {
      const err = await res.json();
      if (err?.code === "duplicate_parameter") return;
      console.error("[Brevo Error]", err?.message);
    }
  } catch (err) {
    console.error("[Brevo Sync Error]", err.message);
  }
}

function buildNotificationEmail(cleanEmail) {
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

      ${renderHeader({ eyebrow: "Newsletter", title: "New subscriber" })}

      <div style="padding:32px;">
        <div style="font-size:11px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:8px;">Email Address</div>
        <div style="font-size:18px; font-weight:600; color:#1a2d4a; margin-bottom:24px;">${cleanEmail}</div>

        <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafbfc; border:1px solid ${BRAND.border}; border-radius:6px;">
          <tr>
            <td style="padding:14px 16px;">
              <div style="font-size:11px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.04em;">Subscribed At</div>
              <div style="font-size:13px; color:#374151; margin-top:4px;">${new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })}</div>
            </td>
          </tr>
        </table>

        <p style="margin:20px 0 0; font-size:12.5px; color:#6b7280; line-height:1.7;">
          This subscriber has been added to your Brevo contact list and will receive future newsletters automatically.
        </p>
      </div>

      ${renderFooter({ note: "Automated Notification" })}

    </div>
  </div>
</body>
</html>`;
}

function buildWelcomeEmail() {
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
        </table>`
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

      ${renderFooter({ note: 'Reply "Unsubscribe"<br>to opt out' })}

    </div>
  </div>
</body>
</html>`;
}

router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !isValidEmail(email.trim())) {
      return res.status(422).json({ error: "A valid email address is required." });
    }

    const cleanEmail = email.trim().toLowerCase();

    try {
      await prisma.newsletterSubscriber.create({ data: { email: cleanEmail } });
    } catch (dbErr) {
      if (dbErr.code === "P2002") {
        return res.status(409).json({ error: "This email is already subscribed." });
      }
      console.error("[Newsletter DB Error]", dbErr.message);
    }

    await addToBrevo(cleanEmail);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE !== "false",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from:        `"LogicSoft Newsletter" <${process.env.SMTP_USER}>`,
      to:          process.env.CONTACT_RECIPIENT || BRAND.companyEmail,
      subject:     `[Newsletter] New subscriber: ${cleanEmail}`,
      html:        buildNotificationEmail(cleanEmail),
      attachments: [logoAttachment()],
    });

    await transporter.sendMail({
      from:        `"LogicSoft Technologies" <${process.env.SMTP_USER}>`,
      to:          cleanEmail,
      subject:     "Welcome to LogicSoft Insights",
      html:        buildWelcomeEmail(),
      attachments: [logoAttachment()],
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("[Newsletter Error]", err.message);
    return res.status(500).json({ error: "Subscription failed. Please try again." });
  }
});

export default router;