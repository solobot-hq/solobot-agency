import * as cheerio from 'cheerio';
import { fetchHtmlWithRateLimit } from '../http';
import { Lead } from '../types';

// Robust function to extract text or null
// ⛔ Cheerio generic typing breaks build → neutralised to `any`
const safeGetText = (el: any): string | null => {
  return el?.text().replace(/\s+/g, ' ').trim() || null;
};

// Robust function to extract href or null
// ⛔ Cheerio generic typing breaks build → neutralised to `any`
const safeGetHref = (el: any): string | null => {
  return el?.attr('href')?.trim() || null;
};

export async function scrapeOpenCorporates(
  query: string,
  location: string
): Promise<Lead[]> {
  const searchQuery = `${query} ${location}`;
  const searchUrl = `https://opencorporates.com/companies?q=${encodeURIComponent(searchQuery)}`;
  console.log(`[OpenCorp] Starting scrape for URL: ${searchUrl}`);

  try {
    const html = await fetchHtmlWithRateLimit(searchUrl);
    if (!html) {
      console.error('[OpenCorp] Failed to fetch search results page.');
      return [];
    }

    const $ = cheerio.load(html);

    if ($('title').text().includes('Search results')) {
      const resultsText = $('.results_count, #results p strong').first().text();
      const match = resultsText?.match(/(\d+)/);
      const count = match ? parseInt(match[1], 10) : null;

      if (count === 0 || resultsText.includes('no companies found')) {
        console.log('[OpenCorp] Site reported 0 companies found.');
        return [];
      }
    } else if ($('body').text().includes("we couldn't find anything")) {
      console.log("[OpenCorp] Site reported 'couldn't find anything'.");
      return [];
    }

    const resultItemSelector = 'ul#companies > li.result';
    const resultItems = $(resultItemSelector);

    if (resultItems.length === 0) {
      console.warn(
        `[OpenCorp] No result rows found using selector: "${resultItemSelector}".`
      );
      return [];
    }

    const leads: Lead[] = resultItems
      .map((_, element) => {
        const el = $(element);

        if (el.hasClass('inactive') || el.hasClass('dissolved')) {
          return null;
        }

        const nameLink = el.find('a.company_search_result').first();
        const name = safeGetText(nameLink);
        const openCorpPath = safeGetHref(nameLink);
        const openCorpUrl = openCorpPath
          ? `https://opencorporates.com${openCorpPath}`
          : null;

        const jurisdictionEl = el.find('a.jurisdiction_filter').first();
        const jurisdiction = safeGetText(jurisdictionEl);

        const addressEl = el.find('span.address').first();
        const address = safeGetText(addressEl);

        const fullAddress = [jurisdiction, address].filter(Boolean).join(', ');

        const lead: Lead = {
          name: name || 'Unknown Company',
          website: null,
          email: null,
          phone: null,
          address: fullAddress || null,
          sizeOrRevenue: null,
          source: 'opencorporates',
        };

        return lead;
      })
      .get()
      .filter(
        (lead): lead is Lead =>
          lead !== null && !!lead.name && lead.name !== 'Unknown Company'
      );

    console.log(
      `[OpenCorp] Successfully parsed ${leads.length} active leads.`
    );
    return leads;
  } catch (error: any) {
    console.error(
      `[OpenCorp] Critical error during scraping: ${error.message}`
    );
    return [];
  }
}
