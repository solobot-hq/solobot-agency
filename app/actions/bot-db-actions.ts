"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// ✅ CRITICAL: Using an explicit named export for Turbopack resolution
export const deployBotToDb = async (name: string, type: string, desc: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const newBot = await prisma.bot.create({
      data: {
        userId,
        name,
        type,
        desc,
        status: "Idle",
      },
    });

    revalidatePath("/dashboard/workspace");
    return { success: true, bot: newBot };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to deploy bot." };
  }
};

export async function getUserBots() {
  const { userId } = await auth();
  if (!userId) return [];
  try {
    return await prisma.bot.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    return [];
  }
}