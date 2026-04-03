import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, GraduationCap, Scale, ExternalLink, 
  ArrowRight, BookOpen, FileText, Globe 
} from 'lucide-react';

const References = () => {
  const sections = [
    {
      title: "Prévention & Sécurité",
      icon: <ShieldCheck className="w-8 h-8" />,
      color: "group-hover:bg-blue-600", // Couleur au hover
      bgIcon: "bg-blue-50 text-blue-600",
      description: "Ressources gouvernementales et associatives sur la prévention du risque routier professionnel.",
      links: [
        { label: "Prévention des risques en VUL", url: "https://www.securite-routiere.gouv.fr/actualites/prevention-du-risque-routier-professionnel-la-securite-des-vehicules-utilitaires-legers" },
        { label: "Sécurité routière (31)", url: "https://www.haute-garonne.gouv.fr/Actions-de-l-Etat/Transport-deplacements-et-securite-routiere-et-fluviale/Securite-routiere" },
        { label: "Association Prévention Routière", url: "https://www.preventionroutiere.asso.fr/" },
        { label: "Cartes du gouvernement", url: "https://www.geoportail.gouv.fr/" },
      ]
    },
    {
      title: "Cadre de Formation",
      icon: <GraduationCap className="w-8 h-8" />,
      color: "group-hover:bg-emerald-600", // Couleur au hover
      bgIcon: "bg-emerald-50 text-emerald-600",
      description: "Cadre légal de la formation continue pour les salariés, indépendants et élus.",
      links: [
        { label: "Principes généraux (Travail)", url: "https://travail-emploi.gouv.fr/la-formation-professionnelle-principes-generaux" },
        { label: "FAF (Indépendants)", url: "https://entreprendre.service-public.gouv.fr/vosdroits/F31148" },
        { label: "OPCO (Salariés du privé)", url: "https://travail-emploi.gouv.fr/" },
        { label: "CNFPT (Fonction publique)", url: "https://www.cnfpt.fr/" },
      ]
    },
    {
      title: "Responsabilité Juridique",
      icon: <Scale className="w-8 h-8" />,
      color: "group-hover:bg-amber-600", // Couleur au hover
      bgIcon: "bg-amber-50 text-amber-600",
      description: "Textes juridiques encadrant la responsabilité pénale et civile des conducteurs et employeurs.",
      links: [
        { label: "Code de la route : Art. L121-1", url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006840868/" },
        { label: "Sécurité sociale : L452-1 à L452-5", url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006073189/LEGISCTA000006156141/" },
        { label: "Code du travail : Art. L4121-1", url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035640828/" },
        { label: "Code pénal : Art. 121-3 (Faute)", url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006417208/" },
        { label: "Code pénal : Art. 221-6 (Homicide)", url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000024042647/" },
        { label: "Code pénal : Art. 223-1 (Danger)", url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000024042637/" },
      ]
    }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans pb-24 selection:bg-primary/20">
      
      {/* --- HEADER HERO --- */}
      <section className="relative pt-32 pb-48 bg-slate-950 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-primary/10 -skew-x-12 translate-x-32 blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8 animate-fade-in-down">
            <Globe size={14} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Documentation Légale</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-extrabold font-serif italic mb-8 leading-[0.9] tracking-tighter">
            Références <br />
            <span className="text-primary not-italic font-sans tracking-tight">& Réglementation.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-2xl max-w-2xl leading-relaxed italic font-light">
            "Le respect de la réglementation est le premier pas vers une sécurité routière durable au sein de votre entreprise."
          </p>
        </div>
      </section>

      {/* --- GRILLE DE RESSOURCES --- */}
      <section className="px-6 -mt-32 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, idx) => (
              <div key={idx} className="group flex flex-col p-10 bg-white rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] hover:-translate-y-3 transition-all duration-500">
                
                {/* ICONE AVEC COULEUR DYNAMIQUE AU HOVER */}
                <div className={`mb-8 p-5 rounded-[1.5rem] w-fit transition-all duration-500 ${section.bgIcon} ${section.color} group-hover:text-white group-hover:rotate-6`}>
                  {section.icon}
                </div>
                
                <h2 className="text-3xl font-bold text-slate-950 font-serif italic mb-4">
                  {section.title}
                </h2>
                
                <p className="text-slate-500 text-sm mb-10 leading-relaxed font-light">
                  {section.description}
                </p>

                {/* LISTE DE LIENS INTERACTIFS */}
                <div className="flex flex-col gap-3 mt-auto">
                  {section.links.map((link, i) => (
                    <a 
                      key={i} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group/item flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-3.5 h-3.5 text-slate-300 group-hover/item:text-primary transition-colors" />
                        <span className="text-[10px] md:text-[11px] font-black text-slate-600 group-hover/item:text-slate-950 uppercase tracking-tighter">
                          {link.label}
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-300 group-hover/item:text-primary group-hover/item:rotate-12 transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden bg-slate-950 p-12 md:p-20 rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 group border border-white/5 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000"></div>
            
            <div className="relative z-10 space-y-6 max-w-2xl text-center lg:text-left">
              <h2 className="text-4xl md:text-6xl font-bold font-serif italic leading-[1] tracking-tight">
                Besoin d'un <br /> <span className="text-primary not-italic">conseil expert ?</span>
              </h2>
              <p className="text-slate-400 text-lg font-light">
                Nos conseillers vous accompagnent dans le montage de vos dossiers de financement et le respect de vos obligations légales.
              </p>
            </div>
            
            <Link 
              to="/contact" 
              className="relative z-10 group px-12 py-6 bg-primary text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-white hover:text-slate-950 transition-all duration-500 shadow-2xl active:scale-95 text-center flex items-center justify-center gap-4"
            >
              Nous contacter
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default References;