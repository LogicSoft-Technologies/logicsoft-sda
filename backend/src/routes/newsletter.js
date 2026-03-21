import express from "express";
import nodemailer from "nodemailer";
import prisma from "../config/prisma.js";

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

    // Team notification email
    await transporter.sendMail({
      from: `"LogicSoft Newsletter" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECIPIENT,
      subject: `[Newsletter] New subscriber: ${cleanEmail}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Arial',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 20px;background:#f0f4f8;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">
        <tr><td style="background:linear-gradient(135deg,#1a2d4a,#1f6fb2);padding:24px 32px;border-radius:8px 8px 0 0;">
          <p style="margin:0;font-size:11px;letter-spacing:3px;color:rgba(255,255,255,0.6);text-transform:uppercase;">Newsletter</p>
          <p style="margin:6px 0 0;font-size:18px;font-weight:700;color:#ffffff;">New Subscriber</p>
        </td></tr>
        <tr><td style="background:#ffffff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
          <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;color:#9ca3af;text-transform:uppercase;font-weight:700;">Email Address</p>
          <p style="margin:0 0 24px;font-size:20px;font-weight:300;color:#1a2d4a;">${cleanEmail}</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:6px;padding:16px 20px;margin-bottom:20px;">
            <tr><td>
              <p style="margin:0;font-size:11px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">Subscribed At</p>
              <p style="margin:4px 0 0;font-size:13px;color:#374151;">${new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })}</p>
            </td></tr>
          </table>
          <p style="margin:0;font-size:12.5px;color:#6b7280;line-height:1.7;">This subscriber has been added to your Brevo contact list and will receive future newsletters automatically.</p>
        </td></tr>
        <tr><td style="padding:16px 0 0;">
          <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;">LogicSoft Technologies · Automated Notification</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });

    // Welcome email to subscriber
    await transporter.sendMail({
      from: `"LogicSoft Technologies" <${process.env.SMTP_USER}>`,
      to: cleanEmail,
      subject: "Welcome to LogicSoft Insights",
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0f1e;font-family:'Georgia',serif;">
  <div style="display:none;max-height:0;overflow:hidden;color:#0a0f1e;">Welcome to LogicSoft Insights — enterprise technology intelligence, delivered monthly.</div>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1e;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr><td style="background:linear-gradient(135deg,#0d1b2e 0%,#0f2545 50%,#0d1b2e 100%);padding:48px 48px 40px;border-bottom:1px solid rgba(31,111,178,0.3);">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin:0;font-size:11px;letter-spacing:4px;color:rgba(255,255,255,0.4);text-transform:uppercase;font-family:'Arial',sans-serif;">Enterprise Technology</p>
                <p style="margin:6px 0 0;font-size:26px;font-weight:300;color:#ffffff;letter-spacing:1px;font-family:'Arial',sans-serif;">Logicsoft <span style="color:#1f6fb2;font-weight:700;">Technologies</span></p>
              </td>
              <td align="right" valign="middle">
                <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#1a2d4a,#1f6fb2);text-align:center;line-height:44px;display:inline-block;">
                  <span style="color:#fff;font-size:18px;font-weight:700;font-family:Arial;">L</span>
                </div>
              </td>
            </tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 0;">
            <tr><td style="height:1px;background:linear-gradient(to right,#1f6fb2,rgba(31,111,178,0.1));"></td></tr>
          </table>
          <p style="margin:28px 0 0;font-size:32px;font-weight:300;color:#ffffff;line-height:1.3;letter-spacing:-0.5px;font-family:'Georgia',serif;">
            Welcome to<br><span style="color:#1f6fb2;font-style:italic;">LogicSoft Insights</span>
          </p>
          <p style="margin:14px 0 0;font-size:14px;color:rgba(255,255,255,0.55);line-height:1.8;font-family:'Arial',sans-serif;">Enterprise technology intelligence, delivered to your inbox.</p>
        </td></tr>

        <!-- BODY -->
        <tr><td style="background:#ffffff;padding:48px;">
          <p style="margin:0 0 20px;font-size:15px;color:#1a2d4a;line-height:1.9;font-family:'Arial',sans-serif;">
            You've joined a community of technology leaders, decision-makers, and builders who rely on LogicSoft for enterprise-grade digital solutions.
          </p>
          <p style="margin:0 0 32px;font-size:14px;color:#4b5563;line-height:1.9;font-family:'Arial',sans-serif;">
            Each month, we deliver curated intelligence directly to your inbox — no noise, no fluff. Just the insights that matter to your business.
          </p>

          <!-- What to expect -->
          <p style="margin:0 0 16px;font-size:11px;letter-spacing:3px;color:#1f6fb2;text-transform:uppercase;font-family:'Arial',sans-serif;font-weight:700;">What to expect</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
            <tr><td style="padding:16px;background:#f8fafc;border-left:3px solid #1f6fb2;">
              <p style="margin:0;font-size:13.5px;font-weight:700;color:#1a2d4a;font-family:'Arial',sans-serif;">Enterprise Architecture & Engineering</p>
              <p style="margin:4px 0 0;font-size:12.5px;color:#6b7280;font-family:'Arial',sans-serif;line-height:1.7;">Deep-dives into software architecture, system design, and engineering best practices.</p>
            </td></tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
            <tr><td style="padding:16px;background:#f8fafc;border-left:3px solid #1f6fb2;">
              <p style="margin:0;font-size:13.5px;font-weight:700;color:#1a2d4a;font-family:'Arial',sans-serif;">Cloud, DevOps & Security Intelligence</p>
              <p style="margin:4px 0 0;font-size:12.5px;color:#6b7280;font-family:'Arial',sans-serif;line-height:1.7;">Trends, advisories, and strategies across AWS, Azure, GCP, and cybersecurity.</p>
            </td></tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
            <tr><td style="padding:16px;background:#f8fafc;border-left:3px solid #1f6fb2;">
              <p style="margin:0;font-size:13.5px;font-weight:700;color:#1a2d4a;font-family:'Arial',sans-serif;">Project Case Studies & Portfolio</p>
              <p style="margin:4px 0 0;font-size:12.5px;color:#6b7280;font-family:'Arial',sans-serif;line-height:1.7;">Real-world breakdowns of projects delivered across Africa, Europe & the Middle East.</p>
            </td></tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
            <tr><td style="padding:16px;background:#f8fafc;border-left:3px solid #1f6fb2;">
              <p style="margin:0;font-size:13.5px;font-weight:700;color:#1a2d4a;font-family:'Arial',sans-serif;">Data Analytics & AI Insights</p>
              <p style="margin:4px 0 0;font-size:12.5px;color:#6b7280;font-family:'Arial',sans-serif;line-height:1.7;">Practical applications of machine learning, BI dashboards, and data strategy.</p>
            </td></tr>
          </table>

          <!-- CTAs -->
          <table cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
            <tr>
              <td style="background:linear-gradient(135deg,#1a2d4a,#1f6fb2);border-radius:4px;">
                <a href="https://logicsofttechnologies.com" style="display:inline-block;padding:14px 28px;font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;font-family:'Arial',sans-serif;">Explore Our Services →</a>
              </td>
              <td width="12"></td>
              <td style="border:1.5px solid #1f6fb2;border-radius:4px;">
                <a href="https://calendar.app.google/mwqzEDExKyz5mGUVA" style="display:inline-block;padding:14px 28px;font-size:13px;font-weight:700;color:#1f6fb2;text-decoration:none;font-family:'Arial',sans-serif;">Book Free Consultation</a>
              </td>
            </tr>
          </table>

          <!-- Signature -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e5e7eb;padding-top:24px;">
            <tr><td>
              <p style="margin:0;font-size:13.5px;color:#1a2d4a;font-family:'Arial',sans-serif;font-weight:600;">Elijah O. Alexander</p>
              <p style="margin:3px 0 0;font-size:12px;color:#6b7280;font-family:'Arial',sans-serif;">Sales & Account Manager, LogicSoft Technologies</p>
              <p style="margin:3px 0 0;font-size:12px;color:#6b7280;font-family:'Arial',sans-serif;">+234 9012 688 861 · contact@logicsoft.com</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- FOOTER -->
        <tr><td style="background:#0d1b2e;padding:24px 48px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td><p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3);font-family:'Arial',sans-serif;line-height:1.8;">LogicSoft Technologies · Nigeria<br>logicsofttechnologies.com · contact@logicsoft.com</p></td>
              <td align="right" valign="top"><p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3);font-family:'Arial',sans-serif;">Reply "Unsubscribe"<br>to opt out</p></td>
            </tr>
          </table>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("[Newsletter Error]", err.message);
    return res.status(500).json({ error: "Subscription failed. Please try again." });
  }
});

export default router;