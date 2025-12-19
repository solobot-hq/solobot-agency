export type Plan = "free" | "pro" | "pro_max";

export const PLAN_LIMITS = {
  free: {
    draftsPerDay: 3,
    rewriteModes: false,
    versions: false, // Access to history/versions
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