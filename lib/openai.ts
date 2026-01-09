import OpenAI from "openai";

/**
 * BUILD-SAFE OPENAI CLIENT
 * This prevents the "OPENAI_API_KEY is missing" error during Vercel build.
 */
const apiKey = process.env.OPENAI_API_KEY || "sk_build_placeholder_ignore_this";

export const openai = new OpenAI({
  apiKey: apiKey,
});

// Export a helper to verify the key at runtime if needed
export function validateOpenAIConfig() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set in environment variables.");
  }
}