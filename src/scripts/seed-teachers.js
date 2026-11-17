import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
const db = getDatabase(app);

async function seed() {
  try {
    const dataPath = path.join(__dirname, "../data/teachers.json");
    const teachersData = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    console.log("🚀 Seeding teachers data to Realtime Database...");

    const teachersRef = ref(db, "teachers");
    const formattedData = teachersData.map((teacher, index) => ({
      ...teacher,
      id: teacher.id || `teacher-${index}`,
      lessonsDone: teacher.lessons_done || teacher.lessonsDone || 0,
    }));

    await set(teachersRef, formattedData);
    console.log("✅ SUCCESS: Realtime Database populated with teachers!");
  } catch (error) {
    console.error("❌ SEED ERROR:", error);
    process.exit(1);
  }
}

seed();
