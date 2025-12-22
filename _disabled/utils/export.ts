// /utils/export.ts
import { jsPDF } from "jspdf";
import { ContentSchema } from "../components/types"; 

// --- Core Helper Functions ---

const downloadFile = (data: string, filename: string, mimeType: string) => {
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const getDraftText = (data: ContentSchema): string => {
    let text = `TITLE: ${data.title || "N/A"}\n`;
    if (data.meta_or_hook) {
        text += `HOOK/META: ${data.meta_or_hook}\n\n`;
    }
    // Format body sections with proper line breaks
    text += `BODY CONTENT:\n${data.main_body_sections.join("\n\n")}\n\n`;
    text += `CTA: ${data.cta_or_closing}\n`;
    if (data.disclaimer) {
        text += `\n---\n${data.disclaimer}`;
    }
    return text.trim();
};

// --- Main Export Logic ---

export const exportContent = (
    draft: ContentSchema,
    format: "copyFullText" | "pdf" | "docx" | "markdown" | "googleDocs",
    showToast: (m: string, t: "success" | "error") => void
): void => {
    const fullText = getDraftText(draft);
    const titleSlug = (draft.title || "draft").toLowerCase().replace(/\s/g, "_");

    switch (format) {
        case "copyFullText":
            // PHASE 8 FIX: Implement copy logic directly here
            try {
                const textarea = document.createElement("textarea");
                textarea.value = fullText;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
                showToast("Full Draft copied to clipboard!", "success");
            } catch {
                showToast("Failed to copy text.", "error");
            }
            break;

        case "pdf":
            if (typeof jsPDF === "undefined") {
                return showToast("PDF Library not loaded.", "error");
            }

            const doc = new jsPDF();
            const margin = 15;
            const maxWidth = 180;
            let y = margin;

            doc.setFontSize(18);
            doc.setFont("helvetica", "bold");
            const titleLines = doc.splitTextToSize(draft.title || "Content Draft", maxWidth);
            doc.text(titleLines, margin, y);
            y += titleLines.length * 7 + 5;

            doc.setFontSize(11);
            doc.setFont("helvetica", "normal");
            const textLines = doc.splitTextToSize(fullText, maxWidth);
            doc.text(textLines, margin, y);

            doc.save(`${titleSlug}.pdf`);
            showToast("PDF exported!", "success");
            break;

        case "docx":
            // Stub: Downloads as a .doc file (MS Word will open it)
            downloadFile(fullText, `${titleSlug}.doc`, "application/msword");
            showToast("DOCX export initiated!", "success");
            break;

        case "markdown":
            // Stub: Downloads raw markdown text file
            downloadFile(fullText, `${titleSlug}.md`, "text/markdown");
            showToast("Markdown exported!", "success");
            break;

        case "googleDocs":
            // Stub: Copies text and opens a new Google Docs tab
            navigator.clipboard.writeText(fullText);
            window.open("https://docs.new", "_blank");
            showToast("Copied content + opened Google Doc!", "success");
            break;

        default:
            showToast("Unsupported export format.", "error");
    }
};