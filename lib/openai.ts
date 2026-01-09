import OpenAI from "openai";

/**
 * ✅ FIX: Move the initialization into a function.
 * This prevents Next.js from running 'new OpenAI()' during the build process.
 */
export const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    // During build, we return a dummy client or handle it gracefully
    // to keep the "Collecting page data" worker from crashing.
    if (process.env.NODE_ENV === "production") {
       console.warn("⚠️ OPENAI_API_KEY missing during build/runtime.");
    }
  }

  return new OpenAI({
    apiKey: apiKey || "dummy_key_to_pass_build_check",
  });
};

// Instead of exporting 'openai', you now export the function.