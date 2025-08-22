const HouseRules = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-foreground">House Rules</h1>
        
        <div className="prose prose-lg max-w-none">
          <ul className="space-y-4 text-muted-foreground leading-relaxed">
            <li>• Automatic check-in available after 16:00, check-out before 11:00.</li>
            <li>• Pets are not allowed.</li>
            <li>• Smoking, vaping and the use of drugs is strictly prohibited.</li>
            <li>• Events (any type of party) are prohibited.</li>
            <li>• Quiet hours: 21:00-08:00.</li>
            <li>• Commercial photography is prohibited.</li>
            <li>• Please keep common areas clean and respect the local residents.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HouseRules;