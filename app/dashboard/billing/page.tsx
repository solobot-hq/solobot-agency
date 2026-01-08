"use client";

import React, { useState } from "react";
import { AVAILABLE_PLANS } from "@/lib/billing/plans";
import { usageData } from "@/lib/usage/usage";
import { STRIPE_PRICE_IDS } from "@/config/stripe";

export default function BillingPage() {
  const [interval, setInterval] = useState<"monthly" | "yearly">("monthly");
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);
  const currentPlanId = usageData.plan;

  /**
   * PHASE 3.1 — Surgical Frontend CTA Wiring
   * Sends the untrusted priceId and interval to the server for validation.
   */
  const handleCheckout = async (priceId: string, requestedInterval: "monthly" | "yearly") => {
    setLoadingPriceId(priceId);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, interval: requestedInterval }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Checkout failed");
      }

      const { url } = await response.json();
      // standard redirect for external Stripe-hosted transitions
      window.location.assign(url);
    } catch (error) {
      console.error("Checkout error:", error);
      setLoadingPriceId(null);
    }
  };

  return (
    <div className="p-8 max-w-4xl space-y-10 animate-in fade-in duration-500">
      {/* 1. Header with Workspace Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight lowercase">billing</h1>
          <p className="text-zinc-500 mt-2 font-medium lowercase">plan specifications and current subscription status.</p>
        </div>

        {/* Toggle - Exact Workspace Component with Dynamic State */}
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

      {/* 2. Workspace Tiles - bg-[#111827] with Dynamic Interval Labels */}
      <div className="space-y-4">
        {AVAILABLE_PLANS.map((plan) => {
          // Resolve Price ID from locked configuration
          const priceId = STRIPE_PRICE_IDS[plan.id as keyof typeof STRIPE_PRICE_IDS][interval];
          const isCurrentPlan = plan.id === currentPlanId;

          return (
            <div 
              key={plan.id} 
              className={`flex items-center justify-between p-8 rounded-xl border transition-all ${
                isCurrentPlan 
                  ? "bg-[#111827] border-white/[0.12] shadow-xl shadow-indigo-500/5" 
                  : "bg-[#111827]/80 border-white/[0.04]"
              }`}
            >
              {/* Left: Tier and Corrected Dynamic Pricing */}
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-zinc-300 lowercase">
                  {plan.name} plan
                </h3>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white tracking-tight">
                      {/* 🟢 Logic Update: Display total annual cost if yearly selected */}
                      £{interval === "monthly" ? plan.pricing.monthly : plan.pricing.yearly * 12}
                    </span>
                    {/* 🟢 String Update: Explicit suffixes per specification */}
                    <span className="text-xs font-bold text-zinc-500 lowercase">
                      {interval === "monthly" ? "/month" : "per year"}
                    </span>
                  </div>
                  
                  {/* 🟢 Logic Update: Added discount helper text */}
                  {interval === "yearly" && (
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-tight mt-1">
                      £{plan.pricing.yearly}/mo equivalent (10% discount)
                    </p>
                  )}
                </div>
              </div>

              {/* Right: Capacity and Status / Action */}
              <div className="flex items-center gap-12 text-right">
                <div className="hidden md:block">
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">capacity</p>
                  <p className="text-sm font-bold text-zinc-400 lowercase">{plan.features[0]}</p>
                </div>

                {isCurrentPlan ? (
                  <span className="text-[10px] font-black px-3 py-1.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase">
                    ACTIVE
                  </span>
                ) : (
                  <button
                    disabled={!!loadingPriceId}
                    onClick={() => handleCheckout(priceId, interval)}
                    className="text-[10px] font-black px-6 py-2 rounded bg-white text-black hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
                  >
                    Select Plan
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Footer Metadata */}
      <div className="pt-8 border-t border-white/[0.05] flex justify-between items-center text-[10px] font-mono uppercase tracking-tighter text-zinc-600">
        <div className="flex gap-8">
          <span>billing_provider: stripe</span>
          <span>currency: gbp</span>
        </div>
        <div className="lowercase italic opacity-50">
          selected interval: {interval}
        </div>
      </div>
    </div>
  );
}