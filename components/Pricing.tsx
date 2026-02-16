"use client";

import { Check } from "lucide-react";

export default function Pricing() {
  const PLAN_LINKS = {
    starter: "https://buy.stripe.com/dRmfZa8WNcgOetS2pT9k404",
    pro: "https://buy.stripe.com/cNi8wIflbeoW5XmggJ9k405",
    promax: "https://buy.stripe.com/6oU6oA2ypcgO99y6G99k407"
  };

  const handleRedirect = (url: string) => {
    if (!url) return;
    window.location.href = url;
  };

  const cardStyle = "relative bg-[#0D1525] rounded-2xl p-8 flex flex-col min-h-[500px] border border-white/10 transition-all duration-300 ease-in-out hover:border-2 hover:border-indigo-500 hover:scale-[1.05] hover:shadow-2xl hover:z-10 group";

  return (
    <section 
      id="pricing" 
      className="py-24 bg-[#0B1221] text-white overflow-hidden scroll-mt-32"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-4xl font-black mb-12 uppercase tracking-tighter">
          Select Your Plan
        </h2>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* STARTER */}
          <div className={cardStyle}>
            <h3 className="font-black text-xl text-indigo-400 uppercase">Starter</h3>
            <p className="text-5xl font-black mt-4">£29<span className="text-sm text-zinc-500">/mo</span></p>
            <ul className="mt-8 space-y-4 flex-1">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-500" /> 20 daily runs</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-500" /> 1 concurrent thread</li>
            </ul>
            <button onClick={() => handleRedirect(PLAN_LINKS.starter)} className="mt-10 w-full py-4 rounded-xl font-black uppercase text-[10px] tracking-widest bg-white text-black transition-all group-hover:bg-indigo-600 group-hover:text-white">
              Start Building Now
            </button>
          </div>

          {/* PRO */}
          <div className={`${cardStyle} border-2 border-indigo-500/50`}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">Most Popular</div>
            <h3 className="font-black text-xl text-indigo-400 uppercase">Pro</h3>
            <p className="text-5xl font-black mt-4">£99<span className="text-sm text-zinc-500">/mo</span></p>
            <ul className="mt-8 space-y-4 flex-1">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-500" /> 150 daily runs</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-500" /> 3 concurrent threads</li>
            </ul>
            <button onClick={() => handleRedirect(PLAN_LINKS.pro)} className="mt-10 w-full py-4 rounded-xl font-black uppercase text-[10px] tracking-widest bg-indigo-600 text-white transition-all group-hover:bg-indigo-500">
              Start Building Now
            </button>
          </div>

          {/* PRO MAX */}
          <div className={cardStyle}>
            <h3 className="font-black text-xl text-indigo-400 uppercase">Pro Max</h3>
            <p className="text-5xl font-black mt-4">£249<span className="text-sm text-zinc-500">/mo</span></p>
            <ul className="mt-8 space-y-4 flex-1">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-500" /> 600 daily runs</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-500" /> 10 concurrent threads</li>
            </ul>
            <button onClick={() => handleRedirect(PLAN_LINKS.promax)} className="mt-10 w-full py-4 rounded-xl font-black uppercase text-[10px] tracking-widest bg-white text-black transition-all group-hover:bg-indigo-600 group-hover:text-white">
              Start Building Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}