"use client";

import React from "react";
import { Zap, Activity, ShieldCheck, RefreshCcw } from "lucide-react";

export default function UsagePage() {
  const usageData = [
    { agent: "Sales Outreach Bot", tasks: 842, status: "RUNNING", load: "Optimal" },
    { agent: "SaaS Leads Engine", tasks: 124, status: "IDLE", load: "Minimal" },
    { agent: "Support Handler", tasks: 2105, status: "PAUSED", load: "High" },
    { agent: "Resume Parser Pro", tasks: 45, status: "FAILED", load: "N/A" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* 1. Page Header - Matching Workspace */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Usage</h1>
          <p className="text-zinc-500 mt-2 font-medium">System telemetry and execution logs.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl text-sm font-semibold transition-all active:scale-95">
          <RefreshCcw className="w-4 h-4" /> Refresh Data
        </button>
      </div>

      {/* 2. Top-level Telemetry Tiles - Matching Card Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Daily executions", val: "12,450", icon: Zap, color: "text-indigo-400" },
          { label: "Active threads", val: "18", icon: Activity, color: "text-emerald-400" },
          { label: "Success rate", val: "99.8%", icon: ShieldCheck, color: "text-amber-400" },
        ].map((item, i) => (
          <div key={i} className="bg-[#111827] border border-zinc-800 rounded-[2rem] p-8 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <p className="text-sm font-semibold text-zinc-500 mb-1">{item.label}</p>
            <p className="text-4xl font-bold text-white tracking-tight">{item.val}</p>
          </div>
        ))}
      </div>

      {/* 3. Detailed Breakdown - Workspace Card Style */}
      <div className="space-y-4">
        {usageData.map((row, i) => (
          <div 
            key={i} 
            className="bg-[#111827] border border-zinc-800 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between group hover:border-zinc-700 transition-all"
          >
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Activity className="w-5 h-5 text-zinc-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {row.agent}
                </h3>
                <p className="text-sm text-zinc-500 font-medium">Load Level: {row.load}</p>
              </div>
            </div>

            <div className="flex items-center gap-12 mt-6 md:mt-0 w-full md:w-auto justify-between md:justify-end">
              <div className="text-right">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Total Tasks</p>
                <p className="text-lg font-bold text-white tracking-tight">{row.tasks}</p>
              </div>
              
              {/* ✅ Status Badges - Matching Exact Workspace Patterns */}
              <span className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase border ${
                row.status === "RUNNING" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                row.status === "IDLE" ? "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" :
                row.status === "PAUSED" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                "bg-rose-500/10 text-rose-400 border-rose-500/20"
              }`}>
                {row.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}