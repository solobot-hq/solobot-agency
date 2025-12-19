import { NextResponse } from "next/server";
import { startPipeline } from "@/lib/videoFactory";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Accept UI format: { prompt: "..." }
    if (payload.prompt) {
      const structured = {
        topic: payload.prompt || "Untitled Video",
        style: "Explainer",
        platform: "TikTok",
        tone: "Conversational",
        duration: 30,
        script_override: "",
      };

      const job_id = startPipeline(structured);
      return NextResponse.json({ job_id }, { status: 202 });
    }

    // Fallback for structured format
    if (!payload.topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const structured = {
      topic: payload.topic,
      style: payload.style || "Explainer",
      platform: payload.platform || "TikTok",
      tone: payload.tone || "Conversational",
      duration: payload.duration || 30,
      script_override: payload.script_override || "",
    };

    const job_id = startPipeline(structured);

    return NextResponse.json({ job_id }, { status: 202 });

  } catch (e: any) {
    console.error("Render error:", e);
    return NextResponse.json(
      { error: e.message || "Internal error" },
      { status: 500 }
    );
  }
}
