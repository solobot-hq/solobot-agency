import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Query your user's subscription or credit table
    const user = await db.user.findUnique({
      where: { clerkId: userId },
      select: { creditsUsed: true, creditsTotal: true }
    });

    return NextResponse.json({
      used: user?.creditsUsed || 0,
      total: user?.creditsTotal || 5000,
      percentage: ((user?.creditsUsed || 0) / (user?.creditsTotal || 5000)) * 100
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}