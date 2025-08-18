import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import heroImage from "@/assets/camp-nou-hero.jpg";
const Hero = () => {
  const scrollToApartments = () => {
    document.getElementById('apartments')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroImage})`
    }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">15 minutes from Camp Nou</span>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
          Experience Barcelona
          <span className="block hero-gradient bg-clip-text text-transparent">
            Near Camp Nou
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 text-balance max-w-2xl mx-auto leading-relaxed">
          Premium apartments in the heart of Barcelona, just steps away from the legendary Camp Nou stadium
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="flex items-center gap-2 text-yellow-400">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            <span className="ml-2 text-white font-semibold">Exceptional Location</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" onClick={scrollToApartments} className="text-lg px-8 py-6 h-auto">
            View Our Apartments
          </Button>
          
        </div>
      </div>
    </section>;
};
export default Hero;