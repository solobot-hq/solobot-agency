import pLimit from 'p-limit';
// @ts-ignore
import ms from 'ms'; // TypeScript cannot find types for 'ms', so we ignore the warning

const limit = pLimit(3); // Global concurrency limit from spec

// Helper function to introduce random delay
const delay = (duration: number) => new Promise(resolve => setTimeout(resolve, duration));

// Function to generate jittered delay
const getJitteredDelay = () => {
    const minDelay = ms('500ms');
    const maxDelay = ms('1200ms');
    return Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
}

// User Agent to mimic a desktop browser
const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36";

// === FIX: Added 'export' keyword ===
export async function fetchHtmlWithRateLimit(url: string): Promise<string | null> {
    return limit(async () => {
        const jitter = getJitteredDelay();
        console.log(`[HTTP] Waiting ${jitter}ms before fetching ${url}`);
        await delay(jitter);

        try {
            console.log(`[HTTP] Fetching: ${url}`);
            const response = await fetch(url, {
                headers: {
                    'User-Agent': userAgent,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'en-US,en;q=0.9',
                },
                // @ts-ignore
                signal: AbortSignal.timeout(ms('15s')) // Per-fetch timeout
            });

            if (!response.ok) {
                console.error(`[HTTP] Failed to fetch ${url}. Status: ${response.status} ${response.statusText}`);
                return null;
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('text/html')) {
                console.warn(`[HTTP] Received non-HTML content type (${contentType}) for ${url}`);
                return null;
            }

            const html = await response.text();
            console.log(`[HTTP] Successfully fetched HTML from ${url} (length: ${html.length})`);
            return html;

        } catch (error: any) {
            if (error.name === 'AbortError') {
                 console.error(`[HTTP] Fetch timed out for ${url}`);
            } else {
                console.error(`[HTTP] Network error fetching ${url}:`, error.message);
            }
            return null;
        }
    });
}