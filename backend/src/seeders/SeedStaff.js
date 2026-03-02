// src/seeders/seedStaff.js
import dotenv from "dotenv";
dotenv.config();

import prisma from "../config/prisma.js";

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
    workingHoursStart: 8,
    workingHoursEnd: 18,
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
    workingHoursStart: 9,
    workingHoursEnd: 17,
    showInWidget: true,
    order: 2,
  },
];

async function seed() {
  try {
    console.log("🌱 Seeding staff...");

    // Clear existing staff
    await prisma.staff.deleteMany({});
    console.log("✓ Cleared existing staff");

    // Insert new staff
    for (const member of STAFF) {
      await prisma.staff.create({ data: member });
    }

    console.log(`✓ Seeded ${STAFF.length} staff members:`);
    STAFF.forEach((s) => console.log(`  · ${s.name} — ${s.role}`));

    await prisma.$disconnect();
    console.log("\n✓ Done.");
    process.exit(0);
  } catch (err) {
    console.error("✗ Seed failed:", err.message);
    await prisma.$disconnect();
    process.exit(1);
  }
}

seed();