// 📄 Location: app/api/terminal/logs/route.ts
import { NextResponse } from "next/server";
import { getLatestSystemLogs } from "@/app/actions/terminal-actions";

/**
 * 🔒 TERMINAL LOG STREAM
 * This route hardens the terminal by providing a standard GET endpoint.
 * It prevents Server Action execution overhead during 5s polling.
 */
export async function GET() {
  try {
    const logs = await getLatestSystemLogs(15);
    return NextResponse.json(logs);
  } catch (error) {
    console.error("TERMINAL_POLL_ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
  }
}