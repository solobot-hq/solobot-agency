"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Command, Search, Bot, ArrowRight, Activity, Pause, Play, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type CommandItem = {
  id: string;
  label: string;
  group: 'Navigation' | 'Actions' | 'Deals';
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
};

export default function GlobalCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  // Load deals for dynamic commands
  const [deals, setDeals] = useState<any[]>([]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
        // Refresh deals from persistence on open to ensure data is fresh
        const stored = localStorage.getItem('sales-os-v1');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed.states) setDeals(Object.values(parsed.states));
          } catch (e) {}
        }
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Command Execution Logic
  const executeCommand = (cmd: CommandItem) => {
    cmd.action();
    setIsOpen(false);
    setQuery('');
  };

  // Helper to modify local persistence store directly from global context
  const modifyActiveDealState = (updates: any) => {
    const stored = localStorage.getItem('sales-os-v1');
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      // Determine active deal from URL query param or fallback to default
      const urlParams = new URLSearchParams(window.location.search);
      const activeId = urlParams.get('deal') || 'deal-1'; 
      
      if (parsed.states[activeId]) {
        parsed.states[activeId] = { ...parsed.states[activeId], ...updates };
        localStorage.setItem('sales-os-v1', JSON.stringify(parsed));
        
        // Force refresh if on agent page to show state change immediately
        if (pathname.includes('ai-sales-agent')) {
          window.location.reload(); 
        }
      }
    } catch (e) {
      console.error("Failed to execute global command", e);
    }
  };

  const commands: CommandItem[] = useMemo(() => {
    const list: CommandItem[] = [
      {
        id: 'nav-deals',
        label: 'Go to All Deals',
        group: 'Navigation',
        icon: <Layers size={14} />,
        action: () => router.push('/dashboard/deals'),
      },
      {
        id: 'nav-agent',
        label: 'Go to AI Sales Agent',
        group: 'Navigation',
        icon: <Bot size={14} />,
        action: () => router.push('/dashboard/ai-sales-agent'),
      },
      {
        id: 'act-pause',
        label: 'Pause Current Deal',
        group: 'Actions',
        icon: <Pause size={14} />,
        action: () => modifyActiveDealState({ status: 'paused', health: 'at_risk' }),
      },
      {
        id: 'act-resume',
        label: 'Resume Current Deal',
        group: 'Actions',
        icon: <Play size={14} />,
        action: () => modifyActiveDealState({ status: 'active', health: 'healthy' }),
      }
    ];

    // Dynamic Deal Switching
    deals.forEach((deal) => {
      list.push({
        id: `switch-${deal.dealId}`,
        label: `Switch to ${deal.dealName}`,
        group: 'Deals',
        icon: <ArrowRight size={14} />,
        action: () => {
          router.push(`/dashboard/ai-sales-agent?deal=${deal.dealId}`);
          // Trigger a reload if we are already on the page to force state refresh
          if (pathname.includes('ai-sales-agent')) {
             setTimeout(() => window.location.href = `/dashboard/ai-sales-agent?deal=${deal.dealId}`, 50);
          }
        },
      });
    });

    return list.filter(item => 
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, deals, router, pathname]);

  // Keyboard navigation within palette
  useEffect(() => {
    const handleNav = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => (i + 1) % commands.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => (i - 1 + commands.length) % commands.length);
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (commands[selectedIndex]) executeCommand(commands[selectedIndex]);
      }
    };
    window.addEventListener('keydown', handleNav);
    return () => window.removeEventListener('keydown', handleNav);
  }, [isOpen, commands, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 pt-[15vh] backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.1 }}
        className="flex w-full max-w-lg flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl ring-1 ring-white/10"
      >
        <div className="flex items-center border-b border-zinc-800 px-4">
          <Search size={16} className="text-zinc-500" />
          <input
            autoFocus
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder="Type a command (Switch, Pause, Go to)..."
            className="h-14 flex-1 bg-transparent px-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
          />
          <div className="flex items-center gap-1 rounded bg-zinc-900 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 border border-zinc-800">
            <span className="text-xs">ESC</span>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-zinc-800">
          {commands.length === 0 ? (
            <div className="py-8 text-center text-xs text-zinc-500">No commands found.</div>
          ) : (
            <div className="flex flex-col gap-1">
              {['Navigation', 'Actions', 'Deals'].map((group) => {
                const groupItems = commands.filter(c => c.group === group);
                if (groupItems.length === 0) return null;
                return (
                  <div key={group}>
                    <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                      {group}
                    </div>
                    {groupItems.map((item, idx) => {
                      // Calculate global index for highlighting
                      const globalIdx = commands.indexOf(item);
                      const isSelected = globalIdx === selectedIndex;
                      return (
                        <button
                          key={item.id}
                          onClick={() => executeCommand(item)}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                            isSelected ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:bg-zinc-900'
                          }`}
                        >
                          <div className={`flex h-5 w-5 items-center justify-center ${isSelected ? 'text-indigo-200' : 'text-zinc-600'}`}>
                            {item.icon}
                          </div>
                          <span className="flex-1">{item.label}</span>
                          {isSelected && <ArrowRight size={14} className="opacity-50" />}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-900/50 px-4 py-2 text-[10px] text-zinc-500">
          <div className="flex gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <span>SalesOS v2.4</span>
        </div>
      </motion.div>
    </div>
  );
}