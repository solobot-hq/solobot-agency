/**
 * SoloBotAgency - Daily Usage Reset Engine
 * Structural Safety: Resets dailyUsageCount to 0 every 24 hours.
 */
import { prisma } from "@/lib/prisma";

export async function resetDailyUsage() {
  try {
    const result = await prisma.user.updateMany({
      data: {
        dailyUsageCount: 0,
        lastUsageReset: new Date(),
      },
    });
    console.log(`[SAFETY] Successfully reset usage for ${result.count} users.`);
  } catch (error) {
    console.error("[ERROR] Failed to reset daily usage:", error);
  }
}