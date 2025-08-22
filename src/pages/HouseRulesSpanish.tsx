const HouseRulesSpanish = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Normas de la Casa</h1>
        
        <div className="prose prose-lg max-w-none">
          <ul className="space-y-4 text-muted-foreground leading-relaxed">
            <li>• Check-in automático disponible después de las 16:00, check-out antes de las 11:00.</li>
            <li>• No se permiten mascotas.</li>
            <li>• Está estrictamente prohibido fumar, vapear y el uso de drogas.</li>
            <li>• Están prohibidos los eventos (cualquier tipo de fiesta).</li>
            <li>• Horas de silencio: 21:00-08:00.</li>
            <li>• Está prohibida la fotografía comercial.</li>
            <li>• Por favor mantén las áreas comunes limpias y respeta a los residentes locales.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HouseRulesSpanish;