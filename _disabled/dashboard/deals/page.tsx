"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { 
  LayoutGrid, 
  Plus, 
  MoreHorizontal, 
  AlertCircle, 
  TrendingUp, 
  Calendar,
  Loader2,
  Mail,
  Lock
} from "lucide-react";
import { Deal, DealStage, PIPELINE_STAGES } from "@/types/pipeline";
import { generateMockDeals } from "@/lib/mock-pipeline";
import { calculateDealIntelligence } from "@/lib/pipeline-intelligence";
import { UpgradeModal } from "@/components/UpgradeModal";

// --- Plan Configuration (Local Mock) ---
// In a real app, this comes from your Auth context
const CURRENT_PLAN = "free"; 
const MAX_FREE_DEALS = 3; // ✅ CORRECTED: Business rule enforced (was 5)

// --- Components ---

const DealCard = ({ 
  deal, 
  onDragStart,
  onDraftEmail 
}: { 
  deal: Deal; 
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDraftEmail: (deal: Deal) => void;
}) => {
  const weightedValue = Math.round(deal.value * ((deal.winProbability || 0) / 100));

  return (
    <div 
      draggable 
      onDragStart={(e) => onDragStart(e, deal.id)}
      className={`group relative p-4 rounded-xl border border-slate-700/50 bg-[#1E293B] hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10 cursor-grab active:cursor-grabbing ${deal.isStalled ? 'border-l-2 border-l-red-500' : ''}`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-sm font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{deal.companyName}</h4>
          <span className="text-[10px] text-slate-500">{deal.contactName}</span>
        </div>
        
        {/* Quick Actions (Hover Only) */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <button 
            onClick={() => onDraftEmail(deal)}
            className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white" 
            title="Draft Outreach"
          >
            <Mail className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white">
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Value & Score */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
           <span className="text-sm font-medium text-slate-300">
             ${deal.value.toLocaleString()}
           </span>
           <span className="text-[9px] text-slate-500">
             ~${weightedValue.toLocaleString()} forecast
           </span>
        </div>
        
        {deal.stage !== 'closed' && (
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold border ${
            deal.winProbability! > 70 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
            deal.winProbability! > 40 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
            'bg-red-500/10 text-red-400 border-red-500/20'
          }`}>
            <TrendingUp className="w-3 h-3" />
            {deal.winProbability}% Win
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-700/50 flex items-center gap-2">
        {deal.isStalled ? (
          <>
            <AlertCircle className="w-3 h-3 text-red-400 shrink-0" />
            <span className="text-[10px] text-red-400 font-medium truncate">Stalled: {deal.nextStepSuggestion}</span>
          </>
        ) : (
          <>
            <Calendar className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="text-[10px] text-slate-500 truncate">Next: {deal.nextStepSuggestion}</span>
          </>
        )}
      </div>
    </div>
  );
};

// --- Main Page ---

export default function PipelinePage() {
  const router = useRouter();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedDealId, setDraggedDealId] = useState<string | null>(null);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  // Load Mock Data
  useEffect(() => {
    const timer = setTimeout(() => {
      // Generate only 2 deals initially so user hits the limit of 3 quickly
      const data = generateMockDeals(2); 
      setDeals(data);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const getDealsByStage = (stage: DealStage) => deals.filter(d => d.stage === stage);

  const calculateStageValue = (stage: DealStage) => {
    return deals
      .filter(d => d.stage === stage)
      .reduce((sum, d) => sum + d.value, 0)
      .toLocaleString();
  };

  // --- Actions ---

  const handleAddDeal = () => {
    // 1. Check Limits
    if (CURRENT_PLAN === 'free' && deals.length >= MAX_FREE_DEALS) {
      setIsUpgradeOpen(true);
      return;
    }

    // 2. Add Mock Deal
    const newDeal: Deal = calculateDealIntelligence({
      id: `deal-new-${Date.now()}`,
      companyName: "New Prospect Inc.",
      contactName: "Alex Founder",
      contactEmail: "alex@newprospect.com",
      value: 15000,
      stage: 'lead',
      createdAt: new Date(),
      lastActivity: new Date(),
      source: "manual"
    });

    setDeals(prev => [newDeal, ...prev]);
  };

  const handleDraftEmail = (deal: Deal) => {
    // Pass data via URL params to the Email Assistant
    const params = new URLSearchParams({
      recipient: deal.contactName,
      intent: `Follow up regarding ${deal.companyName} deal`,
      points: `Current deal stage: ${deal.stage}\nValue: $${deal.value}\nNext step: ${deal.nextStepSuggestion}`
    });
    router.push(`/dashboard/email-assistant?${params.toString()}`);
  };

  // --- Drag & Drop ---

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedDealId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, newStage: DealStage) => {
    e.preventDefault();
    if (!draggedDealId) return;

    setDeals(prev => prev.map(deal => {
      if (deal.id === draggedDealId) {
        const updatedDeal = { 
          ...deal, 
          stage: newStage,
          lastActivity: new Date(),
        };
        return calculateDealIntelligence(updatedDeal);
      }
      return deal;
    }));
    setDraggedDealId(null);
  };

  if (loading) {
    return (
      <div className="h-full w-full bg-[#0B1120] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          <p className="text-xs text-slate-500 font-medium">Loading Revenue Engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#0B1120] text-slate-200 font-sans flex flex-col overflow-hidden">
      
      <UpgradeModal isOpen={isUpgradeOpen} onClose={() => setIsUpgradeOpen(false)} />

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-zinc-800 bg-[#0B1120] shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-xl bg-[#1E293B] border border-slate-700/50 shadow-lg shadow-indigo-900/10">
            <LayoutGrid className="w-5 h-5 text-indigo-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Pipeline Manager
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-bold tracking-wide uppercase border border-indigo-500/20">
                Revenue Engine
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">AI-powered deal tracking & forecasting</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           {CURRENT_PLAN === 'free' && (
             <span className="text-[10px] text-slate-500">
               {deals.length} / {MAX_FREE_DEALS} Active Deals
             </span>
           )}
           <button 
             onClick={handleAddDeal}
             className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
           >
             {CURRENT_PLAN === 'free' && deals.length >= MAX_FREE_DEALS ? <Lock className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
             Add Deal
           </button>
        </div>
      </header>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-6 h-full min-w-[1000px]">
          
          {(Object.keys(PIPELINE_STAGES) as DealStage[]).map((stage) => (
            <div 
              key={stage} 
              className={`flex-1 flex flex-col min-w-[280px] rounded-xl transition-colors ${draggedDealId ? 'bg-indigo-500/5 border-indigo-500/10 border-dashed border-2' : ''}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage)}
            >
              
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 px-1 pt-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${PIPELINE_STAGES[stage].color}`} />
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wide">
                    {PIPELINE_STAGES[stage].label}
                  </h3>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 text-[10px] font-bold">
                    {getDealsByStage(stage).length}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-slate-400">
                    ${calculateStageValue(stage)}
                  </span>
                </div>
              </div>

              {/* Column Content */}
              <div className="flex-1 rounded-xl space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 pb-10">
                {getDealsByStage(stage).map(deal => (
                  <DealCard 
                    key={deal.id} 
                    deal={deal} 
                    onDragStart={handleDragStart}
                    onDraftEmail={handleDraftEmail}
                  />
                ))}
                
                {getDealsByStage(stage).length === 0 && (
                  <div className="h-24 flex items-center justify-center border-2 border-dashed border-slate-800 rounded-lg mx-2">
                    <span className="text-xs text-slate-600">Drop here</span>
                  </div>
                )}
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}