// lib/auth.ts
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";

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

export const getDbUser = async () => {
  const authUser = await getAuthUser();
  if (!authUser) return null;

  try {
    // We use upsert to: 
    // 1. Try to find the user by clerkId
    // 2. If not found, create them.
    // This is much safer than findUnique + create.
    const dbUser = await prisma.user.upsert({
      where: { clerkId: authUser.id },
      update: {
        email: authUser.email, // Keep email in sync
      },
      create: {
        clerkId: authUser.id,
        email: authUser.email,
        plan: "FREE",
        usageCount: 0,
      },
    });

    return dbUser;
  } catch (error) {
    console.error("Error in getDbUser:", error);
    return null;
  }
};