import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TeacherCard, Teacher } from './components/TeacherCard';
import { TeacherFilter } from './components/TeacherFilter';
import { BookingModal } from './components/BookingModal';
import { Dashboard } from './components/Dashboard';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { StatsBar } from './components/StatsBar';
import { migrateTeachersData } from './services/firebase';
import teachersData from './data/teachers.json';
import styles from './App.module.css';

export default function App() {
  const teachers: Teacher[] = teachersData as Teacher[];
  const [view, setView] = useState<'home' | 'dashboard' | 'how-it-works'>('home');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Automatically synchronize JSON data to Firestore on mount
  React.useEffect(() => {
    const initData = async () => {
      try {
        await migrateTeachersData(teachers);
      } catch (err) {
        console.error('Migration failed:', err);
      }
    };
    initData();
  }, []);

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesLanguage = selectedLanguage
      ? teacher.languages.some((lang) => lang.toLowerCase().includes(selectedLanguage.toLowerCase()))
      : true;
    const matchesLevel = selectedLevel
      ? teacher.levels.some((lvl) => lvl.toLowerCase().includes(selectedLevel.toLowerCase()))
      : true;
    return matchesLanguage && matchesLevel;
  });

  const handleOpenBooking = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsBookingOpen(true);
  };

  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.main}>
        {view === 'home' ? (
          <>
            <section className={styles.hero}>
              <div className={styles.heroText}>
                <h1>Unlock your potential with the best <span style={{backgroundColor: 'var(--color-primary-light)', padding: '0 0.5rem', borderRadius: '4px'}}>language</span> tutors</h1>
                <p>Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.</p>
                <button
                  onClick={() => setView('home')} // Temporarily remains on home or can lead to Teachers section
                  style={{ padding: '1rem 2rem', borderRadius: '12px', border: 'none', backgroundColor: 'var(--color-primary)', color: '#1a252f', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                >
                  Get started
                </button>
              </div>
              <div className={styles.heroImage}>
                {/* TODO: Add illustration */}
                <div style={{ backgroundColor: 'var(--color-peach-light)', borderRadius: '20px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  [Illustration]
                </div>
              </div>
            </section>

            <StatsBar />

            <TeacherFilter
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
            />

            <section className={styles.grid}>
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => (
                  <TeacherCard key={teacher.id} teacher={teacher} onBook={handleOpenBooking} />
                ))
              ) : (
                <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#666' }}>
                  No teachers found matching your filters.
                </p>
              )}
            </section>
          </>
        ) : view === 'dashboard' ? (
          <Dashboard />
        ) : (
          <HowItWorks />
        )}
      </main>

      <BookingModal
        teacher={selectedTeacher}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
      <Footer />
    </div>
  );
}
