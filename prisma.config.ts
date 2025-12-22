import 'dotenv/config'; // 1. Crucial for loading .env variables
import { defineConfig, env } from 'prisma/config'; // 2. Correct import path

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // 3. The env() helper ensures the variable is present
    url: env('DATABASE_URL'), 
  },
});