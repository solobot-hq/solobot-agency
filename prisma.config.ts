// /prisma.config.ts
import "dotenv/config"; // ✅ Required: Prisma 7 CLI does not auto-load .env files
import { defineConfig } from "prisma/config";

/**
 * ✅ Prisma 7 Production Shield
 * This file is used ONLY by the Prisma CLI (Generate, Migrate, Studio).
 */
export default defineConfig({
  schema: "prisma/schema.prisma",

  datasource: {
    /**
     * ✅ Build-Safe Connection Logic:
     * We prioritize DIRECT_URL for migrations. The fallback string allows 
     * 'prisma generate' to finish during Vercel builds without crashing.
     */
    url: process.env.DIRECT_URL || 
         process.env.DATABASE_URL || 
         "postgresql://unused:unused@localhost:5432/unused",
  },

  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
});