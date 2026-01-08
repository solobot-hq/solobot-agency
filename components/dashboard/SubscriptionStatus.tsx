"use client";

import React from "react";
import { format } from "date-fns";
import { ShieldCheck, AlertCircle, Clock } from "lucide-react";

interface SubscriptionProps {
  subscription: {
    plan_tier: "starter" | "pro" | "pro_max" | null;
    billing_interval: "monthly" | "yearly" | null;
    subscription_status: string | null;
    current_period_end: string | null; // 🟢 Fix: String type for client serialization
  } | null;
}

export default function SubscriptionStatus({ subscription }: SubscriptionProps) {
  if (!subscription || !subscription.plan_tier) {
    return (
      <div className="p-4 rounded-xl border border-white/[0.05] bg-zinc-900/40">
        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Subscription</p>
        <p className="text-sm font-bold text-zinc-400 mt-1 lowercase">no active plan</p>
      </div>
    );
  }

  const statusMap: Record<string, { label: string; color: string; icon: any }> = {
    active: { label: "active", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20", icon: ShieldCheck },
    canceled: { label: "ending soon", color: "text-amber-500 bg-amber-500/10 border-amber-500/20", icon: Clock },
    past_due: { label: "action required", color: "text-rose-500 bg-rose-500/10 border-rose-500/20", icon: AlertCircle },
  };

  const currentStatus = statusMap[subscription.subscription_status || ""] || { 
    label: subscription.subscription_status || "unknown", 
    color: "text-zinc-500 bg-zinc-500/10 border-zinc-500/20",
    icon: AlertCircle 
  };

  const StatusIcon = currentStatus.icon;

  return (
    <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#111827] space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">Current Plan</p>
          <h3 className="text-lg font-black text-white uppercase tracking-tight">
            {subscription.plan_tier.replace("_", " ")}
          </h3>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${currentStatus.color}`}>
          <StatusIcon className="w-3 h-3" />
          {currentStatus.label}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.05]">
        <div>
          <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Billing Cycle</p>
          <p className="text-xs font-bold text-zinc-300 lowercase">{subscription.billing_interval}</p>
        </div>
        <div>
          <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
            {subscription.subscription_status === 'canceled' ? 'Expires' : 'Next Renewal'}
          </p>
          <p className="text-xs font-bold text-zinc-300 lowercase">
            {/* 🟢 Fix: Explicit new Date() instantiation for string handling */}
            {subscription.current_period_end 
              ? format(new Date(subscription.current_period_end), "MMM dd, yyyy") 
              : "n/a"}
          </p>
        </div>
      </div>
    </div>
  );
}