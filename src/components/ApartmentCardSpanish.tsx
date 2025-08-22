import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Bed } from "lucide-react";
import AvailabilityChecker from "@/components/AvailabilityChecker";

interface ApartmentCardProps {
  name: string;
  maxGuests: number;
  bedrooms: number;
  images: string[];
  features: string[];
  icsUrl: string;
}

const ApartmentCardSpanish = ({ name, maxGuests, bedrooms, images, features, icsUrl }: ApartmentCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 1500);

    return () => clearInterval(interval);
  }, [isHovering, images.length]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCurrentImageIndex(0);
  };

  return (
    <Card 
      className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-xl bg-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardHeader className="p-0 relative">
        <div className="relative h-64 overflow-hidden">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${name} - Imagen ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          
          <div className="absolute top-4 right-4 flex gap-2">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-foreground font-semibold">
              <Users className="w-3 h-3 mr-1" />
              {maxGuests} huéspedes
            </Badge>
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-foreground font-semibold">
              <Bed className="w-3 h-3 mr-1" />
              {bedrooms} dormitorio{bedrooms > 1 ? 's' : ''}
            </Badge>
          </div>
          
          {/* Image pagination dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white' 
                    : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm">
            Barcelona, España
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-background/50">
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <AvailabilityChecker apartmentName={name} icsUrl={icsUrl} />
      </CardFooter>
    </Card>
  );
};

export default ApartmentCardSpanish;