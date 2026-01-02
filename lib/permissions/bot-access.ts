/**
 * SoloBotAgency - Bot Access Control Logic
 * Hard-locks specific agents to Pro/Pro Max tiers to drive upgrades.
 */

/**
 * ✅ FIXED: Added Record<string, string[]> type definition.
 * This resolves TS7053 by allowing dynamic string indexing (botId).
 */
export const BOT_ACCESS_MAP: Record<string, string[]> = {
  // Available to all paying users
  "AI_SALES_AGENT": ["STARTER", "PRO", "PRO_MAX"],
  
  // High-volume agents locked to Pro Agency+
  "GLOBAL_INBOX_BOT": ["PRO", "PRO_MAX"],
  "LEAD_PULSE_FEED": ["PRO", "PRO_MAX"],
  
  // Premium/Custom agents locked to Pro Max
  "CUSTOM_AGENCY_BOT": ["PRO_MAX"],
  "AUTO_OPTIMIZER": ["PRO_MAX"]
};

/**
 * ✅ FIXED: Function renamed to 'checkBotAccess' to resolve TS2305.
 * This matches the import expected by your BotNavItem.tsx component.
 */
export function checkBotAccess(botId: string, userTier: string): boolean {
  // Use a fallback to an empty array if the botId isn't found in the map
  const allowedTiers = BOT_ACCESS_MAP[botId] || [];
  
  // If the map doesn't contain the botId, it's considered public or unmapped
  if (allowedTiers.length === 0) return true;

  return allowedTiers.includes(userTier);
}

/**
 * ✅ HELPER: Keeping an alias for compatibility if needed elsewhere
 */
export const canUserAccessBot = checkBotAccess;