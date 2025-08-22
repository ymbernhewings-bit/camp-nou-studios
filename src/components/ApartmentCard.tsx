import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Wifi, Wind, Thermometer, Tv, Bed } from "lucide-react";
import AvailabilityChecker from "./AvailabilityChecker";
import { useState, useEffect } from "react";

interface ApartmentCardProps {
  name: string;
  maxGuests: number;
  bedrooms: number;
  images: string[];
  features: string[];
  icsUrl: string;
}

const ApartmentCard = ({ name, maxGuests, bedrooms, images, features, icsUrl }: ApartmentCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovering && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isHovering, images.length]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setCurrentImageIndex(0);
  };
  return (
    <Card className="overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1 card-gradient border-0">
      <div 
        className="relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full h-64">
          {images.map((image, index) => (
            <img 
              key={index}
              src={image} 
              alt={`${name} interior ${index + 1}`}
              className={`absolute inset-0 w-full h-64 object-cover transition-all duration-500 ${
                index === currentImageIndex 
                  ? 'opacity-100 transform translate-x-0' 
                  : index < currentImageIndex 
                    ? 'opacity-0 transform -translate-x-full'
                    : 'opacity-0 transform translate-x-full'
              }`}
            />
          ))}
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Badge variant="secondary" className="bg-primary/90 text-primary-foreground border-0">
            <Users className="w-3 h-3 mr-1" />
            Up to {maxGuests} guests
          </Badge>
          <Badge variant="secondary" className="bg-primary/90 text-primary-foreground border-0">
            <Bed className="w-3 h-3 mr-1" />
            {bedrooms} bedroom{bedrooms > 1 ? 's' : ''}
          </Badge>
        </div>
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 flex gap-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-foreground">{name}</CardTitle>
        <div className="text-sm text-muted-foreground">
          Barcelona, Spain
        </div>
      </CardHeader>
      
      <CardContent className="pb-6">
        <div className="grid grid-cols-2 gap-3">
          {features.includes('AC') && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Wind className="w-4 h-4 mr-2 text-primary" />
              Air Conditioning
            </div>
          )}
          {features.includes('Heating') && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Thermometer className="w-4 h-4 mr-2 text-primary" />
              Heating
            </div>
          )}
          {features.includes('WiFi') && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Wifi className="w-4 h-4 mr-2 text-primary" />
              High-speed WiFi
            </div>
          )}
          {features.includes('TV') && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Tv className="w-4 h-4 mr-2 text-primary" />
              Smart TV
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <AvailabilityChecker 
          apartmentName={name}
          icsUrl={icsUrl}
        />
      </CardFooter>
    </Card>
  );
};

export default ApartmentCard;