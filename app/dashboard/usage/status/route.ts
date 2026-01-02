import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db"; // ✅ Use the Singleton ONLY

/**
 * ✅ FIX 1: Force Node.js Runtime
 * Prisma 7 + Neon requires the Node.js environment to handle WebSockets 
 * correctly during the build worker's page collection phase.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    /**
     * ✅ FIX 2: Async Auth check
     * Modern Clerk SDK requires awaiting the auth() helper.
     */
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    /**
     * ✅ FIX 3: Singleton usage & Field Alignment
     * Fields must match schema.prisma: usageCount -> dailyUsageCount, plan -> tier.
     * St statically typed, ensuring you don't access unselected fields.
     */
    const user = await db.user.findUnique({
      where: { clerkId: userId },
      select: { 
        dailyUsageCount: true, // ✅ Matches schema
        tier: true            // ✅ Matches schema
      }
    });

    if (!user) {
      // Return defaults using the new field names for consistency
      return NextResponse.json({ dailyUsageCount: 0, tier: "STARTER" });
    }

    return NextResponse.json(user);
    
  } catch (error) {
    console.error("Usage Status API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}