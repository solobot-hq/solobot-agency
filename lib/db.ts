// /lib/db.ts or /lib/prisma.ts

// 1. Point to the actual generated file, not the npm package
import { PrismaClient } from "../src/generated/prisma/client"; 
import { PrismaNeon } from "@prisma/adapter-pg"; // or @prisma/adapter-neon for Neon
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);

const prismaClientSingleton = () => {
  // 2. In Prisma 7, you MUST pass the adapter to the constructor
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = globalThis.prisma ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;