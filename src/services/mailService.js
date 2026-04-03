import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID_1;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY_1;
const TEMPLATE_RESERVATION = import.meta.env.VITE_TEMPLATE_RESERVATION_1; 
const TEMPLATE_CONFIRMATION = import.meta.env.VITE_TEMPLATE_CONFIRMATION_1;


const formatDatesEuro = (slots) => {
  if (!slots || slots.length === 0) return "Dates à confirmer";


  const grouped = slots.reduce((acc, slot) => {
    const parts = slot.id.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    const type = parts[3];
    
    const dateEuro = `${day}/${month}/${year}`;
    
    if (!acc[dateEuro]) acc[dateEuro] = [];
    acc[dateEuro].push(type);
    return acc;
  }, {});

  return Object.entries(grouped).map(([date, types]) => {
    let label = "";
    if (types.includes('matin') && types.includes('aprem')) {
      label = "Journée entière";
    } else if (types.includes('matin')) {
      label = "Matin";
    } else {
      label = "Après-midi";
    }
    return `${date} (${label})`;
  }).join(' | ');
};


export const sendReservationEmail = async (organizer, slots, participants) => {
  const dateList = formatDatesEuro(slots);
  
  const participantsList = `
  <ul style="margin: 10px 0; padding-left: 20px; color: #ffffff; list-style: disc !important;">
    ${participants.map(p => `
      <li style="margin-bottom: 4px; font-size: 13px;">
        ${p.nom} ${p.prenom} - (${p.email})
      </li>
    `).join('')}
  </ul>`;

  const templateParams = {
    to_name: organizer.nom,
    to_email: organizer.email,
    societe: organizer.societe,
    nb_participants: participants.length,
    dates: dateList,
    participants_list: participantsList,
    is_under_quorum: participants.length < 12,
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_RESERVATION, templateParams, PUBLIC_KEY);
};

export const sendValidationEmail = async (reservationData) => {
  const dateList = formatDatesEuro(reservationData.selectedSlots);

  const participantsList = `
    <ul style="margin: 10px 0; padding-left: 20px; color: #ffffff; list-style-type: disc;">
      ${reservationData.participants.map(p => `
        <li style="margin-bottom: 4px; font-size: 13px;">
          ${p.nom} ${p.prenom} - (${p.email})
        </li>
      `).join('')}
    </ul>`;

  const templateParams = {
    to_name: reservationData.organizer.nom,
    to_email: reservationData.organizer.email,
    societe: reservationData.organizer.societe,
    nb_participants: reservationData.participantCount,
    participants_list: participantsList,
    dates: dateList 
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_CONFIRMATION, templateParams, PUBLIC_KEY);
};