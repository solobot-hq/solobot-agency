// prisma.config.ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Fallback allows 'prisma generate' to run even if DATABASE_URL isn't 
    // injected yet during the early install phase on Vercel.
    url: process.env.DATABASE_URL || "postgresql://placeholder:5432", 
  },
});