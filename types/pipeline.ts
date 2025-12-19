export type DealStage = "lead" | "contacted" | "negotiation" | "closed";

export interface Deal {
  id: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  value: number; // Stored as plain number (e.g. 5000 for $5,000)
  stage: DealStage;
  createdAt: Date;
  lastActivity: Date; // Critical for "Stall Detection"
  source: "manual" | "leads_engine" | "import";
  
  // AI / Computed Fields (Populated by Intelligence Layer)
  aiScore?: number; // 0-100 Confidence
  winProbability?: number; // %
  nextStepSuggestion?: string; // "Send Follow-up", "Schedule Demo"
  isStalled?: boolean; // True if no activity > 7 days
}

// Global Configuration for Stage Logic
export const PIPELINE_STAGES: Record<DealStage, { label: string; baseProbability: number; color: string }> = {
  lead: { label: "New Leads", baseProbability: 10, color: "bg-blue-500" },
  contacted: { label: "Contacted", baseProbability: 30, color: "bg-yellow-500" },
  negotiation: { label: "Negotiation", baseProbability: 70, color: "bg-purple-500" },
  closed: { label: "Won / Lost", baseProbability: 100, color: "bg-emerald-500" },
};