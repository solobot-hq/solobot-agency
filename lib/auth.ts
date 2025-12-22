// lib/auth.ts
import { currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";

export const getAuthUser = async () => {
  const user = await currentUser();

  if (!user || !user.emailAddresses?.length) {
    return null;
  }

  return {
    email: user.emailAddresses[0].emailAddress,
  };
};

export const getDbUser = async () => {
  const authUser = await getAuthUser();
  if (!authUser) return null;

  // Containment Mode: Use email for lookup since clerkId isn't in schema yet
  let dbUser = await prisma.user.findUnique({
    where: { email: authUser.email },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        email: authUser.email,
        plan: "FREE",
        usageCount: 0,
      },
    });
  }

  return dbUser;
};