// 🔒 STABLE BILLING CONTRACT — PHASE 2
export type PlanTier = {
  id: "starter" | "pro" | "pro_max";
  name: string;
  currency: string;
  features: string[];
  pricing: {
    monthly: number;
    yearly: number;
  };
  // 🔑 Build Requirements (Hidden from UI)
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
    stripePriceIdMonthly: "price_starter_monthly", 
    stripePriceIdYearly: "price_starter_yearly"
  },
  {
    id: "pro",
    name: "pro",
    currency: "GBP",
    features: ["150 daily runs", "3 concurrent threads", "semi-autonomous operation"],
    pricing: { monthly: 99, yearly: 89 },
    stripePriceIdMonthly: "price_pro_monthly",
    stripePriceIdYearly: "price_pro_yearly"
  },
  {
    id: "pro_max",
    name: "pro max",
    currency: "GBP",
    features: ["600 daily runs", "10 concurrent threads", "full operational autonomy"],
    pricing: { monthly: 249, yearly: 224 },
    stripePriceIdMonthly: "price_promax_monthly",
    stripePriceIdYearly: "price_promax_yearly"
  },
];