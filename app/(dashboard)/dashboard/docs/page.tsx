"use client";

import React from "react";
import { Book, Cpu, Code2, ArrowRight } from "lucide-react";

export default function DocsPage() {
  const sections = [
    { 
      title: "getting started", 
      icon: Book, 
      items: ["authentication", "system requirements", "quick start guide"] 
    },
    { 
      title: "infrastructure caps", 
      icon: Cpu, 
      items: ["daily runs", "concurrent threads", "operational autonomy"] 
    },
    { 
      title: "api reference", 
      icon: Code2, 
      items: ["endpoint overview", "rate limiting", "webhook security"] 
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 p-8 max-w-6xl">
      {/* 1. Header — Matching Workspace Heading Hierarchy */}
      <div>
        <h1 className="text-4xl font-bold text-white tracking-tight">Documentation</h1>
        <p className="text-zinc-500 mt-2 font-medium">Technical guides and API references for autonomous agents.</p>
      </div>

      {/* 2. Navigational Grid — Workspace Card Style with bg-[#111827] */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <div 
            key={section.title} 
            className="bg-[#111827] border border-white/[0.08] rounded-[2rem] p-8 shadow-xl hover:border-white/[0.15] transition-all group"
          >
            {/* High-Legibility Icon Container */}
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/[0.05] flex items-center justify-center mb-8">
              <section.icon className="w-6 h-6 text-zinc-500 group-hover:text-white transition-colors" />
            </div>

            {/* Brighter White Header for High Legibility */}
            <h3 className="text-xl font-black text-white mb-8 tracking-tight">
              <span className="lowercase">{section.title}</span>
            </h3>

            {/* Navigational Rows — Clean and Legible */}
            <div className="space-y-5">
              {section.items.map((item) => (
                <button 
                  key={item} 
                  className="flex w-full items-center justify-between text-sm font-medium text-zinc-500 hover:text-white transition-colors group/item"
                >
                  <span className="lowercase">{item}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-all -translate-x-2 group-hover/item:translate-x-0" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Footer Metadata — Consistent with Global Dashboard */}
      <div className="pt-8 border-t border-white/[0.05]">
        <div className="flex gap-8 text-[10px] font-mono uppercase tracking-tighter text-zinc-600">
          <span>version: 1.0.0-stable</span>
          <span>last_updated: 2026-01-05</span>
        </div>
      </div>
    </div>
  );
}