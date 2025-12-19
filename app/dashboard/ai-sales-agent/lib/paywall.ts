"use server";

import { auth } from "@clerk/nextjs/server";
import { FREE_LIMIT, getUsage, incrementUsage } from "@/lib/usage";

// HARD ADMIN OVERRIDE – ALWAYS UNLIMITED
const ADMIN_EMAIL = "solobotagency@gmail.com";

export async function checkUsage() {
  const session = await auth();
  const email =
    session?.sessionClaims?.email ||
    session?.user?.emailAddresses?.[0]?.emailAddress;

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
  const { userId } = session;
  if (!userId) {
    return {
      usage: 0,
      remaining: 0,
      limit: FREE_LIMIT,
      isLocked: true,
      isPremium: false,
    };
  }

  const usage = await getUsage(userId);
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
  const session = await auth();
  const email =
    session?.sessionClaims?.email ||
    session?.user?.emailAddresses?.[0]?.emailAddress;

  // 🔥 Admin never increments usage
  if (email === ADMIN_EMAIL) return;

  const { userId } = session;
  if (!userId) return;

  await incrementUsage(userId);
}

// No Stripe checkout during development for admin
export async function createCheckoutSession() {
  const session = await auth();
  const email =
    session?.sessionClaims?.email ||
    session?.user?.emailAddresses?.[0]?.emailAddress;

  if (email === ADMIN_EMAIL) {
    return; // Admin never sees checkout
  }

  throw new Error("Checkout disabled for development environment");
}
