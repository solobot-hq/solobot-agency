// /prisma/seed.ts
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws;
}

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const adapter = new PrismaNeon({ connectionString: connectionString as string });
const prisma = new PrismaClient({ adapter });

async function main() {
  // 🎯 REPLACE THIS WITH YOUR ACTUAL CLERK ID from your dashboard
  const TARGET_USER_ID = "user_2xxxxxxxxxxxxxxxxx"; 
  
  console.log(`🌱 Target User: ${TARGET_USER_ID}`);

  // 1️⃣ STEP 1: Ensure the User exists (Fixes the Foreign Key Error)
  console.log(`🌱 Syncing User record...`);
  const user = await prisma.user.upsert({
    where: { clerkId: TARGET_USER_ID },
    update: {},
    create: {
      clerkId: TARGET_USER_ID,
      email: "admin@solobotagency.com", // Placeholder email
      tier: "PRO_MAX",
      dailyUsageCount: 0,
      activeTaskCount: 0,
    },
  });

  // 2️⃣ STEP 2: Cleaning existing bots for this user
  console.log(`🌱 Cleaning existing telemetry...`);
  await prisma.bot.deleteMany({ where: { userId: TARGET_USER_ID } });

  // 3️⃣ STEP 3: Seed Bots
  console.log(`🌱 Seeding Bots to Neon...`);
  await prisma.bot.createMany({
    data: [
      { 
        userId: TARGET_USER_ID, 
        name: "Sales Outreach Bot", 
        type: "Outreach",
        desc: "Automated cold-outreach and lead qualification.",
        status: "Idle"
      },
      { 
        userId: TARGET_USER_ID, 
        name: "Leads Engine Pro", 
        type: "Scrapers",
        desc: "Deep-web data extraction and enrichment.",
        status: "Idle"
      }
    ]
  });

  console.log(`✅ Seeding finished successfully.`);
}

main()
  .catch((e) => {
    console.error("❌ Seed Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });