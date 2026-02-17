"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, Globe, Shield } from "lucide-react";
import Pricing from "@/components/Pricing";

export default function LandingPage() {
  const features = [
    { 
      icon: Zap, 
      title: "Predictable Performance", 
      desc: "Deploy pre-trained agents designed for specific operational outcomes." 
    },
    { 
      icon: Shield, 
      title: "Enterprise-Grade Control", 
      desc: "Human-in-the-loop protocols ensure every AI action is monitored and secure." 
    },
    { 
      icon: Globe, 
      title: "Autonomous Reliability", 
      desc: "Your digital workforce operates 24/7 within strict, cost-predictable usage caps." 
    }
  ];

  // Internal page scroll function for Hero buttons
  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0e12] text-white selection:bg-indigo-500/30 transition-colors duration-300 overflow-x-hidden antialiased">
      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-24 border-b border-white/[0.05]">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-700 bg-zinc-800/40 text-zinc-300 text-[10px] font-bold uppercase tracking-widest mb-8">
              Operational Autonomy v2.0
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight text-white">
              Hire AI Employees. <br />
              <span className="text-zinc-500">Fire the Overheads.</span>
            </h1>
            
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Deploy autonomous AI agents to handle sales, support, and marketing 24/7. 
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={scrollToPricing}
                className="w-full sm:w-auto h-12 px-8 flex items-center justify-center gap-2 bg-white text-black font-semibold rounded-md hover:bg-zinc-200 transition-all shadow-sm active:scale-95"
              >
                Start Starter Trial <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={scrollToPricing}
                className="w-full sm:w-auto h-12 px-8 flex items-center justify-center gap-2 text-white font-semibold rounded-md border border-zinc-700 hover:bg-zinc-800/50 transition-all active:scale-95"
              >
                View Pricing
              </button>
            </div>
          </div>
        </section>

        {/* --- FEATURE GRID --- */}
        <section className="py-24 bg-[#0c0e12]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <div key={i} className="group p-8 bg-[#161920] rounded-xl border border-white/[0.05] transition-colors hover:border-zinc-700">
                  <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 border border-zinc-700">
                    <feature.icon className="w-5 h-5 text-zinc-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-white tracking-tight">{feature.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm font-medium">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- PRICING SECTION --- */}
        {/* IMPORTANT: 'id="pricing"' matches the MarketingHeader's getElementById call.
          'scroll-mt-[130px]' accounts for your fixed header height.
        */}
        <section id="pricing" className="scroll-mt-[130px] py-24 bg-[#0c0e12]">
          <Pricing />
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-16 border-t border-white/[0.05] bg-[#0c0e12] text-center">
        <p className="text-zinc-600 text-xs font-medium tracking-[0.3em] uppercase">
          &copy; {new Date().getFullYear()} SOLOBOTAGENCY.
        </p>
      </footer>
    </div>
  );
}