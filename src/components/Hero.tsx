// Replace your entire Hero.tsx with this version that forces the background

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const Hero = () => {
  const testImage = "/lovable-uploads/53b9ea01-0dd9-44fe-a74d-79b3d8c98703.png";

  const scrollToApartments = () => {
    const element = document.getElementById('apartments');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const switchToSpanish = () => {
    window.location.href = '/spanish';
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${testImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.3))',
          zIndex: 1
        }}
      ></div>
      
      <div 
        className="relative text-center text-white px-4 max-w-4xl mx-auto animate-fade-in"
        style={{ zIndex: 2 }}
      >
        <div className="mb-6">
          <button
            onClick={switchToSpanish}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 hover:bg-white/20 transition-colors"
          >
            <span className="text-2xl">🇪🇸</span>
            <span className="text-sm font-medium">Español</span>
          </button>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
          Experience Barcelona
          <span className="block hero-gradient bg-clip-text text-transparent">
            In Premium Apartments
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 text-balance max-w-2xl mx-auto leading-relaxed">
          Modern apartments in the heart of Barcelona, with 24 hour customer service and automatic check-in.
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
            View Our Apartments
          </Button>
        </div>

        {/* Debug info */}
        <div className="mt-8 text-sm opacity-50">
          Using inline styles - Image: {testImage}
        </div>
      </div>
    </section>
  );
};

export default Hero;
