import React, { useState } from 'react';
import { 
  Mail, Send, MessageSquare, 
  Building, Info, CheckCircle, MapPin, Zap 
} from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    interet: '',
    civilite: '',
    nom: '',
    prenom: '',
    entite: '',
    fonction: '',
    email: '',
    telephone: '',
    codePostal: '',
    ville: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "contact_requests"), {
        ...formData,
        entite: formData.entite.trim() === "" ? "Inconnu" : formData.entite,
        status: 'en_attente',
        createdAt: serverTimestamp(),
      });

      setIsSuccess(true);
      setIsSubmitting(false);
      setFormData({
        interet: '', civilite: '', nom: '', prenom: '',
        entite: '', fonction: '', email: '', telephone: '',
        codePostal: '', ville: '', message: ''
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setIsSuccess(false), 7000);
    } catch (err) {
      console.error('Erreur Firebase:', err);
      alert("Une erreur technique est survenue lors de l'envoi.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans pb-10 md:pb-20 selection:bg-primary/20">
      {/* Header Section */}
      <section className="relative pt-24 md:pt-32 pb-32 md:pb-48 bg-slate-950 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-full md:w-[50%] h-full bg-primary/10 -skew-x-12 translate-x-16 md:translate-x-32 blur-[60px] md:blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-6 md:mb-8 animate-fade-in-down">
            <MessageSquare size={14} className="text-primary" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Support & Conseil</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold font-serif italic mb-6 md:mb-8 leading-[1.1] lg:leading-[0.9] tracking-tighter">
            Parlons de <br className="hidden md:block" /> <span className="text-primary not-italic font-sans tracking-tight">votre projet.</span>
          </h1>
          <p className="text-slate-400 text-base md:text-xl lg:text-2xl max-w-2xl leading-relaxed italic font-light mx-auto lg:mx-0">
            "Une question sur nos tarifs ou nos dates ? Notre équipe pédagogique vous répond avec <span className="text-white">réactivité</span>."
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="px-4 md:px-6 -mt-20 md:-mt-32 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
            
            {/* Sidebar Info */}
            <div className="lg:col-span-1 space-y-6 md:space-y-8 lg:sticky lg:top-24">
              <div className="bg-white p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 space-y-6 md:space-y-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-950 font-serif italic mb-2">Contact direct</h2>
                  <div className="h-1.5 w-16 bg-primary rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-5 p-4 md:p-5 bg-slate-50 rounded-2xl border border-transparent">
                    <div className="h-10 w-10 md:h-12 md:w-12 shrink-0 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm"><MapPin size={20} /></div>
                    <div>
                      <p className="text-[8px] md:text-[9px] font-black uppercase text-slate-400 tracking-widest">Zone d'intervention</p>
                      <p className="text-xs md:text-sm font-bold text-slate-950">Occitanie & National</p>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-100">
                  <div className="bg-slate-950 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Zap size={40} md:size={60} className="text-primary" /></div>
                    <div className="flex items-center gap-3 text-primary mb-4">
                      <Info size={16} /><span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Délai moyen</span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed italic relative z-10">
                      "Réponse garantie sous <span className="text-white font-bold">24h ouvrées</span> pour toute demande de devis."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-slate-100 p-6 md:p-12 lg:p-16 relative overflow-hidden">
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center space-y-6 animate-in fade-in zoom-in duration-700">
                    <div className="h-20 w-20 md:h-24 md:w-24 bg-primary text-white rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mb-4 shadow-2xl shadow-primary/40 rotate-12"><CheckCircle size={40} md:size={56} /></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-950 font-serif italic">Message transmis !</h2>
                    <p className="text-slate-500 max-w-sm text-base md:text-lg font-light">Merci pour votre confiance. Notre équipe reviendra vers vous très rapidement.</p>
                    <button onClick={() => setIsSuccess(false)} className="text-primary font-black uppercase text-[10px] md:text-xs tracking-widest border-b-2 border-primary/20 pb-1">Envoyer un autre message</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                    {/* Profil Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div className="md:col-span-2">
                        <h3 className="flex items-center gap-3 text-slate-950 font-serif italic text-lg md:text-xl mb-2"><span className="h-px w-6 md:w-8 bg-primary"></span> Votre Profil</h3>
                      </div>
                      <div className="md:col-span-2 space-y-3">
                        <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">Vous êtes : *</label>
                        <select name="interet" required value={formData.interet} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl px-4 md:px-6 py-4 md:py-5 focus:ring-4 focus:ring-primary/10 focus:bg-white outline-none transition-all text-sm font-medium">
                          <option value="">Choisissez...</option>
                          {['Société', 'Indépendant', 'Association', 'Particulier', 'Collectivité'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                      <div className="md:col-span-2 space-y-3">
                        <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">Civilité *</label>
                        <div className="flex flex-wrap gap-6 md:gap-8">
                          {['Madame', 'Monsieur', 'Autre'].map(civ => (
                            <label key={civ} className="flex items-center gap-2 md:gap-3 cursor-pointer group">
                              <input type="radio" name="civilite" value={civ} checked={formData.civilite === civ} onChange={handleChange} required className="w-4 h-4 md:w-5 md:h-5 accent-primary cursor-pointer" />
                              <span className="text-xs md:text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">{civ}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">Prénom *</label>
                        <input type="text" name="prenom" required value={formData.prenom} onChange={handleChange} className="input-modern" placeholder="Ex: Jean" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">Nom *</label>
                        <input type="text" name="nom" required value={formData.nom} onChange={handleChange} className="input-modern" placeholder="Ex: Dupont" />
                      </div>
                    </div>

                    {/* Contact Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-4 md:pt-6">
                      <div className="md:col-span-2"><h3 className="flex items-center gap-3 text-slate-950 font-serif italic text-lg md:text-xl mb-2"><span className="h-px w-6 md:w-8 bg-primary"></span> Contact & Localisation</h3></div>
                      <div className="space-y-2"><label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">Entité</label><input type="text" name="entite" value={formData.entite} onChange={handleChange} className="input-modern" placeholder="Structure" /></div>
                      <div className="space-y-2"><label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">Fonction *</label><input type="text" name="fonction" required value={formData.fonction} onChange={handleChange} className="input-modern" placeholder="Poste" /></div>
                      <div className="space-y-2"><label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">Courriel *</label><input type="email" name="email" required value={formData.email} onChange={handleChange} className="input-modern" placeholder="mail@domaine.fr" /></div>
                      <div className="space-y-2"><label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">Téléphone *</label><input type="tel" name="telephone" required value={formData.telephone} onChange={handleChange} className="input-modern" placeholder="06..." /></div>
                      <div className="space-y-2"><label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">Ville *</label><input type="text" name="ville" required value={formData.ville} onChange={handleChange} className="input-modern" /></div>
                      <div className="space-y-2"><label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">Code Postal *</label><input type="text" name="codePostal" required value={formData.codePostal} onChange={handleChange} className="input-modern" /></div>
                    </div>

                    {/* Message Section */}
                    <div className="space-y-3 pt-4 md:pt-6">
                      <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><MessageSquare size={14} /> Message : *</label>
                      <textarea name="message" required rows={5} value={formData.message} onChange={handleChange} className="input-modern resize-none" placeholder="Votre projet..."></textarea>
                    </div>

                    <div className="pt-4 md:pt-8 text-center md:text-left">
                      <button type="submit" disabled={isSubmitting} className={`w-full md:w-auto bg-primary text-white px-10 md:px-14 py-5 md:py-6 rounded-2xl md:rounded-3xl font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px] transition-all shadow-2xl shadow-primary/30 active:scale-95 ${isSubmitting ? 'opacity-70' : 'hover:bg-slate-950'}`}>
                        {isSubmitting ? 'Transmission...' : 'Envoyer la demande'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .input-modern { width: 100%; background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 1rem; padding: 1rem 1.25rem; font-size: 0.875rem; font-weight: 500; color: #0f172a; outline: none; transition: all 0.4s; }
        @media (min-width: 768px) {
          .input-modern { border-radius: 1.25rem; padding: 1.25rem 1.5rem; }
        }
        .input-modern:focus { border-color: #4a86C6; background-color: #ffffff; box-shadow: 0 10px 30px -10px rgba(74, 134, 198, 0.15); }
      `}} />
    </div>
  );
};

export default Contact;