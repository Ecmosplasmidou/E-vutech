import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, Timer, CheckCircle2, 
  ArrowRight, Sparkles, ChevronRight, Bookmark,
  MessageSquare, Info
} from 'lucide-react';

const CatalogueList = () => {
  const formations = [
    {
      id: 'vul',
      title: "La conduite en VUL (Véhicule Utilitaire Léger)",
      slug: "/conduite-en-vul",
      duree: "21 heures (3 jours)",
      public: "Salariés, Indépendants, Particuliers",
      pointsForts: [
        "66% de pratique sur circuit homologué",
        "Sensibilisation aux risques spécifiques VUL",
        "Maîtrise du véhicule en conditions dégradées"
      ],
      disponible: true,
      tag: "Le plus populaire"
    },
    {
      id: 'eco',
      title: "Éco-conduite & Mobilité Durable",
      slug: "#",
      duree: "7 heures (1 jour)",
      public: "Flottes d'entreprises, Artisans",
      pointsForts: [
        "Réduction de la consommation de carburant",
        "Baisse des coûts de maintenance",
        "Anticipation et souplesse de conduite"
      ],
      disponible: false,
      tag: "Prochainement"
    }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans pb-32 selection:bg-primary/20">
      
      {/* --- HEADER HERO --- */}
      <section className="relative pt-32 pb-44 px-6 text-white text-center overflow-hidden bg-slate-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-primary/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2.5 rounded-full mb-10">
            <Sparkles size={16} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-100">Développement des compétences</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-extrabold font-serif italic mb-8 leading-[0.9] tracking-tighter">
            Catalogue <br />
            <span className="text-primary not-italic font-sans tracking-tight">Formations.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-lg md:text-xl font-light">
            Découvrez nos modules <span className="text-white italic">expertises</span>. Pour réserver un créneau, passez par notre formulaire de contact.
          </p>
        </div>
      </section>

      {/* --- GRILLE DES FORMATIONS --- */}
      <section className="px-6 -mt-32 relative z-20">
        <div className="max-w-7xl mx-auto">
          {/* BANDEAU D'INFORMATION RÉSERVATION */}
          <div className="mb-12 bg-white/80 backdrop-blur-md border border-slate-100 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                   <Info size={24} />
                </div>
                <p className="text-sm text-slate-600 font-medium">Toutes nos formations sont éligibles au financement. Contactez-nous pour réserver vos dates.</p>
             </div>
             <Link to="/contact" className="px-8 py-3 bg-slate-950 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-primary transition-all shadow-lg">
                Vérifier les disponibilités
             </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {formations.map((formation) => (
              <div 
                key={formation.id} 
                className={`group relative bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl ${!formation.disponible ? 'grayscale-[0.8] opacity-90' : ''}`}
              >
                <div className={`absolute top-8 right-8 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest z-10 ${formation.disponible ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-slate-100 text-slate-400'}`}>
                  {formation.tag}
                </div>

                <div className="flex flex-col md:flex-row h-full">
                  <div className={`w-full md:w-56 flex items-center justify-center p-12 ${formation.disponible ? 'bg-slate-950 group-hover:bg-primary' : 'bg-slate-100'} transition-colors duration-500`}>
                      <GraduationCap size={56} className={`${formation.disponible ? 'text-white' : 'text-slate-400'}`} />
                  </div>

                  <div className="flex-grow p-10 md:p-12 flex flex-col justify-between bg-white">
                    <div>
                      <div className="flex items-center gap-3 mb-6 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                        <Timer size={14} className="text-primary" /> 
                        <span>{formation.duree}</span>
                      </div>

                      <h2 className="text-3xl font-bold text-slate-950 font-serif italic mb-6 leading-tight group-hover:text-primary transition-colors">
                        {formation.title}
                      </h2>

                      <div className="space-y-4 mb-10">
                        {formation.pointsForts.map((point, i) => (
                          <div key={i} className="flex items-start gap-4 text-sm text-slate-500">
                            <CheckCircle2 size={14} className="text-primary mt-1" />
                            <p className="font-light">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black uppercase text-slate-300 tracking-widest">Public cible</span>
                        <span className="text-[11px] text-slate-900 font-bold">{formation.public}</span>
                      </div>

                      {formation.disponible ? (
                        <Link 
                          to="/contact" 
                          className="flex items-center gap-3 bg-slate-950 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-primary transition-all shadow-lg active:scale-95"
                        >
                          Réserver <MessageSquare size={14} />
                        </Link>
                      ) : (
                        <div className="text-slate-300 font-black uppercase text-[10px] italic">Bientôt disponible</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION ACTION BAS DE PAGE --- */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-slate-950 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden border border-white/5 shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
            <div className="text-center md:text-left flex-grow space-y-4">
              <h3 className="text-2xl md:text-4xl font-bold font-serif italic">Besoin d'un devis sur mesure ?</h3>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                Notre équipe gère l'intégralité de votre dossier administratif et de financement.
              </p>
            </div>
            <Link to="/contact" className="group flex items-center gap-4 bg-primary text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all duration-500">
              Nous contacter
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CatalogueList;