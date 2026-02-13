"use client";

import { useState } from "react";
import { Skull } from "lucide-react";
import { KillSwitchModal } from "./KillSwitchModal";

export function KillSwitchTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="h-12 px-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all flex items-center gap-3 shadow-sm"
      >
        <Skull className="w-4 h-4" /> Emergency Stop
      </button>

      <KillSwitchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}