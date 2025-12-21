// lib/usage.ts
export const FREE_LIMIT = 3;

// ✅ IMPORTANT: The function must be named 'getUsageForUser'
export async function getUsageForUser(userId: string) {
  return { count: 0 };
}

export async function incrementUsage(userId: string) {
  return;
}