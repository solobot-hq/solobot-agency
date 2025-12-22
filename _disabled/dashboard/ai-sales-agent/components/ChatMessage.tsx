"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Sparkles, ArrowRight, ShieldAlert, TrendingUp, Zap } from 'lucide-react';

export type ActionType = 'primary' | 'secondary' | 'danger';

export interface MessageAction {
  label: string;
  type: ActionType;
}

export interface Message {
  id: string;
  role: 'agent' | 'user';
  type?: 'standard' | 'briefing' | 'alert' | 'recommendation';
  content: string;
  timestamp: string;
  confidence?: number;
  intent?: string;
  actions?: MessageAction[];
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isAgent = message.role === 'agent';

  const getAgentStyling = () => {
    switch (message.type) {
      case 'briefing':
        return 'bg-zinc-900/40 border-zinc-800 ring-1 ring-indigo-500/10 shadow-[0_4px_12px_rgba(0,0,0,0.1)]';
      case 'alert':
        return 'bg-rose-950/10 border-rose-900/30 ring-1 ring-rose-500/10 text-rose-100';
      case 'recommendation':
        return 'bg-emerald-950/10 border-emerald-900/30 ring-1 ring-emerald-500/10 text-emerald-100';
      default:
        return 'bg-zinc-900 border-zinc-800/80 shadow-sm';
    }
  };

  const getIcon = () => {
    if (!isAgent) return <User size={14} />;
    switch (message.type) {
      case 'alert': return <ShieldAlert size={14} className="text-rose-400" />;
      case 'recommendation': return <TrendingUp size={14} className="text-emerald-400" />;
      case 'briefing': return <Sparkles size={14} className="text-indigo-400" />;
      default: return <Bot size={14} className="text-zinc-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex w-full gap-3 ${isAgent ? 'justify-start' : 'justify-end'}`}
    >
      {/* Agent Avatar/Icon */}
      {isAgent && (
        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] border ${message.type === 'alert' ? 'border-rose-500/20 bg-rose-500/10' : 'border-zinc-800 bg-zinc-900'} shadow-sm`}>
          {getIcon()}
        </div>
      )}

      <div className={`flex max-w-[80%] flex-col gap-1.5 ${isAgent ? 'items-start' : 'items-end'}`}>
        
        {/* Message Header (Agent) */}
        {isAgent && (
          <div className="flex items-center gap-2 pl-1">
            <span className={`text-[10px] font-medium uppercase tracking-wider ${message.type === 'alert' ? 'text-rose-400' : 'text-zinc-500'}`}>
              {message.intent || 'AI Assistant'}
            </span>
            {message.confidence && (
              <span className="flex items-center gap-0.5 text-[9px] font-medium text-zinc-600 bg-zinc-900/50 rounded-full px-1.5 py-0.5 ring-1 ring-zinc-800/50">
                <Zap size={8} className={message.confidence > 90 ? "text-emerald-500" : "text-yellow-500"} fill="currentColor" />
                {message.confidence}% Confidence
              </span>
            )}
            <span className="text-[10px] text-zinc-600">{message.timestamp}</span>
          </div>
        )}
         {/* Message Header (User) */}
         {!isAgent && (
          <div className="flex items-center gap-2 pr-1">
             <span className="text-[10px] text-zinc-600">{message.timestamp}</span>
             <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">You</span>
          </div>
         )}

        {/* Message Body */}
        <div
          className={`relative rounded-2xl px-4 py-3 text-[13px] leading-relaxed backdrop-blur-sm border ${
            isAgent
              ? `${getAgentStyling()} rounded-tl-sm`
              : 'bg-indigo-600 text-white border-indigo-500 ring-1 ring-indigo-400/20 shadow-md shadow-indigo-500/20 rounded-tr-sm font-medium'
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Actionable Outputs */}
        {isAgent && message.actions && (
          <div className="mt-1.5 flex flex-wrap gap-2 pl-1">
            {message.actions.map((action, idx) => (
              <button
                key={idx}
                className={`group flex items-center gap-1.5 rounded-[10px] border px-3 py-1.5 text-[11px] font-medium transition-all active:scale-95 ${
                  action.type === 'primary' 
                  ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-500/50 shadow-[0_1px_4px_rgba(99,102,241,0.1)]' 
                  : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <Sparkles size={10} className={action.type === 'primary' ? 'text-indigo-400 group-hover:text-indigo-300' : 'text-zinc-600 group-hover:text-zinc-500'} />
                {action.label}
                <ArrowRight size={10} className={action.type === 'primary' ? 'opacity-70 group-hover:translate-x-0.5 transition-transform' : 'opacity-50 group-hover:translate-x-0.5 transition-transform'} />
              </button>
            ))}
          </div>
        )}
      </div>
       {/* User Avatar */}
       {!isAgent && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] border border-zinc-800 bg-zinc-900 shadow-sm">
          <User size={14} className="text-zinc-400" />
        </div>
      )}
    </motion.div>
  );
}