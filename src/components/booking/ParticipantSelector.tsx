import React from 'react';
import { UserPlus, Trash2, Users, Mail, AlertCircle, Info, Phone, IdCard } from 'lucide-react';

const ParticipantSelector = ({ participants, setParticipants, maxParticipants = 60 }) => {
  
  const MIN_REQUIRED = 4;

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidTel = (tel) => {
    return /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(tel);
  };

  const isValidPDC = (PDC) => {
    return /^(\d{12}|[a-zA-Z0-9]{15})$/.test(PDC)
  };

  const addParticipant = () => {
    const lastP = participants[participants.length - 1];
    if (participants.length > 0 && (!lastP.nom || !lastP.prenom || !isValidEmail(lastP.email) || !isValidTel(lastP.tel) || !isValidPDC(lastP.PDC))) {
      return; 
    }

    if (participants.length < maxParticipants) {
      setParticipants([...participants, { nom: '', prenom: '', email: '', tel: '', PDC: '' }]);
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
    !isValidPDC(participants[participants.length -1].PDC)
  );

  const totalValidParticipants = participants.filter(p => 
    p.nom.trim() !== '' && p.prenom.trim() !== '' && isValidEmail(p.email) && isValidTel(p.tel) && isValidPDC(p.PDC)
  ).length;

  const hasReachedMin = totalValidParticipants >= MIN_REQUIRED;

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 font-serif italic">Liste des Participants</h3>
          <p className="text-sm text-slate-500 mt-1">Un minimum de 4 participants complets est requis pour cette session.</p>
        </div>
        <div className={`px-5 py-2.5 rounded-2xl flex items-center gap-3 transition-colors ${hasReachedMin ? 'bg-slate-900 text-white' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>
          <Users size={18} className={hasReachedMin ? "text-primary" : "text-orange-500"} />
          <span className="font-bold text-lg">{participants.length}</span>
          <span className="text-[10px] uppercase font-black tracking-widest opacity-70">Inscrits</span>
        </div>
      </div>

      {!hasReachedMin && (
        <div className="mb-6 p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={18} className="text-orange-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-bold text-orange-900 uppercase tracking-tight text-[11px]">Action requise</p>
            <p className="text-xs text-orange-700 leading-relaxed">
              Veuillez ajouter au moins <span className="font-bold">{MIN_REQUIRED} participants</span> valides pour débloquer l'étape de finalisation. 
              Il vous en manque actuellement <span className="font-bold">{MIN_REQUIRED - totalValidParticipants}</span>.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar mb-6">
        {participants.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/50">
            <Info size={32} className="mx-auto text-slate-200 mb-3" />
            <p className="text-slate-400 text-sm italic">Commencez par ajouter votre premier participant.</p>
          </div>
        ) : (
          participants.map((p, index) => {
            const emailError = p.email && !isValidEmail(p.email);
            const isEntryValid = p.nom && p.prenom && isValidEmail(p.email);
            const telError = p.tel && !isValidTel(p.tel);
            const PDCError = p.PDC && !isValidPDC(p.PDC);
            
            return (
              <div key={index} className="flex gap-3 items-start animate-in slide-in-from-right-4 duration-300">
                <div className={`flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-[1.5rem] border transition-all ${
                  isEntryValid 
                  ? 'bg-slate-50 border-slate-100 opacity-80' 
                  : 'bg-white border-primary/20 shadow-sm'
                }`}>
                  
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-black text-slate-400 ml-1">Prénom *</label>
                    <input
                      placeholder="Jean"
                      value={p.prenom}
                      onChange={(e) => updateParticipant(index, 'prenom', e.target.value)}
                      className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 ring-primary/10 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-black text-slate-400 ml-1">Nom *</label>
                    <input
                      placeholder="Dupont"
                      value={p.nom}
                      onChange={(e) => updateParticipant(index, 'nom', e.target.value)}
                      className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-sm focus:ring-2 ring-primary/20 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-black text-slate-400 ml-1 flex justify-between">
                      Email * {emailError && <span className="text-red-500 lowercase font-medium italic">Format invalide</span>}
                    </label>
                    <div className="relative">
                      <Mail size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${emailError ? 'text-red-400' : 'text-slate-400'}`} />
                      <input
                        placeholder="email@domaine.fr"
                        type="email"
                        value={p.email}
                        onChange={(e) => updateParticipant(index, 'email', e.target.value)}
                        className={`w-full bg-white border rounded-xl pl-9 pr-3 py-2 text-sm outline-none transition-all ${
                          emailError 
                            ? 'border-red-200 ring-4 ring-red-50' 
                            : 'border-slate-100 focus:ring-2 ring-primary/20'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-black text-slate-400 ml-1 flex justify-between">
                      Tél * {telError && <span className="text-red-500 lowercase font-medium italic">Format invalide</span>}
                    </label>
                    <div className="relative">
                      <Phone size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${telError ? 'text-red-400' : 'text-slate-400'}`} />
                      <input
                        placeholder="06 XX XX XX XX"
                        type="phone"
                        value={p.tel}
                        onChange={(e) => updateParticipant(index, 'tel', e.target.value)}
                        className={`w-full bg-white border rounded-xl pl-9 pr-3 py-2 text-sm outline-none transition-all ${
                          telError 
                            ? 'border-red-200 ring-4 ring-red-50' 
                            : 'border-slate-100 focus:ring-2 ring-primary/20'
                        }`}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-black text-slate-400 ml-1 flex justify-between">
                      Permis de conduire * {PDCError && <span className="text-red-500 lowercase font-medium italic">Format invalide</span>}
                    </label>
                    <div className="relative">
                      <IdCard size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${PDCError ? 'text-red-400' : 'text-slate-400'}`} />
                      <input
                        placeholder="911091204209"
                        type="PDC"
                        value={p.PDC}
                        onChange={(e) => updateParticipant(index, 'PDC', e.target.value)}
                        className={`w-full bg-white border rounded-xl pl-9 pr-3 py-2 text-sm outline-none transition-all ${
                          PDCError 
                            ? 'border-red-200 ring-4 ring-red-50' 
                            : 'border-slate-100 focus:ring-2 ring-primary/20'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => removeParticipant(index)}
                  className="mt-8 p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="Supprimer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="space-y-3">
        <button
          onClick={addParticipant}
          disabled={participants.length >= maxParticipants || isLastParticipantInvalid}
          className={`w-full flex items-center justify-center gap-3 py-5 border-2 border-dashed rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest transition-all group ${
            isLastParticipantInvalid 
            ? 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed shadow-none' 
            : 'border-primary/30 text-slate-500 hover:border-primary hover:text-primary hover:bg-primary/5 hover:shadow-lg active:scale-[0.99]'
          }`}
        >
          <UserPlus size={20} className={!isLastParticipantInvalid ? "group-hover:scale-110 transition-transform" : ""} />
          Ajouter un participant
        </button>

        {isLastParticipantInvalid && (
          <p className="flex items-center justify-center gap-2 text-[10px] font-bold text-orange-400 uppercase tracking-widest animate-pulse">
            <AlertCircle size={12} /> Complétez la ligne actuelle pour continuer l'ajout
          </p>
        )}
      </div>
    </div>
  );
};

export default ParticipantSelector;