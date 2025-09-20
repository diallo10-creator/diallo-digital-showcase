import { Card } from "@/components/ui/card";
import { Globe, Users, PenTool, TrendingUp } from "lucide-react";

const SkillsSection = () => {
  const skills = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Élaboration de stratégie digitale",
      description: "Conception de stratégies marketing personnalisées pour maximiser votre présence en ligne et atteindre vos objectifs commerciaux.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Création de site web",
      description: "Développement de sites web modernes, responsives et optimisés pour le SEO, adaptés aux besoins spécifiques de votre entreprise.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Gestion des médias sociaux",
      description: "Animation et optimisation de vos réseaux sociaux pour développer votre communauté et engager votre audience cible.",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: <PenTool className="h-8 w-8" />,
      title: "Gestion de contenus",
      description: "Création et curation de contenus engageants qui renforcent votre image de marque et génèrent de l'interaction.",
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <section id="competences" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Mes <span className="gradient-hero bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Compétences</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des compétences complètes pour accompagner votre transformation digitale
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <Card 
              key={index}
              className="p-8 gradient-card shadow-card border-0 hover:scale-105 transition-bounce group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${skill.color} text-white mb-6 group-hover:scale-110 transition-bounce`}>
                {skill.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {skill.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {skill.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;