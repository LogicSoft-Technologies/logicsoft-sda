const BACKEND_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
).replace(/\/$/, "");

export const revalidate = 3600;

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/blog/rss`, {
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      return new Response("RSS feed is temporarily unavailable.", {
        status: 503,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }

    const xml = await response.text();

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new Response("RSS feed is temporarily unavailable.", {
      status: 503,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }
}