import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface EmailRequest {
  recipient: string;
  subject: string;
  keyPoints: string;
  tone: string;
  mode: "Original" | "Shorten" | "Expand" | "Formal" | "Punchy";
  options: {
    includeCTA: boolean;
    addUrgency: boolean;
    humanize: boolean;
    formal: boolean;
    simplify: boolean;
    addWarmth: boolean;
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as EmailRequest;
    const { recipient, subject, keyPoints, tone, mode, options } = body;

    if (!keyPoints || keyPoints.trim().length === 0) {
      return NextResponse.json(
        { error: "Key points are required." },
        { status: 400 }
      );
    }

    const safeRecipient = String(recipient || "The Client").slice(0, 120);
    const safeSubject = String(subject || "General Update").slice(0, 240);
    const safeKeyPoints = String(keyPoints).slice(0, 4000);
    const safeTone = tone || "Professional";
    const safeMode = mode || "Original";

    const systemPrompt = `
You are the Email Output Engine for SoloBotAgency.
Your task is to generate premium, subscription-worthy business emails.

RULES:
- Output ONLY valid JSON with:
  { "email": string, "subjectLines": [string] }
- Do NOT explain. Do NOT preface.
- Treat key points as INTENT only.
- NEVER reuse or rewrite any previous draft.
- Every request must generate a brand-new email.
- Strictly follow MODE and TONE.

ANTI-PATTERNS:
"I hope this finds you well"
"I'm writing to"
"Following up"
Corporate filler or buzzwords

MODES:
- Shorten: BLUF, under 50 words, direct.
- Expand: Consultative, detailed, adds context.
- Formal: Strict professional grammar, no contractions.
- Punchy: High-impact, short sentences, persuasive.
- Original: Balanced professional email.

OPTIONS:
- includeCTA: clear next step
- addUrgency: time-sensitive but not spammy
- humanize: warmth (unless Formal)
- simplify: plain language
`;

    const userPrompt = `
Recipient: ${safeRecipient}
Subject Intent: ${safeSubject}

Key Points:
"${safeKeyPoints}"

Mode: ${safeMode}
Tone: ${safeTone}
Options: ${JSON.stringify(options)}

Generate a NEW email from scratch and ONE optimized subject line.
Return ONLY strict JSON.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.75,
      max_tokens: 500,
    });

    const content = completion.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("No content generated");
    }

    const parsed = JSON.parse(content);

    return NextResponse.json({
      email: parsed.email,
      subjectLines: parsed.subjectLines,
    });
  } catch (error) {
    console.error("Email Assistant API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate email." },
      { status: 500 }
    );
  }
}
