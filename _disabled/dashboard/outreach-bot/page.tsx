"use client";

import React, { useState } from 'react';
import { Zap, Copy, History, Loader2, Check } from 'lucide-react';

export default function OutreachBotPage() {
  const [loading, setLoading] = useState(false);
  const [targetName, setTargetName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [offer, setOffer] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setOutput(`Hi ${targetName},\n\nI've been following ${businessName} and noticed your growth. \n\nWe specialize in ${offer}. I'd love to show you how we can help you scale.\n\nOpen to a quick chat?\n\nBest,\n[Your Name]`);
      setLoading(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="bg-[#1E293B] rounded-2xl border border-gray-800 p-6 shadow-xl h-fit">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="text-[#00C26D] h-6 w-6" />
            <h2 className="text-xl font-bold">Outreach Strategy</h2>
          </div>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Target Name</label>
                <input type="text" value={targetName} onChange={(e) => setTargetName(e.target.value)} className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-[#00C26D] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Business Name</label>
                <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-[#00C26D] outline-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">Your Offer</label>
              <textarea value={offer} onChange={(e) => setOffer(e.target.value)} className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-[#00C26D] outline-none min-h-[120px]" placeholder="e.g. increasing ROAS by 30%..." />
            </div>
            <button onClick={handleGenerate} disabled={loading} className="w-full bg-[#00C26D] hover:bg-[#00A05A] text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-green-900/20 flex items-center justify-center gap-2 mt-4">{loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Generate Outreach"}</button>
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-2xl border border-gray-800 p-6 shadow-xl h-full min-h-[500px] flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
            <h2 className="text-xl font-bold">Generated Message</h2>
            <button onClick={handleCopy} className="text-sm text-[#00C26D] flex items-center gap-2">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Copied" : "Copy"}</button>
          </div>
          <div className="flex-1 bg-[#0F172A] rounded-xl p-6 border border-gray-800">
            {output ? <p className="whitespace-pre-wrap text-gray-300 font-light">{output}</p> : <p className="text-gray-600 text-center mt-20">Generated outreach will appear here.</p>}
          </div>
        </div>

      </div>
    </div>
  );
}