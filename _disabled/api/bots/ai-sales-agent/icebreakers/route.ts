import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { targetAudience, companyName } = body;

    const systemPrompt = `
      You are an expert Copywriter specializing in Cold Email Openers.
      Your goal is to pass the "3-second test" — prove you are human immediately.

      **GENERATE 5 ICEBREAKERS PER CATEGORY (Strictly <110 chars each):**
      
      1. **observation:** Neutral, specific observation about their industry/role.
      2. **flattery:** Subtle compliment on a likely achievement (NO cringe/over-the-top praise).
      3. **humor:** Witty, self-deprecating, or industry-inside joke. Subtle.
      4. **question:** A provoking question that hits a pain point immediately.
      5. **commonGround:** "Fellow [Role]..." or shared struggle.
      6. **customSmart:** High-IQ industry insight or data-driven opener.

      **OUTPUT:** Return valid JSON: { "observation": [], "flattery": [], "humor": [], "question": [], "commonGround": [], "customSmart": [] }
    `;

    const userPrompt = `
      **Target:** ${targetAudience}
      **Company:** ${companyName || "Their Company"}
      
      Generate the list now.
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
    });

    const parsed = JSON.parse(completion.choices[0].message.content || "{}");

    // Flatten logic: 
    // We prioritize the new "customSmart" and "question" categories at the top of the list 
    // to give the user the highest converting options first in their UI list.
    const curatedList = [
      ...(parsed.customSmart || []),
      ...(parsed.question || []),
      ...(parsed.observation || []),
      ...(parsed.humor || []),
      ...(parsed.commonGround || []),
      ...(parsed.flattery || [])
    ].slice(0, 20); // Return top 20 mixed

    return NextResponse.json({ result: curatedList });

  } catch (error) {
    console.error("Icebreaker API Error:", error);
    return NextResponse.json({ error: "Failed to generate icebreakers." }, { status: 500 });
  }
}