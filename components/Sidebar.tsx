"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  Inbox,
  Search,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  ChevronDown,
  Star,
  Zap,
  Play,
  Command,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronsUpDown,
  Bot,
  Globe,
  Database,
  FileText,
  Cpu,
  Layers,
  CheckCircle2,
  MoreVertical,
  GripVertical,
  Terminal,
  Shield,
  CreditCard,
  User,
  Bell,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";

// --- UTILS ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// --- TYPES ---
type BotStatus = "running" | "paused" | "failed" | "queued";
// Updated to match your exact grouping requirements
type BotCategory = "Outreach" | "Scrapers" | "Content" | "CRM" | "Integrations";

interface Bot {
  id: string;
  name: string;
  category: BotCategory;
  status: BotStatus;
  isFavorite: boolean;
  lastRun: string;
  nextRun: string;
  successRate: number;
  href: string;
}

// --- MOCK DATA (Re-organized to match Goal 1) ---
const INITIAL_BOTS: Bot[] = [
  // Outreach & Sales
  { id: "1", name: "Outreach Bot", category: "Outreach", status: "paused", isFavorite: false, lastRun: "1h ago", nextRun: "Manual", successRate: 92, href: "/dashboard/outreach-bot" },
  { id: "2", name: "AI Sales Agent (24/7)", category: "Outreach", status: "running", isFavorite: true, lastRun: "Now", nextRun: "Realtime", successRate: 99, href: "/dashboard/ai-sales-agent" },
  { id: "3", name: "AI Prospecting Agent", category: "Outreach", status: "running", isFavorite: false, lastRun: "5m ago", nextRun: "Continuous", successRate: 95, href: "/dashboard/ai-prospecting-agent" },
  { id: "4", name: "Email Assistant", category: "Outreach", status: "running", isFavorite: true, lastRun: "2m ago", nextRun: "10m", successRate: 98, href: "/dashboard/email-assistant" },

  // Data Scrapers
  { id: "5", name: "Leads Engine", category: "Scrapers", status: "running", isFavorite: true, lastRun: "5m ago", nextRun: "Continuous", successRate: 99, href: "/dashboard/leads-engine" },
  { id: "6", name: "Lead Scraper + Enricher", category: "Scrapers", status: "running", isFavorite: false, lastRun: "1h ago", nextRun: "30m", successRate: 96, href: "/dashboard/lead-scraper" },
  { id: "7", name: "Scrape Configuration", category: "Scrapers", status: "paused", isFavorite: false, lastRun: "2d ago", nextRun: "Manual", successRate: 100, href: "/dashboard/scrape-config" },

  // Content Gen
  { id: "8", name: "CV Generator", category: "Content", status: "paused", isFavorite: true, lastRun: "1d ago", nextRun: "Manual", successRate: 100, href: "/dashboard/cv-generator" },
  { id: "9", name: "Proposal Maker", category: "Content", status: "queued", isFavorite: false, lastRun: "3h ago", nextRun: "1m", successRate: 95, href: "/dashboard/proposal-maker" },
  { id: "10", name: "Content Assistant", category: "Content", status: "failed", isFavorite: false, lastRun: "1d ago", nextRun: "Retry in 5m", successRate: 85, href: "/dashboard/content-assistant" },

  // CRM & Sync
  { id: "11", name: "CRM Auto-Logger Bot", category: "CRM", status: "running", isFavorite: false, lastRun: "10m ago", nextRun: "20m", successRate: 100, href: "/dashboard/crm-auto-logger" },
];

const CATEGORIES: { id: BotCategory; icon: any; label: string }[] = [
  { id: "Outreach", icon: Globe, label: "Outreach & Sales" },
  { id: "Scrapers", icon: Database, label: "Data Scrapers" },
  { id: "Content", icon: FileText, label: "Content Gen" },
  { id: "CRM", icon: Layers, label: "CRM & Sync" },
  { id: "Integrations", icon: Terminal, label: "Integrations" },
];

// --- SUB-COMPONENTS ---

// 1. Status Indicator with Pulse
const StatusIndicator = ({ status }: { status: BotStatus }) => {
  const styles = {
    running: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]",
    paused: "bg-slate-500",
    failed: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]",
    queued: "bg-amber-500",
  };

  return (
    <div className="relative flex h-2 w-2 items-center justify-center">
      {(status === 'running' || status === 'failed') && (
        <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${styles[status]}`}></span>
      )}
      <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${styles[status]}`}></span>
    </div>
  );
};

// 2. Navigation Item (Daily Drivers)
const NavItem = ({ icon: Icon, label, href, isActive, hasBadge, isCollapsed, onClick }: any) => (
  <Link
    href={href || "#"}
    onClick={onClick}
    className={cn(
      "group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative",
      isActive 
        ? "bg-gradient-to-r from-white/10 to-transparent text-white" 
        : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
    )}
  >
    {/* Active Glow Bar */}
    {isActive && (
      <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-r-full shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
    )}
    
    <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
      <Icon className={cn("w-4.5 h-4.5 transition-all duration-300", 
        isActive 
          ? "text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]" 
          : "text-slate-500 group-hover:text-slate-300 group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.1)]"
      )} />
      {hasBadge && (
        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500 border border-[#0B1221]"></span>
        </span>
      )}
    </div>

    {!isCollapsed && (
      <span className="flex-1 truncate tracking-tight">{label}</span>
    )}

    {/* Rail Mode Tooltip */}
    {isCollapsed && (
      <div className="absolute left-14 z-50 hidden group-hover:block bg-[#1a1f2e] text-slate-200 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-700/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] whitespace-nowrap animate-in fade-in zoom-in-95 slide-in-from-left-2 duration-150">
        {label}
      </div>
    )}
  </Link>
);

// 3. Bot Item (Scalable Row)
const BotListItem = ({ bot, isCollapsed, toggleFavorite }: { bot: Bot, isCollapsed: boolean, toggleFavorite: (e: any, id: string) => void }) => {
    const pathname = usePathname();
    const isActive = pathname === bot.href;
    
    return (
      <Link href={bot.href} className={cn(
        "group/bot flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 relative group",
        isActive 
          ? "bg-gradient-to-r from-white/10 to-transparent text-white" 
          : "hover:bg-white/5 text-slate-400 hover:text-slate-200"
      )}>
        {/* Active Indicator */}
        {isActive && !isCollapsed && (
          <div className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-indigo-500 rounded-r-full shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
        )}

        <div className="flex items-center gap-3 min-w-0">
          <div className="shrink-0 pt-0.5 w-4 flex justify-center">
            <StatusIndicator status={bot.status} />
          </div>
          {!isCollapsed && (
            <span className={cn("text-sm truncate transition-all duration-200 tracking-tight", isActive ? "font-medium text-slate-100" : "font-normal")}>
              {bot.name}
            </span>
          )}
        </div>
    
        {/* Hover Actions (Full Mode) */}
        {!isCollapsed && (
          <div className="flex items-center opacity-0 group-hover/bot:opacity-100 transition-all duration-200 absolute right-2 bg-gradient-to-l from-[#0B1221] via-[#0B1221] to-transparent pl-4">
            <button 
              onClick={(e) => toggleFavorite(e, bot.id)}
              className="p-1 hover:text-amber-400 transition-colors focus:outline-none"
            >
              <Star className={cn("w-3.5 h-3.5 transition-all", bot.isFavorite ? "fill-amber-400 text-amber-400" : "text-slate-600 hover:text-amber-400")} />
            </button>
            <button className="p-1 text-slate-600 hover:text-white transition-colors">
              <MoreVertical className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
    
        {/* Advanced Preview Tooltip (Ghost Panel) */}
        <div className={cn(
          "absolute left-full top-[-10px] ml-4 z-50 hidden group-hover/bot:block w-[280px] bg-[#0B1221]/95 border border-slate-800/80 rounded-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md animate-in fade-in slide-in-from-left-2 duration-200 pointer-events-none",
          isCollapsed ? "ml-5" : "ml-4"
        )}>
          {/* Header */}
          <div className="p-4 border-b border-slate-800/50 flex justify-between items-start bg-white/[0.02] rounded-t-xl">
            <div>
              <h4 className="font-semibold text-white text-sm flex items-center gap-2 mb-0.5">
                {bot.name}
                {bot.isFavorite && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
              </h4>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{bot.category}</span>
            </div>
            <div className={cn(
              "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border shadow-sm",
              bot.status === 'running' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
              bot.status === 'failed' ? "bg-red-500/10 text-red-400 border-red-500/20" :
              "bg-slate-800/50 text-slate-400 border-slate-700/50"
            )}>
              {bot.status}
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 divide-x divide-slate-800/50 p-3 bg-[#0B1221]">
            <div className="text-center px-2">
              <div className="text-[10px] uppercase text-slate-500 font-bold mb-1 tracking-wide">Success Rate</div>
              <div className={cn("text-lg font-bold tracking-tight", bot.successRate > 90 ? "text-emerald-400" : "text-white")}>
                {bot.successRate}%
              </div>
            </div>
            <div className="text-center px-2">
              <div className="text-[10px] uppercase text-slate-500 font-bold mb-1 tracking-wide">Next Run</div>
              <div className="text-lg font-bold text-indigo-400 tracking-tight">{bot.nextRun}</div>
            </div>
          </div>
    
          {/* Footer Hint */}
          <div className="p-2 border-t border-slate-800/50 bg-white/[0.02] rounded-b-xl flex justify-between items-center text-[10px] text-slate-500 px-4">
             <span>Last run: <span className="text-slate-300">{bot.lastRun}</span></span>
             <span className="flex items-center gap-1"><Command className="w-2.5 h-2.5" />Click to open</span>
          </div>
        </div>
      </Link>
    );
}


// --- MAIN SIDEBAR COMPONENT ---
export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  
  // --- STATE ---
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState("Agency Internal");
  const [bots, setBots] = useState<Bot[]>(INITIAL_BOTS);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "Outreach": true,
    "Scrapers": true,
    "Content": true,
    "CRM": true
  });
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  // Keyboard Chord State
  const lastKeyTimeRef = useRef<number>(0);
  const lastKeyRef = useRef<string>("");

  // --- KEYBOARD MASTERY ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      const key = e.key.toLowerCase();
      const activeElement = document.activeElement as HTMLElement;
      const isInputActive = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';

      // 1. Global Shortcuts (Meta-based)
      if (e.metaKey && key === "k") {
        e.preventDefault();
        alert("🔍 Global Spotlight Triggered"); 
        return;
      }
      if (e.metaKey && e.shiftKey && key === "s") {
        e.preventDefault();
        setIsCollapsed(prev => !prev);
        return;
      }

      // 2. Chords (G then ...) - Ignore if typing in input
      if (!isInputActive) {
        if (lastKeyRef.current === "g" && now - lastKeyTimeRef.current < 500) {
          if (key === "h") {
            router.push("/dashboard");
            lastKeyRef.current = ""; 
            return;
          }
          if (key === "b") {
            const searchInput = document.getElementById("sidebar-search") as HTMLInputElement;
            if (searchInput) searchInput.focus();
            lastKeyRef.current = "";
            return;
          }
        }

        if (!e.metaKey && !e.ctrlKey && !e.altKey && key.length === 1) {
          lastKeyRef.current = key;
          lastKeyTimeRef.current = now;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  // --- ACTIONS ---
  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const toggleFavorite = (e: React.MouseEvent, botId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setBots(prev => prev.map(b => b.id === botId ? { ...b, isFavorite: !b.isFavorite } : b));
  };

  // --- DATA DERIVATION ---
  const favorites = useMemo(() => bots.filter(b => b.isFavorite), [bots]);
  
  const groupedBots = useMemo(() => {
    return bots.reduce((acc, bot) => {
      // Filter by search if active
      if (searchQuery && !bot.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return acc;
      }
      if (!acc[bot.category]) acc[bot.category] = [];
      acc[bot.category].push(bot);
      return acc;
    }, {} as Record<BotCategory, Bot[]>);
  }, [bots, searchQuery]);

  // --- RENDER ---
  return (
    <aside 
      ref={sidebarRef}
      className={cn(
        "h-screen bg-[#0B1221] border-r border-slate-800/80 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] relative z-40 select-none shadow-2xl shadow-black/50",
        isCollapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* ------------------------------ */}
      {/* ZONE 1: HEADER (Sticky) */}
      {/* ------------------------------ */}
      <div className="p-4 shrink-0 space-y-4">
        
        {/* Workspace Switcher */}
        <div className="relative">
          <button 
            onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
            className={cn(
              "flex items-center gap-3 hover:bg-white/5 p-2 rounded-xl transition-all duration-200 group w-full border border-transparent hover:border-slate-800/50",
              isCollapsed && "justify-center px-0"
            )}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(99,102,241,0.3)] shrink-0 ring-1 ring-white/10 group-hover:scale-105 transition-transform">
              S
            </div>
            
            {!isCollapsed && (
              <div className="flex-1 text-left overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="block font-semibold text-sm text-slate-200 group-hover:text-white leading-none truncate tracking-tight">SoloAgency</span>
                  <ChevronsUpDown className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[11px] text-slate-500 group-hover:text-slate-400 truncate block mt-1 font-medium">{activeWorkspace}</span>
              </div>
            )}
          </button>
          
          {/* Workspace Dropdown */}
          {showWorkspaceMenu && !isCollapsed && (
             <div className="absolute top-full left-0 mt-2 w-64 bg-[#111827] border border-slate-700/80 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] p-2 z-50 animate-in fade-in zoom-in-95 duration-100 ring-1 ring-white/5">
                <div className="px-2 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Switch Workspace</div>
                {["Agency Internal", "Client: TechCorp", "Client: FinanceFlow"].map(ws => (
                   <button 
                     key={ws}
                     onClick={() => { setActiveWorkspace(ws); setShowWorkspaceMenu(false); }}
                     className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-400 flex items-center justify-between group transition-colors"
                   >
                     {ws}
                     {activeWorkspace === ws && <CheckCircle2 className="w-4 h-4 text-indigo-500" />}
                   </button>
                ))}
                <div className="h-px bg-slate-800/80 my-2" />
                <button className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-white/5 hover:text-white flex items-center gap-2 transition-colors">
                   <Plus className="w-4 h-4" /> New Workspace
                </button>
             </div>
          )}
        </div>

        {/* Spotlight & Search */}
        {!isCollapsed ? (
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
            <input 
              id="sidebar-search"
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 text-slate-300 text-sm rounded-lg pl-9 pr-9 py-2 focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600 outline-none hover:border-slate-700 hover:bg-slate-900/80"
            />
            {searchQuery ? (
              <button onClick={() => setSearchQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white p-1">
                <Plus className="w-3 h-3 rotate-45" />
              </button>
            ) : (
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 pointer-events-none">
                 <kbd className="hidden group-hover:inline-flex h-4 items-center gap-0.5 rounded border border-slate-700 bg-slate-800/80 px-1.5 font-mono text-[10px] text-slate-500 font-bold shadow-sm">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={() => setIsCollapsed(false)}
            className="w-full flex justify-center p-2.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-slate-200 transition-colors group"
          >
            <Search className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
          </button>
        )}
      </div>

      {/* ------------------------------ */}
      {/* ZONE 2: DAILY DRIVERS */}
      {/* ------------------------------ */}
      <div className="px-3 pb-2 space-y-1">
        <NavItem 
           icon={LayoutDashboard} 
           label="Overview" 
           href="/dashboard" 
           isActive={pathname === "/dashboard"} 
           isCollapsed={isCollapsed}
        />
        <NavItem 
           icon={Activity} 
           label="Pulse Feed" 
           href="/dashboard/pulse" 
           isActive={pathname === "/dashboard/pulse"} 
           hasBadge={true}
           isCollapsed={isCollapsed}
        />
        <NavItem 
           icon={Inbox} 
           label="Inbox" 
           href="/dashboard/inbox" 
           isActive={pathname === "/dashboard/inbox"} 
           isCollapsed={isCollapsed}
        />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent my-3 mx-6" />

      {/* ------------------------------ */}
      {/* ZONE 3: BOT UNIVERSE (Scrollable) */}
      {/* ------------------------------ */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent px-3 py-2 space-y-6">
        
        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
             {!isCollapsed && (
               <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-3 flex items-center justify-between group">
                 <span className="flex items-center gap-1.5"><Star className="w-3 h-3 text-slate-600" /> Favorites</span>
               </h3>
             )}
             <div className="space-y-1">
                {favorites.map(bot => (
                  <div key={bot.id} className="relative group/fav">
                     {/* Visual Drag Handle */}
                     {!isCollapsed && <div className="absolute -left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/fav:opacity-100 cursor-grab px-0.5 text-slate-600 hover:text-slate-400 transition-opacity">
                        <GripVertical className="w-3 h-3" />
                     </div>}
                     <BotListItem bot={bot} isCollapsed={isCollapsed} toggleFavorite={toggleFavorite} />
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* Categories */}
        <div className="space-y-4">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="group/cat relative">
               
               {/* Category Header */}
               {!isCollapsed ? (
                 <button 
                   onClick={() => toggleCategory(cat.id)}
                   className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-slate-300 transition-colors rounded-lg hover:bg-white/5 group/header mb-1"
                 >
                   <span className="flex items-center gap-2">
                     {expandedCategories[cat.id] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                     {cat.label}
                   </span>
                   {groupedBots[cat.id]?.length > 0 && (
                     <span className="bg-slate-800/80 text-slate-400 px-1.5 py-0.5 rounded text-[9px] min-w-[1.25rem] text-center border border-slate-700/50 group-hover/header:border-slate-600 transition-colors">
                       {groupedBots[cat.id]?.length}
                     </span>
                   )}
                 </button>
               ) : (
                 // Rail Mode: Category Icon
                 <div className="w-full flex justify-center py-1 relative">
                    <button className="p-2.5 rounded-xl hover:bg-white/5 text-slate-500 hover:text-slate-200 transition-colors relative group/railicon">
                       <cat.icon className="w-4 h-4" />
                       {groupedBots[cat.id]?.some(b => b.status === 'failed') && (
                         <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_4px_red]" />
                       )}
                    </button>
                    
                    {/* Rail Mode: Flyout Menu (Ghost Panel) */}
                    <div className="absolute left-10 top-0 ml-4 z-50 hidden group-hover/cat:block w-72 bg-[#0B1221] border border-slate-800 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] p-1 animate-in fade-in slide-in-from-left-2 duration-150 ring-1 ring-white/10">
                       <div className="px-4 py-3 text-xs font-bold text-slate-400 uppercase border-b border-slate-800/50 mb-1 flex justify-between items-center bg-white/[0.02] rounded-t-lg">
                          <span className="tracking-widest">{cat.label}</span>
                          <span className="bg-slate-800 px-2 py-0.5 rounded-full text-[9px] text-slate-300 border border-slate-700">{groupedBots[cat.id]?.length || 0}</span>
                       </div>
                       <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 p-2 space-y-1">
                         {groupedBots[cat.id]?.length > 0 ? (
                           groupedBots[cat.id].map(bot => (
                             <div key={bot.id}>
                                <BotListItem bot={bot} isCollapsed={false} toggleFavorite={toggleFavorite} />
                             </div>
                           ))
                         ) : (
                           <div className="text-xs text-slate-600 px-4 py-6 italic text-center">No active bots</div>
                         )}
                       </div>
                    </div>
                 </div>
               )}

               {/* Expanded List (Full Mode) */}
               {!isCollapsed && expandedCategories[cat.id] && (
                 <div className="mt-1 space-y-0.5 animate-in slide-in-from-top-1 duration-200 pl-1">
                    {groupedBots[cat.id]?.length > 0 ? (
                      groupedBots[cat.id].map(bot => <BotListItem key={bot.id} bot={bot} isCollapsed={isCollapsed} toggleFavorite={toggleFavorite} />)
                    ) : (
                      <div className="px-4 py-3 text-xs text-slate-600 italic border-l-2 border-slate-800/50 ml-3">No bots found</div>
                    )}
                    
                    {/* "Add New" placeholder */}
                    <button className="flex items-center gap-2 px-3 py-2 ml-1 text-xs text-slate-500 hover:text-indigo-400 transition-colors w-full group/add hover:bg-white/5 rounded-lg mt-1">
                       <Plus className="w-3.5 h-3.5 group-hover/add:rotate-90 transition-transform" /> 
                       <span className="opacity-70 group-hover/add:opacity-100 transition-opacity font-medium">New in {cat.label}</span>
                    </button>
                 </div>
               )}
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------ */}
      {/* ZONE 4: FOOTER (Sticky) */}
      {/* ------------------------------ */}
      <div className="p-3 border-t border-slate-800/80 bg-[#0B1221] shrink-0 space-y-1 z-50">
         
         {/* Footer Nav */}
         <div className="space-y-0.5">
           <NavItem icon={CreditCard} label="Billing & Usage" href="/dashboard/billing" isCollapsed={isCollapsed} />
           <NavItem icon={HelpCircle} label="Help & Documentation" href="/docs" isCollapsed={isCollapsed} />
           <NavItem icon={Settings} label="Settings" href="/dashboard/settings" isCollapsed={isCollapsed} />
         </div>

         {/* Collapse Toggle */}
         <div className="flex justify-end px-2 py-2">
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-slate-600 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg active:scale-95 duration-100"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar (Cmd+Shift+S)"}
            >
              {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>
         </div>
         
         {/* User Profile */}
         <div className={cn(
           "mt-1 pt-3 border-t border-slate-800/50 flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-all duration-200",
           isCollapsed ? "justify-center" : ""
         )}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-white font-bold text-xs shrink-0 ring-2 ring-white/10 relative shadow-lg group-hover:ring-indigo-500/50 transition-all">
               {user?.imageUrl ? (
                 <img src={user.imageUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
               ) : (
                 user?.firstName?.[0] || <User className="w-4 h-4" />
               )}
               <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-[2.5px] border-[#0B1221] rounded-full"></div>
            </div>
            
            {!isCollapsed && (
               <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold text-white truncate group-hover:text-indigo-200 transition-colors">{user?.firstName || "Guest User"}</p>
                  <p className="text-[10px] text-emerald-400 truncate flex items-center gap-1.5 font-medium mt-0.5">
                    <Sparkles className="w-2.5 h-2.5" /> Pro Plan Active
                  </p>
               </div>
            )}
            
            {!isCollapsed && (
               <SignOutButton>
                 <button className="p-2 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100" title="Logout">
                    <LogOut className="w-4 h-4" />
                 </button>
               </SignOutButton>
            )}
         </div>
      </div>
    </aside>
  );
}