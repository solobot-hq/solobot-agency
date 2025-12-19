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
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-gradient-to-r from-[#0B1221] to-[#0F1528] border-b border-white/5 flex items-center justify-between px-4 md:px-6 transition-all duration-300 shadow-sm backdrop-blur-md">
      
      {/* --- LEFT: BRAND & CONTEXT --- */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* CIRCLED ITEM 1: Functional Logo Link */}
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <Image 
            src="/sl.png" 
            alt="SoloBotAgency Logo" 
            width={34} 
            height={34}
            className="transition-transform duration-200 group-hover:scale-105 object-contain"
          />
          <span className="hidden md:block font-bold text-sm text-slate-100 tracking-tight group-hover:text-white transition-colors">
            SoloBotAgency
          </span>
        </Link>

        <div className="hidden md:block h-4 w-px bg-white/10 rotate-12"></div>

        {/* Workspace Switcher */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-white/20 transition-all group min-w-[180px] justify-between shadow-sm"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-[10px] font-bold text-indigo-400 border border-indigo-500/20 shrink-0">
                {activeWorkspace?.name.charAt(0).toUpperCase() || "A"}
              </div>
              <span className="text-xs font-medium text-slate-300 group-hover:text-white truncate">
                {activeWorkspace?.name || "Loading..."}
              </span>
            </div>
            <ChevronsUpDown className="w-3 h-3 text-slate-500 group-hover:text-slate-400 shrink-0" />
          </button>

          {isWorkspaceOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-[#0F1528] border border-white/10 rounded-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 ring-1 ring-black/50">
              <div className="px-2 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-3 h-3" /> My Workspaces
              </div>
              
              <div className="space-y-0.5 mb-2">
                {workspaces.map((ws) => (
                  <button
                    key={ws.id}
                    onClick={() => handleSwitchWorkspace(ws)}
                    className={`w-full text-left px-2 py-2.5 rounded-lg text-sm flex items-center justify-between group transition-all duration-150 ${
                      activeWorkspace?.id === ws.id 
                      ? "bg-indigo-500/10 text-indigo-300 shadow-sm border border-indigo-500/10" 
                      : "text-slate-300 hover:bg-white/5 hover:text-white border border-transparent"
                    }`}
                  >
                    <span className="truncate">{ws.name}</span>
                    {activeWorkspace?.id === ws.id && <Check className="w-3.5 h-3.5 text-indigo-500" />}
                  </button>
                ))}
              </div>

              <div className="h-px bg-white/5 my-1" />
              
              <button 
                onClick={handleCreateWorkspace}
                className="w-full text-left px-2 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:bg-white/5 hover:text-white flex items-center gap-2 transition-colors"
              >
                <div className="w-5 h-5 rounded-md border border-slate-700 border-dashed flex items-center justify-center">
                  <Plus className="w-3 h-3" />
                </div>
                Create New Workspace...
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Breadcrumb with Functional Dashboard Link */}
        <div className="hidden lg:flex items-center gap-2 text-sm ml-2">
          <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
          {/* CIRCLED ITEM 2: Functional Breadcrumb Link */}
          <Link 
            href="/dashboard" 
            className="text-slate-500 font-medium text-xs uppercase tracking-wide hover:text-slate-300 transition-colors cursor-pointer"
          >
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-200 font-medium text-xs uppercase tracking-wide">{getBreadcrumb()}</span>
        </div>
      </div>

      {/* CENTER & RIGHT SECTIONS (No changes) */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <button 
          className="group relative flex items-center gap-3 w-[340px] lg:w-[480px] h-9 px-4 rounded-full bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-lg border border-white/10 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          onClick={() => alert("Global Command Palette Triggered")} 
        >
          <Search className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
          <span className="text-xs font-medium text-slate-500 group-hover:text-slate-400 text-left flex-1 truncate">
            Search commands, bots, or settings...
          </span>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-medium text-slate-500 group-hover:text-slate-300 group-hover:border-white/20 transition-all">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
          <div className="absolute inset-0 rounded-full bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10"></div>
        </button>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <Link 
          href="/dashboard"
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-transparent text-xs font-medium text-slate-400 hover:text-indigo-300 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300 group"
        >
          <LayoutDashboard className="w-3.5 h-3.5 group-hover:text-indigo-400 transition-colors" />
          <span>Overview</span>
        </Link>

        <div className="flex items-center gap-1">
            <button className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                <Sun className="w-[18px] h-[18px]" />
            </button>
            <button className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-all relative">
                <Bell className="w-[18px] h-[18px]" />
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-rose-500 rounded-full border border-[#0B1221] shadow-sm animate-pulse"></span>
            </button>
        </div>

        <div className="h-6 w-px bg-white/10"></div>

        <div className="relative flex items-center justify-center p-0.5 rounded-full border border-white/10 hover:border-indigo-500/50 transition-colors cursor-pointer bg-white/[0.02]">
            <div className="relative">
                <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: "w-8 h-8 rounded-full",
                            userButtonPopoverCard: "bg-[#0B1221] border border-white/10 shadow-2xl",
                            userButtonPopoverFooter: "hidden"
                        }
                    }}
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-[2px] border-[#0B1221] z-10 pointer-events-none shadow-sm"></div>
            </div>
        </div>
      </div>
    </nav>
  );
}