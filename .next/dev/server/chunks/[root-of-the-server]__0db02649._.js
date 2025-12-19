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
"[project]/app/api/bots/ai-sales-agent/variations/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
        } else if (type === "ab-test") {
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
        } else {
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
                {
                    role: "system",
                    content: systemInstruction
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ],
            response_format: {
                type: "json_object"
            },
            temperature: 0.8
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
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                result: Array.isArray(items) ? items : []
            });
        }
        // 2. A/B Test -> Object { A: string, B: string }
        if (type === "ab-test") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                result: parsed
            });
        }
        // 3. Variations -> Array of Strings
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            result: Array.isArray(items) ? items : []
        });
    } catch (error) {
        console.error("Variations API Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Error generating variations"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0db02649._.js.map