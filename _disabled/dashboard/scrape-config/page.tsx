"use client";

import React, { useState } from 'react';
import { Settings, Save, Loader2 } from 'lucide-react';

export default function ScrapeConfigPage() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [frequency, setFrequency] = useState('Daily');

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-6 lg:p-8">
      <div className="max-w-[800px] mx-auto">
        <div className="bg-[#1E293B] rounded-2xl border border-gray-800 p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
            <Settings className="text-[#00C26D] h-6 w-6" />
            <h2 className="text-xl font-bold">Scraper Configuration</h2>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">Target URL Pattern</label>
              <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-[#00C26D] outline-none" placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">Frequency</label>
              <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-[#00C26D] outline-none">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Hourly</option>
              </select>
            </div>
            <button onClick={handleSave} disabled={loading} className="w-full bg-[#00C26D] hover:bg-[#00A05A] text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2">{loading ? <Loader2 className="animate-spin h-5 w-5" /> : <><Save className="h-5 w-5"/> Save Configuration</>}</button>
          </div>
        </div>
      </div>
    </div>
  );
}