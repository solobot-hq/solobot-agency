// lib/openai.ts
import OpenAI from "openai";

let openaiInstance: OpenAI | null = null;

export const getOpenAI = () => {
  const apiKey = process.env.OPENAI_API_KEY;

  // Build-time safety: return null if the key is missing
  if (!apiKey) return null;

  if (!openaiInstance) {
    openaiInstance = new OpenAI({
      apiKey: apiKey,
    });
  }

  return openaiInstance;
};