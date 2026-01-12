import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    // Vercel already provides DATABASE_URL in the environment
    url: process.env.DATABASE_URL 
  }
});