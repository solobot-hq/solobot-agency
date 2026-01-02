import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
// ✅ FIXED: Using the named export from your Prisma 7 singleton
import { prisma } from "@/lib/prisma";

/**
 * ✅ Next.js 16 Route Handler — Telemetry & Execution Stats
 * Synchronized with Prisma 7 & Official Autonomy Model
 */
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ MULTI-QUERY EXECUTION: Parallel fetching for speed
    const [userMetrics, totalBots, recentActivity] = await Promise.all([
      // 1. Fetch infrastructure limits from User
      prisma.user.findUnique({
        where: { clerkId: userId },
        select: {
          tier: true,
          dailyUsageCount: true,
          activeTaskCount: true,
          overageBalance: true,
        },
      }),
      // 2. FIXED: Count Bots (replacing the removed Workspace model)
      prisma.bot.count({
        where: { userId: userId }
      }),
      // 3. Fetch recent telemetry from the new Activity model
      prisma.activity.findMany({
        where: { userId: userId },
        orderBy: { createdAt: "desc" },
        take: 5,
      })
    ]);

    if (!userMetrics) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 });
    }

    // ✅ WORLD-CLASS JSON RESPONSE
    return NextResponse.json({
      metrics: {
        totalBots: totalBots,
        usage: userMetrics.dailyUsageCount,
        activeTasks: userMetrics.activeTaskCount,
        overage: userMetrics.overageBalance,
        tier: userMetrics.tier,
      },
      recent: recentActivity,
      trend: "+12%" // Placeholder for growth logic
    });

  } catch (error) {
    console.error("TELEMETRY_API_ERROR:", error);
    return NextResponse.json({ error: "Internal System Error" }, { status: 500 });
  }
}