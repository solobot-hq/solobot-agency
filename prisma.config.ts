// /prisma.config.ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * ✅ Prisma 7 Production Shield
 * Stops using strict env() to prevent build-time crashes on Vercel.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",

  datasource: {
    /**
     * ✅ Build-Safe Connection String:
     * Prisma CLI only needs a valid string format during generation.
     * Runtime will use the actual Vercel environment variables.
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