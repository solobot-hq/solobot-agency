import { auth, clerkClient } from "@clerk/nextjs/server";

export type ActivityLog = {
  id: string;
  action: string;
  botName: string; // Renamed from target to botName for dashboard consistency
  type: "success" | "info" | "error"; // Aligned with our Toast/Overview theme
  timestamp: string;
};

export async function logActivity({ action, botName, type }: Omit<ActivityLog, "id" | "timestamp">) {
  const { userId } = await auth();
  if (!userId) return;

  // ✅ Clerk v5 Compatibility: Await the client instance
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  
  // ✅ Safe metadata guard to ensure we have an array
  const existingLogs = Array.isArray(user.publicMetadata?.activityLogs)
    ? (user.publicMetadata.activityLogs as ActivityLog[])
    : [];

  const newLog: ActivityLog = {
    id: Math.random().toString(36).substring(2, 9),
    action,
    botName,
    type, 
    timestamp: new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }),
  };

  // Keep only the most recent 10 events to stay within metadata limits
  const updatedLogs = [newLog, ...existingLogs].slice(0, 10);

  // ✅ Update persistent metadata via Clerk
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      activityLogs: updatedLogs,
    },
  });
}