"use client";

import React from 'react';
import { Terminal, AlertOctagon, BrainCircuit, User, ArrowRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export type EventType = 'log' | 'analysis' | 'alert' | 'decision' | 'command';

export type EventAction = {
  id: string;
  label: string;
  style: 'primary' | 'secondary' | 'danger';
  action: string;
};

export type EventItem = {
  id: string;
  timestamp: string;
  type: EventType;
  source: string;
  content: string;
  metadata?: Record<string, any>;
  actions?: EventAction[];
};

export default function SystemEvent({ event, onAction, disabled }: { event: EventItem; onAction: (id: string) => void; disabled: boolean }) {
  const isCommand = event.type === 'command';

  const getIcon = () => {
    switch (event.type) {
      case 'log': return <Terminal size={14} className="text-zinc-600" />;
      case 'analysis': return <BrainCircuit size={14} className="text-indigo-400" />;
      case 'alert': return <AlertOctagon size={14} className="text-rose-400" />;
      case 'decision': return <FileText size={14} className="text-emerald-400" />;
      case 'command': return <User size={14} className="text-zinc-400" />;
    }
  };

  const getBorderColor = () => {
    switch (event.type) {
      case 'alert': return 'border-rose-900/30 bg-rose-950/5';
      case 'decision': return 'border-indigo-900/30 bg-indigo-950/5';
      case 'command': return 'border-transparent bg-transparent';
      default: return 'border-transparent hover:bg-zinc-900/30';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group flex gap-3 rounded border p-2 transition-all ${getBorderColor()}`}
    >
      <div className="flex w-24 shrink-0 flex-col items-end gap-1">
        <span className="font-mono text-[10px] text-zinc-600">{event.timestamp}</span>
        <div className={`flex h-6 w-6 items-center justify-center rounded border border-zinc-800 bg-zinc-900 shadow-sm ${isCommand ? 'bg-zinc-800' : ''}`}>
          {getIcon()}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-baseline gap-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${isCommand ? 'text-zinc-300' : 'text-zinc-500'}`}>
            {event.source}
          </span>
          {event.metadata && (
             <span className="rounded bg-zinc-800 px-1 py-0.5 text-[9px] font-mono text-zinc-400">
               CONFIDENCE: {event.metadata.confidence}%
             </span>
          )}
        </div>
        
        <div className={`mt-1 whitespace-pre-wrap text-[13px] leading-relaxed ${isCommand ? 'font-medium text-white' : 'text-zinc-300'}`}>
          {event.content}
        </div>

        {event.actions && (
          <div className="mt-3 flex items-center gap-2">
            {event.actions.map((action) => (
              <button
                key={action.id}
                onClick={() => !disabled && onAction(action.action)}
                disabled={disabled}
                className={`flex items-center gap-1.5 rounded border px-3 py-1 text-[11px] font-medium shadow-sm transition-all active:translate-y-px ${
                  disabled ? 'opacity-50 cursor-not-allowed border-zinc-700 bg-zinc-800 text-zinc-500' :
                  action.style === 'primary' 
                    ? 'border-indigo-500/50 bg-indigo-600 text-white hover:bg-indigo-500' 
                    : 'border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                }`}
              >
                {action.label}
                {action.style === 'primary' && <ArrowRight size={12} />}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}