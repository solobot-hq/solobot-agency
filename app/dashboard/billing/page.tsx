import { AVAILABLE_PLANS } from "@/lib/billing/plans";
import { usageData } from "@/lib/usage/usage";

export default function BillingPage() {
  const currentPlanId = usageData.plan; // Currently set to "free" in your usage contract

  return (
    <div className="p-8 max-w-5xl space-y-12 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight lowercase">billing</h1>
        <p className="text-zinc-500 mt-2 font-medium">manage subscription and invoices.</p>
      </div>

      {/* Current Plan Status */}
      <div className="p-6 border border-indigo-500/20 bg-indigo-500/5 rounded-xl flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">active subscription</p>
          <h2 className="text-xl font-bold text-white lowercase">{currentPlanId} plan</h2>
        </div>
        <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          PAID
        </span>
      </div>

      {/* Plan Matrix */}
      <div className="space-y-4">
        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">available tiers</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AVAILABLE_PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`p-8 rounded-[2rem] border transition-all duration-500 flex flex-col justify-between ${
                plan.id === currentPlanId 
                  ? "bg-indigo-500/5 border-indigo-500" 
                  : "bg-[#111827] border-white/[0.05]"
              }`}
            >
              <div>
                <h3 className="text-xl font-bold text-white lowercase">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-4xl font-bold text-white tracking-tight">£{plan.price}</span>
                  <span className="text-zinc-600 font-bold">/ mo</span>
                </div>
                <ul className="mt-8 space-y-4 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-sm font-medium text-zinc-400 lowercase flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-10 pt-6 border-t border-white/[0.05]">
                <p className="text-[10px] font-black text-zinc-600 uppercase text-center tracking-widest">
                  {plan.id === currentPlanId ? "currently active" : "checkout disabled"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="space-y-4">
        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">recent invoices</p>
        <div className="bg-[#111827] border border-white/[0.05] rounded-[2rem] overflow-hidden">
           <div className="p-8 text-xs font-mono text-zinc-600 uppercase tracking-tighter text-center">
             no recent transactions found
           </div>
        </div>
      </div>
    </div>
  );
}