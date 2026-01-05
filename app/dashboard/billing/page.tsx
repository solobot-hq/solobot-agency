import { AVAILABLE_PLANS } from "@/lib/billing/plans";
import { usageData } from "@/lib/usage/usage";

export default function BillingPage() {
  const currentPlanId = usageData.plan;

  return (
    <div className="p-8 max-w-4xl space-y-10 animate-in fade-in duration-500">
      {/* 1. Page Header — strictly lowercase and quiet */}
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight lowercase">billing</h1>
        <p className="text-zinc-500 mt-2 font-medium lowercase italic">plan specifications and current subscription status.</p>
      </div>

      {/* 2. Reverted Vertical List — no table headers, no grid columns */}
      <div className="space-y-4">
        {AVAILABLE_PLANS.map((plan) => (
          <div 
            key={plan.id} 
            className={`flex items-center justify-between p-6 border rounded-xl transition-all ${
              plan.id === currentPlanId 
                ? "border-white/[0.08] bg-white/[0.02]" 
                : "border-white/[0.04] bg-transparent"
            }`}
          >
            {/* Left Alignment: Identity and Rate */}
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white lowercase">
                {plan.name} plan
              </h3>
              <p className="text-xs text-zinc-500 font-mono">
                £{plan.pricing.monthly} /mo
              </p>
            </div>

            {/* Right Alignment: Detail and Status */}
            <div className="flex items-center gap-8 text-right">
              <div className="hidden md:block">
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">capacity</p>
                <p className="text-xs text-zinc-400 lowercase">{plan.features[0]}</p>
              </div>

              {plan.id === currentPlanId ? (
                <span className="text-[10px] font-black px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase">
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

      {/* 3. Footer Metadata — administrative and neutral */}
      <div className="pt-10 border-t border-white/[0.05]">
        <div className="flex gap-8 text-[10px] font-mono uppercase tracking-tighter text-zinc-600">
          <span>billing_provider: pending</span>
          <span>currency_lock: gbp</span>
        </div>
      </div>
    </div>
  );
}