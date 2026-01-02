import { NextResponse } from "next/server";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
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
