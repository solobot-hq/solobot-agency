export type UsageContract = {
  plan: "free" | "starter" | "pro";
  periodStart: string;
  periodEnd: string;
  limits: {
    requests: number;
    agents: number;
  };
  usage: {
    requests: number;
    agents: number;
  };
};

export const usageData: UsageContract = {
  plan: "free",
  periodStart: "2026-01-01",
  periodEnd: "2026-01-31",
  limits: {
    requests: 1000,
    agents: 1,
  },
  usage: {
    requests: 0,
    agents: 0,
  },
};