import { infrastructureStatus } from "@/lib/infrastructure/status";

export default function InfrastructurePage() {
  const status = infrastructureStatus;

  // Status Mapping Logic aligned with Workspace standards
  const getPill = (val: string) => {
    switch (val) {
      case "connected":
        return { label: "RUNNING", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" };
      case "idle":
        return { label: "IDLE", color: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" };
      case "unavailable":
      case "offline":
        return { label: "FAILED", color: "bg-red-500/10 text-red-500 border-red-500/20" };
      default:
        return { label: "DISABLED", color: "bg-white/5 text-zinc-600 border-white/10" };
    }
  };

  return (
    <div className="p-8 max-w-4xl space-y-10 animate-in fade-in duration-500">
      {/* 1. Header normalized to Workspace hierarchy */}
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight lowercase">infrastructure</h1>
        <p className="text-zinc-500 mt-2 font-medium lowercase">direct status report from agency core services.</p>
      </div>

      {/* 2. System Components List — matching Workspace density */}
      <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-[#0D1525]">
        <ComponentRow name="api gateway" status={getPill(status.apiGateway)} />
        <ComponentRow name="agent workers" status={getPill(status.agentWorkers)} />
        <ComponentRow name="vector database" status={getPill(status.vectorDatabase)} />
        <ComponentRow name="job queue" status={getPill(status.jobQueue)} />
      </div>

      {/* 3. Locked Sections (Administrative Metadata) */}
      <div className="space-y-6 opacity-40 select-none">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">realtime monitoring</p>
          <p className="text-sm text-zinc-600 lowercase">activates when backend probes are enabled</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">audit logs</p>
          <p className="text-sm text-zinc-600 lowercase">activates when backend probes are enabled</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">security status</p>
          <p className="text-sm text-zinc-600 lowercase">activates when backend probes are enabled</p>
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
    <div className="flex items-center justify-between p-6 border-b border-white/[0.05] last:border-0 hover:bg-white/[0.01] transition-colors">
      <span className="text-sm font-medium text-zinc-400 lowercase">{name}</span>
      <span className={`text-[10px] font-black px-2 py-1 rounded border ${status.color}`}>
        {status.label}
      </span>
    </div>
  );
}