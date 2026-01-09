import OpenAI from "openai";

let openaiInstance: OpenAI | null = null;

export function getOpenAI() {
  if (openaiInstance) return openaiInstance;

  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    // We throw a clear error here so you know if the ENV is missing at RUNTIME
    throw new Error("CRITICAL: OPENAI_API_KEY is not defined in environment variables.");
  }

  openaiInstance = new OpenAI({
    apiKey: apiKey,
  });

  return openaiInstance;
}