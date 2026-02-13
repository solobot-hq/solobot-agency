// src/lib/prisma.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";
import { PrismaClient } from "../generated/prisma";
import dotenv from "dotenv";

if (typeof window === "undefined") {
  dotenv.config({ path: ".env.local" });
  neonConfig.webSocketConstructor = ws;
}

const prismaClientSingleton = () => {
  const url = process.env.DATABASE_URL;

  // 🛑 BREAK THE LOOP: If env (0) happens, the app will now STOP instead of looping
  if (!url || url.includes("localhost")) {
    console.error("\n\n🛑 FATAL ERROR: .env.local is EMPTY or UNREADABLE (Encoding issue?).");
    console.error("The system injected (0) variables. Check Step 1 above.\n\n");
    process.exit(1); 
  }

  const pool = new Pool({ connectionString: url });
  const adapter = new PrismaNeon(pool);
  return new PrismaClient({ adapter });
};

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export const db = prisma;
export default prisma;