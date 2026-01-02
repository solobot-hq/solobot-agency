import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * ✅ Prisma 7 Production Shield
 * We stop using the strict 'env()' utility for the 'url' property.
 * This prevents the PrismaConfigEnvError during Vercel's build phase.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",

  datasource: {
    /**
     * ✅ Build-Safe Connection String:
     * We use a standard OR logical check. If DIRECT_URL is missing 
     * during build, we provide a dummy string so generation finishes.
     * The actual connection happens at runtime via Vercel env vars.
     */
    url: process.env.DIRECT_URL || 
         process.env.DATABASE_URL || 
         "postgresql://postgres:postgres@localhost:5432/postgres",
  },

  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
});