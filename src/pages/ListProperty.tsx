import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Building2, CheckCircle, Phone, Mail, Upload, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useEffect } from 'react';
import { getStates, getCities, getLocalities } from '@/data/nigerianLocations';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const featuresList = [
  'Swimming Pool', 'Gym', 'Security', 'Parking', 'Garden', 
  'Smart Home', 'Generator', 'BQ', 'Elevator', '24/7 Power',
  'CCTV', 'Electric Fence', 'Water Supply', 'Prepaid Meter'
];

const propertySchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(100, 'Title must be less than 100 characters'),
  propertyType: z.enum(['house', 'apartment', 'shortlet'], { required_error: 'Please select a property type' }),
  listingType: z.enum(['rent', 'sale'], { required_error: 'Please select listing type' }),
  price: z.number().min(1000, 'Price must be at least ₦1,000'),
  priceUnit: z.enum(['year', 'month', 'day']).optional(),
  state: z.string().min(1, 'Please select a state'),
  city: z.string().min(1, 'Please select a city'),
  locality: z.string().min(1, 'Please select a locality'),
  address: z.string().min(5, 'Address must be at least 5 characters').max(200, 'Address must be less than 200 characters'),
  bedrooms: z.number().min(0).max(20),
  bathrooms: z.number().min(0).max(20),
  toilets: z.number().min(0).max(20),
  size: z.number().min(1, 'Size must be at least 1 sqm'),
  description: z.string().min(50, 'Description must be at least 50 characters').max(2000, 'Description must be less than 2000 characters'),
  isServiced: z.boolean(),
  isFurnished: z.boolean(),
  agentName: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  agentPhone: z.string().min(10, 'Please enter a valid phone number').max(20, 'Phone number is too long'),
  agentEmail: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  agentCompany: z.string().max(100, 'Company name must be less than 100 characters').optional().or(z.literal('')),
});

const ListProperty = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form state
  const [title, setTitle] = useState('');
  const [propertyType, setPropertyType] = useState<string>('');
  const [listingType, setListingType] = useState<string>('');
  const [price, setPrice] = useState('');
  const [priceUnit, setPriceUnit] = useState<string>('year');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [locality, setLocality] = useState('');
  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [toilets, setToilets] = useState('');
  const [size, setSize] = useState('');
  const [description, setDescription] = useState('');
  const [isServiced, setIsServiced] = useState(false);
  const [isFurnished, setIsFurnished] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [agentName, setAgentName] = useState('');
  const [agentPhone, setAgentPhone] = useState('');
  const [agentEmail, setAgentEmail] = useState('');
  const [agentCompany, setAgentCompany] = useState('');

  // Location cascading
  const states = getStates();
  const cities = getCities(state);
  const localities = getLocalities(state, city);

  useEffect(() => {
    setCity('');
    setLocality('');
  }, [state]);

  useEffect(() => {
    setLocality('');
  }, [city]);

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const formData = {
      title: title.trim(),
      propertyType: propertyType as 'house' | 'apartment' | 'shortlet',
      listingType: listingType as 'rent' | 'sale',
      price: parseFloat(price) || 0,
      priceUnit: priceUnit as 'year' | 'month' | 'day',
      state,
      city,
      locality,
      address: address.trim(),
      bedrooms: parseInt(bedrooms) || 0,
      bathrooms: parseInt(bathrooms) || 0,
      toilets: parseInt(toilets) || 0,
      size: parseFloat(size) || 0,
      description: description.trim(),
      isServiced,
      isFurnished,
      agentName: agentName.trim(),
      agentPhone: agentPhone.trim(),
      agentEmail: agentEmail.trim(),
      agentCompany: agentCompany.trim(),
    };

    const result = propertySchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        title: 'Validation Error',
        description: 'Please fix the highlighted fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission (in real app, this would call an API)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: 'Property Submitted!',
      description: 'Your listing has been submitted for review. We\'ll get back to you within 24 hours.',
    });
    
    // Reset form
    setTitle('');
    setPropertyType('');
    setListingType('');
    setPrice('');
    setPriceUnit('year');
    setState('');
    setCity('');
    setLocality('');
    setAddress('');
    setBedrooms('');
    setBathrooms('');
    setToilets('');
    setSize('');
    setDescription('');
    setIsServiced(false);
    setIsFurnished(false);
    setSelectedFeatures([]);
    setAgentName('');
    setAgentPhone('');
    setAgentEmail('');
    setAgentCompany('');
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                List Your Property on{' '}
                <span className="text-primary">Good House</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Reach thousands of potential buyers and renters across Nigeria.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Property Details */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Property Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Property Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Luxurious 4 Bedroom Duplex with Pool"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={errors.title ? 'border-destructive' : ''}
                    />
                    {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Property Type *</Label>
                      <Select value={propertyType} onValueChange={setPropertyType}>
                        <SelectTrigger className={errors.propertyType ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="shortlet">Shortlet</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.propertyType && <p className="text-sm text-destructive mt-1">{errors.propertyType}</p>}
                    </div>

                    <div>
                      <Label>Listing Type *</Label>
                      <Select value={listingType} onValueChange={setListingType}>
                        <SelectTrigger className={errors.listingType ? 'border-destructive' : ''}>
                          <SelectValue placeholder="For rent or sale" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          <SelectItem value="rent">For Rent</SelectItem>
                          <SelectItem value="sale">For Sale</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.listingType && <p className="text-sm text-destructive mt-1">{errors.listingType}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price (₦) *</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="e.g., 5000000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className={errors.price ? 'border-destructive' : ''}
                      />
                      {errors.price && <p className="text-sm text-destructive mt-1">{errors.price}</p>}
                    </div>

                    {listingType === 'rent' && (
                      <div>
                        <Label>Price Period</Label>
                        <Select value={priceUnit} onValueChange={setPriceUnit}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-background">
                            <SelectItem value="year">Per Year</SelectItem>
                            <SelectItem value="month">Per Month</SelectItem>
                            <SelectItem value="day">Per Day (Shortlet)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        min="0"
                        placeholder="0"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Input
                        id="bathrooms"
                        type="number"
                        min="0"
                        placeholder="0"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="toilets">Toilets</Label>
                      <Input
                        id="toilets"
                        type="number"
                        min="0"
                        placeholder="0"
                        value={toilets}
                        onChange={(e) => setToilets(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="size">Size (sqm) *</Label>
                      <Input
                        id="size"
                        type="number"
                        min="1"
                        placeholder="e.g., 250"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className={errors.size ? 'border-destructive' : ''}
                      />
                      {errors.size && <p className="text-sm text-destructive mt-1">{errors.size}</p>}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="isServiced" 
                        checked={isServiced}
                        onCheckedChange={(checked) => setIsServiced(!!checked)}
                      />
                      <Label htmlFor="isServiced" className="cursor-pointer">Serviced</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="isFurnished" 
                        checked={isFurnished}
                        onCheckedChange={(checked) => setIsFurnished(!!checked)}
                      />
                      <Label htmlFor="isFurnished" className="cursor-pointer">Furnished</Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-6">
                <h2 className="text-xl font-semibold">📍 Location</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>State *</Label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger className={errors.state ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent className="bg-background">
                        {states.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.state && <p className="text-sm text-destructive mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <Label>City *</Label>
                    <Select value={city} onValueChange={setCity} disabled={!state}>
                      <SelectTrigger className={errors.city ? 'border-destructive' : ''}>
                        <SelectValue placeholder={state ? "Select City" : "Select state first"} />
                      </SelectTrigger>
                      <SelectContent className="bg-background">
                        {cities.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <Label>Locality *</Label>
                    <Select value={locality} onValueChange={setLocality} disabled={!city}>
                      <SelectTrigger className={errors.locality ? 'border-destructive' : ''}>
                        <SelectValue placeholder={city ? "Select Locality" : "Select city first"} />
                      </SelectTrigger>
                      <SelectContent className="bg-background">
                        {localities.map((l) => (
                          <SelectItem key={l} value={l}>{l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.locality && <p className="text-sm text-destructive mt-1">{errors.locality}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Full Address *</Label>
                  <Input
                    id="address"
                    placeholder="e.g., 15 Admiralty Way, Lekki Phase 1"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={errors.address ? 'border-destructive' : ''}
                  />
                  {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
                </div>
              </div>

              {/* Description & Features */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-6">
                <h2 className="text-xl font-semibold">📝 Description & Features</h2>

                <div>
                  <Label htmlFor="description">Property Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your property in detail. Include information about the condition, unique features, nearby amenities, and why it's a great choice for potential buyers/renters."
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={errors.description ? 'border-destructive' : ''}
                  />
                  <p className="text-sm text-muted-foreground mt-1">{description.length}/2000 characters</p>
                  {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
                </div>

                <div>
                  <Label className="mb-3 block">Features</Label>
                  <div className="flex flex-wrap gap-2">
                    {featuresList.map((feature) => (
                      <button
                        key={feature}
                        type="button"
                        onClick={() => toggleFeature(feature)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          selectedFeatures.includes(feature)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {feature}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Agent/Owner Info */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-6">
                <h2 className="text-xl font-semibold">👤 Contact Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="agentName">Your Name *</Label>
                    <Input
                      id="agentName"
                      placeholder="Full name"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      className={errors.agentName ? 'border-destructive' : ''}
                    />
                    {errors.agentName && <p className="text-sm text-destructive mt-1">{errors.agentName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="agentPhone">Phone Number *</Label>
                    <Input
                      id="agentPhone"
                      placeholder="+234 801 234 5678"
                      value={agentPhone}
                      onChange={(e) => setAgentPhone(e.target.value)}
                      className={errors.agentPhone ? 'border-destructive' : ''}
                    />
                    {errors.agentPhone && <p className="text-sm text-destructive mt-1">{errors.agentPhone}</p>}
                  </div>

                  <div>
                    <Label htmlFor="agentEmail">Email Address</Label>
                    <Input
                      id="agentEmail"
                      type="email"
                      placeholder="your@email.com"
                      value={agentEmail}
                      onChange={(e) => setAgentEmail(e.target.value)}
                      className={errors.agentEmail ? 'border-destructive' : ''}
                    />
                    {errors.agentEmail && <p className="text-sm text-destructive mt-1">{errors.agentEmail}</p>}
                  </div>

                  <div>
                    <Label htmlFor="agentCompany">Company (Optional)</Label>
                    <Input
                      id="agentCompany"
                      placeholder="Your agency or company name"
                      value={agentCompany}
                      onChange={(e) => setAgentCompany(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  className="min-w-[200px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Property'}
                </Button>
              </div>
            </motion.form>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Why List With Us?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join hundreds of agents and property owners who trust Good House.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: 'Wide Reach',
                  description: 'Access our growing community of house hunters across Nigeria.',
                },
                {
                  title: 'Easy Management',
                  description: 'Simple tools to manage your listings and track inquiries.',
                },
                {
                  title: 'Quality Leads',
                  description: 'Connect with serious buyers and renters actively searching.',
                },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ListProperty;