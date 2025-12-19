// /utils/scriptSchema.ts

import { ScriptOutput } from './renderQueue'; // Assuming this interface is correct

// Define the required structure for the AI-generated script
export interface VideoScene {
    sceneNumber: number;
    narrationText: string;
    visualDescription: string; // Crucial for Phase 4: Asset Search
    durationSeconds: number; // For accurate FFmpeg timing
}

// Full schema for the worker function to return
export interface StructuredVideoScript extends ScriptOutput {
    scenes: VideoScene[];
    videoTitle: string;
    totalDuration: number;
}

// --- JSON Schema for OpenAI Structured Output ---
// This schema will enforce the AI's response format.
export const VideoScriptSchema = {
    type: "object",
    properties: {
        videoTitle: {
            type: "string",
            description: "A compelling title for the video, suitable for the target platform."
        },
        totalDuration: {
            type: "number",
            description: "The estimated total duration of the video in seconds, matching the user's requested duration as closely as possible."
        },
        scenes: {
            type: "array",
            description: "An ordered array of video scenes.",
            items: {
                type: "object",
                properties: {
                    sceneNumber: {
                        type: "integer",
                        description: "The sequential number of the scene, starting at 1."
                    },
                    narrationText: {
                        type: "string",
                        description: "The concise voiceover script for this scene."
                    },
                    visualDescription: {
                        type: "string",
                        description: "A detailed description of the B-roll or footage needed for this scene (e.g., 'A person typing on a laptop with a focused expression', 'Wide shot of a city skyline at sunset'). This is used to search stock footage APIs like Pexels."
                    },
                    durationSeconds: {
                        type: "number",
                        description: "The duration of this specific scene's narration and visual in seconds. Must be greater than 1."
                    }
                },
                required: ["sceneNumber", "narrationText", "visualDescription", "durationSeconds"],
                additionalProperties: false
            }
        }
    },
    required: ["videoTitle", "scenes", "totalDuration"],
    additionalProperties: false
};