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
"[project]/app/api/bots/ai-sales-agent/analysis/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
        const { text, targetAudience } = body;
        if (!text) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "No text provided"
        }, {
            status: 400
        });
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
            temperature: 0.2
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
            suggestions: parsed.suggestions || [
                "Shorten text.",
                "Check spam words."
            ],
            // New Advanced Data (Available for future UI expansion)
            readability: parsed.readability,
            ctaStrength: parsed.ctaStrength
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            result
        });
    } catch (error) {
        console.error("Analysis API Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Analysis failed"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__200f334c._.js.map