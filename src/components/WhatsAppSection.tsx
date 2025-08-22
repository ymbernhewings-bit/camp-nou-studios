import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const WhatsAppSection = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "34618254217"; // Spain country code + number
    const message = encodeURIComponent("Hi! I'm interested in booking one of your Barcelona apartments near Camp Nou. Can you tell me about exclusive perks for direct bookings?");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="py-20 px-4 accent-gradient">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Need Help?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
            Our support team is available 24/7 to assist you with any questions about your stay.
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
            Contact us on WhatsApp
          </Button>
          
          <Link to="/house-rules">
            <Button 
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 h-auto"
            >
              House Rules
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/legal" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Legal Information
          </Link>
        </div>
        
        <p className="text-sm text-muted-foreground mt-4">
          Available 24/7 for your convenience
        </p>
      </div>
    </section>
  );
};

export default WhatsAppSection;