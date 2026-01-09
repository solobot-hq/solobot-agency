// lib/openai.ts

/**
 * PRODUCTION-SAFE LAZY OPENAI
 * This prevents ANY OpenAI code from running during the 'next build' 
 * static analysis phase. 
 */
let client: any = null;

export function getOpenAI() {
  // 1. Return cached client if available
  if (client) return client;

  // 2. Strict runtime check (Vercel will have this key only at runtime)
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing. This should not happen at runtime.");
  }

  // 3. LAZY REQUIRE: This is the magic. 
  // It stops the 'openai' library from being evaluated at import-time.
  const OpenAI = require("openai");
  
  client = new OpenAI({
    apiKey: apiKey,
  });

  return client;
}