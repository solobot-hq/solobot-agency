import { NextResponse } from "next/server";

import { openai } from "@/lib/openai";
export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const completion = await openai.responses.create({
      model: "gpt-4.1",
      input: prompt,
    });

    return NextResponse.json({
      text: completion.output_text,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "API_ERROR" },
      { status: 500 }
    );
  }
}