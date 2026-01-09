import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

// ✅ BUILD-SAFE: Provide a dummy key during build so the constructor doesn't crash.
// Vercel will inject the real key into your runtime environment automatically.
export const openai = new OpenAI({
  apiKey: apiKey || "dummy_key_for_build_process",
});