"use client";

import { useState } from "react";
import { toggleBotStatus } from "@/app/actions/bot-actions";
import { Loader2, AlertCircle } from "lucide-react";

interface StatusToggleProps {
  botId: string;
  initialStatus: boolean;
}

export function StatusToggle({ botId, initialStatus }: StatusToggleProps) {
  const [isRunning, setIsRunning] = useState(initialStatus);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async () => {
    // 1. Prevent double-submissions and clear previous errors
    setIsPending(true);
    setError(null);

    // 2. Execute the Server Action (Passing !isRunning because we want the NEW state)
    // Note: The Server Action logic we wrote only charges credits if new state is TRUE
    const result = await toggleBotStatus(botId, !isRunning);

    if (result.success) {
      // 3. Update local UI only on server success
      setIsRunning(!isRunning);
    } else {
      // 4. Handle rejection (e.g., Insufficient Credits)
      setError(result.error || "Failed to update node");
      
      // Auto-clear error message after 4 seconds
      setTimeout(() => setError(null), 4000);
    }
    
    setIsPending(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <button 
        onClick={handleToggle}
        disabled={isPending}
        className="flex items-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        title={isRunning ? "Terminate Node" : "Initialize Node (1 Credit)"}
      >
        <div className="relative flex items-center justify-center">
          {/* Status Indicator Dot */}
          <span className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
            isRunning 
              ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)] animate-pulse' 
              : 'bg-zinc-700 shadow-none'
          }`} />
          
          {/* Spinner Overlay */}
          {isPending && (
            <Loader2 className="w-3 h-3 absolute animate-spin text-indigo-400" />
          )}
        </div>

        <p className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
          isRunning ? 'text-emerald-400' : 'text-zinc-500 group-hover:text-zinc-300'
        }`}>
          {isRunning ? 'Running' : 'Idle'}
        </p>
      </button>

      {/* Error Feedback Hook */}
      {error && (
        <div className="flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-300">
          <AlertCircle className="w-3 h-3 text-rose-500" />
          <p className="text-[9px] font-bold text-rose-500 uppercase tracking-tighter">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}