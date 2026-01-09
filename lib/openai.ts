import OpenAI from "openai";

/**
 * ✅ BUILD-SAFE INITIALIZATION:
 * During 'npm run build', environment variables might be unavailable.
 * Providing a fallback string prevents the 'missing or empty' crash.
 */
const apiKey = process.env.OPENAI_API_KEY;

export const openai = new OpenAI({
  apiKey: apiKey || "dummy_key_for_build_process",
});