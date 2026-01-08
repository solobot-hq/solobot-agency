/**
 * USAGE CAPS ENFORCEMENT (PHASE 2 - STEP 3)
 * Server-side hard limits for runsPerDay, concurrency, and autonomy.
 * Zero-trust implementation using rolling 24h windows.
 */

import { db } from "@/lib/db"; // ✅ Matches the new named export in lib/db.ts
import { PLAN_LIMITS } from "@/lib/billing/plans"; // Approved Phase 1 plan data

// Note: If you need to perform server-side auth checks within this utility in the future,
// use: import { getAuthUser } from "@/lib/auth";

export type EnforcementResult = 
  | { allowed: true; executionId: string }
  | { allowed: false; reason: 'usage_limit' | 'concurrency_limit' | 'autonomy_unauthorized' };

/**
 * The "Three-Gate" Enforcement Guard
 * Executed server-side immediately before any run initiation.
 */
export async function validateUsageEnforcement(
  userId: string,
  planId: keyof typeof PLAN_LIMITS,
  requestIsAutonomous: boolean
): Promise<EnforcementResult> {
  const limits = PLAN_LIMITS[planId];
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // --- GATE A: ROLLING 24H RUN GUARD ---
  // Failed runs still count toward limits to prevent retry abuse.
  const dailyRunCount = await db.executionRecord.count({
    where: {
      userId,
      timestamp: { gte: twentyFourHoursAgo }
    }
  });

  if (dailyRunCount >= limits.runsPerDay) {
    return { allowed: false, reason: 'usage_limit' };
  }

  // --- GATE B: CONCURRENCY GUARD ---
  // Tracks threads that have not yet transitioned to 'completed' or 'failed'.
  const activeThreads = await db.executionRecord.count({
    where: {
      userId,
      status: 'active'
    }
  });

  if (activeThreads >= limits.concurrency) {
    return { allowed: false, reason: 'concurrency_limit' };
  }

  // --- GATE C: AUTONOMY GATE ---
  // Hard block for Starter tier attempting semi or full autonomy.
  const planAutonomyMap = {
    'Human-Reviewed Execution': 0,
    'Semi-Autonomous Operation': 1,
    'Full Operational Autonomy': 2
  };

  const userAutonomyLevel = planAutonomyMap[limits.autonomy as keyof typeof planAutonomyMap];
  
  // If request is autonomous but plan is "Human-Reviewed Execution", block.
  if (requestIsAutonomous && userAutonomyLevel === 0) {
    return { allowed: false, reason: 'autonomy_unauthorized' };
  }

  // --- GATE PASS: INITIATION ---
  // Run is counted at initiation before execution record is created.
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