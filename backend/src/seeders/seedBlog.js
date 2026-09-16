import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";

async function main() {
  const email = process.env.INITIAL_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.INITIAL_ADMIN_PASSWORD;
  const name =
    process.env.INITIAL_ADMIN_NAME?.trim() || "LogicSoft Administrator";

  if (!email || !password) {
    throw new Error(
      "INITIAL_ADMIN_EMAIL and INITIAL_ADMIN_PASSWORD are required."
    );
  }

  if (password.length < 16) {
    throw new Error(
      "INITIAL_ADMIN_PASSWORD must be at least 16 characters long."
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: {
      name,
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
    create: {
      name,
      email,
      passwordHash,
      role: "ADMIN",
    },
  });

  const defaultAuthor = await prisma.author.upsert({
    where: { slug: "logicsoft-technologies" },
    update: {},
    create: {
      name: "LogicSoft Technologies",
      slug: "logicsoft-technologies",
      jobTitle: "Technology & Delivery Team",
      bio:
        "LogicSoft Technologies builds enterprise software, AI solutions, cloud platforms, and cybersecurity systems for businesses worldwide.",
    },
  });

  const categories = [
    ["Software Engineering", "software-engineering"],
    ["AI & Automation", "ai-automation"],
    ["Cloud & DevOps", "cloud-devops"],
    ["Cybersecurity", "cybersecurity"],
    ["Digital Strategy", "digital-strategy"],
    ["Company News", "company-news"],
  ];

  for (const [name, slug] of categories) {
    await prisma.category.upsert({
      where: { slug },
      update: {},
      create: { name, slug },
    });
  }

  console.log(`Admin ready: ${admin.email}`);
  console.log(`Default author ready: ${defaultAuthor.name}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });