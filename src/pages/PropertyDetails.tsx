import { useParams, Link } from 'react-router-dom';
import { mockProperties, formatPrice, formatPriceFull } from '@/data/properties';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Heart, 
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
  ExternalLink
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const property = mockProperties.find(p => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

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
    <div className="min-h-screen flex flex-col bg-background">
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
        <section className="container pb-8">
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
        </section>

        {/* Content */}
        <section className="container pb-16">
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
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-primary text-primary' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share className="h-5 w-5" />
                  </Button>
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

            {/* Right Column - Agent Contact */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
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
                      <p className="text-sm text-muted-foreground">Property Agent</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a href={`tel:${property.agent.phone}`}>
                      <Button className="w-full gap-2" size="lg">
                        <Phone className="h-4 w-4" />
                        Call Agent
                      </Button>
                    </a>
                    
                    <a href={`https://wa.me/${property.agent.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full gap-2" size="lg">
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </Button>
                    </a>

                    {property.agent.email && (
                      <a href={`mailto:${property.agent.email}?subject=Inquiry about: ${property.title}`}>
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

                {/* Price Summary */}
                <div className="bg-secondary/50 border border-border rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Price Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Listing Price</span>
                      <span className="font-medium">{formatPriceFull(property.price)}</span>
                    </div>
                    {property.type === 'rent' && property.priceUnit && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Payment Period</span>
                          <span className="font-medium capitalize">{property.priceUnit}ly</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-border">
                          <span className="text-muted-foreground">Monthly Equivalent</span>
                          <span className="font-medium">
                            {formatPrice(property.priceUnit === 'year' ? property.price / 12 : property.price)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setIsLiked(!isLiked)}>
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-primary text-primary' : ''}`} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share className="h-5 w-5" />
                </Button>
              </div>
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
    </div>
  );
};

export default PropertyDetails;
