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
    <div className="p-8 max-w-6xl space-y-12 animate-in fade-in duration-700">
      {/* 1. Header — strictly lowercase matching billing */}
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight lowercase">documentation</h1>
        <p className="text-zinc-500 mt-2 font-medium lowercase">technical guides and api references for autonomous agents.</p>
      </div>

      {/* 2. Navigational Grid — matching Workspace card style */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <div 
            key={section.title} 
            className="bg-[#111827] border border-white/[0.05] rounded-[2rem] p-8 shadow-xl hover:border-white/[0.1] transition-all group"
          >
            {/* Workspace Icon Container */}
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/[0.05] flex items-center justify-center mb-6">
              <section.icon className="w-5 h-5 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
            </div>

            <h3 className="text-xl font-bold text-white mb-6 tracking-tight lowercase">
              {section.title}
            </h3>

            {/* Navigational Rows */}
            <div className="space-y-4">
              {section.items.map((item) => (
                <button 
                  key={item} 
                  className="flex w-full items-center justify-between text-sm font-medium text-zinc-500 hover:text-white transition-colors group/item"
                >
                  <span className="lowercase">{item}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover/item:opacity-40 transition-all -translate-x-2 group-hover/item:translate-x-0" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Footer Metadata */}
      <div className="pt-8 border-t border-white/[0.05]">
        <div className="flex gap-8 text-[10px] font-mono uppercase tracking-tighter text-zinc-600">
          <span>version: 1.0.0-stable</span>
          <span>last_updated: 2026-01-05</span>
        </div>
      </div>
    </div>
  );
}