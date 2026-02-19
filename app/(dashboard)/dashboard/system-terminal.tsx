"use client";

import React, { useState, useEffect } from "react";
import { Terminal } from "lucide-react";

export function SystemTerminal() {
  const [logs, setLogs] = useState([
    "Checking agent heartbeats...",
    "All scrapers initialized in headless mode.",
    "Waiting for incoming lead signals...",
  ]);

  // Example: This effect simulates the system "thinking" or finding events
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEvents = [
        "Scanning vector database for optimizations...",
        "Lead signal detected in region: US-EAST",
        "Refreshing API gateway handshake...",
        "Encryption keys rotated successfully.",
      ];
      const newEvent = randomEvents[Math.floor(Math.random() * randomEvents.length)];
      
      setLogs((prev) => [newEvent, ...prev.slice(0, 2)]);
    }, 10000); // Add a new log every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 bg-black border border-zinc-800 rounded-[2.5rem] font-mono shadow-2xl transition-all">
      <div className="flex items-center gap-2 mb-6">
        <Terminal className="w-4 h-4 text-indigo-500" />
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
          SYSTEM_LOG_v5.0.1
        </span>
      </div>
      <div className="space-y-2">
        {logs.map((log, i) => (
          <p 
            key={i} 
            className={`text-xs tracking-tight transition-opacity duration-500 ${
              i === 0 ? "text-emerald-500" : "text-emerald-500/50"
            }`}
          >
            {">"} {log}
          </p>
        ))}
        <p className="text-xs text-indigo-400 tracking-tight animate-pulse">
          {">"} Listener active...
        </p>
      </div>
    </div>
  );
}