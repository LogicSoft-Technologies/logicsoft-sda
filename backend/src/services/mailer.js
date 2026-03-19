// src/services/mailer.js
import nodemailer from "nodemailer";

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

export async function sendLeadNotification({ sessionId, messages, score, signals }) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1a2d4a, #1f6fb2); padding: 24px; border-radius: 8px 8px 0 0;">
        <h2 style="color: white; margin: 0; font-size: 18px;">🎯 New Lead Detected — LogicSoft AI Chat</h2>
      </div>
      <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 12px; background: #fff; border: 1px solid #e5e7eb; font-weight: bold; width: 40%; font-size: 13px;">Session ID</td>
            <td style="padding: 8px 12px; background: #fff; border: 1px solid #e5e7eb; font-size: 13px;">${sessionId}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f9fafb; border: 1px solid #e5e7eb; font-weight: bold; font-size: 13px;">Lead Score</td>
            <td style="padding: 8px 12px; background: #f9fafb; border: 1px solid #e5e7eb; font-size: 13px;">
              <span style="background: ${score >= 70 ? '#dcfce7' : score >= 40 ? '#fef9c3' : '#fee2e2'}; 
                           color: ${score >= 70 ? '#166534' : score >= 40 ? '#854d0e' : '#991b1b'}; 
                           padding: 2px 10px; border-radius: 20px; font-weight: bold;">
                ${score}/100 — ${score >= 70 ? 'Hot 🔥' : score >= 40 ? 'Warm 🌡️' : 'Cold'}
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #fff; border: 1px solid #e5e7eb; font-weight: bold; font-size: 13px;">Signals Detected</td>
            <td style="padding: 8px 12px; background: #fff; border: 1px solid #e5e7eb; font-size: 13px;">${signals.join(", ") || "None"}</td>
          </tr>
        </table>

        <h3 style="font-size: 14px; color: #1a2d4a; margin-bottom: 12px;">Conversation Transcript</h3>
        <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; max-height: 400px; overflow-y: auto;">
          ${messages.map(m => `
            <div style="margin-bottom: 12px;">
              <span style="font-size: 11px; font-weight: bold; color: ${m.role === 'user' ? '#1f6fb2' : '#6b7280'}; text-transform: uppercase;">
                ${m.role === 'user' ? '👤 Visitor' : '🤖 Treasure'}
              </span>
              <p style="margin: 4px 0 0; font-size: 13px; color: #374151; line-height: 1.6;">${m.content}</p>
            </div>
          `).join('<hr style="border: none; border-top: 1px solid #f3f4f6; margin: 8px 0;">')}
        </div>

        <div style="margin-top: 20px; text-align: center;">
          <a href="https://logicsofttechnologies.com/admin" 
             style="background: linear-gradient(135deg, #1a2d4a, #1f6fb2); color: white; padding: 10px 24px; 
                    border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: bold;">
            View in Dashboard →
          </a>
        </div>
      </div>
    </div>
  `;

  await getTransporter().sendMail({
    from: `"LogicSoft AI" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECIPIENT,
    subject: `🎯 New ${score >= 70 ? 'Hot' : score >= 40 ? 'Warm' : 'Cold'} Lead — Score ${score}/100`,
    html,
  });
}

export async function sendConversationSummary({ sessionId, messages, duration }) {
  const userMessages = messages.filter(m => m.role === "user");
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1a2d4a, #1f6fb2); padding: 24px; border-radius: 8px 8px 0 0;">
        <h2 style="color: white; margin: 0; font-size: 18px;">📋 Conversation Summary — LogicSoft AI Chat</h2>
      </div>
      <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 12px; background: #fff; border: 1px solid #e5e7eb; font-weight: bold; width: 40%; font-size: 13px;">Session ID</td>
            <td style="padding: 8px 12px; background: #fff; border: 1px solid #e5e7eb; font-size: 13px;">${sessionId}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f9fafb; border: 1px solid #e5e7eb; font-weight: bold; font-size: 13px;">Duration</td>
            <td style="padding: 8px 12px; background: #f9fafb; border: 1px solid #e5e7eb; font-size: 13px;">${duration}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #fff; border: 1px solid #e5e7eb; font-weight: bold; font-size: 13px;">Messages Exchanged</td>
            <td style="padding: 8px 12px; background: #fff; border: 1px solid #e5e7eb; font-size: 13px;">${messages.length} total · ${userMessages.length} from visitor</td>
          </tr>
        </table>

        <h3 style="font-size: 14px; color: #1a2d4a; margin-bottom: 12px;">Full Transcript</h3>
        <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
          ${messages.map(m => `
            <div style="margin-bottom: 12px;">
              <span style="font-size: 11px; font-weight: bold; color: ${m.role === 'user' ? '#1f6fb2' : '#6b7280'}; text-transform: uppercase;">
                ${m.role === 'user' ? '👤 Visitor' : '🤖 Treasure'}
              </span>
              <p style="margin: 4px 0 0; font-size: 13px; color: #374151; line-height: 1.6;">${m.content}</p>
            </div>
          `).join('<hr style="border: none; border-top: 1px solid #f3f4f6; margin: 8px 0;">')}
        </div>
      </div>
    </div>
  `;

  await getTransporter().sendMail({
    from: `"LogicSoft AI" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECIPIENT,
    subject: `📋 Chat Summary — ${messages.length} messages · Session ${sessionId.slice(0, 8)}`,
    html,
  });
}