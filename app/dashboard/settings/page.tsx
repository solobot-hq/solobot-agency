"use client";

import React, { useState } from "react";
import { User, Shield, Mail, Globe, Lock, Key, Smartphone } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  return (
    <div className="space-y-10 animate-in fade-in duration-700 p-8 max-w-6xl">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight lowercase">settings</h1>
        <p className="text-zinc-500 mt-2 font-medium lowercase italic">manage your account and security protocols.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-2">
          <NavButton 
            label="profile" 
            icon={User} 
            active={activeTab === "profile"} 
            onClick={() => setActiveTab("profile")} 
          />
          <NavButton 
            label="security" 
            icon={Shield} 
            active={activeTab === "security"} 
            onClick={() => setActiveTab("security")} 
          />
        </div>

        <div className="md:col-span-3 space-y-4">
          {activeTab === "profile" ? (
            <section className="bg-[#111827] border border-white/[0.08] rounded-[2rem] p-8 space-y-8 shadow-xl">
              <h2 className="text-xs font-black text-zinc-500 uppercase tracking-widest">profile details</h2>
              {/* Profile Content ... */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-white/[0.05] flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-white lowercase">solobot agency</p>
                    <p className="text-sm text-zinc-500 lowercase">personal account</p>
                  </div>
                </div>
                <button className="text-[10px] font-black px-4 py-2 rounded-full border border-white/[0.1] text-zinc-400 hover:text-white transition-colors uppercase">update profile</button>
              </div>
              <div className="pt-8 border-t border-white/[0.05] space-y-6">
                <SettingRow label="Email address" value="solobotagency@gmail.com" pill="primary" icon={Mail} />
                <SettingRow label="Connected accounts" value="Google • solobotagency@gmail.com" icon={Globe} />
              </div>
            </section>
          ) : (
            /* SECURITY VIEW CONTENT - NOW FULLY BUILT */
            <section className="bg-[#111827] border border-white/[0.08] rounded-[2rem] p-8 space-y-8 shadow-xl animate-in slide-in-from-bottom-2">
              <div>
                <h2 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-6">authentication</h2>
                <div className="space-y-6">
                  <SettingRow 
                    label="password" 
                    value="••••••••••••" 
                    pill="last changed: jan 2026" 
                    icon={Lock} 
                  />
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-4">
                      <Smartphone className="w-4 h-4 text-zinc-600" />
                      <div>
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">two-factor auth</p>
                        <p className="text-sm font-bold text-white lowercase">active via authenticator app</p>
                      </div>
                    </div>
                    <button className="text-[10px] font-black px-4 py-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white border border-white/[0.05] uppercase">configure</button>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/[0.05]">
                <h2 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-6">session management</h2>
                <div className="space-y-6">
                  <SettingRow 
                    label="active sessions" 
                    value="1 current session in London, UK" 
                    pill="browser: chrome" 
                    icon={Key} 
                  />
                </div>
              </div>
            </section>
          )}

          <div className="p-8 border border-red-500/20 rounded-[2rem] bg-red-500/[0.02] flex items-center justify-between">
            <p className="text-sm font-medium text-red-500/50 lowercase italic">deactivate account and purge agent data</p>
            <button className="text-[10px] font-black px-4 py-2 rounded-full border border-red-500/30 text-red-500 uppercase hover:bg-red-500/10 transition-all">delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components as defined previously...