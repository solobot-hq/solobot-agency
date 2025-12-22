"use client";

import React, { useState, KeyboardEvent } from 'react';
import { TerminalSquare, CornerDownLeft, Command } from 'lucide-react';

export default function CommandInput({ onExecute }: { onExecute: (cmd: string) => void }) {
  const [cmd, setCmd] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (cmd.trim()) {
        onExecute(cmd);
        setCmd('');
      }
    }
  };

  return (
    <div className="flex flex-col bg-zinc-950 px-6 pb-6 pt-2">
      <div className="relative flex items-center">
        <div className="absolute left-4 flex items-center gap-2 text-zinc-500 pointer-events-none select-none">
          <TerminalSquare size={16} />
          <span className="font-mono text-xs font-bold text-zinc-400">supervisor@sales-os:~$</span>
        </div>
        
        <input
          type="text"
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-12 w-full rounded-md border border-zinc-800 bg-zinc-900 pl-48 pr-12 text-sm font-mono text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-all"
          placeholder="Enter command (e.g., /approve, /switch acme)..."
          autoComplete="off"
        />

        <div className="absolute right-3 flex items-center gap-2">
          {cmd && (
             <button onClick={() => { onExecute(cmd); setCmd(''); }} className="flex items-center gap-1 rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-400 hover:bg-zinc-700 transition-colors">
               <CornerDownLeft size={10} />
               <span>EXEC</span>
             </button>
          )}
          {!cmd && (
            <div className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-zinc-600">
                <Command size={10} />
                <span>K</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-2 flex justify-between px-1">
        <div className="flex gap-4">
           {['/approve', '/override', '/resume'].map((c) => (
             <button key={c} onClick={() => onExecute(c)} className="cursor-pointer text-[10px] text-zinc-500 hover:text-zinc-300 font-mono transition-colors">
               {c}
             </button>
           ))}
        </div>
        <span className="text-[10px] text-zinc-600">System Ready</span>
      </div>
    </div>
  );
}