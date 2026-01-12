// prisma.config.ts
export default {
  schema: "prisma/schema.prisma",
  datasource: {
    // Use process.env directly to avoid dependency resolution issues
    url: process.env.DATABASE_URL,
  },
};