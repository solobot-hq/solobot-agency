import { Zap, Shield, Rocket, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      {/* ✅ MANUALLY INJECTED HEADER: This bypasses all hidden components */}
      <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0B1221]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-[72px]">
            <div className="flex items-center gap-3">
              {/* Force the 40px scale using the verified /sl.png path */}
              <img 
                src="/sl.png" 
                alt="SoloBot" 
                className="block object-contain"
                style={{ height: '40px', width: 'auto', minHeight: '40px' }} 
              />
              <span className="font-bold text-xl tracking-tight text-white uppercase leading-none">
                SOLOBOTAGENCY
              </span>
            </div>
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

      <main className="min-h-screen bg-[#0B1221]">
        {/* Hero Section: pt-32 added to account for the new 72px fixed header */}
        <section className="relative pt-32 pb-24 px-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/15 via-[#0B1221] to-[#0B1221] overflow-hidden">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 animate-fade-in uppercase">
              Hire AI Employees. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Fire the Overheads.
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
              Deploy autonomous AI agents to handle sales, support, and marketing 24/7. 
              Infrastructure-grade workforce. Professional grade autonomy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-black hover:bg-slate-200 font-bold px-8 py-6 text-lg rounded-xl" asChild>
                <Link href="/sign-up">START STARTER TRIAL —></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 px-8 py-6 text-lg rounded-xl" asChild>
                <Link href="#pricing">VIEW PRICING</Link>
              </Button>
            </div>
            <div className="mt-8 flex justify-center gap-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-500" /> Cancel Anytime</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-500" /> No Long-term Contracts</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all group">
                <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                  <Zap className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Instant Deployment</h3>
                <p className="text-slate-400">Agents go live in minutes, not months. Full infrastructure integration ready.</p>
              </div>
              {/* Feature 2 */}
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all group">
                <div className="h-12 w-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Enterprise Security</h3>
                <p className="text-slate-400">Bank-grade encryption and privacy controls for every automated action.</p>
              </div>
              {/* Feature 3 */}
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all group">
                <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
                  <Rocket className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Infinite Scale</h3>
                <p className="text-slate-400">Add 10 or 10,000 agents instantly. Performance remains consistent.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-[#0B1221] px-6 text-white relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Transparent Scale</h2>
              <p className="text-slate-400">Industrial power at startup speed.</p>
            </div>
            
            <div className="flex justify-center">
              <div className="bg-white/5 rounded-3xl p-10 border-2 border-blue-600 relative scale-105 z-10 max-w-md w-full">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </span>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Professional</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold">$99</span>
                    <span className="text-slate-500">/mo</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3 text-slate-300">
                    <Check className="text-blue-500 h-5 w-5" />
                    <span>Unlimited Autonomous Actions</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <Check className="text-blue-500 h-5 w-5" />
                    <span>24/7 Agent Monitoring</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <Check className="text-blue-500 h-5 w-5" />
                    <span>Custom Workflow Logic</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg font-bold" asChild>
                  <Link href="/sign-up">Scale Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}