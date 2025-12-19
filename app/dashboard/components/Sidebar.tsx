"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, 
  Bot, 
  Mail, 
  Zap, 
  Settings, 
  FileText, 
  Users, 
  MessageSquare, 
  Activity, 
  Phone, 
  Search, 
  Inbox, 
  Star, 
  ChevronDown, 
  HelpCircle, 
  PenTool, 
  Database, 
  BarChart, 
  Headphones, 
  Globe, 
  Briefcase, 
  CalendarCheck 
} from 'lucide-react';

const NAV_SECTIONS = [
  {
    title: "Favorites",
    items: [
      { label: 'AI Sales Agent (24/7)', icon: Bot, href: '/dashboard/ai-sales-agent' }, 
      { label: 'Email Assistant', icon: Mail, href: '/dashboard/email-assistant' }, 
      { label: 'Leads Engine', icon: Zap, href: '/dashboard/leads-engine' }, 
      { label: 'Pipeline Manager', icon: LayoutGrid, href: '/dashboard/deals' }, 
    ]
  },
  {
    title: "Sales & Outreach",
    items: [
      { label: 'Outreach Bot', icon: MessageSquare, href: '/dashboard/outreach-bot' }, 
      { label: 'AI Prospecting Agent', icon: Users, href: '/dashboard/prospecting' }, 
      { label: 'Cold Call Simulator', icon: Phone, href: '/dashboard/simulator' }, 
      { label: 'Proposal Builder', icon: FileText, href: '/dashboard/proposal-builder' }, 
    ]
  },
  {
    title: "Marketing & Content",
    items: [
      { label: 'Content Wizard', icon: PenTool, href: '/dashboard/content-wizard' }, 
      { label: 'Social Media Manager', icon: Globe, href: '/dashboard/social-manager' }, 
      { label: 'SEO Specialist', icon: BarChart, href: '/dashboard/seo-specialist' }, 
      { label: 'Market Analyst', icon: Activity, href: '/dashboard/market-analyst' }, 
    ]
  },
  {
    title: "Operations & Support",
    items: [
      { label: 'Support Sentinel', icon: Headphones, href: '/dashboard/support' }, 
      { label: 'Data Miner X', icon: Database, href: '/dashboard/data-miner' }, 
      { label: 'Meeting Scheduler', icon: CalendarCheck, href: '/dashboard/scheduler' }, 
    ]
  }
];

const PLATFORM_TOOLS = [
  { label: 'Overview', icon: Activity, href: '/dashboard/overview' },
  { label: 'Pulse Feed', icon: Activity, href: '/dashboard/pulse' },
  { label: 'Global Inbox', icon: Inbox, href: '/dashboard/inbox' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [search, setSearch] = useState('');

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-zinc-800 bg-[#0B1221] text-zinc-400 font-sans">
      {/* Official Brand Header */}
      <div className="flex h-16 items-center gap-3 border-b border-zinc-800 px-4">
        {/* Logo Container - Full Square, No Border */}
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
           <Image 
             src="/sl.png" 
             alt="Solobotagency Logo" 
             fill
             className="object-cover" 
             priority
           />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm font-bold text-zinc-100 tracking-tight leading-tight">Solobotagency</span>
          <span className="text-[10px] text-emerald-500 font-medium">One Bot. Infinite Tasks.</span>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-3">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-2 text-zinc-500" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search 15 active bots..." 
            className="h-8 w-full rounded-md border border-zinc-800 bg-zinc-900/50 pl-8 pr-3 text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 scrollbar-thin scrollbar-thumb-zinc-800">
        <div className="flex flex-col gap-6">
          {NAV_SECTIONS.map((section, idx) => (
            <div key={idx}>
              <div className="mb-2 flex items-center justify-between px-2">
                <h3 className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                  {section.title === 'Favorites' && <Star size={10} className="fill-zinc-600" />}
                  {section.title}
                </h3>
              </div>
              
              <div className="flex flex-col gap-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/dashboard/overview' && pathname?.startsWith(item.href));
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-xs font-medium transition-all ${
                        isActive 
                          ? 'bg-indigo-500/10 text-indigo-300 shadow-sm ring-1 ring-inset ring-indigo-500/20' 
                          : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                      }`}
                    >
                      <item.icon size={16} className={isActive ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-400'} />
                      
                      <span className="flex-1 truncate">{item.label}</span>
                      
                      {isActive && <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Platform Analytics Section */}
          <div>
             <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                Platform Analytics
             </div>
             <div className="flex flex-col gap-0.5">
                {PLATFORM_TOOLS.map((item) => {
                   const isActive = pathname === item.href;
                   return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-xs font-medium transition-all ${
                        isActive 
                          ? 'bg-zinc-800 text-zinc-100' 
                          : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                      }`}
                    >
                      <item.icon size={16} className={isActive ? 'text-zinc-100' : 'text-zinc-500 group-hover:text-zinc-400'} />
                      <span className="flex-1 truncate">{item.label}</span>
                    </Link>
                   )
                })}
             </div>
          </div>

        </div>
      </div>

      {/* Footer / User Profile */}
      <div className="mt-auto border-t border-zinc-800 bg-[#0B1221] p-3">
        <div className="mb-2 px-2 text-[10px] font-medium text-zinc-500">
          Usage: <span className="text-zinc-300">78%</span> of Enterprise Plan
        </div>
        <div className="h-1 w-full rounded-full bg-zinc-800 mb-4 overflow-hidden">
           <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
        </div>

        <button className="group flex w-full items-center gap-3 rounded-lg p-2 hover:bg-zinc-900 transition-colors border border-transparent hover:border-zinc-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white shadow-inner">
            SA
          </div>
          <div className="flex flex-1 flex-col items-start overflow-hidden">
            <span className="w-full truncate text-xs font-semibold text-zinc-200 group-hover:text-white">
              Supervisor Account
            </span>
            <span className="w-full truncate text-[10px] text-zinc-500">
              supervisor@solobot.agency
            </span>
          </div>
          <Settings size={14} className="text-zinc-500 group-hover:text-zinc-300" />
        </button>
      </div>
    </aside>
  );
}