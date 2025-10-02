import { collection, addDoc, onSnapshot, query, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';

// No changes needed here, it retrieves all fields by default.
export const streamCredentials = (userId, callback) => {
  const userCredentialsCol = collection(db, `users/${userId}/credentials`);
  const q = query(userCredentialsCol); 
  return onSnapshot(q, (snapshot) => {
    const credentialsList = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    callback(credentialsList);
  });
};

// UPDATED: Now includes the 'tags' field
export const addCredential = (userId, { websiteName, username, password, description, tags }) => {
  const userCredentialsCol = collection(db, `users/${userId}/credentials`);
  return addDoc(userCredentialsCol, { websiteName, username, password, description, tags });
};

// UPDATED: Can now update the 'tags' field
export const updateCredential = (userId, docId, dataToUpdate) => {
  const docRef = doc(db, `users/${userId}/credentials`, docId);
  return updateDoc(docRef, dataToUpdate);
};

export const deleteCredential = (userId, docId) => {
  const docRef = doc(db, `users/${userId}/credentials`, docId);
  return deleteDoc(docRef);
};

