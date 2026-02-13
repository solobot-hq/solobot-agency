// 📄 Location: lib/runtime/agent-runtime.ts
import { prisma } from "@/lib/prisma";
import { deductCredits } from "@/app/actions/credit-actions";

/**
 * 🛡️ AGENT EXECUTION WRAPPER
 * Enforces atomic credit deduction before allowing any agent logic to proceed.
 * Use this for background tasks, cron jobs, and webhook handlers.
 */
export async function withCreditGuard<T>(
  userId: string,
  botId: string,
  taskLabel: string,
  agentTask: () => Promise<T>
): Promise<{ success: boolean; data?: T; error?: string }> {
  
  // 1. ATOMIC CREDIT CHECK
  // We call deductCredits directly. This uses a Prisma $transaction internally.
  const payment = await deductCredits(1); 

  if (!payment.success) {
    // 2. LOG THE AUTONOMOUS FAILURE
    await prisma.activity.create({
      data: {
        userId,
        botId,
        action: `AUTO_EXECUTION_BLOCKED: ${taskLabel}`,
        type: "WARNING",
        metadata: { 
          reason: "Insufficient credits for background task",
          triggeredBy: "system_scheduler" 
        }
      }
    });

    return { 
      success: false, 
      error: `Credit limit reached. Background task [${taskLabel}] aborted.` 
    };
  }

  // 3. EXECUTE THE ACTUAL AGENT LOGIC
  try {
    const result = await agentTask();
    
    // 4. LOG SUCCESSFUL START
    await prisma.activity.create({
      data: {
        userId,
        botId,
        action: `AUTO_EXECUTION_STARTED: ${taskLabel}`,
        type: "SUCCESS"
      }
    });

    return { success: true, data: result };
  } catch (err) {
    console.error(`AGENT_RUNTIME_CRASH [${botId}]:`, err);
    return { success: false, error: "Internal agent execution error" };
  }
}