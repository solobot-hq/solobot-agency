// lib/openai.ts

/**
 * PRODUCTION-SAFE LAZY OPENAI
 * This prevents the OpenAI library from being evaluated during 'next build'.
 */
let client: any = null;

export function getOpenAI() {
  // 1. If we're in the build worker, process.env.OPENAI_API_KEY will be empty.
  // We return null so the build can proceed.
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  // 2. Return cached client if available
  if (client) return client;

  // 3. LAZY REQUIRE: This is the ONLY way to stop import-time execution.
  const OpenAI = require("openai");
  
  client = new OpenAI({
    apiKey: apiKey,
  });

  return client;
}