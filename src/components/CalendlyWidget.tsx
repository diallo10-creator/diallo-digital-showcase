import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Clock, Users, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

const CalendlyWidget = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Créneaux disponibles
  const availableTimeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir au moins votre nom et email.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedDate) {
      toast({
        title: "Erreur", 
        description: "Veuillez sélectionner une date.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('calendly-booking', {
        body: {
          action: 'create_appointment',
          ...formData,
          preferred_date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
          preferred_time: selectedTime
        }
      });

      if (error) throw error;

      toast({
        title: "Demande envoyée !",
        description: data.message || "Votre demande de rendez-vous a été enregistrée.",
      });

      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setSelectedDate(undefined);
      setSelectedTime("");

    } catch (error) {
      console.error('Error submitting appointment:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer votre demande. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
                <CalendarIcon className="h-6 w-6" />
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

          {/* Appointment Form */}
          <Card className="p-8 bg-background shadow-card border animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-center text-foreground">
              Demander un Rendez-vous
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nom complet *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Votre nom complet"
                    required
                    className="bg-secondary/50 border-border"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="votre@email.com"
                    required
                    className="bg-secondary/50 border-border"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Téléphone
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="05 XX XX XX XX"
                    className="bg-secondary/50 border-border"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Date préférée *
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-secondary/50 border-border",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP", { locale: fr }) : "Choisir une date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          const dayOfWeek = date.getDay();
                          // Désactiver les weekends et les dates passées
                          return date < today || dayOfWeek === 0 || dayOfWeek === 6;
                        }}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Créneaux horaires */}
              {selectedDate && (
                <div className="animate-fade-in">
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Créneaux disponibles *
                  </label>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {availableTimeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          "h-10 text-sm transition-all",
                          selectedTime === time 
                            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                            : "bg-secondary/50 border-border hover:bg-secondary"
                        )}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                  {!selectedTime && (
                    <p className="text-xs text-muted-foreground mt-2">
                      * Veuillez sélectionner un créneau horaire
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description de votre projet
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Décrivez brièvement votre projet digital ou vos besoins..."
                  rows={4}
                  className="bg-secondary/50 border-border"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading || !selectedDate || !selectedTime}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    Envoi en cours...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Envoyer ma demande
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-sm text-center text-muted-foreground">
                💡 <strong>Conseil :</strong> Sélectionnez une date et un créneau pour finaliser votre demande. Plus vous détaillez votre projet, mieux je pourrai vous conseiller !
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CalendlyWidget;