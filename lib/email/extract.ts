import * as cheerio from 'cheerio';
import { fetchHtmlWithRateLimit } from '../http';
import { Lead } from '../types';
import pLimit from 'p-limit'; // ✅ Now resolved with p-limit@3.1.0

/**
 * ✅ CONCURRENCY CONTROL
 * Limits fetching to 3 concurrent requests to prevent server flagging.
 */
const limit = pLimit(3); 

const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;

const exclusionPatterns = [
  /noreply|no-reply|donotreply|do-not-reply/i,
  /@example\.com|@domain\.com|@yourdomain\.com/i,
  /@sentry\.io|@.+\.sentry\.io/i, 
  /\.(png|jpg|jpeg|gif|svg)$/i, 
  /wixpress\.com|@wix\.com/i, 
  /@.*\.(png|jpg|jpeg|gif|svg)/i, 
];

function extractEmailsFromText(text: string): string[] {
  const matches = text.match(emailRegex);
  if (!matches) return [];
  const emails = matches.filter(email => 
    !exclusionPatterns.some(pattern => pattern.test(email))
  );
  return [...new Set(emails)]; 
}

function findContactLinks(html: string, baseUrl: string): string[] {
  const $ = cheerio.load(html);
  const contactLinks: string[] = [];
  const potentialPaths = ['/contact', '/contact-us', '/about', '/team', '/impressum', '/privacy-policy'];
  
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) {
      try {
        const fullUrl = new URL(href, baseUrl).toString();
        if (fullUrl.startsWith(baseUrl)) {
           const path = new URL(fullUrl).pathname.toLowerCase();
           if (potentialPaths.some(p => path === p || path.startsWith(p + '/'))) {
             contactLinks.push(fullUrl);
           }
        }
      } catch (e) {}
    }
  });

  return [...new Set(contactLinks)].slice(0, 2); 
}

export async function findEmailsForLeads(leads: Lead[]): Promise<Lead[]> {
  console.log(`[Email Scraper] Processing ${leads.length} leads...`);

  const tasks = leads.map(lead => limit(async () => {
    if (!lead.website) return { ...lead, email: null };

    try {
      const homepageHtml = await fetchHtmlWithRateLimit(lead.website);
      if (!homepageHtml) return { ...lead, email: null };
      
      let emails = extractEmailsFromText(homepageHtml);
      if (emails.length > 0) return { ...lead, email: emails[0] };

      const contactLinks = findContactLinks(homepageHtml, lead.website);
      for (const link of contactLinks) {
        const contactHtml = await fetchHtmlWithRateLimit(link);
        if (contactHtml) {
          emails = extractEmailsFromText(contactHtml);
          if (emails.length > 0) return { ...lead, email: emails[0] };
        }
      }
      return { ...lead, email: null };
    } catch (error: any) {
      return { ...lead, email: null }; 
    }
  }));

  const results = await Promise.all(tasks);
  return results;
}