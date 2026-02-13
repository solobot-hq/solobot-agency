"use client";

import { useState } from "react";
import { Skull, AlertTriangle, Loader2, X } from "lucide-react";
import { emergencyKillAll } from "@/app/actions/bot-actions";

export function KillSwitchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleExecute = async () => {
    setLoading(true);
    const result = await emergencyKillAll();
    if (result.success) {
      onClose();
    } else {
      alert("Termination sequence failed. Manual override required.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-[#0D1525] border border-rose-500/30 w-full max-w-md rounded-[2.5rem] p-10 shadow-[0_0_50px_rgba(225,29,72,0.2)] relative overflow-hidden">
        
        {/* Background Warning Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-600/10 blur-[100px]" />

        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center mb-6 border border-rose-500/20">
            <Skull className="text-rose-500 w-10 h-10 animate-pulse" />
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight uppercase mb-2">
            Confirm Global Kill
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed mb-8">
            You are about to terminate all active neural nodes. This will stop all scrapers, outreach, and tasks immediately. This action is logged.
          </p>

          <div className="grid grid-cols-2 gap-4 w-full">
            <button
              onClick={onClose}
              className="py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-bold text-zinc-400 hover:bg-white/5 transition-all"
            >
              Abort
            </button>
            <button
              disabled={loading}
              onClick={handleExecute}
              className="py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Kill"}
            </button>
          </div>
          
          <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-rose-500/50 uppercase tracking-[0.2em]">
            <AlertTriangle size={12} /> Priority One Override
          </div>
        </div>
      </div>
    </div>
  );
}