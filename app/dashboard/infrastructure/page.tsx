import { infrastructureStatus, InfrastructureStatus } from "@/lib/infrastructure/status";

export default function InfrastructurePage() {
  const status = infrastructureStatus;

  // Status Mapping Logic
  const getPill = (val: string) => {
    switch (val) {
      case "connected":
        return { label: "RUNNING", color: "bg-emerald-500/10 text-emerald-500" };
      case "idle":
        return { label: "IDLE", color: "bg-zinc-500/10 text-zinc-500" };
      case "unavailable":
      case "offline":
        return { label: "FAILED", color: "bg-red-500/10 text-red-500" };
      default:
        return { label: "DISABLED", color: "bg-white/5 text-zinc-600" };
    }
  };

  return (
    <div className="p-8 max-w-4xl space-y-12">
      {/* 1. Header */}
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight lowercase">infrastructure</h1>
        <p className="text-zinc-500 mt-2">direct status report from agency core services.</p>
      </div>

      {/* 2. System Components List */}
      <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-[#111827]/30">
        <ComponentRow name="api gateway" status={getPill(status.apiGateway)} />
        <ComponentRow name="agent workers" status={getPill(status.agentWorkers)} />
        <ComponentRow name="vector database" status={getPill(status.vectorDatabase)} />
        <ComponentRow name="job queue" status={getPill(status.jobQueue)} />
      </div>

      {/* 3. Locked Sections */}
      <div className="space-y-6 opacity-40 select-none">
        <div className="space-y-1">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">realtime monitoring</p>
          <p className="text-sm text-zinc-600">activates when backend probes are enabled</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">audit logs</p>
          <p className="text-sm text-zinc-600">activates when backend probes are enabled</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">security status</p>
          <p className="text-sm text-zinc-600">activates when backend probes are enabled</p>
        </div>
      </div>

      {/* 4. Footer Metadata */}
      <div className="pt-8 border-t border-white/[0.05] flex gap-8 text-[10px] font-mono uppercase tracking-tighter text-zinc-600">
        <div>env: {status.environment}</div>
        <div>last_check: {status.lastCheck}</div>
      </div>
    </div>
  );
}

function ComponentRow({ name, status }: { name: string; status: { label: string; color: string } }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-white/[0.05] last:border-0">
      <span className="text-sm font-medium text-zinc-400 lowercase">{name}</span>
      <span className={`text-[10px] font-black px-2 py-1 rounded ${status.color}`}>
        {status.label}
      </span>
    </div>
  );
}