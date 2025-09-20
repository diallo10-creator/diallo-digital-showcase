const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="container mx-auto text-center">
        <div className="mb-8">
          <button
            onClick={scrollToTop}
            className="text-3xl font-bold gradient-hero bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:scale-105 transition-bounce"
          >
            Diallo Issa
          </button>
          <p className="mt-2 text-background/70">
            Créateur Web et Digital
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-background/70 mb-8">
          <a href="tel:+33554876299" className="hover:text-background transition-smooth">
            05 54 87 62 99
          </a>
          <span className="hidden sm:block">•</span>
          <a href="https://wa.me/2250554876299" className="hover:text-background transition-smooth">
            WhatsApp
          </a>
          <span className="hidden sm:block">•</span>
          <a href="mailto:issadiallo5589@gmail.com" className="hover:text-background transition-smooth">
            issadiallo5589@gmail.com
          </a>
        </div>

        <div className="border-t border-background/20 pt-8">
          <p className="text-background/50 text-sm">
            © {currentYear} Diallo Issa. Tous droits réservés. • Conçu avec passion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;