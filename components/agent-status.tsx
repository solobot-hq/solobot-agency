import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

type AgentStatus = "idle" | "running" | "failed";

export function AgentStatus({ status }: { status: AgentStatus }) {
  if (status === "running") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 bg-indigo-400/10 px-2.5 py-1 rounded-full border border-indigo-400/20">
        <Loader2 className="w-3 h-3 animate-spin" />
        Running
      </span>
    );
  }

  if (status === "failed") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 bg-rose-400/10 px-2.5 py-1 rounded-full border border-rose-400/20">
        <AlertCircle className="w-3 h-3" />
        Failed
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
      <CheckCircle2 className="w-3 h-3" />
      Idle
    </span>
  );
}