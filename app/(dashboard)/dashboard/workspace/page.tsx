"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Plus, 
  Bot, 
  Loader2,
  Eye 
} from "lucide-react";
import { DeployAgentModal } from "@/components/deploy-agent-modal";
import { Toast } from "@/components/ui/toast";
import { recordBotEvent } from "@/app/actions/bot-actions";
import { deployBotToDb } from "@/app/actions/bot-db-actions";

interface BotInstance {
  id: string;
  name: string;
  type: "Email" | "Leads" | "Content" | "Analysis";
  status: "Idle" | "Running" | "Paused" | "Failed" | "Deploying";
  lastRun: string;
  desc: string;
}

export default function WorkspacePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);

  const [bots, setBots] = useState<BotInstance[]>([
    { id: "1", name: "Sales Outreach Bot", type: "Email", status: "Running", lastRun: "2 mins ago", desc: "LinkedIn & Email lead gen (Cheerio Scraper Active)" },
    { id: "2", name: "SaaS Leads Engine", type: "Leads", status: "Idle", lastRun: "3 hours ago", desc: "Extracting high-intent prospects from social signals" },
    { id: "3", name: "Support Handler", type: "Analysis", status: "Paused", lastRun: "1 day ago", desc: "Technical query resolution and ticket routing" },
    { id: "4", name: "Resume Parser Pro", type: "Analysis", status: "Failed", lastRun: "5 hours ago", desc: "Bulk CV processing and skill extraction" }
  ]);

  const toggleAgentStatus = async (id: string, currentStatus: BotInstance["status"]) => {
    const botName = bots.find(b => b.id === id)?.name || "Agent";
    setLoadingStates(prev => ({ ...prev, [id]: true }));
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    const isTurningOn = currentStatus !== "Running";

    try {
      await recordBotEvent(
        isTurningOn ? "Agent Started" : "Agent Paused",
        botName,
        isTurningOn ? "success" : "info"
      );
    } catch (error) {
      console.error("Failed to persist log:", error);
    }
    
    setBots(prev => prev.map(bot => {
      if (bot.id === id) {
        setToast({
          message: isTurningOn ? `${botName} is now active.` : `${botName} has been paused.`,
          type: isTurningOn ? "success" : "info"
        });

        return { 
          ...bot, 
          status: isTurningOn ? "Running" : "Idle", 
          lastRun: isTurningOn ? "Just now" : bot.lastRun 
        };
      }
      return bot;
    }));
    
    setLoadingStates(prev => ({ ...prev, [id]: false }));
  };

  const handleDeploy = async (name: string, type: string) => {
    setToast({ message: "Initializing neural nodes...", type: "info" });

    const result = await deployBotToDb(
      name, 
      type, 
      `Autonomous ${type} agent initialized.`
    );

    if (result.success && result.bot) {
      const newBot: BotInstance = {
        id: result.bot.id,
        name: result.bot.name,
        type: result.bot.type as any,
        status: result.bot.status as any,
        lastRun: "Never",
        desc: result.bot.desc
      };

      setBots([newBot, ...bots]);
      setIsModalOpen(false);
      
      setToast({
        message: `${name} successfully deployed.`,
        type: "success"
      });

      await recordBotEvent("New Bot Deployment", name, "success");
    } else {
      setToast({ 
        message: "Deployment failed. Check connection.", 
        type: "error" 
      });
    }
  };

  const getStatusStyles = (status: BotInstance["status"]) => {
    switch (status) {
      case "Running": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Idle": return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
      case "Paused": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Failed": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Page Header - Standardized Hierarchy */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-10">
        <div>
          <h1 className="text-3xl font-semibold text-white">Workspace</h1>
          <p className="text-sm text-zinc-500 mt-2">Manage and deploy your autonomous AI workforce.</p>
        </div>
        {/* Normalized Administrative Button - Replaced indigo-600 with Neutral */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="h-10 px-4 rounded-lg bg-zinc-900 border border-white/[0.1] text-sm font-medium text-zinc-400 hover:bg-zinc-800 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Start New Project
        </button>
      </div>

      {/* Bot List - Flattened & Normalized */}
      <div className="grid grid-cols-1 gap-4">
        {bots.map((bot) => (
          /* Flattened Workspace Card - Single Pixel Border Only, No Shadow */
          <div key={bot.id} className="bg-[#0D1525] border border-white/[0.05] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between group transition-none shadow-none">
            <div className="flex items-center gap-6">
              {/* Normalized Icon Container - Removed hover indigo */}
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/[0.05] flex items-center justify-center text-zinc-500 transition-none">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{bot.name}</h3>
                <p className="text-sm text-zinc-500 mt-1">{bot.desc}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-6 md:mt-0">
              {/* Status Pill - Matching Character Restraint */}
              <div className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${getStatusStyles(bot.status)}`}>
                {bot.status}
              </div>

              <div className="flex items-center gap-3">
                {/* Normalized Administrative Action Button - Removed white background */}
                <button 
                  onClick={() => toggleAgentStatus(bot.id, bot.status)}
                  disabled={loadingStates[bot.id]}
                  className="h-10 px-4 rounded-lg bg-zinc-900 border border-white/[0.1] text-sm font-medium text-zinc-400 hover:bg-zinc-800 transition-colors min-w-[80px] flex items-center justify-center gap-2"
                >
                  {loadingStates[bot.id] ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : bot.status === "Running" ? (
                    <>Stop</>
                  ) : (
                    <>Start</>
                  )}
                </button>

                {/* Normalized Icon Action - Single border */}
                <Link 
                  href={`/dashboard/workspace/${bot.id}`}
                  className="h-10 px-3 flex items-center justify-center bg-zinc-900 border border-white/[0.1] text-zinc-500 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DeployAgentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDeploy={handleDeploy}
      />

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}