"use client";

import React, { useState } from "react";
import { AVAILABLE_PLANS } from "@/lib/billing/plans";
import { usageData } from "@/lib/usage/usage";
import { CreditCard } from "lucide-react";

export default function BillingPage() {
  const [interval, setInterval] = useState<"monthly" | "yearly">("monthly");
  const currentPlanId = usageData.plan;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 p-8 max-w-6xl">
      {/* 1. Header with Restored Functional Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold text-white tracking-tight">Billing</h1>
            <span className="text-[10px] font-black bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded border border-indigo-500/20 uppercase tracking-widest">
              10% off yearly
            </span>
          </div>
          <p className="text-zinc-500 mt-2 font-medium">Manage subscription and infrastructure caps.</p>
        </div>

        {/* Canonical Workspace Toggle Component */}
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

      {/* 2. Premium Plan Rows — Matching Workspace Visual Ceiling */}
      <div className="space-y-4">
        {AVAILABLE_PLANS.map((plan) => (
          <div 
            key={plan.id} 
            className={`bg-[#111827] border rounded-[2rem] p-8 flex items-center justify-between group transition-all ${
              plan.id === currentPlanId ? "border-indigo-500 shadow-xl shadow-indigo-500/5" : "border-zinc-800 hover:border-zinc-700"
            }`}
          >
            <div className="flex items-center gap-6">
              {/* Restored Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <CreditCard className={`w-5 h-5 ${plan.id === currentPlanId ? 'text-indigo-400' : 'text-zinc-500'}`} />
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {plan.name} Plan
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-white">
                    £{interval === "monthly" ? plan.pricing.monthly : plan.pricing.yearly}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-600 uppercase">/ month</span>
                </div>
              </div>
            </div>

            {/* Infrastructure Details & Status Pills */}
            <div className="flex items-center gap-12">
              <div className="hidden md:flex flex-col items-end">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1 text-right">Infrastructure Cap</p>
                <p className="text-sm font-bold text-zinc-300 lowercase text-right">{plan.features[0]}</p>
              </div>

              {plan.id === currentPlanId ? (
                <span className="px-5 py-2 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                  Current
                </span>
              ) : (
                <span className="px-5 py-2 rounded-full text-[10px] font-bold bg-zinc-500/5 text-zinc-600 border border-white/[0.05] uppercase tracking-widest">
                  Available
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Transaction History & Metadata Footer */}
      <div className="pt-8 border-t border-white/[0.05] flex justify-between items-center">
        <div className="flex gap-8 text-[10px] font-mono uppercase tracking-tighter text-zinc-600">
          <div>billing_provider: pending</div>
          <div>currency: gbp</div>
        </div>
        <div className="text-[10px] font-mono uppercase tracking-tighter text-zinc-600">
           no recent transactions found
        </div>
      </div>
    </div>
  );
}