import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { getUserSubscriptionStatus } from "@/lib/subscription";
import { getUsage, incrementUsage, FREE_LIMIT } from "@/lib/usage";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Admin Email for Override
const ADMIN_EMAIL = "solobotagency@gmail.com";

// --- SYSTEM PROMPTS BASED ON MODES ---
const MODE_PROMPTS: Record<string, string> = {
  "Smart Reply Generator": `
    You are an elite Sales AI. 
    GOAL: Generate a short, high-conversion reply to the last message.
    STYLE: Casual but professional, concise, punchy.
    OUTPUT: JSON with 'reply', 'strategy' (one sentence explaining why), and 'confidenceScore' (0-100).
  `,
  "Lead Analysis": `
    You are a Lead Intelligence Officer.
    GOAL: Analyze the provided lead context and message history.
    OUTPUT: JSON. 
    'reply': A summary of the lead's intent and buying temperature.
    'strategy': The suggested next move (e.g., "Push for call", "Nurture").
    'confidenceScore': 0-100 based on buying signals.
  `,
  "Objection Crusher": `
    You are a Negotiation Expert.
    GOAL: Overcome the specific objection raised in the chat.
    TECHNIQUE: Use 'Feel-Felt-Found' or logical reframing. Never be defensive.
    OUTPUT: JSON with 'reply' (the script), 'strategy' (psychological principle used).
  `,
  "Meeting Booker Mode": `
    You are an SDR focused solely on booking meetings.
    GOAL: Propose a time or ask for availability using low-friction CTAs.
    STYLE: Assumptive close or "Two-Option" close.
    OUTPUT: JSON with 'reply' (booking request), 'strategy' (closing technique).
  `,
  "Cold Email Rewrite": `
    You are a Copywriting Virtuoso.
    GOAL: Rewrite the user's input to be shorter, clearer, and more persuasive.
    RULES: <150 words, 5th-grade reading level, focus on WIIFM (What's in it for me).
    OUTPUT: JSON with 'reply' (the rewrite), 'strategy' (what was improved).
  `,
  "Persona Profiles": `
    You are a profiler. 
    GOAL: Deduce the personality type (DISC or Myers-Briggs) of the lead based on their text.
    OUTPUT: JSON with 'reply' (Profile description), 'strategy' (How to mirror them).
  `,
  "Saved Responses": `
    You are a template librarian.
    GOAL: Retrieve or format a best-practice generic response for this situation.
    OUTPUT: JSON with 'reply', 'strategy'.
  `,
  "Upload Lead (CSV)": `
    You are a data ingest assistant.
    GOAL: Acknowledge the context and suggest the first outreach message for this bulk list context.
    OUTPUT: JSON with 'reply', 'strategy'.
  `
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const user = await currentUser();
    
    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { messages, mode, leadContext } = body;
    const userEmail = user.emailAddresses[0]?.emailAddress;

    // --- 1. SUBSCRIPTION & USAGE CHECK ---
    const subscription = await getUserSubscriptionStatus(userId);
    const usage = await getUsage(userId);
    
    const isAdmin = userEmail === ADMIN_EMAIL;
    const isPremium = subscription.isPremium || isAdmin;

    // RULE 1: Free users only get "Smart Reply Generator"
    if (!isPremium && mode !== "Smart Reply Generator") {
      return NextResponse.json({
        error: "Mode Locked",
        message: "Upgrade to Pro to unlock advanced AI modes like Lead Analysis and Objection Handling."
      }, { status: 403 });
    }

    // RULE 2: Usage Limits for Free Users
    if (!isPremium && (usage.count || 0) >= FREE_LIMIT) {
       return NextResponse.json({
        error: "Limit Reached",
        message: "You have used your free AI credits. Upgrade to continue."
      }, { status: 402 }); // 402 Payment Required
    }

    // --- 2. CONSTRUCT PROMPT ---
    const systemPrompt = MODE_PROMPTS[mode] || MODE_PROMPTS["Smart Reply Generator"];
    
    // Add Premium Value if applicable
    let finalSystemPrompt = systemPrompt;
    if (isPremium) {
      finalSystemPrompt += `
        ADDITIONAL INSTRUCTIONS FOR PREMIUM USER:
        Include fields in JSON: 
        - "whyThisWorks": Detailed psychological breakdown.
        - "alternativeAngle": A second, riskier option.
        - "followUpSuggestion": What to send if they don't reply in 2 days.
      `;
    }

    // Attach Context
    const contextString = leadContext ? `\nLEAD CONTEXT: ${JSON.stringify(leadContext)}` : "";

    // --- 3. CALL OPENAI ---
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // Or gpt-4-turbo
      messages: [
        { role: "system", content: finalSystemPrompt + contextString },
        ...messages
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const aiContent = response.choices[0].message.content;
    if (!aiContent) throw new Error("No response from AI");

    const parsedData = JSON.parse(aiContent);

    // --- 4. INCREMENT USAGE (If not premium) ---
    if (!isPremium) {
      await incrementUsage(userId);
    }

    // Return the structured data
    return NextResponse.json(parsedData);

  } catch (error) {
    console.error("[SALES_AGENT_API_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
```

---

### **How to Integrate (Frontend Instructions)**

Since I cannot modify the UI code directly as per instructions, here is exactly how your **`SalesAgentUI.tsx`** `handleSendMessage` function should interact with this new API to make it real.

**In `SalesAgentUI.tsx`, update your `handleSendMessage` logic to:**

1.  **Check for Paywall (402/403 Status):**
    If the API returns status `402`, show your existing Paywall Modal (`setIsLocked(true)`).
    If status `403`, show a toast saying "This mode is for Pro users only".

2.  **Pass Context:**
    When calling `fetch`, pass the current `activeMode` and the `LEAD_INSIGHTS` object (or real data) in the body:
    ```javascript
    body: JSON.stringify({ 
       messages: [...messages, userMsg], // Send history
       mode: activeMode,
       leadContext: LEAD_INSIGHTS 
    })