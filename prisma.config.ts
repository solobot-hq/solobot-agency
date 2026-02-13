// 📄 Location: [Root]/prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

/**
 * 🛠️ PRISMA 7 CONFIGURATION
 * This file handles the CLI's connection to Neon.
 * It ensures migrations use the Direct URL to avoid pooling issues.
 */
export default defineConfig({
  // Path to your schema relative to project root
  schema: "prisma/schema.prisma",

  datasource: {
    /**
     * ⚠️ CLI CONNECTION STRATEGY
     * Neon requires the DIRECT_URL for migrations to bypass the PgBouncer/Pooling layer.
     * We priority-check DIRECT_URL before falling back to DATABASE_URL.
     */
    url: 
      env("DIRECT_URL") ?? 
      process.env.DIRECT_URL ?? 
      env("DATABASE_URL") ?? 
      process.env.DATABASE_URL ?? 
      "", 
  },

  migrations: {
    // Migration storage for Version 7
    path: "prisma/migrations",
  },

  /**
   * 🏗️ GENERATION SETTINGS
   * Ensures the client is always output to your custom folder
   */
  client: {
    output: "./src/generated/prisma",
  }
});