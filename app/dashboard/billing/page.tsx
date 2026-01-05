"use client";
import { AVAILABLE_PLANS } from "@/lib/billing/plans";
import { usageData } from "@/lib/usage/usage";
import { Check } from "lucide-react";

export default function BillingPage() {
  const currentPlanId = usageData.plan;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 p-8">
      <div>
        <h1 className="text-4xl font-bold text-white tracking-tight">Billing</h1>
        <p className="text-zinc-500 mt-2 font-medium">Manage subscription and infrastructure caps.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {AVAILABLE_PLANS.map((plan) => (
          <div key={plan.id} className={`relative p-8 rounded-[2rem] border transition-all duration-500 flex flex-col ${
            plan.id === currentPlanId ? "bg-indigo-500/5 border-indigo-500 shadow-2xl shadow-indigo-500/10" : "bg-[#111827] border-zinc-800"
          }`}>
            <h3 className="text-xl font-bold text-white mb-4">{plan.name}</h3>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white tracking-tight">£{plan.pricing.monthly}</span>
              <span className="text-zinc-600 font-bold ml-1">/ mo</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm font-medium text-zinc-400">
                  <Check className="w-4 h-4 text-indigo-500" /> {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 rounded-xl text-sm font-bold transition-all ${
              plan.id === currentPlanId ? "bg-zinc-800 text-zinc-500 cursor-default" : "bg-white text-black hover:bg-zinc-200"
            }`}>
              {plan.id === currentPlanId ? "Current Plan" : "Upgrade Plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}