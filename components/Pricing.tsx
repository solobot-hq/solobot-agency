"use client";

import { Check } from "lucide-react";

export default function Pricing() {
  // Your Stripe Checkout Links
  const PLAN_LINKS = {
    starter: "https://buy.stripe.com/dRmfZa8WNcgOetS2pT9k404",
    pro: "https://buy.stripe.com/cNi8wIflbeoW5XmggJ9k405",
    promax: "https://buy.stripe.com/6oU6oA2ypcgO99y6G99k407"
  };

  const handleRedirect = (url: string) => {
    if (!url) return;
    window.location.href = url;
  };

  // Enhanced styling for the cards to match the landing page aesthetic
  const cardStyle = "relative bg-[#161920] rounded-2xl p-8 flex flex-col min-h-[520px] border border-white/[0.05] transition-all duration-300 ease-in-out hover:border-indigo-500/50 hover:scale-[1.02] hover:shadow-[0_0_40px_-15px_rgba(79,70,229,0.3)] group";

  return (
    <section 
      id="pricing" 
      className="py-24 bg-[#0c0e12] text-white overflow-hidden scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight uppercase">
            Select Your Plan
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            Deploy your AI workforce today. Scalable, autonomous, and ready to work.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          
          {/* STARTER */}
          <div className={cardStyle}>
            <div className="mb-8">
              <h3 className="font-bold text-xl text-indigo-400 uppercase tracking-widest">Starter</h3>
              <p className="text-5xl font-bold mt-4 tracking-tighter">£29<span className="text-sm text-zinc-500 font-medium">/mo</span></p>
              <p className="mt-2 text-zinc-400 text-sm">Ideal for testing initial autonomous workflows.</p>
            </div>
            
            <ul className="space-y-4 flex-1">
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <Check className="w-4 h-4 text-indigo-500 shrink-0" /> 
                20 daily runs
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <Check className="w-4 h-4 text-indigo-500 shrink-0" /> 
                1 concurrent thread
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <Check className="w-4 h-4 text-indigo-500 shrink-0" /> 
                Standard Agent Access
              </li>
            </ul>

            <button 
              onClick={() => handleRedirect(PLAN_LINKS.starter)} 
              className="mt-10 w-full py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest bg-zinc-800 text-white transition-all hover:bg-white hover:text-black active:scale-95"
            >
              Start Building Now
            </button>
          </div>

          {/* PRO (Featured) */}
          <div className={`${cardStyle} border-indigo-500/40 shadow-[0_0_40px_-15px_rgba(79,70,229,0.2)] bg-[#1c2029]`}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest whitespace-nowrap shadow-lg z-30">
              Most Popular
            </div>
            
            <div className="mb-8">
              <h3 className="font-bold text-xl text-indigo-400 uppercase tracking-widest">Pro</h3>
              <p className="text-5xl font-bold mt-4 tracking-tighter">£99<span className="text-sm text-zinc-500 font-medium">/mo</span></p>
              <p className="mt-2 text-zinc-400 text-sm">The power-user choice for scaling agents.</p>
            </div>

            <ul className="space-y-4 flex-1">
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <Check className="w-4 h-4 text-indigo-500 shrink-0" /> 
                150 daily runs
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <Check className="w-4 h-4 text-indigo-500 shrink-0" /> 
                3 concurrent threads
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <Check className="w-4 h-4 text-indigo-500 shrink-0" /> 
                Priority Processing
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <Check className="w-4 h-4 text-indigo-500 shrink-0" /> 
                Custom Integration Hooks
              </li>
            </ul>

            <button 
              onClick={() => handleRedirect(PLAN_LINKS.pro)} 
              className="mt-10 w-full py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest bg-indigo-600 text-white transition-all hover:bg-indigo-500 shadow-indigo-500/20 shadow-lg active:scale-95"
            >
              Start Building Now
            </button>
          </div>

          {/* PRO MAX */}
          <div className={cardStyle}>
            <div className="mb-8">
              <h3 className="font-bold text-xl text-indigo-400 uppercase tracking-widest">Pro Max</h3>
              <p className="text-5xl font-bold mt-4 tracking-tighter">£249<span className="text-sm text-zinc-500 font-medium">/mo</span></p>
              <p className="mt-2 text-zinc-400 text-sm">Full-scale autonomous enterprise operations.</p>
            </div>

            <ul className="space-y-4 flex-1">
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <Check className="w-4 h-4 text-indigo-500 shrink-0" /> 
                600 daily runs
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <Check className="w-4 h-4 text-indigo-500 shrink-0" /> 
                10 concurrent threads
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <Check className="w-4 h-4 text-indigo-500 shrink-0" /> 
                Advanced Analytics Suite
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <Check className="w-4 h-4 text-indigo-500 shrink-0" /> 
                Dedicated Agent Instances
              </li>
            </ul>

            <button 
              onClick={() => handleRedirect(PLAN_LINKS.promax)} 
              className="mt-10 w-full py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest bg-zinc-800 text-white transition-all hover:bg-white hover:text-black active:scale-95"
            >
              Start Building Now
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
}