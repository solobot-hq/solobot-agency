"use client";

import React from 'react';
import { Lock, ArrowRight, AlertTriangle, Zap, CheckCircle2, PauseCircle, Crown } from 'lucide-react';
import type { AIState } from './SalesAgentUI';
import { motion, AnimatePresence } from 'framer-motion';

export default function SystemStateBar({ state }: { state: AIState }) {
  return (
    <div className="flex h-12 w-full shrink-0 items-center gap-6 border-b border-zinc-800 bg-zinc-900/40 px-6 backdrop-blur-md transition-colors">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
          <Zap size={12} />
          <span>Active Objective</span>
        </div>
        <div className="flex items-center gap-2 rounded border border-zinc-800 bg-zinc-950/50 px-2 py-1 transition-all hover:bg-zinc-900">
          <span className="text-xs font-medium text-zinc-200">Close {state.dealName}</span>
          {state.tier === 'Enterprise' && <Crown size={10} className="text-amber-400" />}
        </div>
      </div>

      <div className="h-4 w-px bg-zinc-800" />

      <div className="flex items-center gap-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Phase</span>
        <div className="flex items-center gap-1">
          <motion.span 
            key={state.phase}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xs font-semibold ${state.phase === 'Negotiation' ? 'text-indigo-400' : 'text-emerald-400'}`}
          >
            {state.phase}
          </motion.span>
          <ArrowRight size={10} className="text-zinc-600" />
          <span className="text-xs text-zinc-600">Closing</span>
        </div>
      </div>

      <div className="h-4 w-px bg-zinc-800" />

      <AnimatePresence mode="wait">
        {state.blocker ? (
          <motion.div 
            key="blocked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded bg-rose-950/20 px-2 py-1 ring-1 ring-rose-900/30"
          >
            <Lock size={10} className="text-rose-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">Blocked By</span>
            <span className="text-xs font-medium text-rose-200">{state.blocker}</span>
          </motion.div>
        ) : (
          <motion.div 
            key="clear"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 px-2 py-1"
          >
             <CheckCircle2 size={12} className="text-emerald-500" />
             <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">No Blockers</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="ml-auto flex items-center gap-2">
         {state.status === 'paused' && (
           <div className="flex items-center gap-1.5 text-amber-500 animate-pulse">
               <PauseCircle size={12} />
               <span className="text-[10px] font-mono uppercase">System Paused</span>
           </div>
         )}
         {state.health === 'at_risk' && state.status !== 'paused' && (
             <div className="flex items-center gap-1.5 text-rose-400">
                 <AlertTriangle size={12} />
                 <span className="text-[10px] font-mono uppercase">Anomaly Detected</span>
             </div>
         )}
      </div>
    </div>
  );
}