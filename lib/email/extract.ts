import * as cheerio from 'cheerio';
import { fetchHtmlWithRateLimit } from '../http';
import { Lead } from '../types';
import pLimit from 'p-limit';

// Limit concurrency for fetching email pages to avoid overwhelming servers
const limit = pLimit(3); // Concurrency limit from spec

// Regex to find potential email addresses
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;

// Common patterns to exclude (like no-reply, image links, etc.)
const exclusionPatterns = [
  /noreply|no-reply|donotreply|do-not-reply/i,
  /@example\.com|@domain\.com|@yourdomain\.com/i,
  /@sentry\.io|@.+\.sentry\.io/i, // Common error reporting service
  /\.(png|jpg|jpeg|gif|svg)$/i, // Emails ending in image extensions
  /wixpress\.com|@wix\.com/i, // Wix related emails often not useful contacts
  /@.*\.(png|jpg|jpeg|gif|svg)/i, // Emails in image paths
];

// Function to extract valid emails from a block of text or HTML
function extractEmailsFromText(text: string): string[] {
  const matches = text.match(emailRegex);
  if (!matches) {
    return [];
  }
  // Filter out excluded patterns and duplicates
  const emails = matches.filter(email => 
    !exclusionPatterns.some(pattern => pattern.test(email))
  );
  return [...new Set(emails)]; // Return unique emails
}

// Function to find likely contact page URLs within a site
function findContactLinks(html: string, baseUrl: string): string[] {
  const $ = cheerio.load(html);
  const contactLinks: string[] = [];
  const potentialPaths = ['/contact', '/contact-us', '/about', '/team', '/impressum', '/privacy-policy'];
  
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) {
      try {
        const fullUrl = new URL(href, baseUrl).toString();
        // Only follow links on the same domain
        if (fullUrl.startsWith(baseUrl)) {
           // Check if the path matches potential contact pages
           const path = new URL(fullUrl).pathname.toLowerCase();
           if (potentialPaths.some(p => path === p || path.startsWith(p + '/'))) {
             contactLinks.push(fullUrl);
           }
        }
      } catch (e) {
         // Ignore invalid URLs
      }
    }
  });

  // Also check common privacy/imprint links
  $('a').filter((_, el) => {
      const text = $(el).text().toLowerCase();
      return text.includes('privacy') || text.includes('policy') || text.includes('imprint') || text.includes('impressum');
  }).each((_, el) => {
      const href = $(el).attr('href');
      if (href) {
          try {
              const fullUrl = new URL(href, baseUrl).toString();
              if (fullUrl.startsWith(baseUrl)) {
                  contactLinks.push(fullUrl);
              }
          } catch (e) {
              // Ignore invalid URLs
          }
      }
  });

  return [...new Set(contactLinks)].slice(0, 2); // Limit to following 2 extra links per spec
}

// Main function to find emails for a list of leads (exported)
// This implements the "block & wait" strategy (Option 2)
export async function findEmailsForLeads(leads: Lead[]): Promise<Lead[]> {
  console.log(`Starting email extraction for ${leads.length} leads...`);
  const tasks = leads.map(lead => limit(async () => {
    if (!lead.website) {
      return { ...lead, email: null }; // Cannot search without a website
    }

    try {
      // 1. Fetch homepage
      const homepageHtml = await fetchHtmlWithRateLimit(lead.website);
      if (!homepageHtml) {
        return { ...lead, email: null }; // Fetch failed
      }
      
      // 2. Extract emails from homepage
      let emails = extractEmailsFromText(homepageHtml);
      if (emails.length > 0) {
        console.log(`Found email(s) on homepage for ${lead.website}: ${emails[0]}`);
        return { ...lead, email: emails[0] }; // Return the first valid email found
      }

      // 3. Find and fetch contact pages if no emails on homepage
      const contactLinks = findContactLinks(homepageHtml, lead.website);
      for (const link of contactLinks) {
        const contactHtml = await fetchHtmlWithRateLimit(link);
        if (contactHtml) {
          emails = extractEmailsFromText(contactHtml);
          if (emails.length > 0) {
            console.log(`Found email(s) on contact page (${link}) for ${lead.website}: ${emails[0]}`);
            return { ...lead, email: emails[0] }; // Return first valid email found
          }
        }
      }
      
      // 4. If still no emails, return null
      console.log(`No email found for ${lead.website} after checking homepage and ${contactLinks.length} contact links.`);
      return { ...lead, email: null };

    } catch (error: any) {
      console.error(`Error processing email extraction for ${lead.website}: ${error.message}`);
      return { ...lead, email: null }; // Return null on error
    }
  }));

  const results = await Promise.all(tasks);
  console.log("Email extraction completed.");
  return results;
}

