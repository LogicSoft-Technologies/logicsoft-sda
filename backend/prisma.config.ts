import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    // Used by Prisma CLI: validate, db push, migrate, generate.
    url: env("DIRECT_URL"),
  },
});