import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, Users, ArrowRight, ArrowLeft, 
  BadgeCheck, Building2, Phone, Mail, ShieldCheck, 
  Zap, CheckCircle2, Lock, Info, Loader2, AlertTriangle, MapPin,
  HelpCircle, Sparkles
} from 'lucide-react';

import { db } from '../firebase'; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { sendReservationEmail } from '../services/mailService';

import BookingCalendar from '../components/booking/BookingCalendar';
import ParticipantSelector from '../components/booking/ParticipantSelector';

const Reservation = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [organizer, setOrganizer] = useState({
    nom: '', societe: '', email: '', telephone: '', ville: ''
  });

  const [citySuggestions, setCitySuggestions] = useState([]);
  const [isSearchingCity, setIsSearchingCity] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isCitySelected, setIsCitySelected] = useState(false);

  const hoursGoal = 21;
  const currentHours = selectedSlots.reduce((acc, slot) => acc + slot.hours, 0);

  const validateEmail = (email) => String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  
  // Validation globale corrigée
  const isFormValid = organizer.societe.trim().length > 1 && 
                     organizer.nom.trim().length > 1 && 
                     isCitySelected && 
                     validateEmail(organizer.email);

  const searchCity = async (query) => {
    setOrganizer({ ...organizer, ville: query });
    
    // Si l'utilisateur tape, on considère que la ville n'est plus "validée par l'API"
    setIsCitySelected(false); 
    
    if (query.length < 3) {
      setCitySuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsSearchingCity(true);
    try {
      const response = await fetch(`https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(query)}&limit=5`);
      const data = await response.json();
      setCitySuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Erreur API Géo", error);
    } finally {
      setIsSearchingCity(false);
    }
  };

  const handleFinalSubmit = async () => {
    if (!isCitySelected) {
      setSubmitError("Veuillez sélectionner votre ville dans la liste des suggestions.");
      return;
    }
    if (!isFormValid) { 
      setSubmitError("Veuillez vérifier tous les champs obligatoires."); 
      return; 
    }
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const reservationData = {
        organizer, participants, selectedSlots,
        participantCount: participants.length,
        totalHours: currentHours,
        createdAt: serverTimestamp(),
        status: "en_attente"
      };
      await addDoc(collection(db, "reservations"), reservationData);
      await sendReservationEmail(organizer, selectedSlots, participants);
      setIsFinalized(true);
    } catch (error) {
      setSubmitError("Erreur lors de l'enregistrement. Vérifiez votre connexion.");
    } finally { setIsSubmitting(false); }
  };

  if (isFinalized) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center px-4 py-10">
        <div className="text-center space-y-6 md:space-y-8 max-w-xl w-full animate-in zoom-in duration-500">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-100">
            <BadgeCheck size={48} className="md:w-14 md:h-14" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-slate-950 font-serif italic">Dossier transmis</h1>
          <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-2xl text-left space-y-4 md:space-y-6">
            <p className="text-slate-500 text-sm md:text-base leading-relaxed text-center">Félicitations <strong>{organizer.nom}</strong>. Votre demande pour <strong>{organizer.societe}</strong> est en cours d'analyse.</p>
          </div>
          <button onClick={() => window.location.href = '/'} className="w-full md:w-auto px-12 py-4 bg-slate-950 text-white rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary transition-all">Retour Accueil</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-6 md:py-16 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col lg:flex-row justify-between items-center gap-6 md:gap-8 border-b border-slate-200 pb-8 md:pb-12 text-center lg:text-left">
          <div className="space-y-2 md:space-y-3">
            <h1 className="text-3xl md:text-6xl font-bold font-serif italic text-slate-950 tracking-tight">Réservation</h1>
            <p className="text-slate-400 text-sm md:text-lg font-light">Suivez les étapes pour constituer votre dossier de formation.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
             <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm text-[10px] font-bold text-slate-600 uppercase">
                <ShieldCheck size={14} className="text-emerald-500"/> Datadock
             </div>
             <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl shadow-lg text-[10px] font-bold text-white uppercase">
                <Zap size={14} className="text-amber-400"/> Financement OPCO
             </div>
          </div>
        </header>

        {/* --- ÉTAPES --- */}
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {[
            { id: 1, label: 'Dates', icon: <CalendarIcon size={14}/> },
            { id: 2, label: 'Candidats', icon: <Users size={14}/> },
            { id: 3, label: 'Finalisation', icon: <BadgeCheck size={14}/> }
          ].map((s) => (
            <React.Fragment key={s.id}>
              <div className={`flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all ${step === s.id ? 'bg-primary text-white shadow-lg' : 'bg-white text-slate-300 border border-slate-100'}`}>
                {s.icon} <span className={step === s.id ? 'inline' : 'hidden sm:inline'}>{s.label}</span>
              </div>
              {s.id !== 3 && <div className={`w-4 md:w-16 h-[2px] ${step > s.id ? 'bg-primary' : 'bg-slate-200'}`}></div>}
            </React.Fragment>
          ))}
        </div>

        <main className="max-w-7xl mx-auto">
          {/* ÉTAPE 1 */}
          {step === 1 && (
            <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-start gap-3 text-blue-800">
                    <HelpCircle size={20} className="shrink-0 mt-0.5" />
                    <div>
                       <p className="text-[11px] font-bold uppercase">Comment réserver ?</p>
                       <p className="text-xs italic">Sélectionnez les créneaux pour atteindre <strong>21 heures</strong>.</p>
                    </div>
                 </div>
                 <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3 text-amber-800">
                    <Info size={20} className="shrink-0 mt-0.5" />
                    <div>
                       <p className="text-[11px] font-bold uppercase">Quotas</p>
                       <p className="text-xs italic">Le quorum de 12 personnes est nécessaire pour maintenir une session.</p>
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-4 md:p-10 border border-slate-100 shadow-2xl">
                 <BookingCalendar selectedSlots={selectedSlots} setSelectedSlots={setSelectedSlots} hoursGoal={hoursGoal} />
              </div>
              
              <div className="flex justify-center md:justify-end">
                  <button onClick={() => setStep(2)} disabled={currentHours !== hoursGoal} className={`w-full md:w-auto px-12 py-4 rounded-xl font-black uppercase text-[10px] transition-all ${currentHours === hoursGoal ? 'bg-primary text-white hover:scale-105 shadow-xl' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                    Suivant <ArrowRight size={14} className="inline ml-2" />
                  </button>
              </div>
            </div>
          )}

          {/* ÉTAPE 2 */}
          {step === 2 && (
            <div className="max-w-5xl mx-auto space-y-6 animate-in slide-in-from-right-10 duration-700">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-slate-400 hover:text-primary font-bold text-xs uppercase tracking-widest">
                <ArrowLeft size={16} /> Retour au calendrier
              </button>

              <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-5 border border-slate-100 shadow-2xl">
                 <ParticipantSelector participants={participants} setParticipants={setParticipants} />
              </div>

              <div className="flex justify-end">
                <button onClick={() => setStep(3)} disabled={participants.length === 0} className={`w-full md:w-auto px-12 py-4 rounded-2xl font-black uppercase text-[10px] transition-all ${participants.length > 0 ? 'bg-slate-950 text-white shadow-2xl hover:bg-primary' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                  Continuer avec {participants.length} candidat{participants.length > 1 ? 's' : ''} <ArrowRight size={16} className="inline ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* ÉTAPE 3 */}
          {step === 3 && (
            <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-right-10 duration-700">
              <button onClick={() => setStep(2)} className="flex items-center gap-2 text-slate-400 hover:text-primary font-bold text-xs uppercase tracking-widest">
                <ArrowLeft size={16} /> Retour aux participants
              </button>

              <div className="bg-white rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-16 border border-slate-100 shadow-2xl space-y-8">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold font-serif italic text-slate-950 tracking-tight">Responsable</h2>
                  <p className="text-slate-400 text-xs mt-2 flex items-center justify-center md:justify-start gap-2 italic">
                     <Lock size={12} /> Informations confidentielles pour votre convention.
                  </p>
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 text-red-600 animate-pulse">
                    <AlertTriangle size={18} className="shrink-0" />
                    <p className="text-[10px] font-black uppercase">{submitError}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6">
                  {/* SOCIÉTÉ */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Entreprise *</label>
                    <div className="relative">
                      <Building2 size={18} className={`absolute left-5 top-1/2 -translate-y-1/2 ${organizer.societe ? 'text-primary' : 'text-slate-300'}`} />
                      <input required className="w-full bg-slate-50 border-none rounded-xl md:rounded-2xl pl-12 pr-6 py-4 outline-none text-sm font-bold focus:ring-2 ring-primary/20" placeholder="Ex: SARL Transport" value={organizer.societe} onChange={(e) => setOrganizer({...organizer, societe: e.target.value})} />
                    </div>
                  </div>

                  {/* VILLE - CORRIGÉ */}
                  <div className="space-y-2 relative">
                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2 flex justify-between">
                      <span>Ville *</span>
                      {/* Le message disparait dès que isCitySelected est vrai */}
                      {!isCitySelected && organizer.ville.length >= 2 && <span className="text-orange-500 animate-pulse">Choisir dans la liste</span>}
                    </label>
                    <div className="relative">
                      <MapPin size={18} className={`absolute left-5 top-1/2 -translate-y-1/2 z-10 ${isCitySelected ? 'text-emerald-500' : 'text-slate-300'}`} />
                      <input 
                        required 
                        className={`w-full bg-slate-50 border-none rounded-xl md:rounded-2xl pl-12 pr-6 py-4 outline-none text-sm font-bold transition-all ${isCitySelected ? 'ring-2 ring-emerald-500/20 shadow-inner' : 'focus:ring-2 ring-primary/20'}`} 
                        placeholder="Cherchez votre commune..." 
                        value={organizer.ville} 
                        onChange={(e) => searchCity(e.target.value)} 
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        onFocus={() => organizer.ville.length >= 3 && setShowSuggestions(true)}
                      />
                      {isSearchingCity && <Loader2 className="absolute right-5 top-1/2 -translate-y-1/2 animate-spin text-slate-300" size={16} />}
                      {isCitySelected && <CheckCircle2 className="absolute right-5 top-1/2 -translate-y-1/2 text-emerald-500 animate-in zoom-in" size={18} />}

                      {showSuggestions && citySuggestions.length > 0 && (
                        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-top-2">
                          {citySuggestions.map((city, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => {
                                setOrganizer({ ...organizer, ville: city.nom });
                                setIsCitySelected(true); // <--- INDISPENSABLE POUR DÉBLOQUER
                                setShowSuggestions(false);
                                setSubmitError(null);
                              }}
                              className="w-full text-left px-6 py-4 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors flex items-center justify-between group"
                            >
                              <span>{city.nom} <span className="text-slate-300 font-normal">({city.codePostale || city.codeDepartement})</span></span>
                              <Sparkles size={14} className="opacity-0 group-hover:opacity-100 text-primary transition-all" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Responsable *</label>
                    <input required className="w-full bg-slate-50 border-none rounded-xl px-6 py-4 outline-none text-sm font-bold focus:ring-2 ring-primary/20" placeholder="NOM Prénom" value={organizer.nom} onChange={(e) => setOrganizer({...organizer, nom: e.target.value})} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Email *</label>
                      <input type="email" required className="w-full bg-slate-50 border-none rounded-xl px-6 py-4 outline-none text-sm font-bold focus:ring-2 ring-primary/20" placeholder="direction@entreprise.fr" value={organizer.email} onChange={(e) => setOrganizer({...organizer, email: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Tél.</label>
                      <input className="w-full bg-slate-50 border-none rounded-xl px-6 py-4 outline-none text-sm font-bold focus:ring-2 ring-primary/20" placeholder="06..." value={organizer.telephone} onChange={(e) => setOrganizer({...organizer, telephone: e.target.value})} />
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-col gap-4">
                  <button 
                    onClick={handleFinalSubmit}
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all shadow-2xl flex justify-center items-center gap-3 ${isFormValid && !isSubmitting ? 'bg-primary text-white hover:bg-slate-950 scale-[1.02]' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : "Finaliser ma demande"}
                  </button>
                  <p className="text-[8px] text-center text-slate-400 uppercase tracking-widest leading-relaxed">En confirmant, vous acceptez de recevoir une proposition pédagogique par email.</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Reservation;