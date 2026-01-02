"use client";

import { useState } from "react";
import { Zap, Shield, Rocket, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  const [logoOpen, setLogoOpen] = useState(false);

  return (
    <>
      {/* Authority Header: 84px height with Fixed Clickable Logo Lightbox */}
      <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0B1221]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6"> {/* ✅ TYPO FIXED: changed a7xl to 7xl */}
          <div className="flex justify-between items-center h-[84px]">
            <button
              type="button"
              aria-label="View logo"
              onClick={() => setLogoOpen(true)}
              className="flex items-center gap-3 bg-transparent border-0 p-0 text-left cursor-pointer focus:outline-none z-[60]"
            >
              <div className="h-12 flex items-center">
                <img 
                  src="/sl.png" 
                  alt="SoloBot" 
                  className="h-full w-auto block object-contain"
                />
              </div>
              <span className="font-bold text-xl tracking-tight text-white uppercase leading-none">
                SOLOBOTAGENCY
              </span>
            </button>

            {/* Logo Lightbox Modal */}
            {logoOpen && (
              <div
                className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm"
                onClick={() => setLogoOpen(false)}
              >
                <div
                  className="bg-[#0B1221] p-8 rounded-2xl border border-white/10 shadow-2xl max-w-sm w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src="/sl.png"
                    alt="SoloBot Logo"
                    className="w-[260px] h-auto object-contain mx-auto"
                  />
                  <p className="mt-4 text-center text-sm text-white/60 font-medium italic">
                    One Bot. Infinite Tasks.
                  </p>
                  <button 
                    onClick={() => setLogoOpen(false)}
                    className="mt-6 w-full py-2 text-xs font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Click anywhere to close
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center gap-6">
              <nav className="hidden md:flex space-x-8">
                <Link href="#features" className="text-sm font-medium text-white/70 hover:text-white">Features</Link>
                <Link href="#pricing" className="text-sm font-medium text-white/70 hover:text-white">Pricing</Link>
              </nav>
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white">LOGIN</Link>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">GET STARTED</Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-[#0B1221] pt-[84px]">
        {/* Hero Section */}
        <section className="relative pt-24 pb-24 px-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/15 via-[#0B1221] to-[#0B1221] overflow-hidden">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 uppercase">
              Hire AI Employees. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Fire the Overheads.
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
              Deploy autonomous AI agents to handle sales, support, and marketing 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-black hover:bg-slate-200 font-bold px-8 py-6 text-lg rounded-xl" asChild>
                <Link href="/sign-up">START STARTER TRIAL &rarr;</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 px-8 py-6 text-lg rounded-xl" asChild>
                <Link href="#pricing">VIEW PRICING</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Preview Section */}
        <section id="features" className="py-24 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <Zap className="text-blue-500 mb-4 h-8 w-8" />
              <h3 className="text-xl font-bold text-white mb-2">Instant Deployment</h3>
              <p className="text-slate-400 text-sm">Agents go live in minutes.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}