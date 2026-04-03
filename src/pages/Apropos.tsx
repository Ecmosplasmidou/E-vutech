import React from 'react';
import { 
  AlertTriangle, TrendingUp, ShieldCheck, 
  Users, Zap, Target, ScrollText 
} from 'lucide-react';

const APropos = () => {
  const consequences = [
    "Réparations de VUL", "Colis endommagés ou cassés", "Pertes d’exploitation",
    "Liquidations", "Responsabilités civiles & pénales", "Malus & radiations d’assurances",
    "Incapacités de travail (ITT/IPT)", "Handicaps physiques & psychologiques"
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans overflow-x-hidden selection:bg-primary/20">
      
      {/* --- HEADER HERO : L'IDENTITÉ --- */}
      <section className="relative pt-32 pb-48 bg-slate-950 text-white overflow-hidden">
        {/* Gradients de fond signature */}
        <div className="absolute top-0 right-0 w-[50%] h-full bg-primary/10 -skew-x-12 translate-x-32 blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8 animate-fade-in-down">
            <Target size={14} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Notre Vision Stratégique</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-extrabold font-serif italic mb-10 leading-[0.9] tracking-tighter">
            Maîtriser la <br />
            <span className="text-primary not-italic font-sans tracking-tight">Mobilité Pro.</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-2xl max-w-2xl leading-relaxed italic font-light border-l-2 border-primary/30 pl-8">
            "Le VUL demeure un géant aux pieds d’argile. Cette vulnérabilité doit être inscrite dans l’ADN de chaque conducteur."
          </p>
        </div>
      </section>

      {/* --- SECTION 1: ÉVOLUTION & CHIFFRE CHOC (BENTO STYLE) --- */}
      <section className="px-6 -mt-32 relative z-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Texte principal */}
          <div className="lg:col-span-7 bg-white p-10 md:p-16 rounded-[3rem] shadow-xl shadow-slate-200/50 flex flex-col justify-center space-y-8 border border-slate-100">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-950 font-serif italic leading-tight">Mutation des usages</h2>
              <div className="h-1.5 w-20 bg-primary rounded-full"></div>
            </div>
            <p className="text-slate-500 text-lg leading-relaxed font-light">
              L'étalement urbain et la mutation des modes de consommation ont transformé nos routes. 
              Aujourd'hui, les flux logistiques dominent : les livreurs, techniciens et artisans sont les nouveaux piliers de l'économie de proximité.
            </p>
            <div className="p-8 bg-primary/5 rounded-[2rem] border border-primary/10 group hover:bg-primary transition-all duration-500">
              <p className="text-slate-700 font-medium italic group-hover:text-white transition-colors">
                En 2021, le taux d’accidentologie en VUL dépasse de <span className="text-primary text-4xl font-black group-hover:text-white">50%</span> celui des véhicules légers.
              </p>
            </div>
          </div>

          {/* Cartes Stats */}
          <div className="lg:col-span-5 grid gap-8">
            <div className="bg-slate-950 rounded-[3rem] p-10 flex flex-col justify-center items-center text-center group overflow-hidden relative">
              <TrendingUp className="w-16 h-16 text-primary mb-6 group-hover:scale-110 transition-transform duration-500" />
              <p className="text-white text-xl font-bold uppercase tracking-tighter">Croissance du trafic</p>
              <p className="text-slate-500 text-sm mt-2 font-light">Saturation des couronnes urbaines</p>
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Users size={120} />
              </div>
            </div>
            <div className="bg-white border border-slate-100 rounded-[3rem] p-10 flex flex-col justify-center items-center text-center shadow-xl shadow-slate-200/50">
              <div className="p-5 bg-red-50 text-red-500 rounded-2xl mb-6">
                <AlertTriangle size={32} />
              </div>
              <p className="text-slate-950 text-xl font-bold uppercase tracking-tighter">Risques Critiques</p>
              <p className="text-slate-500 text-sm mt-2 font-light italic">Inertie, gabarit et comportement</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: CONQUÉQUENCES (TAGS MODERNES) --- */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-950 font-serif italic">L'impact invisible.</h2>
            <p className="text-slate-500 text-lg font-light italic">Un sinistre déplace le curseur bien plus loin que la simple "tôle froissée".</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {consequences.map((item, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                <span className="relative px-8 py-4 bg-white border border-slate-100 rounded-full text-xs font-black text-slate-600 shadow-sm block group-hover:text-primary group-hover:border-primary transition-all uppercase tracking-widest">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: RESPONSABILITÉ (DARK BOX) --- */}
      <section className="py-24 px-6 bg-white rounded-[4rem] mx-4 shadow-2xl shadow-slate-200/50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <h3 className="text-4xl md:text-5xl font-bold text-slate-950 font-serif italic leading-tight">Perception vs Réalité</h3>
              <p className="text-xl text-slate-500 leading-relaxed font-light italic border-l-4 border-primary pl-8">
                "Le conducteur de VUL se sent souvent invulnérable, dominant la route. Cette fausse sécurité est le principal levier d'accidentologie."
              </p>
              <p className="text-slate-500 leading-relaxed text-lg">
                Le gabarit et la motorisation génèrent un comportement souvent anxiogène pour les autres usagers. 
                L'appropriation de la route doit muter vers une <span className="text-slate-950 font-bold italic">conscience augmentée</span>.
              </p>
            </div>
          </div>

          <div className="bg-slate-950 text-white p-12 md:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
            <div className="relative z-10 space-y-8">
              <ScrollText className="text-primary w-12 h-12" />
              <h3 className="text-3xl font-bold font-serif italic">Responsabilité Pénale</h3>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                Le lien de subordination hiérarchique rend l’employeur imputable. 
                Assurer le développement des compétences n'est pas un bonus, c'est votre bouclier légal.
              </p>
              <div className="inline-flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 group-hover:border-primary/50 transition-colors">
                <Zap className="text-primary" size={24} />
                <div>
                  <p className="text-[10px] font-black text-primary tracking-[0.3em] uppercase">Loi Avenir n°2018-771</p>
                  <p className="text-sm italic font-serif">Décret du 5 Septembre 2018</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION E-VUTECH (CTA STYLE) --- */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden bg-primary p-12 md:p-24 rounded-[5rem] text-white flex flex-col items-center text-center space-y-10 group shadow-2xl shadow-primary/30">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-1000"></div>
            
            <ShieldCheck size={80} className="relative z-10 drop-shadow-2xl" />
            
            <div className="relative z-10 space-y-6 max-w-4xl">
              <h2 className="text-4xl md:text-7xl font-bold font-serif italic leading-[1]">Présentation d'E-VUTECH</h2>
              <p className="text-xl md:text-2xl text-blue-50 font-light leading-relaxed">
                Association loi 1901, E-VUTECH est le catalyseur local de la sécurité routière. 
                Nous transformons les conducteurs d’utilitaires en ambassadeurs de la route.
              </p>
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-6 w-full max-w-4xl pt-8">
               <div className="bg-slate-950/20 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] text-left hover:bg-slate-950/40 transition-colors">
                  <h4 className="text-lg font-black uppercase tracking-tighter mb-4 text-white italic">Agrément DREETS</h4>
                  <p className="text-sm text-blue-100 font-light leading-relaxed">Conforme aux normes de qualité de la formation continue pour vos plans de développement.</p>
               </div>
               <div className="bg-slate-950/20 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] text-left hover:bg-slate-950/40 transition-colors">
                  <h4 className="text-lg font-black uppercase tracking-tighter mb-4 text-white italic">Action Directe</h4>
                  <p className="text-sm text-blue-100 font-light leading-relaxed">Un mix unique de théorie, de mise en situation et de pratique en milieu sécurisé.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default APropos;