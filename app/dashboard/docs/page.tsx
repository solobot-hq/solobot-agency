"use client";

import React from "react";

export default function DocsPage() {
  const sections = [
    { 
      label: "getting started", 
      detail: "authentication, system requirements, and quick start guide protocols." 
    },
    { 
      label: "infrastructure caps", 
      detail: "technical specifications for daily runs, threads, and operational autonomy." 
    },
    { 
      label: "api reference", 
      detail: "endpoint overview, rate limiting, and webhook security documentation." 
    }
  ];

  return (
    <div className="p-8 max-w-4xl space-y-10 animate-in fade-in duration-500">
      {/* 1. Header — strictly lowercase matching workspace hierarchy */}
      <div>
        <h1 className="text-4xl font-bold text-white tracking-tight lowercase">documentation</h1>
        <p className="text-zinc-500 mt-2 font-medium lowercase">technical guides and api references for autonomous agents.</p>
      </div>

      {/* 2. Navigational List — normalized to workspace row density and rhythm */}
      <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-[#0D1525]/30">
        {sections.map((section) => (
          <div 
            key={section.label} 
            className="p-6 border-b border-white/[0.05] last:border-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-8 hover:bg-white/[0.01] transition-colors group cursor-pointer"
          >
            <span className="text-sm font-bold text-zinc-300 lowercase w-48 shrink-0 group-hover:text-indigo-400 transition-colors">
              {section.label}
            </span>
            <span className="text-xs text-zinc-500 lowercase leading-relaxed">
              {section.detail}
            </span>
          </div>
        ))}
      </div>

      {/* 3. Footer Metadata — utilitarian and boring */}
      <div className="pt-8 border-t border-white/[0.05]">
        <div className="flex gap-8 text-[10px] font-mono uppercase tracking-tighter text-zinc-600">
          <span>version: 1.0.0-stable</span>
          <span>last_updated: 2026-01-05</span>
        </div>
      </div>
    </div>
  );
}