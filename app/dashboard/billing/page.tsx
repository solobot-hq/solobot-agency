"use client";

import React, { useState } from "react";
import { Check, CreditCard, Zap, Crown } from "lucide-react";

export default function BillingPage() {
  const [cycle, setCycle] = useState("monthly");

  const plans = [
    { 
      name: "Starter", 
      monthly: "£29", 
      yearly: "£26", 
      features: ["20 AI runs/day", "1 Concurrent task", "Core bots only"],
      current: false 
    },
    { 
      name: "Pro Agency", 
      monthly: "£99", 
      yearly: "£89", 
      features: ["150 AI runs/day", "3 Concurrent tasks", "All core bots"],
      current: true 
    },
    { 
      name: "Pro Max", 
      monthly: "£249", 
      yearly: "£224", 
      features: ["600 AI runs/day", "10 Concurrent tasks", "Full autonomy"],
      current: false 
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* 1. Header Section - Matching Workspace Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Billing</h1>
          <p className="text-zinc-500 mt-2 font-medium">Manage subscription and invoices.</p>
        </div>
        
        {/* Functional Toggle: Administrative Style */}
        <div className="flex gap-2 bg-[#0D1525] p-1 rounded-xl border border-white/[0.05]">
          {["monthly", "yearly"].map((t) => (
            <button 
              key={t}
              onClick={() => setCycle(t)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                cycle === t 
                  ? "bg-white/[0.05] text-white shadow-sm" 
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Plan Selection Tiles - Matching Workspace Card Style */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`relative p-8 rounded-[2rem] border transition-all duration-500 group flex flex-col ${
              plan.current 
                ? "bg-indigo-500/5 border-indigo-500 shadow-2xl shadow-indigo-500/10 scale-[1.02]" 
                : "bg-[#111827] border-white/[0.05] hover:border-white/[0.15]"
            }`}
          >
            {plan.current && (
              <div className="absolute top-6 right-6">
                <span className="px-4 py-1.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-widest">
                  Current
                </span>
              </div>
            )}
            
            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
              {plan.name}
            </h3>
            
            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white tracking-tight">
                  {cycle === "monthly" ? plan.monthly : plan.yearly}
                </span>
                <span className="text-zinc-600 font-bold">/ mo</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm font-medium text-zinc-400">
                  <Check className="w-4 h-4 text-indigo-500" /> {f}
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-xl text-sm font-bold transition-all ${
              plan.current 
                ? "bg-zinc-800 text-zinc-500 cursor-default" 
                : "bg-white text-black hover:bg-zinc-200"
            }`}>
              {plan.current ? "Current Plan" : "Upgrade Plan"}
            </button>
          </div>
        ))}
      </div>

      {/* 3. Transaction Ledger Table - Matching Workspace List Style */}
      <div className="bg-[#111827] border border-white/[0.05] rounded-[2rem] overflow-hidden shadow-xl">
        <div className="p-8 border-b border-white/[0.05] bg-white/[0.01]">
          <h3 className="text-sm font-bold text-white">Recent Invoices</h3>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/[0.05]">
              <th className="px-10 py-5 text-sm font-bold text-zinc-500">Date</th>
              <th className="px-10 py-5 text-sm font-bold text-zinc-500">Amount</th>
              <th className="px-10 py-5 text-sm font-bold text-zinc-500 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            <tr className="group hover:bg-white/[0.01] transition-colors">
              <td className="px-10 py-7 text-sm font-medium text-zinc-400">Dec 01, 2025</td>
              <td className="px-10 py-7 text-sm font-bold text-white">£99.00</td>
              <td className="px-10 py-7 text-right">
                <span className="px-4 py-1.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                  Paid
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}