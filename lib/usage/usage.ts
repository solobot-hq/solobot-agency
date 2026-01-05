// 🔒 STABLE USAGE CONTRACT — ALIGNED WITH STARTER TIER
export type UsageContract = {
  plan: "starter" | "pro" | "pro_max";
  periodStart: string;
  periodEnd: string;
  limits: {
    requests: number; // Daily Runs
    agents: number;   // Concurrent Threads
  };
  usage: {
    requests: number;
    agents: number;
  };
};

export const usageData: UsageContract = {
  plan: "starter",
  periodStart: "2026-01-01",
  periodEnd: "2026-01-31",
  limits: {
    requests: 20,
    agents: 1,
  },
  usage: {
    requests: 0,
    agents: 0,
  },
};