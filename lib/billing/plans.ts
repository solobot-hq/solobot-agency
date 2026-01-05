export type PlanTier = {
  id: "free" | "starter" | "pro";
  name: string;
  price: number;
  currency: string;
  interval: "month" | "year";
  features: string[];
};

export const AVAILABLE_PLANS: PlanTier[] = [
  {
    id: "free",
    name: "free",
    price: 0,
    currency: "usd",
    interval: "month",
    features: ["1 active agent", "1,000 requests/mo", "standard support"],
  },
  {
    id: "starter",
    name: "starter",
    price: 29,
    currency: "usd",
    interval: "month",
    features: ["5 active agents", "50,000 requests/mo", "priority support"],
  },
  {
    id: "pro",
    name: "pro",
    price: 99,
    currency: "usd",
    interval: "month",
    features: ["unlimited agents", "500,000 requests/mo", "24/7 dedicated support"],
  },
];