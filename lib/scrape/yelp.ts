import * as cheerio from 'cheerio';
import { fetchHtmlWithRateLimit } from '../http';
import { Lead } from '../types';
import pLimit from 'p-limit';

const detailLimit = pLimit(3); // Limit concurrency when fetching detail pages

// Robust function to extract text or null
// ⛔ Cheerio generic typing breaks build → neutralised to `any`
const safeGetText = (el: any): string | null => {
  return el?.text().trim() || null;
};

// Robust function to extract href or null
// ⛔ Cheerio generic typing breaks build → neutralised to `any`
const safeGetHref = (el: any): string | null => {
  return el?.attr('href')?.trim() || null;
};

export async function scrapeYelp(
  query: string,
  location: string
): Promise<Lead[]> {
  const searchUrl = `https://www.yelp.com/search?find_desc=${encodeURIComponent(
    query
  )}&find_loc=${encodeURIComponent(location)}`;
  console.log(`[Yelp] Starting scrape for URL: ${searchUrl}`);

  try {
    const html = await fetchHtmlWithRateLimit(searchUrl);
    if (!html) {
      console.error('[Yelp] Failed to fetch search results page.');
      return [];
    }

    const $ = cheerio.load(html);

    if ($('title').text().includes('Are you a human?')) {
      console.warn('[Yelp] Blocked by CAPTCHA/human verification page.');
      return [];
    }

    if ($('body').text().includes('Something went wrong')) {
      console.warn('[Yelp] Encountered Yelp error page.');
      return [];
    }

    const resultsContainerSelector =
      'ul > li[data-testid="result-item"], div[data-testid*="search-result"]';
    const resultItems = $(resultsContainerSelector);

    if (resultItems.length === 0) {
      console.warn(
        `[Yelp] No result items found using selector: "${resultsContainerSelector}".`
      );
      return [];
    }

    const leadPromises = resultItems
      .map(async (index, element) => {
        const el = $(element);

        const nameLink = el
          .find('h3 a[href^="/biz/"], h4 a[href^="/biz/"]')
          .first();
        const name = safeGetText(nameLink);
        const yelpBizPath = safeGetHref(nameLink);

        if (!name || !yelpBizPath) {
          return null;
        }

        const yelpBizUrl = `https://www.yelp.com${yelpBizPath}`;

        const phoneEl = el
          .find('p[class*="phone"], div[class*="phone"]')
          .first();
        const phone = safeGetText(phoneEl);

        const addressEl = el
          .find('address, p[class*="address"], span[class*="address"]')
          .first();
        const address = safeGetText(addressEl);

        let website: string | null = null;

        try {
          await detailLimit(async () => {
            const detailHtml = await fetchHtmlWithRateLimit(yelpBizUrl);
            if (detailHtml) {
              const $$ = cheerio.load(detailHtml);
              const websiteLink = $$(
                'a[href*="biz_redir"][target="_blank"]'
              )
                .filter((_, linkEl) => {
                  const linkText = $$(linkEl).text().toLowerCase();
                  const parentText = $$(linkEl)
                    .parent()
                    .text()
                    .toLowerCase();
                  return (
                    linkText.includes('website') ||
                    parentText.includes('business website')
                  );
                })
                .first();

              const rawWebsiteUrl = safeGetHref(websiteLink);

              if (rawWebsiteUrl) {
                const urlParams = new URLSearchParams(
                  rawWebsiteUrl.split('?')[1]
                );
                const extracted = urlParams.get('url');
                if (extracted) {
                  const decoded = decodeURIComponent(extracted);
                  const urlObj = new URL(decoded);
                  website = `${urlObj.protocol}//${urlObj.hostname}${urlObj.pathname === '/' ? '' : urlObj.pathname}`.replace(
                    /\/$/,
                    ''
                  );
                }
              }
            }
          });
        } catch (detailError: any) {
          console.error(
            `[Yelp] Failed to fetch detail page ${yelpBizUrl}: ${detailError.message}`
          );
        }

        const lead: Lead = {
          name,
          website: website || null,
          email: null,
          phone,
          address,
          sizeOrRevenue: null,
          source: 'yelp',
        };

        return lead;
      })
      .get();

    const leads = (await Promise.all(leadPromises)).filter(
      (lead): lead is Lead => lead !== null
    );

    console.log(`[Yelp] Successfully parsed ${leads.length} leads.`);
    return leads;
  } catch (error: any) {
    console.error(
      `[Yelp] Critical error during scraping: ${error.message}`
    );
    return [];
  }
}
