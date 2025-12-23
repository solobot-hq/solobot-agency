// prisma.config.ts
import 'dotenv/config'; // 👈 CRITICAL: Must be the very first line to load .env
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // Prisma 7 uses the 'env' helper which specifically looks for loaded variables
    url: env("DIRECT_URL") ?? env("DATABASE_URL"),
  },
  migrations: {
    path: 'prisma/migrations',
  }
});