"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, SlidersHorizontal, Eye } from 'lucide-react';

export type Mode = 'live' | 'strategy' | 'intel';

interface Props {
  current: Mode;
  onChange: (m: Mode) => void;
}

export default function ModeSelector({ current, onChange }: Props) {
  const modes = [
    { id: 'live', label: 'Live Ops', icon: Target },
    { id: 'strategy', label: 'Strategy', icon: SlidersHorizontal },
    { id: 'intel', label: 'Intel', icon: Eye },
  ];

  return (
    <div className="relative flex h-8 items-center rounded-md bg-zinc-900 p-0.5 ring-1 ring-zinc-800">
      {modes.map((mode) => {
        const isActive = current === mode.id;
        const Icon = mode.icon;
        
        return (
          <button
            key={mode.id}
            onClick={() => onChange(mode.id as Mode)}
            className={`relative z-10 flex h-full items-center gap-1.5 px-3 text-[11px] font-medium transition-colors ${
              isActive ? 'text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="mode-pill"
                className="absolute inset-0 z-[-1] rounded-sm bg-zinc-800 shadow-sm ring-1 ring-white/5"
                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              />
            )}
            <Icon size={12} />
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}