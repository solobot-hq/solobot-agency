/**
 * USAGE CAPS ENFORCEMENT (PHASE 2 - STEP 3)
 * Server-side hard limits for runsPerDay, concurrency, and autonomy.
 * Zero-trust implementation using rolling 24h windows.
 */

import { db } from "@/lib/db"; 
import { AVAILABLE_PLANS } from "@/lib/billing/plans"; // ✅ Fixed: Aligned with authoritative export

export type EnforcementResult = 
  | { allowed: true; executionId: string }
  | { allowed: false; reason: 'usage_limit' | 'concurrency_limit' | 'autonomy_unauthorized' };

/**
 * The "Three-Gate" Enforcement Guard
 * Executed server-side immediately before any run initiation.
 */
export async function validateUsageEnforcement(
  userId: string,
  planId: string, // Changed to string for array lookup
  requestIsAutonomous: boolean
): Promise<EnforcementResult> {
  // 🟢 Phase 4 Sync: Resolve limits from the authoritative AVAILABLE_PLANS source
  const plan = AVAILABLE_PLANS.find(p => p.id === planId);
  if (!plan) return { allowed: false, reason: 'usage_limit' };

  // Parse numeric limits from feature strings (e.g., "20 Daily Runs" -> 20)
  const runsLimit = parseInt(plan.features[0]); 
  const concurrencyLimit = parseInt(plan.features[1]);
  
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // --- GATE A: ROLLING 24H RUN GUARD ---
  // 
  const dailyRunCount = await db.executionRecord.count({
    where: {
      userId,
      timestamp: { gte: twentyFourHoursAgo }
    }
  });

  if (dailyRunCount >= runsLimit) {
    return { allowed: false, reason: 'usage_limit' };
  }

  // --- GATE B: CONCURRENCY GUARD ---
  // 
  const activeThreads = await db.executionRecord.count({
    where: {
      userId,
      status: 'active'
    }
  });

  if (activeThreads >= concurrencyLimit) {
    return { allowed: false, reason: 'concurrency_limit' };
  }

  // --- GATE C: AUTONOMY GATE ---
  // Starter tier (Human-Reviewed) is blocked from autonomous intents.
  if (requestIsAutonomous && plan.id === 'starter') {
    return { allowed: false, reason: 'autonomy_unauthorized' };
  }

  // --- GATE PASS: INITIATION ---
  const newExecution = await db.executionRecord.create({
    data: {
      userId,
      status: 'active',
      timestamp: now,
      isAutonomous: requestIsAutonomous
    }
  });

  return { allowed: true, executionId: newExecution.id };
}

/**
 * Post-Execution Lifecycle Management
 * Ensures runs transition out of 'active' to free concurrency slots.
 */
export async function transitionExecutionStatus(
  executionId: string,
  finalStatus: 'completed' | 'failed'
) {
  return await db.executionRecord.update({
    where: { id: executionId },
    data: { status: finalStatus }
  });
}