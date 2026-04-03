import React from 'react';
import { format } from 'date-fns';

const SlotPicker = ({ day, onToggle, selectedSlots, occupancy, limit }) => {
  const dateStr = format(day, 'yyyy-MM-dd');

  const morningCount = occupancy[`${dateStr}-matin`] || 0;
  const afternoonCount = occupancy[`${dateStr}-aprem`] || 0;

  const slots = [
    { 
      id: 'matin', 
      labelFull: 'Matin', 
      labelShort: 'M',
      time: '08:30', 
      hours: 3.5,
      isFull: morningCount >= limit,
    },
    { 
      id: 'aprem', 
      labelFull: 'Après-midi', 
      labelShort: 'A',
      time: '13:30', 
      hours: 3.5,
      isFull: afternoonCount >= limit,
    }
  ];

  return (
    <div className="flex flex-col gap-1 mt-1 px-0.5">
      {slots.map((slot) => {
        const isSelected = selectedSlots.some(
          (s) => format(s.date, 'yyyy-MM-dd') === dateStr && s.type === slot.id
        );

        return (
          <button
            key={slot.id}
            onClick={() => !slot.isFull && onToggle(day, slot.id, slot.hours)}
            disabled={slot.isFull}
            className={`
              relative w-full rounded-md transition-all duration-200
              flex flex-col items-center justify-center py-1
              border
              ${slot.isFull 
                ? 'bg-red-50 border-red-100 text-red-200 cursor-not-allowed' 
                : isSelected 
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm scale-[1.02] z-10' 
                  : 'bg-white border-slate-100 text-slate-600 hover:border-primary/50'
              }
            `}
          >
            {/* Label : Grand sur PC, Lettre sur Mobile */}
            <span className="text-[9px] sm:text-[10px] font-black leading-none">
              <span className="hidden sm:inline">{slot.labelFull}</span>
              <span className="sm:hidden">{slot.labelShort}</span>
            </span>

            {/* Heure : Toujours visible mais minuscule */}
            <span className={`text-[7px] sm:text-[8px] mt-0.5 font-medium ${isSelected ? 'text-white' : 'text-slate-500'}`}>
              {slot.isFull ? 'FULL' : slot.time}
            </span>

            {/* Petit indicateur de statut (Point) */}
            <div className={`absolute top-1 right-1 w-1 h-1 rounded-full ${
              slot.isFull ? 'bg-red-400' : isSelected ? 'bg-primary' : 'bg-emerald-400'
            }`} />
          </button>
        );
      })}
    </div>
  );
};

export default SlotPicker;