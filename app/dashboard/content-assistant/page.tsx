"use client";

import React, { useState } from 'react';
import { PenTool, Linkedin, Twitter, Copy, Check, Loader2 } from 'lucide-react';

export default function ContentAssistantPage() {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('LinkedIn');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setOutput(`🚀 Unlocking potential in ${topic}\n\nHere are 3 ways to master ${topic} today:\n\n1. Focus on basics\n2. Iterate fast\n3. Learn from data\n\n#${topic.replace(/\s/g,'')} #Growth`);
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
            <PenTool className="text-[#00C26D] h-6 w-6" />
            <h2 className="text-xl font-bold">Content Strategy</h2>
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">Platform</label>
              <div className="flex gap-4">
                 <button onClick={() => setPlatform('LinkedIn')} className={`flex-1 py-3 rounded-lg border flex items-center justify-center gap-2 ${platform === 'LinkedIn' ? 'bg-[#00C26D]/20 border-[#00C26D] text-[#00C26D]' : 'border-gray-700 text-gray-400'}`}><Linkedin className="h-4 w-4"/> LinkedIn</button>
                 <button onClick={() => setPlatform('Twitter')} className={`flex-1 py-3 rounded-lg border flex items-center justify-center gap-2 ${platform === 'Twitter' ? 'bg-[#00C26D]/20 border-[#00C26D] text-[#00C26D]' : 'border-gray-700 text-gray-400'}`}><Twitter className="h-4 w-4"/> Twitter</button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">Topic</label>
              <textarea value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-[#00C26D] outline-none min-h-[120px]" placeholder="What do you want to post about?" />
            </div>
            <button onClick={handleGenerate} disabled={loading} className="w-full bg-[#00C26D] hover:bg-[#00A05A] text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-4">{loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Generate Post"}</button>
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-2xl border border-gray-800 p-6 shadow-xl h-full min-h-[500px] flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
            <h2 className="text-xl font-bold">Draft</h2>
            <button onClick={handleCopy} className="text-sm text-[#00C26D] flex items-center gap-2">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Copied" : "Copy"}</button>
          </div>
          <div className="flex-1 bg-[#0F172A] rounded-xl p-6 border border-gray-800">
            {output ? <p className="whitespace-pre-wrap text-gray-300 font-light">{output}</p> : <p className="text-gray-600 text-center mt-20">Your viral post will appear here.</p>}
          </div>
        </div>

      </div>
    </div>
  );
}