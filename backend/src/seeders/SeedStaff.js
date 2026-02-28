// src/seeders/seedStaff.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Staff from "../models/Staff.js";

const STAFF = [
  {
    name: "Elijah O Alexander",
    role: "Sales & Account Manager",
    whatsappNumber: "2349012688861",  
    whatsappGreeting:
      "Hi Elijah! I was just chatting with the Logicsoft AI assistant and I'd like to discuss a project.",
    avatarInitials: "EA",
    avatarColor: "#1f6fb2",
    isOnline: true,
    workingHours: { start: 8, end: 18 },
    showInWidget: true,
    order: 1,
  },
  {
    name: "Treasure Alexander",
    role: "Technical Lead",
    whatsappNumber: "2348136616434",
    whatsappGreeting:
      "Hi Treasure! I was just chatting with the Logicsoft AI assistant and I have some technical questions.",
    avatarInitials: "TA",
    avatarColor: "#7c3aed",
    isOnline: true,
    workingHours: { start: 9, end: 17 },
    showInWidget: true,
    order: 2,
  },
];

async function seed() {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    await mongoose.connect(uri);
    console.log("✓ Connected to MongoDB");

    await Staff.deleteMany({});
    console.log("✓ Cleared existing staff");

    const inserted = await Staff.insertMany(STAFF);
    console.log(`✓ Seeded ${inserted.length} staff members:`);
    inserted.forEach((s) => console.log(`  · ${s.name} — ${s.role}`));

    await mongoose.disconnect();
    console.log("\n✓ Done. Update whatsappNumber values in MongoDB Atlas if needed.");
    process.exit(0);
  } catch (err) {
    console.error("✗ Seed failed:", err.message);
    process.exit(1);
  }
}

seed();