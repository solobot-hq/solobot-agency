import OpenAI from "openai";

let client: OpenAI | null = null;

/**
 * ✅ LAZY INITIALIZATION SINGLETON
 * Safe for Next.js 16 Build Environment
 */
export function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;

  // 1. BUILD-TIME GUARD
  // During 'next build', env vars are often missing. 
  // We return null to allow the build to finish.
  if (!apiKey) {
    // Only log this in development/build to avoid cluttering production
    if (process.env.NODE_ENV !== 'production') {
      console.warn("⚠️ OPENAI_API_KEY is missing. Client will remain null.");
    }
    return null;
  }

  // 2. SINGLETON INITIALIZATION
  // This only runs the first time the function is called at runtime
  if (!client) {
    try {
      client = new OpenAI({
        apiKey: apiKey,
      });
    } catch (error) {
      console.error("❌ Failed to initialize OpenAI client:", error);
      return null;
    }
  }

  return client;
}