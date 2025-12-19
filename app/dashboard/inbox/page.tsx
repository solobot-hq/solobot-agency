"use client";

import React, { useEffect, useState } from "react";
import { Inbox, Star, Clock, Send, Mail, Trash2, Loader2, Check } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  subject: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

export default function InboxPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/inbox/list");
      if (res.ok) setMessages(await res.json());
    } catch (e) {
      console.error("Failed to load inbox", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const openMessage = async (msg: Message) => {
    setSelectedId(msg.id);
    if (!msg.isRead) {
      // Optimistic update
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, isRead: true } : m));
      // Server update
      await fetch("/api/inbox/mark-read", {
        method: "POST",
        body: JSON.stringify({ id: msg.id }),
      });
    }
  };

  const simulateMessage = async () => {
    setLoading(true);
    await fetch("/api/inbox/send", {
      method: "POST",
      body: JSON.stringify({ 
        sender: "System Notification", 
        subject: "New Lead Batch Available", 
        body: "The 'Leads Engine' bot has finished processing. 50 new high-quality leads have been added to your CRM." 
      }),
    });
    await fetchMessages();
  };

  const selectedMessage = messages.find(m => m.id === selectedId);

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-[#0B1221] text-slate-200">
      
      {/* Sidebar List */}
      <div className="w-full md:w-1/3 border-r border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#0B1221]">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Inbox className="w-5 h-5 text-indigo-500" /> Inbox
          </h2>
          <button 
            onClick={simulateMessage} 
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
            title="Simulate incoming message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
          {loading ? (
            <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 text-indigo-500 animate-spin" /></div>
          ) : messages.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center">
               <Mail className="w-10 h-10 text-slate-700 mb-3" />
               <p className="text-slate-500 text-sm">No messages yet.</p>
               <button onClick={simulateMessage} className="mt-4 text-xs text-indigo-400 hover:text-indigo-300">Send test message</button>
            </div>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg.id}
                onClick={() => openMessage(msg)}
                className={`p-4 border-b border-slate-800 cursor-pointer hover:bg-slate-800/50 transition-colors ${selectedId === msg.id ? 'bg-indigo-900/10 border-l-2 border-l-indigo-500' : 'border-l-2 border-l-transparent'}`}
              >
                <div className="flex justify-between mb-1">
                  <span className={`text-sm font-medium ${msg.isRead ? "text-slate-400" : "text-white"}`}>{msg.sender}</span>
                  <span className="text-[10px] text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>
                <h4 className={`text-sm truncate mb-1 ${msg.isRead ? "text-slate-500" : "text-slate-200 font-semibold"}`}>{msg.subject}</h4>
                <p className="text-xs text-slate-600 truncate">{msg.body}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Message Content */}
      <div className="hidden md:flex flex-1 flex-col bg-[#0F1528]">
        {selectedMessage ? (
          <>
            <div className="p-6 border-b border-slate-800 flex justify-between items-start bg-[#0B1221]">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">{selectedMessage.subject}</h1>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded text-xs font-medium border border-indigo-500/20">{selectedMessage.sender}</span>
                  <span>•</span>
                  <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 rounded-lg transition-colors"><Star className="w-5 h-5" /></button>
                <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="flex-1 p-8 overflow-y-auto text-slate-300 leading-relaxed whitespace-pre-wrap">
              {selectedMessage.body}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
            <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
               <Inbox className="w-10 h-10 text-slate-600" />
            </div>
            <p className="text-lg font-medium text-slate-400">Select a message to view details</p>
          </div>
        )}
      </div>

    </div>
  );
}