import { Navbar } from './components/Navbar';
import { TeacherCard, Teacher } from './components/TeacherCard';
import teachersData from './data/teachers.json';
import styles from './App.module.css';

export default function App() {
  const teachers: Teacher[] = teachersData as Teacher[];

  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Find Your Perfect Language Tutor</h1>
          <p>Connect with expert native speakers and accelerate your language learning journey.</p>
        </section>

        <section className={styles.grid}>
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </section>
      </main>
    </div>
  );
}
