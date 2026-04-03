import React from 'react';
import { Gavel, FileText, Scale } from 'lucide-react';

const CGV = () => {
  const sections = [
    {
      id: 1,
      title: "Inscription – Conditions d’admission",
      content: "La page d’inscription sur le site https://e-vutech.fr permet d’obtenir des informations sur l’offre de formation et leurs conditions de réalisation, et de réserver une place pour une action de formation. Le participant est systématiquement informé de ce règlement intérieur avant la session de formation. Le présent Règlement Intérieur est en libre consultation sur https://e-vutech.fr/cgv/"
    },
    {
      id: 2,
      title: "Prise en charge par le participant (Particulier)",
      content: "À réception de sa demande, une confirmation sera adressée sous 10 jours. Pour valider, le participant doit retourner la convention signée. Au-delà du délai de rétractation de 10 jours, un acompte de 30 % est dû. Le solde sera réglé selon l'échéancier. Le participant doit fournir sous 5 jours avant le stage une attestation de protection sociale (AT/MP). Une convocation est envoyée 2 semaines avant le début."
    },
    {
      id: 3,
      title: "Prise en charge par l’employeur",
      content: "L’employeur doit signer électroniquement la convention. Le règlement du montant restant dû s'effectue au plus tard 5 jours ouvrés avant le stage. Une facture est générée automatiquement à l’issue de la formation. La convocation est adressée à l’employeur 2 semaines avant le début."
    },
    {
      id: 4,
      title: "Prise en charge par un organisme tiers (OPCO, CPF, etc.)",
      content: "Le donneur d'ordre doit initier la demande 2 mois avant le début. L'inscription n'est validée qu'à réception de l'accord positif du financeur. En cas de prise en charge partielle, le reliquat doit être réglé 5 jours avant le stage. Il incombe au donneur d'ordre de fournir le dossier de financement à E-VUTECH."
    },
    {
      id: 5,
      title: "Conditions financières",
      content: "Le prix n'inclut ni les repas, ni l'hébergement. En cas de défaillance du tiers financeur, l'employeur ou le participant s'engage à régler les sommes dues. Les tarifs sont nets de charges et susceptibles de modifications selon les variations économiques."
    },
    {
      id: 6,
      title: "Règlement",
      content: "Prestations dues au maximum à 30 jours fin de mois date de facture. Paiement par virement ou ligne. En cas de retard, une pénalité de 1.5 fois le taux d’intérêt légal sera appliquée après mise en demeure."
    },
    {
      id: 7,
      title: "Désistement – Abandon – Interruption",
      content: "Désistement écrit 10 jours ouvrés avant le stage sinon : 50% dû (entre J-10 et J-6) ou 100% (à moins de 5 jours). En cas de force majeure reconnue, seul le prorata des heures effectuées est dû. Toute exclusion pour comportement inapproprié entraîne la facturation intégrale."
    },
    {
      id: 8,
      title: "Report – Annulation",
      content: "E-VUTECH peut annuler ou reporter jusqu'à 2 semaines avant sans dédommagement. Les sommes perçues sont alors intégralement remboursées. Tout stage commencé est dû en totalité."
    },
    {
      id: 9,
      title: "Modalités Pratiques – Responsabilités",
      content: "E-VUTECH a une obligation de moyens. Les horaires sont de 7h/jour (9h-18h) sauf exceptions. Les participants utilisant leur véhicule personnel doivent être assurés pour ces trajets. Une attestation de fin de formation est délivrée selon l'assiduité."
    },
    {
      id: 10,
      title: "Contestation",
      content: "Toute commande vaut acceptation des présentes CGV. En cas de litige, la contestation sera portée devant les tribunaux compétents de Toulouse."
    }
  ];

  return (
    <div className="bg-[#fcfcfd] min-h-screen font-sans pb-20">

      <section className="relative py-24 px-6 text-white text-center overflow-hidden bg-gradient-to-br from-[#4a86C6] via-[#3b71ab] to-[#2d5a8a]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-2 rounded-full mb-8 shadow-sm">
            <Gavel size={14} className="text-white" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Cadre Légal</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold font-serif italic mb-6 leading-tight drop-shadow-md">
            Conditions Générales <br />
            <span className="text-blue-100 text-3xl md:text-5xl">de Vente</span>
          </h1>
          <p className="text-blue-50/80 max-w-2xl mx-auto leading-relaxed italic text-lg">
            Dernière mise à jour : Février 2026
          </p>
        </div>
        <div className="absolute -bottom-20 -right-20 md:right-10 opacity-10 pointer-events-none text-white">
          <FileText size={450} strokeWidth={1} />
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-12">
            {sections.map((section) => (
              <div key={section.id} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black">
                    {section.id}
                  </span>
                  <h2 className="text-xl font-bold text-slate-800 font-serif italic">
                    {section.title}
                  </h2>
                </div>
                <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
                  {section.content.split('\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 p-8 bg-slate-900 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-8">
            <div className="p-4 bg-white/10 rounded-2xl">
              <Scale size={32} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-slate-300 leading-relaxed italic">
                "Les présentes conditions générales se substituent aux conditions générales du catalogue papier d’E-VUTECH. Toute notification de commande vaut acceptation de ces conditions."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CGV;