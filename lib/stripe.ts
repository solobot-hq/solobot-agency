import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// ✅ BUILD-SAFE: Similar to OpenAI, avoid passing an empty string.
export const stripe = new Stripe(stripeSecretKey || "sk_test_placeholder", {
  apiVersion: "2025-04-30.basil", // Update to your version
  typescript: true,
});