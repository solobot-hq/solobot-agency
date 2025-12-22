import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      companyName,
      targetAudience,
      productDetails,
      painPoints,
      tone,
      length,
      structure = "Auto",
      style = "Direct",
      ctaType = "Soft",
      creativity = 0.7,
      includeCaseStudy = false,
      includeObjections = false,
      includeRiskReversal = false,
    } = body;

    // Framework Logic
    let frameworkPrompt = "";
    if (structure === "PAS") {
      frameworkPrompt = "Use PAIN - AGITATE - SOLUTION.";
    } else if (structure === "HVA") {
      frameworkPrompt = "Use HOOK - VALUE - ASK.";
    } else if (structure === "4S") {
      frameworkPrompt = "Use 4S: SHORT, SIMPLE, SPECIFIC, SUPPORT.";
    } else {
      frameworkPrompt = "Auto-select the strongest framework (PAS, HVA, 4S).";
    }

    // CTA Logic
    let ctaPrompt = "";
    if (ctaType === "Soft")
      ctaPrompt = "Use a soft, interest-based CTA. No scheduling requests.";
    if (ctaType === "Neutral")
      ctaPrompt = "Use a polite, direct CTA.";
    if (ctaType === "Hard")
      ctaPrompt = "Use a specific time-based CTA.";

    // Style Logic
    let stylePrompt = "";
    if (style === "Direct") stylePrompt = "Write concisely with zero fluff.";
    if (style === "Narrative") stylePrompt = "Use a micro-story or analogy.";
    if (style === "Authority") stylePrompt = "Write with expert authority.";

    const systemPrompt = `
You are a world-class B2B sales copywriter (Josh Braun level). 
Your goal: create a cold email that gets a REPLY — not just an open.

RULES:
1. No greetings like “Hope you're well”.
2. No corporate jargon.
3. Short paragraphs & whitespace.
4. LENGTH: ${length}.
5. TONE: ${tone}.
6. FRAMEWORK: ${frameworkPrompt}
7. CTA: ${ctaPrompt}
8. STYLE: ${stylePrompt}

Optional Elements:
${includeCaseStudy ? "- Add a 1-sentence case study." : ""}
${includeObjections ? "- Preempt one objection." : ""}
${includeRiskReversal ? "- Add a risk reversal statement." : ""}
`;

    const userPrompt = `
Company: ${companyName || "Unknown"}
Audience: ${targetAudience}
Pain Points: ${painPoints}
Value Prop: ${productDetails}

Write the email body now.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: Number(creativity),
    });

    const email =
      (completion.choices[0].message.content || "").trim();

    return NextResponse.json({ result: email });
  } catch (error) {
    console.error("Cold Email Error:", error);
    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}
