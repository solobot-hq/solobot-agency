import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@clerk/nextjs/server'; 
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

import { scrapeYelp } from '@/lib/scrape/yelp';
import { scrapeOpenCorporates } from '@/lib/scrape/opencorporates';
import { findEmailsForLeads } from '@/lib/email/extract';
import { mergeLeads } from '@/lib/merge';
import { logToFile } from '@/lib/logger';
import {
    searchRequestSchema,
    ScrapedLead,
    Lead, // ✅ Added Lead to imports
    FinalLeadOutput,
    FinalLeadOutputSchema,
    FinalLeadOutputArraySchema
} from '@/lib/types';

// --- Gemini Configuration ---
let genAIInstance: GoogleGenerativeAI | null = null;
try {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY environment variable is not set.");
    }
    genAIInstance = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    logToFile('scrape: GoogleGenerativeAI client initialized successfully.');
} catch (error: any) {
    logToFile(`error: CRITICAL: Failed to initialize GoogleGenerativeAI: ${error.message}`);
    console.error("CRITICAL: Failed to initialize GoogleGenerativeAI:", error);
}

const getModel = (modelName: string, config?: any, safetySettings?: any) => {
    if (!genAIInstance) {
        logToFile(`error: Cannot get model ${modelName}: Gemini client not initialized.`);
        return null;
    }
    try {
        return genAIInstance.getGenerativeModel({ model: modelName, generationConfig: config, safetySettings });
    } catch (error: any) {
        logToFile(`error: Failed to get Gemini model ${modelName}: ${error.message}`);
        console.error(`Failed to get Gemini model ${modelName}:`, error);
        return null;
    }
};

const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

const enrichmentConfig = {
    responseMimeType: "application/json",
    responseSchema: {
      type: "OBJECT" as const,
      properties: {
        website: { type: "STRING" as const, description: "Company website URL" },
        email: { type: "STRING" as const, description: "Company contact email" },
        phone: { type: "STRING" as const, description: "Company phone number" },
        industry: { type: "STRING" as const, description: "Specific industry/niche" },
        revenue_estimate: { type: "STRING" as const, description: "Estimated annual revenue (e.g., $1M-$5M)" },
        years_active: { type: "STRING" as const, description: "How long the company has been active (e.g., 10 years)" },
        location: { type: "STRING" as const, description: "Primary location (City, State/Country)" },
      },
   },
};

const seedingConfig = {
    responseMimeType: "application/json",
    responseSchema: {
        type: "ARRAY" as const,
        items: {
          type: "OBJECT" as const,
          properties: {
             business_name: { type: "STRING" as const, description: "Plausible UK business name" },
             website: { type: "STRING" as const, description: "Plausible .co.uk or .com website URL" },
             email: { type: "STRING" as const, description: "Plausible business email (info@, contact@)" },
             phone: { type: "STRING" as const, description: "Plausible UK phone number (020, 0161, etc.)" },
             industry: { type: "STRING" as const, description: "Specific industry related to query" },
             revenue_estimate: { type: "STRING" as const, description: "Estimated revenue (£500k-£1M, £2M+)" },
             years_active: { type: "STRING" as const, description: "Years active (e.g., 5 years, Since 2010)" },
             location: { type: "STRING" as const, description: "Location in the UK (e.g., London, Manchester)" },
          },
          required: ["business_name", "website", "email", "phone", "industry", "revenue_estimate", "years_active", "location"]
        }
    },
};

const ensureString = (value: any, defaultValue = "N/A"): string => {
    if (value === null || typeof value === 'undefined' || String(value).trim() === '') {
        return defaultValue;
    }
    return String(value).replace(/<\/?[^>]+(>|$)/g, "").trim();
};

function parseRevenue(revenueStr: string): number | null {
    const raw = String(revenueStr).trim().toLowerCase();
    if (!raw || raw === "n/a") return null;
    const numMatch = raw.match(/([\d.,]+)/);
    if (!numMatch) return null;
    let num = parseFloat(numMatch[1].replace(/[,]/g, ''));
    if (raw.includes('m') || raw.includes('million')) num *= 1000000;
    else if (raw.includes('k') || raw.includes('thousand')) num *= 1000;
    return num;
}

function parseYears(yearsStr: string): number | null {
    const raw = String(yearsStr).trim().toLowerCase();
    if (!raw || raw === "n/a") return null;
    const currentYear = new Date().getFullYear();
    const sinceMatch = raw.match(/(since|est|established)\s*(\d{4})/);
    if (sinceMatch && sinceMatch[2]) {
        const year = parseInt(sinceMatch[2], 10);
        if (year > 1800 && year <= currentYear) return currentYear - year;
    }
    const numMatch = raw.match(/(\d+)/);
    if (numMatch && numMatch[1]) return parseInt(numMatch[1], 10);
    return null;
}

async function enrichWithGeminiSeed(query: string, location: string, minFilter: string | undefined): Promise<FinalLeadOutput[]> {
    logToFile(`[Seed] Triggering Gemini seed generation for Query: "${query}", Location: "${location}".`);
    const seedingModel = getModel("gemini-1.5-flash", seedingConfig, safetySettings);
    if (!seedingModel) return [];
    const fallbackPrompt = `Generate a list of exactly 10 plausible business leads for '${query}' in '${location}'. Include ALL fields. JSON format.`;
    try {
        const result = await seedingModel.generateContent(fallbackPrompt);
        const parsedJson = JSON.parse(result.response.text());
        const validation = FinalLeadOutputArraySchema.safeParse(parsedJson);
        if (!validation.success) return [];
        return validation.data.map(lead => ({
                 business_name: ensureString(lead.business_name, "Unknown Seed Business"),
                 website: ensureString(lead.website),
                 email: ensureString(lead.email),
                 phone: ensureString(lead.phone),
                 industry: ensureString(lead.industry, query),
                 revenue_estimate: ensureString(lead.revenue_estimate),
                 years_active: ensureString(lead.years_active),
                 location: ensureString(lead.location, location),
        }));
    } catch (apiError: any) {
        return [];
    }
}

export async function POST(request: Request) {
    const startTime = Date.now();
    let yelpCount = 0;
    let openCorpCount = 0;
    let fallbackApiCallCount = 0;
    let isSeedGeneration = false;

    logToFile("scrape: Leads search request received.");

    let reqBody;
    try {
        reqBody = await request.json();
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const validation = searchRequestSchema.safeParse(reqBody);
    if (!validation.success) {
        return NextResponse.json({ error: 'Invalid request', details: validation.error.flatten() }, { status: 400 });
    }

    // ✅ Await auth() for Next.js 16
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { query, location, minFilter } = validation.data;

    let minYears: number | null = null;
    let minRevenue: number | null = null;
    if (minFilter) {
        const raw = String(minFilter).trim();
        if (/^[\d.]+$/.test(raw)) minYears = parseInt(raw, 10);
        else if (/[kKm M£$€]/.test(raw)) minRevenue = parseRevenue(raw);
    }

    try {
        logToFile("scrape: Starting scrapers...");
        const [yelpLeads, openCorpLeads] = await Promise.all([
            scrapeYelp(query, location).catch(() => []),
            scrapeOpenCorporates(query, location).catch(() => []),
        ]);
        yelpCount = yelpLeads.length;
        openCorpCount = openCorpLeads.length;

        // ✅ FIX: Use Lead[] type instead of ScrapedLead[] to resolve build error
        let mergedLeads: Lead[] = mergeLeads(yelpLeads, openCorpLeads);

        if (mergedLeads.some(l => l.website)) {
            try {
                // Casting to any briefly for findEmails, or updating extract.ts to accept Lead[]
                mergedLeads = await findEmailsForLeads(mergedLeads as any);
            } catch (emailError: any) {
                logToFile(`error: [EmailExtract] Failed: ${emailError.message}`);
            }
        }

        let finalLeads: FinalLeadOutput[] = [];

        if (mergedLeads.length > 0) {
             const enrichmentModel = getModel("gemini-1.5-flash", enrichmentConfig, safetySettings);

             for (const scrapedLead of mergedLeads) {
                 let enrichedData: any = {};
                 if (enrichmentModel) {
                     fallbackApiCallCount++;
                     const prompt = `Enrich business data for: ${scrapedLead.name}. Return JSON.`;
                     try {
                         const result = await enrichmentModel.generateContent(prompt);
                         enrichedData = JSON.parse(result.response.text());
                     } catch (apiError: any) {}
                 }

                 finalLeads.push({
                     business_name: ensureString(scrapedLead.name),
                     website: ensureString(scrapedLead.website || enrichedData.website),
                     email: ensureString(scrapedLead.email || enrichedData.email),
                     phone: ensureString(scrapedLead.phone || enrichedData.phone),
                     industry: ensureString(enrichedData.industry),
                     revenue_estimate: ensureString(enrichedData.revenue_estimate),
                     years_active: ensureString(enrichedData.years_active),
                     location: ensureString(enrichedData.location || location)
                 });
             }
        }

        if (finalLeads.length === 0) {
             finalLeads = await enrichWithGeminiSeed(query, location, minFilter);
             isSeedGeneration = true;
             fallbackApiCallCount = finalLeads.length > 0 ? 1 : 0;
        }
        
        if ((minYears !== null || minRevenue !== null) && finalLeads.length > 0) {
            finalLeads = finalLeads.filter(lead => {
                if (minYears !== null) {
                    const years = parseYears(lead.years_active);
                    if (years !== null && years < minYears) return false;
                }
                if (minRevenue !== null) {
                    const revenue = parseRevenue(lead.revenue_estimate);
                    if (revenue !== null && revenue < minRevenue) return false;
                }
                return true; 
            });
        }

        return NextResponse.json({
            leads: finalLeads,
            meta: {
                tookMs: Date.now() - startTime,
                sourceCounts: { yelp: yelpCount, opencorporates: openCorpCount },
                fallbackApiCallCount,
                source: isSeedGeneration ? 'fallback_seed' : 'scrape_enrich',
            },
        });

    } catch (error: any) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}