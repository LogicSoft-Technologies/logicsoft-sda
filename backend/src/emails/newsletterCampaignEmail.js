function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function buildNewsletterCampaignEmail({
  title,
  htmlContent,
  unsubscribeUrl,
}) {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f5f8fc;font-family:Arial,Helvetica,sans-serif;color:#1a2d4a;">
    <div style="display:none;max-height:0;overflow:hidden;color:#f5f8fc;">
      ${escapeHtml(title)}
    </div>

    <main style="max-width:600px;margin:32px auto;background:#ffffff;border:1px solid #e8eef6;">
      <header style="padding:28px 32px;background:#0d2448;">
        <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#8ac8f2;">
          LogicSoft Insights
        </p>
      </header>

      <section style="padding:36px 32px;">
        ${htmlContent}
      </section>

      <footer style="border-top:1px solid #e8eef6;padding:24px 32px;font-size:12px;line-height:1.6;color:#64748b;">
        <p style="margin:0;">
          LogicSoft Technologies · Lagos, Nigeria
        </p>

        <p style="margin:12px 0 0;">
          You received this because you subscribed to LogicSoft Insights.
          <a href="${unsubscribeUrl}" style="color:#1f6fb2;">Unsubscribe</a>.
        </p>
      </footer>
    </main>
  </body>
</html>`;
}