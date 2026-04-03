import React from 'react';
import { Scale, Info, AlertCircle, Heart, CheckCircle2 } from 'lucide-react';

const ReglementInterieur = () => {
  const sections = [
    { id: 1, title: "Personnes concernées", content: "Le Règlement s’applique à tous les apprenants inscrits à une session dispensée dans des locaux loués et/ou mis à disposition par E-VUTECH et ce, pour toute la durée de la formation suivie. Chaque participant est considéré comme ayant accepté les termes du présent règlement lorsqu’il suit une formation." },
    { id: 2, title: "Règles générales", content: "Chaque apprenant doit veiller à sa sécurité personnelle et à celle des autres en respectant les consignes générales et particulières de sécurité et d’hygiène en vigueur sur le site de formation." },
    { id: 3, title: "Interdiction de fumer", content: "Il est strictement interdit de fumer et de « vapoter » au sein des locaux." },
    { id: 4, title: "Boissons alcoolisées", content: "Il est interdit aux apprenants de pénétrer ou de séjourner dans l’établissement en état d’ivresse ainsi que d’y introduire des boissons alcoolisées." },
    { id: 5, title: "Accident", content: "Tout accident ou incident survenu à l’occasion ou en cours de formation doit être immédiatement déclaré par le participant accidenté ou les personnes témoins au responsable de la formation." },
    { id: 6, title: "Consignes d’incendie", content: "Les consignes d’incendie et le plan de localisation des extincteurs sont affichés. Les participants sont tenus d’exécuter sans délai l’ordre d’évacuation donné par l’animateur." },
    { id: 7, title: "Produits toxiques", content: "Les participants ne devront en aucun cas introduire des produits de nature inflammable ou toxique, ou encore des équipements pouvant nuire au bon fonctionnement." },
    { id: 8, title: "Animaux", content: "Les animaux sont interdits dans l’ensemble des lieux." },
    { id: 9, title: "Tenue et horaires de stage", content: "Les apprenants sont tenus de respecter les horaires fixés. En cas d’absence ou de retard, l’apprenant en avertit le formateur. Une fiche de présence est signée matin et après-midi." },
    { id: 10, title: "Tenue et comportement", content: "Les participants sont invités à se présenter en tenue décente et à avoir un comportement correct à l’égard de toute personne présente." },
    { id: 11, title: "Usage du matériel", content: "Chaque apprenant a l’obligation de conserver en bon état le matériel confié. L’utilisation à des fins personnelles est interdite. Le matériel doit être restitué en fin de stage." },
    { id: 12, title: "Enregistrements & Propriété intellectuelle", content: "Il est formellement interdit d’enregistrer ou de filmer les sessions. La documentation pédagogique est protégée au titre des droits d’auteur pour un strict usage personnel." },
    { id: 13, title: "Vols et dommages", content: "E-VUTECH décline toute responsabilité en cas de perte, vol ou détérioration des objets personnels laissés sans surveillance." },
    { id: 14, title: "Sanctions et procédure", content: "Tout manquement pourra faire l’objet d’une sanction : avertissement oral, écrit ou exclusion définitive." },
    { id: 15, title: "Communication", content: "Le participant est systématiquement informé de ce règlement avant la session. Il est en libre consultation sur le site officiel." },
    { id: 16, title: "Respect & Téléphonie", content: "Les téléphones portables doivent être coupés. En cas d'urgence, prévenez le formateur et utilisez le mode silencieux à l'extérieur de la salle." },
  ];

  return (
    <div className="bg-[#fcfcfd] min-h-screen font-sans pb-20">
      {/* HEADER AVEC DÉGRADÉ PREMIUM */}
      <section className="relative py-24 px-6 text-white text-center overflow-hidden bg-gradient-to-br from-[#4a86C6] via-[#3b71ab] to-[#2d5a8a]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-2 rounded-full mb-8 shadow-sm">
            <Heart size={14} className="fill-white" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Valeur Fondamentale</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold font-serif italic mb-6 leading-tight drop-shadow-md">
            LA BIENVEILLANCE <br />
            <span className="text-blue-100">est au cœur de nos formations</span>
          </h1>
          <p className="text-blue-50/80 max-w-2xl mx-auto leading-relaxed italic text-lg md:text-xl font-medium">
            "C’est par cette règle que tout commence !"
          </p>
        </div>
        <div className="absolute -bottom-20 -right-20 md:right-10 opacity-10 pointer-events-none">
          <Scale size={450} strokeWidth={1} className="text-white" />
        </div>
      </section>

      {/* CONTENU DU RÈGLEMENT */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Bloc d'introduction législatif */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100 -mt-16 relative z-20 mb-12">
            <div className="flex items-start gap-6">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <Info className="text-primary shrink-0" size={24} />
              </div>
              <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed">
                <p>
                  E-VUTECH développe des activités de formation professionnelle pour adultes, dans le domaine de la sécurité routière pour véhicules utilitaires légers.
                </p>
                <p className="font-bold text-slate-900 border-l-4 border-primary pl-4 py-1">
                  Conformément à la législation en vigueur (Art. L6352-3 à 5 et R.6352-1 à 8 du code du travail), le présent Règlement a pour objet de définir les règles générales d’hygiène, de sécurité et les règles disciplinaires.
                </p>
              </div>
            </div>
          </div>

          {/* Liste des articles en format fiches aérées */}
          <div className="grid grid-cols-1 gap-6">
            {sections.map((section) => (
              <div 
                key={section.id} 
                className="group bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-center gap-5 mb-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-900 group-hover:bg-primary text-white flex items-center justify-center text-sm font-black transition-colors">
                    {section.id}
                  </span>
                  <h2 className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-primary transition-colors font-serif italic">
                    {section.title}
                  </h2>
                </div>
                <div className="pl-0 md:pl-15">
                  <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Note de fin / Application */}
          <div className="mt-16 p-8 bg-slate-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
            <div className="p-4 bg-white/10 rounded-2xl relative z-10">
              <CheckCircle2 className="text-primary" size={32} />
            </div>
            <div className="relative z-10 text-center md:text-left">
              <p className="text-sm md:text-base text-slate-300 leading-relaxed italic">
                "Le présent Règlement Intérieur s’applique à tous les participants (apprenants et formateurs) à une formation organisée par E-VUTECH."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReglementInterieur;