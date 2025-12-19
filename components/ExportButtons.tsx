// /components/ExportButtons.tsx
"use client";

import React from "react";
import { exportContent } from "../utils/export";
import { ContentSchema } from "./types";

interface ExportMenuProps {
    currentDraft: ContentSchema;
    showToast: (message: string, type: "success" | "error") => void;
}

export function ExportMenu({ currentDraft, showToast }: ExportMenuProps) {
    if (!currentDraft) return null;

    // Handler to initiate all export types
    const handleExport = (format: "pdf" | "docx" | "markdown" | "googleDocs" | "copyFullText") => {
        try {
            // exportContent handles the specific logic based on the format
            exportContent(currentDraft, format, showToast);
        } catch (error) {
            console.error("Export failed:", error);
            showToast("Export failed. Check console for details.", "error");
        }
    };

    const baseButtonClass =
        "px-3 py-1 text-xs rounded-lg bg-neutral-700 hover:bg-neutral-600 border border-neutral-700 hover:border-emerald-500 text-white font-medium transition-colors";
        
    const primaryButtonClass =
        "px-3 py-1 text-xs rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors";

    const googleButtonClass =
        "px-3 py-1 text-xs rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors";

    return (
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-neutral-700 mt-4">
            <span className="text-sm text-neutral-400 mr-2">Export:</span>

            <button
                onClick={() => handleExport("copyFullText")}
                className={baseButtonClass}
            >
                Copy Full Text
            </button>
            
            <button
                onClick={() => handleExport("pdf")}
                className={primaryButtonClass}
            >
                Export PDF
            </button>

            <button
                onClick={() => handleExport("docx")}
                className={baseButtonClass}
            >
                Export DOCX
            </button>

            <button
                onClick={() => handleExport("markdown")}
                className={baseButtonClass}
            >
                Export Markdown
            </button>

            <button
                onClick={() => handleExport("googleDocs")}
                className={googleButtonClass}
            >
                Export to Google Docs
            </button>
        </div>
    );
}

export default ExportMenu;