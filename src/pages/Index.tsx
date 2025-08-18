import Hero from "@/components/Hero";
import ApartmentCard from "@/components/ApartmentCard";
import WhatsAppSection from "@/components/WhatsAppSection";
import apartmentImage from "@/assets/apartment-interior.jpg";
import suiteImage from "@/assets/suite-interior.jpg";
import classicImage from "@/assets/classic-apartment.jpg";

const Index = () => {
  const apartments = [
    {
      name: "Camp Nou Apartment",
      maxGuests: 2,
      image: apartmentImage,
      features: ["AC", "Heating", "WiFi", "TV"],
      icsUrl: "https://www.airbnb.com/calendar/ical/1095572106327138736.ics?s=5b099ab3b0239722393598e285f0cc14"
    },
    {
      name: "Mr Messi Suite",
      maxGuests: 2,
      image: suiteImage,
      features: ["AC", "Heating", "WiFi", "TV"],
      icsUrl: "https://www.airbnb.com/calendar/ical/1076840964171198214.ics?s=63fbede26f54903652eecfebe6dc3fcd"
    },
    {
      name: "Les Rambles Classic",
      maxGuests: 5,
      image: classicImage,
      features: ["AC", "Heating", "WiFi", "TV"],
      icsUrl: "https://www.airbnb.com/calendar/ical/1076614315151123442.ics?s=a99e8323a5b151010af4f843e16ab511"
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      <section id="apartments" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Choose Your Perfect 
              <span className="hero-gradient bg-clip-text text-transparent block">
                Barcelona Stay
              </span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Three unique apartments in the same building, all featuring modern amenities and elevator access
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 animate-slide-up">
            {apartments.map((apartment, index) => (
              <ApartmentCard
                key={index}
                name={apartment.name}
                maxGuests={apartment.maxGuests}
                image={apartment.image}
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
