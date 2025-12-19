"use client";

import React from 'react';
import { Target, TrendingUp, AlertTriangle, Building, Lock, ArrowUpRight } from 'lucide-react';
import type { AIState } from './SalesAgentUI';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntelligencePanel({ state, onAction }: { state: AIState; onAction: (id: string) => void }) {
  const isExecuteLocked = state.blockerId && state.resolvedBlockerIds.includes(state.blockerId);
  const isPaused = state.status === 'paused';
  const isEnterprise = state.tier === 'Enterprise';

  return (
    <div className="hidden w-80 flex-col border-l border-zinc-800 bg-zinc-950 lg:flex">
      <div className="flex h-12 shrink-0 items-center border-b border-zinc-800 px-4 bg-zinc-900/20">
        <Target size={14} className="mr-2 text-zinc-400" />
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Context Intelligence</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-zinc-800">
        
        <div className="mb-6 rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-zinc-800 text-zinc-400">
                <Building size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-200">{state.dealName}</div>
                <div className="text-[10px] text-zinc-500">{state.tier}</div>
              </div>
            </div>
            <div className="text-right">
              <motion.div 
                key={state.probability}
                initial={{ scale: 1.5, color: '#fff' }}
                animate={{ scale: 1, color: state.probability > 70 ? '#10b981' : '#fbbf24' }}
                className="text-sm font-bold"
              >
                {state.probability}%
              </motion.div>
              <div className="text-[9px] uppercase text-zinc-500">Prob</div>
            </div>
          </div>
          <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
            <motion.div 
              className={`h-full rounded-full ${state.probability > 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${state.probability}%` }}
              transition={{ duration: 1, ease: 'circOut' }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {state.blocker && !isExecuteLocked ? (
            <motion.div 
              key="blocked"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-6"
            >
              <h4 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-indigo-400">Recommended Next Step</h4>
              <div className="group relative overflow-hidden rounded-md border border-indigo-500/30 bg-indigo-500/10 p-3 transition-all hover:bg-indigo-500/20">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-zinc-200 text-sm">Send Compliance Packet</span>
                    <span className="text-[11px] text-zinc-400">Target: Sarah Chen (CISO)</span>
                  </div>
                  <Lock size={12} className="text-indigo-400 opacity-50" />
                </div>
                
                <p className="mt-2 text-[11px] leading-relaxed text-indigo-200/70">
                  Generated based on negative sentiment analysis of "Data Residency" concerns.
                </p>

                {isEnterprise ? (
                  <button 
                    onClick={() => onAction('approve_compliance')}
                    disabled={isPaused}
                    className={`mt-3 flex w-full items-center justify-center gap-2 rounded py-1.5 text-[11px] font-bold uppercase tracking-wide transition-colors shadow-lg shadow-indigo-500/20 active:translate-y-px ${
                      isPaused 
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-500'
                    }`}
                  >
                    {isPaused ? 'System Paused' : 'Auto-Execute'}
                    <ArrowUpRight size={12} />
                  </button>
                ) : (
                  <div className="mt-3 flex w-full items-center justify-center gap-2 rounded bg-zinc-800 py-1.5 text-[11px] font-bold text-zinc-500">
                    <Lock size={10} /> Auto-Execute (Enterprise Only)
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 rounded border border-emerald-900/30 bg-emerald-950/10 p-3"
            >
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                 <ArrowUpRight size={14} />
                 <span className="text-xs font-bold">Strategy Executing</span>
              </div>
              <p className="text-[11px] text-emerald-200/60">System is autonomously handling compliance protocols.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-px bg-zinc-800/50 mb-6" />

        <div className="mb-6">
          <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            <TrendingUp size={12} /> Recent Signals
          </h4>
          <div className="flex flex-col gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2 text-[11px] text-zinc-400">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Legal Team viewed pricing page (3x)</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-rose-500">
            <AlertTriangle size={12} /> Active Risks
          </h4>
          {state.health === 'at_risk' && state.blocker ? (
             <div className="rounded border border-rose-900/30 bg-rose-950/10 p-2 animate-in fade-in slide-in-from-bottom-2">
               <div className="mb-1 text-[11px] font-bold text-rose-300">Competitor Mentioned</div>
               <div className="text-[10px] text-rose-400/60 leading-tight">
                 Transcription detected "SalesForceZero" in latest call.
               </div>
             </div>
          ) : (
            <div className="text-[11px] text-zinc-500 italic flex items-center gap-2">
               <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
               No critical risks detected.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}