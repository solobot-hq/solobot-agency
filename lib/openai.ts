// lib/openai.ts
import OpenAI from "openai";

/**
 * THE FIX: Singleton/Helper for OpenAI
 * We provide a fallback string to satisfy the constructor during 'next build'
 * so that the SDK doesn't throw a "missing or empty" error.
 */
export function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY || "sk_build_placeholder_ignore_this";

  return new OpenAI({
    apiKey: apiKey,
  });
}