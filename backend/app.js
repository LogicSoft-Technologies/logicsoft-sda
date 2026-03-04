// app.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import chatRoute    from "./src/routes/chat.js";
import contactRoute from "./src/routes/contact.js";
import newsletterRoute from "./src/routes/newsletter.js";

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "https://logicsoft.ng",
  "https://www.logicsoft.ng",
  "https://www.logicsoft.com",
  "https://logicsofttechnologies.com",
  "https://www.logicsofttechnologies.com",
];

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

// ROUTES 
app.get("/", (_req, res) =>
  res.json({ status: "ok", service: "LogicSoft Technologies API" })
);

app.use("/api/chat",    chatRoute);
app.use("/api/contact", contactRoute);
app.use("/api/newsletter", newsletterRoute);

// ERROR HANDLER 
app.use((err, req, res, next) => {
  console.error("[Error]", err.message);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

export default app;