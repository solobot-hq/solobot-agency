"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Terminal, 
  Activity, 
  Cpu, 
  BarChart3, 
  Play, 
  Square,
  Settings,
  History,
  LayoutDashboard,
  ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BotDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  
  // Tabs: Overview (Default) | Logs | Config
  const [activeTab, setActiveTab] = useState<"overview" | "logs" | "config">("overview");

  const botDetail = {
    name: "Sales Outreach Bot",
    status: "Running",
    uptime: "4h 12m",
    tasksCompleted: 842,
    efficiency: "98.2%",
    failureReason: null, // Placeholder for "Failed" status
    config: {
      model: "GPT-4o",
      speed: "Balanced",
      source: "LinkedIn + Apollo",
      maxCredits: "5,000 / day"
    },
    logs: [
      { time: "10:12:05", msg: "Connecting to API gateway...", type: "info" },
      { time: "10:12:08", msg: "User session: ACTIVE.", type: "success" },
      { time: "10:13:42", msg: "Scraping profile: tech-lead-01", type: "info" },
      { time: "10:14:02", msg: "Outreach sequence queued.", type: "success" },
    ]
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HEADER & ACTIONS */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-8">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => router.back()}
            className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">{botDetail.name}</h1>
            <div className="flex items-center gap-3 mt-1 text-[10px] font-black uppercase tracking-widest">
               <span className="text-zinc-500">ID: {id}</span>
               <div className="h-1 w-1 rounded-full bg-zinc-700" />
               <span className={cn(
                 botDetail.status === "Running" ? "text-emerald-400" : "text-amber-400"
               )}>{botDetail.status}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-400 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-500/10 hover:text-red-400 transition-all">
            <Square className="w-4 h-4 fill-current" /> Terminate
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">
            <Play className="w-4 h-4 fill-current" /> Restart
          </button>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex gap-8 border-b border-zinc-800/50">
        {[
          { id: "overview", label: "Overview", icon: LayoutDashboard },
          { id: "logs", label: "Live Logs", icon: History },
          { id: "config", label: "Configuration", icon: Settings },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 pb-4 text-[10px] font-black uppercase tracking-widest transition-all relative",
              activeTab === tab.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
            )}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="min-h-[400px]">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-left-4 duration-500">
            {[
              { label: "Uptime", value: botDetail.uptime, icon: Activity, color: "text-indigo-400" },
              { label: "Tasks", value: botDetail.tasksCompleted, icon: Cpu, color: "text-blue-400" },
              { label: "Efficiency", value: botDetail.efficiency, icon: BarChart3, color: "text-emerald-400" },
            ].map((metric, i) => (
              <div key={i} className="bg-[#111827] border border-zinc-800 p-8 rounded-[2rem] shadow-xl">
                <metric.icon className={cn("w-6 h-6 mb-4", metric.color)} />
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{metric.label}</p>
                <p className="text-3xl font-black text-white mt-1">{metric.value}</p>
              </div>
            ))}
            
            {/* Failure Reason Placeholder */}
            {botDetail.status === "Failed" && (
              <div className="md:col-span-3 bg-red-500/5 border border-red-500/20 p-6 rounded-2xl flex items-start gap-4">
                <ShieldAlert className="w-6 h-6 text-red-500 shrink-0" />
                <div>
                  <h4 className="text-sm font-black text-red-500 uppercase tracking-widest">Execution Halted</h4>
                  <p className="text-zinc-400 text-sm mt-1">API rate limit exceeded on secondary scraper module. System cooling down for 15 minutes.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "logs" && (
          <div className="bg-black border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="p-8 font-mono space-y-4">
              {botDetail.logs.map((log, i) => (
                <div key={i} className="flex gap-6 text-sm">
                  <span className="text-zinc-600 shrink-0">[{log.time}]</span>
                  <span className={cn(
                    "tracking-tight",
                    log.type === "success" ? "text-emerald-500" : "text-zinc-400"
                  )}>{log.msg}</span>
                </div>
              ))}
              <div className="flex gap-6 text-sm animate-pulse text-indigo-400">
                <span className="text-zinc-600 shrink-0">[{new Date().toLocaleTimeString()}]</span>
                <span className="font-bold tracking-tight">Listening for events...</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "config" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-left-4 duration-500">
            {Object.entries(botDetail.config).map(([key, value], i) => (
              <div key={i} className="bg-[#111827] border border-zinc-800 p-8 rounded-[2rem] shadow-xl">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{key}</p>
                <p className="text-xl font-bold text-white mt-2">{value}</p>
              </div>
            ))}
            <div className="md:col-span-2 p-8 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-[2rem] text-center">
              <p className="text-zinc-500 text-xs font-medium italic">Advanced configuration is read-only in Pro Agency tier.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}