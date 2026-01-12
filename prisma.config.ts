// prisma.config.ts
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // DO NOT use import 'dotenv/config' here. 
    // Vercel handles DATABASE_URL automatically.
    url: env('DATABASE_URL'),
  },
});