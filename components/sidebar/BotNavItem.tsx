"use client";

import React from "react";
import { Lock, Crown } from "lucide-react";
import { checkBotAccess } from "@/lib/permissions/bot-access";
import { Bot } from "@/generated/prisma/client";

interface BotNavItemProps {
  bot: Bot & { icon?: any };
  userTier: "STARTER" | "PRO" | "PRO_MAX" | string;
}

export default function BotNavItem({ bot, userTier }: BotNavItemProps) {
  const isLocked = !checkBotAccess(bot.id, userTier);

  return (
    <div 
      className={`
        relative group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer
        ${isLocked ? 'opacity-40 grayscale pointer-events-none' : 'hover:bg-white/5 active:scale-[0.98]'}
      `}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border ${
          isLocked ? 'bg-zinc-900 border-zinc-800' : 'bg-indigo-500/10 border-indigo-500/20'
        }`}>
          {bot.icon ? (
            <bot.icon className={`w-4 h-4 ${isLocked ? 'text-zinc-600' : 'text-indigo-400'}`} />
          ) : (
            <span className="text-micro text-indigo-400">AI</span>
          )}
        </div>

        <div className="flex flex-col truncate">
          {/* ✅ EXECUTIVE LOCK: Title Case, Bold, No Italics */}
          <span className={`text-sm font-bold truncate ${isLocked ? 'text-zinc-600' : 'text-white'}`}>
            {bot.name}
          </span>
          {/* ✅ EXECUTIVE LOCK: text-micro for Telemetry */}
          <span className="text-micro text-zinc-600 uppercase">
            {bot.type || 'Automated Agent'}
          </span>
        </div>
      </div>

      {isLocked && (
        <div className="flex items-center gap-1.5 shrink-0 px-2 py-1 bg-white/[0.03] border border-white/[0.05] rounded-md">
          <Lock className="w-2.5 h-2.5 text-zinc-600" />
          <Crown className="w-2.5 h-2.5 text-indigo-500" />
        </div>
      )}

      {!isLocked && bot.status === "Running" && (
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
      )}
    </div>
  );
}