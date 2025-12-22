"use client";

import React, { useState, KeyboardEvent } from 'react';
import { Send, Paperclip, Mic, Command, CornerDownLeft } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative group z-30">
      {/* Premium Glow Effect */}
      <div className={`absolute -inset-px rounded-xl bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 blur-md transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />
      
      <div className={`relative flex min-h-[60px] w-full flex-col rounded-xl border bg-zinc-950/80 backdrop-blur-xl transition-all ${isFocused ? 'border-zinc-700 ring-1 ring-zinc-700/50' : 'border-zinc-800/80'}`}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Give instructions, ask for analysis, or update deal status..."
          className="w-full resize-none bg-transparent px-4 pt-4 pb-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none scrollbar-thin scrollbar-thumb-zinc-800 max-h-[200px]"
          rows={1}
          style={{ minHeight: '44px' }}
        />
        
        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex items-center gap-0.5">
            <button className="group flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300 transition-colors">
              <Paperclip size={15} strokeWidth={2} />
            </button>
            <button className="group flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300 transition-colors">
              <Mic size={15} strokeWidth={2} />
            </button>
          </div>

          <div className="flex items-center gap-3">
             {isFocused && (
                 <div className="hidden items-center gap-1.5 text-[10px] font-medium text-zinc-600 uppercase tracking-wider sm:flex animate-in fade-in slide-in-from-right-2">
                    <Command size={10} />
                    <CornerDownLeft size={10} />
                    <span>to send</span>
                </div>
             )}
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`flex h-7 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-all ${
                input.trim()
                  ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-500/20'
                  : 'bg-zinc-800/50 text-zinc-600 cursor-not-allowed'
              }`}
            >
              <span>Execute</span>
              <Send size={12} strokeWidth={2.5} className={input.trim() ? 'text-indigo-100' : 'text-zinc-600'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}