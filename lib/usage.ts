// lib/usage.ts
export const FREE_LIMIT = 3;

// ✅ The build needs this exact function name
export async function getUsageForUser(userId: string) {
  return { count: 0 };
}

export async function incrementUsage(userId: string) {
  return;
}