"use client";

import React, { useState } from 'react';
import { CalendarCheck, Database, Loader2, CheckCircle } from 'lucide-react';

export default function CRMLoggerPage() {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState('');
  const [logged, setLogged] = useState(false);

  const handleLog = () => {
    setLoading(true);
    setTimeout(() => {
      setLogged(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#1E293B] rounded-2xl border border-gray-800 p-6 shadow-xl h-fit">
          <div className="flex items-center gap-3 mb-6">
            <CalendarCheck className="text-[#00C26D] h-6 w-6" />
            <h2 className="text-xl font-bold">Meeting Notes</h2>
          </div>
          <div className="space-y-5">
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-[#00C26D] outline-none min-h-[200px] resize-none" placeholder="Paste rough meeting notes here..." />
            <button onClick={handleLog} disabled={loading} className="w-full bg-[#00C26D] hover:bg-[#00A05A] text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-4">{loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Process & Log to CRM"}</button>
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-2xl border border-gray-800 p-6 shadow-xl h-full min-h-[400px] flex flex-col justify-center items-center">
           {logged ? (
             <div className="text-center">
               <CheckCircle className="h-16 w-16 text-[#00C26D] mx-auto mb-4" />
               <h3 className="text-2xl font-bold text-white mb-2">Successfully Logged</h3>
               <p className="text-gray-400">Deal updated: "TechFlow Contract"</p>
               <p className="text-gray-400">Next Step: "Send Invoice"</p>
             </div>
           ) : (
             <div className="text-gray-600 flex flex-col items-center">
               <Database className="h-12 w-12 mb-4 opacity-20" />
               <p>Waiting for notes...</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}