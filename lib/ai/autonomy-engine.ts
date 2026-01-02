"use server";

import { prisma } from "@/lib/prisma";

/**
 * ✅ OFFICIAL SOLO BOT AGENCY SAFETY MODEL
 * Synchronized with Pricing & Infrastructure Caps
 */
export const SAFETY_MODEL = {
  STARTER: {
    dailyLimit: 20,
    concurrency: 1,
    bgExecution: false,
    requiresApproval: "ALWAYS",
    maxDuration: 5, // minutes
    retries: 0
  },
  PRO: {
    dailyLimit: 150,
    concurrency: 3,
    bgExecution: true,
    requiresApproval: "FIRST_RUN",
    maxDuration: 30,
    retries: 3
  },
  PRO_MAX: {
    dailyLimit: 600,
    concurrency: 10,
    bgExecution: true,
    requiresApproval: "NONE",
    maxDuration: 120,
    retries: "ADAPTIVE"
  }
};

/**
 * ✅ VALIDATE SAFETY GATE
 * Protects infrastructure by enforcing plan-based execution limits
 */
export async function validateSafetyGate(userId: string) {
  // 🔍 UPDATED: Selecting fields that exist in the updated schema
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { 
      tier: true, 
      dailyUsageCount: true, // Formerly dailyUsage
      activeTaskCount: true  // Formerly activeThreads
    }
  });

  const tier = (user?.tier || "STARTER") as keyof typeof SAFETY_MODEL;
  const limits = SAFETY_MODEL[tier];

  // 🛑 RULE 1: HARD DAILY KILL SWITCH (Infrastructure Protection)
  // UPDATED: Using dailyUsageCount
  if (user && user.dailyUsageCount >= limits.dailyLimit) {
    return { allowed: false, error: "DAILY_CAP_REACHED", alert: true };
  }

  // 🛑 RULE 2: CONCURRENCY LIMITS (Thread Management)
  // UPDATED: Using activeTaskCount
  if (user && user.activeTaskCount >= limits.concurrency) {
    return { allowed: false, error: "CONCURRENCY_LIMIT_REACHED" };
  }

  return { allowed: true, limits };
}