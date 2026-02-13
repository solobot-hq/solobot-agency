// 📄 Location: app/actions/credit-actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
// ✅ FIXED: Pointing to the 'usage' folder instead of the non-existent 'billing'
import { deductCreditsForUser } from "@/lib/usage/credit-engine";

/**
 * 💳 UI-FACING CREDIT ACTION
 */
export async function deductCredits(amount: number = 1) {
  try {
    const { userId: clerkId } = await auth();
    
    if (!clerkId) {
      return { success: false, error: "Authentication required" };
    }

    // This now points to the correct engine in lib/usage/
    return await deductCreditsForUser(clerkId, amount);
  } catch (error) {
    console.error("Credit action error:", error);
    return { success: false, error: "Internal server error" };
  }
}