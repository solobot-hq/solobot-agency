// /lib/db.ts
import { PrismaClient } from "../src/generated/prisma/client"; // ✅ Points to custom output
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Standard Next.js WebSocket setup for Neon serverless
if (typeof window === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

/**
 * Prisma 7 Factory Function
 * The 'adapter' property is now MANDATORY in the constructor.
 */
const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL!;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  
  return new PrismaClient({ 
    adapter,
    // Logging for development and production error tracking
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

/**
 * Global Singleton Pattern for Next.js 16
 * Prevents "too many connections" errors during development hot-reloads.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined;
};

const db = globalForPrisma.prisma ?? prismaClientSingleton();

export default db;

// Attach to global scope only in development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}