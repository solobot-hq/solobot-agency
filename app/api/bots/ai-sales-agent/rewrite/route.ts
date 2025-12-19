import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { original, instruction } = body;

    if (!original || !instruction) {
      return NextResponse.json(
        { error: "Missing original text or instruction" },
        { status: 400 }
      );
    }

    const prompt = `
Rewrite the following sales email based on this instruction: "${instruction}".
Maintain the core offer but adjust the style/length/tone as requested.

Original Text:
"${original}"

Return ONLY the rewritten text.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert editor." },
        { role: "user", content: prompt },
      ],
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Error rewriting text" },
      { status: 500 }
    );
  }
}