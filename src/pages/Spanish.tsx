import Hero from "@/components/HeroSpanish";
import ApartmentCard from "@/components/ApartmentCardSpanish";
import WhatsAppSection from "@/components/WhatsAppSectionSpanish";
import CalendarPreloader from "@/components/CalendarPreloader";

const Spanish = () => {
  const apartments = [
    {
      name: "Coral 1 Habitación",
      maxGuests: 2,
      bedrooms: 1,
      images: [
        "/images/camp_nou_apartment_first.jpg",
        "/images/camp_nou_apartment_second.jpg",
        "/images/camp_nou_apartment_third.jpg",
        "/images/camp_nou_apartment_fourth.jpg"
      ],
      features: ["AC", "Calefacción", "WiFi", "TV"],
      icsUrl: "https://www.airbnb.com/calendar/ical/1095572106327138736.ics?s=5b099ab3b0239722393598e285f0cc14"
    },
    {
      name: "Studio Olivo",
      maxGuests: 2,
      bedrooms: 1,
      images: [
        "/images/mr_messi_suite_first.jpg",
        "/images/mr_messi_suite_second.jpg",
        "/images/mr_messi_suite_third.jpg",
        "/images/mr_messi_suite_fourth.jpg"
      ],
      features: ["AC", "Calefacción", "WiFi", "TV"],
      icsUrl: "https://www.airbnb.com/calendar/ical/1076840964171198214.ics?s=63fbede26f54903652eecfebe6dc3fcd"
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
