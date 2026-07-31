import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import { buildContactEmail } from "../emails/contactEmail.js";
import { renderHeader, renderFooter, logoAttachment, BRAND } from "../emails/brand.js";
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

      const attachments = [logoAttachment()];

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

      await transporter.sendMail({
        from:    `"LogicSoft Contact" <${process.env.SMTP_USER}>`,
        to:      process.env.CONTACT_RECIPIENT || BRAND.companyEmail,
        replyTo: email,
        subject: `[New Enquiry] ${name}${company ? ` · ${company}` : ""} — ${service || "General"}`,
        html:    buildContactEmail({ name, company, email, phone, country, service, budget, message, hasVoice, fileCount }),
        attachments,
      });

      await transporter.sendMail({
        from:        `"LogicSoft Technologies" <${process.env.SMTP_USER}>`,
        to:          email,
        subject:     "We've received your enquiry — LogicSoft Technologies",
        html:        buildAutoReply({ name }),
        attachments: [logoAttachment()],
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
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>We've received your enquiry — LogicSoft Technologies</title>
</head>
<body style="margin:0; padding:0; background:${BRAND.bg}; font-family:-apple-system, Segoe UI, Helvetica, Arial, sans-serif;">
  <div style="padding:32px 16px;">
    <div style="max-width:560px; margin:0 auto; background:#ffffff; border:1px solid ${BRAND.border}; border-radius:8px; overflow:hidden;">

      ${renderHeader({ eyebrow: "Enquiry Received", title: "Thanks for reaching out" })}

      <div style="padding:32px;">
        <p style="margin:0 0 18px; font-size:15px; color:#1a2d4a; font-weight:600;">Hi ${name},</p>
        <p style="margin:0 0 16px; font-size:14px; color:#4b5563; line-height:1.7;">
          Thank you for reaching out. We've received your enquiry and a solution architect will get back to you within <strong>24 business hours</strong>.
        </p>
        <p style="margin:0 0 20px; font-size:14px; color:#4b5563; line-height:1.7;">
          For urgent matters, you can reach us directly:
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafbfc; border:1px solid ${BRAND.border}; border-radius:6px; padding:4px 0;">
          <tr>
            <td style="padding:12px 20px; font-size:13px; color:#1a2d4a; border-bottom:1px solid #edf0f2;">
              Phone &nbsp;·&nbsp; <a href="tel:+2349012688861" style="color:${BRAND.blue}; text-decoration:none; font-weight:600;">+234 9012 688 861</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 20px; font-size:13px; color:#1a2d4a; border-bottom:1px solid #edf0f2;">
              Email &nbsp;·&nbsp; <a href="mailto:${BRAND.companyEmail}" style="color:${BRAND.blue}; text-decoration:none; font-weight:600;">${BRAND.companyEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 20px; font-size:13px; color:#1a2d4a;">
              WhatsApp &nbsp;·&nbsp; <a href="https://wa.me/2349012688861" style="color:${BRAND.blue}; text-decoration:none; font-weight:600;">Typically replies in minutes</a>
            </td>
          </tr>
        </table>

        <p style="margin:28px 0 0; font-size:14px; color:#1a2d4a; font-weight:600;">The LogicSoft Team</p>
      </div>

      ${renderFooter()}

    </div>
  </div>
</body>
</html>`;
}

export default router;