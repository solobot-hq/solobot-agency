'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { auth } from "@clerk/nextjs/server"
// ✅ Fixed Import: Using absolute alias to prevent "Module not found" errors
import { deductCredits } from "@/app/actions/credit-actions" 

/**
 * 🚀 RECORD BOT EVENT
 * Exported to satisfy the Workspace requirements and Audit Log.
 */
export async function recordBotEvent(
  botId: string, 
  userId: string, 
  action: string, 
  type: string = "INFO",
  metadata: any = {}
) {
  try {
    const event = await prisma.activity.create({
      data: {
        botId,
        userId,
        action,
        type,
        metadata: {
          ...metadata,
          timestamp: new Date().toISOString()
        }
      },
    });
    
    revalidatePath('/dashboard');
    return { success: true, id: event.id };
  } catch (error) {
    console.error("❌ Failed to record bot event:", error);
    return { success: false };
  }
}

/**
 * 🚀 TOGGLE BOT STATUS (WITH CREDIT ENFORCEMENT)
 */
export async function toggleBotStatus(botId: string, isRunning: boolean) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    // 🛡️ PHASE 4A: CREDIT GATE
    if (isRunning) {
      const payment = await deductCredits(1);
      
      if (!payment.success) {
        await prisma.activity.create({
          data: {
            userId,
            botId,
            action: "EXECUTION_BLOCKED",
            type: "WARNING",
            metadata: { reason: "Insufficient balance to initialize node." }
          }
        });
        return { success: false, error: "Insufficient credits" };
      }
    }

    const status = isRunning ? "Running" : "Idle";

    const result = await prisma.$transaction(async (tx) => {
      const updatedBot = await tx.bot.update({
        where: { id: botId, userId },
        data: { 
          isRunning,
          status,
          lastRun: new Date(),
        },
      });

      await tx.activity.create({
        data: {
          userId: updatedBot.userId, 
          botId: botId,
          action: isRunning ? "SYSTEM_INITIALIZED" : "SYSTEM_TERMINATED",
          type: isRunning ? "SUCCESS" : "WARNING",
          metadata: { 
            timestamp: new Date().toISOString(),
            creditsDeducted: isRunning ? 1 : 0 
          }
        }
      });

      return updatedBot;
    });

    revalidatePath(`/dashboard/bots/${botId}`, 'page');
    revalidatePath('/dashboard'); 
    
    return { success: true, status: result.status };
  } catch (error) {
    console.error("❌ Failed to toggle bot:", error);
    return { success: false, error: "Database transaction failed" };
  }
}

/**
 * 🚨 EMERGENCY KILL SWITCH
 */
export async function emergencyKillAll() {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    await prisma.$transaction([
      prisma.bot.updateMany({
        where: { userId, isRunning: true },
        data: { 
          isRunning: false, 
          status: "Terminated (Emergency)" 
        }
      }),
      prisma.activity.create({
        data: {
          userId,
          action: "GLOBAL_EMERGENCY_STOP_EXECUTED",
          type: "WARNING",
          metadata: { timestamp: new Date().toISOString() }
        }
      })
    ]);

    revalidatePath('/dashboard');
    revalidatePath('/dashboard/bots');
    
    return { success: true };
  } catch (error) {
    console.error("❌ Kill switch failed:", error);
    return { success: false, error: "System failure during termination" };
  }
}

/**
 * 📜 GET BOT LOGS
 */
export async function getBotLogs(botId: string) {
  try {
    const logs = await prisma.activity.findMany({
      where: { botId },
      orderBy: { createdAt: 'desc' },
      take: 15, 
    });

    const timeFormatter = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    });

    return logs.map(log => ({
      time: timeFormatter.format(new Date(log.createdAt)),
      msg: log.action,
      type: log.type === "SUCCESS" ? "emerald" : (log.type === "WARNING" ? "rose" : "zinc")
    }));
  } catch (error) {
    console.error("❌ Failed to fetch logs:", error);
    return [];
  }
}