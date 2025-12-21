export type Plan = "free" | "pro" | "pro_max";

// 👇 YOUR AGREED LIMITS (Must be here!)
export const PLAN_LIMITS = {
  free: {
    draftsPerDay: 3,
    rewriteModes: false,
    versions: false,
    watermark: true,
  },
  pro: {
    draftsPerDay: Infinity,
    rewriteModes: true,
    versions: true,
    watermark: false,
  },
  pro_max: {
    draftsPerDay: Infinity,
    rewriteModes: true,
    versions: true,
    watermark: false,
  },
};

export const HARD_CAPS = {
  free: {
    draftsPerDay: 3,
  },
  pro: {
    draftsPerDay: 50,
  },
  pro_max: {
    draftsPerDay: 150,
  },
};

// 👇 THE FIX FOR THE BUILD ERROR (Must be here!)
export const PLANS = [
  {
    name: "Free",
    slug: "free",
    quota: HARD_CAPS.free.draftsPerDay,
    price: {
      amount: 0,
      priceIds: { test: "", production: "" },
    },
  },
  {
    name: "Pro",
    slug: "pro",
    quota: HARD_CAPS.pro.draftsPerDay,
    price: {
      amount: 29,
      priceIds: { test: "price_pro_test", production: "" },
    },
  },
  {
    name: "Pro Max",
    slug: "pro_max",
    quota: HARD_CAPS.pro_max.draftsPerDay,
    price: {
      amount: 99,
      priceIds: { test: "price_promax_test", production: "" },
    },
  },
];