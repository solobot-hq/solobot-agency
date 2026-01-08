/**
 * SUBSCRIPTION INTERVAL ENFORCEMENT (PHASE 2 - STEP 2)
 * Ensures that the selected priceId matches the server-side 
 * record for the requested billing interval.
 */

import { STRIPE_PRICE_IDS, PlanTier, BillingInterval } from "@/config/stripe";

interface ValidationResult {
  isValid: boolean;
  planId?: PlanTier;
  error?: string;
}

/**
 * Validates that a Price ID is correct for the chosen interval.
 * Prevents cross-interval misuse or injection of unauthorized IDs.
 */
export function validatePriceInterval(
  priceId: string, 
  requestedInterval: BillingInterval
): ValidationResult {
  
  // 1. Iterate through the locked mapping to find the priceId
  const entries = Object.entries(STRIPE_PRICE_IDS) as [PlanTier, typeof STRIPE_PRICE_IDS.starter][];
  
  const matchedPlan = entries.find(([_, prices]) => 
    prices.monthly === priceId || prices.yearly === priceId
  );

  // 2. If the priceId isn't in our locked config, reject immediately
  if (!matchedPlan) {
    return { isValid: false, error: "Unauthorized or invalid Price ID provided." };
  }

  const [planId, prices] = matchedPlan;

  // 3. Enforce interval integrity (Monthly must match Monthly, etc.)
  const expectedPriceId = requestedInterval === "monthly" 
    ? prices.monthly 
    : prices.yearly;

  if (priceId !== expectedPriceId) {
    return { 
      isValid: false, 
      error: `Interval mismatch: The provided price does not match the ${requestedInterval} billing interval.` 
    };
  }

  // 4. Validation successful
  return { 
    isValid: true, 
    planId 
  };
}