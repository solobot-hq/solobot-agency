"use client";

import React from 'react';
import { Loader2, CheckCircle2, Circle, ListChecks } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type QueueItem = {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  timestamp: string;
};

export default function ActionQueue({ queue }: { queue: QueueItem[] }) {
  const activeCount = queue.filter(i => i.status === 'running' || i.status === 'pending').length;
  const allCompleted = queue.length > 0 && queue.every(i => i.status === 'completed');

  return (
    <div className="w-64 rounded-lg border border-zinc-800 bg-zinc-950/90 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Execution Queue</span>
        <span className={`flex h-4 w-4 items-center justify-center rounded text-[10px] font-medium ${
           activeCount > 0 ? 'bg-indigo-500 text-white' : 'bg-zinc-800 text-zinc-500'
        }`}>
           {activeCount}
        </span>
      </div>
      <div className="flex flex-col gap-0.5 p-1">
        {allCompleted ? (
          <div className="flex items-center gap-2 px-3 py-4 text-emerald-500/80">
            <ListChecks size={14} />
            <span className="text-[11px] font-medium">All tasks completed</span>
          </div>
        ) : (
          <AnimatePresence>
            {queue.map((item) => (
              <motion.div 
                key={item.id} 
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 rounded px-2 py-1.5 transition-colors hover:bg-zinc-900"
              >
                {item.status === 'running' && <Loader2 size={12} className="animate-spin text-indigo-500 shrink-0" />}
                {item.status === 'completed' && <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />}
                {item.status === 'pending' && <Circle size={12} className="text-zinc-600 shrink-0" />}
                
                <div className="flex flex-1 flex-col overflow-hidden">
                  <span className={`truncate text-[11px] font-medium ${item.status === 'completed' ? 'text-zinc-500 line-through' : 'text-zinc-300'}`}>
                    {item.label}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-zinc-600">{item.timestamp}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}