"use client";

import React, { useState } from "react";
import { X, Check, Zap, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal = ({ isOpen, onClose }: UpgradeModalProps) => {
  const [loading, setLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Pricing Logic (Visuals)
  const price = billingCycle === 'monthly' ? 39 : 390;
  const savings = billingCycle === 'yearly' ? "Save £78" : null;

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      
      // Select the correct ID based on the toggle
      // Ensure these start with NEXT_PUBLIC_ in your .env.local file
      const priceId = billingCycle === 'monthly' 
        ? process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY 
        : process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY;

      if (!priceId) {
        console.error("Price ID missing in environment variables");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }), // Send the specific ID
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        console.error("No checkout URL returned", data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-[#0F172A] border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="p-8 text-center bg-gradient-to-b from-indigo-900/20 to-transparent">
            <div className="w-16 h-16 mx-auto mb-6 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
              <Zap className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Unlock Pro Power</h2>
            <p className="text-slate-400 text-sm">Remove limits and automate your entire workflow.</p>
          </div>

          {/* Billing Toggle */}
          <div className="px-8 flex justify-center mb-6">
            <div className="flex bg-slate-800/50 p-1 rounded-lg border border-slate-700">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                  billingCycle === 'monthly' 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${
                  billingCycle === 'yearly' 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Yearly
                <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  -17%
                </span>
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className="px-8 pb-8 space-y-4">
            <div className="space-y-3">
              {[
                "Unlimited AI Generations",
                "Advanced Rewrite Modes",
                "Full Version History & No Watermark",
                "Priority Support"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                    <Check className="w-3 h-3" />
                  </div>
                  {benefit}
                </div>
              ))}
            </div>

            {/* Action Button - FIXED WITH TYPE="BUTTON" */}
            <button
              type="button"
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full mt-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 active:scale-95 flex flex-col items-center justify-center gap-1"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Redirecting...
                </div>
              ) : (
                <>
                  <span className="text-base">Upgrade for £{price} / {billingCycle}</span>
                  {savings && (
                    <span className="text-[10px] font-normal opacity-90 text-indigo-200">
                      (Pay £390/yr • {savings})
                    </span>
                  )}
                </>
              )}
            </button>
            
            <p className="text-center text-[10px] text-slate-600 mt-4">
              Secure payment via Stripe. Cancel anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};