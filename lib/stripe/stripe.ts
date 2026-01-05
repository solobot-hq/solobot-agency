import Stripe from "stripe";

// FIX: Prevent build-time crash if environment variable is missing
const apiKey = process.env.STRIPE_API_KEY || "";

export const stripe = new Stripe(apiKey, {
  // Matches your environment's required version from previous logs
  apiVersion: "2025-12-15.clover" as any, 
  typescript: true,
});