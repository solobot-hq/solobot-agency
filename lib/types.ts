import { z } from "zod";

// =============== REQUEST SCHEMA ===============
export const searchRequestSchema = z.object({
  query: z.string().min(1, "Industry/Niche is required").trim(),
  location: z.string().min(1, "Location is required").trim(),
  minFilter: z.string().optional(),
});

// =============== TYPES ===============
// Type for input query after validation
export type SearchQuery = z.infer<typeof searchRequestSchema> & { id?: number }; // Add optional id for history


// Type for data coming *from* the scrapers BEFORE email enrichment
export interface ScrapedLead {
  name: string;
  website: string | null;
  email?: string | null;
  phone: string | null;
  address?: string | null; // Full address string if available
  sizeOrRevenue?: string | null; // Can be years active, employee count etc. depending on source
  source: 'yelp' | 'opencorporates'; // Ensure source is typed
}

// ✅ Ensure Zod schemas are EXPORTED
// Zod schema for the FINAL strict output object
export const FinalLeadOutputSchema = z.object({
  business_name: z.string().min(1, { message: "Business name cannot be empty"}),
  website: z.string().default('N/A'),
  email: z.string().default('N/A'),
  phone: z.string().default('N/A'),
  industry: z.string().default('Unknown'),
  revenue_estimate: z.string().default('N/A'),
  years_active: z.string().default('N/A'),
  location: z.string().default('N/A') // Expecting City/State or similar summary
});

// Type derived from Zod schema for the final output
export type FinalLeadOutput = z.infer<typeof FinalLeadOutputSchema>;

// ✅ Ensure Zod schemas are EXPORTED
// Zod schema for the array of final outputs (used for seeding validation)
export const FinalLeadOutputArraySchema = z.array(FinalLeadOutputSchema).min(0); // Allow 0 for safety if seeding fails


// Type for the overall API response
export interface SearchResponse {
  leads: FinalLeadOutput[];
  meta: {
    tookMs: number;
    sourceCounts?: { // Make optional as seed won't have counts
      yelp: number;
      opencorporates: number;
    };
    fallbackApiCallCount: number;
    source?: 'scrape_enrich' | 'fallback_seed'; // Flag for UI banner logic
  };
}

