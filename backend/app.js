import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import chatRoute from "./src/routes/chat.js";
import contactRoute from "./src/routes/contact.js";
import newsletterRoute from "./src/routes/newsletter.js";
import blogRoute from "./src/routes/blog.js";
import careersRoute from "./src/routes/careers.js";
import adminAuthRoute from "./src/routes/admin-auth.js";
import adminPostsRoute from "./src/routes/admin-posts.js";
import adminTaxonomyRoute from "./src/routes/admin-taxonomy.js";
import adminSubscribersRoute from "./src/routes/admin-subscribers.js";
import adminNewslettersRoute from "./src/routes/admin-newsletters.js";

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000",
  "http://localhost:3001",
  "https://admin.logicsofttechnologies.com",
  "https://logicsofttechnologies.com",
  "https://www.logicsofttechnologies.com",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error(`CORS: origin not allowed — ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) =>
  res.json({ status: "ok", service: "LogicSoft Technologies API" })
);

app.use("/api/chat", chatRoute);
app.use("/api/contact", contactRoute);
app.use("/api/newsletter", newsletterRoute);
app.use("/api/blog", blogRoute);
app.use("/api/admin/auth", adminAuthRoute);
app.use("/api/admin/posts", adminPostsRoute);
app.use("/api/admin/taxonomy", adminTaxonomyRoute);
app.use("/api/admin/subscribers", adminSubscribersRoute);
app.use("/api/admin/newsletters", adminNewslettersRoute);
app.use("/api/careers", careersRoute);

app.use((err, req, res, next) => {
  console.error("[Error]", err.message);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

export default app;