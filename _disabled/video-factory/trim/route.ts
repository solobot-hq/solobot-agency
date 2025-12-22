import { NextResponse } from "next/server";
import { trimVideo } from "@/lib/videoTrim";

export async function POST(req: Request) {
  try {
    const { input_url, start, end } = await req.json();

    if (!input_url) {
      return NextResponse.json(
        { error: "Missing input_url" },
        { status: 400 }
      );
    }

    if (start == null || end == null) {
      return NextResponse.json(
        { error: "Start and end values required" },
        { status: 400 }
      );
    }

    const result = await trimVideo(input_url, start, end);

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Trimming failed" },
      { status: 500 }
    );
  }
}
