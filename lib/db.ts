// /lib/db.ts
import { PrismaClient } from "../src/generated/prisma/client"; // ✅ Points to custom output
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

if (typeof window === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

const prismaClientSingleton = () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
  const adapter = new PrismaNeon(pool); // ✅ Mandatory bridge for Prisma 7
  
  return new PrismaClient({ 
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined;
};

// ✅ Change: Define as a named constant for explicit export
export const db = globalForPrisma.prisma ?? prismaClientSingleton();

// ✅ Keep: Default export for any existing generic imports
export default db;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}