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
"[project]/app/api/bots/ai-sales-agent/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
        const { companyName, targetAudience, productDetails, painPoints, tone, length, structure = "Auto", style = "Direct", ctaType = "Soft", creativity = 0.7, includeCaseStudy = false, includeObjections = false, includeRiskReversal = false } = body;
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
        if (ctaType === "Soft") ctaPrompt = "Use a soft, interest-based CTA. No scheduling requests.";
        if (ctaType === "Neutral") ctaPrompt = "Use a polite, direct CTA.";
        if (ctaType === "Hard") ctaPrompt = "Use a specific time-based CTA.";
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
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ],
            temperature: Number(creativity)
        });
        const email = (completion.choices[0].message.content || "").trim();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            result: email
        });
    } catch (error) {
        console.error("Cold Email Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Generation failed"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__41d352c2._.js.map