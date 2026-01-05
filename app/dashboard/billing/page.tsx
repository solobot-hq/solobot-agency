"use client";

import React, { useState } from "react";
import { AVAILABLE_PLANS } from "@/lib/billing/plans";
import { usageData } from "@/lib/usage/usage";

export default function BillingPage() {
  const [interval, setInterval] = useState<"monthly" | "yearly">("monthly");
  const currentPlanId = usageData.plan;

  return (
    <div className="p-8 max-w-4xl space-y-10 animate-in fade-in duration-500">
      {/* 1. Header with Restored Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight lowercase">billing</h1>
          <p className="text-zinc-500 mt-2 font-medium lowercase">plan specifications and current subscription status.</p>
        </div>

        {/* Restore Toggle — Workspace Alignment */}
        <div className="flex gap-1 bg-zinc-900/80 p-1 rounded-xl border border-white/[0.05]">
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

      {/* 2. Restored Tiles — Exact Workspace Color bg-[#111827] */}
      <div className="space-y-4">
        {AVAILABLE_PLANS.map((plan) => (
          <div 
            key={plan.id} 
            className={`flex items-center justify-between p-8 rounded-xl border transition-all ${
              plan.id === currentPlanId 
                ? "bg-[#111827] border-white/[0.08] shadow-xl" 
                : "bg-[#111827]/60 border-white/[0.04]"
            }`}
          >
            {/* Left: Tier and Dynamic Pricing */}
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white lowercase">
                {plan.name} plan
              </h3>
              <p className="text-sm text-zinc-500 font-mono">
                £{interval === "monthly" ? plan.pricing.monthly : plan.pricing.yearly} /mo
              </p>
            </div>

            {/* Right: Capacity and Status */}
            <div className="flex items-center gap-12 text-right">
              <div className="hidden md:block">
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">capacity</p>
                <p className="text-sm font-bold text-zinc-400 lowercase">{plan.features[0]}</p>
              </div>

              {plan.id === currentPlanId ? (
                <span className="text-[10px] font-black px-3 py-1.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase">
                  ACTIVE
                </span>
              ) : (
                <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">
                  AVAILABLE
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Administrative Footer */}
      <div className="pt-8 border-t border-white/[0.05] flex gap-8 text-[10px] font-mono uppercase tracking-tighter text-zinc-600">
        <div>billing_provider: pending</div>
        <div>currency: gbp</div>
      </div>
    </div>
  );
}