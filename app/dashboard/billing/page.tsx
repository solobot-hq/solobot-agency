import { AVAILABLE_PLANS } from "@/lib/billing/plans";
import { usageData } from "@/lib/usage/usage";

export default function BillingPage() {
  const currentPlanId = usageData.plan;

  return (
    <div className="p-8 max-w-5xl space-y-12 animate-in fade-in duration-500">
      {/* 1. Header — strictly lowercase */}
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight lowercase">billing</h1>
        <p className="text-zinc-500 mt-2 font-medium">subscription management and plan specifications.</p>
      </div>

      {/* 2. Current Plan Status — boring pattern */}
      <div className="p-6 border border-indigo-500/20 bg-indigo-500/5 rounded-xl flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">active subscription</p>
          <h2 className="text-xl font-bold text-white lowercase">{currentPlanId} plan</h2>
        </div>
        <span className="text-[10px] font-black px-2 py-1 rounded bg-emerald-500/10 text-emerald-500">
          ACTIVE
        </span>
      </div>

      {/* 3. Plan Matrix — Workspace level density */}
      <div className="space-y-4">
        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">available tiers</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {AVAILABLE_PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`p-6 border rounded-xl bg-[#111827]/30 flex flex-col justify-between transition-all ${
                plan.id === currentPlanId ? "border-indigo-500/50" : "border-white/[0.08]"
              }`}
            >
              <div>
                <h3 className="text-lg font-bold text-white lowercase">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-2xl font-bold text-white">${plan.price}</span>
                  <span className="text-xs text-zinc-500">/{plan.interval}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-xs text-zinc-400 lowercase flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-zinc-700 mt-1.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Future boundary: read-only footer */}
              <div className="mt-8 pt-4 border-t border-white/[0.05]">
                <p className="text-[10px] font-black text-zinc-600 uppercase text-center tracking-widest">
                  {plan.id === currentPlanId ? "currently active" : "checkout disabled"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Ledger Boundary — Minimalist Invoice List */}
      <div className="space-y-4">
        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">transaction history</p>
        <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-[#111827]/30">
           <div className="flex items-center justify-between p-4 text-xs font-mono text-zinc-600 uppercase tracking-tighter">
             <span>no recent invoices found</span>
           </div>
        </div>
      </div>
    </div>
  );
}