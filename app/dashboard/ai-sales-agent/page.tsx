"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Power, 
  Activity, 
  Terminal, 
  Zap, 
  Shield, 
  Settings, 
  Target,
  BarChart3,
  Bot
} from "lucide-react";
import { UpgradeModal } from "@/components/UpgradeModal";

// --- Configuration (Simulation Only) ---
// Changed from 'free' to 'agency' to unlock unlimited testing
const CURRENT_PLAN = "free"; 
const DEMO_LIMIT_MS = 10000; // Ignored when plan is 'agency'

// --- Currency Helper (GBP Standard) ---
const formatGBP = (amount: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(amount);

// --- Simulation Data ---
const LOG_MESSAGES = [
  "Initializing neural intent scanner...",
  "Connecting to Leads Engine v2.4...",
  "Analyzing prospect: Acme Corp [Score: 88]...",
  "Detected buying signal: 'Hiring SDRs'...",
  "Drafting personalized outreach (Strategy: Direct)...",
  "Skipping lead: Low confidence match...",
  "Optimizing send time for target timezone...",
  "Verifying email deliverability...",
  "Agent heartbeat stable...",
  "Syncing CRM status...",
  "Enriching contact data...",
];

export default function AISalesAgentPage() {
  // --- State ---
  const [isActive, setIsActive] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Metrics State
  const [stats, setStats] = useState({
    sent: 142,
    replies: 12,
    meetings: 3,
    saved: 1250.00
  });

  // Settings State
  const [volume, setVolume] = useState(50);
  const [risk, setRisk] = useState("Balanced");

  // --- Auto-Scroll Terminal ---
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // --- The Simulation Engine ---
  useEffect(() => {
    // ✅ TypeScript Timer Fixes Included
    let activityInterval: ReturnType<typeof setInterval>;
    let demoTimer: ReturnType<typeof setTimeout>;

    if (isActive) {
      // 1. Start the "Matrix" Log Feed
      activityInterval = setInterval(() => {
        const randomMsg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
        const timestamp = new Date().toLocaleTimeString([], { hour12: false });
        setLogs(prev => [...prev.slice(-20), `[${timestamp}] ${randomMsg}`]);

        // ✅ Realistic Stat Increments (£0.50 per email)
        if (Math.random() > 0.7) {
          const newEmails = Math.floor(Math.random() * 3) + 1; 
          const estimatedSavings = Number((newEmails * 0.50).toFixed(2)); 
          
          setStats(prev => ({ 
            ...prev, 
            sent: prev.sent + newEmails, 
            saved: Number((prev.saved + estimatedSavings).toFixed(2))
          }));
        }
      }, 1500);

      // 2. Enforce Free Plan Limits (Only if plan is 'free')
      if (CURRENT_PLAN === 'free') {
        demoTimer = setTimeout(() => {
          setIsActive(false);
          setIsUpgradeOpen(true);
          setLogs(prev => [...prev, "⚠️ DEMO LIMIT REACHED. PAUSING AGENT."]);
        }, DEMO_LIMIT_MS);
      }
    }

    return () => {
      clearInterval(activityInterval);
      clearTimeout(demoTimer);
    };
  }, [isActive]);

  const toggleAgent = () => {
    if (!isActive) {
      setLogs(prev => [...prev, ">>> SYSTEM STARTUP INITIATED"]);
      setIsActive(true);
    } else {
      setLogs(prev => [...prev, ">>> SYSTEM SHUTDOWN"]);
      setIsActive(false);
    }
  };

  return (
    <div className="h-full w-full bg-[#0B1120] text-slate-200 font-sans flex flex-col overflow-hidden">
      <UpgradeModal isOpen={isUpgradeOpen} onClose={() => setIsUpgradeOpen(false)} />

      {/* --- Header --- */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-zinc-800 bg-[#0B1120] shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-xl bg-[#1E293B] border border-slate-700/50 shadow-lg shadow-green-900/10">
            <Bot className="w-5 h-5 text-[#00C26D]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              AI Sales Agent
              <span className="px-2 py-0.5 rounded-full bg-[#00C26D]/10 text-[#00C26D] text-[10px] font-bold tracking-wide uppercase border border-[#00C26D]/20">
                Autonomous
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">Mission Control Center</p>
          </div>
        </div>
        
        {/* Plan Badge */}
        <div className="px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-xs font-mono text-slate-400">
          PLAN: <span className="text-white uppercase font-bold">{CURRENT_PLAN}</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-12 gap-6 h-full max-h-[800px]">
          
          {/* --- LEFT COLUMN: VISUALIZER & CONTROLS (Cols 4) --- */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            
            {/* 1. Active State Visualizer */}
            <div className="relative flex-1 min-h-[300px] bg-[#1E293B] border border-slate-700/50 rounded-2xl p-6 flex flex-col items-center justify-center overflow-hidden shadow-2xl">
              {/* Animated Background Pulse */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                {isActive && (
                  <>
                    <motion.div 
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      className="absolute w-64 h-64 rounded-full border border-[#00C26D]"
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                      className="absolute w-48 h-48 rounded-full border border-[#00C26D]"
                    />
                  </>
                )}
              </div>

              {/* Status Text */}
              <div className={`mb-8 text-sm font-bold tracking-[0.2em] uppercase transition-colors ${isActive ? 'text-[#00C26D]' : 'text-slate-600'}`}>
                {isActive ? 'System Online' : 'System Idle'}
              </div>

              {/* Power Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleAgent}
                className={`relative w-32 h-32 rounded-full flex items-center justify-center border-4 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-500 group z-10 ${
                  isActive 
                    ? 'bg-[#00C26D] border-[#00C26D] shadow-[#00C26D]/40' 
                    : 'bg-[#0F172A] border-slate-700 hover:border-slate-500'
                }`}
              >
                <Power className={`w-12 h-12 transition-all duration-500 ${isActive ? 'text-white' : 'text-slate-600 group-hover:text-slate-400'}`} />
              </motion.button>
              
              {/* Helper Text */}
              <p className="mt-8 text-xs text-slate-500 text-center max-w-[200px]">
                {CURRENT_PLAN === 'free' ? 'Demo Mode: Runs for 10s per session' : 'Auto-Pilot Mode Ready'}
              </p>
            </div>

            {/* 2. Configuration Lite */}
            <div className="bg-[#1E293B] border border-slate-700/50 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-4 h-4 text-slate-400" />
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Configuration</h3>
              </div>

              <div className="space-y-4">
                {/* Target */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Target Source</label>
                  <div className="mt-1 flex items-center justify-between p-2 bg-[#0F172A] border border-slate-700 rounded-lg">
                    <span className="text-xs text-slate-300">Leads Engine (Active)</span>
                    <Target className="w-3 h-3 text-[#00C26D]" />
                  </div>
                </div>

                {/* Volume Slider */}
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Daily Volume</label>
                    <span className="text-[10px] text-[#00C26D] font-mono">{volume} / day</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" max="100" 
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    disabled={isActive}
                    className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#00C26D]"
                  />
                </div>

                {/* Risk Tolerance */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Risk Tolerance</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Conservative', 'Balanced', 'Aggressive'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setRisk(mode)}
                        disabled={isActive}
                        className={`px-2 py-1.5 text-[10px] font-medium rounded border transition-all ${
                          risk === mode 
                            ? 'bg-[#00C26D]/10 border-[#00C26D] text-[#00C26D]' 
                            : 'bg-transparent border-slate-700 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN: METRICS & TERMINAL (Cols 8) --- */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            
            {/* 3. Performance HUD */}
            <div className="grid grid-cols-4 gap-4">
               <StatsCard label="Emails Sent" value={stats.sent} icon={Zap} color="text-yellow-400" />
               <StatsCard label="Replies" value={stats.replies} icon={Activity} color="text-[#00C26D]" />
               <StatsCard label="Meetings" value={stats.meetings} icon={BarChart3} color="text-indigo-400" />
               {/* ✅ UK GBP FORMATTING APPLIED HERE */}
               <StatsCard label="Money Saved" value={formatGBP(stats.saved)} icon={Shield} color="text-emerald-400" />
            </div>

            {/* 4. The Matrix Terminal */}
            <div className="flex-1 bg-[#0F172A] border border-slate-700/50 rounded-2xl overflow-hidden flex flex-col shadow-2xl relative">
              
              {/* Terminal Header */}
              <div className="bg-[#1E293B] px-4 py-2 border-b border-slate-700 flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-mono text-slate-400">agent_logs.log</span>
                 </div>
                 <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                 </div>
              </div>

              {/* Scrollable Logs */}
              <div 
                ref={scrollRef}
                className="flex-1 p-4 font-mono text-xs space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700"
              >
                {logs.length === 0 && (
                  <div className="h-full flex items-center justify-center text-slate-600 opacity-50">
                    Press Power Button to Initialize...
                  </div>
                )}
                <AnimatePresence>
                  {logs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[#00C26D]/80 border-l-2 border-transparent hover:border-[#00C26D]/30 pl-2"
                    >
                      <span className="opacity-50 mr-2">{log.startsWith('[') ? '' : '>'}</span>
                      {log}
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isActive && (
                   <motion.div 
                     animate={{ opacity: [0, 1] }}
                     transition={{ repeat: Infinity, duration: 0.8 }}
                     className="w-2 h-4 bg-[#00C26D] inline-block ml-2"
                   />
                )}
              </div>

              {/* Status Footer */}
              <div className="bg-[#1E293B] border-t border-slate-700/50 px-4 py-1.5 flex justify-between items-center">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">CPU: <span className="text-slate-300">12%</span></span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">RAM: <span className="text-slate-300">440MB</span></span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-1">
                   Network: 
                   <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#00C26D]' : 'bg-red-500'}`} />
                </span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sub-Components ---

const StatsCard = ({ label, value, icon: Icon, color }: any) => (
  <div className="bg-[#1E293B] border border-slate-700/50 rounded-xl p-4 shadow-lg flex flex-col justify-between h-24">
    <div className="flex justify-between items-start">
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
      <Icon className={`w-4 h-4 ${color}`} />
    </div>
    <div className="text-2xl font-bold text-slate-200">{value}</div>
  </div>
);  