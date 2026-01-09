// lib/openai.ts
import OpenAI from "openai";

/**
 * LAZY INITIALIZATION HELPER
 * This prevents the 'new OpenAI' constructor from running during the Next.js build.
 * It only runs at runtime when a real user triggers a request.
 */
export function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    // During build, return null so the build worker doesn't crash.
    // At runtime, this will be caught by the route handler.
    return null;
  }

  return new OpenAI({
    apiKey: apiKey,
  });
}