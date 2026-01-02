"use client";

import React, { useState } from "react";
import { 
  Activity, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Play, 
  Square, 
  RefreshCcw, 
  Settings2, 
  Database 
} from "lucide-react";

export default function BotConsolePage({ params }: { params: { id: string } }) {
  const [isRunning, setIsRunning] = useState(true);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700 pb-24">
      
      {/* 1. Page Header: Title Case and Telemetry ID */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.05] pb-10">
        <div>
          <p className="text-micro text-indigo-400 mb-2">NODE ID: {params.id}</p>
          <h1 className="text-section-title text-white tracking-tight">Sales Bot 01</h1>
        </div>
        <div className="flex gap-3">
          <button className="h-11 px-6 rounded-xl bg-white/[0.03] border border-white/[0.1] text-label text-white hover:bg-white/10 transition-all flex items-center gap-2">
            <Settings2 className="w-4 h-4" /> Configure
          </button>
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className={`h-11 px-8 rounded-xl text-label font-bold transition-all flex items-center gap-2 active:scale-95 shadow-sm ${
              isRunning 
                ? "bg-rose-600 text-white hover:bg-rose-500" 
                : "bg-emerald-600 text-white hover:bg-emerald-500"
            }`}
          >
            {isRunning ? (
              <><Square className="w-3.5 h-3.5" /> Terminate</>
            ) : (
              <><Play className="w-3.5 h-3.5" /> Initialize</>
            )}
          </button>
        </div>
      </div>

      {/* 2. Metrics Grid: Upright, Bold, Financial-Grade Authority */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-10 bg-[#0D1525] border border-white/[0.08] rounded-[2.5rem] shadow-2xl group">
          <Activity className="w-5 h-5 text-indigo-400 mb-8" />
          <p className="text-label text-zinc-500 mb-2">Uptime reliability</p>
          <p className="text-metric-lg text-white">99.9%</p>
        </div>

        <div className="p-10 bg-[#0D1525] border border-white/[0.08] rounded-[2.5rem] shadow-2xl group">
          <Cpu className="w-5 h-5 text-emerald-400 mb-8" />
          <p className="text-label text-zinc-500 mb-2">Neural load</p>
          <p className="text-metric-lg text-white">14.2ms</p>
        </div>

        <div className="p-10 bg-[#0D1525] border border-white/[0.08] rounded-[2.5rem] shadow-2xl group">
          <Database className="w-5 h-5 text-amber-400 mb-8" />
          <p className="text-label text-zinc-500 mb-2">State memory</p>
          <p className="text-metric-lg text-white">2.4GB</p>
        </div>
      </div>

      {/* 3. Main Operational Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Runtime Logs Stream */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 px-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Runtime live stream</h3>
          </div>
          <div className="bg-[#0D1525] border border-white/[0.08] rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-8 bg-black/20 font-mono text-sm leading-relaxed space-y-2 h-[320px] overflow-y-auto scrollbar-hide">
              <p className="text-zinc-500"><span className="text-indigo-500/50 mr-2">04:22:01</span> Initiating neural handshake...</p>
              <p className="text-zinc-500"><span className="text-indigo-500/50 mr-2">04:22:02</span> Auth key validated (Production)</p>
              <p className="text-emerald-400"><span className="text-indigo-500/50 mr-2">04:22:05</span> Agent deployed to node_us_east_4</p>
              <p className="text-zinc-500"><span className="text-indigo-500/50 mr-2">04:22:10</span> Synchronizing local state memory...</p>
              <p className="text-white/20">_</p>
            </div>
            <div className="p-6 bg-white/[0.02] border-t border-white/[0.05] flex items-center justify-between">
              <button className="text-label font-medium text-zinc-500 hover:text-white transition-colors">Clear stream</button>
              <button className="text-label font-bold text-indigo-400 hover:text-white flex items-center gap-2 transition-colors">
                Log Archive <RefreshCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Aside: Security and Infrastructure Health */}
        <aside className="bg-[#0D1525] border border-white/[0.08] rounded-[2.5rem] p-10 shadow-2xl h-fit space-y-10">
          <div>
            <ShieldCheck className="w-8 h-8 text-emerald-400 mb-8" />
            <h3 className="text-sm font-bold text-white mb-4">Security guard</h3>
            <p className="text-label text-zinc-400 leading-relaxed">
              Active AES-256 encryption on all outgoing thread signals. Neural safety gate validated for this session.
            </p>
          </div>
          
          <div className="pt-6 border-t border-white/[0.05]">
            <div className="flex justify-between mb-3">
              <span className="text-micro text-zinc-600">ENCRYPTION STATE</span>
              <span className="text-micro text-emerald-400">ACTIVE</span>
            </div>
            <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-full" />
            </div>
          </div>

          <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl text-center">
            <p className="text-micro text-zinc-600">CERTIFICATE EXPIRES IN 240 DAYS</p>
          </div>
        </aside>
      </div>
    </div>
  );
}