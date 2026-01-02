// /lib/db.ts
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

/**
 * ✅ WebSocket configuration for Neon (Node.js only)
 */
if (typeof window === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

/**
 * ✅ Enforce DATABASE_URL at runtime
 * NO silent fallback — fail fast, fail loud
 */
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error(
    "❌ FATAL: DATABASE_URL is not defined at runtime. Check .env / .env.local loading."
  );
}

/**
 * ✅ Prisma singleton factory
 */
const prismaClientSingleton = () => {
  const pool = new Pool({ connectionString: DATABASE_URL });
  const adapter = new PrismaNeon(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development"
      ? ["error", "warn"]
      : ["error"],
  });
};

/**
 * ✅ Global singleton (prevents HMR connection leaks)
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const db = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export default db;
