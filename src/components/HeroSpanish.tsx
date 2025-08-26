import { Button } from "@/components/ui/button";
import { Star, MessageCircle, MapPin } from "lucide-react";
import HeroSlideshow from "./HeroSlideshow";

const HeroSpanish = () => {
  const slideshowImages = [
    "/images/slideshowpicture1.jpg",
    "/images/slideshowpicture2.jpg",
    "/images/slideshowpicture3.jpg"
  ];

  const scrollToApartments = () => {
    const element = document.getElementById('apartments');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "34618254217";
    const message = encodeURIComponent("¡Hola! Estoy interesado en sus apartamentos de Barcelona cerca del Camp Nou. ¿Pueden contarme más?");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const openGoogleMaps = () => {
    const address = "Carrer de Rafael Campalans, 63, L'Hospitalet de Llobregat, Barcelona, Spain";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const switchToEnglish = () => {
    window.location.href = '/';
  };

  return (
    <section className="relative min-h-[120vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 w-full h-full">
        <HeroSlideshow 
          images={slideshowImages} 
          className="w-full h-full"
        />
      </div>
      
      {/* Dark overlay for better text readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.3))',
          zIndex: 1
        }}
      ></div>
      
      {/* Content */}
      <div 
        className="relative text-center text-white px-4 max-w-4xl mx-auto animate-fade-in"
        style={{ zIndex: 2 }}
      >
        <div className="mb-12 md:mb-6">
          <button
            onClick={switchToEnglish}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 hover:bg-white/20 transition-colors"
          >
            <span className="text-2xl">🇺🇸</span>
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
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleWhatsAppClick}
            className="text-lg px-8 py-6 h-auto bg-white text-black hover:bg-gray-100 border-white"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Contáctanos
          </Button>

          <Button 
            variant="hero" 
            size="lg" 
            onClick={scrollToApartments} 
            className="text-lg px-8 py-6 h-auto"
          >
            Ver Nuestros Apartamentos
          </Button>

          <Button 
            variant="outline" 
            size="lg" 
            onClick={openGoogleMaps}
            className="text-lg px-8 py-6 h-auto bg-white text-black hover:bg-gray-100 border-white"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Nuestra Ubicación
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSpanish;
