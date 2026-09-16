const BACKEND_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
).replace(/\/$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${BACKEND_URL}${path}`, {
    next: {
      revalidate: options.revalidate ?? 300,
    },
  });

  if (!response.ok) {
    const error = new Error(`Blog API request failed: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export function getBlogApiUrl(path = "") {
  return `${BACKEND_URL}/api/blog${path}`;
}

export async function getPosts({
  page = 1,
  pageSize = 9,
  category = "",
  query = "",
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (category) params.set("category", category);
  if (query) params.set("q", query);

  return request(`/api/blog/posts?${params.toString()}`);
}

export async function getFeaturedPost() {
  return request("/api/blog/posts/featured");
}

export async function getPostBySlug(slug) {
  return request(`/api/blog/posts/${encodeURIComponent(slug)}`);
}

export async function getRelatedPosts(slug) {
  return request(
    `/api/blog/posts/${encodeURIComponent(slug)}/related`
  );
}

export async function getCategories() {
  return request("/api/blog/categories", {
    revalidate: 3600,
  });
}

export async function getBlogSitemapEntries() {
  return request("/api/blog/sitemap", {
    revalidate: 3600,
  });
}