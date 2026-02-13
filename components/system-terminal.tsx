"use client";

import React, { useEffect, useState, useRef } from "react";
import { Terminal as TerminalIcon, ShieldCheck, Cpu } from "lucide-react";

/**
 * 🖥️ SYSTEM TERMINAL (CLIENT COMPONENT)
 * Handles visual log streaming and periodic polling via the API bridge.
 * Single Source of Truth: Prisma Activity Table.
 */
export function SystemTerminal() {
  const [logs, setLogs] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isLive, setIsLive] = useState(true);

  const fetchLogs = async () => {
    try {
      // 🛰️ Hits the hardened API route bridge (Phase 5 Hardening)
      const res = await fetch("/api/terminal/logs");
      if (!res.ok) throw new Error("Stream interrupted");
      const latest = await res.json();
      
      // Reverse to show newest at the bottom for standard terminal UX
      setLogs(latest.reverse());
      setIsLive(true);
    } catch (err) {
      console.error("TERMINAL_POLL_FAILED:", err);
      setIsLive(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000); // 5s High-Frequency Polling
    return () => clearInterval(interval);
  }, []);

  // 📜 Auto-scroll to bottom when new signals arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-black/90 border border-zinc-800 rounded-[2.5rem] h-full flex flex-col overflow-hidden font-mono shadow-2xl min-h-[400px]">
      
      {/* 🛠️ Terminal Header */}
      <div className="bg-zinc-900/50 px-6 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full border ${isLive ? 'bg-emerald-500/20 border-emerald-500/40' : 'bg-rose-500/20 border-rose-500/40'}`} />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500/20 border border-indigo-500/40" />
          </div>
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-2">
            <TerminalIcon className="w-3 h-3 text-indigo-500" /> core_kernel_v7.3
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[8px] font-black uppercase tracking-tighter ${isLive ? 'text-emerald-500' : 'text-rose-500'}`}>
            {isLive ? 'Link_Active' : 'Link_Offline'}
          </span>
          <ShieldCheck className={`w-3 h-3 ${isLive ? 'text-emerald-500/50' : 'text-rose-500/50'}`} />
        </div>
      </div>

      {/* 🚀 Terminal Output */}
      <div 
        ref={scrollRef}
        className="flex-1 p-6 overflow-y-auto space-y-2 scrollbar-hide text-[11px] leading-relaxed selection:bg-indigo-500/30"
      >
        <p className="text-zinc-600 italic">-- Initializing secure link to Neon cluster...</p>
        <p className="text-emerald-500/70 underline mb-4 uppercase text-[9px] font-bold tracking-widest">
          Connection established. Monitoring neural signals.
        </p>
        
        {logs.map((log) => (
          <div key={log.id} className="flex gap-4 group animate-in fade-in slide-in-from-left-2 duration-300">
            <span className="text-zinc-700 shrink-0 font-bold">
              [{new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}]
            </span>
            <span className="text-indigo-400 shrink-0 font-semibold">@{log.target.toLowerCase()}</span>
            <span className={`break-all ${
              log.type === 'WARNING' || log.message.includes('BLOCKED') ? 'text-amber-400' : 
              log.type === 'ERROR' ? 'text-rose-400' : 
              'text-zinc-300'
            }`}>
              {log.message}
            </span>
          </div>
        ))}
        
        {/* Animated Cursor */}
        <div className="flex items-center gap-2 text-indigo-500 animate-pulse mt-4">
          <span className="font-bold">{'>'}</span>
          <div className="w-2.5 h-4 bg-indigo-500/40" />
        </div>
      </div>

      {/* 📊 Footer / Hardware Meta */}
      <div className="px-6 py-4 bg-indigo-500/5 border-t border-indigo-500/10 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-[9px] text-zinc-500 uppercase font-black tracking-tighter text-glow-sm">
              CPU: {isLive ? '14.2%' : '0.0%'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[9px] text-zinc-600 uppercase font-black tracking-tighter">Mem_Load</span>
            <div className="w-20 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className={`h-full bg-indigo-500 transition-all duration-1000 ${isLive ? 'w-1/3 animate-pulse' : 'w-0'}`} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[9px] text-zinc-700 font-black tracking-[0.2em] uppercase">UTC_STABLE</span>
        </div>
      </div>
    </div>
  );
}