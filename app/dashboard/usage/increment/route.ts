import { NextResponse } from "next/server";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST() {
  /**
   * ✅ Mandatory Clerk Update:
   * auth() now returns a Promise. We must await it to access the userId.
   */
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    /**
     * ✅ Prisma 7 Atomic Update:
     * Using 'dailyUsageCount' to match your updated schema.
     * Increments the value directly in the database to prevent race conditions.
     */
    await db.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        dailyUsageCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Usage increment failed:", error);

    return NextResponse.json(
      { error: "Failed to increment usage" },
      { status: 500 }
    );
  }
}