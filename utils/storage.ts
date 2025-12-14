import { BobaEntry } from '@/types';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  Timestamp,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User } from 'firebase/auth';

// Initialize user document if it doesn't exist
const ensureUserDocument = async (user: User) => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: user.email || null,
      name: null,
      createdAt: Timestamp.now(),
    });
  }
};

// Get user data including name
export const getUserData = async (user: User): Promise<{ name?: string; email?: string }> => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        name: data.name || undefined,
        email: data.email || undefined,
      };
    }
    return {};
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {};
  }
};

// GET all entries from Firestore for the current user
export const getEntries = async (user: User): Promise<BobaEntry[]> => {
  try {
    await ensureUserDocument(user);
    
    const entriesRef = collection(db, 'users', user.uid, 'bobaEntries');
    const q = query(entriesRef, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const entries: BobaEntry[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      entries.push({
        id: doc.id,
        date: data.date instanceof Timestamp ? data.date.toDate().toISOString() : data.date,
        shop: data.shop,
        drink: data.drink,
        sweetnessLevel: data.sweetness || data.sweetnessLevel,
        toppings: data.toppings || [],
        price: data.price,
        rating: data.rating,
        notes: data.notes || undefined,
      });
    });
    
    return entries;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return [];
  }
};

// POST create new entry in Firestore
export const saveEntry = async (user: User, entry: Omit<BobaEntry, 'id'>): Promise<BobaEntry> => {
  try {
    await ensureUserDocument(user);
    
    const entriesRef = collection(db, 'users', user.uid, 'bobaEntries');
    const docRef = await addDoc(entriesRef, {
      date: Timestamp.fromDate(new Date(entry.date)),
      shop: entry.shop,
      drink: entry.drink,
      sweetness: entry.sweetnessLevel,
      toppings: entry.toppings || [],
      price: entry.price,
      rating: entry.rating,
      notes: entry.notes || null,
    });
    
    return {
      ...entry,
      id: docRef.id,
    };
  } catch (error) {
    console.error('Error saving entry:', error);
    throw error;
  }
};

// PUT update entry in Firestore
export const updateEntry = async (user: User, id: string, entry: Omit<BobaEntry, 'id'>): Promise<void> => {
  try {
    const entryRef = doc(db, 'users', user.uid, 'bobaEntries', id);
    await updateDoc(entryRef, {
      date: Timestamp.fromDate(new Date(entry.date)),
      shop: entry.shop,
      drink: entry.drink,
      sweetness: entry.sweetnessLevel,
      toppings: entry.toppings || [],
      price: entry.price,
      rating: entry.rating,
      notes: entry.notes || null,
    });
  } catch (error) {
    console.error('Error updating entry:', error);
    throw error;
  }
};

// DELETE entry from Firestore
export const deleteEntry = async (user: User, id: string): Promise<void> => {
  try {
    const entryRef = doc(db, 'users', user.uid, 'bobaEntries', id);
    await deleteDoc(entryRef);
  } catch (error) {
    console.error('Error deleting entry:', error);
    throw error;
  }
};

// Clear all entries (for future use if needed)
export const clearAllEntries = async (user: User): Promise<void> => {
  console.warn('clearAllEntries is not implemented. Use individual delete operations.');
};

