"use client"; // Required for the scrollToPricing function to work

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, Globe, Shield } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
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

  /**
   * Logic to glide the user down to the pricing section.
   * Using 'scrollIntoView' provides a native smooth-scrolling experience.
   */
  const scrollToPricing = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const element = document.getElementById('pricing');
    if (element) {
      // Offset is handled by the 'scroll-mt-24' class on the target section
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0e12] text-white selection:bg-indigo-500/30 transition-colors duration-300 overflow-x-hidden antialiased">
      
      {/* Navigation */}
      <header>
        <nav className="border-b border-white/[0.05] backdrop-blur-xl fixed top-0 w-full z-50 bg-[#0c0e12]/80">
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative h-8 w-8 transition-transform group-hover:scale-110">
                <Image src="/sl.png" alt="Logo" fill className="object-contain" priority />
              </div>
              <span className="text-lg font-bold tracking-tight">SoloBotAgency</span>
            </Link>
            
            <div className="flex items-center gap-6 text-sm font-medium">
              <ModeToggle />
              <SignedOut>
                <Link href="/sign-in" className="text-zinc-400 hover:text-white transition-colors">
                  Login
                </Link>
                <button 
                  onClick={() => scrollToPricing()}
                  className="hidden sm:block bg-white text-black hover:bg-zinc-200 px-5 py-2 rounded-md font-semibold transition-all shadow-sm active:scale-95 hover:shadow-white/10"
                >
                  Get Started
                </button>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-44 pb-24 border-b border-white/[0.05]">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
          
          <div className="relative max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-700 bg-zinc-800/40 text-zinc-300 text-[10px] font-bold uppercase tracking-widest mb-8">
              Operational Autonomy v2.0
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight text-white">
              Hire AI Employees. <br />
              <span className="text-zinc-500">Fire the Overheads.</span>
            </h1>
            
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Deploy autonomous AI agents to handle sales, support, and marketing 24/7. 
              Scale your business without increasing your headcount.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => scrollToPricing()}
                className="w-full sm:w-auto h-12 px-8 flex items-center justify-center gap-2 bg-white text-black font-semibold rounded-md hover:bg-zinc-200 transition-all shadow-lg active:scale-95 shadow-white/5"
              >
                Start Starter Trial <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scrollToPricing()}
                className="w-full sm:w-auto h-12 px-8 flex items-center justify-center gap-2 text-white font-semibold rounded-md border border-zinc-700 hover:bg-zinc-800/50 transition-all active:scale-95"
              >
                View Pricing
              </button>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-24 bg-[#0c0e12] relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <div key={i} className="group p-8 bg-[#161920] rounded-xl border border-white/[0.05] transition-all duration-300 hover:border-zinc-700 hover:bg-[#1c2029]">
                  <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 border border-zinc-700 transition-colors group-hover:border-zinc-500">
                    <feature.icon className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-white tracking-tight">{feature.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm font-medium">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section - Targeted by scrollToPricing */}
        {/* 'scroll-mt-24' provides the necessary margin for the fixed header */}
        <section id="pricing" className="scroll-mt-24 py-12 relative">
          <div className="absolute inset-0 bg-indigo-500/5 blur-[100px] pointer-events-none" />
          <Pricing />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-white/[0.05] bg-[#0c0e12] text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-zinc-600 text-xs font-medium tracking-[0.3em] uppercase">
            &copy; {new Date().getFullYear()} SOLOBOTAGENCY. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}