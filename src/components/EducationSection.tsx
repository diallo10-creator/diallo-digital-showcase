import { Card } from "@/components/ui/card";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const EducationSection = () => {
  const educations = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "BTS en Gestion Commerciale",
      type: "Diplôme d'État",
      description: "Formation complète en techniques commerciales, management et gestion d'entreprise.",
      color: "bg-blue-500"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "CQP en Marketing Digital",
      type: "Certification Professionnelle",
      description: "Spécialisation dans les stratégies marketing digital, SEO/SEA et analytics.",
      color: "bg-purple-500"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "CQP en Création de Site Web",
      type: "Certification Professionnelle",
      description: "Maîtrise des technologies web modernes, UX/UI et développement responsive.",
      color: "bg-green-500"
    }
  ];

  return (
    <section id="formation" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ma <span className="gradient-hero bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Formation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Un parcours académique solide complété par des certifications professionnelles
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {educations.map((education, index) => (
              <Card 
                key={index}
                className="p-8 gradient-card shadow-card border-0 hover:scale-[1.02] transition-bounce animate-slide-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className={`flex-shrink-0 p-3 ${education.color} text-white rounded-2xl group-hover:scale-110 transition-bounce`}>
                    {education.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-xl font-semibold text-foreground">
                        {education.title}
                      </h3>
                      <span className="inline-block px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">
                        {education.type}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {education.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center animate-fade-in">
            <Card className="p-6 gradient-accent shadow-soft border-0 inline-block">
              <p className="text-foreground font-medium">
                Formation continue • Veille technologique • Certifications en cours
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;