// lib/openai.ts
import OpenAI from "openai";

export function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  // During build, we provide a placeholder to prevent the crash
  // During runtime, this will use your real Vercel key
  return new OpenAI({
    apiKey: apiKey || "sk_build_placeholder_ignore_this",
  });
}