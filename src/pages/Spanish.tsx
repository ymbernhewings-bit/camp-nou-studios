import Hero from "@/components/HeroSpanish";
import ApartmentCard from "@/components/ApartmentCardSpanish";
import WhatsAppSection from "@/components/WhatsAppSectionSpanish";
import CalendarPreloader from "@/components/CalendarPreloader";

const Spanish = () => {
  const apartments = [
    {
      name: "Apartamento Camp Nou",
      maxGuests: 2,
      bedrooms: 1,
      images: [
        "/lovable-uploads/53b9ea01-0dd9-44fe-a74d-79b3d8c98703.png",
        "/lovable-uploads/f147a109-9eb8-4c12-b61f-1be5ac23489a.png",
        "/lovable-uploads/e5e21a5b-c0a9-4eff-aa22-94d9a940cbab.png",
        "/lovable-uploads/85fbd9d0-aee9-4bc7-9584-4aadcc42fb29.png"
      ],
      features: ["AC", "Calefacción", "WiFi", "TV"],
      icsUrl: "https://www.airbnb.com/calendar/ical/1095572106327138736.ics?s=5b099ab3b0239722393598e285f0cc14"
    },
    {
      name: "Suite Mr Messi",
      maxGuests: 2,
      bedrooms: 1,
      images: [
        "/lovable-uploads/8590174b-1f71-432a-89c0-25d602ae14a8.png",
        "/lovable-uploads/f743d896-dca3-411a-89d7-4d9b04685c58.png",
        "/lovable-uploads/d3fbe54e-3fd0-450e-ba49-4e5f4a9ef590.png",
        "/lovable-uploads/2e3dea9b-23ff-4d58-87c0-4a17e0246c9e.png"
      ],
      features: ["AC", "Calefacción", "WiFi", "TV"],
      icsUrl: "https://www.airbnb.com/calendar/ical/1076840964171198214.ics?s=63fbede26f54903652eecfebe6dc3fcd"
    },
    {
      name: "Les Rambles Clásico",
      maxGuests: 5,
      bedrooms: 3,
      images: [
        "/lovable-uploads/80ae1f10-2668-4996-ad8f-26f1f4fbcdc0.png",
        "/lovable-uploads/8faa7c72-8e0c-4203-9365-a95716d1bbd2.png",
        "/lovable-uploads/1ef8dd14-ad1d-4fe9-9ec6-773be4ef2655.png",
        "/lovable-uploads/f94a850f-f1ba-4d24-b0b9-b8d024feb7a4.png"
      ],
      features: ["AC", "Calefacción", "WiFi", "TV"],
      icsUrl: "https://www.airbnb.com/calendar/ical/1076614315151123442.ics?s=a99e8323a5b151010af4f843e16ab511"
    }
  ];

  return (
    <div className="min-h-screen">
      <CalendarPreloader apartments={apartments} />
      <Hero />
      
      <section id="apartments" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Elige Tu Perfecta 
              <span className="hero-gradient bg-clip-text text-transparent block">
                Estancia en Barcelona
              </span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Tres apartamentos únicos en el mismo edificio, todos con comodidades modernas y acceso por ascensor.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 animate-slide-up">
            {apartments.map((apartment, index) => (
              <ApartmentCard
                key={index}
                name={apartment.name}
                maxGuests={apartment.maxGuests}
                bedrooms={apartment.bedrooms}
                images={apartment.images}
                features={apartment.features}
                icsUrl={apartment.icsUrl}
              />
            ))}
          </div>
        </div>
      </section>
      
      <WhatsAppSection />
    </div>
  );
};

export default Spanish;