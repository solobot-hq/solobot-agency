"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Database, Activity } from "lucide-react";

export function ResourceMonitor() {
  const [metrics, setMetrics] = useState({ cpu: 12, ram: 42, latency: 14 });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * (18 - 12 + 1) + 12),
        ram: Math.floor(Math.random() * (45 - 42 + 1) + 42),
        latency: Math.floor(Math.random() * (16 - 13 + 1) + 13),
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4">
      <ResourceGauge icon={<Cpu />} label="CPU" value={`${metrics.cpu}%`} color="text-indigo-400" />
      <ResourceGauge icon={<Database />} label="RAM" value={`${metrics.ram}%`} color="text-emerald-400" />
      <ResourceGauge icon={<Activity />} label="NET" value={`${metrics.latency}ms`} color="text-amber-400" />
    </div>
  );
}

function ResourceGauge({ icon, label, value, color }: any) {
  return (
    <div className="bg-[#0D1525] border border-white/[0.05] p-5 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-all">
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg bg-white/[0.02] ${color} group-hover:scale-110 transition-transform`}>
          {React.cloneElement(icon, { size: 16 })}
        </div>
        <div>
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{label}</p>
          <p className="text-sm font-bold text-white mt-0.5">{value}</p>
        </div>
      </div>
      <div className="h-1 w-12 bg-white/5 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-current ${color} transition-all duration-1000`} 
          style={{ width: value.includes('%') ? value : '60%' }} 
        />
      </div>
    </div>
  );
}