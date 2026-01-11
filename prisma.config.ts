import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    // We use process.env directly to avoid the 'dotenv' dependency crash
    url: process.env.DATABASE_URL 
  }
});