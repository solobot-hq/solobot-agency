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
  Server,
  Zap
} from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// 📂 NAVIGATION STRUCTURE
const NAV_GROUPS = [
  {
    group: "terminal",
    routes: [
      { name: 'overview', href: '/dashboard', icon: LayoutDashboard },
      { name: 'workspace', href: '/dashboard/workspace', icon: Layers },
    ]
  },
  {
    group: "agency",
    routes: [
      { name: 'usage', href: '/dashboard/usage', icon: Activity },
      { name: 'infrastructure', href: '/dashboard/infrastructure', icon: Server },
      { name: 'inbox', href: '/dashboard/inbox', icon: Inbox },
      { name: 'docs', href: '/dashboard/docs', icon: FileText },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={cn(
      "h-screen bg-[#0B0F1A] border-r border-white/[0.05] flex flex-col transition-all duration-300 z-40 select-none",
      isCollapsed ? "w-[72px]" : "w-[260px]"
    )}>
      
      {/* 🏛️ HEADER - Sync with Workspace Logo Style */}
      <div className="h-[120px] flex items-center px-6 flex-shrink-0 border-b border-white/[0.03]">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-white/10 shrink-0">
          <Zap className="w-6 h-6 text-black" />
        </div>
        {!isCollapsed && (
          <div className="ml-3 flex flex-col">
            <span className="text-lg font-black text-white tracking-tighter leading-none lowercase">
              solobot
            </span>
          </div>
        )}
      </div>

      {/* 🚀 PRIMARY NAVIGATION - strictly lowercase */}
      <nav className="flex-1 px-3 py-8 space-y-10 overflow-y-auto scrollbar-hide">
        {NAV_GROUPS.map((group) => (
          <div key={group.group} className="space-y-2">
            {!isCollapsed && (
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] px-4 mb-4">
                {group.group}
              </p>
            )}
            {group.routes.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative",
                  "text-sm font-bold lowercase",
                  pathname === item.href 
                    ? "bg-white/[0.05] text-white" 
                    : "text-zinc-500 hover:text-white hover:bg-white/[0.02]"
                )}
              >
                <item.icon className={cn("w-4 h-4 transition-colors", 
                  pathname === item.href ? "text-white" : "text-zinc-600 group-hover:text-zinc-400"
                )} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* ⚙️ FOOTER - Administrative Actions & High-Contrast Upgrade */}
      <div className="p-4 border-t border-white/[0.05] bg-[#0B0F1A] space-y-4">
        {!isCollapsed && (
          <Link href="/dashboard/billing" className="block">
            <button className="w-full py-4 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all active:scale-95 shadow-xl">
              upgrade plan
            </button>
          </Link>
        )}
        
        <div className="space-y-1">
          <Link
            href="/dashboard/settings"
            className={cn(
              "group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all lowercase",
              pathname === "/dashboard/settings" ? "text-white bg-white/5" : "text-zinc-500 hover:text-white"
            )}
          >
            <Settings className="w-4 h-4" />
            {!isCollapsed && <span>settings</span>}
          </Link>
          
          <div className="flex justify-end pr-2">
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-zinc-600 hover:text-white p-2 transition-colors">
              {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>
          </div>
        </div>
        
        {/* User Profile - High Contrast Sync */}
        <div className={cn(
          "mt-2 pt-4 border-t border-white/[0.05] flex items-center gap-3 p-2 rounded-xl transition-all group",
          isCollapsed && "justify-center"
        )}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center border border-white/10 overflow-hidden shrink-0">
            {user?.imageUrl ? <img src={user.imageUrl} className="w-full h-full object-cover" alt="Profile" /> : <User className="w-4 h-4 text-white" />}
          </div>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-black text-white truncate lowercase">{user?.firstName || "admin"}</p>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter mt-0.5">
                starter plan
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