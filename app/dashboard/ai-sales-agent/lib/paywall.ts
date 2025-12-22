"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
// ✅ FIX 1: Import 'getUsageForUser' instead of 'getUsage'
import { FREE_LIMIT, getUsageForUser, incrementUsage } from "@/lib/usage";

// HARD ADMIN OVERRIDE – ALWAYS UNLIMITED
const ADMIN_EMAIL = "solobotagency@gmail.com";

export async function checkUsage() {
  // ✅ FIX 2: Use currentUser() to get email correctly
  const user = await currentUser();
  const { userId } = await auth();

  const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();

  // 🔥 ADMIN ALWAYS UNLOCKED — NO STRIPE, NO LIMITS
  if (email === ADMIN_EMAIL) {
    return {
      usage: 0,
      remaining: 9999,
      limit: FREE_LIMIT,
      isLocked: false,
      isPremium: true,
      plan: "ADMIN",
    };
  }

  // Normal users (free limit)
  if (!userId) {
    return {
      usage: 0,
      remaining: 0,
      limit: FREE_LIMIT,
      isLocked: true,
      isPremium: false,
    };
  }

  // ✅ FIX 3: Use the correct function name
  const usage = await getUsageForUser(userId);
  const used = usage.count || 0;

  return {
    usage: used,
    remaining: Math.max(0, FREE_LIMIT - used),
    limit: FREE_LIMIT,
    isLocked: used >= FREE_LIMIT,
    isPremium: false,
    plan: "FREE",
  };
}

export async function trackUsage() {
  const user = await currentUser();
  const { userId } = await auth();

  const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();

  // 🔥 Admin never increments usage
  if (email === ADMIN_EMAIL) return;

  if (!userId) return;

  await incrementUsage(userId);
}

// No Stripe checkout during development for admin
export async function createCheckoutSession() {
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();

  if (email === ADMIN_EMAIL) {
    return; // Admin never sees checkout
  }

  throw new Error("Checkout disabled for development environment");
}