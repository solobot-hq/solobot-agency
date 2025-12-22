"use client";

import React, { useState } from 'react';
import { Target, Sparkles, Loader2, Globe } from 'lucide-react';

export default function AIProspectingPage() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setAnalysis({
        summary: "High-growth startup founder focusing on AI.",
        disc: "D (Dominant)",
        painPoints: ["Scaling team", "Automating sales"],
        iceBreaker: "Saw your recent funding news..."
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="bg-[#1E293B] rounded-2xl border border-gray-800 p-6 shadow-xl h-fit">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-[#00C26D] h-6 w-6" />
            <h2 className="text-xl font-bold">Prospect Analysis</h2>
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">LinkedIn URL / Website</label>
              <div className="relative">
                <Globe className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full bg-[#0F172A] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-1 focus:ring-[#00C26D] outline-none" placeholder="https://linkedin.com/in/..." />
              </div>
            </div>
            <button onClick={handleAnalyze} disabled={loading} className="w-full bg-[#00C26D] hover:bg-[#00A05A] text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-4">{loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Analyze Prospect"}</button>
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-2xl border border-gray-800 p-6 shadow-xl h-full min-h-[400px]">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
             <Sparkles className="text-[#00C26D] h-5 w-5" />
             <h2 className="text-xl font-bold">Insights</h2>
          </div>
          {analysis ? (
             <div className="space-y-6">
                <div className="bg-[#0F172A] p-4 rounded-lg border border-gray-800">
                   <h3 className="text-gray-400 text-sm font-bold uppercase mb-2">Summary</h3>
                   <p className="text-gray-200">{analysis.summary}</p>
                </div>
                <div className="bg-[#0F172A] p-4 rounded-lg border border-gray-800">
                   <h3 className="text-gray-400 text-sm font-bold uppercase mb-2">DISC Profile</h3>
                   <p className="text-[#00C26D] font-bold">{analysis.disc}</p>
                </div>
                <div className="bg-[#00C26D]/10 p-4 rounded-lg border border-[#00C26D]/20">
                   <h3 className="text-[#00C26D] text-sm font-bold uppercase mb-2">Ice Breaker</h3>
                   <p className="text-gray-200 italic">"{analysis.iceBreaker}"</p>
                </div>
             </div>
          ) : (
             <div className="h-full flex items-center justify-center text-gray-600">Enter a URL to reveal insights.</div>
          )}
        </div>

      </div>
    </div>
  );
}