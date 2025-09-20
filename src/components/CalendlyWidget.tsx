import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Users } from "lucide-react";

const CalendlyWidget = () => {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const openCalendly = () => {
    // @ts-ignore - Calendly global object
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/issadiallo5589'
      });
    }
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Réservez votre <span className="gradient-hero bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Consultation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discutons de votre projet digital et donnons-lui vie ensemble
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 text-center gradient-card shadow-card border-0 hover:scale-105 transition-bounce animate-slide-up">
              <div className="inline-flex p-4 bg-blue-500 text-white rounded-2xl mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                Consultation Gratuite
              </h3>
              <p className="text-muted-foreground text-sm">
                30 minutes pour discuter de votre projet et définir vos besoins
              </p>
            </Card>

            <Card className="p-6 text-center gradient-card shadow-card border-0 hover:scale-105 transition-bounce animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex p-4 bg-green-500 text-white rounded-2xl mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                Disponibilité Flexible
              </h3>
              <p className="text-muted-foreground text-sm">
                Créneaux disponibles du lundi au vendredi, de 9h à 18h
              </p>
            </Card>

            <Card className="p-6 text-center gradient-card shadow-card border-0 hover:scale-105 transition-bounce animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex p-4 bg-purple-500 text-white rounded-2xl mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                Suivi Personnalisé
              </h3>
              <p className="text-muted-foreground text-sm">
                Accompagnement sur mesure pour la réalisation de votre projet
              </p>
            </Card>
          </div>

          {/* Calendly Embed */}
          <Card className="p-8 gradient-hero shadow-hero border-0 text-center animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Prendre Rendez-vous
            </h3>
            <p className="text-white/90 mb-6">
              Cliquez ci-dessous pour choisir un créneau qui vous convient
            </p>
            
            <button
              onClick={openCalendly}
              className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-smooth"
            >
              📅 Réserver un créneau
            </button>

            {/* Inline Calendly Widget */}
            <div className="mt-8 bg-white rounded-lg p-4">
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/issadiallo5589"
                style={{ minWidth: '320px', height: '700px' }}
              ></div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CalendlyWidget;