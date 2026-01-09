import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

/** * ✅ BUILD-SAFE INITIALIZATION:
 * During 'next build', environment variables might not be available yet.
 * We provide a dummy string to prevent the constructor from throwing an error.
 */
export const openai = new OpenAI({
  apiKey: apiKey || "placeholder_key_for_build",
});