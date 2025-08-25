import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const WhatsAppSectionSpanish = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "34618254217"; // Spain country code + number
    const message = encodeURIComponent("¡Hola! Estoy interesado en reservar uno de sus apartamentos de Barcelona cerca del Camp Nou. ¿Pueden contarme sobre las ventajas exclusivas de reservar directamente?");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
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
        </div>
        
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="whatsapp"
            size="lg"
            onClick={handleWhatsAppClick}
            className="text-lg px-8 py-6 h-auto"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Contactar por WhatsApp
          </Button>
          
          <Link to="/spanish/house-rules">
            <Button 
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 h-auto"
            >
              Ver Reglas de la Casa
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/spanish/legal" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Información Legal
          </Link>
        </div>
        
        <p className="text-sm text-muted-foreground mt-4">
          Disponible 24/7 para tu comodidad
        </p>
      </div>
    </section>
  );
};

export default WhatsAppSectionSpanish;
