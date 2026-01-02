"use server";
import { logActivity } from "@/lib/activity-log";

export async function recordBotEvent(action: string, botName: string, type: "success" | "info") {
  await logActivity({ action, botName, type });
}