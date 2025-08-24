import Hero from "@/components/Hero";
import ApartmentCard from "@/components/ApartmentCard";
import WhatsAppSection from "@/components/WhatsAppSection";
import CalendarPreloader from "@/components/CalendarPreloader";
// Apartment images will be defined inline with the uploaded images

const Index = () => {
  const apartments = [
    {
      name: "Camp Nou Apartment",
      maxGuests: 2,
      bedrooms: 1,
      images: [
        "/images/camp_nou_apartment_first.jpg",
        "/images/camp_nou_apartment_second.jpg",
        "/images/camp_nou_apartment_third.jpg",
        "/images/camp_nou_apartment_fourth.jpg"
      ],
      features: ["AC", "Heating", "WiFi", "TV"],
      icsUrl: "https://www.airbnb.com/calendar/ical/1095572106327138736.ics?s=5b099ab3b0239722393598e285f0cc14"
    },
    {
      name: "Mr Messi Suite",
      maxGuests: 2,
      bedrooms: 1,
      images: [
        "/images/mr_messi_suite_first.jpg",
        "/images/mr_messi_suite_second.jpg",
        "/images/mr_messi_suite_third.jpg",
        "/images/mr_messi_suite_first.jpg"
      ],
      features: ["AC", "Heating", "WiFi", "TV"],
      icsUrl: "https://www.airbnb.com/calendar/ical/1076840964171198214.ics?s=63fbede26f54903652eecfebe6dc3fcd"
    },
    {
      name: "Les Rambles Classic",
      maxGuests: 5,
      bedrooms: 3,
      images: [
        "/images/les_rambles_classic_first.jpg",
        "/images/les_rambles_classic_second.jpg",
        "/images/les_rambles_classic_third.jpg",
        "/images/les_rambles_classic_fourth.jpg"
      ],
      features: ["AC", "Heating", "WiFi", "TV"],
      icsUrl: "https://www.airbnb.com/calendar/ical/1076614315151123442.ics?s=a99e8323a5b151010af4f843e16ab511"
    }
  ];

  return (
    <div className="min-h-screen">
      <CalendarPreloader apartments={apartments} />
      <Hero />
      // Add this temporarily to your Index.tsx to test image loading

const ImageTest = () => {
  const testImages = [
    "/lovable-uploads/53b9ea01-0dd9-44fe-a74d-79b3d8c98703.png",
    "/images/slideshowpicture1.jpg",
    "/vite.svg" // This should definitely exist
  ];

  return (
    <div className="p-4 bg-white border-2 border-red-500 m-4">
      <h3 className="font-bold mb-4">Image Loading Test:</h3>
      {testImages.map((src, index) => (
        <div key={index} className="mb-4">
          <p className="text-sm mb-2">Testing: {src}</p>
          <img 
            src={src} 
            alt={`Test ${index}`}
            className="w-32 h-32 object-cover border"
            onLoad={() => console.log(`✅ LOADED: ${src}`)}
            onError={() => console.log(`❌ FAILED: ${src}`)}
          />
          <a 
            href={src} 
            target="_blank" 
            className="text-blue-500 underline text-xs"
          >
            Test direct link
          </a>
        </div>
      ))}
    </div>
  );
};
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
