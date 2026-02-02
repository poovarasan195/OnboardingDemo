import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { firebaseApp } from './config';

const db = getFirestore(firebaseApp);

export const saveOnboarding = async payload => {
  try {
    console.log('Saving to Firestore, payload:', payload, {
      Name: payload.Name,
      Email: payload.Email,
      filesCount: payload.files?.length,
    });

    const docRef = await addDoc(collection(db, 'Users'), payload);
    console.log('Firestore document created:', docRef.id);

    return docRef.id;
  } catch (error) {
    console.error('Firestore save error:', error.code, error.message);
    throw error;
  }
};
