// /worker/aiScriptGenerator.mjs

import OpenAI from 'openai';
import { VideoScriptSchema } from '../utils/scriptSchema.js'; // Assuming it's compiled or available as JS

// Initialize OpenAI client (requires OPENAI_API_KEY environment variable)
const openai = new OpenAI();

// Define a detailed system prompt to guide the AI's behavior
const SYSTEM_PROMPT = `You are an expert video scriptwriter and editor for high-growth SaaS companies. 
Your task is to generate a concise, scene-by-scene script optimized for short-form platforms (like TikTok or YouTube Shorts). 
You MUST adhere strictly to the provided JSON schema. 
The visualDescription field must contain highly specific, searchable terms for stock video libraries.`;

/**
 * Generates a structured video script using the OpenAI API.
 * @param {import('../utils/renderQueue').JobInput} jobInput 
 * @returns {Promise<import('../utils/scriptSchema').StructuredVideoScript>}
 */
export async function generateScript(jobInput) {
    const { topic, style, platform, tone, duration } = jobInput;

    const userPrompt = `
        Create a ${duration}-second video script.
        - **Goal/Topic:** ${topic}
        - **Video Style:** ${style}
        - **Target Platform:** ${platform}
        - **Tone:** ${tone}
        - **Strict Duration:** Target total duration must be close to ${duration} seconds.
        - **Rule:** Ensure all scene durations sum up to the total duration.
    `;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o", // Using gpt-4o for best structured output reliability
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userPrompt }
            ],
            response_format: { 
                type: "json_schema", 
                json_schema: VideoScriptSchema 
            },
            temperature: 0.7,
        });

        // OpenAI's response is a string that needs to be parsed
        const scriptJson = JSON.parse(completion.choices[0].message.content);
        
        // Basic type casting/return
        return scriptJson;

    } catch (error) {
        console.error("OpenAI API Error:", error);
        throw new Error(`Failed to generate script via AI: ${error.message}`);
    }
}