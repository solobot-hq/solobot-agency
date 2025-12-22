"use client";

import React, { useState } from 'react';
import { Briefcase, Copy, History, Loader2, Check, FileText } from 'lucide-react';

export default function ProposalMakerPage() {
  const [loading, setLoading] = useState(false);
  const [clientName, setClientName] = useState('Acme Digital');
  const [projectType, setProjectType] = useState('Website Redesign');
  const [deliverables, setDeliverables] = useState('Speed optimization\nMobile-first structure');
  const [budget, setBudget] = useState('850');
  const [timeline, setTimeline] = useState('2 weeks');
  const [tone, setTone] = useState('Persuasive');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = (type: 'friendly' | 'closer') => {
    setLoading(true);
    setTimeout(() => {
      setOutput(`PROPOSAL FOR ${clientName.toUpperCase()}\n\nEXECUTIVE SUMMARY\nWe propose a comprehensive ${projectType} to elevate your brand. Our approach focuses on high-impact results tailored to your specific needs.\n\nDELIVERABLES\n${deliverables.split('\n').map(d => `• ${d}`).join('\n')}\n\nINVESTMENT\nTotal Investment: £${budget}\nTimeline: ${timeline}\n\nWHY US?\nWe don't just deliver specific tasks; we deliver outcomes. Let's start this transformation today.`);
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
        
        {/* Input Section */}
        <div className="bg-[#1E293B] rounded-2xl border border-gray-800 p-6 shadow-xl h-fit">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="text-[#00C26D] h-6 w-6" />
            <h2 className="text-xl font-bold">Proposal Details</h2>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Client Name</label>
                <input 
                  type="text" 
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-[#00C26D] focus:border-[#00C26D] outline-none placeholder-gray-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Project Type</label>
                <input 
                  type="text" 
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-[#00C26D] focus:border-[#00C26D] outline-none placeholder-gray-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">Deliverables</label>
              <textarea 
                value={deliverables}
                onChange={(e) => setDeliverables(e.target.value)}
                className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-[#00C26D] focus:border-[#00C26D] outline-none placeholder-gray-500 min-h-[120px] resize-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Budget (£) (Optional)</label>
                <input 
                  type="text" 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-[#00C26D] focus:border-[#00C26D] outline-none placeholder-gray-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Timeline</label>
                <input 
                  type="text" 
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-[#00C26D] focus:border-[#00C26D] outline-none placeholder-gray-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">Tone of Voice</label>
              <select 
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-[#00C26D] focus:border-[#00C26D] outline-none transition-all appearance-none"
              >
                <option>Persuasive</option>
                <option>Professional</option>
                <option>Urgent</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <button 
                onClick={() => handleGenerate('friendly')}
                className="w-full bg-transparent border border-gray-600 hover:border-white text-white font-medium py-3 rounded-lg transition-all"
              >
                Client-Friendly Proposal
              </button>
              <button 
                onClick={() => handleGenerate('closer')}
                disabled={loading}
                className="w-full bg-[#00C26D] hover:bg-[#00A05A] text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "High-Ticket Closer Proposal"}
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-[#1E293B] rounded-2xl border border-gray-800 p-6 shadow-xl h-full min-h-[600px] flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
            <div className="flex items-center gap-3">
              <FileText className="text-[#00C26D] h-6 w-6" />
              <h2 className="text-xl font-bold">Generated Proposal</h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <History className="h-4 w-4" /> History
              </button>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 text-sm text-[#00C26D] hover:text-[#00A05A] transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} 
                {copied ? "Copied" : "Copy Text"}
              </button>
            </div>
          </div>
          
          <div className="flex-1 bg-[#0F172A] rounded-xl p-6 border border-gray-800">
            {output ? (
              <p className="whitespace-pre-wrap text-gray-300 leading-relaxed font-light">{output}</p>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-600">
                <FileText className="h-12 w-12 mb-4 opacity-20" />
                <p>Fill in the details to generate a high-converting proposal.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}