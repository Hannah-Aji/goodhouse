-- Create agents table
CREATE TABLE IF NOT EXISTS public.agents (
  id BIGSERIAL PRIMARY KEY,
  source TEXT NOT NULL,
  source_agent_id TEXT,
  name TEXT,
  company TEXT,
  phone TEXT,
  email TEXT,
  profile_url TEXT,
  raw_jsonb JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (source, source_agent_id)
);

-- Create locations table
CREATE TABLE IF NOT EXISTS public.locations (
  id BIGSERIAL PRIMARY KEY,
  country TEXT DEFAULT 'Nigeria',
  state TEXT,
  city TEXT,
  area TEXT,
  UNIQUE (country, state, city, area)
);

-- Create listings table
CREATE TABLE IF NOT EXISTS public.listings (
  id BIGSERIAL PRIMARY KEY,
  source TEXT NOT NULL,
  source_listing_id TEXT NOT NULL,
  url TEXT,
  title TEXT,
  purpose TEXT,           -- sale/rent/shortlet etc
  property_type TEXT,     -- house/flat/apartment/land etc
  bedrooms INT,
  bathrooms INT,
  toilets INT,
  is_serviced BOOLEAN,
  is_furnished BOOLEAN,
  price NUMERIC,
  currency TEXT DEFAULT 'NGN',
  price_period TEXT,      -- per year/month/night (if applicable)
  size NUMERIC,
  size_unit TEXT DEFAULT 'sqm',
  location_id BIGINT REFERENCES public.locations(id),
  agent_id BIGINT REFERENCES public.agents(id),
  description TEXT,
  scraped_at TIMESTAMPTZ DEFAULT NOW(),
  raw_jsonb JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (source, source_listing_id)
);

-- Create listing_images table
CREATE TABLE IF NOT EXISTS public.listing_images (
  id BIGSERIAL PRIMARY KEY,
  listing_id BIGINT REFERENCES public.listings(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  position INT,
  UNIQUE (listing_id, image_url)
);

-- Create listing_features table
CREATE TABLE IF NOT EXISTS public.listing_features (
  id BIGSERIAL PRIMARY KEY,
  listing_id BIGINT REFERENCES public.listings(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  UNIQUE (listing_id, feature)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_listings_location_id ON public.listings(location_id);
CREATE INDEX IF NOT EXISTS idx_listings_agent_id ON public.listings(agent_id);
CREATE INDEX IF NOT EXISTS idx_listings_purpose ON public.listings(purpose);
CREATE INDEX IF NOT EXISTS idx_listings_property_type ON public.listings(property_type);
CREATE INDEX IF NOT EXISTS idx_listings_price ON public.listings(price);
CREATE INDEX IF NOT EXISTS idx_locations_state_city ON public.locations(state, city);

-- Enable Row Level Security
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listing_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listing_features ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables (property listings are public)
CREATE POLICY "Anyone can view agents" ON public.agents
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view locations" ON public.locations
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view listings" ON public.listings
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view listing images" ON public.listing_images
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view listing features" ON public.listing_features
  FOR SELECT USING (true);

-- Service role can do everything (for scraping backend)
CREATE POLICY "Service role can manage agents" ON public.agents
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage locations" ON public.locations
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage listings" ON public.listings
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage listing images" ON public.listing_images
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage listing features" ON public.listing_features
  FOR ALL USING (auth.role() = 'service_role');