// /data/templates.ts

export interface TemplateDefinition {
    id: string;
    label: string;
    structure: string;
}

export const TEMPLATE_DEFINITIONS: TemplateDefinition[] = [
    {
        id: "None",
        label: "None (Standard Structure)",
        structure: ""
    },
    {
        id: "AIDA",
        label: "AIDA (Attention, Interest, Desire, Action)",
        structure: "Structure the main body content clearly using the AIDA model: 1. Attention (Bold Hook) 2. Interest (Engaging Facts/Story) 3. Desire (Benefit/Transformation) 4. Action (Clear CTA)."
    },
    {
        id: "PAS",
        label: "PAS (Problem, Agitate, Solve)",
        structure: "Structure the main body content clearly using the PAS model: 1. Problem (Identify core pain) 2. Agitate (Intensify the consequences of the problem) 3. Solve (Introduce the solution/topic)."
    },
    {
        id: "Hero Journey",
        label: "Hero Journey",
        structure: "Structure the content using the Hero's Journey framework: 1. The Ordinary World 2. The Call to Adventure 3. The Ordeal 4. The Reward 5. The Return Home (Applying the lessons)."
    },
    {
        id: "Problem-Solution-Benefit",
        label: "Problem-Solution-Benefit",
        structure: "Structure the content using three clearly defined sections: 1. A detailed articulation of the Problem. 2. A description of the Solution. 3. A clear list of Benefits derived from the solution."
    },
    {
        id: "Educational Thread",
        label: "Educational Thread",
        structure: "Structure the content as a step-by-step educational thread or list (e.g., Step 1, Step 2, etc.) for teaching a specific concept."
    },
    {
        id: "Announcement",
        label: "Announcement",
        structure: "Structure the content to deliver news or a product release: 1. Hook/Headline 2. Context/Why we built this 3. Feature details 4. Availability/Next steps."
    },
];