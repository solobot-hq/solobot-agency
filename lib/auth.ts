// lib/auth.ts
import { auth, currentUser } from "@clerk/nextjs/server";
// ✅ FIXED: Using named import for Prisma 7 singleton
import { prisma } from "./prisma";

export const getAuthUser = async () => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user || !user.emailAddresses?.length) {
    return null;
  }

  return {
    id: userId, // This is the clerkId
    email: user.emailAddresses[0].emailAddress,
  };
};

/**
 * ✅ GET DATABASE USER
 * Synchronized with the Official Autonomy Model schema.
 */
export const getDbUser = async () => {
  const authUser = await getAuthUser();
  if (!authUser) return null;

  try {
    // We use upsert to: 
    // 1. Try to find the user by clerkId
    // 2. If not found, create them.
    const dbUser = await prisma.user.upsert({
      where: { clerkId: authUser.id },
      update: {
        email: authUser.email, // Keep email in sync
      },
      create: {
        clerkId: authUser.id,
        email: authUser.email,
        // ✅ UPDATED: Matching your new schema fields
        tier: "STARTER",        // Formerly 'plan: "FREE"'
        dailyUsageCount: 0,     // Formerly 'usageCount'
        lastUsageReset: new Date(),
        activeTaskCount: 0,
      },
    });

    return dbUser;
  } catch (error) {
    console.error("Error in getDbUser:", error);
    return null;
  }
};