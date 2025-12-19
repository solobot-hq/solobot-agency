"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/Button"; // FIX: Corrected casing (button -> Button)
import { 
    Download, 
    FileSearch, 
    History, 
    Search, 
    Trash2, 
    X, 
    Building, 
    Loader2,
    DatabaseZap,
    Mail,
    AlertTriangle,
    RefreshCw,
    Info
} from 'lucide-react';
import Papa from 'papaparse'; 

// Slugify function for CSV filename
const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Banner state type
type BannerState = {
    type: 'warning' | 'error' | 'info';
    text: string;
} | undefined;


export default function LeadsEnginePage() { 
    // State for inputs
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');
    const [minFilter, setMinFilter] = useState('');

    // State for UI and data
    const [leads, setLeads] = useState([]); // Use FinalLeadOutput type
    const [meta, setMeta] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // Keep error for critical failures
    const [banner, setBanner] = useState(undefined); // Added banner state
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    
    // Load history from local storage on mount
     useEffect(() => {
        const savedHistory = localStorage.getItem('leadsEngineHistory_v2');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    // Save history to local storage when it changes
     useEffect(() => {
        localStorage.setItem('leadsEngineHistory_v2', JSON.stringify(history));
    }, [history]);


    // Add a search to history, maintaining a max of 5
     const addSearchToHistory = (search) => {
        setHistory(prevHistory => {
            // Ensure minFilter is included, default to empty string if undefined
            const newHistoryItem = { 
                query: search.query, 
                location: search.location, 
                minFilter: search.minFilter || '', 
                id: Date.now() 
            };
            const updatedHistory = [newHistoryItem, ...prevHistory.filter(item => 
                item.query !== search.query || item.location !== search.location
            )];
            return updatedHistory.slice(0, 5); // Keep only the last 5
        });
    };


    const handleSearch = async (searchParams) => {
        const currentQuery = searchParams || { query, location, minFilter };
        
        if (!currentQuery.query.trim() || !currentQuery.location.trim()) {
            setBanner({ type: 'warning', text: "Industry/Niche and Location are required."}); 
            setError(null); 
            return;
        }

        setIsLoading(true);
        setError(null);
        setBanner(undefined); // Clear banner on new search
        setLeads([]);
        setMeta(null);
        
        if (!searchParams) {
             addSearchToHistory(currentQuery);
        }

        let response = null; 
        try {
            response = await fetch(`/api/leads/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentQuery),
            });
            
            let data;
            try {
                 data = await response.json();
            } catch (jsonError) {
                 console.error("Failed to parse JSON response:", jsonError);
                 throw new Error(`Server returned an invalid response (not JSON). Status: ${response?.status || 'unknown'}`); // Added null check
            }

            if (!response.ok) {
                const errorMsg = data.error || `HTTP error! status: ${response.status}`;
                throw new Error(errorMsg);
            }

            const { leads: fetchedLeads, meta: fetchedMeta } = data;

            // Update UI handling for zero leads / fallback
            if (!fetchedLeads || fetchedLeads.length === 0) { // Check if fetchedLeads is null or empty
                 // Check if fallback was used (indicated by specific meta flag)
                 if (fetchedMeta?.source === 'fallback_seed') {
                     setBanner({
                         type: 'info', // Use info banner for fallback success
                         text: 'No direct matches scraped. Used AI enrichment to generate potential leads.'
                     });
                     setLeads(fetchedLeads || []); // Display seeded leads (or empty array if null)
                     setMeta(fetchedMeta); 
                 } else {
                     // No fallback used AND no results - show standard "not found"
                     setBanner({ 
                         type: 'warning', 
                         text: 'No leads found for this search. Try a broader location or different niche.' 
                     });
                     setLeads([]); // Ensure leads is empty array
                     setMeta(fetchedMeta); // Still set meta if available
                 }
            } else {
                 setLeads(fetchedLeads);
                 setMeta(fetchedMeta);
                 setBanner(undefined); // Clear banner on success with leads
            }

        } catch (err) {
            console.error("Leads Engine Search Error:", err);
             let errorMessage = err.message || 'An unknown error occurred during the search.';
             if (response && !response.ok) {
                 errorMessage += ` (Server Status: ${response.status})`;
             }
             setError(errorMessage); 
             setBanner({ type: 'error', text: errorMessage }); // Also show in banner
        } finally {
            setIsLoading(false);
        }
    };

    // Download leads as a CSV file
    const handleDownloadCSV = () => {
        if (leads.length === 0) return; 

        const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const time = new Date().toTimeString().split(' ')[0].replace(/:/g, '');
        const filename = `leads-${slugify(query)}-${slugify(location)}-${timestamp}-${time}.csv`;

        // Map FinalLeadOutput to CSV structure
        const csvData = leads.map(lead => ({
            "Business Name": lead.business_name,
            "Website": lead.website,
            "Email": lead.email,
            "Phone": lead.phone,
            "Industry": lead.industry,
            "Revenue Estimate": lead.revenue_estimate,
            "Years Active": lead.years_active,
            "Location": lead.location,
        }));
        
        if (typeof Papa !== 'undefined') {
            const csv = Papa.unparse(csvData);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error("PapaParse library is not loaded. Cannot download CSV.");
            setBanner({type: 'error', text: "CSV Export error: Required library not loaded. Please ensure 'papaparse' is installed."});
        }
    };


    // Load a search from history and re-run
      const handleHistoryClick = (item) => {
        setQuery(item.query);
        setLocation(item.location);
        setMinFilter(item.minFilter || '');
        setShowHistory(false);
        // Ensure minFilter is passed correctly
        handleSearch({ query: item.query, location: item.location, minFilter: item.minFilter || undefined }); 
    };


    // Clear history
    const handleClearHistory = () => {
        setHistory([]);
    };

    
    // Clear results and banner
    const handleClearResults = () => {
        setLeads([]);
        setMeta(null);
        setError(null);
        setBanner(undefined); // Clear banner as well
    }

    const emailCount = leads.filter(lead => lead.email && lead.email !== 'N/A').length; // Check against N/A

    return (
        <div className="min-h-screen bg-gray-900 text-slate-300 p-8">
            <div className="h-full grid lg:grid-cols-2 gap-8 relative max-w-7xl mx-auto">
                {/* Left Side: Inputs */}
                 <div className="flex flex-col space-y-6">
                    <div className="p-6 rounded-lg bg-slate-900/50 border border-slate-800/50">
                         <div className="flex items-center space-x-3 mb-4">
                            <DatabaseZap className="h-6 w-6 text-emerald-500" />
                            <h2 className="text-xl font-semibold text-white">Leads Engine v1</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="query" className="block text-sm font-medium text-slate-300 mb-2">Industry / Niche</label>
                                <input id="query" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g., 'Plumbers', 'Dentists', 'SaaS'" className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md text-white" />
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-2">Location (City or State)</label>
                                <input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., 'London', 'Birmingham'" className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md text-white" />
                            </div>
                            <div>
                                <label htmlFor="minFilter" className="block text-sm font-medium text-slate-300 mb-2">Min. Revenue or Age (Optional)</label>
                                <input id="minFilter" value={minFilter} onChange={(e) => setMinFilter(e.target.value)} placeholder="e.g., '1M', '25' (free-form)" className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md text-white" />
                            </div>
                        </div>
                    </div>
                     <Button onClick={() => handleSearch()} disabled={isLoading} size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                        {isLoading ? (
                            <>
                                <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                                Scraping & Enriching... (this may take up to 45s+)
                            </>
                        ) : (
                            <>
                                <Search className="h-5 w-5 mr-2" />
                                Find Leads
                            </>
                        )}
                    </Button>
                 </div>


                {/* Right Side: Outputs */}
                <div className="flex flex-col">
                    <div className="flex-grow p-6 rounded-lg bg-slate-900/50 border border-slate-800/50 relative">
                         <div className="flex items-center justify-between mb-4">
                             <div className="flex items-center space-x-3">
                                <FileSearch className="h-6 w-6 text-emerald-500" />
                                <h2 className="text-xl font-semibold text-white">Generated Leads</h2>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" onClick={() => setShowHistory(true)} className="text-slate-400 hover:text-white">
                                    <History className="h-4 w-4 mr-2" />
                                    History
                                </Button>
                                {/* Disable clear only if nothing to clear */}
                                <Button variant="ghost" size="sm" onClick={handleClearResults} disabled={leads.length === 0 && !error && !banner} className="text-slate-400 hover:text-white disabled:opacity-50">
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Clear
                                </Button>
                                {/* Enable download if there are leads (even seeded) */}
                                <Button variant="ghost" size="sm" onClick={handleDownloadCSV} disabled={leads.length === 0} className="text-slate-400 hover:text-white disabled:opacity-50">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download CSV
                                </Button>
                            </div>
                        </div>
                        
                        {/* Status Bar */}
                        {meta && (
                            <div className="mb-4 p-3 bg-slate-800/50 border border-slate-700 rounded-md flex justify-between items-center text-sm">
                                <div className="flex space-x-4">
                                    <span className="text-white font-medium">
                                        <Building className="h-4 w-4 mr-1.5 inline-block -mt-1" />
                                        Leads: <span className="text-emerald-400">{leads.length}</span>
                                    </span>
                                    <span className="text-white font-medium">
                                        <Mail className="h-4 w-4 mr-1.5 inline-block -mt-1" />
                                        Emails Found: <span className="text-emerald-400">{emailCount}</span>
                                    </span>
                                     {/* Display fallback count */}
                                     {(meta.fallbackApiCallCount ?? 0) > 0 && ( // Use nullish coalescing
                                         <span className="text-amber-400 font-medium">
                                             (<Info className="h-4 w-4 mr-1 inline-block -mt-1" /> {meta.fallbackApiCallCount} enriched via AI)
                                         </span>
                                     )}
                                </div>
                                <span className="text-slate-400">
                                     {meta.source === 'fallback_seed' 
                                         ? `Source: AI Seed Generation | Took: ${(meta.tookMs / 1000).toFixed(1)}s`
                                         : `Sources: Yelp (${meta.sourceCounts?.yelp ?? 0}), OpenCorp (${meta.sourceCounts?.opencorporates ?? 0}) | Took: ${(meta.tookMs / 1000).toFixed(1)}s`
                                     }
                                </span>
                            </div>
                        )}


                         {banner && (
                             <div className={`mb-4 p-4 rounded-md flex items-start space-x-3 ${
                                 banner.type === 'error' ? 'bg-red-900/30 border border-red-500/50 text-red-300' :
                                 banner.type === 'warning' ? 'bg-amber-900/30 border border-amber-500/50 text-amber-300' :
                                 'bg-sky-900/30 border border-sky-500/50 text-sky-300' // Info
                             }`}>
                                 {banner.type === 'error' ? <AlertTriangle className="h-5 w-5 flex-shrink-0" /> : <Info className="h-5 w-5 flex-shrink-0" />}
                                 <p className="text-sm">{banner.text}</p>
                             </div>
                         )}


                        {/* Output Area */}
                        <div className="h-full max-h-[60vh] overflow-y-auto"> 
                            {isLoading ? (
                                <div className="flex items-center justify-center h-full min-h-[300px]">
                                    <p className="text-slate-400 animate-pulse">Scraping & Enriching...</p></div>
                            // Don't show critical error UI if banner is set
                            ) : error && !banner ? ( 
                                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                                    <AlertTriangle className="h-10 w-10 text-red-500 mb-4" />
                                    <p className="text-red-400 text-lg font-semibold">Search Failed Critically</p>
                                    <p className="text-red-400/80 mt-2">{error}</p> 
                                </div>
                            ) : leads.length > 0 ? (
                                <table className="min-w-full divide-y divide-slate-700">
                                    <thead className="bg-slate-800/50 sticky top-0">
                                        <tr>
                                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Business Name</th>
                                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Website</th>
                                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Email</th>
                                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Phone</th>
                                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Location</th>
                                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Industry</th>
                                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Revenue Est.</th>
                                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Years Active</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-slate-900/50 divide-y divide-slate-800">
                                        {leads.map((lead, index) => (
                                            <tr key={`${lead.business_name}-${index}`} className="hover:bg-slate-800">
                                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">{lead.business_name}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-400">
                                                    {lead.website && lead.website !== 'N/A' ? (
                                                        <a 
                                                          href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} 
                                                          target="_blank" 
                                                          rel="noopener noreferrer" 
                                                          className="hover:text-emerald-500"
                                                        >
                                                           {lead.website.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '')}
                                                        </a>
                                                    ) : 'N/A'}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-400">{lead.email}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-400">{lead.phone}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-400">{lead.location}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">{lead.industry}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">{lead.revenue_estimate}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">{lead.years_active}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            // Don't show "Enter criteria..." if banner is showing "No leads..."
                            ) : !isLoading && !banner ? ( 
                                <div className="flex items-center justify-center h-full min-h-[300px]">
                                    <p className="text-slate-500">Enter criteria to find new leads.</p>
                                </div>
                            ) : null /* Show nothing if loading or banner exists */ }
                        </div>
                    </div>
                </div>

                {/* History Modal */}
                 {showHistory && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex justify-center items-center p-4">
                        <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl flex flex-col">
                            <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-white">Search History</h3>
                                <Button variant="ghost" size="icon" onClick={() => setShowHistory(false)}><X className="h-5 w-5 text-slate-400 hover:text-white" /></Button>
                            </div>
                            <div className="p-4 space-y-3 overflow-y-auto max-h-[70vh]">
                                {history.length > 0 ? (
                                    history.map(item => (
                                        <div key={item.id} onClick={() => handleHistoryClick(item)} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 cursor-pointer hover:bg-slate-800">
                                            <p className="text-sm font-medium text-white truncate">Query: {item.query}</p>
                                            <p className="text-xs text-slate-400 mt-1 truncate">Location: {item.location || 'N/A'} | Filter: {item.minFilter || 'N/A'}</p> 
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-slate-500 text-center py-8">No history yet.</p>
                                )}
                            </div>
                             <div className="p-4 border-t border-slate-700 flex justify-end">
                                <Button variant="ghost" size="sm" onClick={handleClearHistory} disabled={history.length === 0} className="text-red-500 hover:bg-red-500/10 hover:text-red-400">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Clear History
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}