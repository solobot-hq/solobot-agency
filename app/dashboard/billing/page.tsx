"use client";

import React from "react";
import { AVAILABLE_PLANS } from "@/lib/billing/plans";
import { usageData } from "@/lib/usage/usage";
import { CreditCard, CheckCircle2 } from "lucide-react";

export default function BillingPage() {
  const currentPlanId = usageData.plan;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 p-8">
      {/* 1. Header — Matching Workspace Heading Hierarchy */}
      <div>
        <h1 className="text-4xl font-bold text-white tracking-tight">Billing</h1>
        <p className="text-zinc-500 mt-2 font-medium">Manage subscription and infrastructure caps.</p>
      </div>

      {/* 2. Plan Tiles — Matching Workspace Card Style and Spacing */}
      <div className="space-y-4">
        {AVAILABLE_PLANS.map((plan) => (
          <div 
            key={plan.id} 
            className={`bg-[#111827] border rounded-[2rem] p-8 flex items-center justify-between group transition-all ${
              plan.id === currentPlanId ? "border-indigo-500 shadow-xl shadow-indigo-500/5" : "border-zinc-800 hover:border-zinc-700"
            }`}
          >
            <div className="flex items-center gap-6">
              {/* Restored Workspace Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <CreditCard className={`w-5 h-5 ${plan.id === currentPlanId ? 'text-indigo-400' : 'text-zinc-500'}`} />
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {plan.name} Plan
                </h3>
                <p className="text-sm text-zinc-500 font-medium">
                  £{plan.pricing.monthly} per month
                </p>
              </div>
            </div>

            {/* Right-side Plan Details and Status */}
            <div className="flex items-center gap-12">
              <div className="hidden md:flex flex-col items-end">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Infrastucture Cap</p>
                <p className="text-sm font-bold text-zinc-300">{plan.features[0]}</p>
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

      {/* 3. Footer Metadata — Utilitarian and Boring */}
      <div className="pt-8 border-t border-white/[0.05] flex gap-8 text-[10px] font-mono uppercase tracking-tighter text-zinc-600">
        <div>billing_provider: pending</div>
        <div>currency: gbp</div>
      </div>
    </div>
  );
}