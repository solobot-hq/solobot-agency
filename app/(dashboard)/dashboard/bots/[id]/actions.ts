"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getAuthUser } from "@/lib/auth";

/**
 * SaaS Standard: Bot Operational Controller
 * Features: Multi-tenant protection, Entitlement verification, and Telemetry.
 */
export async function updateBotStatus(id: string, isRunning: boolean) {
  try {
    const user = await getAuthUser();

    // 1. Identity Guard
    if (!user || !user.id) {
      return { success: false, error: "AUTH_REQUIRED", message: "Session expired. Please log in." };
    }

    // 2. SaaS Entitlement Check
    // We fetch the user's current plan status directly from the source of truth
    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { planTier: true }
    });

    // Logical Gate: Prevent 'FREE' users from initializing bots if that's a paid-only feature
    if (isRunning && (!dbUser || dbUser.planTier === "FREE")) {
      return { 
        success: false, 
        error: "UPGRADE_REQUIRED", 
        message: "Your current plan does not support active bot nodes. Please upgrade to Pro." 
      };
    }

    // 3. Atomic Database Update with Ownership Guard
    const updatedBot = await db.bot.update({
      where: { 
        id,
        userId: user.id // SECURITY: Prevents Cross-User state injection
      },
      data: { 
        isRunning,
        updatedAt: new Date(),
        // We log the last 'start' time specifically for uptime calculations
        ...(isRunning ? { lastStartedAt: new Date() } : {})
      }
    });

    /**
     * 4. Audit Trail (SaaS Standard)
     * Professional platforms maintain an immutable log of system changes.
     */
    await db.activityLog.create({
      data: {
        botId: id,
        userId: user.id,
        action: isRunning ? "NODE_INITIALIZED" : "NODE_TERMINATED",
        metadata: {
          timestamp: new Date().toISOString(),
          ip_obfuscated: "true"
        }
      }
    }).catch(err => console.error("Non-critical Log Failure:", err));

    // 5. Cache Invalidation
    // Forces Next.js to dump the old state and fetch the new status on next load
    revalidatePath(`/dashboard/bot/${id}`);
    revalidatePath(`/dashboard`); // Update main dashboard status indicators
    
    return { 
      success: true, 
      lastActive: updatedBot.updatedAt,
      status: isRunning ? "RUNNING" : "OFFLINE"
    };

  } catch (error) {
    console.error(`[CRITICAL_SYSTEM_ERROR][BOT_ID: ${id}]:`, error);
    return { 
      success: false, 
      error: "SYNC_ERROR", 
      message: "Infrastructure synchronization failed. Please try again." 
    };
  }
}