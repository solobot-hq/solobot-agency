# 1. git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean

# 2. git diff
(empty - working tree is clean)

# 3. git show --stat
commit d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3
Author: Developer <dev@solobotagency.com>
Date:   Tue Jan 6 15:10:00 2026 +0000

    chore: restore approved pricing UI with toggle and wire CTA links

 components/Pricing.tsx | 4 ++--
 1 file changed, 2 insertions(+), 2 deletions(-)

# 4. git show HEAD:components/Pricing.tsx
"use client";

import React, { useState } from "react";
import { Check, Info } from "lucide-react";
import Link from "next/link";

const PLAN_LIMITS = {
  STARTER: { monthlyPrice: 29, yearlyPrice: 26, runsPerDay: 20, concurrency: 1, target: "Solo Operators", autonomy: "Human-Reviewed Execution" },
  PRO: { monthlyPrice: 99, yearlyPrice: 89, runsPerDay: 150, concurrency: 3, target: "Growing Agencies", autonomy: "Semi-Autonomous Operation" },
  PRO_MAX: { monthlyPrice: 249, yearlyPrice: 224, runsPerDay: 600, concurrency: 10, target: "Enterprise Scale", autonomy: "Full Operational Autonomy" }
};

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

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
          {Object.entries(PLAN_LIMITS).map(([key, plan]) => (
            <div key={key} className={`relative flex flex-col p-8 rounded-[2rem] border transition-all duration-300 ${key === 'PRO' ? 'bg-[#0D1525] border-indigo-500/40 shadow-2xl shadow-indigo-500/10 scale-[1.01]' : 'bg-[#0D1525] border-white/5 hover:border-white/10'}`}>
              {key === 'PRO' && <div className="absolute top-4 right-8"><span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-[9px] font-black uppercase tracking-widest border border-indigo-500/30">Popular</span></div>}
              <div className="mb-6"><p className="text-[9px] font-black tracking-[0.2em] text-indigo-400 uppercase mb-1">{plan.target}</p><h3 className="text-xl font-black uppercase tracking-tight text-white">{key.replace('_', ' ')}</h3></div>
              <div className="flex items-baseline gap-1 mb-8 text-white"><span className="text-5xl font-black tracking-tighter">£{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span><span className="text-zinc-500 font-bold text-xs tracking-widest uppercase">/mo</span></div>
              <div className="space-y-4 mb-10 flex-1">
                {[ { label: `${plan.runsPerDay} Daily Runs`, sub: "Infrastructure Cap" }, { label: `${plan.concurrency} Concurrent Thread`, sub: "Processing Limit" }, { label: plan.autonomy, sub: "Control Level" } ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-indigo-500/20 flex items-center justify-center"><Check className="w-2.5 h-2.5 text-indigo-400" /></div>
                    <div><p className="text-sm font-bold text-zinc-200">{item.label}</p><p className="text-[9px] text-zinc-600 uppercase font-black tracking-tighter">{item.sub}</p></div>
                  </div>
                ))}
              </div>
              <Link href="/sign-up" className={`block w-full py-4 rounded-xl text-center font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 ${key === 'PRO' ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20' : 'bg-white text-black hover:bg-zinc-200'}`}>Start Building Now</Link>
              <p className="mt-4 text-center text-[8px] text-zinc-500 font-bold uppercase tracking-widest italic opacity-50">1-day trial available</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}