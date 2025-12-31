import { supabase } from '@/integrations/supabase/client';
import { Property } from '@/data/properties';

interface ScrapeResult {
  success: boolean;
  error?: string;
  data?: {
    properties: Property[];
    sourceUrl: string;
    totalFound: number;
    discoveredUrls: string[];
    rawMarkdown?: string;
  };
}

export const scrapeProperties = async (options?: {
  propertyType?: string;
  listingType?: 'rent' | 'sale';
  searchUrl?: string;
}): Promise<ScrapeResult> => {
  try {
    const { data, error } = await supabase.functions.invoke('scrape-properties', {
      body: {
        propertyType: options?.propertyType || 'all',
        listingType: options?.listingType,
        searchUrl: options?.searchUrl,
      },
    });

    if (error) {
      console.error('Supabase function error:', error);
      return { success: false, error: error.message };
    }

    return data;
  } catch (err) {
    console.error('Error calling scrape function:', err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'Failed to scrape properties' 
    };
  }
};
