"use client";

import { useState } from "react";
// ✅ Absolute pathing to prevent module resolution errors in Next.js 15/16
import { saveAgentPersona } from "@/app/actions/persona-actions";
import { Save, ShieldAlert, Cpu, Sparkles, CheckCircle2 } from "lucide-react";

/**
 * 🧠 PERSONA EDITOR (CLIENT COMPONENT)
 * Handles the configuration of the Agent's System Prompt and Risk Threshold.
 * Integrated with the Phase 6A Persona Schema.
 */
export function PersonaEditor({ botId, initialData }: { botId: string, initialData: any }) {
  const [config, setConfig] = useState({
    systemPrompt: initialData?.systemPrompt || "",
    riskLevel: initialData?.riskLevel || "LOW",
    capabilities: initialData?.capabilities || []
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    setSavedSuccess(false);
    
    try {
      const result = await saveAgentPersona(botId, config);
      if (result.success) {
        setSavedSuccess(true);
        // Feedback loop: Reset success icon after 3 seconds
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (error) {
      console.error("PERSONA_COMMIT_FAILED:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[#0D1525] border border-white/[0.05] rounded-[2.5rem] p-10 space-y-8 shadow-2xl transition-all border-l-indigo-500/20">
      
      {/* HEADER & ACTION BAR */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 rounded-2xl">
            <Sparkles className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight lowercase">Agent Persona</h2>
            <p className="text-zinc-500 text-sm">Define the cognitive directives of this node.</p>
          </div>
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 ${
            savedSuccess 
              ? 'bg-emerald-500 text-white' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]'
          }`}
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Syncing...
            </span>
          ) : savedSuccess ? (
            <><CheckCircle2 className="w-4 h-4" /> Config Synced</>
          ) : (
            <><Save className="w-4 h-4" /> Commit Changes</>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* KERNEL INSTRUCTIONS (SYSTEM PROMPT) */}
        <div className="lg:col-span-2 space-y-4">
          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <Cpu className="w-3 h-3 text-indigo-400" /> Kernel Instructions (System Prompt)
          </label>
          <div className="relative group">
            {/* Ambient glow effect on focus */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <textarea 
              value={config.systemPrompt}
              onChange={(e) => setConfig({...config, systemPrompt: e.target.value})}
              className="relative w-full h-64 bg-black/40 border border-white/10 rounded-2xl p-6 text-zinc-300 font-mono text-sm focus:border-indigo-500/50 outline-none transition-all placeholder:text-zinc-700 leading-relaxed"
              placeholder="Example: You are a specialized research agent. Your objective is to parse complex datasets..."
            />
          </div>
        </div>

        {/* RISK & AUTONOMY CONTROLS */}
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <ShieldAlert className="w-3 h-3 text-amber-500" /> Autonomy Risk Threshold
            </label>
            <div className="flex flex-col gap-2">
              {["LOW", "MEDIUM", "HIGH"].map((level) => (
                <button
                  key={level}
                  onClick={() => setConfig({...config, riskLevel: level})}
                  className={`w-full py-4 px-6 rounded-2xl border text-[10px] font-black tracking-widest transition-all text-left flex justify-between items-center group ${
                    config.riskLevel === level 
                    ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
                    : 'bg-white/[0.02] border-white/5 text-zinc-500 hover:border-white/10'
                  }`}
                >
                  {level}
                  <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                    config.riskLevel === level 
                      ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)] animate-pulse' 
                      : 'bg-zinc-800'
                  }`} />
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-white/[0.01] border border-white/5 rounded-[2rem] border-dashed">
            <p className="text-[9px] text-zinc-600 leading-relaxed italic uppercase tracking-tighter">
              * Note: High risk threshold allows the agent to bypass minor safety gate checks for faster autonomous loop execution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}