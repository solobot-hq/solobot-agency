// 📄 Location: lib/usage/credit-engine.ts
import { db } from "@/lib/db";

/**
 * ⚙️ CORE CREDIT ENGINE
 * Handles the database logic for deducting user credits.
 */
export async function deductCreditsForUser(clerkId: string, amount: number) {
  try {
    // 1. Find the user by their Clerk ID
    const user = await db.user.findUnique({
      where: { clerkId },
      select: { id: true, credits: true }
    });

    if (!user) {
      return { success: false, error: "User not found in database" };
    }

    // 2. Check for sufficient balance
    if (user.credits < amount) {
      return { success: false, error: "Insufficient credits" };
    }

    // 3. Perform the deduction
    await db.user.update({
      where: { clerkId },
      data: { credits: { decrement: amount } }
    });

    return { success: true };
  } catch (error) {
    console.error("Database Error in credit-engine:", error);
    return { success: false, error: "Failed to update credit balance" };
  }
}