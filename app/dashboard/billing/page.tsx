"use client";

import React, { useState } from "react";
import { AVAILABLE_PLANS } from "@/lib/billing/plans";
import { usageData } from "@/lib/usage/usage";

export default function BillingPage() {
  const [interval, setInterval] = useState<"monthly" | "yearly">("monthly");
  const currentPlanId = usageData.plan;

  return (
    <div className="p-8 max-w-6xl space-y-12 animate-in fade-in duration-500">
      {/* 1. Header with Discount Indicator */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black text-white tracking-tight lowercase">billing</h1>
            <span className="text-[10px] font-black bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded-md uppercase tracking-widest">
              10% off yearly
            </span>
          </div>
          <p className="text-zinc-500 font-medium lowercase">manage subscription and infrastructure caps.</p>
        </div>

        {/* 2. Workspace Toggle Component */}
        <div className="flex gap-1 bg-zinc-900/80 p-1.5 rounded-xl border border-white/[0.05]">
          {(["monthly", "yearly"] as const).map((t) => (
            <button 
              key={t}
              onClick={() => setInterval(t)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                interval === t ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Interactive Plan Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {AVAILABLE_PLANS.map((plan) => (
          <div 
            key={plan.id} 
            className={`p-8 rounded-[2rem] border transition-all duration-500 flex flex-col justify-between ${
              plan.id === currentPlanId 
                ? "bg-indigo-500/[0.02] border-indigo-500/40" 
                : "bg-zinc-900/20 border-white/[0.05]"
            }`}
          >
            <div>
              <h3 className="text-xl font-bold text-white lowercase tracking-tight">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-4xl font-black text-white tracking-tighter">
                  £{interval === "monthly" ? plan.pricing.monthly : plan.pricing.yearly}
                </span>
                <span className="text-zinc-600 font-bold text-sm lowercase">/mo</span>
              </div>
              
              <ul className="mt-8 space-y-4 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-sm font-medium text-zinc-400 lowercase flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              disabled={plan.id === currentPlanId}
              className={`mt-10 w-full py-4 rounded-2xl text-sm font-bold transition-all ${
                plan.id === currentPlanId 
                  ? "bg-zinc-800/50 text-zinc-600 cursor-default" 
                  : "bg-white text-black hover:bg-zinc-200 active:scale-[0.98]"
              }`}
            >
              {plan.id === currentPlanId ? "currently active" : "start building now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}