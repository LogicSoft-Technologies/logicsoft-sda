// src/emails/contactEmail.js

const FLAG_API = "https://flagcdn.com/28x21";

const COUNTRY_NAMES = {
  NG:"Nigeria",US:"United States",CA:"Canada",GB:"United Kingdom",DE:"Germany",
  FR:"France",ES:"Spain",IT:"Italy",NL:"Netherlands",BE:"Belgium",CH:"Switzerland",
  AT:"Austria",SE:"Sweden",NO:"Norway",DK:"Denmark",FI:"Finland",IE:"Ireland",
  PT:"Portugal",GR:"Greece",TR:"Turkey",RU:"Russia",AE:"United Arab Emirates",
  SA:"Saudi Arabia",IN:"India",PK:"Pakistan",BD:"Bangladesh",LK:"Sri Lanka",
  MY:"Malaysia",SG:"Singapore",TH:"Thailand",PH:"Philippines",ID:"Indonesia",
  JP:"Japan",KR:"South Korea",CN:"China",ZA:"South Africa",KE:"Kenya",
  GH:"Ghana",EG:"Egypt",AU:"Australia",NZ:"New Zealand",BR:"Brazil",
  AR:"Argentina",CL:"Chile",CO:"Colombia",MX:"Mexico",VE:"Venezuela",
};

const SERVICE_COLOURS = {
  "Software Development":     { bg:"#eff6ff", text:"#1d4ed8", border:"#bfdbfe" },
  "IT Consulting":            { bg:"#f0fdf4", text:"#15803d", border:"#bbf7d0" },
  "Cybersecurity":            { bg:"#fef2f2", text:"#b91c1c", border:"#fecaca" },
  "Cloud Engineering":        { bg:"#f0f9ff", text:"#0369a1", border:"#bae6fd" },
  "Data Analytics":           { bg:"#faf5ff", text:"#7e22ce", border:"#e9d5ff" },
  "DevOps & Infrastructure":  { bg:"#fff7ed", text:"#c2410c", border:"#fed7aa" },
  "Application Modernisation":{ bg:"#ecfdf5", text:"#065f46", border:"#a7f3d0" },
  "QA & Testing":             { bg:"#fefce8", text:"#854d0e", border:"#fef08a" },
  "Other":                    { bg:"#f8fafc", text:"#475569", border:"#e2e8f0" },
};

const BUDGET_COLOURS = {
  "Under $10,000":          "#6b7280",
  "$10,000 – $50,000":      "#0369a1",
  "$50,000 – $150,000":     "#0891b2",
  "$150,000 – $500,000":    "#7c3aed",
  "$500,000+":              "#b45309",
  "Not yet defined":        "#6b7280",
};


function pill(text, { bg = "#f1f5f9", text: color = "#475569", border = "#e2e8f0" } = {}) {
  return `<span style="display:inline-block;background:${bg};color:${color};border:1px solid ${border};padding:3px 10px;font-size:11px;font-weight:700;border-radius:2px;font-family:monospace;letter-spacing:0.5px;">${text}</span>`;
}

function infoRow(icon, label, value, link = null) {
  const val = link
    ? `<a href="${link}" style="color:#1f6fb2;text-decoration:none;font-weight:600;">${value}</a>`
    : `<span style="color:#1f2937;font-weight:500;">${value}</span>`;
  return `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #f1f5f9;vertical-align:middle;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="width:30px;font-size:16px;vertical-align:middle;">${icon}</td>
          <td style="vertical-align:middle;">
            <span style="display:block;font-size:10px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:2px;">${label}</span>
            <span style="font-size:13.5px;">${val}</span>
          </td>
        </tr></table>
      </td>
    </tr>`;
}

export function buildContactEmail({
  name, company, email, phone, country, service, budget, message,
  hasVoice = false, fileCount = 0,
}) {
  const countryName = COUNTRY_NAMES[country] || country || "Unknown";
  const serviceStyle = SERVICE_COLOURS[service] || SERVICE_COLOURS["Other"];
  const budgetColor  = BUDGET_COLOURS[budget]  || "#6b7280";
  const now = new Date();
  const timestamp = now.toLocaleString("en-GB", {
    weekday:"long", year:"numeric", month:"long", day:"numeric",
    hour:"2-digit", minute:"2-digit", timeZoneName:"short",
  });

  const attachmentNotice = (() => {
    const parts = [];
    if (hasVoice)    parts.push(`🎙️ Voice briefing attached`);
    if (fileCount > 0) parts.push(`📎 ${fileCount} file${fileCount > 1 ? "s" : ""} attached`);
    if (!parts.length) return "";
    return `
      <tr><td style="padding:0 40px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff7ed;border:1px solid #fed7aa;padding:12px 16px;margin-top:0;">
          <tr><td style="font-size:12.5px;color:#92400e;font-weight:600;">${parts.join("&emsp;·&emsp;")}</td></tr>
        </table>
      </td></tr>`;
  })();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New Contact Enquiry — LogicSoft</title>
</head>
<body style="margin:0;padding:0;background:#eef2f7;font-family:'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7;padding:40px 16px;">
  <tr><td align="center">

    <!-- Outer card -->
    <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border-radius:0;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

      <!-- ══ TOP ACCENT ══ -->
      <tr><td style="height:4px;background:linear-gradient(90deg,#1f6fb2,#0d3a6e,#1f6fb2);font-size:0;">&nbsp;</td></tr>

      <!-- ══ HEADER ══ -->
      <tr><td style="background:linear-gradient(145deg,#050c18 0%,#0a1e38 50%,#0d2448 100%);padding:36px 40px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td>
            <p style="margin:0;font-size:10px;font-weight:700;color:rgba(96,168,220,0.8);text-transform:uppercase;letter-spacing:3px;font-family:monospace;">LogicSoft Technologies</p>
            <p style="margin:8px 0 4px;font-size:26px;font-weight:300;color:#ffffff;letter-spacing:-0.3px;">New <strong style="font-weight:700;color:#60a8dc;">Enquiry</strong> Received</p>
            <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35);">${timestamp}</p>
          </td>
          <td align="right" style="vertical-align:top;">
            <table cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);padding:10px 14px;text-align:center;">
              <tr><td style="font-size:22px;line-height:1;">📬</td></tr>
              <tr><td style="font-size:9px;font-weight:700;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:1.5px;padding-top:4px;">Contact<br>Form</td></tr>
            </table>
          </td>
        </tr></table>
      </td></tr>

      <!-- ══ ALERT BANNER ══ -->
      <tr><td style="background:#1f6fb2;padding:10px 40px;">
        <p style="margin:0;font-size:12px;font-weight:700;color:#ffffff;text-transform:uppercase;letter-spacing:1.5px;">
          ⚡ Action required — respond within 24 business hours
        </p>
      </td></tr>

      <!-- ══ CONTACT IDENTITY ══ -->
      <tr><td style="padding:32px 40px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#f8fbff,#ffffff);border:1px solid #e0ecf8;">

          <!-- Identity header -->
          <tr><td style="background:#1f3a5f;padding:12px 16px;">
            <p style="margin:0;font-size:10px;font-weight:700;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:2px;">Contact Details</p>
          </td></tr>

          <!-- Avatar + name row -->
          <tr><td style="padding:20px 16px 16px;">
            <table cellpadding="0" cellspacing="0"><tr>
              <!-- Avatar circle -->
              <td style="vertical-align:top;padding-right:14px;">
                <div style="width:52px;height:52px;background:linear-gradient(135deg,#1f6fb2,#0d3a6e);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;color:#fff;text-align:center;line-height:52px;">
                  ${name.charAt(0).toUpperCase()}
                </div>
              </td>
              <td style="vertical-align:middle;">
                <p style="margin:0 0 3px;font-size:20px;font-weight:700;color:#1f3a5f;line-height:1.2;">${name}</p>
                ${company ? `<p style="margin:0 0 6px;font-size:13px;color:#6b7280;font-weight:500;">🏢 ${company}</p>` : ""}
                <table cellpadding="0" cellspacing="0"><tr>
                  <td style="padding-right:8px;">
                    <img src="${FLAG_API}/${(country || "NG").toLowerCase()}.png" width="20" height="14" alt="${countryName}" style="display:inline-block;vertical-align:middle;margin-right:4px;">
                    <span style="font-size:11px;color:#6b7280;vertical-align:middle;">${countryName}</span>
                  </td>
                </tr></table>
              </td>
            </tr></table>
          </td></tr>

          <!-- Info rows -->
          <tr><td style="padding:0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${infoRow("✉️", "Email", email, `mailto:${email}`)}
              ${phone ? infoRow("📞", "Phone", phone, `tel:${phone.replace(/\s/g,"")}`) : ""}
            </table>
          </td></tr>
        </table>
      </td></tr>

      <!-- ══ PROJECT DETAILS ══ -->
      <tr><td style="padding:16px 40px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0ecf8;">
          <tr><td style="background:#1f3a5f;padding:12px 16px;">
            <p style="margin:0;font-size:10px;font-weight:700;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:2px;">Project Details</p>
          </td></tr>
          <tr><td style="padding:20px 16px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:50%;vertical-align:top;padding-right:12px;">
                  <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Service Required</p>
                  ${service
                    ? pill(service, serviceStyle)
                    : `<span style="font-size:13px;color:#9ca3af;font-style:italic;">Not specified</span>`}
                </td>
                <td style="width:50%;vertical-align:top;">
                  <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Budget Range</p>
                  ${budget
                    ? `<span style="font-size:13.5px;font-weight:700;color:${budgetColor};">${budget}</span>`
                    : `<span style="font-size:13px;color:#9ca3af;font-style:italic;">Not specified</span>`}
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </td></tr>

      <!-- ══ ATTACHMENT NOTICE (if any) ══ -->
      ${attachmentNotice}

      <!-- ══ MESSAGE ══ -->
      <tr><td style="padding:16px 40px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0ecf8;">
          <tr><td style="background:#1f3a5f;padding:12px 16px;">
            <p style="margin:0;font-size:10px;font-weight:700;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:2px;">Project Brief / Message</p>
          </td></tr>
          <tr><td style="padding:20px 16px;">
            <div style="font-size:14px;color:#374151;line-height:1.85;white-space:pre-wrap;border-left:3px solid #1f6fb2;padding-left:16px;">${message.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</div>
          </td></tr>
        </table>
      </td></tr>

      <!-- ══ QUICK REPLY ACTIONS ══ -->
      <tr><td style="padding:24px 40px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e8eef6;">
          <tr><td style="padding:16px 20px;">
            <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:1.5px;">Quick Actions</p>
            <table cellpadding="0" cellspacing="0"><tr>
              <td style="padding-right:8px;">
                <a href="mailto:${email}?subject=Re:%20Your%20LogicSoft%20Enquiry&body=Hi%20${encodeURIComponent(name)}%2C%0A%0AThank%20you%20for%20reaching%20out.%20"
                  style="display:inline-block;background:linear-gradient(135deg,#1f6fb2,#0d3a6e);color:#ffffff;font-size:12px;font-weight:700;text-decoration:none;padding:10px 20px;border-radius:0;letter-spacing:0.5px;">
                  ✉️ Reply to ${name}
                </a>
              </td>
              ${phone ? `<td><a href="tel:${phone.replace(/\s/g,"")}" style="display:inline-block;background:#ffffff;border:1px solid #1f6fb2;color:#1f6fb2;font-size:12px;font-weight:700;text-decoration:none;padding:10px 20px;border-radius:0;letter-spacing:0.5px;">📞 Call now</a></td>` : ""}
            </tr></table>
          </td></tr>
        </table>
      </td></tr>

      <!-- ══ METADATA ══ -->
      <tr><td style="padding:20px 40px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7ff;border:1px solid #bfdbfe;padding:12px 16px;">
          <tr>
            <td style="font-size:11px;color:#1d4ed8;">
              <strong>Submission metadata</strong><br>
              <span style="color:#3b82f6;">Country code: ${country || "N/A"} &nbsp;·&nbsp; Has voice note: ${hasVoice ? "Yes ✅" : "No"} &nbsp;·&nbsp; Attachments: ${fileCount}</span>
            </td>
          </tr>
        </table>
      </td></tr>

      <!-- ══ FOOTER ══ -->
      <tr><td style="padding:32px 40px;margin-top:24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e8eef6;padding-top:24px;">
          <tr>
            <td>
              <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#1f3a5f;">LogicSoft Technologies</p>
              <p style="margin:0;font-size:11px;color:#9ca3af;line-height:1.6;">
                14 Adeola Odeku Street, Victoria Island, Lagos · Nigeria<br>
                1 Canada Square, Canary Wharf · London, UK<br>
                Dubai Internet City, Building 1 · Dubai, UAE
              </p>
            </td>
            <td align="right" style="vertical-align:top;">
              <p style="margin:0;font-size:10px;color:#d1d5db;text-transform:uppercase;letter-spacing:1px;">Internal notification</p>
              <p style="margin:4px 0 0;font-size:10px;color:#d1d5db;">Do not reply to this email</p>
            </td>
          </tr>
        </table>
      </td></tr>

      <!-- ══ BOTTOM ACCENT ══ -->
      <tr><td style="height:3px;background:linear-gradient(90deg,#1f6fb2,#0d3a6e);font-size:0;">&nbsp;</td></tr>

    </table>
  </td></tr>
  </table>

</body>
</html>`;
}