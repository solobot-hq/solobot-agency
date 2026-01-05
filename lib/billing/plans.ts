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
};

export const AVAILABLE_PLANS: PlanTier[] = [
  {
    id: "starter",
    name: "starter",
    currency: "GBP",
    features: ["20 daily runs", "1 concurrent thread", "human-reviewed execution"],
    pricing: { monthly: 29, yearly: 26 }
  },
  {
    id: "pro",
    name: "pro",
    currency: "GBP",
    features: ["150 daily runs", "3 concurrent threads", "semi-autonomous operation"],
    pricing: { monthly: 99, yearly: 89 }
  },
  {
    id: "pro_max",
    name: "pro max",
    currency: "GBP",
    features: ["600 daily runs", "10 concurrent threads", "full operational autonomy"],
    pricing: { monthly: 249, yearly: 224 }
  },
];