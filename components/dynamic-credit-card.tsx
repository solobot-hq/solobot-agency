"use client";

import React from "react";
import { CreditCard, Zap } from "lucide-react";

interface CreditCardProps {
  total: number; // creditsTotal from Prisma
  used: number;  // creditsUsed from Prisma
}

export function DynamicCreditCard({ total, used }: CreditCardProps) {
  // Calculate efficiency: how many credits remain vs. total pool
  const maxCapacity = total + used;
  const remainingPercentage = maxCapacity > 0 ? (total / maxCapacity) * 100 : 0;

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group border border-white/10">
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-10">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
            <CreditCard className="w-6 h-6 text-white/70" />
          </div>
          <div className="p-3 bg-amber-400/20 rounded-2xl backdrop-blur-md group-hover:rotate-12 transition-transform">
            <Zap className="w-6 h-6 text-amber-300 fill-current shadow-[0_0_15px_rgba(252,211,77,0.4)]" />
          </div>
        </div>
        
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-100/60">
            Available Credits
          </p>
          <h3 className="text-4xl font-bold mt-2 tracking-tighter flex items-baseline gap-2">
            {total.toLocaleString()}
            <span className="text-lg font-medium text-indigo-200/40">/ {maxCapacity.toLocaleString()}</span>
          </h3>
        </div>
        
        <div className="mt-8 space-y-3">
          <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-white transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(255,255,255,0.5)]" 
              style={{ width: `${remainingPercentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-black text-indigo-100/50 uppercase tracking-widest">
              Fleet Efficiency
            </p>
            <p className="text-[10px] font-black text-white uppercase tracking-widest">
              {Math.round(remainingPercentage)}% Remaining
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative Background Elements */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl opacity-50" />
    </div>
  );
}