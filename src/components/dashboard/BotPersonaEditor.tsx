// 📄 Location: src/components/dashboard/BotPersonaEditor.tsx
"use client";

import React, { useState } from "react";
import { handleProAction } from "@/lib/paywall";
import { saveAgentPersona } from "@/app/actions/persona";
import PaymentRedirect from "@/components/ui/PaymentRedirect";
import { toast } from "sonner";

interface Props {
  botId: string;
  currentTier: string; // Passed from the Server Component/Page
  initialData: any;
}

export default function BotPersonaEditor({ botId, currentTier, initialData }: Props) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [personaData, setPersonaData] = useState(initialData);

  const onCommitChanges = () => {
    handleProAction(
      currentTier,
      async () => {
        // VALID PRO USER - SAVE TO DATABASE
        setIsSaving(true);
        const result = await saveAgentPersona(botId, personaData);
        if (result.success) {
          toast.success("Changes saved to Neon Database.");
        } else {
          toast.error("Database save failed.");
        }
        setIsSaving(false);
      },
      () => {
        // NOT PRO - SHOW REDIRECT OVERLAY
        setIsRedirecting(true);
      }
    );
  };

  return (
    <div className="space-y-6">
      {isRedirecting && <PaymentRedirect />}
      
      {/* UI for Persona Editing (Textareas, etc.) goes here.
         We are keeping existing UI as-is. 
      */}

      <button
        onClick={onCommitChanges}
        disabled={isSaving}
        className="w-full rounded-md bg-blue-600 py-3 text-white font-bold hover:bg-blue-700 disabled:opacity-50"
      >
        {isSaving ? "Saving..." : "Commit Changes"}
      </button>
    </div>
  );
}