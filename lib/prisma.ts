import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";
// IMPORTANT: Point to your custom generated client path
import { PrismaClient } from "../src/generated/prisma/client";

if (typeof window === "undefined") {
  // Sets up WebSocket connections for Neon serverless communication
  neonConfig.webSocketConstructor = ws;
}

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("CRITICAL: DATABASE_URL is missing from environment variables");
  }

  // Neon handles connection pooling via the serverless driver
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);

  // In v7, driver adapters are the mandatory architecture for Neon
  return new PrismaClient({ adapter, log: ["error"] });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;