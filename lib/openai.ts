import OpenAI from "openai";

let client: OpenAI | null = null;

export function getOpenAI() {
  // Runtime Guard: Ensure we have the key when actually called
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set in environment variables");
  }

  // Singleton Pattern: Only create the client once
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return client;
}