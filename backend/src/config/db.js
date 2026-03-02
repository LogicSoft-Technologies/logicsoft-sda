// src/config/db.js 
import prisma from "./prisma.js";

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ PostgreSQL (Supabase) connected via Prisma");
  } catch (err) {
    console.error("DB connection error:", err.message);
    console.warn("⚠️  Server starting without database — DB features disabled");
  }
};

export default connectDB;