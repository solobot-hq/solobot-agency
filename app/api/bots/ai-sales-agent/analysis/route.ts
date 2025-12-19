import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, targetAudience } = body;

    if (!text) return NextResponse.json({ error: "No text provided" }, { status: 400 });

    const systemPrompt = `
      You are an elite Sales Copy Analyst & Spam Filter Simulator (Lavender/Lyne style).
      Analyze the provided email text deeply.

      **OUTPUT JSON STRUCTURE (Strict):**
      {
        "spamScore": number, // 0-10 (0 = Clean, 10 = Spam Trap)
        "tone": {
          "perceived": string, // e.g., "Consultative", "Aggressive", "Helpful"
          "formality": number, // 0-10
          "aggression": number, // 0-10
          "humanLikeness": number // 0-10
        },
        "readability": {
          "gradeLevel": string, // e.g., "Grade 4"
          "complexity": number, // 0-10
          "sentences": number,
          "avgWords": number
        },
        "replyProbability": number, // 0-100 (Prediction)
        "ctaStrength": number, // 0-10 (Urgency + Clarity - Friction)
        "suggestions": [string, string, string] // 3 specific, actionable edits
      }

      **ANALYSIS RULES:**
      1. **Reply Prediction:** Bonus for <100 words, clear questions, "soft" CTAs. Penalty for "I hope", "synergy".
      2. **Spam Score:** Penalty for ALL CAPS, "free", "guarantee", "risk-free", multiple links.
      3. **Readability:** Aim for Grade 5-7. If sentences >25 words, high complexity score.
      4. **CTA Strength:** "Worth a chat?" (High). "Click here to book a 30 min demo" (Low/High Friction).
    `;

    const userPrompt = `
      **Email Text:** "${text}"
      **Audience Context:** "${targetAudience}"
      
      Perform the analysis.
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2, // Deterministic for analysis
    });

    const parsed = JSON.parse(completion.choices[0].message.content || "{}");

    // DATA MAPPING:
    // We map the new rigorous JSON structure to the exact keys your existing Frontend UI expects.
    // We also include the new data fields (readability, ctaStrength) so they are available 
    // if you decide to display them later, without breaking current views.
    
    const result = {
      // Legacy UI Compatibility
      replyProbability: parsed.replyProbability || 50,
      spamScore: parsed.spamScore || 0,
      toneAnalysis: {
        perceivedTone: parsed.tone?.perceived || "Neutral",
        formality: parsed.tone?.formality || 5,
        aggression: parsed.tone?.aggression || 5,
        humanLikeness: parsed.tone?.humanLikeness || 5
      },
      suggestions: parsed.suggestions || ["Shorten text.", "Check spam words."],
      
      // New Advanced Data (Available for future UI expansion)
      readability: parsed.readability,
      ctaStrength: parsed.ctaStrength
    };

    return NextResponse.json({ result });

  } catch (error) {
    console.error("Analysis API Error:", error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}