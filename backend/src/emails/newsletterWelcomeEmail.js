function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function buildNewsletterWelcomeEmail({
  firstName,
  blogUrl,
  unsubscribeUrl,
}) {
  const greeting = firstName
    ? `Welcome, ${escapeHtml(firstName)}.`
    : "Welcome.";

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f5f8fc;font-family:Arial,Helvetica,sans-serif;color:#1a2d4a;">
    <main style="max-width:600px;margin:32px auto;background:#ffffff;border:1px solid #e8eef6;padding:40px;">
      <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#1f6fb2;">
        LogicSoft Insights
      </p>

      <h1 style="margin:0 0 20px;font-size:28px;line-height:1.25;color:#1a2d4a;">
        You are subscribed.
      </h1>

      <p style="font-size:15px;line-height:1.7;color:#475569;">
        ${greeting}
      </p>

      <p style="font-size:15px;line-height:1.7;color:#475569;">
        LogicSoft Insights brings focused, useful thinking on enterprise software,
        AI automation, cloud engineering, cybersecurity, and digital-product strategy.
      </p>

      <p style="margin:30px 0;">
        <a href="${blogUrl}" style="display:inline-block;background:#1f6fb2;color:#ffffff;text-decoration:none;padding:13px 20px;font-size:14px;font-weight:700;">
          Explore LogicSoft Insights
        </a>
      </p>

      <p style="font-size:12px;line-height:1.6;color:#64748b;">
        You can <a href="${unsubscribeUrl}" style="color:#1f6fb2;">unsubscribe at any time</a>.
      </p>

      <p style="margin:34px 0 0;font-size:12px;line-height:1.6;color:#64748b;">
        LogicSoft Technologies · Lagos, Nigeria
      </p>
    </main>
  </body>
</html>`;
}