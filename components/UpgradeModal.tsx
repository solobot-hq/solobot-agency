"use client";

import { X } from "lucide-react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-[#0B1221] border border-white/10 rounded-3xl p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-2 text-center">
          Upgrade to Pro
        </h2>

        <p className="text-center text-zinc-400 mb-6">
          Unlimited agency-level automation
        </p>

        <div className="text-center mb-6">
          <span className="text-4xl font-black text-white">£99</span>
          <span className="text-zinc-400"> / month</span>
        </div>

        <button
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl"
          onClick={() => {
            // EXISTING upgrade flow triggers elsewhere
            onClose();
          }}
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
}
