import Hero from "@/components/HeroSpanish";
import ApartmentCardSpanish from "@/components/ApartmentCardSpanish";
import WhatsAppSection from "@/components/WhatsAppSectionSpanish";
import CalendarPreloader from "@/components/CalendarPreloader";

const Spanish = () => {
  const apartments = [
    {
      name: "Estudio Coral",
      maxGuests: 2,
      bedrooms: 0,
      images: [
        "/images/camp_nou_apartment_first.jpg",
        "/images/camp_nou_apartment_second.jpg",
        "/images/camp_nou_apartment_third.jpg",
        "/images/camp_nou_apartment_fourth.jpg"
      ],
      features: ["AC", "Calefacción", "WiFi", "TV"],
      icsUrl: "Estudio Coral" // Now using Spanish apartment name
    },
    {
      name: "Olivo 1 Habitación",
      maxGuests: 2,
      bedrooms: 1,
      images: [
        "/images/mr_messi_suite_first.jpg",
        "/images/mr_messi_suite_second.jpg",
        "/images/mr_messi_suite_third.jpg",
        "/images/mr_messi_suite_fourth.jpg"
      ],
      features: ["AC", "Calefacción", "WiFi", "TV"],
      icsUrl: "Olivo 1 Habitación" // Now using Spanish apartment name
    },
    {
      name: "Jasmín 3 Habitaciones",
      maxGuests: 5,
      bedrooms: 3,
      images: [
        "/images/les_rambles_classic_first.jpg",
        "/images/les_rambles_classic_second.jpg",
        "/images/les_rambles_classic_third.jpg",
        "/images/les_rambles_classic_fourth.jpg"
      ],
      features: ["AC", "Calefacción", "WiFi", "TV"],
      icsUrl: "Jasmín 3 Habitaciones" // Now using Spanish apartment name
    }
  ];

  return (
    <div className="min-h-screen">
      <CalendarPreloader apartments={apartments} />
      <Hero />
      
      <section id="apartments" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              <span className="block">Elige Tu Perfecta</span>
              <span className="block hero-gradient bg-clip-text text-transparent">
                Estancia en Barcelona
              </span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Tres apartamentos únicos en el mismo edificio, todos con comodidades modernas y acceso por ascensor.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 animate-slide-up">
            {apartments.map((apartment, index) => (
              <ApartmentCardSpanish
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
