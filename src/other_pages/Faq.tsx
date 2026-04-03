import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`mb-4 transition-all duration-300 border ${isOpen ? 'bg-white border-primary/20 shadow-md scale-[1.01]' : 'bg-slate-50/50 border-slate-100 hover:border-slate-200'} rounded-[1.5rem] overflow-hidden`}>
      <button
        className="w-full py-5 px-6 md:px-8 flex items-center justify-between text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-sm md:text-base font-bold transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-slate-700 group-hover:text-primary'}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? (
            <Minus className="w-5 h-5 text-primary" />
          ) : (
            <Plus className="w-5 h-5 text-slate-400 group-hover:text-primary" />
          )}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 md:px-8 pb-6 text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-4">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "Où se déroulent les formations E-VUTECH ?",
      answer: "Toutes nos formations pratiques sont dispensées sur des circuits automobiles homologués. Cela permet un apprentissage en milieu totalement sécurisé, loin du trafic routier, pour tester les limites du véhicule sans aucun risque."
    },
    {
      question: "Dois-je venir avec mon propre véhicule utilitaire ?",
      answer: "E-VUTECH peut mettre à disposition des véhicules adaptés pour les exercices pratiques. Cependant, il est souvent préférable de pratiquer sur vos propres VUL afin que vos collaborateurs se familiarisent avec le gabarit et les technologies spécifiques de votre flotte."
    },
    {
      question: "Quels sont les financements possibles (OPCO, CPF) ?",
      answer: "E-VUTECH est un organisme de formation certifié. Selon votre statut, vous pouvez solliciter votre OPCO (salariés du privé) ou le FAF (indépendants). L'inscription au CPF est actuellement en cours de labellisation."
    },
    {
      question: "La formation est-elle adaptée aux conducteurs débutants ?",
      answer: "Oui, la formation s'adresse à toute personne titulaire du permis B. Que vous soyez un conducteur expérimenté ou un nouvel utilisateur de VUL, nos formateurs adaptent leur pédagogie à votre niveau initial."
    },
    {
      question: "Quelle est la part de pratique durant les 3 jours ?",
      answer: "La pratique et la mise en situation réelle représentent 66 % du temps total de la formation (soit environ 14 heures sur les 21 heures de stage)."
    }
  ];

  return (
    <div className="bg-[#fcfcfd] min-h-screen font-sans">
      
      {/* HEADER AVEC DÉGRADÉ DYNAMIQUE */}
      <section className="relative py-24 px-6 text-white text-center overflow-hidden bg-gradient-to-br from-[#4a86C6] via-[#3b71ab] to-[#2d5a8a]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-2 rounded-full mb-8 shadow-sm">
            <HelpCircle size={14} className="text-white" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Centre d'aide</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold font-serif italic mb-6 leading-tight drop-shadow-md">
            Questions <br />
            <span className="text-blue-100 text-3xl md:text-5xl font-serif">Fréquentes</span>
          </h1>
          <p className="text-blue-50/80 max-w-2xl mx-auto leading-relaxed italic text-lg">
            Tout ce que vous devez savoir sur nos stages et les modalités d'inscription.
          </p>
        </div>
      </section>

      {/* LISTE DES ACCORDÉONS */}
      <section className="py-16 px-6 -mt-10 relative z-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION (SOMBRE) */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-slate-900 rounded-[3.5rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif italic mb-4 italic">
                Vous n'avez pas trouvé <br className="hidden md:block" /> votre réponse ?
              </h2>
              <p className="text-slate-400 mb-10 max-w-lg mx-auto text-sm leading-relaxed">
                Notre équipe pédagogique est à votre entière disposition pour toute question technique, logistique ou administrative.
              </p>
              <Link 
                to="/contact" 
                className="inline-block bg-primary text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-primary/20 active:scale-95"
              >
                Poser une question
              </Link>
            </div>
            
            {/* Décoration subtile */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full -mr-40 -mt-40 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary/5 rounded-full -ml-30 -mb-30 blur-2xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;