"use client";

import React from "react";
import { Clock, Zap, AlertCircle, CheckCircle2 } from "lucide-react";
// ✅ IMPORT: Reference the generated Prisma types directly
import { Activity } from "@/generated/prisma/client";

/**
 * ✅ DYNAMIC STATUS ICON
 * Logic maps the "action" type or metadata content to a visual state.
 */
const StatusIcon = ({ action }: { action: string }) => {
  // Mapping specific actions to colors for high-end telemetry feel
  if (action.includes("SUCCESS") || action.includes("COMPLETED")) {
    return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
  }
  if (action.includes("FAILED") || action.includes("ERROR")) {
    return <AlertCircle className="h-4 w-4 text-rose-500" />;
  }
  return <Zap className="h-4 w-4 text-indigo-500 animate-pulse" />;
};

export function ActivityFeed({ logs }: { logs: Activity[] }) {
  if (!logs || logs.length === 0) {
    return (
      <div className="py-12 bg-[#0D1525] border border-dashed border-white/[0.08] rounded-[2.5rem] text-center">
        <p className="text-zinc-500 text-[11px] font-black uppercase tracking-[0.3em] italic">
          No telemetry recorded.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-2 text-zinc-600 mb-4 px-2">
        <Clock className="w-3.5 h-3.5" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">
          System Activity Feed
        </span>
      </div>
      
      {/* TIMELINE TRACK */}
      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-white/[0.05]">
        {logs.map((log) => (
          <div key={log.id} className="relative flex items-center gap-6 group">
            {/* Status Node */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0D1525] border border-white/[0.08] ring-8 ring-[#0B1221] transition-all group-hover:border-indigo-500/50 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <StatusIcon action={log.action} />
            </div>

            {/* Log Content */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-black text-white uppercase tracking-tighter italic">
                  {log.action}
                </span>
                <span className="text-[10px] font-black text-zinc-600 tabular-nums uppercase tracking-widest">
                  {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
              
              {/* METADATA PARSING: Safely handle the JSON metadata field */}
              <div className="text-[11px] font-bold text-zinc-500 mt-1 truncate max-w-md">
                {log.metadata && typeof log.metadata === 'object' ? (
                  <span className="flex items-center gap-2 uppercase tracking-tight">
                    <span className="text-zinc-700">Payload:</span>
                    <span className="text-zinc-300">
                      {/* Change 'target' to 'name' or whatever key exists in your bot metadata */}
                      {(log.metadata as any).target || (log.metadata as any).botName || "System Process"}
                    </span>
                  </span>
                ) : (
                  <span className="italic opacity-50">Background Task Processed</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}