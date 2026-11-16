import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, writeBatch, doc } from "firebase/firestore";

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);

/**
 * Seeds the `teachers` collection from src/data/teachers.json.
 * Idempotent: clears the collection, then writes every teacher in one batch.
 */
export const migrateTeachersData = async (teachersData: any[]) => {
  const batch = writeBatch(db);
  const teachersCol = collection(db, "teachers");

  const snapshot = await getDocs(teachersCol);
  snapshot.forEach((docSnap) => batch.delete(docSnap.ref));

  teachersData.forEach((teacher) => {
    const { id, ...rest } = teacher;
    batch.set(doc(teachersCol, id), rest);
  });

  await batch.commit();
};
