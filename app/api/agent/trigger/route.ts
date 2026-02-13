// 📄 Location: app/api/agent/trigger/route.ts
import { NextResponse } from "next/server";
import { withCreditGuard } from "@/lib/runtime/agent-runtime";

/**
 * 🛰️ AUTONOMOUS WEBHOOK TRIGGER
 * This endpoint allows external systems (or your own cron jobs) to trigger an agent.
 * It bypasses Clerk auth but is ENFORCED by the Prisma Credit Engine.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { botId, userId, payload } = body;

    // 1. Validate required fields for background execution
    if (!botId || !userId) {
      return NextResponse.json({ error: "Missing botId or userId" }, { status: 400 });
    }

    // 2. Execute via the Credit Guard (Phase 4B)
    // This will atomically deduct 1 credit from the user in Prisma.
    const result = await withCreditGuard(
      userId, 
      botId, 
      "EXTERNAL_WEBHOOK_TRIGGER",
      async () => {
        // 🤖 START AGENT LOGIC
        // This is where you will eventually call OpenAI/Anthropic.
        console.log(`Executing autonomous task for bot ${botId} with payload:`, payload);
        
        return { 
          status: "completed", 
          executionId: crypto.randomUUID(),
          timestamp: new Date().toISOString() 
        };
      }
    );

    // 3. Handle Payment Required (Insufficient Credits)
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 402 }); // 402 = Payment Required
    }

    // 4. Return successful execution data
    return NextResponse.json(result.data, { status: 200 });

  } catch (error) {
    console.error("WEBHOOK_HANDLER_CRASH:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}