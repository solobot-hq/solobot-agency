import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkUsage } from "@/lib/usage/enforcement";

export async function GET(req: Request) {
  // 🔒 Security: Check for Cron Secret (set this in Vercel/Env)
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // 1. Find active bots that haven't run in 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const botsToRun = await db.bot.findMany({
      where: {
        status: "active",
        lastRun: { lt: oneDayAgo }
      },
      include: { user: true }
    });

    const results = [];

    for (const bot of botsToRun) {
      // 2. Check Usage Limits
      const canRun = await checkUsage(bot.user.clerkId, true);
      
      if (!canRun.allowed) {
        results.push({ botId: bot.id, status: "skipped", reason: "Usage limit reached" });
        continue;
      }

      // 3. EXECUTE BOT LOGIC HERE (Simulated for now)
      console.log(`🤖 Executing Bot: ${bot.name} for User: ${bot.user.email}`);

      // 4. Update Bot lastRun and Create Record
      await db.$transaction([
        db.bot.update({
          where: { id: bot.id },
          data: { lastRun: new Date() }
        }),
        db.executionRecord.create({
          data: {
            userId: bot.user.clerkId,
            status: "success",
            isAutonomous: true
          }
        })
      ]);

      results.push({ botId: bot.id, status: "executed" });
    }

    return NextResponse.json({ processed: results.length, details: results });
  } catch (error) {
    console.error("Cron Heartbeat Failed:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}