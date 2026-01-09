import Stripe from "stripe";

// 1. Get the secret key from environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

/**
 * ✅ BUILD-SAFE INITIALIZATION:
 * If the key is missing (common during Vercel build/static generation),
 * we provide a dummy key to prevent the SDK from throwing a fatal error.
 */
export const stripe = new Stripe(stripeSecretKey || "sk_test_placeholder_for_build", {
  // Use a modern API version or the one specific to your project
  apiVersion: "2024-12-18.acacia", 
  typescript: true,
  // Recommended: helps debug which app is making the request
  appInfo: {
    name: "SoloBot Agency SaaS",
    version: "1.0.0",
  },
});