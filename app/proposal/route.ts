import { NextResponse } from "next/server";
// ✅ 1. Corrected Import
import { getOpenAI } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    // ✅ 2. Initialize inside the handler (Build-Safe)
    const openai = getOpenAI();
    
    // ✅ 3. Build-time safety check (Returns null during 'npm run build')
    if (!openai) {
      return new NextResponse("AI Service Unavailable", { status: 503 });
    }

    const { prompt } = await req.json();

    // ✅ 4. Call the OpenAI SDK
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", 
      messages: [{ role: "user", content: prompt }],
    });

    return NextResponse.json({
      text: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json(
      { error: "API_ERROR" },
      { status: 500 }
    );
  }
}