"use client";

import React from "react";
import { Zap } from "lucide-react";
import { useUsage } from "@/app/context/usage-context";

export function DynamicCreditCard() {
  const { creditsUsed } = useUsage();

  return (
    <div className="bg-[#111827] border border-zinc-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-all group shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">Credits Usage</p>
          <h3 className="text-2xl font-bold text-white mt-2 tracking-tight">
            {creditsUsed.toLocaleString()} <span className="text-zinc-600 text-sm">/ 50k</span>
          </h3>
        </div>
        <div className="p-3 rounded-xl bg-amber-500/10 group-hover:scale-110 transition-transform">
          <Zap className="w-5 h-5 text-amber-400" />
        </div>
      </div>
      {/* Visual progress bar */}
      <div className="mt-4 h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
        <div 
          className="h-full bg-amber-500 transition-all duration-1000 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
          style={{ width: `${(creditsUsed / 50000) * 100}%` }}
        />
      </div>
    </div>
  );
}