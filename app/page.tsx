import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, Globe, Shield, Check } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Metadata } from "next";
import Pricing from "@/components/Pricing";

export const metadata: Metadata = {
  title: "SoloBotAgency | Professional AI Workforce",
  description: "Deploy autonomous AI agents to handle sales, support, and marketing 24/7. Infrastructure-safe workforce.",
};

export default function LandingPage() {
  const features = [
    { icon: Zap, title: "PREDICTABLE PERFORMANCE", desc: "Deploy pre-trained agents designed for specific operational outcomes." },
    { icon: Shield, title: "ENTERPRISE-GRADE CONTROL", desc: "Human-in-the-loop protocols ensure every AI action is monitored and secure." },
    { icon: Globe, title: "AUTONOMOUS RELIABILITY", desc: "Your digital workforce operates 24/7 within strict, cost-predictable usage caps." }
  ];

  return (
    <div className="min-h-screen bg-[#0B1221] text-white selection:bg-indigo-500/30 transition-colors duration-300 overflow-x-hidden antialiased">
      
      <header>
        <nav className="border-b border-white/[0.08] backdrop-blur-xl fixed top-0 w-full z-50 bg-[#0B1221]/90" aria-label="Main Navigation">
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 shrink-0 transition-opacity hover:opacity-90">
              <div className="relative h-10 w-10 md:h-11 md:w-11">
                <Image src="/sl.png" alt="SoloBotAgency Logo" fill className="object-contain" priority />
              </div>
              <span className="text-xl font-black tracking-tight text-white uppercase">SoloBotAgency</span>
            </Link>
            
            <div className="flex items-center gap-6 text-sm font-bold tracking-wide">
              <ModeToggle />
              <SignedOut>
                <Link href="/sign-in" className="text-zinc-400 hover:text-white transition-colors uppercase">Login</Link>
                <Link href="/sign-up" className="hidden sm:block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-black transition-all shadow-lg shadow-indigo-500/20 uppercase tracking-tighter">Get Started</Link>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="text-zinc-300 hover:text-white transition-colors uppercase">Dashboard</Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Bold Hero Section */}
        <section className="relative pt-60 pb-32 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/15 via-[#0B1221] to-[#0B1221]">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em] mb-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400"></span>
              </span>
              Operational Autonomy v2.0
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter mb-8 leading-[1.05] text-white uppercase">
              Hire AI Employees.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400">
                Fire the Overheads.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-12 leading-relaxed font-bold">
              Deploy autonomous AI agents to handle sales, support, and marketing 24/7. 
              Infrastructure-safe workforce. Professional grade autonomy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link href="/sign-up" className="w-full sm:w-auto h-14 px-10 flex items-center justify-center gap-2 bg-white text-[#0B1221] font-black rounded-xl hover:scale-[1.03] transition-all shadow-2xl shadow-white/10 text-xs uppercase tracking-widest">
                Start Starter Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#pricing" className="w-full sm:w-auto h-14 px-10 flex items-center justify-center gap-2 text-white font-black rounded-xl border border-white/20 hover:bg-white/10 transition-all text-xs uppercase tracking-widest">
                View Pricing
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-[11px] font-black text-zinc-300 uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400" /> Cancel Anytime</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400" /> No Long-term Contracts</span>
            </div>
          </div>
        </section>

        <section className="py-28 bg-[#0B1221] border-y border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              {features.map((feature, i) => (
                <div key={i} className="relative group">
                  <div className="w-12 h-12 bg-indigo-500/15 rounded-lg flex items-center justify-center mb-8 border border-indigo-500/30 transition-all group-hover:border-indigo-500/50">
                    <feature.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-black mb-4 text-white uppercase tracking-tight">{feature.title}</h3>
                  <p className="text-zinc-400 leading-relaxed font-bold text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Pricing />
      </main>

      <footer className="py-20 border-t border-white/[0.1] bg-[#0B1221] text-center">
        <p className="text-white text-[12px] md:text-[14px] font-black tracking-[0.4em] uppercase">
          &copy; 2025 SOLOBOTAGENCY. ONE BOT. INFINITE TASKS.
        </p>
      </footer>
    </div>
  );
}