// 📄 Location: src/components/ui/PaymentRedirect.tsx
"use client";

import { Loader2 } from "lucide-react";

export default function PaymentRedirect() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
      <div className="flex flex-col items-center gap-4 text-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <h2 className="text-xl font-semibold text-slate-900">Redirecting to secure checkout...</h2>
        <p className="text-sm text-slate-500">Please do not close this window.</p>
      </div>
    </div>
  );
}