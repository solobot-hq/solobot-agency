import OpenAI from "openai";

// Create the instance
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// If you have getOpenAI, keep it, but add the export above
export const getOpenAI = () => openai;