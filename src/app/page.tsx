"use client";

import { useState } from "react";
import { Zap, Shield, Rocket, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  const [logoOpen, setLogoOpen] = useState(false);

  return (
    <>
      {/* 🚀 BRUTE FORCE: Using Tailwind !important arbitrary values to force 120px */}
      <header className="fixed top-0 w-full z-[60] border-b border-white/10 bg-[#0B1221]/95 backdrop-blur-md !h-[120px]">
        <div className="max-w-7xl mx-auto px-6 h-full">
          <div className="flex justify-between items-center h-full">
            <button
              type="button"
              aria-label="View logo"
              onClick={() => setLogoOpen(true)}
              className="flex items-center gap-5 bg-transparent border-0 p-0 text-left cursor-pointer focus:outline-none"
            >
              {/* Force Logo Container to 80px */}
              <div className="flex items-center !h-[80px]">
                <img 
                  src="/sl.png" 
                  alt="SoloBot" 
                  className="block object-contain !h-full w-auto"
                />
              </div>
              <span className="font-bold text-3xl tracking-tight text-white uppercase leading-none">
                SOLOBOTAGENCY
              </span>
            </button>

            {/* Modal Overlay */}
            {logoOpen && (
              <div
                className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6 backdrop-blur-xl"
                onClick={() => setLogoOpen(false)}
              >
                <div
                  className="bg-[#0B1221] p-12 rounded-3xl border border-white/10 shadow-2xl max-w-lg w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src="/sl.png"
                    alt="SoloBot Logo"
                    className="w-[400px] h-auto object-contain mx-auto"
                  />
                  <p className="mt-8 text-center text-xl text-white/60 font-medium italic">
                    One Bot. Infinite Tasks.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-10">
              <nav className="hidden lg:flex space-x-12">
                <Link href="#features" className="text-lg font-medium text-white/70 hover:text-white">Features</Link>
                <Link href="#pricing" className="text-lg font-medium text-white/70 hover:text-white">Pricing</Link>
              </nav>
              <div className="flex items-center gap-8">
                <Link href="/login" className="text-lg font-medium text-white/70 hover:text-white">LOGIN</Link>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-10 py-7 text-lg">GET STARTED</Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Offset the main content by exactly 120px */}
      <main className="min-h-screen bg-[#0B1221] !pt-[120px]">
        <section className="relative pt-32 pb-32 px-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/15 via-[#0B1221] to-[#0B1221]">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-8 uppercase">
              Hire AI Employees. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Fire the Overheads.
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-14">
              Deploy autonomous AI agents to handle sales, support, and marketing 24/7.
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="bg-white text-black hover:bg-slate-200 font-bold px-12 py-8 text-xl rounded-2xl" asChild>
                <Link href="/sign-up">START STARTER TRIAL &rarr;</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}