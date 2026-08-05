import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const LOGO_CID = "logicsoft-logo";
export const LOGO_PATH = path.join(__dirname, "../assets/email/logo.png");

export const BRAND = {
  navy: "#0d1b2e",
  navyLight: "#1a2d4a",
  blue: "#1f6fb2",
  orange: "#C45500",
  orangeLight: "#FF7A00",
  bg: "#f4f5f7",
  border: "#e2e5e9",
  companyEmail: "contact@logicsofttechnologies.online",
};

export function logoAttachment() {
  return {
    filename: "logo.png",
    path: LOGO_PATH,
    cid: LOGO_CID,
  };
}

export function renderHeader({ eyebrow, title, badge, badgeBg = "#e7f6ec", badgeColor = "#0f5132" } = {}) {
  return `
    <div style="background:#ffffff; padding:22px 32px; border-bottom:3px solid ${BRAND.orange};">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:middle;">
            <img src="cid:${LOGO_CID}" alt="LogicSoft Technologies" height="34" style="display:block; height:34px; width:auto;">
          </td>
          ${badge ? `
          <td align="right" style="vertical-align:middle;">
            <span style="display:inline-block; background:${badgeBg}; color:${badgeColor}; font-size:11px; font-weight:600; padding:4px 10px; border-radius:4px;">${badge}</span>
          </td>` : ""}
        </tr>
      </table>
    </div>
    <div style="background:${BRAND.navyLight}; padding:20px 32px;">
      ${eyebrow ? `<div style="font-size:11px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,255,255,0.55); margin-bottom:6px;">${eyebrow}</div>` : ""}
      <div style="font-size:19px; font-weight:600; color:#ffffff;">${title}</div>
    </div>`;
}

export function renderFooter({ note, addressLine = "Lekki, Lagos, Nigeria" } = {}) {
  return `
    <div style="padding:20px 32px; border-top:1px solid ${BRAND.border}; background:#fafbfc;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:top; font-size:11.5px; color:#9aa3b1; line-height:1.7;">
            LogicSoft Technologies · ${addressLine}<br>
            ${BRAND.companyEmail}
          </td>
          ${note ? `<td align="right" style="vertical-align:top; font-size:11px; color:#9aa3b1;">${note}</td>` : ""}
        </tr>
      </table>
    </div>`;
}