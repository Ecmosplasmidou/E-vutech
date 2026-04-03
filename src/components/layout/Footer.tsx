import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const links = [
    { name: "FAQ", path: "/faq" },
    { name: "Règlement intérieur", path: "/reglement-interieur" },
    { name: "CGV", path: "/cgv" },
    { name: "Mentions légales", path: "/mentions-legales" },
    { name: "RGPD", path: "/rgpd" },
  ];

  return (
    <footer className="bg-slate-900 text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 border-b border-slate-800 pb-12 mb-10">
          <div className="text-center md:text-left max-w-sm">
            <h2 className="text-2xl font-black text-white tracking-tighter uppercase mb-2">
              E-VUTECH
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              L’école de la conduite défensive en VUL*. <br />
              Expertise, sécurité et accompagnement pour les professionnels et particuliers.
            </p>
          </div>
          
          {/* Un petit rappel d'info ou contact rapide */}
          <div className="flex flex-col items-center md:items-end gap-2 text-sm">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Besoin d'aide ?</p>
            <Link 
              to="/contact" 
              className="px-5 xl:px-8 py-2.5 bg-white text-primary rounded-full text-xs font-black hover:shadow-lg hover:shadow-white/10 transition-all active:scale-95 uppercase whitespace-nowrap"
            >
              Contactez-nous
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-medium order-2 md:order-1">
            © {new Date().getFullYear()} E-VUTECH. Tous droits réservés.
          </p>
          
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-3 order-1 md:order-2">
            {links.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-xs font-semibold text-slate-400 hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;