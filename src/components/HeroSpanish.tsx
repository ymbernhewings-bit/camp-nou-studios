import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import HeroSlideshow from "@/components/HeroSlideshow";

const HeroSpanish = () => {
  const heroImages = [
    "/lovable-uploads/d1495ddd-d197-4b1f-93fe-6aa8e0a76d99.png", // Arc de Triomf
    "/lovable-uploads/980638b4-0379-4da7-b93e-473489501d88.png", // Park Güell
    "/lovable-uploads/c808f60f-20bc-4633-992b-ff1d7319e14a.png"  // Barcelona beach
  ];

  const scrollToApartments = () => {
    document.getElementById('apartments')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const switchToEnglish = () => {
    window.location.href = '/';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroSlideshow images={heroImages} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
        <div className="mb-6">
          <button
            onClick={switchToEnglish}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 hover:bg-white/20 transition-colors"
          >
            <span className="text-2xl">🇬🇧</span>
            <span className="text-sm font-medium">English</span>
          </button>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
          Experimenta Barcelona
          <span className="block hero-gradient bg-clip-text text-transparent">
            En Apartamentos Premium
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 text-balance max-w-2xl mx-auto leading-relaxed">
          Apartamentos modernos en el corazón de Barcelona, con servicio al cliente 24 horas y check-in automático.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="flex items-center gap-2 text-yellow-400">
            {[...Array(4)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            <Star className="w-5 h-5 fill-current opacity-30" />
            <span className="ml-2 text-white font-semibold">4.3 (Airbnb)</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" onClick={scrollToApartments} className="text-lg px-8 py-6 h-auto">
            Ver Nuestros Apartamentos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSpanish;