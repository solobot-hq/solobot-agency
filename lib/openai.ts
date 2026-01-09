// lib/openai.ts
import OpenAI from "openai";

/**
 * Lazy, runtime-safe OpenAI client.
 * - NEVER instantiates during build phase
 * - NEVER uses fake/dummy keys that trigger SDK validation errors
 * - Prevents "OPENAI_API_KEY is missing" build crashes
 */
export function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;

  // 1. If key is missing (common during Next.js build evaluation), 
  // return null instead of throwing or providing a dummy key.
  if (!apiKey) {
    return null;
  }

  // 2. Only instantiate when the key is actually present (runtime)
  return new OpenAI({
    apiKey: apiKey,
  });
}