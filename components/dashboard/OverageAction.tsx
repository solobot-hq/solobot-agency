"use client";

import React from "react";
import { Zap, CreditCard, Info } from "lucide-react";

interface OverageActionProps {
  usage: number;
  limit: number;
}

export default function OverageAction({ usage, limit }: OverageActionProps) {
  const isCapped = usage >= limit;

  return (
    <div className={`p-6 rounded-[2rem] border transition-all ${
      isCapped ? "bg-red-500/10 border-red-500/20" : "bg-zinc-900/50 border-zinc-800"
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Zap className={`w-5 h-5 ${isCapped ? "text-red-400" : "text-indigo-400"}`} />
          <h3 className="text-sm font-black text-white uppercase tracking-widest">
            {isCapped ? "Daily Limit Reached" : "Daily Capacity"}
          </h3>
        </div>
        <span className="text-xs font-bold text-zinc-500">{usage} / {limit} Runs</span>
      </div>

      <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
        {isCapped 
          ? "Your bot has paused to protect your account. Purchase a top-up to resume immediately." 
          : "Stay ahead of your limits. Purchase emergency runs for high-volume days."}
      </p>

      <button className="w-full group relative flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-black text-xs transition-all hover:bg-zinc-200 active:scale-95">
        <CreditCard className="w-4 h-4" />
        BUY 100 EXTRA RUNS — £15
        
        {/* Transparent Renewal Nudge */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-2 bg-indigo-600 text-white text-[9px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
          <Info className="inline w-3 h-3 mr-1" /> OR UPGRADE FOR 10% OFF YEAR 1
        </div>
      </button>
    </div>
  );
}