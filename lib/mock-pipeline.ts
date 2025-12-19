import { Deal, DealStage } from "@/types/pipeline";
import { calculateDealIntelligence } from "@/lib/pipeline-intelligence";

const COMPANIES = ["Acme Corp", "Globex", "Soylent Corp", "Initech", "Umbrella Corp", "Stark Ind", "Wayne Ent", "Cyberdyne", "Massive Dynamic", "Hooli"];
const STAGES: DealStage[] = ["lead", "contacted", "negotiation", "closed"];

export const generateMockDeals = (count: number = 12): Deal[] => {
  return Array.from({ length: count }).map((_, i) => {
    // Weighted random stage (more leads than closed deals)
    const stageWeight = Math.random();
    let stage: DealStage = 'lead';
    if (stageWeight > 0.4) stage = 'contacted';
    if (stageWeight > 0.7) stage = 'negotiation';
    if (stageWeight > 0.9) stage = 'closed';

    // Random activity date (0 to 20 days ago) to trigger "Stall" logic
    const daysAgo = Math.floor(Math.random() * 20);
    const lastActivity = new Date();
    lastActivity.setDate(lastActivity.getDate() - daysAgo);

    const rawDeal: Deal = {
      id: `deal-${i}`,
      companyName: COMPANIES[i % COMPANIES.length],
      contactName: `Contact ${i + 1}`,
      contactEmail: `contact${i + 1}@example.com`,
      value: (Math.floor(Math.random() * 50) + 5) * 1000, // 5k to 55k
      stage: stage,
      createdAt: new Date(),
      lastActivity: lastActivity,
      source: Math.random() > 0.5 ? "leads_engine" : "manual"
    };

    // Apply Intelligence immediately so the UI gets the AI scores
    return calculateDealIntelligence(rawDeal);
  });
};