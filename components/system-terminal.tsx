"use client";

import React, { useState, useEffect } from "react";
import { Terminal } from "lucide-react";

export function SystemTerminal() {
  // ✅ State starts with standard system initialization messages
  const [logs, setLogs] = useState([
    "Checking agent heartbeats...",
    "All scrapers initialized in headless mode.",
    "Waiting for incoming lead signals...",
  ]);

  useEffect(() => {
    // ✅ This interval simulates active background processing
    const interval = setInterval(() => {
      const randomEvents = [
        "Scanning vector database for optimizations...",
        "Lead signal detected in region: US-EAST",
        "Refreshing API gateway handshake...",
        "Encryption keys rotated successfully.",
        "Analyzing sentiment trends in social-feed-04...",
        "Memory leak check: 0 issues found.",
        "Re-indexing neural patterns for agent-01..."
      ];
      
      const newEvent = randomEvents[Math.floor(Math.random() * randomEvents.length)];
      
      // ✅ We keep only the last 3 logs to prevent layout shifting
      setLogs((prev) => [newEvent, ...prev.slice(0, 2)]);
    }, 8000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 bg-black border border-zinc-800 rounded-[2.5rem] font-mono shadow-2xl transition-all h-full min-h-[220px]">
      {/* TERMINAL HEADER */}
      <div className="flex items-center gap-2 mb-6 border-b border-zinc-900 pb-2">
        <Terminal className="w-4 h-4 text-indigo-500" />
        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
          SYSTEM_LOG_v5.0.1
        </span>
      </div>

      {/* TERMINAL BODY */}
      <div className="space-y-3">
        {logs.map((log, i) => (
          <p 
            key={`${log}-${i}`} 
            className={`text-xs tracking-tight transition-all duration-700 ease-in-out ${
              i === 0 
                ? "text-emerald-400 opacity-100 translate-x-1" // Highlight the newest log
                : "text-emerald-500/30 opacity-60" // Fade out older logs
            }`}
          >
            <span className="text-zinc-700 mr-2">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}]</span>
            {">"} {log}
          </p>
        ))}

        {/* ACTIVE LISTENER INDICATOR */}
        <div className="flex items-center gap-2 pt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          <p className="text-[10px] font-bold text-indigo-400/80 tracking-widest uppercase">
            Listener active
          </p>
        </div>
      </div>
    </div>
  );
}