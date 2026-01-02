"use client";

import React from "react";
import { Book, Cpu, Code2, ArrowRight } from "lucide-react";

export default function DocsPage() {
  const sections = [
    { 
      title: "Getting started", 
      icon: Book, 
      items: ["Authentication", "System requirements", "Quick start guide"] 
    },
    { 
      title: "Core concepts", 
      icon: Cpu, 
      items: ["Autonomous workflows", "Agent state machine", "Token limits"] 
    },
    { 
      title: "API reference", 
      icon: Code2, 
      items: ["Endpoint overview", "Rate limiting", "Webhook security"] 
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* 1. Header Section - Matching Workspace Heading Hierarchy */}
      <div>
        <h1 className="text-4xl font-bold text-white tracking-tight">Documentation</h1>
        <p className="text-zinc-500 mt-2 font-medium">Technical guides and API references for autonomous agents.</p>
      </div>

      {/* 2. Card Grid - Matching Workspace Bot Tiles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <div 
            key={section.title} 
            className="bg-[#111827] border border-zinc-800 rounded-[2rem] p-8 shadow-xl hover:border-zinc-700 transition-all group"
          >
            {/* Restored Workspace Icon Container */}
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
              <section.icon className="w-6 h-6 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
            </div>

            <h3 className="text-xl font-bold text-white mb-6 tracking-tight">
              {section.title}
            </h3>

            {/* Navigational Rows - Matching Character Restraint */}
            <div className="space-y-4">
              {section.items.map((item) => (
                <button 
                  key={item} 
                  className="flex w-full items-center justify-between text-sm font-medium text-zinc-500 hover:text-white transition-colors group/item"
                >
                  {item} 
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover/item:opacity-40 transition-all" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}