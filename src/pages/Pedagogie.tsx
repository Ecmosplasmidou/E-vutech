import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Target, ShieldCheck, ArrowRight, Award, Zap, ChevronRight, Activity } from 'lucide-react';

const Pedagogie = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans pb-24 selection:bg-primary/20">
      
      {/* --- HEADER HERO : FOCUS & CLARITY --- */}
      <section className="relative pt-32 pb-48 bg-slate-950 text-white overflow-hidden">
        {/* Cercles de lumière en arrière-plan */}
        <div className="absolute top-0 right-0 w-[40%] h-full bg-primary/10 -skew-x-12 translate-x-20 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8 animate-fade-in-down">
            <Activity size={14} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Ingénierie Pédagogique</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-extrabold font-serif italic mb-8 leading-[0.9] tracking-tighter">
            L'action comme <br />
            <span className="text-primary not-italic font-sans tracking-tight">moteur d'ancrage.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-2xl max-w-2xl leading-relaxed italic font-light">
            "Apprendre par le mouvement en environnement sécurisé pour transformer durablement <span className="text-white">les réflexes de survie</span>."
          </p>
        </div>
      </section>

      {/* --- SECTION 1: LES PILIERS (BENTO GRID) --- */}
      <section className="px-6 -mt-32 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "Conscientisation",
                text: "Révéler les angles morts du risque pour soi-même et pour autrui.",
                color: "group-hover:bg-blue-600"
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Adaptabilité",
                text: "Maîtriser son véhicule sous l'emprise des conditions météorologiques critiques.",
                color: "group-hover:bg-emerald-600"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Engagement",
                text: "Une immersion totale où le stagiaire devient l'acteur central de sa sécurité.",
                color: "group-hover:bg-primary"
              }
            ].map((item, i) => (
              <div key={i} className="group p-12 bg-white rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] hover:-translate-y-3 transition-all duration-500">
                <div className={`mb-10 p-5 bg-slate-50 text-slate-900 rounded-2xl w-fit transition-all duration-500 ${item.color} group-hover:text-white group-hover:rotate-6`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-950 mb-4 uppercase tracking-tighter">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed italic text-lg font-light opacity-80">
                  "{item.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: FORMATION-ACTION (MODERN SPLIT) --- */}
      <section className="py-32 px-6 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            
            <div className="space-y-12">
              <div className="relative group">
                <span className="text-9xl font-serif text-primary/10 absolute -top-16 -left-10 select-none group-hover:scale-110 transition-transform duration-700">“</span>
                <blockquote className="relative z-10">
                  <p className="text-3xl md:text-5xl font-serif italic text-slate-950 leading-[1.1] tracking-tight">
                    Nous sommes ce que nous faisons de manière répétitive.
                  </p>
                  <footer className="mt-8 flex items-center gap-6">
                    <div className="h-[2px] w-12 bg-primary"></div>
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">Aristote</span>
                  </footer>
                </blockquote>
              </div>

              <div className="space-y-8">
                <p className="text-xl text-slate-500 leading-relaxed font-light">
                  L’ensemble de nos stages repose sur le concept de <span className="text-slate-950 font-semibold border-b-2 border-primary/30">Formation – Action</span>. 
                  La théorie n'est qu'une boussole, la pratique est le chemin.
                </p>
                
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 group">
                  <div className="flex items-center gap-8 mb-4">
                    <div className="relative">
                       <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 animate-pulse"></div>
                       <span className="relative text-6xl font-black text-slate-950 tracking-tighter italic">66%</span>
                    </div>
                    <p className="text-xs font-black uppercase text-slate-400 leading-snug tracking-[0.2em]">
                      du cursus dédié à la <br/> <span className="text-primary">pratique terrain</span>
                    </p>
                  </div>
                  <p className="text-sm italic text-slate-400 font-light leading-relaxed">
                    Cette immersion garantit une modification réelle et immédiate du comportement au volant.
                  </p>
                </div>
              </div>
            </div>

            {/* TIMELINE DE FORMATION */}
            <div className="relative">
              <div className="absolute -inset-10 bg-primary/5 rounded-[5rem] rotate-3 blur-3xl"></div>
              <div className="relative bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl border border-slate-50 space-y-12">
                
                <div className="flex gap-10 group/item">
                  <div className="h-16 w-16 rounded-3xl bg-slate-950 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-2xl group-hover/item:bg-primary transition-colors duration-500">1</div>
                  <div>
                    <h3 className="font-bold text-slate-950 text-2xl mb-3 font-serif italic">Phase Théorique</h3>
                    <p className="text-slate-500 leading-relaxed font-light">Séquences interactives et multimédias pour casser les préjugés et établir les bases du savoir.</p>
                  </div>
                </div>
                
                <div className="h-px bg-slate-100 w-full"></div>

                <div className="flex gap-10 group/item">
                  <div className="h-16 w-16 rounded-3xl bg-primary text-white flex items-center justify-center font-black text-xl shrink-0 shadow-2xl shadow-primary/30 group-hover/item:bg-slate-950 transition-colors duration-500">2</div>
                  <div>
                    <h3 className="font-bold text-slate-950 text-2xl mb-3 font-serif italic">Phase d'Action</h3>
                    <p className="text-slate-500 leading-relaxed font-light">Exercices physiques sur circuit homologué : freinage d'urgence, évitement et transfert de charge.</p>
                  </div>
                </div>

                <div className="mt-12 p-8 bg-slate-950 rounded-[2.5rem] text-white flex items-center gap-6 overflow-hidden relative group/banner">
                  <Award className="text-primary shrink-0 transition-transform group-hover/banner:scale-125 duration-500" size={40} />
                  <div className="absolute -right-5 -bottom-5 text-white/5 rotate-12">
                     <ShieldCheck size={120} />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-widest leading-relaxed opacity-70 relative z-10">
                    E-VUTECH recrute exclusivement des experts de la conduite défensive.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CTA FINAL : BOLD & IMMERSIVE --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden bg-primary p-12 md:p-24 rounded-[4rem] text-white text-center flex flex-col items-center space-y-10 group">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000"></div>
            
            <h2 className="text-4xl md:text-7xl font-bold font-serif italic leading-[0.9] tracking-tighter relative z-10">
              Prêt à passer <br /> du savoir à l'action ?
            </h2>
            <p className="text-blue-50 text-xl font-light max-w-2xl mx-auto opacity-90 relative z-10">
              Découvrez comment nos parcours transforment durablement la sécurité de vos collaborateurs.
            </p>
            
            <Link 
              to='/conduite-en-vul' 
              className="relative z-10 flex items-center gap-4 bg-slate-950 text-white px-12 py-6 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-slate-950 transition-all duration-500 shadow-2xl active:scale-95 group/btn"
            >
              Consulter le catalogue
              <ChevronRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Pedagogie;