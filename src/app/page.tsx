import { Zap, Shield, Rocket, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section: Normalized padding and scale */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 animate-fade-in">
            Hire AI Employees. <span className="text-blue-600">Fire the Overheads.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
            Deploy autonomous AI agents to handle sales, support, and marketing 24/7. Infrastructure-grade workforce.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/sign-up">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">View Capabilities</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section: Clean spacing and no decorative shadows */}
      <section id="features" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <div className="p-6 rounded-2xl bg-white border border-blue-100 shadow-none transition-all">
              <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Deployment</h3>
              <p className="text-base text-slate-600">Agents go live in minutes, not months.</p>
            </div>
            {/* Add other features following the same p-6/shadow-none pattern */}
          </div>
        </div>
      </section>

      {/* Pricing Section: Operational tone with scale-105 preserved */}
      <section id="pricing" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Transparent Scale</h2>
            <p className="text-slate-600">Industrial power at startup speed.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Pro Card: scale-105 remains locked for conversion intent */}
            <div className="bg-white rounded-3xl p-8 border-2 border-blue-600 shadow-none relative scale-105 z-10">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
                Most Popular
              </span>
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">Professional</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-slate-500">/mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm">
                  <Check className="text-blue-600 h-4 w-4" />
                  <span>Unlimited Autonomous Actions</span>
                </li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/sign-up">Scale Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}