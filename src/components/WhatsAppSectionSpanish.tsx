import { Button } from "@/components/ui/button";
import { MessageCircle, FileText, MapPin, Home } from "lucide-react";
import { Link } from "react-router-dom";

const WhatsAppSectionSpanish = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "34618254217"; // Spain country code + number
    const message = encodeURIComponent("¡Hola! Estoy interesado en reservar uno de sus apartamentos de Barcelona cerca del Camp Nou. ¿Pueden contarme sobre las ventajas exclusivas de reservar directamente?");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const openCityGuide = () => {
    window.open('/Guia-Guide-Barcelona (CampNouStudios).pdf', '_blank');
  };

  return (
    <section className="py-20 px-4 accent-gradient">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Ventajas Exclusivas
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
            Reserva directamente con nosotros y disfruta de ventajas exclusivas que no encontrarás en ningún otro lugar.
          </p>

          {/* WhatsApp Contact Button */}
          <div className="mb-8">
            <Button 
              variant="whatsapp"
              size="lg"
              onClick={handleWhatsAppClick}
              className="text-lg px-8 py-6 h-auto"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contactar por WhatsApp
            </Button>
          </div>
        </div>
        
        {/* Three Buttons Row */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/spanish/legal">
            <Button 
              variant="whatsapp"
              size="lg"
              className="text-lg px-8 py-6 h-auto"
            >
              <FileText className="w-5 h-5 mr-2" />
              Información Legal
            </Button>
          </Link>

          <Button 
            variant="outline"
            size="lg"
            onClick={openCityGuide}
            className="text-lg px-8 py-6 h-auto bg-white text-black hover:bg-gray-100 border-gray-300"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Guía de la Ciudad
          </Button>
          
          <Link to="/spanish/house-rules">
            <Button 
              variant="whatsapp"
              size="lg"
              className="text-lg px-8 py-6 h-auto"
            >
              <Home className="w-5 h-5 mr-2" />
              Reglas de la Casa
            </Button>
          </Link>
        </div>
        
        <p className="text-sm text-muted-foreground mt-8">
          Disponible 24/7 para tu comodidad
        </p>
      </div>
    </section>
  );
};

export default WhatsAppSectionSpanish;
