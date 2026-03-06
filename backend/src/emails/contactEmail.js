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
      <tr><td style="padding:0 40px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff8f5;border:1px solid rgba(196,85,0,0.25);border-left:3px solid #C45500;padding:12px 16px;margin-top:0;">
          <tr><td style="font-size:12.5px;color:#7A2E00;font-weight:600;">${parts.join("&emsp;·&emsp;")}</td></tr>
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
<body style="margin:0;padding:0;background:#edf2f7;font-family:'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#edf2f7;padding:40px 16px;">
  <tr><td align="center">

    <!-- ── Outer card ── -->
    <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;box-shadow:0 2px 24px rgba(31,58,95,0.10);">

      <!-- ══ TOP GRADIENT ACCENT LINE ══ -->
      <tr><td style="height:3px;background:linear-gradient(90deg,#1f3a5f 0%,#1f6fb2 45%,#FF7A00 72%,#C45500 100%);font-size:0;">&nbsp;</td></tr>

      <!-- ══ HEADER ══ -->
      <tr><td style="background:linear-gradient(135deg,#0a1628 0%,#1f3a5f 55%,#0e2040 100%);padding:36px 40px 30px;position:relative;overflow:hidden;">

        <!-- Orange triangle decoration (top-right) -->
        <div style="position:absolute;top:0;right:0;width:0;height:0;border-style:solid;border-width:0 72px 72px 0;border-color:transparent #C45500 transparent transparent;opacity:0.85;"></div>
        <div style="position:absolute;top:0;right:0;width:0;height:0;border-style:solid;border-width:0 40px 40px 0;border-color:transparent rgba(255,122,0,0.4) transparent transparent;"></div>

        <table width="100%" cellpadding="0" cellspacing="0"><tr>

          <!-- Left: logo mark + wordmark -->
          <td style="vertical-align:middle;">
            <table cellpadding="0" cellspacing="0"><tr>

              <!-- Monogram block (matches navbar logo) -->
              <td style="vertical-align:middle;padding-right:14px;">
                <table cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1f3a5f,#1f6fb2);width:42px;height:42px;position:relative;">
                  <tr><td style="text-align:center;vertical-align:middle;padding:0;">
                    <!-- E letterform via border trick -->
                    <span style="display:inline-block;font-family:Georgia,serif;font-size:22px;font-weight:700;color:#ffffff;line-height:42px;">E</span>
                  </td></tr>
                </table>
              </td>

              <!-- Wordmark -->
              <td style="vertical-align:middle;">
                <p style="margin:0 0 1px;font-size:15px;font-weight:700;color:#ffffff;letter-spacing:0.3px;font-family:'Segoe UI',Helvetica,sans-serif;">LogicSoft</p>
                <p style="margin:0;font-size:9px;font-weight:700;color:rgba(144,196,232,0.7);text-transform:uppercase;letter-spacing:2.5px;">Technologies</p>
              </td>

            </tr></table>

            <!-- Divider -->
            <div style="height:1px;background:rgba(255,255,255,0.08);margin:18px 0 14px;"></div>

            <!-- Heading -->
            <p style="margin:0 0 5px;font-size:22px;font-weight:300;color:#ffffff;letter-spacing:-0.2px;">
              New <strong style="font-weight:700;color:#90c4e8;">Project Enquiry</strong>
            </p>
            <p style="margin:0;font-size:11.5px;color:rgba(255,255,255,0.35);">${timestamp}</p>
          </td>

          <!-- Right: status badge -->
          <td align="right" style="vertical-align:top;padding-top:4px;">
            <table cellpadding="0" cellspacing="0" style="border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.05);text-align:center;">
              <tr><td style="padding:12px 16px;">
                <p style="margin:0;font-size:22px;line-height:1;">📬</p>
                <p style="margin:6px 0 0;font-size:8.5px;font-weight:700;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:1.5px;line-height:1.4;">Contact<br>Form</p>
              </td></tr>
            </table>
          </td>

        </tr></table>
      </td></tr>

      <!-- ══ ALERT BANNER ══ -->
      <tr><td style="background:linear-gradient(90deg,#7A2E00,#C45500 50%,#FF7A00);padding:10px 40px;">
        <p style="margin:0;font-size:11.5px;font-weight:700;color:#ffffff;text-transform:uppercase;letter-spacing:1.5px;">
          ⚡ &nbsp;Action required — respond within 24 business hours
        </p>
      </td></tr>

      <!-- ══ CONTACT IDENTITY ══ -->
      <tr><td style="padding:28px 40px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #dce8f5;background:#f8fbff;">

          <!-- Section label -->
          <tr><td style="background:#1f3a5f;padding:10px 16px;">
            <table cellpadding="0" cellspacing="0"><tr>
              <td style="width:3px;background:#FF7A00;border-radius:1px;margin-right:8px;">&nbsp;</td>
              <td style="padding-left:8px;">
                <p style="margin:0;font-size:9.5px;font-weight:700;color:rgba(255,255,255,0.55);text-transform:uppercase;letter-spacing:2px;">Contact Details</p>
              </td>
            </tr></table>
          </td></tr>

          <!-- Avatar + name -->
          <tr><td style="padding:20px 16px 16px;">
            <table cellpadding="0" cellspacing="0"><tr>

              <!-- Initial avatar -->
              <td style="vertical-align:top;padding-right:14px;">
                <div style="width:50px;height:50px;background:linear-gradient(135deg,#1f3a5f,#1f6fb2);display:inline-flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;color:#fff;text-align:center;line-height:50px;font-family:Georgia,serif;">
                  ${name.charAt(0).toUpperCase()}
                </div>
              </td>

              <td style="vertical-align:middle;">
                <p style="margin:0 0 3px;font-size:19px;font-weight:700;color:#1f3a5f;line-height:1.2;">${name}</p>
                ${company ? `<p style="margin:0 0 6px;font-size:12.5px;color:#6b7280;font-weight:500;">🏢 ${company}</p>` : ""}
                <table cellpadding="0" cellspacing="0"><tr>
                  <td>
                    <img src="${FLAG_API}/${(country || "NG").toLowerCase()}.png" width="20" height="14" alt="${countryName}" style="display:inline-block;vertical-align:middle;margin-right:5px;border:1px solid #e5e7eb;">
                    <span style="font-size:11px;color:#6b7280;vertical-align:middle;font-weight:500;">${countryName}</span>
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
      <tr><td style="padding:14px 40px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #dce8f5;">

          <tr><td style="background:#1f3a5f;padding:10px 16px;">
            <table cellpadding="0" cellspacing="0"><tr>
              <td style="width:3px;background:#FF7A00;border-radius:1px;">&nbsp;</td>
              <td style="padding-left:8px;">
                <p style="margin:0;font-size:9.5px;font-weight:700;color:rgba(255,255,255,0.55);text-transform:uppercase;letter-spacing:2px;">Project Details</p>
              </td>
            </tr></table>
          </td></tr>

          <tr><td style="padding:20px 16px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:50%;vertical-align:top;padding-right:16px;">
                  <p style="margin:0 0 7px;font-size:9.5px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1.2px;">Service Required</p>
                  ${service
                    ? pill(service, serviceStyle)
                    : `<span style="font-size:13px;color:#9ca3af;font-style:italic;">Not specified</span>`}
                </td>
                <td style="width:50%;vertical-align:top;border-left:1px solid #f1f5f9;padding-left:16px;">
                  <p style="margin:0 0 7px;font-size:9.5px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1.2px;">Budget Range</p>
                  ${budget
                    ? `<span style="font-size:14px;font-weight:700;color:${budgetColor};">${budget}</span>`
                    : `<span style="font-size:13px;color:#9ca3af;font-style:italic;">Not specified</span>`}
                </td>
              </tr>
            </table>
          </td></tr>

        </table>
      </td></tr>

      <!-- ══ ATTACHMENT NOTICE ══ -->
      ${attachmentNotice}

      <!-- ══ MESSAGE ══ -->
      <tr><td style="padding:14px 40px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #dce8f5;">

          <tr><td style="background:#1f3a5f;padding:10px 16px;">
            <table cellpadding="0" cellspacing="0"><tr>
              <td style="width:3px;background:#FF7A00;border-radius:1px;">&nbsp;</td>
              <td style="padding-left:8px;">
                <p style="margin:0;font-size:9.5px;font-weight:700;color:rgba(255,255,255,0.55);text-transform:uppercase;letter-spacing:2px;">Project Brief / Message</p>
              </td>
            </tr></table>
          </td></tr>

          <tr><td style="padding:20px 20px 20px 0;">
            <div style="font-size:13.5px;color:#374151;line-height:1.85;white-space:pre-wrap;border-left:3px solid #1f6fb2;padding:4px 0 4px 20px;margin-left:16px;background:linear-gradient(90deg,rgba(31,111,178,0.04),transparent);">${message.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</div>
          </td></tr>

        </table>
      </td></tr>

      <!-- ══ QUICK REPLY ACTIONS ══ -->
      <tr><td style="padding:14px 40px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fbff;border:1px solid #dce8f5;">
          <tr><td style="padding:16px 20px;">
            <p style="margin:0 0 12px;font-size:9.5px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1.5px;">Quick Actions</p>
            <table cellpadding="0" cellspacing="0"><tr>
              <td style="padding-right:8px;">
                <a href="mailto:${email}?subject=Re:%20Your%20LogicSoft%20Enquiry&body=Hi%20${encodeURIComponent(name)}%2C%0A%0AThank%20you%20for%20reaching%20out.%20"
                  style="display:inline-block;background:linear-gradient(135deg,#7A2E00,#C45500 50%,#FF7A00);color:#ffffff;font-size:12px;font-weight:700;text-decoration:none;padding:10px 22px;letter-spacing:0.5px;box-shadow:0 3px 12px rgba(196,85,0,0.25);">
                  ✉️ &nbsp;Reply to ${name}
                </a>
              </td>
              ${phone ? `
              <td>
                <a href="tel:${phone.replace(/\s/g,"")}"
                  style="display:inline-block;background:#ffffff;border:1px solid #1f6fb2;color:#1f6fb2;font-size:12px;font-weight:700;text-decoration:none;padding:10px 22px;letter-spacing:0.5px;">
                  📞 &nbsp;Call now
                </a>
              </td>` : ""}
            </tr></table>
          </td></tr>
        </table>
      </td></tr>

      <!-- ══ METADATA ══ -->
      <tr><td style="padding:14px 40px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border:1px solid #bfdbfe;border-left:3px solid #1f6fb2;padding:12px 16px;">
          <tr>
            <td style="font-size:11px;color:#1d4ed8;">
              <strong style="font-weight:700;">Submission metadata</strong><br>
              <span style="color:#3b82f6;font-size:10.5px;">Country: ${country || "N/A"} &nbsp;·&nbsp; Voice note: ${hasVoice ? "Yes ✅" : "No"} &nbsp;·&nbsp; Attachments: ${fileCount}</span>
            </td>
          </tr>
        </table>
      </td></tr>

      <!-- ══ FOOTER ══ -->
      <tr><td style="padding:28px 40px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td colspan="2" style="border-top:1px solid #e5e7eb;padding-top:22px;">
            <table width="100%" cellpadding="0" cellspacing="0"><tr>

              <td style="vertical-align:top;">
                <!-- Mini logo -->
                <table cellpadding="0" cellspacing="0" style="margin-bottom:10px;"><tr>
                  <td style="background:linear-gradient(135deg,#1f3a5f,#1f6fb2);width:26px;height:26px;text-align:center;vertical-align:middle;padding-right:8px;">
                    <span style="font-family:Georgia,serif;font-size:14px;font-weight:700;color:#fff;line-height:26px;">E</span>
                  </td>
                  <td style="padding-left:8px;vertical-align:middle;">
                    <span style="font-size:12px;font-weight:700;color:#1f3a5f;">LogicSoft</span>
                    <span style="font-size:9px;color:#9ca3af;letter-spacing:1.5px;text-transform:uppercase;display:block;">Technologies</span>
                  </td>
                </tr></table>
                <p style="margin:0;font-size:10.5px;color:#9ca3af;line-height:1.75;">
                  Lekki, Lagos, Nigeria<br>
                  logicsofttech.dev@gmail.com
                </p>
              </td>

              <td align="right" style="vertical-align:top;">
                <p style="margin:0 0 3px;font-size:9.5px;color:#d1d5db;text-transform:uppercase;letter-spacing:1px;">Internal notification</p>
                <p style="margin:0;font-size:9.5px;color:#d1d5db;">Do not reply to this email</p>
              </td>

            </tr></table>
          </td></tr>
        </table>
      </td></tr>

      <!-- ══ BOTTOM ACCENT LINE ══ -->
      <tr><td style="height:3px;background:linear-gradient(90deg,#1f3a5f 0%,#1f6fb2 45%,#FF7A00 72%,#C45500 100%);font-size:0;">&nbsp;</td></tr>

    </table>
  </td></tr>
  </table>

</body>
</html>`;
}