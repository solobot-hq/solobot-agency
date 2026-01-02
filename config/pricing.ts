export const PRICING_CONFIG = {
  currency: {
    code: "GBP",
    symbol: "£",
  },
  plans: {
    free: {
      name: "Free Tier",
      price: 0,
      limit: 3, // Hard limit of 3 credits total
      features: [
        { name: "Smart Reply Generator", included: true },
        { name: "Lead Analysis", included: false },
        { name: "Objection Crusher", included: false },
      ],
    },
    pro: {
      name: "Pro Agency",
      price: 99,
      stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
      features: [
        { name: "Unlimited AI Generations", included: true },
        { name: "All 8 AI Modes Unlocked", included: true },
        { name: "Priority Processing", included: true },
        { name: "CRM-aware responses", included: true },
      ],
    },
  },
};