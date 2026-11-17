import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../services/firebase';
import { TeacherCard, Teacher } from '../components/TeacherCard';
import { BookTrialModal } from '../components/BookTrialModal';
import teachersFallback from '../data/teachers.json';
import styles from './TeachersPage.module.css';

export const TeachersPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
  const [displayCount, setDisplayCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // Filter states
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');

  // Modal state
  const [selectedTeacherForBooking, setSelectedTeacherForBooking] = useState<Teacher | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      let fetchedData: Teacher[] = [];
      try {
        const teachersRef = ref(db, 'teachers');
        const snapshot = await get(teachersRef);
        
        if (snapshot.exists() && snapshot.val()) {
          const val = snapshot.val();
          if (Array.isArray(val)) {
            fetchedData = val.filter(Boolean).map((t: any, i: number) => ({
              ...t,
              id: t.id || `teacher-${i}`,
              lessonsDone: t.lessons_done || t.lessonsDone || 0,
            }));
          } else if (typeof val === 'object') {
            fetchedData = Object.entries(val).map(([key, t]: [string, any]) => ({
              ...t,
              id: t.id || key,
              lessonsDone: t.lessons_done || t.lessonsDone || 0,
            }));
          }
        }
        
        if (fetchedData.length === 0) {
          fetchedData = teachersFallback.map((t: any, i: number) => ({
            ...t,
            id: t.id || `fallback-${i}`,
            lessonsDone: t.lessons_done || 0,
          }));
        }
      } catch (error) {
        fetchedData = teachersFallback.map((t: any, i: number) => ({
          ...t,
          id: t.id || `fallback-${i}`,
          lessonsDone: t.lessons_done || 0,
        }));
      }

      setAllTeachers(fetchedData);
      setLoading(false);
    };

    fetchTeachers();
  }, []);

  // Filter logic
  const filteredTeachers = allTeachers.filter(teacher => {
    const langMatch = selectedLanguage === 'All' || teacher.languages?.includes(selectedLanguage);
    const levelMatch = selectedLevel === 'All' || teacher.levels?.some(l => l.includes(selectedLevel));
    const priceMatch = selectedPrice === 'All' || (teacher.pricePerHour ?? teacher.price_per_hour ?? 0) <= Number(selectedPrice);
    return langMatch && levelMatch && priceMatch;
  });

  useEffect(() => {
    setTeachers(filteredTeachers.slice(0, 4));
    setDisplayCount(4);
    setHasMore(filteredTeachers.length > 4);
  }, [allTeachers, selectedLanguage, selectedLevel, selectedPrice]);

  const handleLoadMore = () => {
    const nextCount = displayCount + 4;
    setTeachers(filteredTeachers.slice(0, nextCount));
    setDisplayCount(nextCount);
    if (nextCount >= filteredTeachers.length) {
      setHasMore(false);
    }
  };

  const handleBook = (teacher: Teacher) => {
    setSelectedTeacherForBooking(teacher);
    setIsBookingModalOpen(true);
  };

  return (
    <div className={styles.container} style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: "'Roboto', sans-serif" }}>
      <div className={styles.filters} style={{ display: 'flex', gap: '20px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: 500, color: '#8a8a89' }}>Languages</label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            style={{ padding: '12px 16px', borderRadius: '14px', border: 'none', background: '#ffffff', fontSize: '16px', fontWeight: 500, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <option value="All">All Languages</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Mandarin Chinese">Mandarin Chinese</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: 500, color: '#8a8a89' }}>Level</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            style={{ padding: '12px 16px', borderRadius: '14px', border: 'none', background: '#ffffff', fontSize: '16px', fontWeight: 500, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <option value="All">All Levels</option>
            <option value="A1">A1 Beginner</option>
            <option value="A2">A2 Elementary</option>
            <option value="B1">B1 Intermediate</option>
            <option value="B2">B2 Upper-Intermediate</option>
            <option value="C1">C1 Advanced</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#8a8a89' }}>Price / 1 hour</label>
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            style={{ padding: '12px 16px', borderRadius: '14px', border: 'none', background: '#ffffff', fontSize: '16px', fontWeight: 500, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <option value="All">Show all</option>
            <option value="25">Up to $25</option>
            <option value="30">Up to $30</option>
            <option value="35">Up to $35</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '40px', color: '#8a8a89' }}>Loading teachers...</p>
      ) : teachers.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '40px', color: '#8a8a89' }}>No teachers found.</p>
      ) : (
        <div className={styles.teacherList}>
          {teachers.map(teacher => (
            <TeacherCard key={teacher.id} teacher={teacher} onBook={handleBook} />
          ))}
        </div>
      )}

      {hasMore && !loading && teachers.length > 0 && (
        <button
          className={styles.loadMore}
          onClick={handleLoadMore}
          style={{ display: 'block', margin: '40px auto', padding: '16px 48px', background: '#F4C550', border: 'none', borderRadius: '14px', fontWeight: 700, fontSize: '16px', cursor: 'pointer' }}
        >
          Load more
        </button>
      )}

      <BookTrialModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        teacher={selectedTeacherForBooking ? { name: selectedTeacherForBooking.name, surname: selectedTeacherForBooking.surname, avatarUrl: selectedTeacherForBooking.avatarUrl || selectedTeacherForBooking.avatar_url } : undefined}
      />
    </div>
  );
};
