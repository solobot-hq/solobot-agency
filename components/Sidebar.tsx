"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  Inbox,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Layers,
  CreditCard,
  User,
  LogOut,
  Sparkles,
  Bot,
  FileText,
  Server
} from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// 📂 REORGANIZED NAVIGATION STRUCTURE
const NAV_GROUPS = [
  {
    group: "Terminal",
    routes: [
      { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Workspace', href: '/dashboard/workspace', icon: Layers },
    ]
  },
  {
    group: "Agency",
    routes: [
      { name: 'Usage', href: '/dashboard/usage', icon: Activity },
      { name: 'Infrastructure', href: '/dashboard/infrastructure', icon: Server },
      { name: 'Inbox', href: '/dashboard/inbox', icon: Inbox },
      { name: 'Docs', href: '/dashboard/docs', icon: FileText },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={cn(
      "h-screen bg-[#0B1221] border-r border-white/[0.08] flex flex-col transition-all duration-300 z-40 select-none",
      isCollapsed ? "w-[72px]" : "w-[260px]"
    )}>
      
      {/* 🏛️ HEADER ALIGNMENT SPACER (Matching your 120px header) */}
      <div className="h-[120px] flex items-center px-6 mb-2 flex-shrink-0 border-b border-white/[0.03]">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
          <Bot className="w-6 h-6 text-indigo-400" />
        </div>
        {!isCollapsed && (
          <div className="ml-3 flex flex-col">
            <span className="text-sm font-bold text-white tracking-tight leading-none uppercase">
              SoloBotAgency
            </span>
          </div>
        )}
      </div>

      {/* 🚀 REORGANIZED PRIMARY NAVIGATION */}
      <nav className="flex-1 px-3 py-6 space-y-8 overflow-y-auto scrollbar-hide">
        {NAV_GROUPS.map((group) => (
          <div key={group.group} className="space-y-1">
            {!isCollapsed && (
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] px-3 mb-4">
                {group.group}
              </p>
            )}
            {group.routes.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 relative",
                  "text-sm font-medium",
                  pathname === item.href 
                    ? "bg-white/5 text-white" 
                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                )}
              >
                {pathname === item.href && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-indigo-500 rounded-r-full" />
                )}
                <item.icon className={cn("w-4 h-4 transition-colors", 
                  pathname === item.href ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300"
                )} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* ⚙️ FOOTER - Administrative Actions */}
      <div className="p-3 border-t border-white/[0.08] bg-[#0B1221] space-y-1">
        {!isCollapsed && (
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] px-3 mb-2 pt-2">
            Account
          </p>
        )}
        
        <Link
          href="/dashboard/billing"
          className={cn(
            "group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            pathname === "/dashboard/billing" ? "text-white bg-white/5" : "text-zinc-500 hover:text-white"
          )}
        >
          <CreditCard className="w-4 h-4" />
          {!isCollapsed && <span>Billing</span>}
        </Link>

        <Link
          href="/dashboard/settings"
          className={cn(
            "group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            pathname === "/dashboard/settings" ? "text-white bg-white/5" : "text-zinc-500 hover:text-white"
          )}
        >
          <Settings className="w-4 h-4" />
          {!isCollapsed && <span>Settings</span>}
        </Link>
        
        <div className="flex justify-end pt-2">
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-zinc-600 hover:text-white p-2 transition-colors">
            {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>
        
        <div className={cn(
          "mt-2 pt-3 border-t border-white/[0.05] flex items-center gap-3 p-2 rounded-xl transition-all group",
          isCollapsed && "justify-center"
        )}>
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10 overflow-hidden shrink-0">
            {user?.imageUrl ? <img src={user.imageUrl} className="w-full h-full object-cover" alt="Profile" /> : <User className="w-4 h-4 text-white" />}
          </div>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{user?.firstName || "Admin"}</p>
              <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                <Sparkles className="w-2.5 h-2.5 shrink-0" /> PRO
              </p>
            </div>
          )}
          {!isCollapsed && (
            <SignOutButton>
              <button className="p-2 text-zinc-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                <LogOut className="w-4 h-4" />
              </button>
            </SignOutButton>
          )}
        </div>
      </div>
    </aside>
  );
}