import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db"; // ✅ Use the Singleton to ensure the adapter is included

/**
 * ✅ FIX 1: Force Node.js Runtime
 * This ensures that the 'ws' (WebSocket) and 'Pool' drivers used in 
 * lib/db.ts are available during the Next.js static analysis phase.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  try {
    /**
     * ✅ FIX 2: Clerk v5 Auth
     * Directly use the Clerk auth helper for the current request.
     */
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    /**
     * ✅ FIX 3: Atomic Increment
     * In Prisma 7, the increment keyword is the most efficient way to 
     * update usage without race conditions.
     */
    const updatedUser = await db.user.update({
      where: { clerkId: userId },
      data: {
        usageCount: {
          increment: 1,
        },
      },
      select: {
        usageCount: true,
      },
    });

    return NextResponse.json({ 
      success: true, 
      usageCount: updatedUser.usageCount 
    });
    
  } catch (error) {
    console.error("Increment Usage Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}