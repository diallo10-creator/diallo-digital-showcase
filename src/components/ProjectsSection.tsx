import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Globe, Heart } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "ONG Stylo Bleu",
      description: "Site web pour une ONG dédiée à l'amélioration de l'accès à l'éducation pour tous les enfants en Côte d'Ivoire. Projet social avec mission humanitaire.",
      category: "Site Web - ONG",
      url: "https://ong.iscom.tech/",
      features: ["Design moderne", "Responsive", "Mission sociale", "Donations"],
      color: "bg-blue-500"
    },
    {
      title: "Kerozen DJ", 
      description: "Portfolio digital pour un artiste DJ ivoirien spécialisé dans le Coupé-Décalé et Afrobeats. Plateforme complète de promotion musicale.",
      category: "Site Web - Artiste",
      url: "https://kerozen.iscom.tech/",
      features: ["Galerie multimedia", "Lecteur audio", "Booking", "Réseaux sociaux"],
      color: "bg-orange-500"
    }
  ];

  return (
    <section id="projets" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Mes <span className="gradient-hero bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Réalisations</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez quelques projets web que j'ai créés, alliant design moderne et fonctionnalités avancées
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="group overflow-hidden gradient-card shadow-card border-0 hover:scale-105 transition-bounce animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="p-8">
                {/* Header avec icône */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 ${project.color} text-white rounded-xl group-hover:scale-110 transition-bounce`}>
                      {project.title.includes('ONG') ? <Heart className="h-6 w-6" /> : <Globe className="h-6 w-6" />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-smooth">
                        {project.title}
                      </h3>
                      <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.features.map((feature, i) => (
                    <span 
                      key={i}
                      className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Button 
                  className="w-full gradient-hero shadow-hero hover:scale-105 transition-bounce"
                  onClick={() => window.open(project.url, '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Voir le Projet
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in">
          <Card className="p-8 gradient-hero shadow-hero border-0 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Vous avez un projet en tête ?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Créons ensemble votre présence digitale avec un site web sur mesure
            </p>
            <Button 
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 transition-smooth"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Démarrer mon Projet
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;