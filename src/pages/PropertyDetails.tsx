import { useParams, Link } from 'react-router-dom';
import { mockProperties, formatPrice, formatPriceFull } from '@/data/properties';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  ArrowLeft, 
  Share, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Check,
  Phone,
  Mail,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  ExternalLink,
  Bell,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Minus,
  Copy,
  Twitter,
  Facebook
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const property = mockProperties.find(p => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isNotifyDialogOpen, setIsNotifyDialogOpen] = useState(false);
  const { toast } = useToast();

  // Calculate area average price (mock calculation based on similar properties)
  const getAreaPriceComparison = () => {
    if (!property) return null;
    
    // Find similar properties in the same area with same type
    const similarProperties = mockProperties.filter(p => 
      p.location.area === property.location.area &&
      p.type === property.type &&
      p.propertyType === property.propertyType &&
      p.id !== property.id
    );
    
    // If not enough in same area, expand to city
    const comparisonSet = similarProperties.length >= 2 
      ? similarProperties 
      : mockProperties.filter(p => 
          p.location.city === property.location.city &&
          p.type === property.type &&
          p.propertyType === property.propertyType &&
          p.id !== property.id
        );
    
    if (comparisonSet.length === 0) return null;
    
    // Calculate average price per sqm for comparison
    const avgPricePerSqm = comparisonSet.reduce((sum, p) => sum + (p.price / p.size), 0) / comparisonSet.length;
    const propertyPricePerSqm = property.price / property.size;
    
    const percentageDiff = ((propertyPricePerSqm - avgPricePerSqm) / avgPricePerSqm) * 100;
    
    return {
      percentage: Math.abs(Math.round(percentageDiff)),
      isHigher: percentageDiff > 0,
      isEqual: Math.abs(percentageDiff) < 5,
      comparisonCount: comparisonSet.length,
      areaName: similarProperties.length >= 2 ? property.location.area : property.location.city
    };
  };

  // Mock last scraped date (would come from DB in real implementation)
  const lastScrapedAt = new Date(property?.createdAt || new Date());
  lastScrapedAt.setDate(lastScrapedAt.getDate() + Math.floor(Math.random() * 7)); // Random 0-7 days ago
  
  const formatLastRefreshed = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' });
  };

  const priceComparison = getAreaPriceComparison();

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Property not found</h1>
            <Link to="/">
              <Button>Back to listings</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const googleMapsUrl = property.location.lat && property.location.lng
    ? `https://www.google.com/maps?q=${property.location.lat},${property.location.lng}`
    : `https://www.google.com/maps/search/${encodeURIComponent(property.location.address || property.location.area + ', ' + property.location.city)}`;

  const googleMapsEmbedUrl = property.location.lat && property.location.lng
    ? `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${property.location.lng}!3d${property.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjYnNTIuMSJOIDPCsDI4JzIwLjMiRQ!5e0!3m2!1sen!2sng!4v1234567890`
    : null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col bg-background"
    >
      <Navbar />
      
      <main className="flex-1">
        {/* Back Button */}
        <div className="container py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to listings
          </Link>
        </div>

        {/* Image Gallery */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="container pb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden">
            {/* Main Image */}
            <div className="md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto">
              <img 
                src={property.images[0]} 
                alt={property.title}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setShowAllPhotos(true)}
              />
            </div>
            
            {/* Smaller Images */}
            {property.images.slice(1, 5).map((image, index) => (
              <div key={index} className="hidden md:block relative aspect-[4/3]">
                <img 
                  src={image} 
                  alt={`${property.title} ${index + 2}`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => {
                    setCurrentImageIndex(index + 1);
                    setShowAllPhotos(true);
                  }}
                />
                {index === 3 && property.images.length > 5 && (
                  <button 
                    onClick={() => setShowAllPhotos(true)}
                    className="absolute inset-0 bg-foreground/50 flex items-center justify-center text-background font-medium"
                  >
                    +{property.images.length - 5} more
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Show All Photos Button */}
          <Button 
            variant="outline" 
            className="mt-4 md:hidden"
            onClick={() => setShowAllPhotos(true)}
          >
            Show all {property.images.length} photos
          </Button>
        </motion.section>

        {/* Content */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="container pb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={property.type === 'sale' ? 'default' : 'secondary'}>
                      For {property.type === 'sale' ? 'Sale' : 'Rent'}
                    </Badge>
                    {property.isVerified && (
                      <Badge variant="outline" className="gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                    {property.title}
                  </h1>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {property.location.address || `${property.location.area}, ${property.location.city}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Dialog open={isNotifyDialogOpen} onOpenChange={setIsNotifyDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Bell className="h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Get Price Alerts</DialogTitle>
                        <DialogDescription>
                          Enter your details to receive notifications about price changes and similar listings.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <label htmlFor="firstName" className="text-sm font-medium">
                              First Name
                            </label>
                            <Input
                              id="firstName"
                              type="text"
                              placeholder="John"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              maxLength={50}
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="lastName" className="text-sm font-medium">
                              Last Name
                            </label>
                            <Input
                              id="lastName"
                              type="text"
                              placeholder="Doe"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              maxLength={50}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium">
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+234 800 000 0000"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            maxLength={20}
                          />
                          <p className="text-xs text-muted-foreground">
                            We'll send you SMS alerts about this property
                          </p>
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={() => {
                            if (!firstName.trim()) {
                              toast({
                                title: "First name required",
                                description: "Please enter your first name",
                                variant: "destructive",
                              });
                              return;
                            }
                            if (!lastName.trim()) {
                              toast({
                                title: "Last name required",
                                description: "Please enter your last name",
                                variant: "destructive",
                              });
                              return;
                            }
                            if (phoneNumber.trim().length < 10) {
                              toast({
                                title: "Invalid phone number",
                                description: "Please enter a valid phone number",
                                variant: "destructive",
                              });
                              return;
                            }
                            toast({
                              title: "Notifications enabled!",
                              description: `Hi ${firstName}, you'll receive alerts at ${phoneNumber}`,
                            });
                            setIsNotifyDialogOpen(false);
                            setFirstName('');
                            setLastName('');
                            setPhoneNumber('');
                          }}
                        >
                          Enable Notifications
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Share className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-background">
                      <DropdownMenuItem
                        onClick={() => {
                          const shareUrl = window.location.href;
                          const text = encodeURIComponent(`Check out this property: ${property.title}`);
                          window.open(`https://wa.me/?text=${text}%20${encodeURIComponent(shareUrl)}`, '_blank');
                        }}
                        className="cursor-pointer"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          const shareUrl = window.location.href;
                          const text = encodeURIComponent(`Check out this property: ${property.title}`);
                          window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`, '_blank');
                        }}
                        className="cursor-pointer"
                      >
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter / X
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          const shareUrl = window.location.href;
                          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
                        }}
                        className="cursor-pointer"
                      >
                        <Facebook className="h-4 w-4 mr-2" />
                        Facebook
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={async () => {
                          await navigator.clipboard.writeText(window.location.href);
                          toast({
                            title: "Link copied!",
                            description: "Property link has been copied to clipboard",
                          });
                        }}
                        className="cursor-pointer"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Link
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Price */}
              <div className="pb-6 border-b border-border">
                <p className="text-3xl font-bold text-foreground">
                  {formatPriceFull(property.price)}
                  {property.priceUnit && (
                    <span className="text-lg font-normal text-muted-foreground"> / {property.priceUnit}</span>
                  )}
                </p>
                
                {/* Price Comparison */}
                {priceComparison && (
                  <div className={`mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                    priceComparison.isEqual 
                      ? 'bg-muted text-muted-foreground'
                      : priceComparison.isHigher 
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                  }`}>
                    {priceComparison.isEqual ? (
                      <>
                        <Minus className="h-4 w-4" />
                        Around average for {priceComparison.areaName}
                      </>
                    ) : priceComparison.isHigher ? (
                      <>
                        <TrendingUp className="h-4 w-4" />
                        {priceComparison.percentage}% above typical {property.propertyType}s in {priceComparison.areaName}
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4" />
                        {priceComparison.percentage}% below typical {property.propertyType}s in {priceComparison.areaName}
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-3 gap-6 pb-6 border-b border-border">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-foreground mb-1">
                    <Bed className="h-5 w-5" />
                    <span className="text-xl font-semibold">{property.bedrooms}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Bedrooms</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-foreground mb-1">
                    <Bath className="h-5 w-5" />
                    <span className="text-xl font-semibold">{property.bathrooms}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Bathrooms</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-foreground mb-1">
                    <Maximize className="h-5 w-5" />
                    <span className="text-xl font-semibold">{property.size}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{property.sizeUnit}</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">About this property</h2>
                
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
                
                {/* Serviced & Furnished Pills - Below Description */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                    {property.isServiced ? 'Serviced' : 'Unserviced'}
                  </span>
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                    {property.isFurnished ? 'Furnished' : 'Unfurnished'}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 pb-6 border-b border-border">
                <h2 className="text-xl font-semibold">Features & Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Map */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Location</h2>
                  <a 
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    Open in Google Maps
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <p className="text-muted-foreground">
                  {property.location.address || `${property.location.area}, ${property.location.city}, ${property.location.state}`}
                </p>
                
                {/* Map Embed */}
                <div className="rounded-xl overflow-hidden border border-border h-[300px] bg-muted">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.location.address || property.location.area + ', ' + property.location.city + ', Nigeria')}&zoom=15`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Price & Agent */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Price Summary - Receipt Style */}
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                  {/* Receipt Header - Green */}
                  <div className="bg-emerald-500 text-white px-6 py-4 text-center">
                    <h3 className="text-sm font-medium tracking-wider uppercase">Price Summary</h3>
                  </div>
                  
                  {/* Receipt Body */}
                  <div className="p-6 space-y-4 font-mono text-sm">
                    {/* Dotted separator */}
                    <div className="border-b-2 border-dashed border-border" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Listing Price</span>
                      <span className="font-semibold">{formatPriceFull(property.price)}</span>
                    </div>
                    
                    {property.type === 'rent' && property.priceUnit && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Payment Period</span>
                          <span className="font-medium capitalize">{property.priceUnit}ly</span>
                        </div>
                        
                        <div className="border-b-2 border-dashed border-border" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Monthly Equiv.</span>
                          <span className="font-medium">
                            {formatPrice(property.priceUnit === 'year' ? property.price / 12 : property.price)}
                          </span>
                        </div>
                      </>
                    )}
                    
                    {property.type === 'sale' && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Type</span>
                          <span className="font-medium">For Sale</span>
                        </div>
                        
                        <div className="border-b-2 border-dashed border-border" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Price/sqm</span>
                          <span className="font-medium">
                            {formatPrice(Math.round(property.price / property.size))}
                          </span>
                        </div>
                      </>
                    )}
                    
                    <div className="border-b-2 border-dashed border-border" />
                    
                    {/* Total */}
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-foreground">TOTAL</span>
                      <span className="font-bold text-lg text-foreground">{formatPriceFull(property.price)}</span>
                    </div>
                    
                    {/* No Hidden Fees */}
                    <div className="pt-4 text-center">
                      <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">No Hidden Fees!</p>
                    </div>
                    
                    {/* Receipt footer decoration */}
                    <div className="pt-2 text-center text-xs text-muted-foreground">
                      <p>Thank you for viewing!</p>
                      <p className="mt-1">Ref: #{property.id.padStart(6, '0')}</p>
                    </div>
                  </div>
                  
                  {/* Receipt tear effect */}
                  <div className="h-4 bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,hsl(var(--border))_8px,hsl(var(--border))_16px)]" />
                </div>

                {/* Agent Card */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Contact Agent</h3>
                  
                  <div className="flex items-center gap-4 mb-6">
                    {property.agent.image ? (
                      <img 
                        src={property.agent.image} 
                        alt={property.agent.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xl font-semibold text-muted-foreground">
                          {property.agent.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-foreground">{property.agent.name}</p>
                      <p className="text-sm text-primary font-medium">{property.agent.company}</p>
                      <p className="text-xs text-muted-foreground">Property Agent</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <a href={`tel:${property.agent.phone}`} className="block">
                      <Button className="w-full gap-2" size="lg">
                        <Phone className="h-4 w-4" />
                        Call Agent
                      </Button>
                    </a>
                    
                    <a href={`https://wa.me/${property.agent.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" className="w-full gap-2" size="lg">
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </Button>
                    </a>

                    {property.agent.email && (
                      <a href={`mailto:${property.agent.email}?subject=Inquiry about: ${property.title}`} className="block">
                        <Button variant="outline" className="w-full gap-2" size="lg">
                          <Mail className="h-4 w-4" />
                          Send Email
                        </Button>
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Response time: Usually within 1 hour
                  </p>
                </div>

                {/* Source Attribution */}
                <div className="bg-muted/50 border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <RefreshCw className="h-3 w-3" />
                      Last refreshed: {formatLastRefreshed(lastScrapedAt)}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    This listing was scraped from{' '}
                    <a 
                      href="https://nigeriapropertycenter.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      nigeriapropertycenter.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Full Screen Gallery Modal */}
      <AnimatePresence>
        {showAllPhotos && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <Button 
                variant="ghost" 
                onClick={() => setShowAllPhotos(false)}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Close
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentImageIndex + 1} / {property.images.length}
              </span>
              <Button variant="ghost" size="icon">
                <Share className="h-5 w-5" />
              </Button>
            </div>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center p-4 relative">
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 z-10"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={property.images[currentImageIndex]}
                alt={`${property.title} ${currentImageIndex + 1}`}
                className="max-h-full max-w-full object-contain rounded-lg"
              />
              
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 z-10"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Thumbnails */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2 overflow-x-auto justify-center">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </motion.div>
  );
};

export default PropertyDetails;
