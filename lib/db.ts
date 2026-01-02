// /lib/db.ts
import { PrismaClient } from "@/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

/**
 * WebSocket configuration for Neon (Node.js only)
 */
if (typeof window === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

/**
 * Enforce DATABASE_URL at runtime
 */
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error(
    "FATAL: DATABASE_URL is not defined. Check environment variables."
  );
}

/**
 * Prisma singleton factory
 */
const prismaClientSingleton = () => {
  const pool = new Pool({ connectionString: DATABASE_URL });
  const adapter = new PrismaNeon(pool);

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });
};

/**
 * Global singleton to prevent hot-reload leaks
 */
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const db = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export default db;
