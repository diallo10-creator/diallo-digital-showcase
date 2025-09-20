import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth');
    document.title = "Diallo Issa - Expert Marketing Digital & Création Web";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Portfolio professionnel de Diallo Issa, expert en marketing digital, création de sites web et gestion des médias sociaux. Contactez-moi pour vos projets digitaux.');
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
