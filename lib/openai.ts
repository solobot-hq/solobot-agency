// lib/openai.ts
import OpenAI from "openai";

/**
 * Lazy, runtime-safe OpenAI client.
 * - NEVER instantiates during build
 * - NEVER uses fake keys
 * - Fails gracefully if env var is missing
 */
export function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    // IMPORTANT:
    // Do NOT throw here — build-time imports must survive
    return null;
  }

  return new OpenAI({ apiKey });
}
