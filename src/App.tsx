import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TeacherCard, Teacher } from './components/TeacherCard';
import { TeacherFilter } from './components/TeacherFilter';
import { BookingModal } from './components/BookingModal';
import { Dashboard } from './components/Dashboard';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import teachersData from './data/teachers.json';
import styles from './App.module.css';

export default function App() {
  const teachers: Teacher[] = teachersData as Teacher[];
  const [view, setView] = useState<'home' | 'dashboard' | 'how-it-works'>('home');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

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
              <h1>Find Your Perfect Language Tutor</h1>
              <p>Connect with expert native speakers and accelerate your language learning journey.</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                <button
                  onClick={() => setView('dashboard')}
                  style={{ padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  View My Bookings
                </button>
                <button
                  onClick={() => setView('how-it-works')}
                  style={{ padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px', backgroundColor: 'var(--color-primary)', border: 'none', fontWeight: 'bold' }}
                >
                  How It Works
                </button>
              </div>
            </section>

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
