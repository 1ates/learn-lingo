import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TeacherCard, Teacher } from './components/TeacherCard';
import { TeacherFilter } from './components/TeacherFilter';
import { BookingModal } from './components/BookingModal';
import teachersData from './data/teachers.json';
import styles from './App.module.css';

export default function App() {
  const teachers: Teacher[] = teachersData as Teacher[];
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
        <section className={styles.hero}>
          <h1>Find Your Perfect Language Tutor</h1>
          <p>Connect with expert native speakers and accelerate your language learning journey.</p>
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
      </main>

      <BookingModal
        teacher={selectedTeacher}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
