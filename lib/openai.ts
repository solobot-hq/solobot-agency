// lib/openai.ts
import OpenAI from "openai";

/**
 * BUILD-SAFE OPENAI CLIENT
 * By providing a placeholder string, we satisfy the SDK's internal validation
 * during the Next.js 'Collecting page data' phase.
 */
export function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY || "sk_build_placeholder_ignore_this";

  return new OpenAI({
    apiKey: apiKey,
  });
}