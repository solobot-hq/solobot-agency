"use client";

import Pricing from "@/components/Pricing";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      // The actual "Glide" command
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="text-white selection:bg-indigo-500/30 antialiased">
      <section className="relative py-24 border-b border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Hire AI Employees. <br />
            <span className="text-zinc-500">Fire the Overheads.</span>
          </h1>
          <button 
            onClick={scrollToPricing}
            className="h-12 px-8 bg-white text-black font-semibold rounded-md hover:bg-zinc-200 transition-all active:scale-95 flex items-center gap-2 mx-auto"
          >
            Start Starter Trial <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* This ID is what the button looks for to stop scrolling */}
      <section id="pricing" className="scroll-mt-[130px] py-24 bg-[#0c0e12]">
        <Pricing />
      </section>
    </div>
  );
}