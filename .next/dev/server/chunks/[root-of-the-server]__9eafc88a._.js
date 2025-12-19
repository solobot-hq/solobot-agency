module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/bots/email-assistant/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/client.mjs [app-route] (ecmascript) <export OpenAI as default>");
;
;
const client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
    apiKey: process.env.OPENAI_API_KEY
});
async function POST(req) {
    try {
        const body = await req.json();
        const { recipient, subject, keyPoints, rawEmail, tone, mode, rewriteMode, generateSubjectLines, variationSeed } = body;
        // -------------------------------
        // 1. Safety & Input Handling
        // -------------------------------
        // Check either keyPoints (Compose mode) or rawEmail (Fix mode)
        if ((!keyPoints || keyPoints.trim().length === 0) && (!rawEmail || rawEmail.trim().length === 0)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Content (Key Points or Raw Email) is required."
            }, {
                status: 400
            });
        }
        // Prevent runaway inputs
        const safeKeyPoints = keyPoints ? String(keyPoints).slice(0, 4000) : "";
        const safeRawEmail = rawEmail ? String(rawEmail).slice(0, 4000) : "";
        const safeRecipient = String(recipient || "Valued Contact").slice(0, 120);
        const safeSubject = String(subject || "").slice(0, 240);
        const safeTone = tone || "Professional";
        // Determine the primary operation type
        const isFixMode = mode === "fix";
        const isRewrite = mode === "rewrite";
        const isCompose = !isFixMode && !isRewrite;
        // -------------------------------
        // 2. SYSTEM PROMPT (THE ENGINE BRAIN)
        // -------------------------------
        const systemPrompt = `
You are the Email Output Engine for SoloBotAgency. Your task is to produce 
**premium, subscription-worthy email outputs** that outperform all major competitors.

===========================
🔥 CORE EMAIL RULES
===========================
1. Emails must be human, emotionally intelligent, persuasive, and high-impact.
2. ANTI-PATTERNS (NEVER USE):
   ❌ "I hope this finds you well"
   ❌ "I'm writing to..."
   ❌ "Following up..."
   ❌ "Delve", "Leverage", "Synergy", "Transformative", "Game-changer"

3. OPENING LINE must reference recipient’s world or insight to hook attention immediately.
4. EXACTLY ONE persuasion framework must be selected and applied from this list:
   [PAS, BAB, Challenger, SPICED, Story Selling, Executive Brevity, Emotional Resonance, ROI Power Pitch]

5. Use human rhythm: micro-pauses (— …), impact lines, varied sentence length.
6. CTA must match context (soft | direct | conversational | time-bound).

===========================
🚀 PREMIUM REWRITE MODES
===========================
If a specific rewrite mode is requested, ADAPT AGGRESSIVELY:
- **Executive Rewrite**: Ultra-concise, BLUF (Bottom Line Up Front), remove all fluff, focus on decision/ROI.
- **Storytelling Version**: Use a narrative arc, open with a hook/anecdote, connect emotionally.
- **Sales Conversion**: Focus on pain points, urgency, and a clear, low-friction CTA.
- **Cold Outreach**: Pattern interrupt opener, immediate value prop, soft ask (credibility focused).
- **Empathy Rewrite**: High emotional intelligence, validating language, supportive tone, relationship-first.

===========================
🛠️ FIX MY EMAIL MODE
===========================
If in "Fix My Email" mode:
1. Identify the core intent of the raw input.
2. STRIP all messiness, rambling, and bad grammar.
3. RESTRUCTURE perfectly using a persuasion framework.
4. ELEVATE the vocabulary and tone to World-Class standards.

===========================
🔥 STRICT JSON OUTPUT
===========================
Return ONLY valid JSON (no markdown blocks):

{
  "email": "<final email body>",
  "subjectLines": ["<Subject Option 1>", "<Subject Option 2>", "<Subject Option 3>"],
  "frameworkUsed": "<name of framework used>",
  "ctaType": "<soft | direct | conversational | time-bound>",
  "toneApplied": "<explanation of tone>",
  "whyThisWorks": [
    "<Educational point 1: Why the structure works>",
    "<Educational point 2: Psychology/Persuasion tactic used>",
    "<Educational point 3: Why the CTA was chosen>"
  ]
}
`;
        // --------------------------------
        // 3. USER PROMPT CONSTRUCTION
        // --------------------------------
        let taskInstruction = "";
        let inputContext = "";
        if (isFixMode) {
            taskInstruction = `TASK: FIX & UPGRADE this raw email. Make it perfect. Rewrite Mode: ${rewriteMode || "General Improvement"}.`;
            inputContext = `RAW INPUT TO FIX:\n"${safeRawEmail}"`;
        } else if (isRewrite) {
            taskInstruction = `TASK: REWRITE existing draft. Apply mode: ${rewriteMode}. Make it structurally different. Variation Seed: ${variationSeed}`;
            inputContext = `ORIGINAL DRAFT:\n"${safeKeyPoints}"`;
        } else {
            taskInstruction = `TASK: GENERATE from scratch. Variation Seed: ${variationSeed}`;
            inputContext = `KEY POINTS / CONTEXT:\n"${safeKeyPoints}"`;
        }
        const userPrompt = `
INPUT DATA:
Recipient: ${safeRecipient}
Subject Context: ${safeSubject}
Tone: ${safeTone}
Generate Subject Lines: ${generateSubjectLines ? "YES (Provide 3-5 variations)" : "NO (Provide 1 best option)"}

${taskInstruction}

${inputContext}

Return ONLY strict JSON.
`;
        // --------------------------------
        // 4. EXECUTION (GPT-4o-mini JSON MODE)
        // --------------------------------
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ],
            response_format: {
                type: "json_object"
            },
            temperature: 0.85,
            presence_penalty: 0.5,
            frequency_penalty: 0.3
        });
        let content = completion.choices?.[0]?.message?.content || "{}";
        content = content.replace(/^```json\s*/, "").replace(/\s*```$/, "");
        let parsedResult;
        try {
            parsedResult = JSON.parse(content);
        } catch  {
            parsedResult = {
                email: content,
                subjectLines: [
                    safeSubject || "New Email Draft"
                ],
                frameworkUsed: "General",
                ctaType: "Direct",
                toneApplied: safeTone,
                whyThisWorks: [
                    "Generated a clean draft based on your input."
                ]
            };
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            result: parsedResult
        });
    } catch (error) {
        console.error("Email Assistant API Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to generate email."
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9eafc88a._.js.map