import express from "express";
import nodemailer from "nodemailer";
import prisma from "../config/prisma.js";

const router = express.Router();
const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

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

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE !== "false",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"LogicSoft Newsletter" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECIPIENT,
      subject: `[Newsletter] New subscriber: ${cleanEmail}`,
      html: `<div style="font-family:Arial,sans-serif;padding:32px;background:#f8fafc;border-top:4px solid #1f6fb2;">
        <p style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin:0 0 8px">New Subscriber</p>
        <p style="font-size:22px;font-weight:300;color:#1f3a5f;margin:0 0 16px">${cleanEmail}</p>
        <p style="font-size:11px;color:#9ca3af;margin:0">${new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })}</p>
      </div>`,
    });

    await transporter.sendMail({
      from: `"LogicSoft Technologies" <${process.env.SMTP_USER}>`,
      to: cleanEmail,
      subject: "Welcome to LogicSoft Insights",
      html: `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;background:#f0f4f8;">
          <tr><td align="center">
            <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-top:4px solid #1f6fb2;max-width:560px;">
              <tr><td style="background:linear-gradient(135deg,#050c18,#0d2448);padding:32px 40px;">
                <p style="margin:0;font-size:20px;font-weight:300;color:#fff;">LogicSoft <strong>Technologies</strong></p>
              </td></tr>
              <tr><td style="padding:36px 40px;">
                <p style="font-size:15px;font-weight:600;color:#1f3a5f;margin:0 0 14px;">Welcome to LogicSoft Insights</p>
                <p style="font-size:13.5px;color:#4b5563;line-height:1.85;margin:0 0 14px;">You're now subscribed to receive curated updates on software engineering, digital transformation, and enterprise technology strategy.</p>
                <ul style="font-size:13px;color:#4b5563;line-height:2;padding-left:20px;margin:0 0 24px;">
                  <li>Enterprise software architecture &amp; best practices</li>
                  <li>Cloud engineering &amp; DevOps trends</li>
                  <li>Cybersecurity advisories &amp; compliance updates</li>
                  <li>Case studies from our project portfolio</li>
                </ul>
                <table cellpadding="0" cellspacing="0"><tr><td style="background:linear-gradient(135deg,#7A2E00,#C45500,#FF7A00);">
                  <a href="https://logicsoft.ng" style="display:inline-block;padding:12px 28px;font-size:13px;font-weight:700;color:#fff;text-decoration:none;">Visit LogicSoft Technologies</a>
                </td></tr></table>
                <p style="font-size:11px;color:#9ca3af;margin:24px 0 0;line-height:1.7;">To unsubscribe, reply with "Unsubscribe" in the subject line.</p>
              </td></tr>
              <tr><td style="background:#f5f8fc;border-top:1px solid #e8eef6;padding:16px 40px;">
                <p style="margin:0;font-size:11px;color:#9ca3af;">LogicSoft Technologies · 14 Adeola Odeku Street, Victoria Island, Lagos, Nigeria</p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body></html>`,
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("[Newsletter Error]", err.message);
    return res.status(500).json({ error: "Subscription failed. Please try again." });
  }
});

export default router;