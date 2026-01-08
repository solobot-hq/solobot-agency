/**
 * STRIPE PRODUCT & PRICE MAPPING (PHASE 2 - STEP 1)
 * Mirroring Approved Phase 1 Pricing Logic.
 */

export const STRIPE_PRICE_IDS = {
  starter: {
    productId: process.env.STRIPE_PRODUCT_ID_STARTER!,
    monthly: process.env.STRIPE_PRICE_ID_STARTER_MONTHLY!, // £29
    yearly: process.env.STRIPE_PRICE_ID_STARTER_YEARLY!,   // £312
  },
  pro: {
    productId: process.env.STRIPE_PRODUCT_ID_PRO!,
    monthly: process.env.STRIPE_PRICE_ID_PRO_MONTHLY!,    // £99
    yearly: process.env.STRIPE_PRICE_ID_PRO_YEARLY!,      // £1068
  },
  pro_max: {
    productId: process.env.STRIPE_PRODUCT_ID_PRO_MAX!,
    monthly: process.env.STRIPE_PRICE_ID_PRO_MAX_MONTHLY!,// £249
    yearly: process.env.STRIPE_PRICE_ID_PRO_MAX_YEARLY!,  // £2688
  },
} as const;

export type PlanTier = keyof typeof STRIPE_PRICE_IDS;
export type BillingInterval = "monthly" | "yearly";