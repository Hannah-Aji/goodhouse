-- Create table for property submissions that need approval
CREATE TABLE public.property_submissions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    property_type TEXT NOT NULL,
    listing_type TEXT NOT NULL,
    price NUMERIC NOT NULL,
    price_period TEXT,
    state TEXT NOT NULL,
    city TEXT NOT NULL,
    locality TEXT NOT NULL,
    address TEXT NOT NULL,
    bedrooms INTEGER DEFAULT 0,
    bathrooms INTEGER DEFAULT 0,
    toilets INTEGER DEFAULT 0,
    size NUMERIC,
    description TEXT,
    is_serviced BOOLEAN DEFAULT false,
    is_furnished BOOLEAN DEFAULT false,
    features TEXT[] DEFAULT '{}',
    agent_name TEXT NOT NULL,
    agent_phone TEXT NOT NULL,
    agent_email TEXT,
    agent_company TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.property_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit (insert) a property
CREATE POLICY "Anyone can submit properties"
ON public.property_submissions
FOR INSERT
WITH CHECK (true);

-- Public can only view approved submissions
CREATE POLICY "Anyone can view approved submissions"
ON public.property_submissions
FOR SELECT
USING (status = 'approved');

-- Service role can manage all submissions
CREATE POLICY "Service role can manage all submissions"
ON public.property_submissions
FOR ALL
USING (auth.role() = 'service_role');

-- Create admin_settings table for storing admin password hash
CREATE TABLE public.admin_settings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key TEXT NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Only service role can access admin settings
CREATE POLICY "Service role can manage admin settings"
ON public.admin_settings
FOR ALL
USING (auth.role() = 'service_role');

-- Insert default admin password (password: admin123 - should be changed!)
-- Using simple hash for demo - in production use proper bcrypt
INSERT INTO public.admin_settings (setting_key, setting_value) 
VALUES ('admin_password', 'admin123');

-- Create update trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_submission_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_property_submissions_updated_at
BEFORE UPDATE ON public.property_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_submission_updated_at();