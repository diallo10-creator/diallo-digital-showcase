import { Card } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="a-propos" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            À <span className="gradient-hero bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Propos</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio Text */}
          <div className="animate-slide-up">
            <Card className="p-8 gradient-card shadow-card border-0">
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                Passionné par le digital
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Fort de mes <strong>25 ans</strong> et d'une solide formation en gestion commerciale 
                  et marketing digital, je me spécialise dans l'accompagnement des entreprises 
                  vers leur transformation numérique.
                </p>
                <p>
                  Ma passion pour l'innovation digitale m'a conduit à développer une expertise 
                  complète dans la <strong>création de sites web performants</strong>, 
                  l'<strong>élaboration de stratégies digitales</strong> sur mesure et la 
                  <strong>gestion optimisée des médias sociaux</strong>.
                </p>
                <p>
                  Mon approche allie créativité et efficacité technique pour offrir des solutions 
                  digitales qui génèrent des résultats concrets et durables pour mes clients.
                </p>
              </div>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 animate-slide-up">
            <Card className="p-6 text-center gradient-accent shadow-card border-0 hover:scale-105 transition-bounce">
              <div className="text-3xl font-bold text-primary mb-2">25</div>
              <div className="text-sm text-muted-foreground">Ans</div>
            </Card>
            
            <Card className="p-6 text-center gradient-accent shadow-card border-0 hover:scale-105 transition-bounce">
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <div className="text-sm text-muted-foreground">Diplômes</div>
            </Card>
            
            <Card className="p-6 text-center gradient-accent shadow-card border-0 hover:scale-105 transition-bounce">
              <div className="text-3xl font-bold text-primary mb-2">4</div>
              <div className="text-sm text-muted-foreground">Compétences Clés</div>
            </Card>
            
            <Card className="p-6 text-center gradient-accent shadow-card border-0 hover:scale-105 transition-bounce">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Engagement</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;