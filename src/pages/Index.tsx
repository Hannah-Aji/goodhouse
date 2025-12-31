import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedProperties } from '@/components/FeaturedProperties';
import { Footer } from '@/components/Footer';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { scrapeProperties } from '@/lib/scraper';
import { Property, mockProperties } from '@/data/properties';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, Database, AlertCircle } from 'lucide-react';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState<'mock' | 'scraped'>('mock');
  const { toast } = useToast();

  const handleScrape = async () => {
    setIsLoading(true);
    
    try {
      const result = await scrapeProperties({
        propertyType: activeCategory === 'all' ? undefined : activeCategory,
      });

      if (result.success && result.data?.properties?.length) {
        // Merge scraped properties with proper formatting
        const scrapedProps = result.data.properties.map((p: any) => ({
          ...p,
          createdAt: new Date().toISOString(),
        }));
        
        setProperties(scrapedProps);
        setDataSource('scraped');
        
        toast({
          title: "Properties loaded!",
          description: `Found ${scrapedProps.length} properties from nigeriapropertycentre.com`,
        });
      } else {
        toast({
          title: "Scraping completed",
          description: result.error || "No properties found. Showing demo data.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Scrape error:', error);
      toast({
        title: "Error",
        description: "Failed to scrape properties. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowMockData = () => {
    setProperties(mockProperties);
    setDataSource('mock');
    toast({
      title: "Demo data loaded",
      description: "Showing sample Nigerian properties",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection 
          onCategoryChange={setActiveCategory} 
          activeCategory={activeCategory} 
        />
        
        {/* Data Source Controls */}
        <div className="container py-6 border-b border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Database className="h-4 w-4" />
              <span>
                Data source: <strong className="text-foreground">{dataSource === 'mock' ? 'Demo data' : 'nigeriapropertycentre.com'}</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              {dataSource === 'scraped' && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleShowMockData}
                >
                  Show demo data
                </Button>
              )}
              <Button 
                onClick={handleScrape}
                disabled={isLoading}
                size="sm"
                className="bg-primary hover:bg-primary/90"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Scraping...' : 'Scrape live properties'}
              </Button>
            </div>
          </div>
          
          {/* Legal Notice */}
          <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <p>
              <strong>Note:</strong> Web scraping should only be done with permission from the website owner. 
              Please verify that nigeriapropertycentre.com's terms of service allow scraping before using live data in production.
            </p>
          </div>
        </div>
        
        <FeaturedProperties 
          categoryFilter={activeCategory} 
          properties={properties}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
