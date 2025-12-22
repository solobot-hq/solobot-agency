"use client";

import React, { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CreditCard,
  Bot,
  Zap,
  Loader2,
  CheckCheck,
  Bell,
} from "lucide-react";

interface PulseEvent {
  id: string;
  title: string;
  message: string;
  type: "ALERT" | "BILLING" | "BOT" | "SYSTEM";
  isRead: boolean;
  createdAt: string;
}

export default function PulsePage() {
  const [events, setEvents] = useState<PulseEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    const res = await fetch("/api/pulse/list");
    if (res.ok) setEvents(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const markAsRead = async (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isRead: true } : e))
    );
    await fetch("/api/pulse/mark-read", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
  };

  const markAllRead = async () => {
    setEvents((prev) => prev.map((e) => ({ ...e, isRead: true })));
    await fetch("/api/pulse/mark-read", {
      method: "POST",
      body: JSON.stringify({ id: "all" }),
    });
  };

  const getIcon = (type: PulseEvent["type"]) => {
    switch (type) {
      case "ALERT":
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case "BILLING":
        return <CreditCard className="w-5 h-5 text-emerald-400" />;
      case "BOT":
        return <Bot className="w-5 h-5 text-indigo-400" />;
      default:
        return <Zap className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="p-8 pt-6 max-w-4xl mx-auto space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Activity className="w-8 h-8 text-indigo-500" /> Pulse Feed
          </h2>
          <p className="text-slate-400">Real-time system activity & automation logs.</p>
        </div>

        <button
          onClick={markAllRead}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm flex items-center gap-2 shadow-lg"
        >
          <CheckCheck className="w-4 h-4" /> Mark all read
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-16 bg-[#0B1221] border border-slate-800 rounded-xl">
          <Bell className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-white font-medium">No pulse events yet</h3>
          <p className="text-slate-500 text-sm mt-1">Your system is quiet.</p>
        </div>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            onClick={() => !event.isRead && markAsRead(event.id)}
            className={`p-5 rounded-xl border cursor-pointer transition-all
              ${
                event.isRead
                  ? "bg-[#0B1221] opacity-70 border-slate-800 hover:opacity-100"
                  : "bg-gradient-to-r from-indigo-900/10 to-[#0B1221] border-indigo-500/40 shadow-md"
              }
            `}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-slate-800 border border-slate-700">
                {getIcon(event.type)}
              </div>

              <div className="flex-1">
                <h4 className={!event.isRead ? "text-white font-semibold" : "text-slate-400"}>
                  {event.title}
                </h4>
                <p className="text-slate-400 mt-1">{event.message}</p>
              </div>

              {!event.isRead && (
                <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse"></span>
              )}
            </div>
          </div>
        ))
      )}

    </div>
  );
}
