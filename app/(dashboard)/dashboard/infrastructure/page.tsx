import { infrastructureStatus } from "@/lib/infrastructure/status";
import { Cpu, Globe, Database, Activity } from "lucide-react";

export default function InfrastructurePage() {
  const status = infrastructureStatus;

  const getStatusAttr = (val: string) => {
    switch (val) {
      case "connected": return { label: "RUNNING", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
      case "idle": return { label: "IDLE", color: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" };
      case "unavailable": return { label: "FAILED", color: "bg-rose-500/10 text-rose-400 border-rose-500/20" };
      default: return { label: "DISABLED", color: "bg-zinc-500/5 text-zinc-600 border-white/[0.05]" };
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 p-8">
      <div>
        <h1 className="text-4xl font-bold text-white tracking-tight">Infrastructure</h1>
        <p className="text-zinc-500 mt-2 font-medium">Direct telemetry from agency core services.</p>
      </div>

      <div className="space-y-4">
        <ComponentCard name="API Gateway" icon={Globe} status={getStatusAttr(status.apiGateway)} />
        <ComponentCard name="Agent Workers" icon={Cpu} status={getStatusAttr(status.agentWorkers)} />
        <ComponentCard name="Vector Database" icon={Database} status={getStatusAttr(status.vectorDatabase)} />
        <ComponentCard name="Job Queue" icon={Activity} status={getStatusAttr(status.jobQueue)} />
      </div>
    </div>
  );
}

function ComponentCard({ name, icon: Icon, status }: any) {
  return (
    <div className="bg-[#111827] border border-zinc-800 rounded-[2rem] p-8 flex items-center justify-between group hover:border-zinc-700 transition-all">
      <div className="flex items-center gap-6">
        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          <Icon className="w-5 h-5 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
        </div>
        <h3 className="text-lg font-bold text-white">{name}</h3>
      </div>
      <span className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase border ${status.color}`}>
        {status.label}
      </span>
    </div>
  );
}