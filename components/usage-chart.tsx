"use client";

import React, { useMemo } from "react";
import { useUsage } from "@/app/context/usage-context";

export function UsageChart() {
  const { creditsUsed } = useUsage();

  // We use useMemo to generate the "historical" bars once
  // but let the last bar react to the live credit count
  const bars = useMemo(() => [
    65, 45, 75, 55, 90, 65, 45, 80, 50, 70, 85, 60, 45
  ], []);

  // Calculate the "Live Intensity" based on the current credit spend
  const liveBarHeight = Math.min((creditsUsed % 100), 100);

  return (
    <div className="h-48 flex items-end justify-between gap-2 px-2">
      {bars.map((val, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
          <div className="w-full bg-indigo-500/20 rounded-t-md h-full relative flex items-end">
             <div 
               className="w-full bg-indigo-500/40 rounded-t-md transition-all duration-1000" 
               style={{ height: `${val}%` }} 
             />
          </div>
        </div>
      ))}
      {/* THE LIVE BAR */}
      <div className="flex-1 flex flex-col items-center gap-1 group">
        <div className="w-full bg-indigo-500/20 rounded-t-md h-full relative flex items-end">
           <div 
             className="w-full bg-indigo-500 rounded-t-md transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
             style={{ height: `${liveBarHeight}%` }} 
           />
        </div>
        <span className="text-[8px] font-black text-indigo-400 animate-pulse uppercase">Live</span>
      </div>
    </div>
  );
}