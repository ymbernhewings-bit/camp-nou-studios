const Legal = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            All information, descriptions, photographs, and prices displayed on this website are provided in good faith and for general information purposes only. While we strive to keep all details accurate and up to date, occasional changes in availability, rates, furnishings, or amenities may occur without prior notice. Guests are responsible for reviewing all booking terms and confirming specific details before making a reservation. We are not liable for any inaccuracies, delays, or interruptions beyond our control, including issues related to third-party booking platforms, local regulations, or unforeseen events.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-6">
            By using this website and booking our properties, you acknowledge and accept these terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Legal;