// 📄 Location: app/actions/terminal-actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

/**
 * 🛰️ SYSTEM LOG FETCHER (CORE ENGINE)
 * Optimized for high-frequency polling. 
 * Provides the "Neural Feed" for the System Terminal.
 */
export async function getLatestSystemLogs(limit: number = 10) {
  // 1. Identity Resolution (Server-Side)
  // Ensures logs are only visible to the authenticated owner.
  const { userId } = await auth();
  if (!userId) {
    console.warn("TERMINAL_FETCH_UNAUTHORIZED: No active session.");
    return [];
  }

  try {
    // 2. Optimized Prisma Query
    // We only select the fields needed for the terminal to reduce payload size.
    const logs = await prisma.activity.findMany({
      where: { 
        userId: userId 
      },
      orderBy: { 
        createdAt: 'desc' 
      },
      take: limit,
      include: {
        bot: {
          select: { 
            name: true 
          }
        }
      }
    });

    // 3. Serialization for the Client
    // Standardizing the output format for the Terminal UI.
    return logs.map(log => ({
      id: log.id,
      timestamp: log.createdAt.toISOString(),
      message: log.action,
      type: log.type, // SUCCESS, WARNING, ERROR, INFO
      target: log.bot?.name || "SYSTEM"
    }));
  } catch (error) {
    // 4. Defensive Error Handling
    console.error("PRISMA_TERMINAL_FETCH_ERR:", error);
    // Return empty array on failure to prevent UI crashes.
    return [];
  }
}