import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// ✅ BUILD-SAFE: Avoid passing an empty string to Stripe during build
export const stripe = new Stripe(stripeSecretKey || "sk_test_placeholder", {
  apiVersion: "2024-12-18.acacia", 
  typescript: true,
});