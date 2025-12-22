import React from "react";
import { CreditCard, CheckCircle, Download, Zap, TrendingUp } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Billing & Usage</h2>
          <p className="text-slate-400 mt-1">Manage your subscription, payment methods, and view usage history.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20">
          Upgrade Plan
        </button>
      </div>

      {/* Usage & Plan Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Current Plan Card */}
        <div className="rounded-xl border border-slate-800 bg-[#0B1221] p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Current Plan</p>
              <h3 className="text-2xl font-bold text-white mt-1">Pro Agency</h3>
              <p className="text-sm text-indigo-400 mt-1 font-medium">$49/month</p>
            </div>
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Zap className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Unlimited Bot Workflows</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Priority Support</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Advanced Analytics</span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-xs text-slate-500">Next billing date: <span className="text-slate-300">October 1, 2025</span></p>
          </div>
        </div>

        {/* Usage Stats Card */}
        <div className="rounded-xl border border-slate-800 bg-[#0B1221] p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Monthly Credits</p>
              <h3 className="text-2xl font-bold text-white mt-1">8,450 / 10,000</h3>
            </div>
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">Usage</span>
              <span className="text-slate-400">84%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[84%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Credits reset in <span className="text-white">12 days</span>. You are consuming credits 15% faster than last month.
            </p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-800 flex gap-3">
             <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">Buy more credits</button>
             <span className="text-slate-700">|</span>
             <button className="text-xs font-medium text-slate-400 hover:text-white transition-colors">View usage logs</button>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="rounded-xl border border-slate-800 bg-[#0B1221] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
        <div className="flex items-center justify-between p-4 border border-slate-800 rounded-lg bg-slate-900/50">
           <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center">
                 <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                 <p className="text-sm font-medium text-white">Visa ending in 4242</p>
                 <p className="text-xs text-slate-500">Expiry 12/2028</p>
              </div>
           </div>
           <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors border border-slate-700 px-3 py-1.5 rounded-md hover:bg-slate-800">
              Edit
           </button>
        </div>
      </div>

      {/* Billing History Table */}
      <div className="rounded-xl border border-slate-800 bg-[#0B1221] overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-lg font-semibold text-white">Billing History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-900/50">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Invoice ID</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { date: "Sep 01, 2025", id: "INV-00923", amount: "$49.00", status: "Paid" },
                { date: "Aug 01, 2025", id: "INV-00854", amount: "$49.00", status: "Paid" },
                { date: "Jul 01, 2025", id: "INV-00721", amount: "$49.00", status: "Paid" },
                { date: "Jun 01, 2025", id: "INV-00619", amount: "$29.00", status: "Paid" },
              ].map((invoice, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-slate-300">{invoice.date}</td>
                  <td className="px-6 py-4 text-slate-400 font-mono text-xs">{invoice.id}</td>
                  <td className="px-6 py-4 text-white font-medium">{invoice.amount}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}