import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Eye, Database, UserCheck, Lock, Mail, Scale, ChevronRight } from 'lucide-react';

const RGPD = () => {
  const [showContact, setShowContact] = useState(false);

  const dataCategories = [
    { label: "Identification", detail: "Nom, prénom, date de naissance, adresse, sexe, âge." },
    { label: "Vie professionnelle", detail: "Fonction, type de contrat, secteur, parcours de formation." },
    { label: "Données financières", detail: "Salaires, RIB (pour la gestion des financements)." },
    { label: "Données sensibles", detail: "NIR (Numéro de sécurité sociale), situation de handicap." },
    { label: "Données numériques", detail: "Adresse IP, cookies, logs de connexion (6 mois)." }
  ];

  return (
    <div className="bg-[#fcfcfd] min-h-screen font-sans pb-20">
      
      {/* HEADER DYNAMIQUE */}
      <section className="relative py-24 px-6 text-white text-center overflow-hidden bg-gradient-to-br from-[#4a86C6] via-[#3b71ab] to-[#2d5a8a]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-2 rounded-full mb-8 shadow-sm">
            <ShieldCheck size={14} className="text-white" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Protection des données</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold font-serif italic mb-6 leading-tight drop-shadow-md">
            Politique de <br />
            <span className="text-blue-100 text-3xl md:text-5xl font-serif">Confidentialité (RGPD)</span>
          </h1>
        </div>
      </section>

      {/* CONTENU PRINCIPAL */}
      <section className="py-12 px-6 -mt-10 relative z-20">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* SECTIONS CLASSIQUES (1, 2, 3) */}
          <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <UserCheck className="text-primary" size={28} />
              <h2 className="text-xl font-bold text-slate-800 font-serif italic">1. Responsable du traitement</h2>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              <strong>E-VUTECH</strong> est responsable du traitement des données personnelles collectées dans le cadre de ses missions de formation professionnelle.
            </p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <Eye className="text-primary" size={28} />
              <h2 className="text-xl font-bold text-slate-800 font-serif italic">2. Finalités et bases légales</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-xs text-slate-500 leading-relaxed">
              <p><strong className="text-slate-700 block mb-1">Obligations Légales :</strong> Financement des actions et conformité aux règlements.</p>
              <p><strong className="text-slate-700 block mb-1">Exécution Contractuelle :</strong> Gestion des dossiers et conventions entreprises.</p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <Database className="text-primary" size={28} />
              <h2 className="text-xl font-bold text-slate-800 font-serif italic">3. Données collectées</h2>
            </div>
            <ul className="space-y-3">
              {dataCategories.map((item, i) => (
                <li key={i} className="text-sm text-slate-600 flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>{item.label} :</strong> {item.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* VOS DROITS (SANS BOUTON DE CONTACT DIRECT) */}
          <div className="bg-slate-900 p-8 md:p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="flex items-center gap-4 mb-12 relative z-10">
              <div className="p-3 bg-primary/20 rounded-2xl"><Lock className="text-primary" size={32} /></div>
              <h2 className="text-2xl md:text-3xl font-bold font-serif italic">Vos Droits</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              {["Accès", "Rectification", "Effacement", "Opposition", "Limitation", "Portabilité"].map((droit) => (
                <div key={droit} className="p-5 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                  <h3 className="text-primary font-black uppercase text-[10px] tracking-widest mb-1">Droit d'{droit}</h3>
                  <p className="text-slate-400 text-xs">Consultez les modalités d'exercice de ce droit dans les textes officiels.</p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
              <p className="text-xs text-slate-500 italic leading-relaxed">
                Le retrait du consentement et la définition des directives post-mortem font partie intégrante de vos libertés numériques.
              </p>
            </div>
          </div>

          {/* SECTION CONTACT CACHÉE (PROGRESSIVE DISCLOSURE) */}
          <div className="space-y-4">
            <button 
              onClick={() => setShowContact(!showContact)}
              className="w-full py-4 px-8 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between text-slate-500 hover:text-primary hover:bg-white transition-all group"
            >
              <span className="text-xs font-bold uppercase tracking-widest">Informations sur l'exercice des droits & DPO</span>
              <ChevronRight size={18} className={`transition-transform duration-300 ${showContact ? 'rotate-90 text-primary' : ''}`} />
            </button>

            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showContact ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-inner space-y-6 text-center">
                <div className="inline-flex p-4 bg-primary/10 rounded-full mb-2">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 font-serif italic mb-2">Délégué à la Protection des Données (DPO)</h3>
                  <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                    Pour toute demande relative à vos données personnelles, vous pouvez adresser un message signé à notre délégué.
                  </p>
                  <div className="inline-block p-6 bg-slate-50 rounded-2xl border border-slate-100 text-sm">
                    <p className="font-bold text-slate-700">dpo@E-VUTECH.fr</p>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-tighter">7 bis rue du pont Saint Pierre, 31300 Toulouse</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LIEN CNIL (DISCRET) */}
          <div className="text-center pt-8">
            <a href="https://www.cnil.fr" target="_blank" rel="noreferrer" className="text-[10px] text-slate-300 hover:text-primary transition-colors uppercase font-black tracking-[0.3em]">
               Autorité de contrôle (CNIL)
            </a>
          </div>

        </div>
      </section>
    </div>
  );
};

export default RGPD;