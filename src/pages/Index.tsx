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
        "/images/camp_nou_apartment_first.jpg",
        "/images/camp_nou_apartment_second.jpg",
        "/images/camp_nou_apartment_third.jpg",
        "/images/camp_nou_apartment_fourth.jpg"
      ],
      features: ["AC", "Heating", "WiFi", "TV"],
      icsUrl: "Coral Studio" // Now using apartment name instead of ICS URL
    },
    {
      name: "Olive 1 Bedroom",
      maxGuests: 2,
      bedrooms: 1,
      images: [
        "/images/mr_messi_suite_first.jpg",
        "/images/mr_messi_suite_second.jpg",
        "/images/mr_messi_suite_third.jpg",
        "/images/mr_messi_suite_fourth.jpg"
      ],
      features: ["AC", "Heating", "WiFi", "TV"],
      icsUrl: "Olive 1 Bedroom" // Now using apartment name instead of ICS URL
    },
    {
      name: "Jasmine 3 Bedrooms",
      maxGuests: 5,
      bedrooms: 3,
      images: [
        "/images/les_rambles_classic_first.jpg",
        "/images/les_rambles_classic_second.jpg",
        "/images/les_rambles_classic_third.jpg",
        "/images/les_rambles_classic_fourth.jpg"
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
