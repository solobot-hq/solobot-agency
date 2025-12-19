import Link from "next/link";
import { ArrowRight, Bot, Check, Zap, Globe, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020817] text-white selection:bg-indigo-500/30">
      
      {/* Navbar */}
      <nav className="border-b border-white/5 backdrop-blur-md fixed w-full z-50 bg-[#020817]/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span>SoloBot<span className="text-indigo-500">Agency</span></span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/sign-in" className="text-slate-400 hover:text-white transition-colors">
              Login
            </Link>
            <Link 
              href="/dashboard" 
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-all shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_rgba(79,70,229,0.7)]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 opacity-50" />
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            v2.0 Now Live: 15 New Agents Added
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Hire AI Employees.<br />
            Fire the Overheads.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Deploy autonomous AI agents to handle sales, support, and marketing 24/7. 
            One subscription. Unlimited workforce. Zero complaints.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/dashboard"
              className="w-full sm:w-auto h-12 px-8 flex items-center justify-center gap-2 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors"
            >
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="#pricing"
              className="w-full sm:w-auto h-12 px-8 flex items-center justify-center gap-2 bg-white/5 text-white font-medium rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Instant Deployment", desc: "Launch pre-trained sales agents in seconds. No coding required." },
              { icon: Shield, title: "Enterprise Secure", desc: "Bank-grade encryption keeps your data and client lists safe." },
              { icon: Globe, title: "Works 24/7", desc: "Your digital employees never sleep, eat, or ask for a raise." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#020817] border border-white/10 hover:border-indigo-500/50 transition-colors group">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h2>
            <p className="text-slate-400">Replace your entire back office for less than the cost of lunch.</p>
          </div>

          <div className="max-w-md mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative p-8 bg-[#0F172A] border border-white/10 rounded-2xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-medium text-slate-300">Pro Agency</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-bold text-white">£39</span>
                    <span className="text-slate-500">/month</span>
                  </div>
                </div>
                <div className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30">
                  MOST POPULAR
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited AI Generations",
                  "Access to All 15 Agents",
                  "Priority Support",
                  "Advanced Analytics",
                  "Cancel Anytime"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-indigo-500" />
                    {item}
                  </div>
                ))}
              </ul>

              <Link 
                href="/dashboard"
                className="block w-full py-4 text-center bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
              >
                Start Building Now
              </Link>
              <p className="text-center text-xs text-slate-600 mt-4">14-day money-back guarantee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-slate-600 text-sm">
        <p>&copy; 2024 SoloBot Agency. All rights reserved.</p>
      </footer>
    </div>
  );
}