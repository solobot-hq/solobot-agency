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
"[project]/app/api/bots/ai-sales-agent/linkedin/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
            temperature: 0.7
        });
        const content = completion.choices[0].message.content;
        const parsed = JSON.parse(content || "{}");
        // Formatter: Converts the structured JSON into a UI-friendly string 
        // This ensures your existing "whitespace-pre-wrap" UI displays it perfectly without code changes.
        const formattedOutput = `
### 🤝 Connection Notes (Max 300 chars)
${(parsed.connectionNotes || []).map((n)=>`• ${n}`).join('\n\n')}

### 📩 DM Follow-Ups (Value First)
${(parsed.followUpDMs || []).map((n)=>`• ${n}`).join('\n\n')}

### 🎙️ Voice Note Scripts (Natural Speech)
${(parsed.voiceNoteScripts || []).map((n)=>`• "${n}"`).join('\n\n')}
    `.trim();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            result: formattedOutput
        });
    } catch (error) {
        console.error("LinkedIn API Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to generate LinkedIn assets."
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1714b429._.js.map