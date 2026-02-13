import { usageData } from "@/lib/usage/usage";
import { Zap, Users } from "lucide-react";

export default function UsagePage() {
  // 1. Safe data extraction: Ensure 'data' exists before proceeding
  const data = usageData;

  // 2. Loading Fallback: Prevents 'undefined' errors during the initial render
  if (!data || !data.usage || !data.limits) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-zinc-500 font-medium">
          Waking up Engine...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 p-8">
      <div>
        <h1 className="text-4xl font-bold text-white tracking-tight">Usage</h1>
        <p className="text-zinc-500 mt-2 font-medium">Resource consumption for the current cycle.</p>
      </div>

      <div className="space-y-4">
        {/* 3. Optional Chaining: Safely access properties with fallback defaults */}
        <UsageTile 
          label="Daily Requests" 
          icon={Zap} 
          used={data.usage?.requests ?? 0} 
          limit={data.limits?.requests ?? 0} 
        />
        <UsageTile 
          label="Active Agents" 
          icon={Users} 
          used={data.usage?.agents ?? 0} 
          limit={data.limits?.agents ?? 0} 
        />
      </div>
    </div>
  );
}

function UsageTile({ label, icon: Icon, used, limit }: any) {
  // Calculate percentage for potential progress bars or status checks
  const isOverLimit = used > limit && limit > 0;

  return (
    <div className="bg-[#111827] border border-zinc-800 rounded-[2rem] p-8 flex items-center justify-between transition-all hover:border-zinc-700">
      <div className="flex items-center gap-6">
        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          <Icon className="w-5 h-5 text-zinc-500" />
        </div>
        <h3 className="text-lg font-bold text-white">{label}</h3>
      </div>
      <div className="flex items-center gap-8">
        <p className="text-lg font-bold text-white tracking-tight font-mono">
          {used} / {limit}
        </p>
        <span className={`px-5 py-2 rounded-full text-[10px] font-bold border uppercase ${
          isOverLimit 
            ? "bg-rose-500/10 text-rose-400 border-rose-500/20" 
            : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        }`}>
          {isOverLimit ? "Limit Reached" : "OK"}
        </span>
      </div>
    </div>
  );
}