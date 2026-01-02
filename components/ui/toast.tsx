"use client";

import React, { useEffect } from "react";
import { CheckCircle2, Info, X, AlertCircle } from "lucide-react";

interface ToastProps {
  message: string;
  // ✅ FIXED: Added "error" to the type definition to resolve TS2322
  type: "success" | "info" | "error";
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // Extended to 5s for better readability
    return () => clearTimeout(timer);
  }, [onClose]);

  // Dynamic styling based on type
  const typeStyles = {
    success: {
      container: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      icon: <CheckCircle2 className="w-5 h-5" />,
      label: "Process Success"
    },
    info: {
      container: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
      icon: <Info className="w-5 h-5" />,
      label: "System Update"
    },
    error: {
      container: "bg-red-500/10 border-red-500/20 text-red-400",
      icon: <AlertCircle className="w-5 h-5" />,
      label: "System Alert"
    }
  };

  const currentStyle = typeStyles[type];

  return (
    <div className="fixed bottom-8 right-8 z-[110] animate-in slide-in-from-right-10 fade-in duration-300">
      {/* ✅ STYLING: Updated to #0D1525 and rounded-[2rem] for World-Class look */}
      <div className="bg-[#0D1525] border border-white/[0.08] p-5 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4 min-w-[340px] backdrop-blur-md">
        
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${currentStyle.container}`}>
          {currentStyle.icon}
        </div>
        
        <div className="flex-1">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] leading-none mb-1.5 italic">
            {currentStyle.label}
          </p>
          <p className="text-sm font-black text-white uppercase tracking-tighter leading-tight">
            {message}
          </p>
        </div>

        <button 
          onClick={onClose} 
          className="p-1 hover:bg-white/5 rounded-lg text-zinc-600 hover:text-white transition-all active:scale-90"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}