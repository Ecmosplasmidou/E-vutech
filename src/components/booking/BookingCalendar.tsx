import React, { useState, useEffect } from 'react';
import { 
  format, 
  addMonths, 
  isWeekend, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay, 
  isBefore, 
  isAfter, 
  addDays, 
  startOfDay, 
  getDay 
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { Clock, AlertCircle, ChevronLeft, ChevronRight, Check, Loader2, X } from 'lucide-react';
import SlotPicker from './SlotPicker';
import { getOccupiedSlots } from '../../services/bookingService';

const BookingCalendar = ({ selectedSlots, setSelectedSlots, hoursGoal }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [occupancy, setOccupancy] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const LIMIT_PER_SLOT = 60;
  const currentHours = selectedSlots.reduce((acc, slot) => acc + slot.hours, 0);

  // Charger l'occupation réelle depuis Firebase
  useEffect(() => {
    const loadOccupancy = async () => {
      try {
        setIsLoading(true);
        const data = await getOccupiedSlots();
        setOccupancy(data);
      } catch (err) {
        console.error("Erreur chargement dispo:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadOccupancy();
  }, [selectedSlots]);

  // Utilitaire pour afficher les erreurs
  const triggerError = (message) => {
    setError(message);
    setTimeout(() => setError(null), 4000);
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const shift = (getDay(monthStart) + 6) % 7; 
  const emptyDays = Array(shift).fill(null);

  // Date limite : 90 jours après le premier slot sélectionné
  const getLimitDate = () => {
    if (selectedSlots.length === 0) return null;
    const sortedSlots = [...selectedSlots].sort((a, b) => a.date - b.date);
    return addDays(startOfDay(sortedSlots[0].date), 90);
  };

  const limitDate = getLimitDate();

  const toggleSlot = (date, type, hours) => {
    const slotKey = `${format(date, 'yyyy-MM-dd')}-${type}`;
    const currentOccupancy = occupancy[slotKey] || 0;

    //Vérification places restantes
    if (currentOccupancy >= LIMIT_PER_SLOT) {
      triggerError("Ce créneau est complet.");
      return;
    }

    const exists = selectedSlots.find(s => s.id === slotKey);

    if (exists) {
      setSelectedSlots(selectedSlots.filter(s => s.id !== slotKey));
    } else {
      //Vérification quota d'heures
      if (currentHours + hours > hoursGoal) {
        triggerError(`Quota de ${hoursGoal}h déjà atteint.`);
        return;
      }
      //Vérification règle des 90 jours
      if (limitDate && isAfter(startOfDay(date), limitDate)) {
        triggerError("Dépassement du délai de 90 jours après le 1er RDV.");
        return;
      }
      setSelectedSlots([...selectedSlots, { id: slotKey, date, type, hours }]);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 relative">
      
      {/* SYSTÈME DE NOTIFICATION D'ERREUR */}
      {error && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10 min-w-[300px]">
            <div className="bg-red-500 p-1.5 rounded-lg">
              <AlertCircle size={18} className="text-white" />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider flex-grow">{error}</p>
            <button onClick={() => setError(null)} className="text-slate-400 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* SECTION CALENDRIER */}
      <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-6 md:p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 font-serif italic capitalize">
            {format(currentMonth, 'MMMM yyyy', { locale: fr })}
          </h2>
          <div className="flex gap-2">
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400"><ChevronLeft size={20}/></button>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400"><ChevronRight size={20}/></button>
          </div>
        </div>

        {isLoading ? (
          <div className="h-[400px] flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="animate-spin text-primary" size={32} />
            <span className="text-[10px] font-black uppercase tracking-widest">Mise à jour des disponibilités...</span>
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-2 md:gap-3">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => (
              <div key={d} className="text-center text-[9px] md:text-[10px] font-black uppercase text-slate-300 tracking-widest mb-2">{d}</div>
            ))}
            
            {emptyDays.map((_, i) => <div key={`empty-${i}`} className="min-h-[100px]"></div>)}

            {days.map((day, idx) => {
              const weekend = isWeekend(day);
              const dateStr = format(day, 'yyyy-MM-dd');
              const isPast = isBefore(startOfDay(day), startOfDay(new Date()));
              const isTooLate = limitDate && isAfter(startOfDay(day), limitDate);
              
              const morningOcc = occupancy[`${dateStr}-matin`] || 0;
              const afternoonOcc = occupancy[`${dateStr}-aprem`] || 0;
              const isSelected = selectedSlots.filter(s => isSameDay(s.date, day)).length > 0;
              const isFullDay = selectedSlots.filter(s => isSameDay(s.date, day)).length === 2;

              return (
                <div key={idx} className={`min-h-[110px] md:min-h-[125px] rounded-2xl p-2 border transition-all relative 
                  ${weekend ? 'bg-slate-50 border-transparent' : 'bg-white border-slate-100'} 
                  ${isSelected ? 'ring-2 ring-primary/30 border-primary/20' : ''}
                  ${isTooLate && !weekend ? 'opacity-30 grayscale' : ''}
                `}>
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-[10px] font-bold ${isSelected ? 'text-primary' : (weekend ? 'text-slate-200' : 'text-slate-400')}`}>
                      {format(day, 'd')}
                    </span>
                    
                    {!weekend && !isPast && !isTooLate && (
                       <div className="flex flex-col items-end gap-0.5">
                          {morningOcc > 0 && <span className="text-[6px] font-black text-orange-600 bg-orange-50 px-1 rounded-sm">M: {LIMIT_PER_SLOT - morningOcc}</span>}
                          {afternoonOcc > 0 && <span className="text-[6px] font-black text-orange-600 bg-orange-50 px-1 rounded-sm">A: {LIMIT_PER_SLOT - afternoonOcc}</span>}
                       </div>
                    )}
                  </div>

                  {!weekend && !isPast && !isTooLate ? (
                    <SlotPicker 
                      day={day} 
                      onToggle={toggleSlot} 
                      selectedSlots={selectedSlots} 
                      occupancy={occupancy}
                      limit={LIMIT_PER_SLOT}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       <span className="text-[7px] font-black text-slate-200 uppercase -rotate-12">
                        {weekend ? 'Fermé' : (isTooLate ? 'Hors délai' : '')}
                       </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION RÉSUMÉ */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl h-fit sticky top-8">
        <h3 className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest mb-6">
          <Clock size={16} /> Ma Sélection
        </h3>

        <div className="space-y-6">
          <div className="flex items-end justify-between">
            <span className="text-4xl font-serif italic">{currentHours}<span className="text-primary text-xl font-sans not-italic font-bold">/{hoursGoal}h</span></span>
          </div>
          
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-700 ease-out" 
              style={{ width: `${(currentHours / hoursGoal) * 100}%` }}
            ></div>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {Array.from(new Set(selectedSlots.map(s => format(s.date, 'yyyy-MM-dd'))))
              .sort()
              .map(dateStr => {
                const daySlots = selectedSlots.filter(s => format(s.date, 'yyyy-MM-dd') === dateStr);
                const isDayFull = daySlots.length === 2;
                return (
                  <div key={dateStr} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="text-[11px] font-medium text-slate-300">
                      {format(new Date(dateStr), 'dd MMMM', {locale: fr})}
                    </span>
                    <span className={`text-[9px] font-black px-2 py-1 rounded-md ${isDayFull ? 'bg-primary/20 text-primary uppercase' : 'bg-white/10 text-slate-400 uppercase'}`}>
                      {isDayFull ? '7h (Complet)' : '3.5h'}
                    </span>
                  </div>
                );
              })
            }
          </div>

          {currentHours === hoursGoal && (
            <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex gap-3">
              <Check size={16} className="text-emerald-500 shrink-0" />
              <p className="text-[10px] text-emerald-100 italic leading-tight">
                Quota atteint. Vous pouvez passer à l'étape suivante.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;