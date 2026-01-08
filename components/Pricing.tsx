"use client";

import React, { useState } from "react";
import { Check, Info } from "lucide-react";
import { AVAILABLE_PLANS } from "@/lib/billing/plans";
import { STRIPE_PRICE_IDS } from "@/config/stripe";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  /**
   * PHASE 3.1 — Surgical Frontend CTA Wiring
   * Communicates with the secure /api/checkout route.
   */
  const handleCheckout = async (priceId: string, interval: "monthly" | "yearly") => {
    setLoadingPriceId(priceId);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, interval }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Checkout failed");
      }

      const { url } = await response.json();
      window.location.assign(url);
    } catch (error) {
      console.error("Checkout error:", error);
      setLoadingPriceId(null);
    }
  };

  return (
    <section id="pricing" className="py-28 bg-[#0B1221] px-6 text-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-white">Pricing for Autonomy</h2>
          <p className="text-zinc-500 max-w-xl mx-auto font-bold mb-10 text-xs uppercase tracking-widest italic opacity-70">Infrastructure-Safe Pricing</p>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 bg-zinc-900/50 p-1.5 rounded-xl border border-zinc-800 w-fit">
              <button onClick={() => setIsYearly(false)} className={`px-6 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all ${!isYearly ? "bg-white text-black shadow-lg" : "text-zinc-500 hover:text-zinc-300"}`}>MONTHLY</button>
              <button onClick={() => setIsYearly(true)} className={`px-6 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all ${isYearly ? "bg-indigo-600 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"}`}>YEARLY</button>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-black text-indigo-400 uppercase tracking-widest italic">
              <Info className="w-2.5 h-2.5" /> <span>10% off first year only — renews at standard rate after 12 months</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {AVAILABLE_PLANS.map((plan) => {
            const interval = isYearly ? "yearly" : "monthly";
            const priceId = STRIPE_PRICE_IDS[plan.id as keyof typeof STRIPE_PRICE_IDS][interval];

            return (
              <div key={plan.id} className={`relative flex flex-col p-8 rounded-[2rem] border transition-all duration-300 ${plan.id === 'pro' ? 'bg-[#0D1525] border-indigo-500/40 shadow-2xl shadow-indigo-500/10 scale-[1.01]' : 'bg-[#0D1525] border-white/5 hover:border-white/10'}`}>
                {plan.id === 'pro' && <div className="absolute top-4 right-8"><span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-[9px] font-black uppercase tracking-widest border border-indigo-500/30">Popular</span></div>}
                
                <div className="mb-6">
                  {/* Features[1] stores the target audience label */}
                  <p className="text-[9px] font-black tracking-[0.2em] text-indigo-400 uppercase mb-1">{plan.features[1]}</p>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">{plan.id.replace('_', ' ')}</h3>
                </div>
                
                <div className="flex items-baseline gap-1 mb-1 text-white">
                  <span className="text-5xl font-black tracking-tighter">
                    £{isYearly ? plan.pricing.yearly * 12 : plan.pricing.monthly}
                  </span>
                  <span className="text-zinc-500 font-bold text-xs tracking-widest uppercase">
                    {isYearly ? "per year" : "/month"}
                  </span>
                </div>
                
                {isYearly && (
                  <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-tight mb-7">
                    £{plan.pricing.yearly}/mo equivalent (10% discount)
                  </p>
                )}
                {!isYearly && <div className="mb-7 h-[15px]" />}

                <div className="space-y-4 mb-10 flex-1">
                  {/* Features list mapping from authoritative AVAILABLE_PLANS source */}
                  {plan.features.slice(0, 3).map((feature, idx) => {
                     const subs = ["Infrastructure Cap", "Processing Limit", "Control Level"];
                     return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-indigo-500/20 flex items-center justify-center"><Check className="w-2.5 h-2.5 text-indigo-400" /></div>
                        <div>
                          <p className="text-sm font-bold text-zinc-200">{feature}</p>
                          <p className="text-[9px] text-zinc-600 uppercase font-black tracking-tighter">{subs[idx]}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button 
                  disabled={!!loadingPriceId}
                  onClick={() => handleCheckout(priceId, interval)}
                  className={`block w-full py-4 rounded-xl text-center font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${plan.id === 'pro' ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20' : 'bg-white text-black hover:bg-zinc-200'}`}
                >
                  Start Building Now
                </button>
                <p className="mt-4 text-center text-[8px] text-zinc-500 font-bold uppercase tracking-widest italic opacity-50">1-day trial available</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}