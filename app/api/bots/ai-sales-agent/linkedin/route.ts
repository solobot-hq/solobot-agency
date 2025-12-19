import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { targetAudience, productDetails, painPoints, tone } = body;

    // Default tone fallback
    const selectedTone = tone || "Persuasive";

    const systemPrompt = `
      You are a world-class LinkedIn Social Selling Strategist (Style: Justin Welsh meets Daniel Fazio).
      Your goal is to generate "Pattern Interrupt" outreach assets.
      
      **CORE PHILOSOPHY:**
      1. **No Fluff:** Remove "I hope you are well", "My name is", "I'd love to pick your brain".
      2. **Structure:** Observation -> Tension (Pain) -> Micro-Benefit -> Curiosity Question.
      3. **Tone Logic:**
         - **Friendly:** Softer openers, more casual syntax.
         - **Direct:** Short sentences, punchy, business-first.
         - **Professional:** Polished grammar, respectful but equal status.
         - **Persuasive:** High curiosity, benefit-led.

      **OUTPUT REQUIREMENTS (JSON):**
      Return a JSON object with exactly these keys:
      {
        "connectionNotes": ["string", "string", "string"], // Max 300 chars. 1. Curiosity, 2. Soft Ask, 3. Credibility.
        "followUpDMs": ["string", "string", "string"], // Max 90 words. Contextual, value-add, no hard pitching.
        "voiceNoteScripts": ["string", "string", "string"] // Natural speech script, pauses indicated by "...", casual openers.
      }
    `;

    const userPrompt = `
      **Prospect Profile:**
      - **Audience:** ${targetAudience}
      - **Pain:** ${painPoints}
      - **Solution:** ${productDetails}
      - **Selected Tone:** ${selectedTone}

      Generate the LinkedIn assets now.
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;
    const parsed = JSON.parse(content || "{}");

    // Formatter: Converts the structured JSON into a UI-friendly string 
    // This ensures your existing "whitespace-pre-wrap" UI displays it perfectly without code changes.
    const formattedOutput = `
### 🤝 Connection Notes (Max 300 chars)
${(parsed.connectionNotes || []).map((n: string) => `• ${n}`).join('\n\n')}

### 📩 DM Follow-Ups (Value First)
${(parsed.followUpDMs || []).map((n: string) => `• ${n}`).join('\n\n')}

### 🎙️ Voice Note Scripts (Natural Speech)
${(parsed.voiceNoteScripts || []).map((n: string) => `• "${n}"`).join('\n\n')}
    `.trim();

    return NextResponse.json({ result: formattedOutput });

  } catch (error) {
    console.error("LinkedIn API Error:", error);
    return NextResponse.json({ error: "Failed to generate LinkedIn assets." }, { status: 500 });
  }
}