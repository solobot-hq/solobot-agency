// prisma.config.ts

// ✅ REQUIRED: Prisma v7 CLI does not auto-load .env files
import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * ✅ Prisma 7 Configuration — Vercel Safe
 * This file is evaluated at BUILD TIME.
 * DO NOT use env() here — it can crash Vercel builds.
 */

const DATABASE_URL =
  process.env.DIRECT_URL ||
  process.env.DATABASE_URL ||
  "postgresql://unused:unused@localhost:5432/unused";

export default defineConfig({
  schema: "prisma/schema.prisma",

  datasource: {
    /**
     * ✅ Build-safe connection strategy
     * - Uses DIRECT_URL in production
     * - Falls back safely during Vercel build
     * - Never throws at build time
     */
    url: DATABASE_URL,
  },

  migrations: {
    path: "prisma/migrations",
  },
});
