// 🔒 STABLE BILLING CONTRACT — PHASE 1 (GBP UPDATED)
export type PlanTier = {
  id: "starter" | "pro" | "pro_max";
  name: string;
  price: number;
  currency: string;
  interval: "month";
  features: string[];
};

export const AVAILABLE_PLANS: PlanTier[] = [
  {
    id: "starter",
    name: "starter",
    price: 29,
    currency: "GBP",
    interval: "month",
    features: ["20 daily runs", "1 concurrent thread", "human-reviewed execution"],
  },
  {
    id: "pro",
    name: "pro",
    price: 99,
    currency: "GBP",
    interval: "month",
    features: ["150 daily runs", "3 concurrent threads", "semi-autonomous operation"],
  },
  {
    id: "pro_max",
    name: "pro max",
    price: 249,
    currency: "GBP",
    interval: "month",
    features: ["600 daily runs", "10 concurrent threads", "full operational autonomy"],
  },
];