"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  CreditCard, 
  Activity, 
  Briefcase, 
  FileText,
  Zap,
  Settings // Added for the new Settings page
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Workspace", icon: Briefcase, href: "/dashboard/workspace" },
  { label: "Usage", icon: Activity, href: "/dashboard/usage" },
  { label: "Billing", icon: CreditCard, href: "/dashboard/billing" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" }, // Added from screenshot requirements
  { label: "Docs", icon: FileText, href: "/dashboard/docs" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-[#0B1221] border-r border-zinc-800/50 flex flex-col shrink-0 h-screen sticky top-24 z-40">
      {/* SUBORDINATE BRAND MARKER */}
      <div className="px-8 flex items-center h-16 border-b border-zinc-800/20">
        <div className="flex items-center gap-3 opacity-50 transition-all duration-300">
          <div className="h-8 w-8 rounded-lg bg-indigo-600/10 flex items-center justify-center border border-indigo-500/20 shadow-inner">
            <Briefcase className="w-4 h-4 text-indigo-400/80 group-hover:text-indigo-400" />
          </div>
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mt-0.5">
            Admin
          </span>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 space-y-2 mt-8">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-300 group relative",
                isActive 
                  ? "bg-indigo-600/10 border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.1)]" 
                  : "text-zinc-500 hover:text-white hover:bg-zinc-800/40 border border-transparent"
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon className={cn(
                  "w-5 h-5 transition-colors duration-300",
                  isActive ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300"
                )} />
                <span className={cn(
                  "text-sm font-bold tracking-tight",
                  isActive ? "text-white" : "text-inherit"
                )}>
                  {item.label}
                </span>
              </div>
              {isActive && (
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* BOTTOM TIER CARD */}
      <div className="p-6">
        <div className="bg-gradient-to-br from-[#111827] to-[#0B1221] border border-zinc-800 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden group cursor-default">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors duration-500" />
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-inner">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">Status</p>
              <p className="text-sm font-black text-zinc-100 mt-1">Pro Agency</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
              <span>Usage</span>
              <span>45%</span>
            </div>
            <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.4)]" style={{ width: "45%" }} />
            </div>
          </div>

          <button className="w-full mt-6 py-2.5 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all duration-300">
            Upgrade Plan
          </button>
        </div>
      </div>
    </aside>
  );
}