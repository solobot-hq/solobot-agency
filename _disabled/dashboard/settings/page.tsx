import React from "react";
import { User, Bell, Key, Shield, Trash2, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6 max-w-4xl">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Settings</h2>
        <p className="text-slate-400 mt-1">Manage your account preferences and API access.</p>
      </div>

      {/* Profile Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
           <User className="w-5 h-5 text-indigo-400" />
           <h3 className="text-lg font-medium text-white">Profile Information</h3>
        </div>
        
        <div className="grid gap-6 p-6 bg-[#0B1221] border border-slate-800 rounded-xl">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                 <label className="text-sm font-medium text-slate-300">Full Name</label>
                 <input 
                   type="text" 
                   defaultValue="SoloBot User" 
                   className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-medium text-slate-300">Email Address</label>
                 <input 
                   type="email" 
                   defaultValue="user@solobotagency.com" 
                   className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                 />
              </div>
           </div>
           
           <div className="flex justify-end">
              <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-700">
                 <Save className="w-4 h-4" /> Save Changes
              </button>
           </div>
        </div>
      </section>

      {/* Notifications Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
           <Bell className="w-5 h-5 text-indigo-400" />
           <h3 className="text-lg font-medium text-white">Notifications</h3>
        </div>
        
        <div className="bg-[#0B1221] border border-slate-800 rounded-xl divide-y divide-slate-800">
           {[
             { title: "Weekly Performance Report", desc: "Receive a summary of bot performance every Monday." },
             { title: "Error Alerts", desc: "Get notified immediately when a bot fails critically." },
             { title: "Product Updates", desc: "News about new features and bot templates." }
           ].map((item, i) => (
             <div key={i} className="flex items-center justify-between p-4">
                <div>
                   <h4 className="text-sm font-medium text-white">{item.title}</h4>
                   <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked={i !== 2} />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
             </div>
           ))}
        </div>
      </section>

      {/* API Key Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
           <Key className="w-5 h-5 text-indigo-400" />
           <h3 className="text-lg font-medium text-white">API Keys</h3>
        </div>
        
        <div className="p-6 bg-[#0B1221] border border-slate-800 rounded-xl space-y-4">
           <p className="text-sm text-slate-400">
             Use this key to authenticate requests to the SoloBotAgency API. Do not share this key.
           </p>
           <div className="flex gap-2">
              <div className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-500 font-mono text-sm truncate">
                 sk_live_51Msz...x923kL
              </div>
              <button className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-700">
                 Copy
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-700">
                 Roll Key
              </button>
           </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="space-y-4 pt-6">
        <div className="flex items-center gap-2 pb-2 border-b border-red-900/30">
           <Shield className="w-5 h-5 text-red-500" />
           <h3 className="text-lg font-medium text-white">Danger Zone</h3>
        </div>
        
        <div className="p-6 bg-red-950/10 border border-red-900/30 rounded-xl flex items-center justify-between">
           <div>
              <h4 className="text-sm font-medium text-white">Delete Account</h4>
              <p className="text-xs text-slate-400 mt-1">
                Permanently remove your account and all bot data. This action is irreversible.
              </p>
           </div>
           <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <Trash2 className="w-4 h-4" /> Delete Account
           </button>
        </div>
      </section>

    </div>
  );
}