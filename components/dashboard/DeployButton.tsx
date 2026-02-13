"use client";

import { Plus } from "lucide-react";

export function DeployButton() {
  return (
    <button 
      onClick={() => console.log("Deploying...")}
      className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-900/20"
    >
      <Plus className="w-4 h-4" /> Deploy New Agent
    </button>
  );
}