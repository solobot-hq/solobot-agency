// /lib/prisma.ts

// 1. IMPORT FROM THE CUSTOM OUTPUT PATH DEFINED IN YOUR SCHEMA
import { PrismaClient } from "../generated/client"; 
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

/**
 * 2. Setup the connection pool.
 * Note: Use the DIRECT_URL for migrations, but the standard DATABASE_URL 
 * for the application pool to handle pooling correctly.
 */
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

const adapter = new PrismaPg(pool);

/**
 * 3. Define the singleton function.
 * Passing the 'adapter' is mandatory in Prisma 7 when using 'prisma-client'.
 */
const prismaClientSingleton = () => {
  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
};

/**
 * 4. Type definition for the global object.
 */
declare global {
  // eslint-disable-next-line no-var
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

/**
 * 5. Initialize or retrieve the existing instance.
 */
const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;