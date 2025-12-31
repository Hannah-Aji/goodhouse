const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ScrapedProperty {
  id: string;
  title: string;
  type: 'rent' | 'sale';
  propertyType: 'apartment' | 'house' | 'land' | 'commercial';
  price: number;
  priceUnit?: 'year' | 'month';
  location: {
    city: string;
    state: string;
    area: string;
  };
  bedrooms?: number;
  bathrooms?: number;
  size: number;
  sizeUnit: 'sqm' | 'sqft' | 'plots';
  image: string;
  features: string[];
  description: string;
  sourceUrl: string;
  isVerified: boolean;
  isFeatured: boolean;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { searchUrl, propertyType, listingType } = await req.json();
    
    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl connector not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build the URL to scrape - default to nigeriapropertycentre.com
    let targetUrl = searchUrl || 'https://nigeriapropertycentre.com';
    
    // Add filters if specified
    if (listingType === 'rent') {
      targetUrl = 'https://nigeriapropertycentre.com/for-rent';
    } else if (listingType === 'sale') {
      targetUrl = 'https://nigeriapropertycentre.com/for-sale';
    }
    
    if (propertyType && propertyType !== 'all') {
      const typeMap: Record<string, string> = {
        'house': '/houses',
        'apartment': '/flats-apartments', 
        'land': '/land',
        'commercial': '/commercial-property'
      };
      if (typeMap[propertyType]) {
        targetUrl += typeMap[propertyType];
      }
    }

    console.log('Scraping URL:', targetUrl);

    // First, use the map endpoint to discover property listing URLs
    const mapResponse = await fetch('https://api.firecrawl.dev/v1/map', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: targetUrl,
        limit: 20,
        includeSubdomains: false,
      }),
    });

    const mapData = await mapResponse.json();
    
    if (!mapResponse.ok) {
      console.error('Firecrawl Map API error:', mapData);
      return new Response(
        JSON.stringify({ success: false, error: mapData.error || 'Failed to map website' }),
        { status: mapResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Found URLs:', mapData.links?.length || 0);

    // Filter for property listing URLs (they typically contain property IDs or specific patterns)
    const propertyUrls = (mapData.links || [])
      .filter((url: string) => {
        // Look for property detail pages
        return url.includes('/for-sale/') || 
               url.includes('/for-rent/') ||
               url.match(/\/\d{4,}/) || // URLs with numeric IDs
               url.includes('/property/');
      })
      .slice(0, 8); // Limit to 8 properties to avoid rate limits

    console.log('Property URLs to scrape:', propertyUrls.length);

    // Now scrape the main listing page for property data
    const scrapeResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: targetUrl,
        formats: ['markdown', 'html'],
        onlyMainContent: true,
        waitFor: 2000,
      }),
    });

    const scrapeData = await scrapeResponse.json();

    if (!scrapeResponse.ok) {
      console.error('Firecrawl Scrape API error:', scrapeData);
      return new Response(
        JSON.stringify({ success: false, error: scrapeData.error || 'Failed to scrape website' }),
        { status: scrapeResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Scrape successful, processing content...');

    // Parse the scraped content to extract property information
    const markdown = scrapeData.data?.markdown || scrapeData.markdown || '';
    const html = scrapeData.data?.html || scrapeData.html || '';
    
    // Extract properties from the content (basic parsing)
    const properties = parsePropertiesFromContent(markdown, html, targetUrl);

    console.log('Parsed properties:', properties.length);

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: {
          properties,
          sourceUrl: targetUrl,
          totalFound: properties.length,
          discoveredUrls: propertyUrls,
          rawMarkdown: markdown.slice(0, 2000) // Include sample for debugging
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in scrape-properties:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to scrape properties';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function parsePropertiesFromContent(markdown: string, html: string, sourceUrl: string): ScrapedProperty[] {
  const properties: ScrapedProperty[] = [];
  
  // This is a basic parser - in production you'd want more sophisticated parsing
  // based on the actual structure of nigeriapropertycentre.com
  
  // Look for price patterns in Nigerian Naira
  const pricePattern = /₦[\d,]+(?:\.\d{2})?|NGN\s*[\d,]+/gi;
  const bedroomPattern = /(\d+)\s*(?:bed(?:room)?s?|br)/gi;
  const bathroomPattern = /(\d+)\s*(?:bath(?:room)?s?|ba)/gi;
  const sizePattern = /(\d+(?:,\d{3})*)\s*(?:sqm|sq\.?\s*m|square\s*met(?:er|re)s?)/gi;
  
  // Extract location mentions (Nigerian cities/areas)
  const nigerianLocations = [
    'Lekki', 'Victoria Island', 'Ikoyi', 'Ajah', 'Banana Island',
    'Ikeja', 'Yaba', 'Marina', 'Surulere', 'Gbagada',
    'Abuja', 'Port Harcourt', 'Ibadan', 'Kano', 'Kaduna'
  ];

  // Split content into potential property blocks
  const blocks = markdown.split(/(?=#{2,3}\s|(?:\n\n|\r\n\r\n)(?=[A-Z]))/);
  
  let propertyIndex = 0;
  
  for (const block of blocks) {
    if (block.length < 50) continue; // Skip very short blocks
    
    // Check if block looks like a property listing
    const hasPrice = pricePattern.test(block);
    const hasBedroom = bedroomPattern.test(block);
    const hasLocation = nigerianLocations.some(loc => 
      block.toLowerCase().includes(loc.toLowerCase())
    );
    
    if (hasPrice || (hasBedroom && hasLocation)) {
      // Extract data from this block
      const priceMatch = block.match(/₦([\d,]+)/);
      const bedroomMatch = block.match(/(\d+)\s*(?:bed|br)/i);
      const bathroomMatch = block.match(/(\d+)\s*(?:bath|ba)/i);
      const sizeMatch = block.match(/(\d+(?:,\d{3})*)\s*(?:sqm|sq)/i);
      
      // Find location
      let location = { city: 'Lagos', state: 'Lagos', area: 'Unknown' };
      for (const loc of nigerianLocations) {
        if (block.toLowerCase().includes(loc.toLowerCase())) {
          location.area = loc;
          if (['Abuja'].includes(loc)) {
            location.city = 'Abuja';
            location.state = 'FCT';
          }
          break;
        }
      }
      
      // Determine property type
      let propertyType: 'apartment' | 'house' | 'land' | 'commercial' = 'apartment';
      if (/duplex|detached|semi-detached|bungalow|mansion/i.test(block)) {
        propertyType = 'house';
      } else if (/land|plot|acre/i.test(block)) {
        propertyType = 'land';
      } else if (/office|shop|warehouse|commercial/i.test(block)) {
        propertyType = 'commercial';
      }
      
      // Determine if for rent or sale
      const isRent = /rent|lease|per\s*(?:year|annum|month)/i.test(block);
      
      // Extract title (first line or heading)
      const titleMatch = block.match(/^(?:#+\s*)?([^\n]+)/);
      const title = titleMatch ? titleMatch[1].slice(0, 100) : `Property in ${location.area}`;
      
      const property: ScrapedProperty = {
        id: `scraped-${Date.now()}-${propertyIndex++}`,
        title: title.trim(),
        type: isRent ? 'rent' : 'sale',
        propertyType,
        price: priceMatch ? parseInt(priceMatch[1].replace(/,/g, '')) : 0,
        priceUnit: isRent ? 'year' : undefined,
        location,
        bedrooms: bedroomMatch ? parseInt(bedroomMatch[1]) : undefined,
        bathrooms: bathroomMatch ? parseInt(bathroomMatch[1]) : undefined,
        size: sizeMatch ? parseInt(sizeMatch[1].replace(/,/g, '')) : 100,
        sizeUnit: 'sqm',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
        features: [],
        description: block.slice(0, 200).trim(),
        sourceUrl,
        isVerified: false,
        isFeatured: false,
      };
      
      if (property.price > 0) {
        properties.push(property);
      }
    }
  }
  
  return properties.slice(0, 12); // Limit results
}
