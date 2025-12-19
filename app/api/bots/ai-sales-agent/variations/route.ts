import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formData, count, type } = body;

    const baseContext = `
    Context:
    Audience: ${formData.targetAudience}
    Offer: ${formData.productDetails}
    Pain Points: ${formData.painPoints}
    Tone: ${formData.tone}
    `;

    let systemInstruction = "You are a specialized sales copy engine. You output strict JSON only.";
    let userPrompt = "";

    // 1. Subject Lines Logic
    if (type === "subjects") {
      systemInstruction = `
      You are an expert at writing high-open-rate cold email subject lines.
      
      RULES:
      1. Length: Under 6 words.
      2. Style: Casual, lowercase, pattern-interrupt. NO "Salesy" caps.
      3. Output: JSON Object with a key "items" containing an array of objects.
      
      Each object must have:
      - "subject": The subject line text.
      - "openRateScore": Number 0-100.
      - "spamRisk": "Low", "Medium", or "High".
      `;
      
      userPrompt = `${baseContext}\nGenerate 5 distinct subject lines.`;
    } 
    
    // 2. A/B Test Logic
    else if (type === "ab-test") {
      systemInstruction = `
      You are an A/B testing expert. Generate two distinct email versions.
      
      Output strictly this JSON structure:
      {
        "A": "Full email text for Version A (Direct, concise, benefit-focused)...",
        "B": "Full email text for Version B (Story-based, problem-agitation, emotional)..."
      }
      
      Do NOT wrap in an array. Do NOT use "items". Return exactly keys "A" and "B".
      `;
      
      userPrompt = `${baseContext}\nGenerate the A/B test variants now.`;
    } 
    
    // 3. Variations Logic (Default)
    else {
      const num = count || 3;
      systemInstruction = `
      You are a sales copywriter. Generate ${num} distinct variations of the cold email.
      
      Output: JSON Object with a key "items" containing an ARRAY of STRINGS.
      Example: { "items": ["Email 1 text...", "Email 2 text...", "Email 3 text..."] }
      
      Do NOT return objects inside the array. Just strings.
      `;
      
      userPrompt = `${baseContext}\nGenerate ${num} variations.`;
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
    });

    const content = completion.choices[0].message.content || "{}";
    const parsed = JSON.parse(content);

    // --- Corrected extraction logic (handles all GPT JSON shapes) ---
    let items = parsed.items;

    // Handle nested shapes (GPT sometimes returns { items: { list: [...] } })
    if (items?.list && Array.isArray(items.list)) {
      items = items.list;
    }

    // 1. Subject Lines -> Array of Objects
    if (type === "subjects") {
      return NextResponse.json({
        result: Array.isArray(items) ? items : []
      });
    }

    // 2. A/B Test -> Object { A: string, B: string }
    if (type === "ab-test") {
      return NextResponse.json({ result: parsed });
    }

    // 3. Variations -> Array of Strings
    return NextResponse.json({
      result: Array.isArray(items) ? items : []
    });

  } catch (error: any) {
    console.error("Variations API Error:", error);
    return NextResponse.json(
      { error: "Error generating variations" },
      { status: 500 }
    );
  }
}