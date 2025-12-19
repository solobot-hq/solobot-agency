type ContentMode = "Blog" | "LinkedIn" | "Email" | "Script" | "SalesLetter";
type WritingTone = "Professional/Neutral" | "Casual" | "Aggressive" | "Salesy" | "Formal" | "Authority" | (string & {}); 
type Template = "None" | "AIDA" | "PAS" | "Educational Thread" | "Storytelling Hook" | "Case Study" | "Announcement" | "Promo Offer";


export interface ContentSchema {
    title: string;
    meta_or_hook: string;
    main_body_sections: string[];
    cta_or_closing: string;
    disclaimer: string;
}

export interface FormInputs {
    topic_or_key_message: string;
    mode: ContentMode;
    tone: WritingTone;
    word_count?: number;
    template: Template;
    persona_style: string;
}

export interface Draft extends ContentSchema {
    id: string;
    mode: ContentMode;
    tone: WritingTone;
    word_count?: number;
    key_message: string;
    date: string;
    template: Template;
    persona_style: string;
}

export interface CustomPersona {
    id: string;
    styleMemoryText: string;
}

export interface CustomTemplate {
    id: string;
    label: string;
    structure: string;
}

export const DEFAULT_WORD_COUNTS: Record<ContentMode, number> = {
    Blog: 500,
    LinkedIn: 150,
    Email: 250,
    Script: 300,
    SalesLetter: 750,
};

export const MODES: { id: ContentMode; label: string }[] = [
    { id: "Blog", label: "Blog Post" },
    { id: "LinkedIn", label: "LinkedIn Post" },
    { id: "Email", label: "Email" },
    { id: "Script", label: "YouTube/TikTok Script" },
    { id: "SalesLetter", label: "Sales Letter" },
];

export const TONES: WritingTone[] = [
    "Professional/Neutral",
    "Casual",
    "Aggressive",
    "Salesy",
    "Formal",
    "Authority",
];

export const STORAGE_KEYS = {
    PERSONAS: 'solobot_custom_personas',
    TEMPLATES: 'solobot_custom_templates',
};