// 🔒 STABLE BILLING CONTRACT — PHASE 1
export type PlanTier = {
  id: "starter" | "pro_agency" | "pro_max";
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
    features: ["20 ai runs/day", "1 concurrent task", "core bots only"],
  },
  {
    id: "pro_agency",
    name: "pro agency",
    price: 99,
    currency: "GBP",
    interval: "month",
    features: ["150 ai runs/day", "3 concurrent tasks", "all core bots"],
  },
  {
    id: "pro_max",
    name: "pro max",
    price: 249,
    currency: "GBP",
    interval: "month",
    features: ["600 ai runs/day", "10 concurrent tasks", "full autonomy"],
  },
];