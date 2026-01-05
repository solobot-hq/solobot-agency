// 🔒 STABLE BILLING CONTRACT — PHASE 2 (MULTI-INTERVAL)
export type PlanTier = {
  id: "starter" | "pro" | "pro_max";
  name: string;
  currency: string;
  features: string[];
  pricing: {
    monthly: number;
    yearly: number; // Applied 10% discount
  };
  // 🔑 STRIPE MAPPING (Hidden from UI, required for Build)
  stripePriceIdMonthly: string;
  stripePriceIdYearly: string;
};

export const AVAILABLE_PLANS: PlanTier[] = [
  {
    id: "starter",
    name: "starter",
    currency: "GBP",
    features: ["20 daily runs", "1 concurrent thread", "human-reviewed execution"],
    pricing: { monthly: 29, yearly: 26 },
    stripePriceIdMonthly: "price_starter_mon_id", 
    stripePriceIdYearly: "price_starter_yr_id"
  },
  {
    id: "pro",
    name: "pro",
    currency: "GBP",
    features: ["150 daily runs", "3 concurrent threads", "semi-autonomous operation"],
    pricing: { monthly: 99, yearly: 89 },
    stripePriceIdMonthly: "price_pro_mon_id",
    stripePriceIdYearly: "price_pro_yr_id"
  },
  {
    id: "pro_max",
    name: "pro max",
    currency: "GBP",
    features: ["600 daily runs", "10 concurrent threads", "full operational autonomy"],
    pricing: { monthly: 249, yearly: 224 },
    stripePriceIdMonthly: "price_promax_mon_id",
    stripePriceIdYearly: "price_promax_yr_id"
  },
];