import { usageData } from "@/lib/usage/usage";
import { Zap, Users } from "lucide-react";

export default function UsagePage() {
  const data = usageData;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 p-8">
      <div>
        <h1 className="text-4xl font-bold text-white tracking-tight">Usage</h1>
        <p className="text-zinc-500 mt-2 font-medium">Resource consumption for the current cycle.</p>
      </div>

      <div className="space-y-4">
        <UsageTile label="Daily Requests" icon={Zap} used={data.usage.requests} limit={data.limits.requests} />
        <UsageTile label="Active Agents" icon={Users} used={data.usage.agents} limit={data.limits.agents} />
      </div>
    </div>
  );
}

function UsageTile({ label, icon: Icon, used, limit }: any) {
  return (
    <div className="bg-[#111827] border border-zinc-800 rounded-[2rem] p-8 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          <Icon className="w-5 h-5 text-zinc-500" />
        </div>
        <h3 className="text-lg font-bold text-white">{label}</h3>
      </div>
      <div className="flex items-center gap-8">
        <p className="text-lg font-bold text-white tracking-tight font-mono">{used} / {limit}</p>
        <span className="px-5 py-2 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">OK</span>
      </div>
    </div>
  );
}