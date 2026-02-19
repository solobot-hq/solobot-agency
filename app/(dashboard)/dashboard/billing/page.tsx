
"use client";

import React, { useState } from "react";
import { AVAILABLE_PLANS } from "@/lib/billing/plans";
import { usageData } from "@/lib/usage/usage";
import { STRIPE_PRICE_IDS } from "@/config/stripe";
import { Loader2, ExternalLink } from "lucide-react";

export default function BillingPage() {
  const [interval, setInterval] = useState<"monthly" | "yearly">("monthly");
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);
  const [isPortalLoading, setIsPortalLoading] = useState(false);
  
  // This comes from your local usage tracker / DB
  const currentPlanId = usageData.plan;

  /**
   * HANDLER: Initiate Stripe Checkout
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
      window.location.assign(url);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed. Please check your connection.");
      setLoadingPriceId(null);
    }
  };

  /**
   * HANDLER: Open Stripe Customer Portal
   */
  const handleManageBilling = async () => {
    setIsPortalLoading(true);
    try {
      const response = await fetch("/api/portal", { method: "POST" });
      const { url } = await response.json();
      if (url) window.location.assign(url);
    } catch (error) {
      console.error("Portal error:", error);
      setIsPortalLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      
      {/* 1. Header with Interval Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.05] pb-10">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight lowercase">billing</h1>
          <p className="text-zinc-500 mt-2 font-medium lowercase">plan specifications and current subscription status.</p>
        </div>

        <div className="flex gap-1 bg-zinc-900/80 p-1 rounded-xl border border-white/[0.05] h-fit">
          {(["monthly", "yearly"] as const).map((t) => (
            <button 
              key={t}
              onClick={() => setInterval(t)}
              className={`px-6 py-2 rounded-lg text-xs font-black transition-all uppercase tracking-widest ${
                interval === t ? "bg-zinc-800 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Plan Tiles */}
      <div className="grid grid-cols-1 gap-4">
        {AVAILABLE_PLANS.map((plan) => {
          const priceId = STRIPE_PRICE_IDS[plan.id as keyof typeof STRIPE_PRICE_IDS][interval];
          const isCurrentPlan = plan.id === currentPlanId;
          const isLoading = loadingPriceId === priceId;

          return (
            <div 
              key={plan.id} 
              className={`flex flex-col md:flex-row items-start md:items-center justify-between p-8 rounded-[2rem] border transition-all ${
                isCurrentPlan 
                  ? "bg-[#0D1525] border-indigo-500/50 shadow-2xl shadow-indigo-500/10" 
                  : "bg-[#0D1525]/40 border-white/[0.05] hover:border-white/[0.1]"
              }`}
            >
              {/* Left: Branding & Pricing */}
              <div className="space-y-1 mb-6 md:mb-0">
                <h3 className="text-lg font-bold text-zinc-400 lowercase flex items-center gap-2">
                  {plan.name} plan
                  {isCurrentPlan && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                </h3>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white tracking-tight">
                      £{interval === "monthly" ? plan.pricing.monthly : plan.pricing.yearly * 12}
                    </span>
                    <span className="text-xs font-bold text-zinc-500 lowercase">
                      {interval === "monthly" ? "/month" : "per year"}
                    </span>
                  </div>
                  
                  {interval === "yearly" && (
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter mt-1">
                      £{plan.pricing.yearly}/mo equivalent (10% discount applied)
                    </p>
                  )}
                </div>
              </div>

              {/* Center: Feature Hook */}
              <div className="hidden lg:block text-left px-8 border-l border-white/[0.05]">
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1">core feature</p>
                <p className="text-sm font-bold text-zinc-400 lowercase">{plan.features[0]}</p>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                {isCurrentPlan ? (
                  <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                    <div className="text-[10px] font-black px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase tracking-widest">
                      CURRENT SUBSCRIPTION
                    </div>
                    <button 
                      onClick={handleManageBilling}
                      disabled={isPortalLoading}
                      className="text-[10px] font-bold text-zinc-500 hover:text-white flex items-center gap-1 uppercase tracking-tighter transition-colors disabled:opacity-50"
                    >
                      {isPortalLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <ExternalLink className="w-3 h-3" />}
                      manage via stripe portal
                    </button>
                  </div>
                ) : (
                  <button
                    disabled={!!loadingPriceId}
                    onClick={() => handleCheckout(priceId, interval)}
                    className="w-full md:w-auto h-12 px-10 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "SELECT PLAN"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Footer Metadata */}
      <div className="pt-10 border-t border-white/[0.05] flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-zinc-600">
        <div className="flex gap-10">
          <span>gateway: stripe_clover</span>
          <span>region: uk_gbp</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3 h-3" /> secure encrypted checkout
        </div>
      </div>
    </div>
  );
}

// Minimal Icon helper
function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}