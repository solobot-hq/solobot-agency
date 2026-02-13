"use client"; // 👈 This marks it as a Client Component

import { useState } from "react";
import { Loader2, Square } from "lucide-react";
import { toggleBotStatus } from "@/app/actions/bot-actions";

export default function TerminateButton({ botId }: { botId: string }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTerminate = async () => {
    setIsProcessing(true);
    await toggleBotStatus(botId, false);
    setIsProcessing(false);
  };

  return (
    <button 
      onClick={handleTerminate}
      disabled={isProcessing}
      className="h-11 px-8 rounded-xl text-xs font-black bg-rose-600 text-white hover:bg-rose-500 transition-all flex items-center gap-2"
    >
      {isProcessing ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <><Square className="w-3.5 h-3.5 fill-current" /> Terminate</>
      )}
    </button>
  );
}