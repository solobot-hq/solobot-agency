import * as cheerio from 'cheerio';
import { fetchHtmlWithRateLimit } from '../http'; // FIX: Corrected function name import
import { Lead } from '../types';
import pLimit from 'p-limit';

const detailLimit = pLimit(3); // Limit concurrency when fetching detail pages

// Robust function to extract text or null
const safeGetText = (el: cheerio.Cheerio | undefined): string | null => {
    return el?.text().trim() || null;
}

// Robust function to extract href or null
const safeGetHref = (el: cheerio.Cheerio | undefined): string | null => {
    return el?.attr('href')?.trim() || null;
}

export async function scrapeYelp(query: string, location: string): Promise<Lead[]> {
    const searchUrl = `https://www.yelp.com/search?find_desc=${encodeURIComponent(query)}&find_loc=${encodeURIComponent(location)}`;
    console.log(`[Yelp] Starting scrape for URL: ${searchUrl}`);

    try {
        const html = await fetchHtmlWithRateLimit(searchUrl); // FIX: Uses the correctly imported function
        if (!html) {
            console.error("[Yelp] Failed to fetch search results page.");
            return [];
        }

        // DEBUG: Log a snippet of HTML to help diagnose selector issues
        // console.log(`[Yelp] HTML Snippet: ${html.substring(0, 500)}`);

        const $ = cheerio.load(html);

        // === FIX: Add check for common anti-scraping patterns ===
        if ($('title').text().includes('Are you a human?')) {
            console.warn("[Yelp] Blocked by CAPTCHA/human verification page.");
            return [];
        }
        if ($('body').text().includes('Something went wrong')) {
             console.warn("[Yelp] Encountered Yelp error page.");
             return [];
        }

        // --- Updated Selectors (These might still need adjustment) ---
        // Look for the container holding search results. This changes often.
        // Common patterns: 'ul > li[data-testid="result-item"]', 'div[data-testid*="search-result"]', '.list__09f24__ynIEd .list-item__09f24__.', etc.
        const resultsContainerSelector = 'ul > li[data-testid="result-item"], div[data-testid*="search-result"]';
        const resultItems = $(resultsContainerSelector);

        // === FIX: Add explicit check if results container is found ===
        if (resultItems.length === 0) {
             console.warn(`[Yelp] No result items found using selector: "${resultsContainerSelector}". HTML structure may have changed.`);
             // DEBUG: Log more HTML if no results are found
             // console.log(`[Yelp] Full HTML head: ${$('head').html()}`);
             // console.log(`[Yelp] Full HTML body start: ${$('body').html()?.substring(0, 1000)}`);
             return [];
        }

        console.log(`[Yelp] Found ${resultItems.length} potential result items on search page.`);

        const leadPromises = resultItems.map(async (index, element) => {
            const el = $(element);

            // --- Updated Selectors for details within a result item ---
            // Name: Often in an 'h3' or 'h4' with a link inside
            const nameLink = el.find('h3 a[href^="/biz/"], h4 a[href^="/biz/"]').first();
            const name = safeGetText(nameLink);
            const yelpBizPath = safeGetHref(nameLink);

            if (!name || !yelpBizPath) {
                // console.warn(`[Yelp] Skipping item ${index + 1}: Could not find name or business link.`);
                return null; // Skip if essential info is missing
            }

            const yelpBizUrl = `https://www.yelp.com${yelpBizPath}`;

            // Phone & Address: Often in sibling divs or specific attribute elements
            // These selectors are highly volatile
            const phoneEl = el.find('p[class*="phone"], div[class*="phone"]').first();
            const phone = safeGetText(phoneEl);

            const addressEl = el.find('address, p[class*="address"], span[class*="address"]').first();
            const address = safeGetText(addressEl);

            // Fetch detail page for website (limited concurrency)
            let website: string | null = null;
            try {
                await detailLimit(async () => {
                    const detailHtml = await fetchHtmlWithRateLimit(yelpBizUrl); // FIX: Uses the correctly imported function
                    if (detailHtml) {
                        const $$ = cheerio.load(detailHtml);
                        // Website Link Selector: Look for links containing "Business website" or similar, often with specific icons or data attributes
                        const websiteLink = $$('a[href*="biz_redir"][target="_blank"]').filter((_, linkEl) => {
                            // Check link text or parent text for keywords
                            const linkText = $$(linkEl).text().toLowerCase();
                            const parentText = $$(linkEl).parent().text().toLowerCase();
                            return linkText.includes('website') || parentText.includes('business website');
                        }).first();

                        const rawWebsiteUrl = safeGetHref(websiteLink);

                        if (rawWebsiteUrl) {
                            // Yelp uses redirect URLs, extract the real target
                            const urlParams = new URLSearchParams(rawWebsiteUrl.split('?')[1]);
                            website = urlParams.get('url'); // The actual website is in the 'url' param
                            if (website) {
                                // Sometimes the URL includes Yelp tracking params, try to clean it
                                const decodedUrl = decodeURIComponent(website);
                                const urlObj = new URL(decodedUrl);
                                website = `${urlObj.protocol}//${urlObj.hostname}${urlObj.pathname === '/' ? '' : urlObj.pathname}`.replace(/\/$/, ''); // Basic cleaning
                            }
                        }
                    }
                });
            } catch (detailError: any) {
                console.error(`[Yelp] Failed to fetch or parse detail page ${yelpBizUrl}: ${detailError.message}`);
            }


            const lead: Lead = {
                name: name,
                website: website || null,
                email: null, // Email extraction happens later
                phone: phone,
                address: address,
                sizeOrRevenue: null, // Yelp typically doesn't show this easily
                source: 'yelp',
                // yelpBizUrl: yelpBizUrl, // Keep internal URL? Maybe not needed for Lead type
            };
            return lead;

        }).get(); // .get() converts cheerio collection to array

        const leads = (await Promise.all(leadPromises)).filter((lead): lead is Lead => lead !== null);
        console.log(`[Yelp] Successfully parsed ${leads.length} leads.`);
        return leads;

    } catch (error: any) {
        console.error(`[Yelp] Critical error during scraping: ${error.message}`);
        // Log stack trace for detailed debugging
        // console.error(error.stack);
        return []; // Return empty array on critical failure
    }
}

