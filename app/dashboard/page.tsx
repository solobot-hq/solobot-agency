import React from "react";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

// UI Components
import { DeployButton } from "@/components/dashboard/DeployButton";
import { UsageChart } from "@/components/usage-chart";
import { DynamicCreditCard } from "@/components/dynamic-credit-card";
import { SystemTerminal } from "@/components/system-terminal";

export default async function OverviewPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  let userProfile;

  /**
   * ✅ STABLE INITIALIZATION
   * We avoid redirects here. If the DB is cold, we show a fallback UI.
   * This prevents the infinite 307 redirect loop.
   */
  try {
    userProfile = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        email: user.emailAddresses[0]?.emailAddress,
      },
      create: {
        clerkId: userId,
        email: user.emailAddresses[0]?.emailAddress || "",
        tier: "FREE",
        creditsTotal: 10,
        creditsUsed: 0,
      },
    });
  } catch (error) {
    console.error("⏳ Database cold start or Env missing - Rendering Fallback");

    // This UI replaces the "redirect" to stop the loop
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050914] text-white">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
          <div className="text-xl font-bold tracking-tighter uppercase">Waking up Engine...</div>
          <p className="text-zinc-500 text-xs font-mono max-w-xs mx-auto">
            The database is initializing. If this persists, verify your .env.local encoding is UTF-8.
          </p>
        </div>
      </div>
    );
  }

  // Safe Parallel Data Fetching
  const [dbBots, logs] = await Promise.all([
    prisma.bot.findMany({
      where: { userId: userProfile.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.activity.findMany({
      where: { userId: userProfile.id },
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { bot: true },
    }),
  ]).catch(() => [[], []]);

  return (
    <div className="pt-16 pb-40 space-y-12 max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-start">
        <h1 className="text-4xl font-black text-white lowercase">
          Welcome, {user?.firstName || "agent"}
        </h1>
        <DeployButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#0D1525] p-8 rounded-[2rem] border border-white/5 shadow-2xl">
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
            Active Nodes
          </p>
          <h3 className="text-3xl font-bold text-white mt-3">
            {dbBots.length}
          </h3>
        </div>

        <DynamicCreditCard
          total={userProfile.creditsTotal}
          used={userProfile.creditsUsed || 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <SystemTerminal />
          <div className="bg-[#0D1525] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <UsageChart />
          </div>
        </div>

        <div className="bg-[#0D1525] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl flex flex-col h-full">
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-10">
            Audit Log
          </h3>

          <div className="space-y-6">
            {logs && logs.length > 0 ? (
              logs.map((log: any) => (
                <div key={log.id} className="text-sm text-zinc-300">
                  <span className="text-indigo-400 font-bold">
                    {log.action}
                  </span>{" "}
                  / {log.bot?.name || "System"}
                </div>
              ))
            ) : (
              <p className="text-xs text-zinc-600 uppercase font-black tracking-widest">
                Awaiting signals…
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}