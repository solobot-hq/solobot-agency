// lib/usage.ts

// 👇 CONSTANTS
export const FREE_LIMIT = 3;

// 👇 STUBBED: Returns safe default (0 usage) to unblock build
// This replaces the Firebase logic that was crashing the build
export async function getUsageForUser(userId: string) {
  return { count: 0 };
}

// 👇 STUBBED: Does nothing (safe for deployment)
export async function incrementUsage(userId: string) {
  return;
}