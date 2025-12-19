import React from "react";
import { Search, Book, MessageCircle, FileText, ChevronRight, ExternalLink } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="flex-1 p-8 pt-6 max-w-5xl mx-auto space-y-8">
      
      {/* Hero Search Section */}
      <div className="text-center space-y-4 py-8">
        <h2 className="text-3xl font-bold tracking-tight text-white">How can we help you?</h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Search our documentation, view FAQs, or contact our support team for specialized assistance with your bots.
        </p>
        <div className="relative max-w-lg mx-auto mt-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search for articles (e.g., 'API Keys', 'Scraper Limits')..." 
            className="w-full bg-[#0B1221] border border-slate-700 text-white rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none shadow-xl"
          />
        </div>
      </div>

      {/* Quick Topic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Book, title: "Getting Started", desc: "Setup your first bot in minutes." },
          { icon: FileText, title: "API Documentation", desc: "Detailed endpoints for developers." },
          { icon: MessageCircle, title: "Billing Support", desc: "Invoices, plans and credits." },
        ].map((topic, i) => (
          <div key={i} className="bg-[#0B1221] border border-slate-800 p-6 rounded-xl hover:border-indigo-500/50 hover:bg-slate-900/50 transition-all cursor-pointer group">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
              <topic.icon className="w-5 h-5 text-slate-300 group-hover:text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">{topic.title}</h3>
            <p className="text-sm text-slate-400">{topic.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-[#0B1221] border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-lg font-semibold text-white">Frequently Asked Questions</h3>
        </div>
        <div className="divide-y divide-slate-800">
          {[
            { q: "How do I increase my scraper concurrency limit?", a: "Concurrency limits are tied to your plan tier. Pro users get 50 concurrent threads. You can upgrade in Billing settings." },
            { q: "Can I bring my own proxies?", a: "Yes, go to Settings > Proxies to add your custom residential or datacenter proxies." },
            { q: "What happens if I run out of credits?", a: "Bots will pause automatically. You can enable auto-top-up in billing settings or manually purchase a credit pack." },
            { q: "How do I export leads to HubSpot?", a: "Use the 'CRM Sync' bot. You'll need to provide your HubSpot API key in the bot configuration." },
          ].map((faq, i) => (
            <div key={i} className="p-6 hover:bg-slate-900/30 transition-colors group cursor-pointer">
              <div className="flex justify-between items-center">
                 <h4 className="text-sm font-medium text-slate-200 group-hover:text-white">{faq.q}</h4>
                 <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
              </div>
              <p className="text-sm text-slate-400 mt-2 pr-8 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Banner */}
      <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
           <h3 className="text-white font-semibold">Still need help?</h3>
           <p className="text-sm text-slate-400">Our engineers are available 24/7 for Pro plan members.</p>
        </div>
        <div className="flex gap-3">
           <a href="#" className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors flex items-center gap-2">
             View Documentation <ExternalLink className="w-3 h-3" />
           </a>
           <button className="text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-indigo-500/20">
             Contact Support
           </button>
        </div>
      </div>

    </div>
  );
}