import "dotenv/config"; 
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    /** * ✅ Build-Safe Logic:
     * Vercel build workers need a valid string format even if the DB is unreachable 
     * during 'generate'. This prevents PrismaConfigEnvError.
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