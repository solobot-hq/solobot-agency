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

  const handleCreateWorkspace = () => {
    const name = prompt("Name your new workspace:");
    if (name?.trim()) addWorkspace(name);
    setIsWorkspaceOpen(false);
  };

  const getBreadcrumb = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length <= 1) return "Overview";
    return segments[segments.length - 1].replace(/-/g, " ").toUpperCase();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[120px] bg-[#0B1221]/95 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-8 md:px-14 shadow-2xl">
      
      {/* LEFT: BRAND & CONTEXT */}
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="flex items-center gap-6 group shrink-0">
          <div className="relative h-20 w-20 shrink-0">
            <Image 
              src="/sl.png" 
              alt="Logo" 
              fill
              className="transition-transform duration-500 group-hover:scale-110 object-contain drop-shadow-[0_0_20px_rgba(79,70,229,0.5)]"
              priority 
            />
          </div>
          <div className="flex flex-col">
             <span className="hidden lg:block font-black text-4xl text-white tracking-tighter leading-none group-hover:text-indigo-400 transition-colors">
              SoloBotAgency
            </span>
            <span className="hidden lg:block text-xs font-bold text-indigo-500/60 uppercase tracking-[0.4em] mt-2">
              Enterprise AI Sales
            </span>
          </div>
        </Link>

        <div className="hidden md:block h-12 w-px bg-white/10 rotate-[25deg]"></div>

        {/* Workspace Switcher */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
            className="hidden md:flex items-center gap-4 px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/5 transition-all min-w-[260px] justify-between"
          >
            <div className="flex items-center gap-4 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-sm font-black text-indigo-400 border border-indigo-500/20">
                {activeWorkspace?.name.charAt(0).toUpperCase() || "A"}
              </div>
              <span className="text-base font-bold text-slate-200 truncate">
                {activeWorkspace?.name || "Loading..."}
              </span>
            </div>
            <ChevronsUpDown className="w-6 h-6 text-slate-500" />
          </button>

          {isWorkspaceOpen && (
            <div className="absolute top-full left-0 mt-5 w-80 bg-[#0F1528] border border-white/10 rounded-[32px] p-4 shadow-2xl animate-in fade-in slide-in-from-top-4">
              <div className="space-y-2">
                {workspaces.map((ws) => (
                  <button
                    key={ws.id}
                    onClick={() => handleSwitchWorkspace(ws)}
                    className={`w-full text-left px-4 py-4 rounded-2xl text-base font-bold flex items-center justify-between ${
                      activeWorkspace?.id === ws.id ? "bg-indigo-500/20 text-indigo-100" : "text-slate-400 hover:bg-white/5"
                    }`}
                  >
                    {ws.name}
                    {activeWorkspace?.id === ws.id && <Check className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CENTER SEARCH */}
      <div className="hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <button className="flex items-center gap-5 w-[420px] h-16 px-8 rounded-3xl bg-white/[0.02] border border-white/5">
          <Search className="w-6 h-6 text-slate-500" />
          <span className="text-base font-bold text-slate-500 uppercase tracking-[0.2em]">Search...</span>
        </button>
      </div>

      {/* RIGHT UTILITIES */}
      <div className="flex items-center gap-6">
        <div className="flex gap-3">
          <button className="p-4 rounded-2xl text-slate-400 hover:text-white"><Sun className="w-7 h-7" /></button>
          <button className="p-4 rounded-2xl text-slate-400 hover:text-white relative"><Bell className="w-7 h-7" /></button>
        </div>
        <div className="h-14 w-px bg-white/10"></div>
        <UserButton appearance={{ elements: { avatarBox: "w-14 h-14" } }} />
      </div>
    </nav>
  );
}