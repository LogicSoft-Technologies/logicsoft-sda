const BACKEND_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
).replace(/\/$/, "");

async function adminRequest(path, options = {}) {
  const response = await fetch(`${BACKEND_URL}/api/admin${path}`, {
    credentials: "include",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      payload.error || payload.message || "Request failed."
    );
    error.status = response.status;
    error.fields = payload.fields;
    throw error;
  }

  return payload;
}

export const adminApi = {
  login: (email, password) =>
    adminRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    adminRequest("/auth/logout", {
      method: "POST",
    }),

  session: () => adminRequest("/auth/session"),

  posts: (query = "") => adminRequest(`/posts${query}`),

  post: (id) => adminRequest(`/posts/${id}`),

  createPost: (data) =>
    adminRequest("/posts", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updatePost: (id, data) =>
    adminRequest(`/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  archivePost: (id) =>
    adminRequest(`/posts/${id}`, {
      method: "DELETE",
    }),

    deletePost: (id) =>
    adminRequest(`/posts/${id}/permanent`, {
      method: "DELETE",
    }),

  authors: () => adminRequest("/taxonomy/authors"),

  createAuthor: (data) =>
    adminRequest("/taxonomy/authors", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateAuthor: (id, data) =>
    adminRequest(`/taxonomy/authors/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  categories: () => adminRequest("/taxonomy/categories"),

  createCategory: (data) =>
    adminRequest("/taxonomy/categories", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateCategory: (id, data) =>
    adminRequest(`/taxonomy/categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  tags: () => adminRequest("/taxonomy/tags"),

  createTag: (data) =>
    adminRequest("/taxonomy/tags", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  deleteTag: (id) =>
    adminRequest(`/taxonomy/tags/${id}`, {
      method: "DELETE",
    }),

  subscribers: (query = "") => adminRequest(`/subscribers${query}`),

  updateSubscriberStatus: (id, status) =>
    adminRequest(`/subscribers/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  newsletterEditions: () => adminRequest("/newsletters"),

  createNewsletterEdition: (data) =>
    adminRequest("/newsletters", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateNewsletterEdition: (id, data) =>
    adminRequest(`/newsletters/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  archiveNewsletterEdition: (id) =>
    adminRequest(`/newsletters/${id}`, {
      method: "DELETE",
    }),
};