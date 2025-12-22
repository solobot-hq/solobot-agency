import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getUsageForUser } from "@/lib/usage";

// ✅ Enforce Node.js runtime
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // ✅ FIX: Added 'await' before auth()
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Safe usage check
    await getUsageForUser(userId);

    // Minimal neutral response
    return NextResponse.json({ status: "ok" });

  } catch (error) {
    console.error("[SALES_AGENT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}