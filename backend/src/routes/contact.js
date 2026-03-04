// src/routes/contact.js
import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import { buildContactEmail } from "../emails/contactEmail.js";
import prisma from "../config/prisma.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
}).fields([
  { name: "attachments", maxCount: 10 },
  { name: "voiceNote",   maxCount: 1  },
]);

router.post("/", (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    }
    if (err) {
      return res.status(500).json({ error: "File processing failed." });
    }

    try {
      const { name, company, email, phone, country, service, budget, message } = req.body;

      if (!name?.trim() || !email?.trim() || !message?.trim()) {
        return res.status(422).json({ error: "Name, email, and message are required." });
      }

      const voiceFiles = req.files?.voiceNote   ?? [];
      const userFiles  = req.files?.attachments ?? [];
      const hasVoice   = voiceFiles.length > 0;
      const fileCount  = userFiles.length;

      try {
        await prisma.contactSubmission.create({
          data: {
            name,
            company:  company  || null,
            email,
            phone:    phone    || null,
            country:  country  || null,
            service:  service  || null,
            budget:   budget   || null,
            message,
            hasVoice,
            fileCount,
          },
        });
      } catch (dbErr) {
        console.error("[Contact DB Save Error]", dbErr.message);
      }

      const attachments = [];

      if (hasVoice) {
        attachments.push({
          filename:    "voice-briefing.webm",
          content:     voiceFiles[0].buffer,
          contentType: "audio/webm",
        });
      }

      for (const f of userFiles) {
        attachments.push({
          filename:    f.originalname,
          content:     f.buffer,
          contentType: f.mimetype,
        });
      }

      const transporter = nodemailer.createTransport({
        host:   process.env.SMTP_HOST,
        port:   Number(process.env.SMTP_PORT) || 465,
        secure: process.env.SMTP_SECURE !== "false",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // ── Send to company ─────
      await transporter.sendMail({
        from:    `"LogicSoft Contact" <${process.env.SMTP_USER}>`,
        to:      process.env.CONTACT_RECIPIENT || "contact@logicsoft.ng",
        replyTo: email,
        subject: `[New Enquiry] ${name}${company ? ` · ${company}` : ""} — ${service || "General"}`,
        html:    buildContactEmail({ name, company, email, phone, country, service, budget, message, hasVoice, fileCount }),
        attachments,
      });

      // ── Auto-reply to sender ───
      await transporter.sendMail({
        from:    `"LogicSoft Technologies" <${process.env.SMTP_USER}>`,
        to:      email,
        subject: "We've received your enquiry — LogicSoft Technologies",
        html:    buildAutoReply({ name }),
      });

      return res.json({ success: true });

    } catch (e) {
      console.error("[Contact Route Error]", e);
      return res.status(500).json({ error: "Failed to send message. Please try again or email us directly." });
    }
  });
});

function buildAutoReply({ name }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 20px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-top:4px solid #1f6fb2;max-width:580px;">
        <tr><td style="background:linear-gradient(135deg,#050c18,#0d2448);padding:36px 40px;">
          <p style="margin:0;font-size:22px;font-weight:300;color:#ffffff;">LogicSoft <strong style="font-weight:700;">Technologies</strong></p>
          <p style="margin:6px 0 0;font-size:11px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:2px;">Enterprise Technology Partner</p>
        </td></tr>
        <tr><td style="padding:40px;">
          <p style="margin:0 0 20px;font-size:16px;color:#1f3a5f;font-weight:600;">Hi ${name},</p>
          <p style="margin:0 0 16px;font-size:14px;color:#4b5563;line-height:1.8;">Thank you for reaching out to LogicSoft Technologies. We have received your enquiry and a solution architect will respond within <strong>24 business hours</strong>.</p>
          <p style="margin:0 0 16px;font-size:14px;color:#4b5563;line-height:1.8;">For urgent matters, reach us directly:</p>
          <table cellpadding="0" cellspacing="0" style="margin:24px 0;background:#f8fafc;border:1px solid #e8eef6;padding:20px;width:100%;">
            <tr><td style="font-size:13px;color:#1f3a5f;padding:5px 0;">📞 <a href="tel:+2349012688861" style="color:#1f6fb2;text-decoration:none;">+234 9012 688 861</a></td></tr>
            <tr><td style="font-size:13px;color:#1f3a5f;padding:5px 0;">✉️ <a href="mailto:contact@logicsoft.ng" style="color:#1f6fb2;text-decoration:none;">contact@logicsoft.ng</a></td></tr>
            <tr><td style="font-size:13px;color:#1f3a5f;padding:5px 0;">💬 <a href="https://wa.me/2349012688861" style="color:#1f6fb2;text-decoration:none;">WhatsApp — typically replies in minutes</a></td></tr>
          </table>
          <p style="margin:24px 0 0;font-size:14px;color:#1f3a5f;font-weight:600;">The LogicSoft Team</p>
        </td></tr>
        <tr><td style="background:#f5f8fc;border-top:1px solid #e8eef6;padding:20px 40px;">
          <p style="margin:0;font-size:11px;color:#9ca3af;line-height:1.7;">LogicSoft Technologies · 14 Adeola Odeku Street, Victoria Island, Lagos, Nigeria</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export default router;