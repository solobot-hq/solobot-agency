// /lib/db.ts
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { PrismaClient } from "../src/generated/prisma/client";

if (typeof window === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

const prismaClientSingleton = () => {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined;
};

// ✅ KEY FIX: Export as a named constant 'db'
export const db = globalForPrisma.prisma ?? prismaClientSingleton();

// ✅ Also provide a default export to prevent "Did you mean to import default?" errors
export default db;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}