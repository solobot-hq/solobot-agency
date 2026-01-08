// 🔒 STABLE BUILD — PHASE 4 INTEGRATED
// Location: app/dashboard/page.tsx

import React from "react";
import { auth, clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import {
  Zap,
  Bot,
  Activity,
  CheckCircle,
  Plus,
  Clock,
  Server,
  Database,
  Shield,
  Terminal,
  ArrowUpRight
} from "lucide-react";
import { ActivityLog } from "@/lib/activity-log";
import { UsageChart } from "@/components/usage-chart";
import { DynamicCreditCard } from "@/components/dynamic-credit-card";
import { SystemTerminal } from "@/components/system-terminal";
import { getUserBots } from "@/app/actions/bot-db-actions";
import SubscriptionStatus from "@/components/dashboard/SubscriptionStatus";

export default async function OverviewPage() {
  const { userId } = await auth();
  const client = await clerkClient();
  const user = userId ? await client.users.getUser(userId) : null;
  
  // ✅ REAL DATA FETCHING
  const dbBots = await getUserBots();
  const activeBotCount = dbBots?.length || 0; 
  const logs = (user?.publicMetadata?.activityLogs as ActivityLog[]) || [];

  /**
   * PHASE 4 DATA MAPPING
   * Sourced from database state synced via Stripe Webhooks (Phase 2 Step 4)
   * Metadata structure matches the SubscriptionStatus component requirements.
   */
  const subscriptionData = (user?.publicMetadata?.subscription as any) || null;

  return (
    <div className="pt-16 pb-40 space-y-12 animate-in fade-in duration-700 min-h-screen">
      
      {/* 1. HEADER - Corrected Placement for Phase 4 Component */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Welcome back, {user?.firstName || "solobot"}
          </h1>
          <p className="text-zinc-500 mt-2 font-medium">Monitoring your autonomous agency performance.</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* 🟢 Phase 4: Read-only Subscription Mirror */}
          <div className="w-full md:w-80">
            <SubscriptionStatus subscription={subscriptionData} />
          </div>

          <Link 
            href="/dashboard/workspace" 
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl text-sm font-black transition-all shadow-lg shadow-indigo-600/30 active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" /> START NEW PROJECT
          </Link>
        </div>
      </div>

      {/* 2. KPI STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Bots", value: activeBotCount, icon: Bot, color: "text-indigo-400", bg: "bg-indigo-500/10" },
          { label: "Running Tasks", value: "4", icon: Activity, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Success Rate", value: "92%", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#111827] border border-zinc-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-all group shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white mt-2 tracking-tight">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
        <DynamicCreditCard />
      </div>

      {/* 3. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <div className="lg:col-span-2 space-y-8 flex flex-col">
          <div className="flex-1">
            <SystemTerminal />
          </div>

          <div className="bg-[#111827] border border-zinc-800 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Usage Trends</h3>
                <p className="text-sm text-zinc-500 font-medium mt-1">Live execution intensity across the fleet.</p>
              </div>
            </div>
            <UsageChart /> 
          </div>
        </div>

        {/* 4. RECENT ACTIVITY SIDEBAR */}
        <div className="bg-[#111827] border border-zinc-800 rounded-[2.5rem] p-8 shadow-xl flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black text-zinc-500 uppercase tracking-[0.2em]">Recent Activity</h3>
            <Activity className="w-4 h-4 text-zinc-600" />
          </div>

          <div className="space-y-8 flex-1">
            {logs.length > 0 ? (
              logs.map((log) => (
                <div key={log.id} className="flex gap-4 group">
                  <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                    log.type === "success" 
                      ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" 
                      : "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.4)]"
                  }`} />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white leading-tight group-hover:text-indigo-400 transition-colors">
                      {log.action}: <span className="text-zinc-500">{log.botName}</span>
                    </p>
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                      <Clock className="w-3 h-3" /> {log.timestamp}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-4 text-zinc-700">
                  <Clock className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">No recent critical events.</p>
              </div>
            )}
          </div>

          <button className="w-full mt-8 py-4 border border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white hover:bg-zinc-800/50 transition-all flex items-center justify-center gap-2 group">
            View Full Audit Log <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* 5. INFRASTRUCTURE STATUS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-t border-zinc-800 pt-10">
        {[
          { name: "API Gateway", status: "Operational", color: "bg-emerald-500", icon: Server },
          { name: "Agent Workers", status: "Operational", color: "bg-emerald-500", icon: Bot },
          { name: "Vector DB", status: "Warning", color: "bg-yellow-500", icon: Database },
          { name: "Encryption", status: "Protected", color: "bg-emerald-500", icon: Shield }
        ].map((item, i) => (
          <div key={i} className="bg-zinc-900/40 p-5 rounded-2xl flex items-center justify-between border border-transparent hover:border-zinc-800 transition-all cursor-default">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-zinc-800/80 rounded-xl shadow-inner">
                <item.icon className="w-4 h-4 text-zinc-400" />
              </div>
              <div>
                <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">{item.name}</h4>
                <p className="text-xs font-bold text-zinc-200 mt-1">{item.status}</p>
              </div>
            </div>
            <div className={`w-2.5 h-2.5 rounded-full ${item.color} shadow-[0_0_12px_rgba(0,0,0,0.5)] animate-pulse`} />
          </div>
        ))}
      </div>
    </div>
  );
}