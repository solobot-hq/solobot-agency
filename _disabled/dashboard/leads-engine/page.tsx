"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Search,
  Filter,
  Download,
  Copy,
  Check,
  Building,
  MapPin,
  Globe,
  Mail,
  ShieldCheck,
  Users,
  Briefcase,
  ArrowRight,
  Loader2,
  Database,
  ChevronDown,
  Sparkles,
  Lock // Added for feature gating
} from "lucide-react";

// --- Types ---

type PlanTier = 'free' | 'pro' | 'agency';

interface LeadCriteria {
  industry: string;
  location: string;
  businessType: string;
  companySize: string;
  intent: string;
}

interface LeadResult {
  id: string;
  name: string;
  industry: string;
  location: string;
  website: string;
  email: string;
  size: string;
  confidence: number;
  reason: string;
  status: "New" | "Contacted";
}

interface SelectOption {
  label: string;
  value: string;
}

// --- Configuration & Plan Logic ---

// 🧠 Plan Limits Configuration
const PLAN_LIMITS = {
  free: 2,
  pro: 8,
  agency: 15
};

// 🧠 Active Plan (Temporary Variable - Connect to Auth/Billing later)
const activePlan: PlanTier = 'free'; // Change to 'pro' or 'agency' to test

const BUSINESS_TYPES: SelectOption[] = [
  { label: "Solo / Freelancer", value: "Solo" },
  { label: "Small Business (SMB)", value: "SMB" },
  { label: "Enterprise", value: "Enterprise" },
  { label: "Agency", value: "Agency" },
  { label: "Startup", value: "Startup" }
];

const COMPANY_SIZES: SelectOption[] = [
  { label: "1-10 Employees", value: "1-10" },
  { label: "11-50 Employees", value: "11-50" },
  { label: "51-200 Employees", value: "51-200" },
  { label: "201-500 Employees", value: "201-500" },
  { label: "500+ Employees", value: "500+" }
];

const INTENTS: SelectOption[] = [
  { label: "Cold Outreach", value: "Cold" },
  { label: "Warm / Referral", value: "Warm" },
  { label: "Partnership", value: "Partner" },
  { label: "Hiring", value: "Hiring" }
];

// --- "INFINITE" MOCK INTELLIGENCE ENGINE ---
const generateMockLeads = (criteria: LeadCriteria, count: number = 50): LeadResult[] => {
  const prefixes = ["Apex", "Omni", "NextGen", "Global", "Pure", "Star", "Prime", "Blue", "Iron", "Cloud", "Hyper", "Strat", "Poly", "Mono"];
  const suffixes = ["Systems", "Solutions", "Labs", "Ventures", "Partners", "Group", "Corp", "Inc", "Holdings", "Technologies", "Media", "Digital", "Dynamics"];
  const industries = ["Technology", "SaaS", "Finance", "Healthcare", "E-commerce", "Consulting", "Real Estate", "Logistics"];
  const locations = ["San Francisco, CA", "New York, NY", "London, UK", "Austin, TX", "Remote", "Toronto, ON", "Berlin, DE", "Singapore"];

  return Array.from({ length: count }).map((_, i) => {
    const seed = i + (criteria.industry?.length || 0) + (criteria.location?.length || 0);
    const pick = (arr: string[]) => arr[(seed + i) % arr.length];
    
    const industry = criteria.industry || pick(industries);
    const location = criteria.location || pick(locations);
    const name = `${pick(prefixes)} ${pick(suffixes)}`;
    
    // Weighted confidence: Top results simulate better matches
    const confidence = Math.max(60, 99 - (i * 1.5) - (Math.random() * 5)); 
    
    let reason = "";
    if (i < 3) reason = `Perfect match for ${criteria.intent} outreach in ${location}.`;
    else if (i < 8) reason = `High growth signals detected in the ${industry} sector.`;
    else if (i < 15) reason = `Recently posted jobs matching your target profile.`;
    else reason = `Matches industry vertical. Standard fit.`;

    return {
      id: i.toString(),
      name: name,
      industry: industry,
      location: location,
      website: `www.${name.toLowerCase().replace(/ /g, '')}.com`,
      email: `contact@${name.toLowerCase().replace(/ /g, '')}.com`,
      size: (i % 3 === 0) ? "51-200" : (i % 2 === 0) ? "11-50" : "1-10",
      confidence: Math.floor(confidence),
      reason: reason,
      status: "New"
    };
  });
};

// --- Components ---

const Input = ({ label, value, onChange, placeholder, icon: Icon }: any) => (
  <div className="group">
    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 ml-1 tracking-wider">{label}</label>
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#0F172A] border border-slate-700 rounded-lg pl-9 pr-3 py-2.5 text-[13px] text-slate-200 focus:border-[#00C26D]/50 focus:ring-1 focus:ring-[#00C26D]/50 outline-none transition-all placeholder-slate-600"
        placeholder={placeholder}
      />
      <Icon className="absolute left-3 top-2.5 w-4 h-4 text-slate-500 group-hover:text-slate-400 transition-colors" />
    </div>
  </div>
);

const Select = ({ label, value, options, onChange }: any) => (
  <div className="group">
    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 ml-1 tracking-wider">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-3 py-2.5 text-[13px] text-slate-200 focus:border-[#00C26D]/50 outline-none appearance-none cursor-pointer"
      >
        {options.map((o: any) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-3 w-3 h-3 text-slate-500 pointer-events-none" />
    </div>
  </div>
);

// --- Main Page Component ---

export default function LeadsEnginePage() {
  const [formData, setFormData] = useState<LeadCriteria>({
    industry: "",
    location: "",
    businessType: "SMB",
    companySize: "11-50",
    intent: "Cold"
  });

  const [results, setResults] = useState<LeadResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFeedback, setSearchFeedback] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (field: keyof LeadCriteria, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    if (!formData.industry && !formData.location) return;
    
    setIsSearching(true);
    setHasSearched(true);
    setResults([]);

    // Intelligent Search Feedback Sequence
    const steps = [
      "Scanning verified business sources...",
      "Filtering leads by relevance...",
      "Ranking prospects by outreach potential..."
    ];

    let step = 0;
    setSearchFeedback(steps[0]);

    const interval = setInterval(() => {
      step++;
      if (step < steps.length) {
        setSearchFeedback(steps[step]);
      } else {
        clearInterval(interval);
        
        // --- SUBSCRIPTION LOGIC: ENFORCE LIMITS ---
        // 1. Generate ample candidates (mocking a DB search)
        const candidates = generateMockLeads(formData, 50);
        
        // 2. Sort by Confidence (Highest First) - Always show best leads
        const sorted = candidates.sort((a, b) => b.confidence - a.confidence);
        
        // 3. Slice based on Plan Limit
        const limit = PLAN_LIMITS[activePlan];
        setResults(sorted.slice(0, limit));
        
        setIsSearching(false);
      }
    }, 400);
  };

  // --- CSV EXPORT ENGINE ---
  const handleExport = () => {
    if (activePlan === 'free') return; // Gate Logic
    if (results.length === 0) return;

    const headers = ["Business Name", "Industry", "Location", "Website", "Email", "Company Size", "Confidence Score", "Match Reason"];
    const rows = results.map(lead => [
      lead.name, lead.industry, lead.location, lead.website, lead.email, lead.size, `${lead.confidence}%`, `"${lead.reason.replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyEmails = () => {
    if (activePlan === 'free') return; // Gate Logic
    const emails = results.map(r => r.email).join(", ");
    navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full w-full bg-[#0B1120] text-slate-200 font-sans selection:bg-[#00C26D]/30 selection:text-white overflow-hidden flex flex-col">
      
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-zinc-800 bg-[#0B1120] shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-xl bg-[#1E293B] border border-slate-700/50 shadow-lg shadow-green-900/10">
            <Zap className="w-5 h-5 text-[#00C26D]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Leads Engine
              <span className="px-2 py-0.5 rounded-full bg-[#00C26D]/10 text-[#00C26D] text-[10px] font-bold tracking-wide uppercase border border-[#00C26D]/20">
                Premium
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">Automated prospect qualification & sourcing</p>
          </div>
        </div>

        {/* Plan Indicator Badge */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-[#1E293B] border border-slate-700 flex items-center gap-2">
             <div className={`w-2 h-2 rounded-full ${activePlan === 'free' ? 'bg-orange-400' : 'bg-[#00C26D]'}`} />
             <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
               {activePlan} Plan
             </span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden p-6 gap-6">
        
        {/* === LEFT PANEL: CONTEXT ENGINE === */}
        <div className="w-[380px] shrink-0 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700">
            
            {/* Context Inputs */}
            <div className="bg-[#1E293B] border border-slate-700/50 rounded-xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-3.5 h-3.5 text-[#00C26D]" />
                <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wide">Context Engine</span>
              </div>
              
              <div className="space-y-4">
                <Input 
                  label="Target Industry" 
                  placeholder="e.g. SaaS, Dental, Real Estate" 
                  icon={Briefcase}
                  value={formData.industry} 
                  onChange={(v: string) => handleInputChange("industry", v)} 
                />
                <Input 
                  label="Target Location" 
                  placeholder="e.g. New York, London, Remote" 
                  icon={MapPin}
                  value={formData.location} 
                  onChange={(v: string) => handleInputChange("location", v)} 
                />
              </div>
            </div>

            {/* Refinement Options */}
            <div className="bg-[#1E293B] border border-slate-700/50 rounded-xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-3.5 h-3.5 text-[#00C26D]" />
                <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wide">Intelligent Refinement</span>
              </div>
              
              <div className="space-y-4">
                <Select 
                  label="Business Type" 
                  value={formData.businessType} 
                  options={BUSINESS_TYPES} 
                  onChange={(v: string) => handleInputChange("businessType", v)} 
                />
                <Select 
                  label="Company Size" 
                  value={formData.companySize} 
                  options={COMPANY_SIZES} 
                  onChange={(v: string) => handleInputChange("companySize", v)} 
                />
                <Select 
                  label="Outreach Intent" 
                  value={formData.intent} 
                  options={INTENTS} 
                  onChange={(v: string) => handleInputChange("intent", v)} 
                />
              </div>
            </div>

          </div>

          {/* Sticky Search Button */}
          <div className="pt-2">
            <button
              onClick={handleSearch}
              disabled={isSearching || (!formData.industry && !formData.location)}
              className="w-full rounded-xl bg-[#00C26D] p-4 text-white font-bold shadow-lg shadow-green-500/20 transition-all hover:bg-[#009e59] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 relative overflow-hidden group"
            >
              <div className="relative z-10 flex items-center gap-2">
                {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                <span className="text-sm tracking-wide">{isSearching ? "Analyzing..." : "Search Database"}</span>
              </div>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <p className="text-center text-[10px] text-slate-500 mt-2 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3 h-3" /> Verifying contact data validity
            </p>
          </div>
        </div>

        {/* === RIGHT PANEL: INTELLIGENCE CARDS === */}
        <div className="flex-1 bg-[#1E293B] border border-slate-700/50 rounded-2xl shadow-xl flex flex-col overflow-hidden relative">
          
          {/* Results Header */}
          <div className="bg-[#0F172A] px-5 py-3 flex items-center justify-between border-b border-slate-700/50 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              </div>
              <div className="w-px h-4 bg-slate-700 mx-1" />
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                <Users className="w-3.5 h-3.5" /> Prospects 
                {results.length > 0 && <span className="text-slate-500 font-normal">({results.length} found)</span>}
              </div>
            </div>

            {/* Actions Toolbar - GATED */}
            {results.length > 0 && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleCopyEmails} 
                  disabled={activePlan === 'free'}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                    activePlan === 'free' 
                      ? 'bg-slate-800/50 text-slate-600 border-slate-800 cursor-not-allowed opacity-50'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
                  }`}
                >
                  {activePlan === 'free' ? <Lock className="w-3 h-3" /> : (copied ? <Check className="w-3 h-3 text-[#00C26D]" /> : <Copy className="w-3 h-3" />)}
                  {activePlan === 'free' ? "Unlock Copy" : (copied ? "Copied" : "Copy Emails")}
                </button>
                <button 
                  onClick={handleExport}
                  disabled={activePlan === 'free'} 
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                     activePlan === 'free'
                      ? 'bg-[#00C26D]/5 text-[#00C26D]/40 border-[#00C26D]/10 cursor-not-allowed'
                      : 'bg-[#00C26D]/10 hover:bg-[#00C26D]/20 text-[#00C26D] border border-[#00C26D]/20'
                  }`}
                >
                  {activePlan === 'free' ? <Lock className="w-3 h-3" /> : <Download className="w-3 h-3" />}
                  {activePlan === 'free' ? "Upgrade to Export" : "Export CSV"}
                </button>
              </div>
            )}
          </div>

          {/* Results Content Area */}
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar relative">
            
            <AnimatePresence mode="wait">
              {isSearching ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-[#1E293B]/80 backdrop-blur-sm z-10"
                >
                  <Loader2 className="w-10 h-10 text-[#00C26D] animate-spin mb-4" />
                  <p className="text-sm font-medium text-slate-300 animate-pulse">{searchFeedback}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {!hasSearched ? (
              // Empty State
              <div className="h-full flex flex-col items-center justify-center text-slate-500/50 gap-6">
                <div className="w-24 h-24 rounded-full bg-slate-800/50 flex items-center justify-center border border-slate-700/50">
                  <Search className="w-10 h-10 opacity-50" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-medium text-slate-400">Ready to scout</p>
                  <p className="text-xs text-slate-600">Enter your target criteria to begin qualification.</p>
                </div>
              </div>
            ) : results.length > 0 ? (
              // Results List
              <div className="grid gap-4">
                {results.map((lead) => (
                  <motion.div 
                    key={lead.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group bg-[#0F172A] border border-slate-700/50 rounded-xl p-5 hover:border-[#00C26D]/30 transition-all hover:shadow-lg hover:shadow-green-900/5"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-bold text-white group-hover:text-[#00C26D] transition-colors">{lead.name}</h3>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00C26D]/10 text-[#00C26D] border border-[#00C26D]/20">
                            {lead.confidence}% Match
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1"><Building className="w-3 h-3" /> {lead.industry}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {lead.location}</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {lead.size}</span>
                        </div>
                      </div>
                      <a href={`https://${lead.website}`} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                        <Globe className="w-4 h-4" />
                      </a>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-800">
                         <span className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Contact</span>
                         <div className="flex items-center gap-2 text-xs text-slate-300">
                           <Mail className="w-3 h-3 text-[#00C26D]" />
                           {activePlan === 'free' ? `${lead.email.substring(0, 3)}****@****.com` : lead.email}
                         </div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-800">
                         <span className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Website</span>
                         <div className="flex items-center gap-2 text-xs text-slate-300 truncate">
                           <Globe className="w-3 h-3 text-slate-500" />
                           {lead.website}
                         </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-start gap-2">
                       <Sparkles className="w-3 h-3 text-[#00C26D] mt-0.5 shrink-0" />
                       <p className="text-xs text-slate-400 leading-relaxed italic">
                         "{lead.reason}"
                       </p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Plan Upsell Message if limited */}
                {activePlan === 'free' && (
                  <div className="text-center py-6 border border-dashed border-slate-700 rounded-xl bg-slate-800/30">
                     <p className="text-xs text-slate-400 mb-2">Showing top 2 high-confidence leads.</p>
                     <button className="text-xs font-bold text-[#00C26D] hover:underline">Upgrade to Pro to unlock all 50+ matches</button>
                  </div>
                )}
              </div>
            ) : (
              // No Results State
              <div className="text-center py-10 text-slate-500 text-sm">
                No high-confidence leads found. Try broadening your search.
              </div>
            )}
          </div>

          {/* Footer Status */}
          <div className="p-3 bg-[#0F172A] border-t border-slate-700/50 flex justify-between items-center shrink-0 text-[10px] text-slate-500">
             <span>Database Version: v2.4.1 (Live)</span>
             <span className="flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#00C26D] animate-pulse"></div>
               System Operational
             </span>
          </div>

        </div>

      </div>
    </div>
  );
}