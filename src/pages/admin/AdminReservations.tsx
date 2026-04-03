import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, doc, deleteDoc, query, orderBy, updateDoc } from 'firebase/firestore';
import { 
  Trash2, Search, Calendar, RefreshCw, Loader2, 
  X, IdCard, Mail, Phone, Truck, MapPin, Building2
} from 'lucide-react'; 
import '../../assets/Style/AdminReservationsStyle.css';

import Swal from 'sweetalert2';
import { sendValidationEmail } from '../../services/mailService';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selectedRes, setSelectedRes] = useState(null);
  const QUORUM_LIMIT = 12;

  useEffect(() => { fetchReservations(); }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "reservations"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const rawDocs = snap.docs.map(d => ({ id: d.id, ...d.data() }));

      // --- FUSION PAR SOCIÉTÉ & VILLE ---
      const merged = rawDocs.reduce((acc, current) => {
        const societe = current.organizer?.societe?.trim() || "Inconnu";
        const ville = current.organizer?.ville?.trim() || "Non précisée";
        const key = `${societe.toLowerCase()}-${ville.toLowerCase()}`;

        if (!acc[key]) {
          acc[key] = { ...current, societeDisplay: societe, villeDisplay: ville };
        } else {
          acc[key].participantCount = (acc[key].participantCount || 0) + (current.participantCount || 0);
          acc[key].participants = [...(acc[key].participants || []), ...(current.participants || [])];
          
          const existingSlotIds = new Set(acc[key].selectedSlots.map(s => s.id));
          current.selectedSlots?.forEach(slot => {
            if (!existingSlotIds.has(slot.id)) {
              acc[key].selectedSlots.push(slot);
            }
          });
          acc[key].originalIds = acc[key].originalIds || [acc[key].id];
          acc[key].originalIds.push(current.id);
        }
        return acc;
      }, {});

      setReservations(Object.values(merged));
    } catch (error) {
      console.error("Erreur:", error);
      Swal.fire('Erreur', 'Impossible de charger les données.', 'error');
    } finally { 
      setLoading(false); 
    }
  };

  const handleValidate = async (res) => {
    try {
      await sendValidationEmail(res);
      const idsToUpdate = res.originalIds || [res.id];
      await Promise.all(idsToUpdate.map(id => 
        updateDoc(doc(db, "reservations", id), { status: 'valide' })
      ));
      fetchReservations();
      Swal.fire('Succès', 'Réservation traitée.', 'success');
    } catch (error) {
      Swal.fire('Erreur', 'Échec de la validation.', 'error');
    }
  };

  const getGlobalOccupancy = () => {
    const occupancy = {};
    reservations.forEach(res => {
      res.selectedSlots?.forEach(slot => {
        occupancy[slot.id] = (occupancy[slot.id] || 0) + (res.participantCount || 0);
      });
    });
    return occupancy;
  };
  const globalOccupancy = getGlobalOccupancy();

  const formatSlotsForDisplay = (slots) => {
    if (!slots) return [];
    const grouped = slots.reduce((acc, slot) => {
      const p = slot.id.split('-');
      const key = `${p[2]}/${p[1]}/${p[0]}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push({ type: p[3], fullId: slot.id });
      return acc;
    }, {});
    return Object.entries(grouped).map(([date, types]) => {
      const ids = types.map(t => t.fullId);
      const minInscrits = Math.min(...ids.map(id => globalOccupancy[id] || 0));
      return { date, label: types.length > 1 ? "Journée" : (types[0].type === 'matin' ? "Matin" : "Après-midi"), isQuorumReached: minInscrits >= QUORUM_LIMIT, count: minInscrits };
    });
  };

  const groupedByCity = reservations
    .filter(r => r.societeDisplay?.toLowerCase().includes(filter.toLowerCase()) || r.villeDisplay?.toLowerCase().includes(filter.toLowerCase()))
    .reduce((acc, res) => {
      const city = res.villeDisplay;
      if (!acc[city]) acc[city] = [];
      acc[city].push(res);
      return acc;
    }, {});

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 lg:p-12 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col h-full">
        
        <header className="mb-12 flex flex-col lg:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl font-serif italic font-bold text-slate-950">Tableau de Bord</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2 flex items-center gap-2">
              <Calendar size={14} className="text-primary" /> Visualisation par Ville & Entreprise
            </p>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-grow lg:flex-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input type="text" placeholder="Ville ou Société..." value={filter} onChange={(e) => setFilter(e.target.value)} className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 ring-primary/10 transition-all w-full lg:w-72 shadow-sm" />
            </div>
            <button onClick={fetchReservations} className="p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-primary transition-all shadow-sm">
              <RefreshCw size={20} className={loading ? 'animate-spin text-primary' : ''} />
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-primary" size={40} />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Synchronisation...</span>
          </div>
        ) : Object.keys(groupedByCity).length === 0 ? (
          <div className="bg-white p-20 rounded-[3rem] border border-dashed text-center text-slate-400 italic">Aucune réservation trouvée.</div>
        ) : (
          Object.entries(groupedByCity).map(([city, cityRes]) => (
            <div key={city} className="mb-12">
              {/* SÉPARATEUR VILLE */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 text-primary rounded-2xl shadow-sm">
                  <MapPin size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{city}</h2>
                <div className="h-[2px] flex-grow bg-slate-200/50 rounded-full"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase bg-white px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
                  {cityRes.length} Entreprise{cityRes.length > 1 ? 's' : ''}
                </span>
              </div>

              {/* LISTE DES CARTES PAR VILLE */}
              <div className="space-y-4">
                {cityRes.map(res => {
                  const info = formatSlotsForDisplay(res.selectedSlots);
                  const allOk = info.every(i => i.isQuorumReached);
                  const isValide = res.status === 'valide';

                  return (
                    <div 
                      key={res.id} 
                      onClick={() => setSelectedRes(res)}
                      className={`cursor-pointer group bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-8 items-center transition-all 
                        ${isValide ? 'opacity-50 grayscale shadow-none border-slate-200' : 'hover:shadow-xl hover:border-primary/20'}`}
                    >
                      <div className="w-full lg:w-1/4">
                        <div className="flex gap-2 mb-2">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${isValide ? 'bg-slate-200 text-slate-500' : 'bg-orange-50 text-orange-600'}`}>
                              {isValide ? '✓ Traitée' : '● En attente'}
                            </span>
                        </div>
                        <h3 className={`text-xl font-bold leading-tight flex items-center gap-2 ${isValide ? 'text-slate-400' : 'text-slate-900'}`}>
                          <Building2 size={18} className={isValide ? 'text-slate-300' : 'text-primary'} /> {res.societeDisplay}
                        </h3>
                        <p className="text-slate-400 text-xs mt-1 font-medium">{res.organizer?.nom}</p>
                      </div>
                      
                      <div className="flex lg:px-8 lg:border-x border-slate-100 w-full lg:w-auto justify-around">
                        <div className="text-center">
                          <span className={`block text-2xl font-black ${isValide ? 'text-slate-300' : 'text-slate-950'}`}>{res.participantCount}</span>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter italic">Inscrits</span>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-wrap gap-3 w-full">
                        {info.map((s, i) => (
                          <div key={i} className={`flex-grow md:flex-none px-4 py-2 rounded-2xl border transition-colors ${isValide ? 'bg-slate-100 border-slate-200 text-slate-400' : s.isQuorumReached ? 'bg-emerald-50 border-emerald-100 text-emerald-700 font-bold' : 'bg-red-50 border-red-100 text-red-600'}`}>
                            <p className="text-[10px] font-black">{s.date}</p>
                            <div className="flex items-center justify-between gap-4">
                               <p className="text-[8px] font-black uppercase">{s.label} : {s.count}/{QUORUM_LIMIT}</p>
                               {!isValide && s.isQuorumReached && <Truck size={10} className="text-emerald-600" />}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          {isValide ? (
                            <span className="px-6 py-3 text-[10px] font-black uppercase text-slate-400 italic">Traitée</span>
                          ) : (
                            <button onClick={() => handleValidate(res)} disabled={!allOk} className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase transition-all ${allOk ? 'bg-slate-900 text-white hover:bg-primary shadow-lg' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}>
                              Valider
                            </button>
                          )}
                          <button onClick={async () => { 
                              const result = await Swal.fire({ title: 'Supprimer ?', text: "Action irréversible.", icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444', confirmButtonText: 'Supprimer' });
                              if(result.isConfirmed) {
                                const idsToDelete = res.originalIds || [res.id];
                                await Promise.all(idsToDelete.map(id => deleteDoc(doc(db, "reservations", id))));
                                fetchReservations(); 
                              }
                            }} className="p-3 text-slate-200 hover:text-red-500 transition-colors"><Trash2 size={20}/></button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}

        {/* MODALE DETAILS */}
        {selectedRes && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h2 className="text-2xl font-serif italic font-bold text-slate-950">{selectedRes.societeDisplay}</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mt-1 flex items-center gap-2"><MapPin size={12}/> {selectedRes.villeDisplay}</p>
                </div>
                <button onClick={() => setSelectedRes(null)} className="p-3 bg-white rounded-2xl text-slate-400 hover:text-red-500 shadow-sm"><X size={20} /></button>
              </div>
              <div className="p-8 overflow-y-auto custom-scrollbar flex-grow">
                <div className="grid gap-4">
                  {selectedRes.participants?.map((p, idx) => (
                    <div key={idx} className="p-5 rounded-[2rem] border border-slate-100 bg-white hover:border-primary/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold">{p.prenom?.[0]}{p.nom?.[0]}</div>
                        <div>
                          <h4 className="font-bold text-slate-900">{p.prenom} {p.nom}</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1"><IdCard size={12} className="text-primary"/> {p.PDC || 'NC'}</p>
                        </div>
                      </div>
                      <div className="text-xs text-slate-600 space-y-1 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-6">
                        <div className="flex items-center gap-2"><Mail size={12} className="text-slate-300"/> {p.email}</div>
                        <div className="flex items-center gap-2"><Phone size={12} className="text-slate-300"/> {p.tel}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8 bg-slate-50/50 text-center"><button onClick={() => setSelectedRes(null)} className="px-12 py-4 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all">Fermer</button></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReservations;