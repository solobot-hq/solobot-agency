"use client";

import React, { useState } from 'react';
import { Search, Loader2, Download, Briefcase } from 'lucide-react';

export default function LeadScraperPage() {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleScrape = () => {
    setLoading(true);
    setTimeout(() => {
      setResults([
        { company: "Alpha Corp", name: "Jane Doe", role: "CTO", email: "jane@alpha.com" },
        { company: "Beta Ltd", name: "Jim Beam", role: "Founder", email: "jim@beta.com" },
      ]);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 gap-8">
        <div className="bg-[#1E293B] rounded-2xl border border-gray-800 p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <Search className="text-[#00C26D] h-6 w-6" />
            <h2 className="text-xl font-bold">Scraper Configuration</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">Keywords</label>
              <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-[#00C26D] outline-none" placeholder="e.g. Marketing Agency" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">Location</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-[#00C26D] outline-none" placeholder="e.g. New York" />
            </div>
          </div>
          <button onClick={handleScrape} disabled={loading} className="w-full bg-[#00C26D] hover:bg-[#00A05A] text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2">{loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Start Scraping"}</button>
        </div>

        {results.length > 0 && (
          <div className="bg-[#1E293B] rounded-2xl border border-gray-800 p-6 shadow-xl">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Enriched Data</h2>
                <button className="text-[#00C26D] flex items-center gap-2 text-sm font-medium"><Download className="h-4 w-4"/> Export</button>
             </div>
             <table className="w-full text-left">
               <thead><tr className="border-b border-gray-700 text-gray-400"><th className="p-3">Company</th><th className="p-3">Contact</th><th className="p-3">Role</th><th className="p-3">Email</th></tr></thead>
               <tbody>
                 {results.map((r, i) => (
                   <tr key={i} className="border-b border-gray-800"><td className="p-3">{r.company}</td><td className="p-3">{r.name}</td><td className="p-3">{r.role}</td><td className="p-3 text-[#00C26D]">{r.email}</td></tr>
                 ))}
               </tbody>
             </table>
          </div>
        )}
      </div>
    </div>
  );
}