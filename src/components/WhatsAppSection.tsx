import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Gift, Clock, Star } from "lucide-react";

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
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Gift className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Exclusive Perks</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Book Direct for 
            <span className="hero-gradient bg-clip-text text-transparent block">
              Exclusive Benefits
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
            Contact us directly through WhatsApp and unlock special perks that you won't find anywhere else
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <Card className="border-0 shadow-card card-gradient max-w-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Instant Response</h3>
              <p className="text-muted-foreground text-sm">Get immediate answers to all your questions</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col items-center gap-3">
          <Button 
            variant="whatsapp"
            size="lg"
            onClick={handleWhatsAppClick}
            className="text-lg px-8 py-6 h-auto"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Contact us on WhatsApp
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            onClick={() => window.open('/legal', '_blank')}
            className="text-sm px-4 py-2"
          >
            Legal/About
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mt-4">
          Available 24/7 for your convenience
        </p>
      </div>
    </section>
  );
};

export default WhatsAppSection;