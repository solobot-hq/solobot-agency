// /prisma.config.ts

// ✅ REQUIRED: Prisma v7 CLI does not auto-load .env files
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

/**
 * ✅ Prisma 7 Configuration — Neon & Production Optimized
 * 💡 IMPORTANT: This file is used ONLY by the Prisma CLI (Migrate, Studio, Pull).
 * To prevent build failures on Vercel, we use a non-blocking fallback for the URL.
 */
export default defineConfig({
  // Path to your main schema file
  schema: "prisma/schema.prisma",

  datasource: {
    /**
     * ✅ CLI Connection Strategy:
     * Prisma CLI commands (npx prisma migrate dev) require a direct connection.
     * We prioritize DIRECT_URL. We use process.env as a fallback to ensure 
     * the build worker doesn't crash if the strict env() utility fails to resolve 
     * during the Vercel build/postinstall phase.
     */
    url: env("DIRECT_URL") ?? 
         env("DATABASE_URL") ?? 
         process.env.DIRECT_URL ?? 
         process.env.DATABASE_URL ?? 
         "postgresql://unused:unused@localhost:5432/unused",
  },

  migrations: {
    // Standard migration output path
    path: "prisma/migrations",

    /**
     * ✅ Integrated Seeding (Prisma 7 Style):
     * Seeding is triggered via 'npx prisma db seed'.
     */
    seed: "tsx prisma/seed.ts",
  },
});