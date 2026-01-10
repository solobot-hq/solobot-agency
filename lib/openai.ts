// lib/openai.ts

/**
 * ABSOLUTE ISOLATION: 
 * No top-level 'import OpenAI'. 
 * This prevents Turbopack from evaluating the SDK during the build.
 */
export function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;

  // 1. Build-time safety: return null so the build worker doesn't crash
  if (!apiKey) return null;

  // 2. Inline require: hides the dependency from the static build scanner
  const OpenAI = require("openai");

  return new OpenAI({
    apiKey: apiKey,
  });
}