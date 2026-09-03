import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import {
  BRAND,
  logoAttachment,
  renderFooter,
  renderHeader,
} from "../emails/brand.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("cv");

const validExtensions = new Set(["pdf", "doc", "docx"]);

router.post("/apply", (req, res) => {
  upload(req, res, async (uploadError) => {
    if (uploadError instanceof multer.MulterError) {
      return res.status(400).json({
        error:
          uploadError.code === "LIMIT_FILE_SIZE"
            ? "Your CV must be 10 MB or smaller."
            : `Upload error: ${uploadError.message}`,
      });
    }

    if (uploadError) {
      return res.status(400).json({
        error: "Your CV could not be processed.",
      });
    }

    try {
      const {
        fullName,
        email,
        phone,
        role,
        location,
        linkedin,
        experience,
        availability,
        coverLetter,
      } = req.body;

      if (
        !fullName?.trim() ||
        !email?.trim() ||
        !phone?.trim() ||
        !role?.trim() ||
        !location?.trim() ||
        !experience?.trim() ||
        !availability?.trim() ||
        !coverLetter?.trim()
      ) {
        return res.status(422).json({
          error: "Please complete all required application fields.",
        });
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(422).json({
          error: "Please provide a valid email address.",
        });
      }

      if (!req.file) {
        return res.status(422).json({
          error: "Please attach your CV.",
        });
      }

      const extension = req.file.originalname.split(".").pop()?.toLowerCase();

      if (!validExtensions.has(extension)) {
        return res.status(422).json({
          error: "Your CV must be a PDF, DOC, or DOCX file.",
        });
      }

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: process.env.SMTP_SECURE !== "false",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const recipient =
        process.env.CAREERS_RECIPIENT ||
        process.env.CONTACT_RECIPIENT ||
        BRAND.companyEmail;

      await transporter.sendMail({
        from: `"LogicSoft Careers" <${process.env.SMTP_USER}>`,
        to: recipient,
        replyTo: email,
        subject: `[Job Application] ${fullName} — ${role}`,
        html: buildApplicationEmail({
          fullName,
          email,
          phone,
          role,
          location,
          linkedin,
          experience,
          availability,
          coverLetter,
        }),
        attachments: [
          logoAttachment(),
          {
            filename: req.file.originalname,
            content: req.file.buffer,
            contentType: req.file.mimetype,
          },
        ],
      });

      await transporter.sendMail({
        from: `"LogicSoft Technologies" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "We've received your application — LogicSoft Technologies",
        html: buildApplicantConfirmation({ fullName, role }),
        attachments: [logoAttachment()],
      });

      return res.json({ success: true });
    } catch (error) {
      console.error("[Careers Route Error]", error);

      return res.status(500).json({
        error: "Your application could not be submitted. Please try again.",
      });
    }
  });
});

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function detailRow(label, value) {
  if (!value) return "";

  return `
    <tr>
      <td style="padding:10px 0; width:145px; font-size:12px; font-weight:600; color:#6b7280; vertical-align:top;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:10px 0; font-size:13px; color:#1a2d4a; vertical-align:top;">
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

function buildApplicationEmail(application) {
  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0; background:${BRAND.bg}; font-family:Arial, sans-serif;">
    <div style="padding:32px 16px;">
      <div style="max-width:640px; margin:auto; overflow:hidden; background:#ffffff; border:1px solid ${BRAND.border}; border-radius:8px;">
        ${renderHeader({
          eyebrow: "New careers application",
          title: `${escapeHtml(application.fullName)} applied for ${escapeHtml(application.role)}`,
          badge: "CV attached",
          badgeBg: "#dbeafe",
          badgeColor: BRAND.blue,
        })}

        <div style="padding:32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${detailRow("Name", application.fullName)}
            ${detailRow("Role", application.role)}
            ${detailRow("Email", application.email)}
            ${detailRow("Phone", application.phone)}
            ${detailRow("Location", application.location)}
            ${detailRow("Experience", application.experience)}
            ${detailRow("Availability", application.availability)}
            ${detailRow("LinkedIn / Portfolio", application.linkedin)}
          </table>

          <div style="margin-top:22px; padding:18px; background:#f8fafc; border:1px solid ${BRAND.border};">
            <p style="margin:0 0 8px; font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:#6b7280;">
              Cover letter
            </p>
            <p style="margin:0; font-size:13px; line-height:1.7; color:#374151; white-space:pre-wrap;">
              ${escapeHtml(application.coverLetter)}
            </p>
          </div>
        </div>

        ${renderFooter({ note: "Careers application" })}
      </div>
    </div>
  </body>
</html>`;
}

function buildApplicantConfirmation({ fullName, role }) {
  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0; background:${BRAND.bg}; font-family:Arial, sans-serif;">
    <div style="padding:32px 16px;">
      <div style="max-width:560px; margin:auto; overflow:hidden; background:#ffffff; border:1px solid ${BRAND.border}; border-radius:8px;">
        ${renderHeader({
          eyebrow: "Application received",
          title: "Thank you for applying",
        })}

        <div style="padding:32px; color:#4b5563; font-size:14px; line-height:1.7;">
          <p style="margin:0 0 16px; color:#1a2d4a; font-weight:600;">
            Hi ${escapeHtml(fullName)},
          </p>

          <p style="margin:0 0 16px;">
            We have received your application for the
            <strong>${escapeHtml(role)}</strong> role, including your CV.
          </p>

          <p style="margin:0;">
            Our team will review your application and contact you if your
            experience matches our current requirements.
          </p>
        </div>

        ${renderFooter()}
      </div>
    </div>
  </body>
</html>`;
}

export default router;