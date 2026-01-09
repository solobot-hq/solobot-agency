import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { validateUsageEnforcement } from "@/lib/usage/enforcement";

export async function GET(req: Request) {
  // 🔒 Security: Check for Cron Secret (Set in Vercel Dashboard)
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // 1. Find active bots that haven't run in the last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const botsToRun = await db.bot.findMany({
      where: {
        status: "active",
        lastRun: { lt: oneDayAgo },
      },
      include: {
        user: true,
      },
    });

    const results = [];

    for (const bot of botsToRun) {
      // 2. ✅ UPDATED: Use validateUsageEnforcement to check limits
      // Passes 'true' for isAutonomous to trigger autonomous logic
      const usageCheck = await validateUsageEnforcement(bot.user.clerkId, true);

      if (!usageCheck.allowed) {
        results.push({
          botId: bot.id,
          status: "skipped",
          reason: usageCheck.reason || "Limit reached",
        });
        continue;
      }

      // 3. EXECUTE BOT LOGIC
      // This is where you call your internal bot worker or AI function
      console.log(`🤖 Executing Autonomous Bot: ${bot.name} (User: ${bot.user.email})`);

      // 4. ATOMIC UPDATE: Transaction ensures we only log if the bot "runs"
      await db.$transaction([
        db.bot.update({
          where: { id: bot.id },
          data: { lastRun: new Date() },
        }),
        db.executionRecord.create({
          data: {
            userId: bot.user.clerkId,
            status: "success",
            isAutonomous: true, // ✅ Correctly flagged for usage tracking
          },
        }),
      ]);

      results.push({ botId: bot.id, status: "executed" });
    }

    return NextResponse.json({
      success: true,
      processedCount: results.length,
      details: results,
    });
  } catch (error: any) {
    console.error("Cron Heartbeat Failed:", error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}