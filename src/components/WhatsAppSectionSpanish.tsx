import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const WhatsAppSectionSpanish = () => {
  const whatsappNumber = "+34123456789"; // Replace with actual number
  const whatsappMessage = "Hola! Me gustaría obtener más información sobre los apartamentos disponibles.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <div className="mb-8">
          <MessageCircle className="w-16 h-16 mx-auto mb-6 text-whatsapp" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            ¿Necesitas Ayuda?
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Nuestro equipo de soporte está disponible 24/7 para asistirte con cualquier pregunta sobre tu estancia.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="whatsapp" 
            size="lg" 
            className="text-lg px-8 py-6 h-auto"
            onClick={() => window.open(whatsappUrl, '_blank')}
          >
            <MessageCircle className="w-6 h-6 mr-2" />
            Contactar por WhatsApp
          </Button>
          
          <Link to="/house-rules">
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
          <Link to="/legal" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Información Legal
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppSectionSpanish;