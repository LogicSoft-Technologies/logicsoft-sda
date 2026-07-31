import { renderHeader, renderFooter, BRAND } from "./brand.js";

const FLAG_API = "https://flagcdn.com/28x21";

const COUNTRY_NAMES = {
  NG: "Nigeria", US: "United States", CA: "Canada", GB: "United Kingdom", DE: "Germany",
  FR: "France", ES: "Spain", IT: "Italy", NL: "Netherlands", BE: "Belgium", CH: "Switzerland",
  AT: "Austria", SE: "Sweden", NO: "Norway", DK: "Denmark", FI: "Finland", IE: "Ireland",
  PT: "Portugal", GR: "Greece", TR: "Turkey", RU: "Russia", AE: "United Arab Emirates",
  SA: "Saudi Arabia", IN: "India", PK: "Pakistan", BD: "Bangladesh", LK: "Sri Lanka",
  MY: "Malaysia", SG: "Singapore", TH: "Thailand", PH: "Philippines", ID: "Indonesia",
  JP: "Japan", KR: "South Korea", CN: "China", ZA: "South Africa", KE: "Kenya",
  GH: "Ghana", EG: "Egypt", AU: "Australia", NZ: "New Zealand", BR: "Brazil",
  AR: "Argentina", CL: "Chile", CO: "Colombia", MX: "Mexico", VE: "Venezuela",
};

const SERVICE_COLOURS = {
  "Software Development":      { bg: "#eff6ff", text: "#1d4ed8", border: "#dbeafe" },
  "IT Consulting":             { bg: "#f0fdf4", text: "#15803d", border: "#dcfce7" },
  "Cybersecurity":             { bg: "#fef2f2", text: "#b91c1c", border: "#fee2e2" },
  "Cloud Engineering":         { bg: "#f0f9ff", text: "#0369a1", border: "#e0f2fe" },
  "Data Analytics":            { bg: "#faf5ff", text: "#7e22ce", border: "#f3e8ff" },
  "DevOps & Infrastructure":   { bg: "#fff7ed", text: "#c2410c", border: "#ffedd5" },
  "Application Modernisation": { bg: "#ecfdf5", text: "#065f46", border: "#d1fae5" },
  "QA & Testing":              { bg: "#fefce8", text: "#854d0e", border: "#fef9c3" },
  "Other":                     { bg: "#f8fafc", text: "#475569", border: "#e2e8f0" },
};

function pill(text, { bg = "#f1f5f9", text: color = "#475569", border = "#e2e8f0" } = {}) {
  return `<span style="display:inline-block;background:${bg};color:${color};border:1px solid ${border};padding:4px 12px;font-size:12px;font-weight:600;border-radius:4px;">${text}</span>`;
}

function infoRow(label, value, link, isLast) {
  const val = link
    ? `<a href="${link}" style="color:${BRAND.blue};text-decoration:none;font-weight:600;">${value}</a>`
    : `<span style="color:#1a2d4a;font-weight:500;">${value}</span>`;
  return `
    <tr>
      <td style="padding:12px 0; ${isLast ? "" : "border-bottom:1px solid #edf0f2;"} font-size:13px; color:#6b7280; width:32%; vertical-align:top;">
        ${label}
      </td>
      <td style="padding:12px 0; ${isLast ? "" : "border-bottom:1px solid #edf0f2;"} font-size:14px;">
        ${val}
      </td>
    </tr>`;
}

export function buildContactEmail({
  name, company, email, phone, country, service, budget, message,
  hasVoice = false, fileCount = 0,
}) {
  const countryName = COUNTRY_NAMES[country] || country || "Unknown";
  const serviceStyle = SERVICE_COLOURS[service] || SERVICE_COLOURS["Other"];
  const now = new Date();
  const timestamp = now.toLocaleString("en-GB", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit", timeZoneName: "short",
  });

  const attachmentNotice = (() => {
    const parts = [];
    if (hasVoice) parts.push("Voice briefing attached");
    if (fileCount > 0) parts.push(`${fileCount} file${fileCount > 1 ? "s" : ""} attached`);
    if (!parts.length) return "";
    return `
      <div style="margin-top:20px; background:#fff8f1; border:1px solid #fde3c8; border-radius:6px; padding:12px 16px; font-size:13px; color:#92400e; font-weight:500;">
        ${parts.join(" · ")}
      </div>`;
  })();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New Contact Enquiry — LogicSoft Technologies</title>
</head>
<body style="margin:0; padding:0; background:${BRAND.bg}; font-family:-apple-system, Segoe UI, Helvetica, Arial, sans-serif;">
  <div style="padding:32px 16px;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border:1px solid ${BRAND.border}; border-radius:8px; overflow:hidden;">

      ${renderHeader({ eyebrow: timestamp, title: "New Project Enquiry", badge: "Action required" })}

      <div style="padding:32px;">

        <div style="font-size:12px; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; color:#8a94a3; margin-bottom:10px;">
          Contact
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
          <tr>
            <td style="width:44px; vertical-align:top; padding-bottom:14px;">
              <div style="width:36px; height:36px; background:${BRAND.blue}; border-radius:6px; color:#fff; font-size:15px; font-weight:600; text-align:center; line-height:36px;">
                ${name.charAt(0).toUpperCase()}
              </div>
            </td>
            <td style="vertical-align:top; padding-bottom:14px;">
              <div style="font-size:16px; font-weight:600; color:#1a2d4a;">${name}</div>
              ${company ? `<div style="font-size:13px; color:#6b7280; margin-top:2px;">${company}</div>` : ""}
              <div style="margin-top:6px;">
                <img src="${FLAG_API}/${(country || "NG").toLowerCase()}.png" width="18" height="13" alt="${countryName}" style="vertical-align:middle; margin-right:6px; border:1px solid #e5e7eb; border-radius:2px;">
                <span style="font-size:12px; color:#6b7280; vertical-align:middle;">${countryName}</span>
              </div>
            </td>
          </tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
          ${infoRow("Email", email, `mailto:${email}`)}
          ${phone ? infoRow("Phone", phone, `tel:${phone.replace(/\s/g, "")}`, true) : infoRow("Phone", "Not provided", null, true)}
        </table>

        <div style="font-size:12px; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; color:#8a94a3; margin-bottom:10px;">
          Project Details
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
          <tr>
            <td style="width:50%; vertical-align:top; padding-bottom:8px;">
              <div style="font-size:11px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:8px;">Service</div>
              ${service ? pill(service, serviceStyle) : `<span style="font-size:13px; color:#9ca3af;">Not specified</span>`}
            </td>
            <td style="width:50%; vertical-align:top; padding-bottom:8px;">
              <div style="font-size:11px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:8px;">Budget</div>
              ${budget ? `<span style="font-size:14px; font-weight:600; color:#1a2d4a;">${budget}</span>` : `<span style="font-size:13px; color:#9ca3af;">Not specified</span>`}
            </td>
          </tr>
        </table>

        ${attachmentNotice}

        <div style="font-size:12px; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; color:#8a94a3; margin:28px 0 10px;">
          Message
        </div>
        <div style="font-size:14px; color:#2c333c; line-height:1.7; white-space:pre-wrap; background:#fafbfc; border:1px solid ${BRAND.border}; border-radius:6px; padding:16px;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>

        <table cellpadding="0" cellspacing="0" style="margin-top:28px;">
          <tr>
            <td style="padding-right:10px;">
              <a href="mailto:${email}?subject=Re:%20Your%20LogicSoft%20Enquiry&body=Hi%20${encodeURIComponent(name)}%2C%0A%0AThank%20you%20for%20reaching%20out.%20"
                style="display:inline-block; background:${BRAND.blue}; color:#ffffff; font-size:13px; font-weight:600; text-decoration:none; padding:10px 20px; border-radius:6px;">
                Reply to ${name}
              </a>
            </td>
            ${phone ? `
            <td>
              <a href="tel:${phone.replace(/\s/g, "")}"
                style="display:inline-block; background:#ffffff; border:1px solid #d0d5dd; color:#1a2d4a; font-size:13px; font-weight:600; text-decoration:none; padding:10px 20px; border-radius:6px;">
                Call ${name}
              </a>
            </td>` : ""}
          </tr>
        </table>

        <div style="margin-top:28px; background:#f4f7fb; border:1px solid #dfe6ee; border-radius:6px; padding:14px 16px; font-size:12px; color:#5b6472;">
          <strong style="color:#1a2d4a;">Submission metadata</strong><br>
          Country: ${country || "N/A"} · Voice note: ${hasVoice ? "Yes" : "No"} · Attachments: ${fileCount}
        </div>

      </div>

      ${renderFooter({ note: "Internal notification<br>Do not reply to this email" })}

    </div>
  </div>
</body>
</html>`;
}