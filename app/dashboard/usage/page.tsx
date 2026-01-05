import { usageData } from "@/lib/usage/usage";

export default function UsagePage() {
  const data = usageData;

  const getStatusPill = (used: number, limit: number) => {
    const isAtLimit = used >= limit;
    return (
      <span className={`text-[10px] font-black px-2 py-1 rounded ${
        isAtLimit ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"
      }`}>
        {isAtLimit ? "LIMIT" : "OK"}
      </span>
    );
  };

  return (
    <div className="p-8 max-w-4xl space-y-12 animate-in fade-in duration-500">
      {/* 1. Header */}
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight lowercase">usage</h1>
        <p className="text-zinc-500 mt-2 font-medium">resource consumption for the current billing cycle.</p>
      </div>

      {/* 2. Usage Blocks - List Structure (Boring by Design) */}
      <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-[#111827]/30">
        <div className="flex items-center justify-between p-4 border-b border-white/[0.05]">
          <span className="text-sm font-medium text-zinc-400 lowercase">requests</span>
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-zinc-300">
              {data.usage.requests} / {data.limits.requests}
            </span>
            {getStatusPill(data.usage.requests, data.limits.requests)}
          </div>
        </div>
        
        <div className="flex items-center justify-between p-4 last:border-0">
          <span className="text-sm font-medium text-zinc-400 lowercase">agents</span>
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-zinc-300">
              {data.usage.agents} / {data.limits.agents}
            </span>
            {getStatusPill(data.usage.agents, data.limits.agents)}
          </div>
        </div>
      </div>

      {/* 3. Metadata */}
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