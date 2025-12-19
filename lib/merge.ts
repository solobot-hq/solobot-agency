import { Lead, PartialLead } from './types';

/**
 * Normalizes a company name for deduplication.
 * Removes common suffixes and converts to lowercase.
 * @param name The company name.
 * @returns A normalized string.
 */
const normalizeName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/,?\s+(inc|llc|ltd|lpc|corp|co|llp)\.?$/i, '') // Remove common suffixes
    .replace(/[^a-z0-9]/g, ''); // Remove special chars
};

/**
 * Extracts a normalized domain from a website URL for deduplication.
 * @param website The full website URL.
 * @returns A normalized domain (e.g., "google.com") or null.
 */
const getDomain = (website: string | null): string | null => {
  if (!website) return null;
  try {
    const host = new URL(website).hostname;
    return host.replace(/^www\./, ''); // Remove 'www.'
  } catch (e) {
    return null; // Invalid URL
  }
};

/**
 * Merges and deduplicates leads from multiple sources.
 * @param leads An array of PartialLead objects from all scrapers.
 * @returns A final array of deduplicated Lead objects.
 */
export const mergeLeads = (leads: PartialLead[]): Lead[] => {
  // Use a Map for efficient deduplication
  const leadMap = new Map<string, Lead>();

  for (const partial of leads) {
    const domain = getDomain(partial.website);
    const normalizedName = normalizeName(partial.name);

    // Create a unique key for this lead
    // Priority: domain + name. Fallback: phone + name. Last resort: name + address
    let key: string;
    if (domain) {
      key = `${normalizedName}|${domain}`;
    } else if (partial.phone) {
      key = `${normalizedName}|${partial.phone}`;
    } else if (partial.address) {
      key = `${normalizedName}|${partial.address.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    } else {
      key = normalizedName; // Least reliable
    }

    const existing = leadMap.get(key);

    // Create the full lead object, filling in missing fields
    const current: Lead = {
      name: partial.name,
      website: partial.website || null,
      email: partial.email || null,
      phone: partial.phone || null,
      address: partial.address || null,
      sizeOrRevenue: partial.sizeOrRevenue || null,
      source: partial.source,
    };

    if (!existing) {
      // If no lead exists for this key, add the current one.
      leadMap.set(key, current);
    } else {
      // A lead already exists. We need to merge them.
      // We prefer the lead that has more information.
      const merged: Lead = {
        name: existing.name || current.name, // Keep existing name
        website: existing.website || current.website,
        email: existing.email || current.email, // Priority: Keep email
        phone: existing.phone || current.phone,
        address: existing.address || current.address,
        sizeOrRevenue: existing.sizeOrRevenue || current.sizeOrRevenue,
        // Combine sources, or just keep the more "reliable" one
        source: existing.email ? existing.source : current.source,
      };

      // If the new lead is "better" (has an email the old one didn't), replace it.
      if (!existing.email && current.email) {
        leadMap.set(key, merged);
      } else if (!existing.website && current.website) {
        leadMap.set(key, merged);
      } else {
        // Otherwise, just update the existing entry with merged data
        leadMap.set(key, merged);
      }
    }
  }

  return Array.from(leadMap.values());
};

