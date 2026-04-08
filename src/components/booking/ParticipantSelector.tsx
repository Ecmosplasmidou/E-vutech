import React from 'react';
import { UserPlus, Trash2, Users, Mail, AlertCircle, Info, Phone, IdCard, Cake } from 'lucide-react';

const ParticipantSelector = ({ participants, setParticipants, maxParticipants = 60 }) => {
  
  const MIN_REQUIRED = 4;

  // Calcul de la date maximum autorisée (Aujourd'hui - 18 ans)
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split("T")[0];

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidTel = (tel) => /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(tel);
  const isValidPDC = (PDC) => /^(\d{12}|[a-zA-Z0-9]{15})$/.test(PDC);
  
  // Fonction pour vérifier la majorité
  const isMajor = (dateString) => {
    if (!dateString) return false;
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age >= 18;
  };

  const addParticipant = () => {
    const lastP = participants[participants.length - 1];
    if (participants.length > 0 && (
      !lastP.nom || !lastP.prenom || !isValidEmail(lastP.email) || 
      !isValidTel(lastP.tel) || !isValidPDC(lastP.PDC) || !isMajor(lastP.dateN)
    )) {
      return; 
    }
    if (participants.length < maxParticipants) {
      setParticipants([...participants, { nom: '', prenom: '', email: '', tel: '', PDC: '', dateN: '' }]);
    }
  };

  const removeParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const updateParticipant = (index, field, value) => {
    const newParticipants = [...participants];
    newParticipants[index][field] = value;
    setParticipants(newParticipants);
  };

  const isLastParticipantInvalid = participants.length > 0 && (
    !participants[participants.length - 1].nom || 
    !participants[participants.length - 1].prenom || 
    !isValidTel(participants[participants.length - 1].tel) ||
    !isValidEmail(participants[participants.length - 1].email) ||
    !isValidPDC(participants[participants.length - 1].PDC) ||
    !isMajor(participants[participants.length - 1].dateN)
  );

  const totalValidParticipants = participants.filter(p => 
    p.nom?.trim() !== '' && p.prenom?.trim() !== '' && isValidEmail(p.email) && 
    isValidTel(p.tel) && isValidPDC(p.PDC) && isMajor(p.dateN)
  ).length;

  const hasReachedMin = totalValidParticipants >= MIN_REQUIRED;

  return (
    <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-8 border border-slate-100 shadow-sm text-slate-900">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 text-center md:text-left">
        <div>
          <h3 className="text-xl font-bold text-slate-900 font-serif italic">Liste des Participants</h3>
          <p className="text-sm text-slate-500 mt-1">Les participants doivent être majeurs (18 ans révolus).</p>
        </div>
        <div className={`px-5 py-2.5 rounded-2xl flex items-center gap-3 transition-colors ${hasReachedMin ? 'bg-slate-900 text-white' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>
          <Users size={18} className={hasReachedMin ? "text-primary" : "text-orange-500"} />
          <span className="font-bold text-lg">{participants.length}</span>
          <span className="text-[10px] uppercase font-black tracking-widest opacity-70">Inscrits</span>
        </div>
      </div>

      {!hasReachedMin && (
        <div className="mb-6 p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start gap-3">
          <AlertCircle size={18} className="text-orange-500 shrink-0 mt-0.5" />
          <div className="space-y-1 text-left">
            <p className="text-sm font-bold text-orange-900 uppercase tracking-tight text-[11px]">Action requise</p>
            <p className="text-xs text-orange-700 leading-relaxed">
              Il manque <span className="font-bold">{MIN_REQUIRED - totalValidParticipants}</span> participant(s) complet(s) et majeur(s).
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 mb-6 custom-scrollbar">
        {participants.map((p, index) => {
          const dateError = p.dateN && !isMajor(p.dateN);
          const emailError = p.email && !isValidEmail(p.email);
          const telError = p.tel && !isValidTel(p.tel);
          const PDCError = p.PDC && !isValidPDC(p.PDC);
          const isEntryValid = p.nom && p.prenom && !dateError && !emailError && !telError && !PDCError && p.dateN;

          return (
            <div key={index} className="flex flex-col md:flex-row gap-2 md:gap-3 items-stretch md:items-start animate-in slide-in-from-right-4">
              <div className={`flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 rounded-[1.5rem] border transition-all ${
                isEntryValid ? 'bg-slate-50 border-slate-100 opacity-80' : 'bg-white border-primary/20 shadow-sm'
              }`}>
                
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-black text-slate-400 ml-1">Prénom *</label>
                  <input
                    placeholder="Jean"
                    value={p.prenom}
                    onChange={(e) => updateParticipant(index, 'prenom', e.target.value)}
                    className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 ring-primary/10"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-black text-slate-400 ml-1">Nom *</label>
                  <input
                    placeholder="Dupont"
                    value={p.nom}
                    onChange={(e) => updateParticipant(index, 'nom', e.target.value)}
                    className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 ring-primary/10"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-black text-slate-400 ml-1 flex justify-between">
                    Né(e) le * {dateError && <span className="text-red-500 lowercase italic text-[8px]">Mineur(e) refusé(e)</span>}
                  </label>
                  <div className="relative">
                    <Cake size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${dateError ? 'text-red-400' : 'text-slate-400'} pointer-events-none z-10`} />
                    <input
                      type="date"
                      max={maxDate}
                      value={p.dateN || ''}
                      onChange={(e) => updateParticipant(index, 'dateN', e.target.value)}
                      className={`w-full bg-white border rounded-xl pl-9 pr-3 py-2 text-sm outline-none transition-all 
                        ${!p.dateN ? 'text-slate-400' : 'text-slate-900'} 
                        ${dateError ? 'border-red-200 ring-4 ring-red-50' : 'border-slate-100 focus:ring-2 ring-primary/10'}
                        [&::-webkit-datetime-edit]:text-inherit
                      `}
                      style={{ colorScheme: 'light' }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-black text-slate-400 ml-1 flex justify-between">
                    Email * {emailError && <span className="text-red-500 lowercase italic text-[8px]">Invalide</span>}
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder="mail@domaine.fr"
                      value={p.email}
                      onChange={(e) => updateParticipant(index, 'email', e.target.value)}
                      className={`w-full bg-white border rounded-xl pl-9 pr-3 py-2 text-sm outline-none ${
                        emailError ? 'border-red-200 ring-4 ring-red-50' : 'border-slate-100 focus:ring-2 ring-primary/10'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-black text-slate-400 ml-1 flex justify-between">
                    Tél * {telError && <span className="text-red-500 lowercase italic text-[8px]">Invalide</span>}
                  </label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="06..."
                      value={p.tel}
                      onChange={(e) => updateParticipant(index, 'tel', e.target.value)}
                      className={`w-full bg-white border rounded-xl pl-9 pr-3 py-2 text-sm outline-none ${
                        telError ? 'border-red-200 ring-4 ring-red-50' : 'border-slate-100 focus:ring-2 ring-primary/10'
                      }`}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-black text-slate-400 ml-1 flex justify-between">
                    Permis * {PDCError && <span className="text-red-500 lowercase italic text-[8px]">Invalide</span>}
                  </label>
                  <div className="relative">
                    <IdCard size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      placeholder="N° Permis"
                      value={p.PDC}
                      onChange={(e) => updateParticipant(index, 'PDC', e.target.value)}
                      className={`w-full bg-white border rounded-xl pl-9 pr-3 py-2 text-sm outline-none ${
                        PDCError ? 'border-red-200 ring-4 ring-red-50' : 'border-slate-100 focus:ring-2 ring-primary/10'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={() => removeParticipant(index)}
                className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all self-center md:mt-6"
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        <button
          onClick={addParticipant}
          disabled={participants.length >= maxParticipants || isLastParticipantInvalid}
          className={`w-full flex items-center justify-center gap-3 py-4 md:py-5 border-2 border-dashed rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest transition-all ${
            isLastParticipantInvalid ? 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed' : 'border-primary/30 text-slate-500 hover:border-primary hover:text-primary hover:bg-primary/5 active:scale-[0.99]'
          }`}
        >
          <UserPlus size={20} />
          <span>Ajouter un participant</span>
        </button>

        {isLastParticipantInvalid && (
          <p className="text-[9px] md:text-[10px] font-bold text-orange-400 uppercase tracking-widest text-center animate-pulse">
            <AlertCircle size={12} className="inline mr-1" /> Veuillez remplir tous les champs (majeur requis) pour continuer
          </p>
        )}
      </div>
    </div>
  );
};

export default ParticipantSelector;