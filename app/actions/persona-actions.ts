// 📄 Location: app/actions/persona-actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function saveAgentPersona(botId: string, data: {
  systemPrompt: string;
  riskLevel: string;
  capabilities: string[];
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    // 🧠 ATOMIC UPSERT: One command to handle create or update
    await prisma.agentPersona.upsert({
      where: { botId },
      update: {
        systemPrompt: data.systemPrompt,
        riskLevel: data.riskLevel,
        capabilities: data.capabilities,
      },
      create: {
        botId,
        systemPrompt: data.systemPrompt,
        riskLevel: data.riskLevel,
        capabilities: data.capabilities,
      },
    });

    // 📜 LOG THE CONFIG CHANGE
    await prisma.activity.create({
      data: {
        userId,
        botId,
        action: "PERSONA_CONFIG_UPDATED",
        type: "INFO",
        metadata: { riskLevel: data.riskLevel }
      }
    });

    revalidatePath(`/dashboard/bots/${botId}`);
    return { success: true };
  } catch (error) {
    console.error("PERSONA_SAVE_ERROR:", error);
    return { success: false, error: "Failed to sync persona to core." };
  }
}