"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  Search,
  Bell,
  Sun,
  ChevronRight,
  Command,
  ChevronsUpDown,
  Plus,
  Check,
  Building2
} from "lucide-react";

import DashboardSidebar from "@/components/dashboard-sidebar";
import { UsageProvider } from "@/app/context/usage-context";
import { useWorkspaceStore, Workspace } from "@/store/workspace-store";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const { 
    activeWorkspace, 
    workspaces, 
    setActiveWorkspace, 
    setWorkspaces, 
    addWorkspace, 
    hydrateFromClerk 
  } = useWorkspaceStore();
  
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded && user) {
      if (workspaces.length === 0) {
        setWorkspaces([
          { id: "ws_internal", name: "Agency Internal" },
          { id: "ws_client_a", name: "Client Workspace A" }
        ]);
      }
      const lastActiveId = user.publicMetadata?.activeWorkspaceId as string | undefined;
      hydrateFromClerk(lastActiveId);
    }
  }, [isLoaded, user, setWorkspaces, hydrateFromClerk, workspaces.length]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsWorkspaceOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwitchWorkspace = async (ws: Workspace) => {
    setActiveWorkspace(ws);
    setIsWorkspaceOpen(false);
    await fetch('/api/workspace/switch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workspaceId: ws.id })
    });
  };

  const getBreadcrumb = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length <= 1) return "Overview";
    return segments[segments.length - 1].replace(/-/g, " ").toUpperCase();
  };

  return (
    <UsageProvider>
      <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 antialiased overflow-hidden font-sans">
        
        {/* SIDEBAR */}
        <DashboardSidebar />

        <div className="flex flex-1 flex-col min-w-0 relative h-full">
          
          {/* ✅ MASSIVE GLOBAL NAVBAR (FORCED TO 180px HEIGHT) */}
          <nav className="fixed top-0 right-0 z-50 h-[180px] bg-[#0B1221]/95 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-12 shadow-2xl transition-all"
               style={{ left: 'var(--sidebar-width, 280px)' }}>
            
            {/* BRANDING: MASSIVE LOGO & TEXT */}
            <div className="flex items-center gap-10">
              <Link href="/dashboard" className="flex items-center gap-8 group">
                {/* LOGO CONTAINER: BLOWN OUT TO 140px */}
                <div className="relative h-[120px] w-[120px] md:h-[140px] md:w-[140px] shrink-0">
                  <Image 
                    src="/sl.png" 
                    alt="Logo" 
                    fill
                    className="object-contain drop-shadow-[0_0_25px_rgba(79,70,229,0.6)]"
                    priority 
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-5xl text-white tracking-tighter uppercase leading-none">
                    SoloBotAgency
                  </span>
                  <span className="text-sm font-bold text-indigo-500 uppercase tracking-[0.5em] mt-3">
                    One Bot. Infinite Tasks.
                  </span>
                </div>
              </Link>

              <div className="h-16 w-px bg-white/10 rotate-[25deg] mx-4"></div>

              {/* WORKSPACE SWITCHER */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
                  className="flex items-center gap-4 px-6 py-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/5 min-w-[280px] justify-between transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-lg font-black text-indigo-400 border border-indigo-500/20">
                      {activeWorkspace?.name.charAt(0).toUpperCase() || "A"}
                    </div>
                    <span className="text-lg font-bold text-slate-200">{activeWorkspace?.name || "Loading..."}</span>
                  </div>
                  <ChevronsUpDown className="w-6 h-6 text-slate-500" />
                </button>
                {isWorkspaceOpen && (
                  <div className="absolute top-full left-0 mt-4 w-80 bg-[#0F1528] border border-white/10 rounded-[32px] p-4 shadow-2xl z-[100]">
                    {workspaces.map((ws) => (
                      <button key={ws.id} onClick={() => handleSwitchWorkspace(ws)} className="w-full text-left px-4 py-4 rounded-2xl text-base font-bold text-slate-300 hover:bg-white/5">
                        {ws.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDE UTILITIES */}
            <div className="flex items-center gap-10">
              <div className="flex gap-4">
                <button className="p-4 rounded-2xl text-slate-400 hover:text-white"><Sun className="w-8 h-8" /></button>
                <button className="p-4 rounded-2xl text-slate-400 hover:text-white relative">
                    <Bell className="w-8 h-8" />
                    <span className="absolute top-5 right-5 w-4 h-4 bg-rose-500 rounded-full border-4 border-[#0B1221]"></span>
                </button>
              </div>
              <div className="h-20 w-px bg-white/10"></div>
              <UserButton appearance={{ elements: { avatarBox: "w-16 h-16 border-2 border-white/20" } }} />
            </div>
          </nav>

          {/* MAIN CONTENT: pt-[200px] TO CLEAR THE 180px NAVBAR */}
          <main className="flex-1 overflow-y-auto bg-zinc-950 pt-[220px] px-12 pb-10">
            <div className="max-w-[1600px] mx-auto">
              <div className="flex items-center gap-4 mb-10 text-slate-500">
                <ChevronRight className="w-6 h-6" />
                <span className="text-xl font-black uppercase tracking-widest text-white">{getBreadcrumb()}</span>
              </div>
              {children}
            </div>
          </main>
        </div>
      </div>
    </UsageProvider>
  );
}