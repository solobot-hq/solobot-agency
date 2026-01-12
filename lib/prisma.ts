// /lib/prisma.ts
import { PrismaNeon } from "@prisma/adapter-neon";
// ✅ Fix: neonConfig must come from @neondatabase/serverless
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
// ✅ Pointing to your custom generated client path
import { PrismaClient } from "../src/generated/prisma/client";

if (typeof window === "undefined") {
  /**
   * Required for Neon serverless to communicate over WebSockets
   * in Node.js environments.
   */
  neonConfig.webSocketConstructor = ws;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

/**
 * Singleton pattern for Prisma 7 + Neon.
 * We pass the connectionString directly into PrismaNeon.
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaNeon({ connectionString }),
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;