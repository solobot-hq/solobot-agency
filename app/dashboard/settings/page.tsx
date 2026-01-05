"use client";

import React from "react";
import { User, Shield, Mail, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-700 p-8 max-w-5xl">
      {/* 1. Header — Matching Workspace Heading Hierarchy */}
      <div>
        <h1 className="text-4xl font-bold text-white tracking-tight">Settings</h1>
        <p className="text-zinc-500 mt-2 font-medium">Manage your account and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 2. Side Navigation — Utilitarian and Boring */}
        <div className="space-y-2">
          <NavButton label="Profile" icon={User} active />
          <NavButton label="Security" icon={Shield} />
        </div>

        {/* 3. Main Content — Wrapped in Premium Workspace Tiles */}
        <div className="md:col-span-3 space-y-4">
          <section className="bg-[#111827] border border-zinc-800 rounded-[2rem] p-8 space-y-8">
            <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Profile details</h2>
            
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center overflow-hidden">
                   <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">solobot agency</p>
                  <p className="text-sm text-zinc-500 lowercase">personal account</p>
                </div>
              </div>
              <button className="text-[10px] font-black px-4 py-2 rounded-full border border-white/[0.05] text-zinc-500 hover:text-white transition-colors uppercase">
                Update profile
              </button>
            </div>

            <div className="pt-8 border-t border-white/[0.05] space-y-6">
              <SettingRow 
                label="Email addresses" 
                value="solobotagency@gmail.com" 
                pill="Primary" 
                icon={Mail} 
              />
              <SettingRow 
                label="Connected accounts" 
                value="Google • solobotagency@gmail.com" 
                icon={Globe} 
              />
            </div>
          </section>

          {/* 4. Danger Zone Metadata */}
          <div className="p-8 border border-red-500/10 rounded-[2rem] bg-red-500/[0.02] flex items-center justify-between">
            <p className="text-sm font-medium text-red-500/50 lowercase">deactivate account and purge agent data</p>
            <button className="text-[10px] font-black px-4 py-2 rounded-full border border-red-500/20 text-red-500 uppercase">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavButton({ label, icon: Icon, active }: any) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
      active ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
    }`}>
      <Icon className="w-4 h-4" />
      <span className="lowercase">{label}</span>
    </button>
  );
}

function SettingRow({ label, value, pill, icon: Icon }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Icon className="w-4 h-4 text-zinc-600" />
        <div>
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{label}</p>
          <p className="text-sm font-medium text-zinc-300">{value}</p>
        </div>
      </div>
      {pill && (
        <span className="text-[10px] font-black px-2 py-1 rounded bg-zinc-800 text-zinc-500 border border-white/[0.05] uppercase">
          {pill}
        </span>
      )}
    </div>
  );
}