import { currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";

export const getAuthUser = async () => {
  const user = await currentUser();
  
  if (!user || !user.id) {
    return null;
  }

  return {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress,
  };
};

export const getDbUser = async () => {
  const authUser = await getAuthUser();
  if (!authUser) return null;

  let dbUser = await prisma.user.findUnique({
    where: { clerkId: authUser.id }
  });

  // Lazy creation: If user doesn't exist in DB, create them now
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        clerkId: authUser.id,
        email: authUser.email || "",
        plan: "FREE",
        usageCount: 0,
        usagePeriodStart: new Date(),
      }
    });
  }

  return dbUser;
};