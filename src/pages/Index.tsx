import Hero from "@/components/Hero";
import ApartmentCard from "@/components/ApartmentCard";
import WhatsAppSection from "@/components/WhatsAppSection";
import CalendarPreloader from "@/components/CalendarPreloader";
// Apartment images will be defined inline with the uploaded images

const Index = () => {
  const apartments = [
    {
      name: "Coral Studio",
      maxGuests: 2,
      bedrooms: 0,
      images: [
        "/images/St1.jpg",
        "/images/St2.jpg",
        "/images/St3.jpg",
        "/images/st4.jpg"
      ],
      features: ["AC", "Heating", "WiFi", "TV"],
      icsUrl: "Coral Studio" // Now using apartment name instead of ICS URL
    },
    {
      name: "Olive 1 Bedroom",
      maxGuests: 2,
      bedrooms: 1,
      images: [
        "/images/1BR1.jpg",
        "/images/1BR2.jpg",
        "/images/1BR3.jpg",
        "/images/1BR4.jpg"
      ],
      features: ["AC", "Heating", "WiFi", "TV"],
      icsUrl: "Olive 1 Bedroom" // Now using apartment name instead of ICS URL
    },
    {
      name: "Jasmine 3 Bedrooms",
      maxGuests: 5,
      bedrooms: 3,
      images: [
        "/images/3BR1.jpg",
        "/images/3BR2.jpg",
        "/images/3BR3.jpg",
        "/images/3BR4.jpg"
      ],
      features: ["AC", "Heating", "WiFi", "TV"],
      icsUrl: "Jasmine 3 Bedrooms" // Now using apartment name instead of ICS URL
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
              <span className="block">Choose Your Perfect</span>
              <span className="block hero-gradient bg-clip-text text-transparent">
                Barcelona Stay
              </span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Three unique apartments in the same building, all featuring modern amenities and elevator access.
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

export default Index;
