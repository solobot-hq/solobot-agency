// lib/openai.ts

/**
 * P0 FIX: TOTAL ISOLATION
 * We do not use top-level imports. This ensures the OpenAI library
 * is not evaluated during the Next.js build process.
 */
let client: any = null;

export function getOpenAI() {
  // 1. Check for the key. During Vercel build, this is empty.
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    // Return null so the build worker can finish without crashing.
    return null;
  }

  // 2. Singleton pattern
  if (client) return client;

  // 3. INTERNAL REQUIRE: This prevents build-time evaluation of the OpenAI SDK
  const OpenAI = require("openai");
  
  client = new OpenAI({
    apiKey: apiKey,
  });

  return client;
}