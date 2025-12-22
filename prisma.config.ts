// prisma.config.ts
import 'dotenv/config';
import { defineConfig } from '@prisma/config';

// 1️⃣ Get the URL from standard Node process.env
// 2️⃣ Provide a fallback string so 'prisma generate' doesn't crash the build.
// This fallback is ONLY used for generating types, NOT for connecting at runtime.
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://unused:unused@localhost:5432/unused";

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: DATABASE_URL,
  },
});