import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldAlert, CheckCircle2, 
  TrendingDown, Award, Users, ChevronRight, 
  ShieldCheck, Zap, BarChart3, MessageSquare 
} from 'lucide-react';

import illustration_vul from '../assets/img/Image-camion1.jpg';
import dreets from '../assets/img/Dreets-datadock.png';
import hero_illustration from '../assets/img/Image-camion2.jpg';

const Home = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans overflow-x-hidden selection:bg-primary/30">
      
      {/* --- SECTION HERO : LUXE & IMPACT --- */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src={hero_illustration}
            alt="VUL" 
            className="w-full h-full object-cover object-center scale-105 animate-slow-zoom opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 relative z-10 py-20">
          <div className="max-w-4xl space-y-8 text-center md:text-left">
            
            <div className="inline-flex items-center gap-3 px-4 py-2 text-[10px] font-black tracking-[0.25em] text-primary uppercase bg-white/5 backdrop-blur-xl border border-white/10 rounded-full animate-fade-in-down">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              Expertise certifiée Sécurité VUL
            </div>

            <h1 className="text-5xl md:text-8xl lg:text-9xl font-extrabold text-white leading-[0.9] tracking-tighter italic font-serif">
              Sécurisez <br />
              <span className="text-primary not-italic inline-block hover:translate-x-4 transition-transform duration-500 cursor-default">
                votre futur.
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto md:mx-0">
              Le risque routier est le <span className="text-white font-medium italic">1er risque mortel</span> en entreprise. 
              E-VUTECH transforme vos obligations en bouclier humain et financier.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 pt-8 justify-center md:justify-start">
              {/* BOUTON CONTACT : ACTION PRINCIPALE */}
              <Link 
                to="/contact" 
                className="group w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-full font-black uppercase text-xs tracking-[0.15em] hover:bg-white hover:text-slate-950 transition-all duration-300 shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 active:scale-95 animate-pulse-subtle"
              >
                Prendre rendez-vous
                <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Link>
              
              {/* BOUTON PROGRAMME : ACTION SECONDAIRE */}
              <Link 
                to="/conduite-en-vul" 
                className="w-full sm:w-auto px-10 py-5 bg-white/5 text-white backdrop-blur-md border border-white/10 rounded-full font-black uppercase text-xs tracking-[0.15em] hover:bg-white hover:text-slate-950 transition-all active:scale-95 text-center"
              >
                Explorer la méthode
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block animate-bounce opacity-20 text-white">
          <TrendingDown size={32} />
        </div>
      </section>

      {/* --- SECTION RESPONSABILITÉ --- */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl group-hover:opacity-100 opacity-50 transition-opacity"></div>
            <img src={illustration_vul} alt="Sécurité VUL" className="relative rounded-[2.5rem] shadow-2xl w-full object-cover aspect-[4/3] group-hover:scale-[1.01] transition-transform duration-700" />
            <div className="absolute -bottom-8 -right-8 bg-white p-10 rounded-[2.5rem] shadow-2xl hidden lg:block border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-50 text-red-500 rounded-2xl"><ShieldAlert size={32} /></div>
                <div>
                  <p className="text-4xl font-black text-slate-950">+50%</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">D'accidents en VUL</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div className="inline-flex p-3 bg-primary/10 text-primary rounded-2xl"><ShieldCheck size={28} /></div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-950 font-serif italic leading-[1.1]">
              Votre <span className="text-primary not-italic">responsabilité</span> n'est pas une option.
            </h2>
            <p className="text-slate-500 text-xl leading-relaxed">
              Tout lien de subordination hiérarchique entraîne l’imputabilité à l’employeur. 
              <span className="text-slate-950 font-semibold italic"> Protéger vos salariés est votre premier investissement.</span>
            </p>
            <div className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary transition-all group-hover:w-full group-hover:opacity-5"></div>
              <p className="relative z-10 text-slate-700 italic leading-relaxed">"La loi n°2018-771 impose à l'employeur d'assurer le développement des compétences pour limiter les risques majeurs."</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION CERTIFICATIONS --- */}
      <section className="py-24 bg-slate-950 px-6 rounded-[4rem] mx-4 my-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-white font-serif italic mb-4">Un gage de confiance</h2>
              <p className="text-slate-400 uppercase tracking-[0.3em] text-[10px] font-black">Organisme de formation agréé</p>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-sm border border-white/10 transition-transform hover:scale-105">
              <img src={dreets} alt="DREETS" className="h-16 object-contain invert" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {id: 'DREETS', val: 'N°76311083431', icon: <Award className="w-6 h-6" />},
              {id: 'DATADOCK', val: 'Référencement actif', icon: <CheckCircle2 className="w-6 h-6" />},
              {id: 'QUALIOPI', val: 'Certification en cours', icon: <TrendingDown className="w-6 h-6" />},
              {id: 'CPF', val: 'Éligibilité en cours', icon: <Users className="w-6 h-6" />}
            ].map((item, i) => (
              <div key={i} className="group p-10 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
                <div className="h-14 w-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all">{item.icon}</div>
                <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">{item.id}</h4>
                <p className="text-sm font-bold text-white uppercase tracking-tight">{item.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION ENGAGEMENTS --- */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-7xl font-bold text-slate-950 font-serif italic mb-6">Nos Engagements.</h2>
            <p className="text-xl text-slate-500 italic">Transformer la conduite en un atout stratégique.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {title: "Zéro Accident", desc: "Diminution drastique des sinistres par la prise de conscience.", icon: <Zap />},
              {title: "Image de Marque", desc: "Un conducteur serein est le meilleur ambassadeur de votre société.", icon: <BarChart3 />},
              {title: "Valeur Humaine", desc: "Renforcer le bien-être au travail via la maîtrise technique.", icon: <Users />}
            ].map((obj, i) => (
              <div key={i} className="group relative p-12 bg-white rounded-[3rem] border border-slate-100 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700">
                <div className="absolute top-10 right-10 text-slate-100 group-hover:text-primary/10 transition-colors">{React.cloneElement(obj.icon as React.ReactElement, { size: 80 })}</div>
                <div className="h-2 w-16 bg-primary mb-10 group-hover:w-full transition-all duration-700"></div>
                <h3 className="text-2xl font-black text-slate-950 mb-6 uppercase tracking-tighter">{obj.title}</h3>
                <p className="text-slate-500 leading-relaxed text-lg italic opacity-80">"{obj.desc}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA FINAL : RESTRUCTURÉ POUR LE CONTACT --- */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden bg-primary p-12 md:p-24 rounded-[3rem] md:rounded-[5rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 group">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
            
            <div className="relative z-10 space-y-6 max-w-2xl text-center lg:text-left">
              <h2 className="text-4xl md:text-7xl font-bold font-serif italic leading-[1] tracking-tight">
                Prêt à sécuriser <br /> votre flotte ?
              </h2>
              <p className="text-blue-100 text-xl font-light italic">
                Réservez votre audit ou votre formation de 21 heures.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 w-full lg:w-auto relative z-10">
                {/* CONTACT : DOMINANT */}
                <Link to='/contact' className="px-12 py-6 bg-slate-950 text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-white hover:text-slate-950 transition-all duration-500 shadow-2xl text-center flex items-center justify-center gap-3 group/btn">
                  Nous contacter <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                
                {/* PROGRAMME : DISCRET (GLASS) */}
                <Link to='/conduite-en-vul' className="px-12 py-6 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-white hover:text-slate-950 transition-all text-center">
                  Détail du programme
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CSS ADDITIONNEL POUR L'ANIMATION PULSE */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s infinite ease-in-out;
        }
      `}} />
    </div>
  );
};

export default Home;