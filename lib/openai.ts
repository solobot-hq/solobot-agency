// lib/openai.ts
import OpenAI from "openai";

/**
 * Lazy, build-safe OpenAI client.
 * - Prevents import-time execution crashes.
 * - Returns null if the key is missing (during Next.js build).
 * - Only instantiates during real user requests.
 */
export function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;

  // If the key is missing (Build Time), return null instead of 'new OpenAI()'
  if (!apiKey) {
    return null;
  }

  // Only run this when we have a real key (Runtime)
  return new OpenAI({
    apiKey: apiKey,
  });
}