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
  LayoutDashboard,
  ChevronsUpDown,
  Plus,
  Check,
  Building2
} from "lucide-react";

// Store
import { useWorkspaceStore, Workspace } from "@/store/workspace-store";

export function Navbar() {
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

  // --- INITIALIZATION & SYNC ---
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

  // --- EVENT HANDLERS ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsWorkspaceOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ FIX: Parameter 'ws' now correctly uses the imported 'Workspace' type
  const handleSwitchWorkspace = async (ws: Workspace) => {
    setActiveWorkspace(ws);
    setIsWorkspaceOpen(false);
    try {
      await fetch('/api/workspace/switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workspaceId: ws.id })
      });
    } catch (e) {
      console.error("Failed to sync workspace to server", e);
    }
  };

  const handleCreateWorkspace = () => {
    const name = prompt("Name your new workspace:");
    if (name && name.trim().length > 0) {
      addWorkspace(name);
    }
    setIsWorkspaceOpen(false);
  };

  const getBreadcrumb = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0 || (segments.length === 1 && segments[0] === "dashboard")) {
      return "Overview";
    }
    const lastSegment = segments[segments.length - 1];
    return lastSegment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#0B1221]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-8 transition-all duration-300 shadow-sm">
      
      {/* --- LEFT: BRAND & CONTEXT --- */}
      <div className="flex items-center gap-4 md:gap-6">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          {/* ✅ FIX 4: Increased Logo Sizing (h-12) to match Sidebar anchor */}
          <div className="relative h-12 w-12 shrink-0">
            <Image 
              src="/sl.png" 
              alt="SoloBotAgency Logo" 
              fill
              className="transition-transform duration-200 group-hover:scale-105 object-contain"
              priority 
            />
          </div>
          <span className="hidden lg:block font-black text-xl text-white tracking-tighter group-hover:opacity-80 transition-opacity">
            SoloBotAgency
          </span>
        </Link>

        <div className="hidden md:block h-6 w-px bg-white/10 rotate-12"></div>

        {/* Workspace Switcher */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-white/20 transition-all group min-w-[200px] justify-between shadow-sm"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center text-[10px] font-black text-indigo-400 border border-indigo-500/20 shrink-0">
                {activeWorkspace?.name.charAt(0).toUpperCase() || "A"}
              </div>
              <span className="text-sm font-bold text-slate-300 group-hover:text-white truncate">
                {activeWorkspace?.name || "Loading..."}
              </span>
            </div>
            <ChevronsUpDown className="w-4 h-4 text-slate-500 group-hover:text-slate-400 shrink-0" />
          </button>

          {isWorkspaceOpen && (
            <div className="absolute top-full left-0 mt-3 w-72 bg-[#0F1528] border border-white/10 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] p-2 z-50 animate-in fade-in zoom-in-95 duration-100 ring-1 ring-black/50">
              <div className="px-3 py-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5" /> My Workspaces
              </div>
              
              <div className="space-y-1 mb-2">
                {/* ✅ FIX: 'ws' correctly typed in the map loop */}
                {workspaces.map((ws: Workspace) => (
                  <button
                    key={ws.id}
                    onClick={() => handleSwitchWorkspace(ws)}
                    className={`w-full text-left px-3 py-3 rounded-xl text-sm font-bold flex items-center justify-between group transition-all duration-150 ${
                      activeWorkspace?.id === ws.id 
                      ? "bg-indigo-500/10 text-indigo-300 shadow-sm border border-indigo-500/10" 
                      : "text-slate-300 hover:bg-white/5 hover:text-white border border-transparent"
                    }`}
                  >
                    <span className="truncate">{ws.name}</span>
                    {activeWorkspace?.id === ws.id && <Check className="w-4 h-4 text-indigo-500" />}
                  </button>
                ))}
              </div>

              <div className="h-px bg-white/5 my-2" />
              
              <button 
                onClick={handleCreateWorkspace}
                className="w-full text-left px-3 py-3 rounded-xl text-xs font-black text-slate-400 hover:bg-white/5 hover:text-white flex items-center gap-3 transition-colors uppercase tracking-tight"
              >
                <div className="w-6 h-6 rounded-lg border border-slate-700 border-dashed flex items-center justify-center">
                  <Plus className="w-3.5 h-3.5" />
                </div>
                Create New Workspace...
              </button>
            </div>
          )}
        </div>

        {/* Breadcrumb Context */}
        <div className="hidden lg:flex items-center gap-3 text-sm ml-2">
          <ChevronRight className="w-4 h-4 text-zinc-800" />
          <span className="text-white font-bold text-sm tracking-tight">{getBreadcrumb()}</span>
        </div>
      </div>

      {/* CENTER SEARCH SECTION */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <button 
          className="group relative flex items-center gap-3 w-[340px] lg:w-[420px] h-11 px-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all duration-200"
          onClick={() => alert("Global Command Palette Triggered")} 
        >
          <Search className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
          <span className="text-xs font-bold text-slate-500 group-hover:text-slate-400 text-left flex-1 truncate uppercase tracking-tight">
            Search Command Palette...
          </span>
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg border border-white/10 bg-white/5 text-[10px] font-black text-slate-500">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* RIGHT UTILITIES */}
      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-1">
          <button className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <Sun className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0B1221] animate-pulse"></span>
          </button>
        </div>

        <div className="h-8 w-px bg-white/10"></div>

        <div className="flex items-center justify-center p-1 rounded-full border border-white/10 hover:border-indigo-500/50 transition-colors bg-white/[0.02]">
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-9 h-9 rounded-full",
                userButtonPopoverCard: "bg-[#0B1221] border border-white/10 shadow-2xl rounded-2xl",
                userButtonPopoverFooter: "hidden"
              }
            }}
          />
        </div>
      </div>
    </nav>
  );
}