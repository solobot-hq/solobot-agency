import { AVAILABLE_PLANS } from "@/lib/billing/plans";
import { usageData } from "@/lib/usage/usage";

export default function BillingPage() {
  const currentPlanId = usageData.plan;

  return (
    <div className="p-8 max-w-4xl space-y-10 animate-in fade-in duration-500">
      {/* 1. Header — strictly lowercase matching workspace hierarchy */}
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight lowercase">billing</h1>
        <p className="text-zinc-500 mt-2 font-medium lowercase">plan specifications and current subscription status.</p>
      </div>

      {/* 2. Plan Specification List — matching workspace density and row rhythm */}
      <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-[#0D1525]/30">
        {/* Table Header Row */}
        <div className="grid grid-cols-4 p-4 border-b border-white/[0.05] text-[10px] font-black text-zinc-600 uppercase tracking-widest bg-white/[0.02]">
          <div>tier</div>
          <div>rate</div>
          <div>infrastructure</div>
          <div className="text-right">status</div>
        </div>

        {/* Plan Rows */}
        {AVAILABLE_PLANS.map((plan) => (
          <div 
            key={plan.id} 
            className="grid grid-cols-4 p-6 border-b border-white/[0.05] last:border-0 items-center hover:bg-white/[0.01] transition-colors"
          >
            <div className="text-sm font-bold text-white lowercase tracking-tight">
              {plan.name}
            </div>
            <div className="text-sm font-mono text-zinc-400">
              £{plan.pricing.monthly} /mo
            </div>
            <div className="text-xs text-zinc-500 lowercase truncate pr-4">
              {plan.features[0]}
            </div>
            <div className="text-right">
              {plan.id === currentPlanId ? (
                <span className="text-[10px] font-black px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase tracking-widest">
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

      {/* 3. Transaction History Boundary — utilitarian and boring */}
      <div className="space-y-4">
        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">transaction history</p>
        <div className="bg-[#0D1525]/30 border border-white/[0.05] rounded-xl p-8 text-center">
           <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">no recent invoices found</span>
        </div>
      </div>

      {/* 4. Footer Metadata */}
      <div className="pt-8 border-t border-white/[0.05] flex gap-8 text-[10px] font-mono uppercase tracking-tighter text-zinc-600">
        <div>billing_provider: pending</div>
        <div>currency_lock: gbp</div>
      </div>
    </div>
  );
}