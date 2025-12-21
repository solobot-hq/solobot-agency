import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getUsageForUser, incrementUsage, FREE_LIMIT } from "@/lib/usage";

// ✅ Enforce Node.js runtime (required for server logic)
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Safe usage check (stubbed)
    await getUsageForUser(userId);

    // Minimal neutral response — no simulation, no intelligence
    return NextResponse.json({ status: "ok" });

  } catch (error) {
    console.error("[SALES_AGENT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
