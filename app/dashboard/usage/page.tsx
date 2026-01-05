import { usageData } from "@/lib/usage/usage";

export default function UsagePage() {
  const data = usageData;

  // Status mapping logic aligned with Workspace visual weight
  const getStatusPill = (used: number, limit: number) => {
    const isAtLimit = used >= limit;
    return (
      <span className={`text-[10px] font-black px-2 py-1 rounded border uppercase tracking-widest ${
        isAtLimit 
          ? "bg-red-500/10 text-red-500 border-red-500/20" 
          : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      }`}>
        {isAtLimit ? "LIMIT" : "OK"}
      </span>
    );
  };

  return (
    <div className="p-8 max-w-4xl space-y-10 animate-in fade-in duration-500">
      {/* 1. Header — strictly lowercase matching Workspace hierarchy */}
      <div>
        <h1 className="text-4xl font-bold text-white tracking-tight lowercase">usage</h1>
        <p className="text-zinc-500 mt-2 font-medium lowercase">resource consumption for the current billing cycle.</p>
      </div>

      {/* 2. Usage Blocks — normalized to Workspace row density */}
      <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-[#0D1525]/30">
        <div className="flex items-center justify-between p-6 border-b border-white/[0.05] hover:bg-white/[0.01] transition-colors">
          <span className="text-sm font-medium text-zinc-400 lowercase">requests</span>
          <div className="flex items-center gap-6">
            <span className="text-sm font-mono text-zinc-500">
              {data.usage.requests} / {data.limits.requests}
            </span>
            {getStatusPill(data.usage.requests, data.limits.requests)}
          </div>
        </div>
        
        <div className="flex items-center justify-between p-6 last:border-0 hover:bg-white/[0.01] transition-colors">
          <span className="text-sm font-medium text-zinc-400 lowercase">agents</span>
          <div className="flex items-center gap-6">
            <span className="text-sm font-mono text-zinc-500">
              {data.usage.agents} / {data.limits.agents}
            </span>
            {getStatusPill(data.usage.agents, data.limits.agents)}
          </div>
        </div>
      </div>

      {/* 3. Metadata footer — utilitarian and boring */}
      <div className="pt-8 border-t border-white/[0.05] space-y-2">
        <div className="flex gap-4 text-[10px] font-mono uppercase tracking-tighter text-zinc-600">
          <span>plan: {data.plan}</span>
        </div>
        <div className="flex gap-4 text-[10px] font-mono uppercase tracking-tighter text-zinc-600">
          <span>period_start: {data.periodStart}</span>
          <span>period_end: {data.periodEnd}</span>
        </div>
      </div>
    </div>
  );
}