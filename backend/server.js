// server.js
import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "./src/config/db.js";
import chatSocketHandler from "./src/sockets/chatSocket.js";

const PORT = process.env.PORT || 5000;

// Connect to PostgreSQL Prisma
connectDB();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

chatSocketHandler(io);

httpServer.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Socket.IO live chat active`);
});