import nodemailer from "nodemailer";
import { renderHeader, renderFooter, logoAttachment, BRAND } from "../emails/brand.js";

let transporter;
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

function scoreLabel(score) {
  if (score >= 70) return "High Priority";
  if (score >= 40) return "Medium Priority";
  return "Low Priority";
}

function scoreColor(score) {
  if (score >= 70) return "#0f5132";
  if (score >= 40) return "#7a5b00";
  return "#58151c";
}

function scoreBg(score) {
  if (score >= 70) return "#e7f6ec";
  if (score >= 40) return "#fff6dd";
  return "#fbe9ea";
}

function renderTranscript(messages) {
  return messages
    .map(
      (m) => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #edf0f2;">
            <div style="font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: ${
              m.role === "user" ? "#1a2d4a" : "#8a94a3"
            }; margin-bottom: 4px;">
              ${m.role === "user" ? "Visitor" : "Assistant"}
            </div>
            <div style="font-size: 14px; line-height: 1.6; color: #2c333c;">
              ${m.content}
            </div>
          </td>
        </tr>`
    )
    .join("");
}

function baseLayout({ eyebrow, title, badge, badgeBg, badgeColor, bodyHtml }) {
  return `
  <div style="background: ${BRAND.bg}; padding: 32px 16px; font-family: -apple-system, Segoe UI, Helvetica, Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid ${BRAND.border}; border-radius: 8px; overflow: hidden;">

      ${renderHeader({ eyebrow, title, badge, badgeBg, badgeColor })}

      <div style="padding: 32px;">
        ${bodyHtml}
      </div>

      <div style="padding: 0 32px 24px;">
        <a href="https://logicsofttechnologies.online/admin" style="display:inline-block; background:${BRAND.blue}; color:#ffffff; font-size:13px; font-weight:600; text-decoration:none; padding:10px 20px; border-radius:6px;">
          View in Dashboard
        </a>
      </div>

      ${renderFooter()}
    </div>
  </div>`;
}

function detailRow(label, valueHtml, isLast) {
  return `
    <tr>
      <td style="padding: 10px 0; ${isLast ? "" : "border-bottom: 1px solid #edf0f2;"} font-size: 13px; color: #6b7280; width: 40%;">
        ${label}
      </td>
      <td style="padding: 10px 0; ${isLast ? "" : "border-bottom: 1px solid #edf0f2;"} font-size: 13px; color: #1a2d4a; font-weight: 500;">
        ${valueHtml}
      </td>
    </tr>`;
}

export async function sendLeadNotification({ sessionId, messages, score, signals }) {
  const bodyHtml = `
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
      ${detailRow("Session ID", sessionId)}
      ${detailRow(
        "Lead Score",
        `<span style="background: ${scoreBg(score)}; color: ${scoreColor(
          score
        )}; padding: 3px 10px; border-radius: 4px; font-weight: 600; font-size: 12px;">
          ${score}/100 · ${scoreLabel(score)}
        </span>`
      )}
      ${detailRow("Signals Detected", signals.join(", ") || "None", true)}
    </table>

    <div style="font-size: 12px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: #8a94a3; margin-bottom: 8px;">
      Conversation Transcript
    </div>
    <table style="width: 100%; border-collapse: collapse; border: 1px solid ${BRAND.border}; border-radius: 6px; padding: 0 16px;">
      ${renderTranscript(messages)}
    </table>
  `;

  const html = baseLayout({
    eyebrow: "New Lead",
    title: `${scoreLabel(score)} lead captured`,
    badge: scoreLabel(score),
    badgeBg: scoreBg(score),
    badgeColor: scoreColor(score),
    bodyHtml,
  });

  await getTransporter().sendMail({
    from: `"LogicSoft AI" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECIPIENT,
    subject: `New ${scoreLabel(score)} Lead — Score ${score}/100`,
    html,
    attachments: [logoAttachment()],
  });
}

export async function sendConversationSummary({ sessionId, messages, duration }) {
  const userMessages = messages.filter((m) => m.role === "user");

  const bodyHtml = `
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
      ${detailRow("Session ID", sessionId)}
      ${detailRow("Duration", duration)}
      ${detailRow(
        "Messages Exchanged",
        `${messages.length} total · ${userMessages.length} from visitor`,
        true
      )}
    </table>

    <div style="font-size: 12px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: #8a94a3; margin-bottom: 8px;">
      Full Transcript
    </div>
    <table style="width: 100%; border-collapse: collapse; border: 1px solid ${BRAND.border}; border-radius: 6px; padding: 0 16px;">
      ${renderTranscript(messages)}
    </table>
  `;

  const html = baseLayout({
    eyebrow: "Conversation Summary",
    title: "Chat session completed",
    bodyHtml,
  });

  await getTransporter().sendMail({
    from: `"LogicSoft AI" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECIPIENT,
    subject: `Chat Summary — ${messages.length} messages · Session ${sessionId.slice(0, 8)}`,
    html,
    attachments: [logoAttachment()],
  });
}