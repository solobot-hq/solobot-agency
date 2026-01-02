// /lib/db.ts
import { PrismaClient } from "../src/generated/prisma/client"; // Import specifically from /client
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Standard Next.js / Node.js WebSocket setup for Neon serverless
if (typeof window === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

/**
 * Prisma 7 Factory Function
 * In Prisma 7, the adapter is a mandatory property in the constructor.
 */
const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL!;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  
  return new PrismaClient({ 
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

/**
 * Global Singleton Pattern for Next.js
 * Prevents multiple instances of Prisma Client in development.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined;
};

const db = globalForPrisma.prisma ?? prismaClientSingleton();

export default db;

// Attach to global scope only in development to prevent connection leaks
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}