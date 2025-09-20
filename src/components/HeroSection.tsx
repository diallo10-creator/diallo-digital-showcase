import { ArrowDown, Download, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import profilePhoto from "@/assets/profile-photo.jpg";

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="accueil" className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="gradient-hero bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Diallo Issa
              </span>
            </h1>
            
            <h2 className="text-2xl lg:text-3xl text-muted-foreground mb-6 font-light">
              Créateur Web et Digital
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Spécialisé dans l'élaboration de stratégies digitales innovantes, 
              la création de sites web performants et la gestion optimisée des médias sociaux.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="gradient-hero shadow-hero hover:scale-105 transition-bounce"
                onClick={() => scrollToSection('contact')}
              >
                <Phone className="mr-2 h-5 w-5" />
                Me Contacter
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="hover:bg-accent/20 transition-smooth"
              >
                <Download className="mr-2 h-5 w-5" />
                Télécharger CV
              </Button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex-1 flex justify-center lg:justify-end animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 gradient-hero rounded-full blur-2xl opacity-30 scale-110"></div>
              <img
                src={profilePhoto}
                alt="Diallo Issa - Expert Marketing Digital"
                className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full object-cover shadow-hero border-4 border-background"
              />
              <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-background animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16 animate-fade-in">
          <button
            onClick={() => scrollToSection('a-propos')}
            className="p-3 rounded-full border border-primary/30 hover:border-primary hover:scale-110 transition-bounce"
          >
            <ArrowDown className="h-6 w-6 text-primary animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;