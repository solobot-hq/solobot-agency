import { z } from "zod";

// =============== REQUEST SCHEMA ===============
/**
 * Schema for initial search requests.
 */
export const searchRequestSchema = z.object({
  query: z.string().min(1, "Industry/Niche is required").trim(),
  location: z.string().min(1, "Location is required").trim(),
  minFilter: z.string().optional(),
});

// =============== TYPES ===============
export type SearchQuery = z.infer<typeof searchRequestSchema> & { id?: number };

/**
 * Interface for raw data received from scrapers.
 */
export interface ScrapedLead {
  name: string;
  website: string | null;
  email?: string | null;
  phone: string | null;
  address?: string | null;
  sizeOrRevenue?: string | null;
  source: 'yelp' | 'opencorporates';
}

/**
 * Standardized Lead interface used throughout the application.
 */
export interface Lead {
  name: string;
  website: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  sizeOrRevenue: string | null;
  source: string;
}

export type PartialLead = Partial<Lead> & { name: string; source: string };

// =============== ZOD SCHEMAS ===============
/**
 * Final schema for lead output, including default values for missing data.
 */
export const FinalLeadOutputSchema = z.object({
  business_name: z.string().min(1, { message: "Business name cannot be empty"}),
  website: z.string().default('N/A'),
  email: z.string().default('N/A'),
  phone: z.string().default('N/A'),
  industry: z.string().default('Unknown'),
  revenue_estimate: z.string().default('N/A'),
  years_active: z.string().default('N/A'),
  location: z.string().default('N/A')
});

export type FinalLeadOutput = z.infer<typeof FinalLeadOutputSchema>;
export const FinalLeadOutputArraySchema = z.array(FinalLeadOutputSchema).min(0);

/**
 * Interface for the standard API search response.
 */
export interface SearchResponse {
  leads: FinalLeadOutput[];
  meta: {
    tookMs: number;
    sourceCounts?: {
      yelp: number;
      opencorporates: number;
    };
    fallbackApiCallCount: number;
    source?: 'scrape_enrich' | 'fallback_seed';
  };
}