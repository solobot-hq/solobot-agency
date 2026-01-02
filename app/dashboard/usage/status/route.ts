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
     * ✅ FIX 2: Direct Auth check
     * Bypass any intermediate helpers that might be instantiating their 
     * own Prisma clients.
     */
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    /**
     * ✅ FIX 3: Singleton usage
     * Querying via the shared 'db' ensures the PrismaNeon adapter is active.
     */
    const user = await db.user.findUnique({
      where: { clerkId: userId },
      select: { 
        usageCount: true, 
        plan: true 
      }
    });

    if (!user) {
      return NextResponse.json({ usageCount: 0, plan: "free" });
    }

    return NextResponse.json(user);
    
  } catch (error) {
    console.error("Usage Status API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}