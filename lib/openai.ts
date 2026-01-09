import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

export const openai = new OpenAI({
  // Dummy key allows the 'new OpenAI' constructor to pass during build
  apiKey: apiKey || "dummy_key_for_build_process",
});