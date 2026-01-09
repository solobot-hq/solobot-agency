// lib/openai.ts
import OpenAI from "openai";

/**
 * THE FIX: Wrap initialization in a function.
 * Provide a fallback string to satisfy the constructor during 'next build'.
 */
export function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY || "sk_build_placeholder_ignore_this";

  return new OpenAI({
    apiKey: apiKey,
  });
}