"use client";

import React from "react";
import { X, Zap, Check } from "lucide-react";
import { useRouter } from "next/navigation";

export function UpgradeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#0D1525] border border-white/[0.1] rounded-[2.5rem] max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
              <Zap className="w-6 h-6 text-indigo-400 fill-indigo-400" />
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <X className="w-5 h-5 text-zinc-500" />
            </button>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black text-white tracking-tight lowercase">Upgrade Required</h2>
            <p className="text-zinc-400 font-medium">Your current plan does not support active neural nodes. Unlock Pro to initialize your agents.</p>
          </div>

          <div className="space-y-3">
            {["Unlimited bot initialization", "High-priority neural load", "Advanced SSL security gates", "24/7 Runtime monitoring"].map((feat) => (
              <div key={feat} className="flex items-center gap-3 text-sm font-bold text-zinc-300">
                <Check className="w-4 h-4 text-emerald-500" /> {feat}
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button 
              onClick={() => router.push("/dashboard/billing")}
              className="h-14 w-full bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95"
            >
              View Pro Plans
            </button>
            <button 
              onClick={onClose}
              className="h-14 w-full bg-white/[0.03] text-zinc-500 rounded-2xl font-bold text-sm uppercase tracking-widest hover:text-white transition-all"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}