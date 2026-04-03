import React from 'react';
import { ShieldCheck, User, Globe, Lock, Cookie, Scale } from 'lucide-react';

const MentionsLegales = () => {
  const sections = [
    {
      id: 1,
      title: "Présentation du site",
      icon: <User size={20} />,
      content: (
        <div className="space-y-2 text-sm">
          <p><strong>Propriétaire :</strong> BARON RACING – SIRET : 90175909200017</p>
          <p><strong>Créateur :</strong> BARON RACING</p>
          <p><strong>Responsable publication :</strong> Monsieur Yann BARTHES – direction@e-vutech.fr</p>
          <p><strong>Webmaster :</strong> Monsieur Yann BARTHES – direction@e-vutech.fr</p>
          <p><strong>Hébergeur :</strong> Infomaniak – Genève, Suisse</p>
        </div>
      )
    },
    {
      id: 2,
      title: "Conditions générales d’utilisation",
      content: "L’utilisation du site e-vutech.fr implique l’acceptation pleine et entière des conditions générales d’utilisation ci-après décrites. Elles sont susceptibles d’être modifiées ou complétées à tout moment. Le site est normalement accessible à tout moment, sauf interruption pour maintenance technique décidée par BARON RACING."
    },
    {
      id: 3,
      title: "Description des services fournis",
      content: "Le site a pour objet de fournir une information concernant l’ensemble des activités de la société. BARON RACING s’efforce de fournir des informations aussi précises que possible, mais ne pourra être tenue responsable des omissions ou inexactitudes dans la mise à jour."
    },
    {
      id: 5,
      title: "Propriété intellectuelle",
      icon: <Lock size={20} />,
      content: "BARON RACING est propriétaire des droits de propriété intellectuelle sur tous les éléments du site (textes, images, graphismes, logo, icônes). Toute reproduction ou adaptation est interdite sans autorisation écrite préalable. Toute exploitation non autorisée sera considérée comme une contrefaçon (Art. L.335-2 du CPI)."
    },
    {
      id: 7,
      title: "Gestion des données personnelles",
      icon: <ShieldCheck size={20} />,
      content: "Conformément à la loi 'Informatique et Libertés', tout utilisateur dispose d’un droit d’accès, de rectification et d’opposition aux données personnelles le concernant par demande écrite et signée, accompagnée d’une copie du titre d’identité. Aucune information personnelle n'est publiée, échangée ou vendue à des tiers."
    },
    {
      id: 8,
      title: "Liens hypertextes et cookies",
      icon: <Cookie size={20} />,
      content: "La navigation sur e-vutech.fr est susceptible de provoquer l’installation de cookie(s) visant à faciliter la navigation ultérieure et permettre des mesures de fréquentation. L'utilisateur peut configurer son navigateur pour refuser l'installation des cookies."
    },
    {
      id: 9,
      title: "Droit applicable et juridiction",
      icon: <Scale size={20} />,
      content: "Tout litige en relation avec l’utilisation du site e-vutech.fr est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Toulouse."
    }
  ];

  return (
    <div className="bg-[#fcfcfd] min-h-screen font-sans pb-20">
      
      {/* HEADER DYNAMIQUE */}
      <section className="relative py-24 px-6 text-white text-center overflow-hidden bg-gradient-to-br from-[#4a86C6] via-[#3b71ab] to-[#2d5a8a]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-2 rounded-full mb-8 shadow-sm">
            <Globe size={14} className="text-white" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Informations Légales</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold font-serif italic mb-6 leading-tight drop-shadow-md">
            Mentions <br />
            <span className="text-blue-100 text-3xl md:text-5xl font-serif">Légales</span>
          </h1>
        </div>
      </section>

      {/* CONTENU DES MENTIONS */}
      <section className="py-12 px-6 -mt-10 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-6">
            {sections.map((section) => (
              <div key={section.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-slate-50 rounded-lg text-primary">
                    {section.icon || <span className="text-xs font-bold w-5 h-5 flex items-center justify-center">{section.id}</span>}
                  </div>
                  <h2 className="text-lg font-bold text-slate-800 font-serif italic">
                    {section.id}. {section.title}
                  </h2>
                </div>
                <div className="text-slate-500 text-sm leading-relaxed pl-12">
                  {typeof section.content === 'string' ? <p>{section.content}</p> : section.content}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-slate-400 italic">
              Établies conformément à la loi n° 2004-575 du 21 juin 2004 (LCEN).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentionsLegales;