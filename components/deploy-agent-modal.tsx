"use client";

import React, { useState } from "react";
import { X, Bot, Zap, Shield, Sparkles } from "lucide-react";

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (name: string, type: string) => void;
}

export function DeployAgentModal({ isOpen, onClose, onDeploy }: DeployModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Email");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#111827] border border-zinc-800 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Deploy Agent</h2>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Agent Name</label>
            <input 
              type="text"
              placeholder="e.g. Q4 Sales Scraper"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Workforce Type</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium appearance-none"
            >
              <option value="Email">Email Outreach</option>
              <option value="Leads">Lead Generation</option>
              <option value="Content">Content Strategy</option>
              <option value="Analysis">Data Analysis</option>
            </select>
          </div>

          <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl flex items-start gap-4">
            <Shield className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">
              Deploying this agent will consume <span className="text-indigo-400 font-bold">500 credits</span> from your Pro Agency balance.
            </p>
          </div>
        </div>

        <div className="p-8 bg-zinc-900/30 border-t border-zinc-800">
          <button 
            onClick={() => onDeploy(name, type)}
            disabled={!name}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-black text-sm tracking-widest transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
          >
            CONFIRM DEPLOYMENT
          </button>
        </div>
      </div>
    </div>
  );
}