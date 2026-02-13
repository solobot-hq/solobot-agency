"use client";

import { useState } from "react";
import { emergencyKillAll } from "@/app/actions/bot-actions";
import { Skull, Loader2, ShieldAlert } from "lucide-react";

export function KillSwitch() {
  const [isConfirming, setIsConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleKill = async () => {
    setLoading(true);
    await emergencyKillAll();
    setIsConfirming(false);
    setLoading(false);
  };

  return (
    <div className="relative">
      {!isConfirming ? (
        <button 
          onClick={() => setIsConfirming(true)}
          className="h-12 px-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all flex items-center gap-3"
        >
          <Skull className="w-4 h-4" /> Emergency Stop
        </button>
      ) : (
        <div className="flex items-center gap-2 animate-in zoom-in duration-300">
          <button 
            disabled={loading}
            onClick={handleKill}
            className="h-12 px-6 rounded-2xl bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all flex items-center gap-3 shadow-lg shadow-rose-900/40"
          >
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Confirm Immediate Stop"}
          </button>
          <button 
            onClick={() => setIsConfirming(false)}
            className="h-12 px-4 rounded-2xl bg-zinc-900 text-zinc-500 text-[10px] font-bold uppercase tracking-widest"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}