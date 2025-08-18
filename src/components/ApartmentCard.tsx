import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Wifi, Wind, Thermometer, Tv, MapPin } from "lucide-react";

interface ApartmentCardProps {
  name: string;
  maxGuests: number;
  image: string;
  features: string[];
  onCheckAvailability: () => void;
}

const ApartmentCard = ({ name, maxGuests, image, features, onCheckAvailability }: ApartmentCardProps) => {
  return (
    <Card className="overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1 card-gradient border-0">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={`${name} interior`}
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-primary/90 text-primary-foreground border-0">
            <Users className="w-3 h-3 mr-1" />
            Up to {maxGuests} guests
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-foreground">{name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-3 h-3 mr-1" />
          15 min walk to Camp Nou
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
        <Button 
          variant="availability"
          size="lg"
          onClick={onCheckAvailability}
          className="w-full"
        >
          Check Availability
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApartmentCard;