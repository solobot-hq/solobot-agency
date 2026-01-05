import { AVAILABLE_PLANS } from "@/lib/billing/plans";
import { usageData } from "@/lib/usage/usage";

export default function BillingPage() {
  const currentPlanId = usageData.plan;

  return (
    <div className="p-8 max-w-4xl space-y-10 animate-in fade-in duration-500">
      {/* 1. Page Header — Lowercase per Workspace standard */}
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight lowercase">billing</h1>
        <p className="text-zinc-500 mt-2 font-medium lowercase">plan specifications and current subscription status.</p>
      </div>

      {/* 2. Administrative List — No icons, no shadows, no rounded-[2rem] cards */}
      <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-transparent">
        {/* Header Row */}
        <div className="grid grid-cols-4 p-4 border-b border-white/[0.05] text-[10px] font-black text-zinc-600 uppercase tracking-widest">
          <div>tier</div>
          <div>monthly rate</div>
          <div>infrastructure</div>
          <div className="text-right">status</div>
        </div>

        {/* Plan Rows — Factual and Neutral */}
        {AVAILABLE_PLANS.map((plan) => (
          <div 
            key={plan.id} 
            className="grid grid-cols-4 p-4 border-b border-white/[0.05] last:border-0 items-center transition-colors"
          >
            <div className="text-sm font-bold text-white lowercase">
              {plan.name}
            </div>
            <div className="text-sm font-mono text-zinc-400">
              £{plan.pricing.monthly}
            </div>
            <div className="text-xs text-zinc-500 lowercase truncate pr-4">
              {plan.features[0]}
            </div>
            <div className="text-right">
              {plan.id === currentPlanId ? (
                <span className="text-[10px] font-black px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  ACTIVE
                </span>
              ) : (
                <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">
                  available
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Footer Metadata — Aligned with global density */}
      <div className="pt-10 border-t border-white/[0.05]">
        <div className="flex gap-8 text-[10px] font-mono uppercase tracking-tighter text-zinc-600">
          <span>billing_provider: pending</span>
          <span>currency_lock: gbp</span>
        </div>
      </div>
    </div>
  );
}