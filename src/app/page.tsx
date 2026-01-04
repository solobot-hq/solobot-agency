"use client";

import { Zap, Shield, Rocket, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      {/* The Header and Lightbox are now handled globally by layout.tsx */}
      <section className="relative pt-32 pb-32 px-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/15 via-[#0B1221] to-[#0B1221] overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-8 uppercase">
            Hire AI Employees. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Fire the Overheads.
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-14">
            Deploy autonomous AI agents to handle sales, support, and marketing 24/7. 
            Infrastructure-safe workforce. Professional grade autonomy.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-slate-200 font-bold px-12 py-8 text-xl rounded-2xl" asChild>
              <Link href="/sign-up">START STARTER TRIAL &rarr;</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 px-12 py-8 text-xl rounded-2xl" asChild>
              <Link href="#pricing">VIEW PRICING</Link>
            </Button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-sm font-medium text-slate-500 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-500" /> Cancel Anytime</span>
            <span className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-500" /> No Long-term Contracts</span>
          </div>
        </div>
      </section>

      {/* Pricing and Features continue below... */}
    </>
  );
}