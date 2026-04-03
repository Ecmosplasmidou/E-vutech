import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { MessageSquare, X, Trash2, Send, Mail, Building, Phone, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID_2;
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID_2;
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY_2;

  useEffect(() => { fetchContacts(); }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "contact_requests"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setContacts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
      Swal.fire('Erreur', 'Impossible de charger les données.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (contact, newStatus) => {
    const isTraitee = newStatus === 'traitee';
    
    const result = await Swal.fire({
      title: isTraitee ? 'Valider et envoyer le lien ?' : 'Clôturer la demande ?',
      text: isTraitee 
        ? "L'utilisateur recevra automatiquement le mail EmailJS avec le lien de réservation." 
        : "Le dossier sera clos. Vous pourrez envoyer un mail personnalisé via Gmail.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: isTraitee ? '#10b981' : '#0f172a',
      confirmButtonText: isTraitee ? 'Envoyer le lien' : 'Clôturer',
      cancelButtonText: 'Annuler'
    });

    if (result.isConfirmed) {
      try {
        await updateDoc(doc(db, "contact_requests", contact.id), { status: newStatus });

        if (isTraitee) {
          await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            to_email: contact.email,
            to_name: `${contact.prenom} ${contact.nom}`,
            from_name: "E-VUTECH",
            reply_to: "templierdriver@gmail.com",
          }, PUBLIC_KEY);
          
          Swal.fire('Succès', 'Statut mis à jour et email automatique envoyé.', 'success');
        } 
        else {
          const { value: customMsg } = await Swal.fire({
            title: 'Message de clôture',
            input: 'textarea',
            inputLabel: 'Rédigez votre message pour le client',
            inputPlaceholder: 'Expliquez pourquoi le dossier est clos...',
            showCancelButton: true,
            confirmButtonText: 'Ouvrir Gmail',
            cancelButtonText: 'Clôturer sans mail'
          });

          if (customMsg) {
            const subject = encodeURIComponent("E-VUTECH : Information concernant votre demande");
            const body = encodeURIComponent(customMsg);
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=${subject}&body=${body}`;
            window.open(gmailUrl, '_blank');
            Swal.fire('Dossier Clos', 'Gmail a été ouvert.', 'success');
          } else {
            Swal.fire('Dossier Clos', 'La demande est clôturée sans envoi de mail.', 'info');
          }
        }
        
        fetchContacts();
      } catch (e) { 
        console.error(e);
        Swal.fire('Erreur', 'Une erreur technique est survenue.', 'error'); 
      }
    }
  };

  if (loading && contacts.length === 0) return (
    <div className="h-screen flex items-center justify-center font-black text-slate-300 animate-pulse uppercase tracking-widest">
      Chargement...
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-12 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col h-[calc(100vh-6rem)]">
        
        {/* HEADER FIXE */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shrink-0">
          <div>
            <h1 className="text-4xl font-serif italic font-bold text-slate-950">Demandes de Contact</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
              <MessageSquare size={14} className="text-primary" /> 
              {contacts.length} demande(s) enregistrée(s)
            </p>
          </div>
          
          <button 
            onClick={fetchContacts}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 hover:text-primary transition-all shadow-sm disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            {loading ? "Mise à jour..." : "Actualiser"}
          </button>
        </header>

        {/* ZONE DE DÉROULEMENT (SCROLL) */}
        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-6 pb-12">
          {contacts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200 text-slate-400 italic">
              Aucune demande enregistrée.
            </div>
          ) : (
            contacts.map(c => (
              <div key={c.id} className={`bg-white p-6 md:p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col lg:flex-row justify-between gap-10 transition-all ${c.status !== 'en_attente' ? 'opacity-60 grayscale-[0.5]' : 'hover:shadow-xl hover:shadow-primary/5'}`}>
                <div className="flex-grow space-y-5">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                      c.status === 'traitee' ? 'bg-emerald-100 text-emerald-600' : 
                      c.status === 'cloturee' ? 'bg-slate-100 text-slate-400' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {c.status === 'traitee' ? 'Traitée (EmailJS)' : c.status === 'cloturee' ? 'Clôturée (Gmail)' : 'En attente'}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900">{c.civilite} {c.nom} {c.prenom}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Building size={14} className="text-primary"/> {c.entite || 'Inconnu'}</span>
                    <span className="flex items-center gap-2"><Mail size={14} className="text-primary"/> {c.email}</span>
                    <span className="flex items-center gap-2"><Phone size={14} className="text-primary"/> {c.telephone}</span>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 italic text-slate-600 text-sm leading-relaxed font-serif">
                    "{c.message}"
                  </div>
                </div>

                <div className="flex flex-col gap-3 justify-center min-w-[200px]">
                  {c.status === 'en_attente' ? (
                    <>
                      <button onClick={() => handleAction(c, 'traitee')} className="bg-emerald-500 text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase flex items-center justify-center gap-2 hover:bg-emerald-600 shadow-lg shadow-emerald-100 transition-all active:scale-95">
                        <Send size={14} /> Envoyer le lien
                      </button>
                      <button onClick={() => handleAction(c, 'cloturee')} className="bg-slate-900 text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
                        <X size={14} /> Clôturer (Gmail)
                      </button>
                    </>
                  ) : (
                    <div className="text-center py-4 text-slate-300 text-[10px] font-black uppercase italic border border-dashed border-slate-200 rounded-2xl">
                      Dossier traité
                    </div>
                  )}
                  <button onClick={async () => { 
                    const confirmDel = await Swal.fire({ title: 'Supprimer ?', text: 'Action irréversible', icon: 'warning', showCancelButton: true });
                    if(confirmDel.isConfirmed) {
                      await deleteDoc(doc(db, "contact_requests", c.id)); 
                      fetchContacts(); 
                    }
                  }} className="text-slate-200 hover:text-red-500 p-2 self-center transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContacts;