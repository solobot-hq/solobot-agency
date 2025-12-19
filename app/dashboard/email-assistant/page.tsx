"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Sparkles,
  Loader2,
  Copy,
  Check,
  PenTool,
  RotateCcw,
  History,
  ChevronDown,
  Wand2,
  Briefcase,
  Coffee,
  Zap,
  Heart,
  Feather,
  Sliders,
  X,
  Trash2,
  ThumbsUp,
  ShieldCheck,
  Minimize2,
  Maximize2,
  Lock 
} from "lucide-react";
import { PLAN_LIMITS, HARD_CAPS, Plan } from "@/lib/plans";
import { UpgradeModal } from "@/components/UpgradeModal";

// --- Types ---

interface EmailState {
  recipient: string;
  subject: string;
  keyPoints: string;
  tone: string;
  style: string;
  length: string;
  options: {
    includeCTA: boolean;
    addUrgency: boolean;
    humanize: boolean;
    formal: boolean;
    simplify: boolean;
    addWarmth: boolean;
  };
}

interface DraftVersion {
  id: string;
  content: string;
  timestamp: Date;
  label: string;
  confidence: number;
  type: 'Original' | 'Rewrite';
}

interface SelectOption {
  label: string;
  value: string;
  icon: string;
  description: string;
}

// --- Configuration Constants ---

const TONES = [
  { id: "Professional", icon: Briefcase, color: "text-[#00C26D]", bg: "bg-[#00C26D]/10", border: "border-[#00C26D]/20", label: "Reliable" },
  { id: "Casual", icon: Coffee, color: "text-[#00C26D]", bg: "bg-[#00C26D]/10", border: "border-[#00C26D]/20", label: "Relaxed" },
  { id: "Urgent", icon: Zap, color: "text-[#00C26D]", bg: "bg-[#00C26D]/10", border: "border-[#00C26D]/20", label: "Fast Action" },
  { id: "Empathetic", icon: Heart, color: "text-[#00C26D]", bg: "bg-[#00C26D]/10", border: "border-[#00C26D]/20", label: "Understanding" },
];

const VOICE_OPTIONS: SelectOption[] = [
  { label: "Direct", value: "Direct", icon: "⚡", description: "Clear, zero fluff" },
  { label: "Balanced", value: "Balanced", icon: "⚖️", description: "Neutral & safe" },
  { label: "Friendly", value: "Friendly", icon: "😊", description: "Warm approach" },
  { label: "Bold", value: "Bold", icon: "🔥", description: "Confident authority" },
  { label: "Soft", value: "Soft", icon: "🌙", description: "Low pressure" },
  { label: "Executive", value: "Executive", icon: "🧊", description: "C-Level brevity" }
];

const LENGTH_OPTIONS: SelectOption[] = [
  { label: "Very Short", value: "Very Short", icon: "✂️", description: "Tweet length" },
  { label: "Short", value: "Short", icon: "🪶", description: "Quick read" },
  { label: "Medium", value: "Medium", icon: "📄", description: "Standard draft" },
  { label: "Long", value: "Long", icon: "📜", description: "Detailed logic" },
  { label: "Expanded", value: "Expanded", icon: "🚀", description: "Full context" }
];

// --- EXECUTIVE INTELLIGENCE ENGINE ---

const getDeterministic = <T,>(arr: T[], seed: string): T => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  return arr[Math.abs(hash) % arr.length];
};

const formatUserPoints = (text: string): string[] => {
  if (!text) return ["the items we discussed"];
  if (text.includes('\n')) {
    return text.split('\n').filter(line => line.trim().length > 0).map(l => l.replace(/^[•\-\*]\s*/, '').trim());
  }
  if (text.includes(',') && text.length > 50) {
    return text.split(',').filter(line => line.trim().length > 0).map(l => l.trim());
  }
  return [text.trim()];
};

// Executive Bullet Enhancer
const enhanceBullet = (line: string): string => {
  const l = line.toLowerCase();
  
  if (l.includes("risk") || l.includes("issue") || l.includes("blocker") || l.includes("mitigation")) 
    return `${line} to mitigate downstream impact`;

  if (l.includes("budget") || l.includes("cost") || l.includes("price") || l.includes("finance") || l.includes("spend")) 
    return `${line} to ensure fiscal alignment`;

  if (l.includes("timeline") || l.includes("schedule") || l.includes("date") || l.includes("deadline") || l.includes("roadmap")) 
    return `${line} to manage delivery expectations`;
  
  if (l.includes("milestone") || l.includes("goal") || l.includes("target")) 
    return `${line} to lock scope and sequencing`;

  if (l.includes("update") || l.includes("status") || l.includes("progress")) 
    return `${line} to maintain stakeholder visibility`;

  if (l.includes("review") || l.includes("approve") || l.includes("sign")) 
    return `${line} to unblock critical dependencies`;

  return line;
};

const applyTextTransforms = (text: string, options: { formal?: boolean; simplify?: boolean; humanize?: boolean; urgency?: boolean }, tone: string) => {
  let processed = text;

  const bannedPhrases = [
    "Reflecting on", "Simply put", "Ideally,", "Here is a simple summary", 
    "I hope this finds you well", "Trust you are doing well", "correspondence",
    "regarding the points", "items we discussed", "I wanted to provide",
    "I have outlined", "Below are", "The following items"
  ];
  
  bannedPhrases.forEach(phrase => {
    const regex = new RegExp(phrase + ",?", "gi");
    processed = processed.replace(regex, "");
  });

  if (options.formal) {
    const formalMap: Record<string, string> = {
      "I'm": "I am", "can't": "cannot", "won't": "will not", "let's": "let us",
      "checking in": "writing", "thanks": "thank you", "need": "require",
      "talk": "discuss", "get": "receive", "quick": "brief", "just": ""
    };
    Object.keys(formalMap).forEach(key => {
      const regex = new RegExp(`\\b${key}\\b`, 'gi');
      processed = processed.replace(regex, formalMap[key]);
    });
  }

  if (options.humanize && !options.formal && tone !== "Professional") {
    if (processed.startsWith("I am")) processed = processed.replace("I am", "I'm");
  }

  return processed.replace(/\s\./g, ".").replace(/\.\./g, ".").trim();
};

const generateSmartSubject = (baseSubject: string, mode: string, urgency: boolean, seed: string): string => {
  const cleanBase = (baseSubject || "Update").replace(/^[:\-\s]+/, "");
  
  const strategies = {
    Original: [`Re: ${cleanBase}`, `${cleanBase} - Next steps`, `Discussion: ${cleanBase}`],
    Shorten: [`${cleanBase}`, `Quick q: ${cleanBase}`, `Re: ${cleanBase}`],
    Expand: [`Context: ${cleanBase}`, `Overview: ${cleanBase}`, `Strategy: ${cleanBase}`],
    Formal: [`Inquiry: ${cleanBase}`, `Update: ${cleanBase}`, `Regarding ${cleanBase}`],
    Punchy: [`${cleanBase}?`, `Next steps: ${cleanBase}`, `Idea for ${cleanBase}`]
  };

  const pool = strategies[mode as keyof typeof strategies] || strategies.Original;
  let selected = getDeterministic(pool, seed);

  if (urgency) {
    const urgentPrefixes = ["Urgent: ", "Time Sensitive: ", "Action Required: "];
    selected = `${getDeterministic(urgentPrefixes, seed)}${selected}`;
  }

  return `Subject: ${selected}`;
};

const generateOpener = (recipient: string, tone: string, warmth: boolean, humanize: boolean, mode: string, hasList: boolean, seed: string): string => {
  const name = recipient ? recipient.split(" ")[0] : "there";
  
  if (mode === "Expand" && tone === "Professional" && hasList) {
    const executiveOpeners = [
      `To ensure execution clarity and alignment on our strategic objectives:`,
      `To keep delivery tracks moving and ensure stakeholder alignment:`,
      `In order to maintain momentum and lock in our next milestones:`
    ];
    return `${name},\n\n${getDeterministic(executiveOpeners, seed)}`;
  }

  if (mode === "Formal") return `${name},`;
  if (mode === "Shorten" || mode === "Punchy") return `${name},`;

  const salutations: Record<string, string[]> = {
    Professional: [`Dear ${name},`, `Hi ${name},`, `Hello ${name},`],
    Casual: [`Hey ${name},`, `${name} —`, `Hi ${name},`],
    Urgent: [`${name},`, `Hi ${name},`],
    Empathetic: [`Hi ${name},`, `Dear ${name},`]
  };

  let opener = getDeterministic(salutations[tone] || salutations.Professional, seed);

  const bridges = [
    "Hope you're having a productive week.",
    "Great connecting with you recently.",
    "I wanted to circle back on our last conversation."
  ];

  if ((warmth || humanize) && tone !== "Formal") {
    opener += `\n\n${getDeterministic(bridges, seed)}`;
  }

  return opener;
};

const generateBodyContent = (points: string, mode: string, options: EmailState['options'], tone: string): string => {
  const listItems = formatUserPoints(points);
  const isList = listItems.length > 1;
  const seed = points + mode + tone;
  
  let content = "";

  if (isList) {
    const shouldEnhance = (mode === "Expand" || (mode === "Original" && tone === "Professional"));
    const processedItems = shouldEnhance ? listItems.map(enhanceBullet) : listItems;
    const bulletString = processedItems.map(i => `• ${i}`).join('\n');
    
    switch (mode) {
        case "Shorten":
            content = `Quick check-in on these items:\n\n${bulletString}`;
            break;
        case "Expand":
            if (tone === "Professional") {
                 const decisiveClosings = [
                   "Alignment on these items allows us to proceed decisively.",
                   "Clarity here prevents downstream rework.",
                   "This baseline enables execution without delay."
                 ];
                 content = `${bulletString}\n\n${getDeterministic(decisiveClosings, seed)}`;
            } else {
                 content = `I wanted to provide some additional context on the following points:\n\n${bulletString}\n\nClarity on these items is essential for our next steps.`;
            }
            break;
        case "Formal":
            content = `Please review the following items at your earliest convenience:\n\n${bulletString}`;
            break;
        case "Punchy":
            content = `Updates:\n\n${listItems.map(i => `> ${i}`).join('\n')}\n\nReady to move?`;
            break;
        default:
            content = `I wanted to touch base regarding:\n\n${bulletString}`;
            break;
    }
  } else {
    const rawPoints = points || "our previous discussion";
    switch (mode) {
        case "Shorten":
            content = `Checking in on ${rawPoints}.`;
            break;
        case "Expand":
            content = `I'm writing to provide an update regarding ${rawPoints}. I believe this is a key opportunity for us to align.`;
            break;
        case "Formal":
            content = `I am writing to formally discuss ${rawPoints}.`;
            break;
        case "Punchy":
            content = `Quick update on ${rawPoints}.`;
            break;
        default:
            content = `Regarding ${rawPoints}, I wanted to ensure this is on your radar.`;
            break;
    }
  }

  return applyTextTransforms(content, options, tone);
};

const generateClosing = (mode: string, tone: string, options: EmailState['options'], seed: string): string => {
  let ctaSentence = "";
  if (options.includeCTA) {
    const ctas = {
      Low: ["Let me know your thoughts.", "Thoughts?", "Open to your feedback."],
      Medium: ["When are you free for a sync?", "Can we schedule 10 mins?", "Does Tuesday work?"],
      High: ["Please confirm by EOD.", "I need a decision on this.", "Let's lock this in."]
    };
    let intensity: "Low" | "Medium" | "High" = "Medium";
    if (options.addUrgency || mode === "Punchy") intensity = "High";
    if (tone === "Empathetic" || options.addWarmth) intensity = "Low";
    ctaSentence = getDeterministic(ctas[intensity], seed);
  }

  const signOffs: Record<string, string[]> = {
    Professional: ["Best regards,", "Sincerely,", "Regards,"],
    Casual: ["Best,", "Cheers,", "Talk soon,"],
    Urgent: ["Thanks,", "Best,", "-"],
    Empathetic: ["Warmly,", "Kind regards,", "With appreciation,"]
  };

  let effectiveTone = tone;
  if (mode === "Formal") effectiveTone = "Professional";
  if (mode === "Punchy") effectiveTone = "Casual";

  const signOff = getDeterministic(signOffs[effectiveTone] || signOffs.Professional, seed);
  const spacing = (mode === "Shorten" || mode === "Punchy") ? "\n\n" : "\n\n";
  
  return ctaSentence 
    ? `${spacing}${ctaSentence}\n\n${signOff}\n[Your Name]` 
    : `${spacing}${signOff}\n[Your Name]`;
};

const generateSmartEmail = (data: EmailState, mode: string = 'Original', plan: Plan): string => {
  const seed = data.keyPoints + mode + data.tone;
  const listCheck = formatUserPoints(data.keyPoints).length > 1;

  const subject = generateSmartSubject(data.subject, mode, data.options.addUrgency, seed);
  const opener = generateOpener(data.recipient, data.tone, data.options.addWarmth, data.options.humanize, mode, listCheck, seed);
  const body = generateBodyContent(data.keyPoints, mode, data.options, data.tone);
  const closing = generateClosing(mode, data.tone, data.options, seed);

  let fullEmail = `${subject}\n\n${opener}${(mode === "Shorten" || mode === "Punchy") ? "\n\n" : "\n\n"}${body}${closing}`;

  if (PLAN_LIMITS[plan].watermark) {
    fullEmail += `\n\n—\nGenerated with SoloBot Email Assistant`;
  }

  return fullEmail;
};

// --- Utilities ---

function extractSubjectAndBody(content: string) {
  const subjectMatch = content.match(/Subject: (.*?)(\n|$)/);
  const subject = subjectMatch ? subjectMatch[1].trim() : "";
  const body = content.replace(/Subject: .*?(\n|$)/, "").trim();
  return { subject, body };
}

// --- Main Component ---

export default function EmailAssistantPage() {
  // --- PLAN SETTING (DEVELOPER MODE) ---
  // Change this to 'free' to test limits, 'pro_max' to develop without limits.
  const [userPlan] = useState<Plan>('pro_max'); 
  
  const [dailyUsage, setDailyUsage] = useState(0);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  const [formData, setFormData] = useState<EmailState>({
    recipient: "",
    subject: "",
    keyPoints: "",
    tone: "Professional",
    style: "Direct",
    length: "Medium",
    options: {
      includeCTA: false,
      addUrgency: false,
      humanize: true,
      formal: false,
      simplify: false,
      addWarmth: false,
    },
  });

  const [versions, setVersions] = useState<DraftVersion[]>([]);
  const [activeVersionIdx, setActiveVersionIdx] = useState<number>(-1);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const [historyList, setHistoryList] = useState<DraftVersion[]>([]);
  const [isRefinementsOpen, setIsRefinementsOpen] = useState(false);
  const [activeRewriteTool, setActiveRewriteTool] = useState<string | null>(null);

  const handleInputChange = (field: keyof EmailState, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionToggle = (key: keyof typeof formData.options) => {
    setFormData((prev) => ({
      ...prev,
      options: { ...prev.options, [key]: !prev.options[key] },
    }));
  };

  const guardUsage = () => {
    const effectiveLimit = Math.min(
      PLAN_LIMITS[userPlan].draftsPerDay,
      HARD_CAPS[userPlan].draftsPerDay
    );
    if (dailyUsage >= effectiveLimit) {
      setIsUpgradeOpen(true);
      return false;
    }
    return true;
  };

  const handleGenerate = () => {
    if (!guardUsage()) return;

    setActiveRewriteTool(null);
    setCopied(false);
    
    const variationSeed = crypto.randomUUID();
    const content = generateSmartEmail(formData, 'Original', userPlan);
    
    const newVersion: DraftVersion = {
      id: variationSeed,
      content: content,
      timestamp: new Date(),
      label: `Draft ${versions.length + 1}`,
      confidence: 94,
      type: 'Original'
    };
    
    const updatedVersions = [...versions, newVersion];
    setVersions(updatedVersions);
    setActiveVersionIdx(updatedVersions.length - 1);
    setHistoryList(prev => [newVersion, ...prev]);
    
    setDailyUsage(prev => prev + 1);
  };

  const handleRewrite = (label: string) => {
    if (activeVersionIdx === -1) return;
    if (!PLAN_LIMITS[userPlan].rewriteModes) {
      setIsUpgradeOpen(true);
      return;
    }
    if (!guardUsage()) return;

    setCopied(false);
    setActiveRewriteTool(label);

    const variationSeed = crypto.randomUUID();
    const cleanRewrite = generateSmartEmail(formData, label, userPlan);

    const newVersion: DraftVersion = {
      id: variationSeed,
      content: cleanRewrite,
      timestamp: new Date(),
      label: label,
      confidence: 98,
      type: 'Rewrite'
    };
    
    const updatedVersions = [...versions, newVersion];
    setVersions(updatedVersions);
    setActiveVersionIdx(updatedVersions.length - 1);
    setHistoryList(prev => [newVersion, ...prev]);

    setDailyUsage(prev => prev + 1);
  };

  const handleHistorySelect = (item: DraftVersion) => {
    if (!PLAN_LIMITS[userPlan].versions && item.type !== 'Original') {
       setIsUpgradeOpen(true);
       return; 
    }
    const existingIndex = versions.findIndex(v => v.id === item.id);
    if (existingIndex !== -1) {
      setActiveVersionIdx(existingIndex);
    }
  };

  const copyText = async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
      } catch (e) {
        console.error("Legacy copy failed", e);
      }
      document.body.removeChild(textArea);
    }
  };

  const clearAll = () => {
    setVersions([]);
    setActiveVersionIdx(-1);
    setActiveRewriteTool(null);
    setCopied(false);
    setFormData({ ...formData, keyPoints: "", subject: "", recipient: "" });
  };

  const renderEmailPreview = (fullContent: string) => {
    const { subject, body } = extractSubjectAndBody(fullContent);
    const paragraphs = body.split(/\n\n+/);

    return (
      <div className="flex flex-col h-full bg-[#0F172A] rounded-lg overflow-hidden border border-slate-700/50 shadow-sm">
        {subject && (
          <div className="px-8 py-5 border-b border-slate-700/50 bg-slate-800/20 flex justify-between items-center">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mb-1">Subject Line</span>
              <h2 className="text-[15px] font-medium text-slate-100">{subject}</h2>
            </div>
            <button 
              onClick={() => copyText(subject)}
              className="text-[10px] font-bold text-slate-500 hover:text-[#00C26D] uppercase tracking-wider transition-colors"
            >
              Copy
            </button>
          </div>
        )}
        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-6 text-[15px] leading-7 text-slate-300 font-light">
            {paragraphs.map((p, i) => {
              const isOpening = i === 0;
              const isCTA = (i === paragraphs.length - 1 && paragraphs.length > 1) || p.includes("Best regards") || p.includes("Sincerely") || p.includes("Cheers");
              const isWatermark = p.includes("Generated with SoloBot");

              if (isWatermark) {
                 return <p key={i} className="text-[10px] text-slate-600 italic mt-8 border-t border-slate-800 pt-4">{p}</p>;
              }
              if (isOpening) {
                return <p key={i} className="text-slate-100 font-medium">{p}</p>;
              }
              if (isCTA) {
                return (
                  <div key={i} className="pl-4 border-l-2 border-[#00C26D]/40">
                    <p className="text-[#00C26D] font-medium whitespace-pre-wrap">{p}</p>
                  </div>
                );
              }
              return <p key={i}>{p}</p>;
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full bg-[#0B1120] text-slate-200 font-sans selection:bg-[#00C26D]/30 selection:text-white overflow-hidden flex flex-col">
      <UpgradeModal isOpen={isUpgradeOpen} onClose={() => setIsUpgradeOpen(false)} />

      <header className="flex justify-between items-center px-6 py-4 border-b border-zinc-800 bg-[#0B1120] shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-xl bg-[#1E293B] border border-slate-700/50 shadow-lg shadow-green-900/10">
            <Bot className="w-5 h-5 text-[#00C26D]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Email Assistant
              <span className="px-2 py-0.5 rounded-full bg-[#00C26D]/10 text-[#00C26D] text-[10px] font-bold tracking-wide uppercase border border-[#00C26D]/20">Premium</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">Professional communication engine</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           {/* Plan Badge */}
           <div className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${userPlan === 'free' ? 'bg-slate-800 border-slate-600 text-slate-400' : 'bg-[#00C26D]/10 border-[#00C26D] text-[#00C26D]'}`}>
              {userPlan === 'free' ? 'Free Plan' : userPlan.replace('_', ' ')}
           </div>

           <button 
            onClick={() => {
                if (!PLAN_LIMITS[userPlan].versions) setIsUpgradeOpen(true);
                else setShowHistory(!showHistory);
            }}
            className={`p-2.5 rounded-lg border transition-all duration-300 ${
              showHistory 
                ? 'bg-[#00C26D]/10 border-[#00C26D] text-[#00C26D]' 
                : 'bg-[#1E293B] border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {(!PLAN_LIMITS[userPlan].versions) ? <Lock className="w-4 h-4" /> : <History className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden p-6 gap-6">
        <div className="w-[380px] shrink-0 flex flex-col gap-4 overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700">
                
                <div className="bg-[#1E293B] border border-slate-700/50 rounded-xl p-5 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-[#00C26D]" />
                    <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wide">Context Engine</span>
                  </div>
                  <div className="space-y-4">
                    <Input 
                      label="Recipient" 
                      placeholder="e.g. Elon Musk" 
                      helperText="Target audience"
                      value={formData.recipient} 
                      onChange={(v: string) => handleInputChange("recipient", v)} 
                    />
                    <Input 
                      label="Subject Intent" 
                      placeholder="e.g. Partnership Proposal" 
                      helperText="Core topic"
                      value={formData.subject} 
                      onChange={(v: string) => handleInputChange("subject", v)} 
                    />
                    <div>
                      <div className="flex justify-between items-baseline mb-1.5 ml-1">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key Points</label>
                        <span className="text-[10px] text-slate-500">Inputs guide generation</span>
                      </div>
                      <textarea
                        value={formData.keyPoints}
                        onChange={(e) => handleInputChange("keyPoints", e.target.value)}
                        className="w-full bg-[#0F172A] border border-slate-700 rounded-lg p-3 text-[13px] text-slate-200 h-32 resize-none focus:border-[#00C26D]/50 focus:ring-1 focus:ring-[#00C26D]/50 outline-none placeholder-slate-600 transition-all leading-relaxed"
                        placeholder="- Met at the conference&#10;- Discussed Q4 roadmap&#10;- Want to schedule a demo"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#1E293B] border border-slate-700/50 rounded-xl p-5 shadow-lg">
                   <div className="flex items-center gap-2 mb-4">
                    <Feather className="w-3.5 h-3.5 text-[#00C26D]" />
                    <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wide">Personality & Tone</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {TONES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleInputChange("tone", t.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                          formData.tone === t.id
                            ? `bg-[#00C26D]/10 border-[#00C26D]`
                            : "bg-transparent border-slate-700 hover:bg-slate-700/50 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <t.icon className={`w-4 h-4 mb-1 ${formData.tone === t.id ? 'text-[#00C26D]' : 'text-slate-400'}`} />
                        <span className={`text-[11px] font-medium ${formData.tone === t.id ? 'text-white' : 'text-slate-400'}`}>{t.id}</span>
                        <span className="text-[9px] text-slate-500">{t.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <Select label="Voice" value={formData.style} options={VOICE_OPTIONS} onChange={(v: string) => handleInputChange("style", v)} />
                    <Select label="Length" value={formData.length} options={LENGTH_OPTIONS} onChange={(v: string) => handleInputChange("length", v)} />
                  </div>
                </div>

                <div className="bg-[#1E293B] border border-slate-700/50 rounded-xl p-4 shadow-lg">
                   <div onClick={() => setIsRefinementsOpen(!isRefinementsOpen)} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5 text-[#00C26D]" />
                        <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wide">Advanced Tuning</span>
                      </div>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isRefinementsOpen ? 'rotate-180' : ''}`} />
                   </div>
                   <AnimatePresence>
                     {isRefinementsOpen && (
                       <motion.div
                         initial={{ height: 0, opacity: 0, marginTop: 0 }}
                         animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                         exit={{ height: 0, opacity: 0, marginTop: 0 }}
                         className="overflow-hidden grid grid-cols-1 gap-2"
                       >
                          {Object.entries(formData.options).map(([key, val]) => (
                            <Toggle key={key} label={key.replace(/([A-Z])/g, ' $1').trim()} checked={val} onChange={() => handleOptionToggle(key as keyof typeof formData.options)} />
                          ))}
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleGenerate}
                disabled={!formData.keyPoints}
                className="w-full rounded-xl bg-[#00C26D] p-4 text-white font-bold shadow-lg shadow-green-500/20 transition-all hover:bg-[#009e59] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 relative overflow-hidden group"
              >
                <div className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm tracking-wide">{versions.length > 0 ? "Generate Alternative" : "Generate Draft"}</span>
                </div>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              
              {/* Usage Indicator for Free Plan */}
              {userPlan === 'free' && (
                 <div className="mt-3 flex items-center justify-between px-2">
                    <span className="text-[10px] text-slate-500">Daily Free Limit</span>
                    <span className="text-[10px] font-bold text-slate-400">{dailyUsage} / {PLAN_LIMITS.free.draftsPerDay}</span>
                 </div>
              )}
            </div>
        </div>

        <div className={`flex-1 transition-all duration-500 ease-out flex gap-6 min-w-0 ${showHistory ? 'mr-[320px]' : ''}`}>
          <div className="flex-1 bg-[#1E293B] border border-slate-700/50 rounded-2xl shadow-xl flex flex-col overflow-hidden relative">
            <div className="bg-[#0F172A] px-5 py-3 flex items-center justify-between border-b border-slate-700/50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <div className="w-px h-4 bg-slate-700 mx-1" />
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  <PenTool className="w-3.5 h-3.5" /> Composer
                </div>
              </div>
              <div className="flex items-center gap-3">
                {activeVersionIdx !== -1 && (
                   <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#00C26D]/10 border border-[#00C26D]/20">
                      <ThumbsUp className="w-3 h-3 text-[#00C26D]" />
                      <span className="text-[10px] font-bold text-[#00C26D] uppercase">High Confidence</span>
                   </span>
                )}
              </div>
            </div>

            {versions.length > 0 && (
                <div className="bg-[#0F172A] border-b border-slate-700/50 px-2 flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0 max-w-full">
                  {versions.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => setActiveVersionIdx(idx)}
                      className={`px-4 py-3 text-[11px] font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                        activeVersionIdx === idx
                          ? "border-[#00C26D] text-white bg-slate-800"
                          : "border-transparent text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      <span>{v.label}</span>
                      {v.type === 'Original' && <span className="px-1 py-0.5 rounded bg-indigo-500/20 text-indigo-400 text-[9px]">V1</span>}
                    </button>
                  ))}
                </div>
            )}

            <div className="flex-1 p-8 bg-transparent overflow-y-auto custom-scrollbar relative">
              {activeVersionIdx !== -1 ? (
                 <div className="h-full flex flex-col max-w-3xl mx-auto w-full">
                    <div className="flex-1">
                        {renderEmailPreview(versions[activeVersionIdx].content)}
                    </div>
                    <div className="mt-6">
                       <div className="flex items-center gap-2 mb-3">
                         <Wand2 className="w-3.5 h-3.5 text-[#00C26D]" />
                         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Intelligent Refinement</span>
                         {(!PLAN_LIMITS[userPlan].rewriteModes) && <Lock className="w-3 h-3 text-slate-600" />}
                       </div>
                       <div className="flex flex-wrap gap-2.5">
                          <RewriteButton icon={Minimize2} label="Shorten" desc="Clearer & Faster" onClick={() => handleRewrite("Shorten")} isActive={activeRewriteTool === "Shorten"} />
                          <RewriteButton icon={Maximize2} label="Expand" desc="Add Context" onClick={() => handleRewrite("Expand")} isActive={activeRewriteTool === "Expand"} />
                          <RewriteButton icon={Briefcase} label="Formal" desc="Professional" onClick={() => handleRewrite("Formal")} isActive={activeRewriteTool === "Formal"} />
                          <RewriteButton icon={Zap} label="Punchy" desc="High Impact" onClick={() => handleRewrite("Punchy")} isActive={activeRewriteTool === "Punchy"} />
                       </div>
                    </div>
                 </div>
              ) : (
                 <div className="h-full flex flex-col items-center justify-center text-slate-500/50 gap-6">
                    <div className="w-24 h-24 rounded-full bg-slate-800/50 flex items-center justify-center border border-slate-700/50">
                       <Bot className="w-10 h-10 opacity-50" />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-sm font-medium text-slate-400">Ready to compose</p>
                      <p className="text-xs text-slate-600">Configure settings to generate a draft</p>
                    </div>
                 </div>
              )}
            </div>

            {activeVersionIdx !== -1 && (
               <div className="p-4 bg-[#0F172A] border-t border-slate-700/50 flex justify-between items-center shrink-0">
                  <button onClick={clearAll} className="text-xs text-red-400 hover:text-white flex items-center gap-2 px-3 py-2 rounded hover:bg-red-500/20 transition-colors">
                     <Trash2 className="w-3.5 h-3.5" /> Clear
                  </button>
                  <div className="flex gap-3">
                     <button onClick={handleGenerate} className="text-xs text-slate-400 hover:text-white px-3 py-2 rounded hover:bg-slate-800 transition-colors flex items-center gap-2">
                        <RotateCcw className="w-3.5 h-3.5" /> New Draft
                     </button>
                     <button onClick={() => copyText(versions[activeVersionIdx].content)} className="px-4 py-2 bg-[#00C26D] hover:bg-[#009e59] text-white font-bold rounded-lg text-xs flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-green-900/20">
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copied" : "Copy All"}
                     </button>
                  </div>
               </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showHistory && (
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[320px] bg-[#1E293B] border-l border-slate-700/50 shadow-2xl z-50 flex flex-col"
            >
               <div className="p-5 border-b border-slate-700/50 flex justify-between items-center bg-[#0F172A]">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <History className="w-3.5 h-3.5 text-[#00C26D]" /> Version History
                  </h3>
                  <button onClick={() => setShowHistory(false)}><X className="w-4 h-4 text-slate-500 hover:text-white" /></button>
               </div>
               <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-zinc-700">
                  {historyList.map((item, i) => (
                     <div key={item.id} onClick={() => handleHistorySelect(item)} className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg cursor-pointer hover:border-[#00C26D]/50 hover:bg-slate-800 transition-all group">
                        <div className="flex justify-between mb-2">
                           <span className="text-[10px] font-bold text-[#00C26D] bg-[#00C26D]/10 px-2 py-0.5 rounded">{item.label}</span>
                           <span className="text-[10px] text-slate-500">{item.timestamp.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2 group-hover:text-slate-300 transition-colors">
                          {extractSubjectAndBody(item.content).body}
                        </p>
                     </div>
                  ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

// --- Sub-Components ---

const Input = ({ label, value, onChange, placeholder, helperText }: any) => (
  <div className="group">
    <div className="flex justify-between items-baseline mb-1.5 ml-1">
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>
      {helperText && <span className="text-[9px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">{helperText}</span>}
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-3 py-2.5 text-[13px] text-slate-200 focus:border-[#00C26D]/50 focus:ring-1 focus:ring-[#00C26D]/50 outline-none transition-all placeholder-slate-600"
      placeholder={placeholder}
    />
  </div>
);

const Select = ({ label, value, options, onChange }: any) => (
  <div className="group">
    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 ml-1 tracking-wider">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-3 py-2.5 text-[13px] text-slate-200 focus:border-[#00C26D]/50 outline-none appearance-none cursor-pointer"
    >
      {options.map((o: any) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

const Toggle = ({ label, checked, onChange }: any) => (
  <div onClick={onChange} className={`flex items-center justify-between p-2 rounded-lg cursor-pointer border transition-all ${checked ? 'bg-[#00C26D]/5 border-[#00C26D]/30' : 'bg-transparent border-transparent hover:bg-slate-800'}`}>
    <span className={`text-[11px] font-medium ${checked ? 'text-white' : 'text-slate-400'}`}>{label}</span>
    <div className={`w-7 h-4 rounded-full relative transition-colors ${checked ? 'bg-[#00C26D]' : 'bg-slate-700'}`}>
      <div className={`absolute top-[2px] w-3 h-3 bg-white rounded-full transition-all ${checked ? 'left-[14px]' : 'left-[2px]'}`} />
    </div>
  </div>
);

const RewriteButton = ({ icon: Icon, label, desc, onClick, disabled, isActive }: any) => (
  <button 
    onClick={onClick} 
    disabled={disabled} 
    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all border group ${isActive ? "bg-[#00C26D]/10 border-[#00C26D] text-[#00C26D]" : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700"}`}
  >
    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#00C26D]" : "text-slate-500 group-hover:text-white"}`} />
    <div className="flex flex-col items-start">
      <span className="text-[10px] font-bold leading-none">{label}</span>
      <span className="text-[9px] opacity-60 leading-none mt-0.5">{desc}</span>
    </div>
  </button>
);