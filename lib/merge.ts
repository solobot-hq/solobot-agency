import { Lead, PartialLead } from './types';

/**
 * Normalizes a company name for deduplication.
 * Removes common suffixes and converts to lowercase.
 */
const normalizeName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/,?\s+(inc|llc|ltd|lpc|corp|co|llp)\.?$/i, '') // Remove common suffixes
    .replace(/[^a-z0-9]/g, ''); // Remove special chars
};

/**
 * Extracts a normalized domain from a website URL for deduplication.
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
 * ✅ FIX: Changed parameter to '...arrays' to accept multiple lead arrays
 */
export const mergeLeads = (...arrays: PartialLead[][]): Lead[] => {
  // Flatten all input arrays into a single list
  const leads = arrays.flat();
  
  // Use a Map for efficient deduplication
  const leadMap = new Map<string, Lead>();

  for (const partial of leads) {
    const domain = getDomain(partial.website);
    const normalizedName = normalizeName(partial.name);

    // Create a unique key for this lead
    let key: string;
    if (domain) {
      key = `${normalizedName}|${domain}`;
    } else if (partial.phone) {
      key = `${normalizedName}|${partial.phone}`;
    } else if (partial.address) {
      key = `${normalizedName}|${partial.address.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    } else {
      key = normalizedName; 
    }

    const existing = leadMap.get(key);

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
      leadMap.set(key, current);
    } else {
      const merged: Lead = {
        name: existing.name || current.name,
        website: existing.website || current.website,
        email: existing.email || current.email,
        phone: existing.phone || current.phone,
        address: existing.address || current.address,
        sizeOrRevenue: existing.sizeOrRevenue || current.sizeOrRevenue,
        source: existing.email ? existing.source : current.source,
      };

      // Priority merge: keep the version with more critical contact info
      if (!existing.email && current.email) {
        leadMap.set(key, merged);
      } else if (!existing.website && current.website) {
        leadMap.set(key, merged);
      } else {
        leadMap.set(key, merged);
      }
    }
  }

  return Array.from(leadMap.values());
};