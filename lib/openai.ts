// lib/openai.ts

/**
 * P0 FIX: LAZY RUNTIME INITIALIZATION
 * This prevents ANY OpenAI code from being evaluated during 'next build'.
 */
let client: any = null;

export function getOpenAI() {
  // 1. Check for key first (this will be empty during build)
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // During build, we return null so the static collector doesn't crash.
    return null;
  }

  // 2. Singleton check
  if (client) return client;

  // 3. LAZY REQUIRE: This is the ONLY way to prevent import-time execution.
  // We use require here to avoid top-level ESM imports.
  const OpenAI = require("openai");
  
  client = new OpenAI({
    apiKey: apiKey,
  });

  return client;
}