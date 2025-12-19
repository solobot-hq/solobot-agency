import * as cheerio from 'cheerio';
import { fetchHtmlWithRateLimit } from '../http';
import { Lead } from '../types';

// Robust function to extract text or null
const safeGetText = (el: cheerio.Cheerio | undefined): string | null => {
    // Handle cases where text might be split across multiple nodes or have extra whitespace
    return el?.text().replace(/\s+/g, ' ').trim() || null;
}

// Robust function to extract href or null
const safeGetHref = (el: cheerio.Cheerio | undefined): string | null => {
    return el?.attr('href')?.trim() || null;
}

export async function scrapeOpenCorporates(query: string, location: string): Promise<Lead[]> {
    // Combine query and location for OpenCorporates search
    const searchQuery = `${query} ${location}`;
    const searchUrl = `https://opencorporates.com/companies?q=${encodeURIComponent(searchQuery)}`;
    console.log(`[OpenCorp] Starting scrape for URL: ${searchUrl}`);

    try {
        const html = await fetchHtmlWithRateLimit(searchUrl);
        if (!html) {
             console.error("[OpenCorp] Failed to fetch search results page.");
            return [];
        }

        const $ = cheerio.load(html);

        // Check for no results or errors first
         if ($('title').text().includes('Search results')) {
             const resultsText = $('.results_count, #results p strong').first().text(); // Try alternative for count
             const match = resultsText?.match(/(\d+)/);
             const count = match ? parseInt(match[1], 10) : null;

             if (count === 0 || resultsText.includes('no companies found')) {
                 console.log("[OpenCorp] Site reported 0 companies found.");
                 return [];
             }
              if (count === null && !resultsText) {
                 console.warn("[OpenCorp] Could not find results count element. HTML structure may have changed.");
             }
         } else if ($('body').text().includes('we couldn\'t find anything')) {
             console.log("[OpenCorp] Site reported 'couldn't find anything'.");
             return [];
         }

        // --- UPDATED SELECTOR based on screenshot ---
        // The container for each result is li.result inside ul#companies
        const resultItemSelector = 'ul#companies > li.result'; // Corrected parent selector
        const resultItems = $(resultItemSelector);

         if (resultItems.length === 0) {
             console.warn(`[OpenCorp] No result rows found using selector: "${resultItemSelector}". HTML structure may have changed.`);
             return [];
         }

        console.log(`[OpenCorp] Found ${resultItems.length} potential result items.`);

        // --- ADDED Filtering Logic ---
        const leads: Lead[] = resultItems.map((_, element) => {
            const el = $(element);

            // === EXCLUDE Inactive/Dissolved ===
            if (el.hasClass('inactive') || el.hasClass('dissolved')) {
                // console.log("[OpenCorp] Skipping inactive/dissolved company.");
                return null; // Explicitly return null for inactive companies
            }
            // ===================================

            // --- Using PROVIDED Selectors ---
            // Find the name link within the current *active* <li>
            const nameLink = el.find('a.company_search_result').first(); 
            const name = safeGetText(nameLink);
            const openCorpPath = safeGetHref(nameLink);
            // --- EXTRACT Absolute URL ---
            const openCorpUrl = openCorpPath ? `https://opencorporates.com${openCorpPath}` : null; 
            // ============================

            const jurisdictionEl = el.find('a.jurisdiction_filter').first(); // Find jurisdiction link within the <li>
            const jurisdiction = safeGetText(jurisdictionEl);

            const addressEl = el.find('span.address').first(); // Find address span within the <li>
            const address = safeGetText(addressEl);

            // Combine jurisdiction and address if both exist
            const fullAddress = [jurisdiction, address].filter(Boolean).join(', ');

            // OpenCorporates rarely lists phone or website directly on search results
            const lead: Lead = {
                name: name || 'Unknown Company',
                website: null, // Website isn't on search results, would require visiting openCorpUrl (future enhancement?)
                email: null,
                phone: null,
                address: fullAddress || null, // Use combined address
                sizeOrRevenue: null,
                source: 'opencorporates',
            };
            return lead;
        }).get()
        // --- Filter out nulls from inactive companies AND leads without names ---
        .filter((lead): lead is Lead => lead !== null && !!lead.name && lead.name !== 'Unknown Company'); 

        console.log(`[OpenCorp] Successfully parsed ${leads.length} *active* leads using updated selectors.`);
        return leads;

    } catch (error: any) {
        console.error(`[OpenCorp] Critical error during scraping: ${error.message}`);
        return []; // Return empty array on critical failure
    }
}

