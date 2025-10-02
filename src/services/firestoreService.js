import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const credentialsCollection = (userId) => collection(db, `users/${userId}/credentials`);

export const addCredential = (userId, credential) => {
  return addDoc(credentialsCollection(userId), credential);
};

export const deleteCredential = (userId, id) => {
  const docRef = doc(db, `users/${userId}/credentials`, id);
  return deleteDoc(docRef);
};

export const updateCredential = (userId, id, updatedCredential) => {
  const docRef = doc(db, `users/${userId}/credentials`, id);
  return updateDoc(docRef, updatedCredential);
};

export const getCredentials = (userId, callback) => {
  const q = query(collection(db, `users/${userId}/credentials`));
  return onSnapshot(q, (querySnapshot) => {
    const credentials = [];
    querySnapshot.forEach((doc) => {
      credentials.push({ id: doc.id, ...doc.data() });
    });
    // Sort alphabetically by website name
    credentials.sort((a, b) => a.website.localeCompare(b.website));
    callback(credentials);
  });
};

export const searchCredentials = (userId, searchTerm, callback) => {
  const q = query(
    collection(db, `users/${userId}/credentials`),
    where("website", "==", searchTerm)
  );
  return onSnapshot(q, (querySnapshot) => {
    const credentials = [];
    querySnapshot.forEach((doc) => {
      credentials.push({ id: doc.id, ...doc.data() });
    });
    callback(credentials);
  });
};
