/**
 * SoloBotAgency - Unified Plan Configuration
 * This is the ONLY source of truth for Landing, Dashboard, and Stripe.
 */

export const PLAN_LIMITS = {
  STARTER: {
    monthlyPrice: 29,
    yearlyPrice: 26, // ~10% off first year only
    runsPerDay: 20,
    concurrency: 1,
    description: "Human-led, AI-assisted",
    autonomy: "Manual approval always"
  },
  PRO: {
    monthlyPrice: 99,
    yearlyPrice: 89, // ~10% off first year only
    runsPerDay: 150,
    concurrency: 3,
    description: "Human-in-the-loop automation",
    autonomy: "Semi-autonomous mode"
  },
  PRO_MAX: {
    monthlyPrice: 249,
    yearlyPrice: 224, // ~10% off first year only
    runsPerDay: 600,
    concurrency: 10,
    description: "Autonomous AI Operations",
    autonomy: "Full autonomy"
  }
};