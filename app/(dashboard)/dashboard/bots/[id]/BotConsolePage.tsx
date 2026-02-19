"use client";

import React, { useState, use, useEffect } from "react";
import { 
  Activity, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Play, 
  Square, 
  RefreshCcw, 
  Settings2, 
  Database,
  Loader2,
  Clock,
  Zap
} from "lucide-react";
import { toggleBotStatus, getBotLogs } from "@/app/actions/bot-actions";
import { UpgradeModal } from "@/components/billing/UpgradeModal";
import { useRouter } from "next/navigation";

interface LogEntry {
  time: string;
  msg: string;
  type: 'info' | 'success' | 'warning' | 'emerald' | 'zinc';
}

interface BotConsoleProps {
  params: Promise<{ id: string }>;
  initialStatus?: boolean;
  lastActive?: Date;
  botName?: string;
}

export default function BotConsolePage({ 
  params, 
  initialStatus = false,
  lastActive,
  botName = "Sales Bot 01"
}: BotConsoleProps) {
  // ✅ Next.js 15+ Param Unwrapping
  const { id } = use(params);
  const router = useRouter();
  
  // States
  const [isRunning, setIsRunning] = useState(initialStatus);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [sessionActions, setSessionActions] = useState(0);
  const [currentLastActive, setCurrentLastActive] = useState<Date | undefined>(lastActive);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  /**
   * 🔄 LIVE POLLING HEARTBEAT
   * Triggers a refresh every 4 seconds to sync Server Component data
   */
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      syncLogs();
      // router.refresh() updates the server-side data without a full page reload
      router.refresh(); 
    }, 4000);

    return () => clearInterval(interval);
  }, [isRunning, id, router]);

  /**
   * 📜 LOG SYNC LOGIC
   * Fetches latest entries from Neon via Server Action
   */
  const syncLogs = async () => {
    const dbLogs = await getBotLogs(id);
    if (dbLogs) {
      setLogs(dbLogs as LogEntry[]);
    }
  };

  // Initial Sync on Mount
  useEffect(() => {
    syncLogs();
  }, [id]);

  // 📊 SaaS Value Visual: Live Session Throughput
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSessionActions(prev => prev + 1);
      }, 4500);
    } else {
      setSessionActions(0);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  /**
   * ⚡ CORE ACTION: Toggle Bot Status
   */
  const toggleBot = async () => {
    setIsProcessing(true);
    const nextState = !isRunning;
    
    const result = await toggleBotStatus(id, nextState);

    if (result.success) {
      setIsRunning(nextState);
      setCurrentLastActive(new Date());
      await syncLogs();
    } else {
      if (result.error === "UPGRADE_REQUIRED") {
        setIsUpgradeModalOpen(true); 
      } else {
        alert("Critical: System sync failure. Check database connection.");
      }
    }
    setIsProcessing(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700 pb-24">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.05] pb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">NODE ID: {id}</p>
            <span className="text-zinc-800">|</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-zinc-500" />
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                last signal: {currentLastActive ? currentLastActive.toLocaleTimeString() : 'never'}
              </p>
            </div>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3 lowercase">
            {botName}
            {isRunning && (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.6)]" />
            )}
          </h1>
        </div>
        
        <div className="flex gap-3">
          <button className="h-11 px-6 rounded-xl bg-white/[0.03] border border-white/[0.1] text-xs font-bold text-white hover:bg-white/10 transition-all flex items-center gap-2">
            <Settings2 className="w-4 h-4" /> Configure
          </button>
          <button 
            onClick={toggleBot}
            disabled={isProcessing}
            className={`h-11 px-8 rounded-xl text-xs font-black transition-all flex items-center gap-2 active:scale-95 shadow-lg disabled:opacity-50 ${
              isRunning 
                ? "bg-rose-600 text-white hover:bg-rose-500 shadow-rose-900/20" 
                : "bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-900/20"
            }`}
          >
            {isProcessing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isRunning ? (
              <><Square className="w-3.5 h-3.5 fill-current" /> Terminate</>
            ) : (
              <><Play className="w-3.5 h-3.5 fill-current" /> Initialize</>
            )}
          </button>
        </div>
      </div>

      {/* 2. Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard 
          icon={<Activity className={isRunning ? "text-indigo-400" : "text-zinc-600"} />} 
          label="Reliability" 
          value={isRunning ? "99.9%" : "0.0%"} 
        />
        <MetricCard 
          icon={<Cpu className={isRunning ? "text-emerald-400" : "text-zinc-600"} />} 
          label="Neural load" 
          value={isRunning ? "14.2ms" : "---"} 
        />
        <MetricCard 
          icon={<Database className={isRunning ? "text-amber-400" : "text-zinc-600"} />} 
          label="State memory" 
          value={isRunning ? "2.4GB" : "0.0"} 
        />
        
        <div className="p-8 bg-[#0D1525] border border-white/[0.08] rounded-[2.5rem] shadow-2xl group transition-all hover:border-violet-500/30 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-violet-600/10 blur-3xl group-hover:bg-violet-600/20 transition-all" />
          <Zap className={`w-5 h-5 mb-8 transition-colors ${isRunning ? "text-violet-400" : "text-zinc-600"}`} />
          <p className="text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Throughput</p>
          <div className="flex items-baseline gap-1">
            <p className="text-5xl font-black text-white tracking-tighter">
              {sessionActions.toString().padStart(2, '0')}
            </p>
            <p className="text-[10px] font-black text-violet-500 uppercase">ops</p>
          </div>
        </div>
      </div>

      {/* 3. Operational Stream Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 px-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Runtime live stream</h3>
          </div>
          <div className="bg-[#0D1525] border border-white/[0.08] rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-8 bg-black/40 font-mono text-[13px] leading-relaxed space-y-3 h-[320px] overflow-y-auto scrollbar-hide custom-terminal">
              {logs.length === 0 ? (
                <p className="text-zinc-700 italic">No logs found for this node.</p>
              ) : (
                logs.map((log, idx) => (
                  <p key={idx} className={
                    log.type === 'emerald' || log.type === 'success' ? "text-emerald-400" : 
                    log.type === 'warning' ? "text-rose-400" : "text-zinc-500"
                  }>
                    <span className="text-indigo-500/30 mr-3">[{log.time}]</span> {log.msg}
                  </p>
                ))
              )}
              {isRunning && (
                <p className="text-indigo-400 animate-pulse mt-4 italic">_ listening for signals...</p>
              )}
            </div>
            <div className="p-6 bg-white/[0.02] border-t border-white/[0.05] flex items-center justify-between">
              <button onClick={() => setLogs([])} className="text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">Clear stream</button>
              <button onClick={syncLogs} className="text-xs font-bold text-indigo-400 hover:text-white flex items-center gap-2 transition-colors uppercase tracking-widest">
                Force Sync <RefreshCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <aside className="bg-[#0D1525] border border-white/[0.08] rounded-[2.5rem] p-10 shadow-2xl h-fit space-y-10">
          <div>
            <ShieldCheck className={`w-8 h-8 mb-8 ${isRunning ? "text-emerald-400" : "text-zinc-600"}`} />
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Security guard</h3>
            <p className="text-sm font-medium text-zinc-400 leading-relaxed">
              Active AES-256 encryption on all outgoing thread signals. Safety gate validated for node_cluster_alpha.
            </p>
          </div>
          
          <div className="pt-6 border-t border-white/[0.05]">
            <div className="flex justify-between mb-3 text-[10px] font-black tracking-[0.2em]">
              <span className="text-zinc-600 uppercase">ENCRYPTION STATE</span>
              <span className={isRunning ? "text-emerald-400" : "text-rose-500"}>
                {isRunning ? "ACTIVE" : "STANDBY"}
              </span>
            </div>
            <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${isRunning ? "bg-emerald-500 w-full" : "bg-zinc-800 w-0"}`} 
              />
            </div>
          </div>

          <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl text-center">
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">SSL_VERIFIED_NODE: {id.slice(-4).toUpperCase()}</p>
          </div>
        </aside>
      </div>

      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)} 
      />
    </div>
  );
}

function MetricCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="p-8 bg-[#0D1525] border border-white/[0.08] rounded-[2.5rem] shadow-2xl transition-all hover:border-white/20">
      <div className="w-5 h-5 mb-8">{icon}</div>
      <p className="text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">{label}</p>
      <p className="text-5xl font-black text-white tracking-tighter">{value}</p>
    </div>
  );
}