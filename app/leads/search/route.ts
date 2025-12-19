import { NextResponse } from 'next/server';
import { z } from 'zod'; // Keep the standard Zod import
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

import { scrapeYelp } from '@/lib/scrape/yelp';
import { scrapeOpenCorporates } from '@/lib/scrape/opencorporates';
import { findEmailsForLeads } from '@/lib/email/extract';
import { mergeLeads } from '@/lib/merge';
import { logToFile } from '@/lib/logger';
import {
    searchRequestSchema,
    ScrapedLead,
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
    logToFile('scrape', 'GoogleGenerativeAI client initialized successfully.');
} catch (error: any) {
    logToFile('error', `CRITICAL: Failed to initialize GoogleGenerativeAI: ${error.message}`);
    console.error("CRITICAL: Failed to initialize GoogleGenerativeAI:", error);
}

const getModel = (modelName: string, config?: any, safetySettings?: any) => {
    if (!genAIInstance) {
        logToFile('error', `Cannot get model ${modelName}: Gemini client not initialized.`);
        return null;
    }
    try {
        return genAIInstance.getGenerativeModel({ model: modelName, generationConfig: config, safetySettings });
    } catch (error: any) {
        logToFile('error', `Failed to get Gemini model ${modelName}: ${error.message}`);
        console.error(`Failed to get Gemini model ${modelName}:`, error);
        return null;
    }
};

// Common Safety Settings
const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

// Config for SINGLE lead enrichment
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


// Config for SEEDING multiple leads
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

// Helper remains the same
const ensureString = (value: any, defaultValue = "N/A"): string => {
    if (value === null || typeof value === 'undefined' || String(value).trim() === '') {
        return defaultValue;
    }
    return String(value).replace(/<\/?[^>]+(>|$)/g, "").trim();
};

// --- Helper function to parse revenue strings ---
/**
 * Parses a revenue string (e.g., "$1M-$5M", "£500k+", "Under $100k") into a comparable number.
 * Takes the lower bound for ranges, or the only number present.
 * Returns null if the value is "N/A" or cannot be parsed.
 */
function parseRevenue(revenueStr: string): number | null {
    const raw = String(revenueStr).trim().toLowerCase();
    if (!raw || raw === "n/a") return null; // Return null for N/A

    // Standardize 'under'/'below' to a low number for comparison (e.g., 1)
    if (raw.startsWith('under') || raw.startsWith('below')) {
         const numMatch = raw.match(/([\d.,]+)/);
         if (numMatch) {
             let num = parseFloat(numMatch[1].replace(/[,]/g, ''));
             if (raw.includes('m') || raw.includes('million')) num *= 1000000;
             else if (raw.includes('k') || raw.includes('thousand')) num *= 1000;
             return num * 0.99; // Return slightly less than the "under" value
         }
         return 1; // Default for "under..." if no number found
    }

    const numMatch = raw.match(/([\d.,]+)/); // Find first number
    if (!numMatch) return null; // No number found

    let num = parseFloat(numMatch[1].replace(/[,]/g, ''));
    
    if (raw.includes('m') || raw.includes('million')) {
        num *= 1000000;
    } else if (raw.includes('k') || raw.includes('thousand')) {
        num *= 1000;
    }
    
    return num;
}


// --- Helper function to parse years_active strings ---
/**
 * Parses various "years active" strings ("Since 2003", "10+ years", "5 years") into a number.
 * Returns null if the value is "N/A" or cannot be parsed.
 */
function parseYears(yearsStr: string): number | null {
    const raw = String(yearsStr).trim().toLowerCase();
    if (!raw || raw === "n/a") return null; // Return null for N/A

    const currentYear = new Date().getFullYear();

    // Handle "Since 2003" or "Established 1980"
    const sinceMatch = raw.match(/(since|est|established)\s*(\d{4})/);
    if (sinceMatch && sinceMatch[2]) {
        const year = parseInt(sinceMatch[2], 10);
        if (year > 1800 && year <= currentYear) {
            return currentYear - year; // Return immediately
        }
    }

    // Handle "12 years", "5+ years", "Over 25 years"
    const numMatch = raw.match(/(\d+)/); // Find the first number
    if (numMatch && numMatch[1]) {
        return parseInt(numMatch[1], 10); // Return immediately
    }
    
    return null; // Return null if no match
}


// Function to seed leads using Gemini when scraping fails
async function enrichWithGeminiSeed(query: string, location: string, minFilter: string | undefined): Promise<FinalLeadOutput[]> {
    logToFile('scrape', `[Seed] Triggering Gemini seed generation for Query: "${query}", Location: "${location}".`);

    const seedingModel = getModel("gemini-2.5-flash-preview-09-2025", seedingConfig, safetySettings);
    if (!seedingModel) {
        logToFile('error', '[Seed] Cannot generate seeds: Gemini seeding model initialization failed.');
        return [];
    }

    const fallbackPrompt = `Generate a list of exactly 10 plausible, realistic-looking (but can be fictional) business leads matching the niche '${query}' in or near location '${location}'.
    ${minFilter ? `Consider this filter for context (e.g., target companies older than, or with revenue above): ${minFilter}. ` : ''}
    Include ALL fields: business_name, website (plausible https URL, avoid placeholders like example.com), email (plausible format like info@domain.com or contact@domain.co.uk), phone (plausible local format for ${location}), industry (be specific, related to ${query}), location (city, state/country like ${location}), revenue_estimate (e.g., "$1M-$5M", "$500k+", " bootstrapped", "Under $100k"), years_active (e.g., "5 years", "Since 2010", "10+ years").
    Return ONLY a valid JSON array matching the schema. Ensure website, email, phone look realistic and belong to different fictional companies. Do not include any explanatory text before or after the JSON array.`;

    try {
        logToFile('scrape', '[Seed] Calling Gemini API for seed generation...');
        const result = await seedingModel.generateContent(fallbackPrompt);
        const response = result.response;
        logToFile('scrape', '[Seed] Received response from Gemini API.');

        if (!response || !response.candidates || response.candidates.length === 0) {
            const blockReason = response?.promptFeedback?.blockReason;
            const safetyRatings = response?.promptFeedback?.safetyRatings;
            logToFile('error', `[Seed] Gemini API returned no candidates. Block Reason: ${blockReason || 'N/A'}. Safety Ratings: ${JSON.stringify(safetyRatings)}`);
            console.error('[Seed] Gemini API returned no candidates.', { blockReason, safetyRatings });
            return [];
        }
        const text = response.text();
        logToFile('scrape', `[Seed] Raw Gemini response text received (length: ${text.length}).`);

        try {
            const parsedJson = JSON.parse(text);
            logToFile('scrape', '[Seed] Successfully parsed JSON response.');

            if (!FinalLeadOutputArraySchema) {
                 logToFile('error', '[Seed] CRITICAL: FinalLeadOutputArraySchema could not be imported/found.');
                 console.error('[Seed] CRITICAL: FinalLeadOutputArraySchema could not be imported/found.');
                 return [];
            }
            const validation = FinalLeadOutputArraySchema.safeParse(parsedJson);

            if (!validation.success) {
                logToFile('error', `[Seed] Gemini response failed Zod validation: ${JSON.stringify(validation.error.flatten())}. Raw response snippet: ${text.substring(0, 200)}`);
                console.error("[Seed] Zod Validation Error:", validation.error.flatten());
                return [];
            }
            logToFile('scrape', '[Seed] Zod validation successful.');

            const seededLeads = validation.data.map(lead => ({
                 business_name: ensureString(lead.business_name, "Unknown Seed Business"),
                 website: ensureString(lead.website),
                 email: ensureString(lead.email),
                 phone: ensureString(lead.phone),
                 industry: ensureString(lead.industry, query),
                 revenue_estimate: ensureString(lead.revenue_estimate),
                 years_active: ensureString(lead.years_active),
                 location: ensureString(lead.location, location),
            }));

            logToFile('scrape', `[Seed] Gemini successfully generated and validated ${seededLeads.length} seed leads.`);
            return seededLeads;

        } catch (parseError: any) {
             logToFile('error', `[Seed] Gemini fallback failed: Could not parse JSON response - Error: ${parseError.message}. Snippet: ${text.substring(0, 200)}`);
             console.error("[Seed] JSON Parse Error:", parseError, "Response Text Snippet:", text.substring(0, 200));
             return [];
        }
    } catch (apiError: any) {
         const details = apiError.details || apiError.message;
        logToFile('error', `[Seed] Gemini fallback API call failed: ${details}`);
        console.error("[Seed] Gemini API Error:", apiError);
        return [];
    }
}


export async function POST(request: Request) {
    const startTime = Date.now();
    let yelpCount = 0;
    let openCorpCount = 0;
    let fallbackApiCallCount = 0;
    let isSeedGeneration = false;

    logToFile("scrape", "==================================================");
    logToFile("scrape", "Leads search request received.");

    let reqBody;
    try {
        reqBody = await request.json();
    } catch (error) {
        logToFile("error", "Failed to parse request body.");
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const validation = searchRequestSchema.safeParse(reqBody);
    if (!validation.success) {
        logToFile("error", `Invalid search request: ${JSON.stringify(validation.error.flatten())}`);
        return NextResponse.json({ error: 'Invalid request', details: validation.error.flatten() }, { status: 400 });
    }
    const { query, location, minFilter } = validation.data;
    logToFile("scrape", `Validated search - Query: "${query}", Location: "${location}", Filter: "${minFilter || 'N/A'}"`);

    // ✅ IMPLEMENTATION: Smart Detection
    let minYears: number | null = null;
    let minRevenue: number | null = null;
    if (minFilter) {
        const raw = String(minFilter).trim();
        // If plain number (e.g., "25") -> treat as YEARS
        if (/^[\d.]+$/.test(raw)) { 
            minYears = parseInt(raw, 10);
            if (!isNaN(minYears)) {
                logToFile('scrape', `[Filter] Detected AGE filter: >= ${minYears} years`);
            } else {
                minYears = null; // Reset if parsing failed
            }
        }
        // If contains letters (K/M/£/$) -> treat as REVENUE
        else if (/[kKm M£$€]/.test(raw)) { 
            minRevenue = parseRevenue(raw); // Use our new helper
             if (minRevenue !== null && minRevenue > 0) {
                logToFile('scrape', `[Filter] Detected REVENUE filter: >= ${minRevenue}`);
            } else {
                minRevenue = null; // Reset if parsing failed
            }
        } else {
            logToFile('scrape', `[Filter] Ignoring ambiguous filter: "${minFilter}"`);
        }
    }
    // --- End Smart Detection ---


    if (!genAIInstance) {
         logToFile('error', "CRITICAL: Gemini AI client not initialized. Cannot proceed with enrichment or seeding.");
         return NextResponse.json({ error: 'Service configuration error: AI client failed to initialize.' }, { status: 500 });
    }


    try {
        logToFile("scrape", "Starting scrapers...");
        const [yelpLeads, openCorpLeads] = await Promise.all([
            scrapeYelp(query, location).catch(err => {
                logToFile('error', `[Scrape-Yelp] Failed during execution: ${err.message}`);
                console.error("[Scrape-Yelp] Error:", err);
                return [];
            }),
            scrapeOpenCorporates(query, location).catch(err => {
                logToFile('error', `[Scrape-OC] Failed during execution: ${err.message}`);
                console.error("[Scrape-OC] Error:", err);
                return [];
            }),
        ]);
        yelpCount = yelpLeads.length;
        openCorpCount = openCorpLeads.length;
        logToFile("scrape", `Scraping finished: Found ${yelpCount} Yelp leads, ${openCorpCount} OpenCorp leads.`);

        let mergedLeads: ScrapedLead[] = mergeLeads(yelpLeads, openCorpLeads);
        logToFile("scrape", `Merged leads: ${mergedLeads.length} unique leads after deduplication.`);

        if (mergedLeads.some(l => l.website)) {
            logToFile("scrape", `Starting email extraction for ${mergedLeads.filter(l=>l.website).length} leads with websites...`);
            try {
                mergedLeads = await findEmailsForLeads(mergedLeads);
                const emailsFoundCount = mergedLeads.filter(l => l.email).length;
                logToFile("scrape", `Email extraction finished: Found emails for ${emailsFoundCount} leads.`);
            } catch (emailError: any) {
                logToFile('error', `[EmailExtract] Failed during execution: ${emailError.message}`);
                console.error("[EmailExtract] Error:", emailError);
            }
        } else {
             logToFile("scrape", `Skipping email extraction: No leads have websites.`);
        }

        let finalLeads: FinalLeadOutput[] = [];

        // This runs ONLY if mergedLeads > 0
        if (mergedLeads.length > 0) {
             logToFile("scrape", `Starting final formatting and enrichment for ${mergedLeads.length} scraped leads...`);
             const enrichmentModel = getModel("gemini-2.5-flash-preview-09-2025", enrichmentConfig, safetySettings);

             if (!enrichmentModel) {
                 logToFile('error', '[Enrich] Cannot enrich leads: Gemini enrichment model initialization failed.');
             }

             for (const scrapedLead of mergedLeads) {
                 let enrichedData: Partial<FinalLeadOutput> = {};

                 const currentLeadCheck: Partial<FinalLeadOutput> = {
                     business_name: scrapedLead.name,
                     website: scrapedLead.website,
                     email: scrapedLead.email,
                     phone: scrapedLead.phone,
                     industry: 'Unknown',
                     revenue_estimate: (scrapedLead.source === 'yelp' ? scrapedLead.sizeOrRevenue : null), // yelp often provides price range here
                     years_active: (scrapedLead.source === 'opencorporates' ? scrapedLead.sizeOrRevenue : 'N/A'), // opencorporates provides date here
                     location: scrapedLead.address ? scrapedLead.address.split(',').slice(-2).join(',').trim() : location // City, State/Country
                 };

                 const requiredFields: (keyof FinalLeadOutput)[] = [
                     'website', 'email', 'phone', 'industry',
                     'revenue_estimate', 'years_active', 'location'
                 ];

                 const missingFields = requiredFields.filter(field =>
                     !ensureString((currentLeadCheck as any)[field], "")
                 );


                 if (missingFields.length > 0 && enrichmentModel) {
                     logToFile("scrape", `Lead "${scrapedLead.name}" missing fields: ${missingFields.join(', ')}. Triggering API fallback.`);
                     fallbackApiCallCount++;

                     const prompt = `Act as a business data enrichment API. Given the business name and potentially partial info, find the missing information. Only return the requested fields. If information is not publicly available, return "N/A".
                     Business Name: ${scrapedLead.name}
                     Known Location/Address: ${scrapedLead.address || location}
                     Known Website: ${scrapedLead.website || 'Not provided'}
                     Find ONLY these missing fields: ${missingFields.join(', ')}
                     Return ONLY JSON matching the schema with these properties: ${missingFields.join(', ')}. Do not include fields not requested.`;

                     try {
                         const result = await enrichmentModel.generateContent(prompt);
                         const response = result.response;

                         if (!response || !response.candidates || response.candidates.length === 0) {
                            const blockReason = response?.promptFeedback?.blockReason;
                            logToFile('error', `[Enrich] Gemini API returned no candidates for "${scrapedLead.name}". Block Reason: ${blockReason || 'N/A'}`);
                            console.error(`[Enrich] Gemini API returned no candidates for "${scrapedLead.name}".`, { blockReason });
                         } else {
                             const text = response.text();
                             try {
                                 const parsedJson = JSON.parse(text);
                                 if (!FinalLeadOutputSchema) {
                                     logToFile('error', `[Enrich] CRITICAL: FinalLeadOutputSchema is undefined for "${scrapedLead.name}".`);
                                     console.error(`[Enrich] CRITICAL: FinalLeadOutputSchema is undefined for "${scrapedLead.name}".`);
                                 } else {
                                     const validation = FinalLeadOutputSchema.partial().safeParse(parsedJson);
                                     if (!validation.success) {
                                          logToFile('error', `[Enrich] Gemini response failed Zod validation for "${scrapedLead.name}": ${JSON.stringify(validation.error.flatten())}. Raw response snippet: ${text.substring(0, 200)}`);
                                          console.error("[Enrich] Zod Validation Error:", validation.error.flatten());
                                     } else {
                                          enrichedData = Object.fromEntries(
                                             Object.entries(validation.data)
                                                 .filter(([key]) => missingFields.includes(key as keyof FinalLeadOutput))
                                                 .map(([key, value]) => [key, ensureString(value)])
                                          );
                                          logToFile("scrape", `API fallback for "${scrapedLead.name}" successful. Found data for keys: ${Object.keys(enrichedData).join(', ')}`);
                                     }
                                 }
                             } catch (parseError: any) {
                                 logToFile('error', `[Enrich] Gemini fallback failed: Could not parse JSON response for "${scrapedLead.name}" - Error: ${parseError.message}. Snippet: ${text.substring(0, 200)}`);
                                 console.error("[Enrich] JSON Parse Error:", parseError, "Response Text Snippet:", text.substring(0, 200));
                             }
                         }
                     } catch (apiError: any) {
                         const details = apiError.details || apiError.message;
                         logToFile('error', `[Enrich] Gemini fallback API call failed for "${scrapedLead.name}": ${details}`);
                         console.error("[Enrich] Gemini API Error:", apiError);
                     }
                 } else if (missingFields.length > 0 && !enrichmentModel) {
                      logToFile('error', `[Enrich] Skipping enrichment for "${scrapedLead.name}": Gemini enrichment model not initialized.`);
                 }
                 else {
                      logToFile("scrape", `Lead "${scrapedLead.name}" has sufficient data from scraping/email extraction.`);
                 }

                 // --- Construct Final Output ---
                 const finalLead: FinalLeadOutput = {
                     business_name: ensureString(scrapedLead.name, "Unknown Business"),
                     website: ensureString(scrapedLead.website || enrichedData.website, "N/A"),
                     email: ensureString(scrapedLead.email || enrichedData.email, "N/A"),
                     phone: ensureString(scrapedLead.phone || enrichedData.phone, "N/A"),
                     industry: ensureString(enrichedData.industry, "Unknown"),
                     revenue_estimate: ensureString(
                        enrichedData.revenue_estimate || (scrapedLead.source === 'yelp' ? scrapedLead.sizeOrRevenue : null), 
                        "N/A"
                     ),
                     years_active: ensureString(
                        enrichedData.years_active || (scrapedLead.source === 'opencorporates' ? scrapedLead.sizeOrRevenue : null),
                        "N/A"
                     ),
                     location: ensureString(
                        enrichedData.location ||
                        (scrapedLead.address ? scrapedLead.address.split(',').slice(-2).join(',').trim() : null) || // City, State/Country
                        location,
                        "N/A"
                     )
                 };
                 finalLeads.push(finalLead);
             } // End for loop
             logToFile("scrape", `Final formatting finished. Processed ${mergedLeads.length} leads.`);
        } // End else block (mergedLeads > 0)


        // ✅ PATCH: Final fallback check AFTER enrichment
        if (finalLeads.length === 0) {
             logToFile("scrape", "[Fallback-Check] Final leads array is empty after scraping/enrichment. Triggering seed generation.");
             finalLeads = await enrichWithGeminiSeed(query, location, minFilter);
             isSeedGeneration = true; // Set flag
             fallbackApiCallCount = finalLeads.length > 0 ? 1 : 0; // Set count
             yelpCount = 0; // Reset counts as these are seeded
             openCorpCount = 0;
        }
        // --- End Patch ---
        
        // ✅ IMPLEMENTATION: Filter logic inserted before return
        // --- APPLY SMART FILTER ---
        if ((minYears !== null || minRevenue !== null) && finalLeads.length > 0) {
            const originalCount = finalLeads.length;
            logToFile('scrape', `[Filter] Starting filter logic. MinYears: ${minYears}, MinRevenue: ${minRevenue}. Original count: ${originalCount}`);
            
            finalLeads = finalLeads.filter(lead => {
                // --- YEARS FILTER ---
                if (minYears !== null) {
                    const years = parseYears(lead.years_active);
                    // Rule 5: KEEP unknown ages (parseYears returns null for N/A or unparsed)
                    if (years === null) {
                        return true; // Keep
                    }
                    // Rule 6: Exclude leads that don't match
                    if (years < minYears) {
                        logToFile('scrape', `[Filter-AGE] Dropping "${lead.business_name}": ${years} < ${minYears}`);
                        return false; // Drop
                    }
                }

                // --- REVENUE FILTER ---
                if (minRevenue !== null) {
                    const revenue = parseRevenue(lead.revenue_estimate);
                    // Rule 3: KEEP leads if revenue is N/A (parseRevenue returns null)
                    if (revenue === null) {
                        return true; // Keep
                    }
                    // Rule 6: Exclude leads that don't match
                    if (revenue < minRevenue) {
                        logToFile('scrape', `[Filter-REVENUE] Dropping "${lead.business_name}": ${revenue} < ${minRevenue}`);
                        return false; // Drop
                    }
                }
                
                // If not dropped by any filter, keep it
                return true; 
            });
            logToFile('scrape', `[Filter] Filtering complete. Kept ${finalLeads.length} of ${originalCount} leads.`);
        }
        // --- END FILTER LOGIC ---


        // --- Return Response ---
        const endTime = Date.now();
        const tookMs = endTime - startTime;
        logToFile("scrape", `Search completed in ${tookMs}ms. Returning ${finalLeads.length} leads. Fallback/Seed API calls: ${fallbackApiCallCount}`);
        logToFile("scrape", "==================================================");

        return NextResponse.json({
            leads: finalLeads,
            meta: {
                tookMs,
                sourceCounts: { yelp: yelpCount, opencorporates: openCorpCount },
                fallbackApiCallCount,
                source: isSeedGeneration ? 'fallback_seed' : 'scrape_enrich',
            },
        });

    } catch (error: any) {
        const endTime = Date.now();
        const tookMs = endTime - startTime;
        logToFile("error", `CRITICAL ERROR during search process after ${tookMs}ms: ${error.message}`);
        console.error("Leads API Route Critical Error:", error);
        return NextResponse.json({ error: 'An internal server error occurred', details: error.message }, { status: 500 });
    }
}

