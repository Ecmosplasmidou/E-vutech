import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getOccupiedSlots = async () => {
  const occupancy = {};
  
  try {
    const querySnapshot = await getDocs(collection(db, "reservations"));
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const count = data.participantCount || 0;
      const slots = data.selectedSlots || [];
      
      slots.forEach(slot => {
        const slotId = slot.id; 
        if (!occupancy[slotId]) {
          occupancy[slotId] = 0;
        }
        occupancy[slotId] += count;
      });
    });
    
    return occupancy;
  } catch (error) {
    console.error("Erreur calcul occupation:", error);
    return {};
  }
};