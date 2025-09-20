import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Téléphone",
      value: "05 54 87 62 99",
      action: "tel:+33554876299",
      color: "bg-blue-500"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "WhatsApp",
      value: "05 54 87 62 99", 
      action: "https://wa.me/33554876299",
      color: "bg-green-500"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "diallo.issa@contact.fr",
      action: "mailto:diallo.issa@contact.fr",
      color: "bg-purple-500"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Me <span className="gradient-hero bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Contacter</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Prêt à démarrer votre projet digital ? Contactez-moi dès maintenant !
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contactMethods.map((method, index) => (
              <Card 
                key={index}
                className="p-8 text-center gradient-card shadow-card border-0 hover:scale-105 transition-bounce group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex p-4 ${method.color} text-white rounded-2xl mb-4 group-hover:scale-110 transition-bounce`}>
                  {method.icon}
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {method.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {method.value}
                </p>
                
                <Button 
                  variant="outline"
                  className="hover:bg-primary hover:text-primary-foreground transition-smooth"
                  onClick={() => window.open(method.action, '_blank')}
                >
                  Contacter
                </Button>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center animate-fade-in">
            <Card className="p-12 gradient-hero shadow-hero border-0 text-white">
              <h3 className="text-3xl font-bold mb-4">
                Transformons votre vision en réalité digitale
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Discutons de votre projet et donnons-lui vie ensemble
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 transition-smooth"
                  onClick={() => window.open('tel:+33554876299')}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Appeler Maintenant
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary transition-smooth"
                  onClick={() => window.open('https://wa.me/33554876299')}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;