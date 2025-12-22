"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Bot, Bell, Settings, Radio, Activity, ChevronDown } from 'lucide-react';
import ModeSelector, { Mode } from './ModeSelector';
import SystemStateBar from './SystemStateBar';
import ActionQueue, { QueueItem } from './ActionQueue';
import SystemEvent, { EventItem } from './SystemEvent';
import CommandInput from './CommandInput';
import IntelligencePanel from './IntelligencePanel';

// --- TYPES & MOCK DATA ---

export type Tier = 'Growth' | 'Enterprise';

export type AIState = {
  dealId: string;
  dealName: string;
  tier: Tier;
  phase: 'Prospecting' | 'Validation' | 'Negotiation' | 'Closing';
  status: 'active' | 'paused' | 'awaiting_human';
  blocker: string | null;
  blockerId: string | null;
  resolvedBlockerIds: string[];
  probability: number;
  health: 'healthy' | 'at_risk' | 'critical';
};

const DEALS: Record<string, AIState> = {
  'deal-1': {
    dealId: 'deal-1',
    dealName: 'Acme Corp',
    tier: 'Enterprise',
    phase: 'Negotiation',
    status: 'awaiting_human',
    blocker: 'Legal Review (MSA)',
    blockerId: 'blk_msa_01',
    resolvedBlockerIds: [],
    probability: 68,
    health: 'at_risk',
  },
  'deal-2': {
    dealId: 'deal-2',
    dealName: 'Globex Inc',
    tier: 'Growth',
    phase: 'Validation',
    status: 'active',
    blocker: null,
    blockerId: null,
    resolvedBlockerIds: [],
    probability: 42,
    health: 'healthy',
  }
};

const INITIAL_EVENTS: Record<string, EventItem[]> = {
  'deal-1': [
    {
      id: 'e1',
      timestamp: '09:00 AM',
      type: 'log',
      source: 'CRM Connector',
      content: 'Synced 14 emails from thread "Re: MSA Redlines".',
    },
    {
      id: 'e2',
      timestamp: '09:05 AM',
      type: 'alert',
      source: 'Risk Monitor',
      content: 'PROBABILITY DROP: Deal score decreased by 12% due to CISO objection.',
    },
    {
      id: 'e3',
      timestamp: '09:10 AM',
      type: 'decision',
      source: 'Strategy Core',
      content: 'Generated counter-strategy: "Compliance Override Packet". Awaiting supervisor approval to execute.',
      actions: [
        { id: 'a1', label: 'Approve & Execute Strategy', style: 'primary', action: 'approve_compliance' },
        { id: 'a2', label: 'Edit Packet', style: 'secondary', action: 'edit_packet' }
      ]
    }
  ],
  'deal-2': [
    {
      id: 'e1-2',
      timestamp: '10:00 AM',
      type: 'log',
      source: 'Outreach Bot',
      content: 'Validation call scheduled for next Tuesday.',
    }
  ]
};

const INITIAL_QUEUES: Record<string, QueueItem[]> = {
  'deal-1': [
    { id: 'q1', label: 'Analyze Thread Sentiment', status: 'completed', timestamp: '08:00 AM' },
    { id: 'q2', label: 'Update CRM Probability', status: 'completed', timestamp: '08:01 AM' },
    { id: 'q3', label: 'Generate Compliance Docs', status: 'pending', timestamp: 'On Hold' },
    { id: 'q4', label: 'Email Draft: CISO', status: 'pending', timestamp: 'Queued' },
  ],
  'deal-2': [
    { id: 'q1-2', label: 'Research Stakeholders', status: 'running', timestamp: 'Now' }
  ]
};

export default function SalesAgentUI() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlDealId = searchParams.get('deal');

  // --- GLOBAL STATE ---
  const [activeDealId, setActiveDealId] = useState<string>('deal-1');
  const [activeMode, setActiveMode] = useState<Mode>('live');
  const [showPanel, setShowPanel] = useState(true);
  const [isDealMenuOpen, setIsDealMenuOpen] = useState(false);

  // Persistence: Store all deals' state in one object
  const [persistenceStore, setPersistenceStore] = useState<{
    states: Record<string, AIState>;
    events: Record<string, EventItem[]>;
    queues: Record<string, QueueItem[]>;
  }>(() => {
    // Initial Load (Client-side handled via useEffect to avoid hydration mismatch, setting defaults here)
    return { states: DEALS, events: INITIAL_EVENTS, queues: INITIAL_QUEUES };
  });

  // Load from LocalStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sales-os-v1');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setPersistenceStore(parsed);
          
          // If URL param exists, respect it over default
          if (urlDealId && parsed.states[urlDealId]) {
            setActiveDealId(urlDealId);
          }
        } catch (e) {
          console.error("Persistence Load Error", e);
        }
      }
    }
  }, [urlDealId]);

  // Derived state for current view
  const aiState = persistenceStore.states[activeDealId] || DEALS['deal-1'];
  const events = persistenceStore.events[activeDealId] || [];
  const queue = persistenceStore.queues[activeDealId] || [];

  // Refs for async operations
  const stateRef = useRef(aiState);
  useEffect(() => { stateRef.current = aiState; }, [aiState]);

  // Persist on change
  useEffect(() => {
    localStorage.setItem('sales-os-v1', JSON.stringify(persistenceStore));
  }, [persistenceStore]);

  // Handle URL changes after mount
  useEffect(() => {
    if (urlDealId && persistenceStore.states[urlDealId] && urlDealId !== activeDealId) {
      setActiveDealId(urlDealId);
    }
  }, [urlDealId, persistenceStore.states]);

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [events]);

  // --- HELPERS ---

  const updateStore = (updates: { state?: Partial<AIState>, newEvent?: EventItem, queueUpdate?: (q: QueueItem[]) => QueueItem[] }) => {
    setPersistenceStore(prev => {
      const dealState = prev.states[activeDealId];
      const dealEvents = prev.events[activeDealId] || [];
      const dealQueue = prev.queues[activeDealId] || [];

      return {
        ...prev,
        states: {
          ...prev.states,
          [activeDealId]: updates.state ? { ...dealState, ...updates.state } : dealState
        },
        events: {
          ...prev.events,
          [activeDealId]: updates.newEvent ? [...dealEvents, updates.newEvent] : dealEvents
        },
        queues: {
          ...prev.queues,
          [activeDealId]: updates.queueUpdate ? updates.queueUpdate(dealQueue) : dealQueue
        }
      };
    });
  };

  const createEvent = (type: EventItem['type'], source: string, content: string): EventItem => ({
    id: Date.now().toString(),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type, source, content
  });

  const handleDealSwitch = (dealId: string) => {
    setActiveDealId(dealId);
    setIsDealMenuOpen(false);
    // Update URL to match state
    router.push(`/dashboard/ai-sales-agent?deal=${dealId}`);
  };

  // --- ACTIONS ---

  const handleAction = (actionId: string) => {
    if (actionId === 'approve_compliance') executeComplianceStrategy();
    else if (actionId === 'edit_packet') pauseForEditing();
  };

  const executeComplianceStrategy = () => {
    const current = stateRef.current;

    // 1. Gating: Block if already executed for this blocker ID
    if (current.blockerId && current.resolvedBlockerIds.includes(current.blockerId)) {
      updateStore({
        newEvent: createEvent('alert', 'System', 'Execution Denied: Strategy already executed for this blocker.')
      });
      return;
    }

    // 2. Gating: Block if no blocker or closing
    if (!current.blocker || current.phase === 'Closing') {
      updateStore({
        newEvent: createEvent('alert', 'System', 'Execution Denied: No active blocker.')
      });
      return;
    }

    // 3. Status Check
    if (current.status === 'paused') {
      updateStore({
        newEvent: createEvent('alert', 'System', 'System is PAUSED. Resume to execute.')
      });
      return;
    }

    // --- EXECUTION START ---
    
    const newResolvedIds = current.blockerId ? [...current.resolvedBlockerIds, current.blockerId] : current.resolvedBlockerIds;

    updateStore({
      state: { 
        status: 'active', 
        blocker: null, 
        health: 'healthy',
        probability: Math.min(100, current.probability + 7),
        resolvedBlockerIds: newResolvedIds
      },
      newEvent: createEvent('command', 'SUPERVISOR', 'APPROVED: Compliance Strategy Execution'),
      queueUpdate: (q) => q.map(i => i.id === 'q3' ? { ...i, status: 'running', timestamp: 'Processing...' } : i)
    });

    // Async Sequence
    setTimeout(() => {
      if (stateRef.current.status === 'paused') return;

      updateStore({
        newEvent: createEvent('log', 'System Core', 'Compiling PDF packet with "Data Residency" addendum...'),
        queueUpdate: (q) => q.map(i => 
          i.id === 'q3' ? { ...i, status: 'completed', timestamp: 'Done' } : 
          i.id === 'q4' ? { ...i, status: 'running', timestamp: 'Sending...' } : i
        )
      });

      setTimeout(() => {
        if (stateRef.current.status === 'paused') return;

        updateStore({
          state: { phase: 'Closing', probability: Math.min(100, stateRef.current.probability + 5) },
          newEvent: createEvent('log', 'Email Client', 'Sent: "Security Compliance Overview" to Sarah Chen (CISO).'),
          queueUpdate: (q) => q.map(i => 
            i.id === 'q4' ? { ...i, status: 'completed', timestamp: 'Sent' } : i
          )
        });
      }, 1500);
    }, 1200);
  };

  const pauseForEditing = () => {
    if (stateRef.current.status === 'paused') return;
    updateStore({
      state: { status: 'paused', health: 'at_risk' },
      newEvent: createEvent('alert', 'System', 'Autonomous mode PAUSED by supervisor.')
    });
  };

  const resumeOperation = () => {
    if (stateRef.current.status === 'active') return;
    const isHealthy = !stateRef.current.blocker;
    updateStore({
      state: { status: 'active', health: isHealthy ? 'healthy' : 'at_risk' },
      newEvent: createEvent('log', 'System', 'Resuming autonomous operations.')
    });
  };

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    
    if (cleanCmd === '/approve') executeComplianceStrategy();
    else if (cleanCmd === '/override' || cleanCmd === '/pause') pauseForEditing();
    else if (cleanCmd === '/resume') resumeOperation();
    else if (cleanCmd.startsWith('/switch')) {
        const target = cleanCmd.includes('globex') ? 'deal-2' : 'deal-1';
        handleDealSwitch(target);
    } else {
      updateStore({
        newEvent: createEvent('command', 'SUPERVISOR', cmd)
      });
      setTimeout(() => {
        updateStore({
          newEvent: createEvent('log', 'System Core', `Command "${cmd}" not recognized.`)
        });
      }, 500);
    }
  };

  const filteredEvents = events.filter(e => {
    if (activeMode === 'live') return true;
    if (activeMode === 'strategy') return ['decision', 'alert', 'command'].includes(e.type);
    if (activeMode === 'intel') return ['analysis', 'log'].includes(e.type);
    return true;
  });

  return (
    <div className="flex h-full w-full flex-col bg-zinc-950 text-sm font-sans">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 z-50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setIsDealMenuOpen(!isDealMenuOpen)}
              className="flex items-center gap-2 rounded-md bg-zinc-900 px-2 py-1.5 hover:bg-zinc-800 transition-colors"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded bg-indigo-500/20 text-indigo-400">
                <Bot size={14} />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-bold leading-none text-zinc-400 uppercase tracking-wider">SalesOS {aiState.tier}</span>
                <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-zinc-100 leading-none">{aiState.dealName}</span>
                    <ChevronDown size={10} className="text-zinc-500" />
                </div>
              </div>
            </button>
            
            {/* Deal Switcher Dropdown */}
            {isDealMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 rounded-lg border border-zinc-800 bg-zinc-950 shadow-xl z-50 py-1">
                {Object.values(persistenceStore.states).map((d) => (
                  <button
                    key={d.dealId}
                    onClick={() => handleDealSwitch(d.dealId)}
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-xs hover:bg-zinc-900"
                  >
                    <span className={activeDealId === d.dealId ? 'text-indigo-400 font-medium' : 'text-zinc-400'}>
                      {d.dealName}
                    </span>
                    {activeDealId === d.dealId && <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-zinc-800" />
          
          <div className="flex items-center gap-2">
            <Radio size={12} className={`animate-pulse ${aiState.status === 'active' ? 'text-emerald-500' : 'text-amber-500'}`} />
            <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
              {aiState.status === 'active' ? 'Autonomous Mode' : 'Supervisor Control'}
            </span>
          </div>
        </div>

        <ModeSelector current={activeMode} onChange={setActiveMode} />

        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 ring-1 transition-colors ${
            aiState.health === 'healthy' ? 'bg-emerald-950/30 ring-emerald-800' : 'bg-rose-950/30 ring-rose-800'
          }`}>
            <Activity size={12} className={aiState.health === 'healthy' ? 'text-emerald-500' : 'text-rose-500'} />
            <span className="text-[10px] font-medium text-zinc-400">Health</span>
          </div>
          <div className="h-4 w-px bg-zinc-800" />
          <button className="text-zinc-500 hover:text-zinc-200"><Bell size={16} /></button>
          <button onClick={() => setShowPanel(!showPanel)} className="text-zinc-500 hover:text-zinc-200"><Settings size={16} /></button>
        </div>
      </header>

      <SystemStateBar state={aiState} />

      <div className="flex flex-1 overflow-hidden">
        <div className="relative flex flex-1 flex-col min-w-0">
          <div className="absolute right-6 top-6 z-10 pointer-events-none">
            <div className="pointer-events-auto">
              <ActionQueue queue={queue} />
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
            <div className="mx-auto max-w-4xl flex flex-col gap-1 pb-10">
               <div className="flex items-center gap-4 py-4 opacity-50">
                  <div className="h-px flex-1 bg-zinc-800"></div>
                  <span className="text-[10px] font-mono text-zinc-500">LOG START</span>
                  <div className="h-px flex-1 bg-zinc-800"></div>
               </div>
               {filteredEvents.map((event) => (
                 <SystemEvent key={event.id} event={event} onAction={handleAction} disabled={aiState.status === 'paused'} />
               ))}
            </div>
          </div>

          <div className="shrink-0 z-20 bg-zinc-950 border-t border-zinc-800">
            <CommandInput onExecute={handleCommand} />
          </div>
        </div>

        {showPanel && <IntelligencePanel state={aiState} onAction={handleAction} />}
      </div>
    </div>
  );
}