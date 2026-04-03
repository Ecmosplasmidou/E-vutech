import React from 'react';
import { Clock, CheckCircle2, Zap, ShieldAlert, Download, Cpu } from 'lucide-react';
import catalogue_download from '../assets/download/Conduite-en-VU.pdf'

const Catalogue = () => {
  const socles = [
    {
      title: "Socle 1 : Identifier & Prévenir les risques",
      icon: <ShieldAlert className="w-6 h-6 text-primary" />,
      items: [
        "La déficience visuelle et son impact sur la conduite",
        "La conduite avec de l’anxiété",
        "Les risques de la conduite médicamenteuse",
        "Les dégâts de l’usage d’alcool et de stupéfiants",
        "La somnolence et organisation de tournées",
        "Chargement, répartition et contrôle du véhicule",
        "Posture, tenue de conduite et réglementation"
      ]
    },
    {
      title: "Socle 2 : Technologies & Conditions dégradées",
      icon: <Cpu className="w-6 h-6 text-primary" />,
      items: [
        "Régulateur, limiteur de vitesse et AFU & ABS",
        "Assistance à la conduite et détecteur de sous-gonflage",
        "AFIL (Alerte de franchissement de ligne)",
        "Conduite sous la pluie et en conditions hivernales",
        "Gestion des freinages avec l’inertie du chargement",
        "Gestion des accélérations et du chargement"
      ]
    },
    {
      title: "Socle 3 : Flotte électrique & Éco-conduite",
      icon: <Zap className="w-6 h-6 text-primary" />,
      items: [
        "Optimisation des pneumatiques",
        "Gestion de la climatisation",
        "Utilisation des rapports et gestion des arrêts",
        "Techniques de décélération",
        "Anticipation avancée du trafic routier"
      ]
    }
  ];

  return (
    <div className="bg-[#fcfcfd] min-h-screen font-sans pb-20">
      {/* HEADER DE LA FORMATION */}
      <section className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <span className="text-primary font-bold tracking-widest uppercase text-sm border-l-4 border-primary pl-4 mb-4 block">
                Formation Phare
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold font-serif italic mb-6">
                La conduite en VUL
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed italic">
                "Exercer son activité avec un VUL en baissant l’accidentologie grâce à l’amélioration de la prévention, de la sécurité, de l’Éco-conduite et de la réglementation."
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shrink-0">
              <div className="flex items-center gap-4 mb-4">
                <Clock className="text-primary w-6 h-6" />
                <div>
                  <p className="text-xs uppercase text-slate-400 font-bold">Durée totale</p>
                  <p className="text-xl font-black">21 Heures — 3 Jours</p>
                </div>
              </div>
              <div className="text-sm text-slate-300 font-medium">
                <span className="text-primary font-bold">Note :</span> 2/3 du parcours s’effectue <br/> en pratique & mise en situation.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU DES SOCLES */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {socles.map((socle, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                <div className="p-8 border-b border-slate-50 bg-slate-50/50">
                  <div className="mb-4">{socle.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">
                    {socle.title}
                  </h3>
                </div>
                <div className="p-8 flex-grow">
                  <ul className="space-y-4">
                    {socle.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* BOUTON TELECHARGEMENT */}
          <div className="mt-20 flex flex-col items-center">
            <div className="bg-primary/5 p-10 rounded-[3rem] border-2 border-dashed border-primary/20 text-center max-w-2xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif italic">Prêt à former vos équipes ?</h3>
              <p className="text-slate-500 mb-8">
                Retrouvez l'intégralité du détail pédagogique, les prérequis et les modalités d'évaluation dans notre programme complet.
              </p>
              <a 
                href={catalogue_download} 
                download 
                className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-primary/20 group"
              >
                <Download className="w-5 h-5 group-hover:bounce" />
                Télécharger le programme (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Catalogue;