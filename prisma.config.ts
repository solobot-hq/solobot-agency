// /prisma.config.ts

// ✅ REQUIRED: Prisma v7 CLI does not auto-load .env files
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

/**
 * ✅ Prisma 7 Configuration — Neon & Production Optimized
 * * 💡 IMPORTANT: This file is used ONLY by the Prisma CLI (Migrate, Studio, Pull).
 * The CLI commands fail when using pooled connections (e.g., Neon -pooler).
 * Therefore, we map DIRECT_URL to the 'url' property below.
 */
export default defineConfig({
  // Path to your main schema file
  schema: "prisma/schema.prisma",

  datasource: {
    /**
     * ✅ CLI Connection Strategy:
     * Prisma CLI commands (npx prisma migrate dev) require a direct connection.
     * We prioritize DIRECT_URL here. If you aren't using a pooler, DATABASE_URL 
     * likely already contains your direct connection string.
     */
    url: env("DIRECT_URL") ?? env("DATABASE_URL") ?? (() => {
      throw new Error("❌ DIRECT_URL or DATABASE_URL is not set. CLI commands will fail.");
    })(),
  },

  migrations: {
    // Standard migration output path
    path: "prisma/migrations",

    /**
     * ✅ Integrated Seeding (Prisma 7 Style):
     * Seeding is triggered via 'npx prisma db seed'.
     * In v7, seeding is no longer automatic during 'migrate dev' or 'reset'.
     */
    seed: "tsx prisma/seed.ts",
  },
});