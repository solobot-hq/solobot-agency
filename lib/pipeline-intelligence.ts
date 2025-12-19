import { Deal, PIPELINE_STAGES } from "@/types/pipeline";

/**
 * Calculates dynamic deal health scores.
 * Replaces expensive LLM calls with business logic.
 */
export const calculateDealIntelligence = (deal: Deal): Deal => {
  const now = new Date();
  // Ensure lastActivity is a Date object
  const lastActiveDate = new Date(deal.lastActivity);
  const daysSinceActivity = Math.floor((now.getTime() - lastActiveDate.getTime()) / (1000 * 3600 * 24));
  
  // 1. Base Probability from Stage
  let prob = PIPELINE_STAGES[deal.stage].baseProbability;

  // 2. Decay Logic (The "Stall" Penalty)
  // Lose 5% probability for every 3 days of inaction in early stages
  if (deal.stage !== 'closed') {
    const decayFactor = Math.floor(daysSinceActivity / 3) * 5;
    prob = Math.max(5, prob - decayFactor);
  }

  // 3. Momentum Boost (New!)
  // If activity was today (0 days ago), give a 5% boost for "Hot Streak"
  if (daysSinceActivity === 0 && deal.stage !== 'closed') {
    prob = Math.min(95, prob + 5);
  }

  // 4. Stalled Flag
  const isStalled = daysSinceActivity > 7 && deal.stage !== 'closed';

  // 5. Next Step Suggestion Engine
  let suggestion = "No immediate action";
  
  if (deal.stage === 'lead') {
      if (daysSinceActivity > 2) suggestion = "Initiate Outreach";
      else suggestion = "Research Prospect";
  } else if (deal.stage === 'contacted') {
      if (isStalled) suggestion = "Re-engage / Breakup Email";
      else suggestion = "Schedule Discovery Call";
  } else if (deal.stage === 'negotiation') {
      if (isStalled) suggestion = "Identify Blockers";
      else suggestion = "Push for Closing";
  } else if (deal.stage === 'closed') {
      suggestion = "Archive / Onboard";
  }

  return {
    ...deal,
    winProbability: prob,
    isStalled,
    nextStepSuggestion: suggestion
  };
};