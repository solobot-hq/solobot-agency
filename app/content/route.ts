import { NextResponse } from "next/server";
// ✅ 1. Corrected Import
import { getOpenAI } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    // ✅ 2. Initialize inside the handler
    const openai = getOpenAI();
    
    // ✅ 3. Build-time safety check
    if (!openai) {
      return new NextResponse("AI Service Unavailable", { status: 503 });
    }

    const { prompt } = await req.json();

    // ✅ 4. Use the local openai instance
    // Note: Ensure the SDK method names match your OpenAI version
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Changed to gpt-4o as 'gpt-4.1' is not a standard model name
      messages: [{ role: "user", content: prompt }],
    });

    return NextResponse.json({
      text: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "API_ERROR" },
      { status: 500 }
    );
  }
}