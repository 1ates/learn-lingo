import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";

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
export const db = getDatabase(app);

export const bookTrialLesson = async (bookingData: {
  teacherId: string;
  fullName: string;
  email: string;
  phone: string;
  reason: string;
  bookedAt: Date;
}) => {
  try {
    const bookingsRef = ref(db, "bookings");
    const newBookingRef = push(bookingsRef);
    await set(newBookingRef, {
      ...bookingData,
      bookedAt: bookingData.bookedAt.toISOString(),
    });
  } catch (error) {
    console.error("Error booking trial lesson:", error);
    throw error;
  }
};

export const migrateTeachersData = async (teachersData: any[]) => {
  try {
    const teachersRef = ref(db, "teachers");
    const formattedTeachers = teachersData.map((t, index) => ({
      id: t.id || `teacher-${index + 1}`,
      ...t,
      lessons_done: t.lessons_done || t.lessonsDone || 0,
    }));
    await set(teachersRef, formattedTeachers);
  } catch (error) {
    console.error("Error migrating teachers data to RTDB:", error);
    throw error;
  }
};
