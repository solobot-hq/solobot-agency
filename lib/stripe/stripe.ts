import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  // FIX: Updated to match your environment's required version
  apiVersion: "2025-12-15.clover" as any, 
  typescript: true,
});